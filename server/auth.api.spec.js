import jwt from 'jwt-simple';
import mongoose from 'mongoose';
import supertest from 'supertest';
import googleDrive from '@googleapis/drive';
import config from './config.js';
import createApp from './app.js';
import { safeRedirect } from './auth.api.js';
import { model as UserModel, slugify } from './user.model.js';
import { model as HomebrewModel } from './homebrew.model.js';

jest.mock('@googleapis/drive', ()=>({ __esModule: true, default: { auth: { OAuth2: jest.fn() } } }));

const SECRET = 'segredo-de-teste';
const profile = { sub: 'google-1', email: 'ana.souza@example.com', given_name: 'Ána' };

let request;
let realGet;
let dbState;
let client;

const cookiesOf = (res)=>(res.headers['set-cookie'] ?? []).join(';');
const stateCookie = (state, redirect = '/edit/abc')=>`google_oauth=${encodeURIComponent(JSON.stringify({ state, redirect }))}`;

beforeAll(async ()=>{
	const app = await createApp();
	request = supertest(app);
});

beforeEach(()=>{
	realGet = config.get.bind(config);
	jest.spyOn(config, 'get').mockImplementation((key)=>{
		if(key === 'google_client_id') return 'client-id';
		if(key === 'google_client_secret') return 'client-secret';
		if(key === 'secret') return SECRET;
		return realGet(key);
	});

	client = {
		generateAuthUrl : jest.fn(()=>'https://accounts.google.com/o/oauth2/v2/auth?x=1'),
		getToken        : jest.fn(async ()=>({ tokens: { id_token: 'id-token' } })),
		verifyIdToken   : jest.fn(async ()=>({ getPayload: ()=>profile })),
	};
	googleDrive.auth.OAuth2.mockImplementation(function() { return client; });

	dbState = mongoose.connection.readyState;
	mongoose.connection.readyState = 1;
});

afterEach(()=>{
	mongoose.connection.readyState = dbState;
	jest.restoreAllMocks();
});

afterAll(async ()=>{
	await mongoose.connection.close();
});

describe('GET /auth/google', ()=>{
	it('redirects to Google with a state stored in an httpOnly cookie', async ()=>{
		const res = await request.get('/auth/google?redirect=/edit/abc').set('X-Forwarded-Proto', 'https');

		expect(res.status).toBe(302);
		expect(res.headers.location).toContain('accounts.google.com');
		expect(cookiesOf(res)).toContain('google_oauth=');
		expect(cookiesOf(res)).toContain('HttpOnly');
		expect(client.generateAuthUrl.mock.calls[0][0].scope).toEqual(['openid', 'email', 'profile']);
	});

	it('refuses to start without Google credentials', async ()=>{
		config.get.mockImplementation((key)=>(key.startsWith('google_') ? undefined : realGet(key)));
		const res = await request.get('/auth/google').set('X-Forwarded-Proto', 'https');
		expect(res.status).toBe(503);
	});

	it('refuses to start outside local environments with the default secret', async ()=>{
		config.get.mockImplementation((key)=>{
			if(key === 'secret') return 'secret';
			if(key === 'node_env') return 'production';
			if(key.startsWith('google_')) return 'x';
			return realGet(key);
		});
		const res = await request.get('/auth/google').set('X-Forwarded-Proto', 'https');
		expect(res.status).toBe(503);
	});
});

describe('GET /auth/google/callback', ()=>{
	it('rejects a state that does not match the cookie', async ()=>{
		const find = jest.spyOn(UserModel, 'findOrCreateFromGoogle');
		const res = await request.get('/auth/google/callback?code=c&state=errado')
			.set('X-Forwarded-Proto', 'https').set('Cookie', stateCookie('certo'));

		expect(res.status).toBe(400);
		expect(find).not.toHaveBeenCalled();
		expect(client.getToken).not.toHaveBeenCalled();
	});

	it('rejects a missing state cookie', async ()=>{
		const res = await request.get('/auth/google/callback?code=c&state=x').set('X-Forwarded-Proto', 'https');
		expect(res.status).toBe(400);
	});

	it('creates the session and returns to the original page', async ()=>{
		jest.spyOn(UserModel, 'findOrCreateFromGoogle').mockResolvedValue({ username: 'Ana' });
		const res = await request.get('/auth/google/callback?code=c&state=certo')
			.set('X-Forwarded-Proto', 'https').set('Cookie', stateCookie('certo'));

		expect(res.status).toBe(302);
		expect(res.headers.location).toBe('/edit/abc');
		expect(client.verifyIdToken.mock.calls[0][0].audience).toBe('client-id');

		const session = /nc_session=([^;]+)/.exec(cookiesOf(res))[1];
		expect(jwt.decode(session, SECRET).username).toBe('Ana');
		expect(cookiesOf(res)).toContain('HttpOnly');
	});

	it('does not sign in when the Google token is invalid', async ()=>{
		client.verifyIdToken.mockRejectedValue(new Error('invalid'));
		jest.spyOn(console, 'error').mockImplementation(()=>{});
		const res = await request.get('/auth/google/callback?code=c&state=certo')
			.set('X-Forwarded-Proto', 'https').set('Cookie', stateCookie('certo'));

		expect(res.status).toBe(401);
		expect(cookiesOf(res)).not.toMatch(/nc_session=[^;]/);
	});
});

describe('POST /auth/logout', ()=>{
	it('clears the session cookie', async ()=>{
		const res = await request.post('/auth/logout').set('X-Forwarded-Proto', 'https');
		expect(res.status).toBe(204);
		expect(cookiesOf(res)).toMatch(/nc_session=;/);
	});
});

describe('safeRedirect', ()=>{
	it.each([
		['/edit/abc', '/edit/abc'],
		['/share/abc?x=1', '/share/abc?x=1'],
		['https://evil.example', '/'],
		['//evil.example', '/'],
		['/\\evil.example', '/'],
		[undefined, '/'],
		[['/a', '/b'], '/'],
	])('%s -> %s', (input, expected)=>{
		expect(safeRedirect(input)).toBe(expected);
	});
});

describe('findOrCreateFromGoogle', ()=>{
	const noResult = ()=>({ exec: async ()=>null });

	it('returns the existing user', async ()=>{
		const user = { username: 'Ana' };
		jest.spyOn(UserModel, 'findOne').mockReturnValue({ exec: async ()=>user });
		const create = jest.spyOn(UserModel, 'create');

		expect(await UserModel.findOrCreateFromGoogle(profile)).toBe(user);
		expect(create).not.toHaveBeenCalled();
	});

	it('avoids usernames already used as brew authors', async ()=>{
		jest.spyOn(UserModel, 'findOne').mockImplementation(noResult);
		jest.spyOn(UserModel, 'exists').mockResolvedValue(null);
		jest.spyOn(HomebrewModel, 'exists').mockImplementation(async ({ authors })=>(authors === 'Ana' ? { _id: 1 } : null));
		const create = jest.spyOn(UserModel, 'create').mockImplementation(async (user)=>user);

		const user = await UserModel.findOrCreateFromGoogle(profile);
		expect(user.username).toBe('Ana2');
		expect(create).toHaveBeenCalledWith({ googleSub: 'google-1', username: 'Ana2', email: 'ana.souza@example.com' });
	});

	it('returns the user created by a simultaneous sign-up', async ()=>{
		const user = { username: 'Ana' };
		jest.spyOn(UserModel, 'findOne').mockReturnValueOnce(noResult()).mockReturnValue({ exec: async ()=>user });
		jest.spyOn(UserModel, 'exists').mockResolvedValue(null);
		jest.spyOn(HomebrewModel, 'exists').mockResolvedValue(null);
		jest.spyOn(UserModel, 'create').mockRejectedValue(Object.assign(new Error('dup'), { code: 11000 }));

		expect(await UserModel.findOrCreateFromGoogle(profile)).toBe(user);
	});
});

describe('slugify', ()=>{
	it('keeps only plain letters and digits', ()=>{
		expect(slugify('João da Silva')).toBe('JoaodaSilva');
		expect(slugify('ção!')).toBe('cao');
		expect(slugify('山田')).toBe('');
	});
});
