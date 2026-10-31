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
	const saved = { id, title: caseTitle(meta, text), updatedAt: Date.now(), text, style, snippets, meta };
	const others = readLibrary().filter((item)=>item.id !== id);

	try {
		localStorage.setItem(LIBRARY_KEY, JSON.stringify([saved, ...others]));
		localStorage.setItem(CURRENT_KEY, id);
		return true;
	} catch {
		return false;
	}
};

const listCases = ()=>readLibrary().sort((a, b)=>b.updatedAt - a.updatedAt);

const currentCaseId = ()=>localStorage.getItem(CURRENT_KEY);

const openCase = (id)=>{
	saveCurrentCase();
	const item = readLibrary().find((entry)=>entry.id === id);
	if(!item) return false;
	clearDraft();
	localStorage.setItem(BREWKEY, item.text);
	if(item.style) localStorage.setItem(STYLEKEY, item.style);
	if(item.snippets) localStorage.setItem(SNIPKEY, item.snippets);
	localStorage.setItem(METAKEY, JSON.stringify(item.meta));
	localStorage.setItem(CURRENT_KEY, id);
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

export { caseTitle, currentCaseId, deleteCase, listCases, openCase, saveCurrentCase, startFromTemplate, startNewCase };
