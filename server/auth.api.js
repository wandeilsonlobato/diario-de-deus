import express     from 'express';
import jwt         from 'jwt-simple';
import crypto      from 'crypto';
import googleDrive from '@googleapis/drive';
import config      from './config.js';
import dbCheck     from './middleware/dbCheck.js';
import { model as UserModel } from './user.model.js';

const SESSION_COOKIE = 'nc_session';
const STATE_COOKIE   = 'google_oauth';
const SESSION_MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days
const STATE_MAX_AGE   = 10 * 60 * 1000;           // 10 minutes
const DEFAULT_SECRET  = 'secret';                 // Value shipped in config/default.json

const isGoogleLoginConfigured = ()=>!!(config.get('google_client_id') && config.get('google_client_secret'));

// The default secret is public, so anyone could forge a session signed with it
const hasSafeSecret = ()=>{
	const isLocal = config.get('local_environments').includes(config.get('node_env'));
	return isLocal || (config.get('secret') && config.get('secret') !== DEFAULT_SECRET);
};

// Only same-site paths, so the login can't be used to bounce users to another site
const safeRedirect = (target)=>{
	if(typeof target !== 'string' || !/^\/(?![/\\])/.test(target)) return '/';
	return target;
};

const cookieOptions = (req, maxAge)=>({
	httpOnly : true,
	sameSite : 'lax',
	secure   : req.secure,
	path     : '/',
	maxAge,
});

const createClient = (req)=>new googleDrive.auth.OAuth2(
	config.get('google_client_id'),
	config.get('google_client_secret'),
	config.get('google_redirect_uri') || `${req.protocol}://${req.get('host')}/auth/google/callback`
);

const sendLoginError = (res, status)=>{
	return res.status(status).type('html').send('<p>Não foi possível entrar com o Google.</p><p><a href="/">Voltar ao Diário de Deus</a></p>');
};

const router = express.Router();

router.get('/auth/google', (req, res)=>{
	if(!isGoogleLoginConfigured() || !hasSafeSecret()) {
		console.error('Google login is not available: check google_client_id, google_client_secret and secret');
		return sendLoginError(res, 503);
	}

	const state = crypto.randomBytes(24).toString('hex');
	res.cookie(STATE_COOKIE, JSON.stringify({ state, redirect: safeRedirect(req.query.redirect) }), cookieOptions(req, STATE_MAX_AGE));

	return res.redirect(createClient(req).generateAuthUrl({
		scope  : ['openid', 'email', 'profile'],
		state,
		prompt : 'select_account',
	}));
});

router.get('/auth/google/callback', dbCheck, async (req, res)=>{
	let saved = {};
	try {
		saved = JSON.parse(req.cookies?.[STATE_COOKIE] ?? '{}');
	} catch {
		saved = {};
	}
	res.clearCookie(STATE_COOKIE, { path: '/' });

	if(!saved.state || saved.state !== req.query.state || !req.query.code)
		return sendLoginError(res, 400);

	try {
		const client = createClient(req);
		const { tokens } = await client.getToken(req.query.code);
		const ticket = await client.verifyIdToken({
			idToken  : tokens.id_token,
			audience : config.get('google_client_id'),
		});

		const user = await UserModel.findOrCreateFromGoogle(ticket.getPayload());
		const session = jwt.encode({ username: user.username, issued: new Date }, config.get('secret'));

		res.cookie(SESSION_COOKIE, session, cookieOptions(req, SESSION_MAX_AGE));
		return res.redirect(safeRedirect(saved.redirect));
	} catch (err) {
		console.error('Google login failed:', err.message);
		return sendLoginError(res, 401);
	}
});

router.post('/auth/logout', (req, res)=>{
	res.clearCookie(SESSION_COOKIE, { path: '/' });
	return res.status(204).send();
});

export { isGoogleLoginConfigured, safeRedirect };
export default router;
