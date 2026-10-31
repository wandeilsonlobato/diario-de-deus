// Google login and cloud copies of the cases, through Supabase.
// The key below is public by design: access is enforced by the row level security rules in supabase/migrations.
import { createClient } from '@supabase/supabase-js';
import { applyRemoteCases, currentCaseId, listCases, markSynced } from './caseLibrary.js';

const CASES_SYNCED = 'dd-casos-sincronizados';
const GOOGLE_CLIENT_ID = '80415887449-o35djm6fdtkqerhrohnsnh14gh7cc2n1.apps.googleusercontent.com';
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

const loadGoogleScript = ()=>new Promise((resolve, reject)=>{
	if(window.google?.accounts?.id) return resolve();
	const script = document.createElement('script');
	script.src = 'https://accounts.google.com/gsi/client';
	script.async = true;
	script.onload = resolve;
	script.onerror = reject;
	document.head.append(script);
});

const sha256 = async (text)=>{
	const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
	return [...new Uint8Array(hash)].map((byte)=>byte.toString(16).padStart(2, '0')).join('');
};

// Google's own button: the sign-in window names this site, not the Supabase address used by the redirect below
const renderGoogleButton = async (element)=>{
	await loadGoogleScript();
	const nonce = crypto.randomUUID();
	window.google.accounts.id.initialize({
		client_id : GOOGLE_CLIENT_ID,
		nonce     : await sha256(nonce),
		callback  : async ({ credential })=>{
			const { error } = await supabase().auth.signInWithIdToken({ provider: 'google', token: credential, nonce });
			if(error) return alert(`Não foi possível entrar: ${error.message}`);
			window.onbeforeunload = null;
			window.location.reload();
		},
	});
	window.google.accounts.id.renderButton(element, { theme: 'filled_black', size: 'medium', shape: 'pill', text: 'signin_with', locale: 'pt-BR' });
};

// Fallback for when the Google script is blocked
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

export { CASES_SYNCED, getUser, isGoogleLoginAvailable, pushCurrentCase, removeCloudCase, renderGoogleButton, signIn, signOut, syncCases };
