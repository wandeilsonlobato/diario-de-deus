// Keeps several documents in this browser. The open document stays in the draft keys used by the editor;
// the library holds a copy of every case, so opening another case only swaps those keys.
const LIBRARY_KEY = 'DD_casos';
const CURRENT_KEY = 'DD_caso_atual';
const BREWKEY  = 'HB_newPage_content';
const STYLEKEY = 'HB_newPage_style';
const SNIPKEY  = 'HB_newPage_snippets';
const METAKEY  = 'HB_newPage_meta';

const readLibrary = ()=>{
	try {
		return JSON.parse(localStorage.getItem(LIBRARY_KEY)) ?? [];
	} catch {
		return [];
	}
};

const parseMeta = (raw)=>{
	try {
		return JSON.parse(raw) ?? {};
	} catch {
		return {};
	}
};

const caseTitle = (meta, text = '')=>meta?.title || /^#+\s+(.+)$/m.exec(text)?.[1]?.trim() || 'Sem título';

const clearDraft = ()=>{
	[BREWKEY, STYLEKEY, SNIPKEY, METAKEY, CURRENT_KEY].forEach((key)=>localStorage.removeItem(key));
};

// Copies the open document into the library. Returns false when the browser has no space left.
const saveCurrentCase = ()=>{
	const text = localStorage.getItem(BREWKEY) ?? '';
	const style = localStorage.getItem(STYLEKEY) ?? '';
	const snippets = localStorage.getItem(SNIPKEY) ?? '';
	const meta = parseMeta(localStorage.getItem(METAKEY));
	let id = localStorage.getItem(CURRENT_KEY);

	if(!id && !text.trim() && !style.trim() && !meta.title) return true;

	id ??= `caso-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
	const library = readLibrary();
	const previous = library.find((item)=>item.id === id);
	// Going from text to empty keeps the old text, so a wiped case can be restored
	const backup = !text.trim() && previous?.text?.trim() ? previous.text : previous?.backup;
	const saved = { id, title: caseTitle(meta, text), updatedAt: Date.now(), text, style, snippets, meta, synced: previous?.synced, backup: text.trim() ? undefined : backup };
	const others = library.filter((item)=>item.id !== id);

	try {
		localStorage.setItem(LIBRARY_KEY, JSON.stringify([saved, ...others]));
		localStorage.setItem(CURRENT_KEY, id);
		return true;
	} catch {
		return false;
	}
};

const writeDraft = (item)=>{
	clearDraft();
	localStorage.setItem(BREWKEY, item.text);
	if(item.style) localStorage.setItem(STYLEKEY, item.style);
	if(item.snippets) localStorage.setItem(SNIPKEY, item.snippets);
	localStorage.setItem(METAKEY, JSON.stringify(item.meta ?? {}));
	localStorage.setItem(CURRENT_KEY, item.id);
};

const fromRow = (row)=>({
	id        : row.id,
	title     : row.title,
	updatedAt : row.updated_at,
	text      : row.text,
	style     : row.style,
	snippets  : row.snippets,
	meta      : row.meta,
	synced    : true,
});

// Merges the cases from the account into this browser, keeping the most recent copy of each one.
// A case that was uploaded before and is gone from the account was deleted on another device.
const applyRemoteCases = (rows)=>{
	const remote = new Map(rows.map((row)=>[row.id, row]));
	const current = currentCaseId();
	const merged = [];
	const toPush = [];
	let currentChanged = false;

	for (const local of readLibrary()) {
		const row = remote.get(local.id);
		remote.delete(local.id);

		if(!row && local.synced) {
			if(local.id === current) {
				clearDraft();
				currentChanged = true;
			}
		} else if(!row) {
			merged.push(local);
			toPush.push(local);
		} else if(row.updated_at > local.updatedAt) {
			const newer = fromRow(row);
			merged.push(newer);
			if(local.id === current) {
				writeDraft(newer);
				currentChanged = true;
			}
		} else {
			merged.push({ ...local, synced: true });
			if(local.updatedAt > row.updated_at) toPush.push(local);
		}
	}

	localStorage.setItem(LIBRARY_KEY, JSON.stringify([...merged, ...[...remote.values()].map(fromRow)]));
	return { toPush, currentChanged };
};

const markSynced = (ids)=>{
	const library = readLibrary().map((item)=>(ids.includes(item.id) ? { ...item, synced: true } : item));
	localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
};

// On sign out, what belongs to the account leaves this browser
const forgetSyncedCases = ()=>{
	const library = readLibrary();
	if(library.find((item)=>item.id === currentCaseId())?.synced) clearDraft();
	localStorage.setItem(LIBRARY_KEY, JSON.stringify(library.filter((item)=>!item.synced)));
};

const listCases = ()=>readLibrary().sort((a, b)=>b.updatedAt - a.updatedAt);

const currentCaseId = ()=>localStorage.getItem(CURRENT_KEY);

const openCase = (id)=>{
	saveCurrentCase();
	const item = readLibrary().find((entry)=>entry.id === id);
	if(!item) return false;
	writeDraft(item);
	return true;
};

const restoreCase = (id)=>{
	const library = readLibrary().map((item)=>(item.id === id && item.backup ? { ...item, text: item.backup, backup: undefined, updatedAt: Date.now() } : item));
	const restored = library.find((item)=>item.id === id);
	if(!restored) return false;
	localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
	writeDraft(restored);
	return true;
};

const startNewCase = ()=>{
	saveCurrentCase();
	clearDraft();
};

const startFromTemplate = (template)=>{
	startNewCase();
	localStorage.setItem(BREWKEY, template.text);
	localStorage.setItem(METAKEY, JSON.stringify({ title: template.title, renderer: 'V3', theme: 'DiarioDeDeus', lang: 'pt-BR' }));
	return saveCurrentCase();
};

const deleteCase = (id)=>{
	if(currentCaseId() === id) clearDraft();
	localStorage.setItem(LIBRARY_KEY, JSON.stringify(readLibrary().filter((item)=>item.id !== id)));
};

export { applyRemoteCases, caseTitle, currentCaseId, deleteCase, forgetSyncedCases, listCases, markSynced, openCase, parseMeta, restoreCase, saveCurrentCase, startFromTemplate, startNewCase };
