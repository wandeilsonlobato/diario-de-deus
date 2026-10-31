// Google login and cloud copies of the cases, through Supabase.
// The key below is public by design: access is enforced by the row level security rules in supabase/migrations.
import { createClient } from '@supabase/supabase-js';
import { applyRemoteCases, currentCaseId, listCases, markSynced } from './caseLibrary.js';

const CASES_SYNCED = 'dd-casos-sincronizados';
const SUPABASE_URL = 'https://ticqudncbhkpmyjtenvx.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Awg72Wsip_fkUbhbN6Ntkw_Vrj03F9e';

let client;
const supabase = ()=>{
	client ??= createClient(SUPABASE_URL, SUPABASE_KEY);
	return client;
};

const isGoogleLoginAvailable = async ()=>{
	try {
		const res = await fetch(`${SUPABASE_URL}/auth/v1/settings`, { headers: { apikey: SUPABASE_KEY } });
		return !!(await res.json())?.external?.google;
	} catch {
		return false;
	}
};

const getUser = async ()=>(await supabase().auth.getSession()).data.session?.user ?? null;

const signIn = ()=>supabase().auth.signInWithOAuth({
	provider : 'google',
	options  : { redirectTo: `${window.location.origin}${window.location.pathname}` },
});

const signOut = ()=>supabase().auth.signOut();

const toRow = (item, userId)=>({
	user_id    : userId,
	id         : item.id,
	title      : item.title,
	text       : item.text ?? '',
	style      : item.style ?? '',
	snippets   : item.snippets ?? '',
	meta       : item.meta ?? {},
	updated_at : item.updatedAt,
});

const pushCases = async (items, userId)=>{
	if(!items.length) return;
	const { error } = await supabase().from('casos').upsert(items.map((item)=>toRow(item, userId)), { onConflict: 'user_id,id' });
	if(error) throw error;
	markSynced(items.map((item)=>item.id));
};

// Merges this browser with the account. Returns true when the open case changed and the editor must reload.
const syncCases = async (userId)=>{
	const { data, error } = await supabase().from('casos').select('id, title, text, style, snippets, meta, updated_at');
	if(error) throw error;
	const { toPush, currentChanged } = applyRemoteCases(data);
	await pushCases(toPush, userId);
	return currentChanged;
};

const pushCurrentCase = async ()=>{
	try {
		const user = await getUser();
		const item = listCases().find((entry)=>entry.id === currentCaseId());
		if(user && item) await pushCases([item], user.id);
	} catch (err) {
		console.warn('Não foi possível salvar na nuvem:', err.message);
	}
};

const removeCloudCase = async (id)=>{
	if(await getUser()) await supabase().from('casos').delete().eq('id', id);
};

export { CASES_SYNCED, getUser, isGoogleLoginAvailable, pushCurrentCase, removeCloudCase, signIn, signOut, syncCases };
