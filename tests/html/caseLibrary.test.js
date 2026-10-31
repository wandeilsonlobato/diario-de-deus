import { applyRemoteCases, caseTitle, currentCaseId, deleteCase, forgetSyncedCases, listCases, markSynced, openCase, parseMeta, restoreCase, saveCurrentCase, startFromTemplate, startNewCase } from '../../client/homebrew/utils/caseLibrary.js';

const BREWKEY = 'HB_newPage_content';
const METAKEY = 'HB_newPage_meta';

const fakeStorage = ()=>{
	const data = {};
	return {
		getItem    : (key)=>data[key] ?? null,
		setItem    : (key, value)=>{ data[key] = String(value); },
		removeItem : (key)=>{ delete data[key]; },
	};
};

const write = (text, title)=>{
	localStorage.setItem(BREWKEY, text);
	localStorage.setItem(METAKEY, JSON.stringify({ title, theme: 'DiarioDeDeus' }));
	return saveCurrentCase();
};

beforeEach(()=>{
	global.localStorage = fakeStorage();
});

describe('caseLibrary', ()=>{
	it('does not create a case for an empty editor', ()=>{
		localStorage.setItem(BREWKEY, '   ');
		saveCurrentCase();
		expect(listCases()).toEqual([]);
	});

	it('adopts an existing draft as a case', ()=>{
		write('# Caso antigo');
		expect(listCases()).toHaveLength(1);
		expect(listCases()[0].title).toBe('Caso antigo');
		expect(currentCaseId()).toBe(listCases()[0].id);
	});

	it('updates the open case instead of duplicating it', ()=>{
		write('primeira versão', 'A');
		write('segunda versão', 'A');
		expect(listCases()).toHaveLength(1);
		expect(listCases()[0].text).toBe('segunda versão');
	});

	it('keeps the current case when starting another', ()=>{
		write('caso um', 'Um');
		startNewCase();
		expect(localStorage.getItem(BREWKEY)).toBeNull();
		expect(currentCaseId()).toBeNull();
		write('caso dois', 'Dois');
		expect(listCases().map((c)=>c.title).sort()).toEqual(['Dois', 'Um']);
	});

	it('switches between cases without losing edits', ()=>{
		write('caso um', 'Um');
		const um = currentCaseId();
		startNewCase();
		write('caso dois', 'Dois');
		const dois = currentCaseId();

		localStorage.setItem(BREWKEY, 'caso dois editado');
		expect(openCase(um)).toBe(true);
		expect(localStorage.getItem(BREWKEY)).toBe('caso um');
		expect(JSON.parse(localStorage.getItem(METAKEY)).title).toBe('Um');

		openCase(dois);
		expect(localStorage.getItem(BREWKEY)).toBe('caso dois editado');
	});

	it('does not leak the style of one case into another', ()=>{
		localStorage.setItem('HB_newPage_style', '.a {}');
		write('caso um', 'Um');
		const um = currentCaseId();
		startNewCase();
		write('caso dois', 'Dois');
		const dois = currentCaseId();
		openCase(um);
		openCase(dois);
		expect(localStorage.getItem('HB_newPage_style')).toBeNull();
	});

	it('clears the editor when the open case is deleted', ()=>{
		write('caso um', 'Um');
		deleteCase(currentCaseId());
		expect(listCases()).toEqual([]);
		expect(localStorage.getItem(BREWKEY)).toBeNull();
		expect(currentCaseId()).toBeNull();
	});

	it('keeps the open case when another is deleted', ()=>{
		write('caso um', 'Um');
		const um = currentCaseId();
		startNewCase();
		write('caso dois', 'Dois');
		deleteCase(um);
		expect(listCases().map((c)=>c.title)).toEqual(['Dois']);
		expect(localStorage.getItem(BREWKEY)).toBe('caso dois');
	});

	it('reports when the browser runs out of space', ()=>{
		write('caso um', 'Um');
		const { setItem } = localStorage;
		localStorage.setItem = (key, value)=>{
			if(key === 'DD_casos') throw new Error('QuotaExceededError');
			setItem(key, value);
		};
		expect(write('caso maior', 'Um')).toBe(false);
	});

	it('starts a template as a new case and keeps the open one', ()=>{
		write('caso um', 'Um');
		startFromTemplate({ title: 'Bestiário', text: '# Ameaças' });
		expect(localStorage.getItem(BREWKEY)).toBe('# Ameaças');
		expect(listCases().map((c)=>c.title).sort()).toEqual(['Bestiário', 'Um']);
	});

	it('keeps a backup when a case with text becomes empty', ()=>{
		write('texto importante', 'A');
		const id = currentCaseId();
		write('', 'A');
		expect(listCases()[0].backup).toBe('texto importante');
		expect(restoreCase(id)).toBe(true);
		expect(localStorage.getItem(BREWKEY)).toBe('texto importante');
		expect(listCases()[0].text).toBe('texto importante');
		expect(listCases()[0].backup).toBeUndefined();
	});

	it('keeps the backup through repeated empty saves and drops it when there is text again', ()=>{
		write('texto importante', 'A');
		write('', 'A');
		write('', 'A');
		expect(listCases()[0].backup).toBe('texto importante');
		write('novo texto', 'A');
		expect(listCases()[0].backup).toBeUndefined();
	});

	it('does not crash on corrupted metadata', ()=>{
		expect(parseMeta('undefined')).toEqual({});
		expect(parseMeta('{quebrado')).toEqual({});
		expect(parseMeta(null)).toEqual({});
	});

	it('survives corrupted data', ()=>{
		localStorage.setItem('DD_casos', '{quebrado');
		expect(listCases()).toEqual([]);
	});
});

describe('sync with the account', ()=>{
	const row = (id, updated_at, text = 'da nuvem')=>({ id, title: id, text, style: '', snippets: '', meta: { title: id }, updated_at });

	it('brings cases from the account and uploads local ones', ()=>{
		write('local', 'Local');
		const { toPush } = applyRemoteCases([row('remoto', 5)]);
		expect(toPush.map((c)=>c.title)).toEqual(['Local']);
		expect(listCases().map((c)=>c.title).sort()).toEqual(['Local', 'remoto']);
	});

	it('keeps the newest copy of a case', ()=>{
		write('antigo', 'A');
		const id = currentCaseId();
		const { currentChanged, toPush } = applyRemoteCases([row(id, Date.now() + 1000, 'novo')]);
		expect(currentChanged).toBe(true);
		expect(toPush).toEqual([]);
		expect(localStorage.getItem(BREWKEY)).toBe('novo');
	});

	it('uploads the local copy when it is newer', ()=>{
		write('recente', 'A');
		const id = currentCaseId();
		const { toPush, currentChanged } = applyRemoteCases([row(id, 1, 'velho')]);
		expect(toPush.map((c)=>c.text)).toEqual(['recente']);
		expect(currentChanged).toBe(false);
	});

	it('removes a synced case deleted on another device', ()=>{
		write('caso', 'A');
		markSynced([currentCaseId()]);
		const { currentChanged } = applyRemoteCases([]);
		expect(listCases()).toEqual([]);
		expect(currentChanged).toBe(true);
		expect(localStorage.getItem(BREWKEY)).toBeNull();
	});

	it('keeps the synced mark when the case is edited', ()=>{
		write('caso', 'A');
		markSynced([currentCaseId()]);
		write('caso editado', 'A');
		expect(listCases()[0].synced).toBe(true);
	});

	it('removes only account cases on sign out', ()=>{
		write('da conta', 'Conta');
		markSynced([currentCaseId()]);
		startNewCase();
		write('só daqui', 'Local');
		forgetSyncedCases();
		expect(listCases().map((c)=>c.title)).toEqual(['Local']);
		expect(localStorage.getItem(BREWKEY)).toBe('só daqui');
	});
});

describe('caseTitle', ()=>{
	it('prefers the title, then the first heading', ()=>{
		expect(caseTitle({ title: 'Título' }, '# Outro')).toBe('Título');
		expect(caseTitle({}, 'texto\n## Primeiro título\n')).toBe('Primeiro título');
		expect(caseTitle({}, 'só texto')).toBe('Sem título');
	});
});
