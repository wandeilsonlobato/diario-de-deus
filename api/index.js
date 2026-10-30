// Vercel entry point. Reuses the database connection and app between invocations.
import DB        from '../server/db.js';
import createApp from '../server/app.js';
import config    from '../server/config.js';

let appPromise;

const getApp = ()=>{
	appPromise ??= DB.connect(config).then(()=>createApp());
	return appPromise;
};

export default async function handler(req, res) {
	const app = await getApp();
	return app(req, res);
}
