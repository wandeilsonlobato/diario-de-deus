import mongoose from 'mongoose';
import { model as HomebrewModel } from './homebrew.model.js';

const MAX_USERNAME_ATTEMPTS = 5;

const UserSchema = new mongoose.Schema({
	googleSub : { type: String, required: true, index: { unique: true } },
	username  : { type: String, required: true, index: { unique: true } },
	email     : { type: String, default: '' },
	createdAt : { type: Date, default: Date.now },
}, { versionKey: false, autoIndex: true }); // Uniqueness depends on these indexes, also in production

const slugify = (text = '')=>text
	.normalize('NFD')
	.replace(/[^a-zA-Z0-9]/g, '')
	.slice(0, 20);

// A username must be free both as an account and as a brew author, or the new user would inherit those brews
const isTaken = async (username)=>{
	return !!(await User.exists({ username }) || await HomebrewModel.exists({ authors: username }));
};

const generateUsername = async (profile)=>{
	const base = slugify(profile.given_name) || slugify(profile.email?.split('@')[0]) || 'agente';
	let username = base;
	for (let suffix = 2; await isTaken(username); suffix++) {
		username = `${base}${suffix}`;
	}
	return username;
};

UserSchema.statics.findOrCreateFromGoogle = async function(profile) {
	const existing = await User.findOne({ googleSub: profile.sub }).exec();
	if(existing) return existing;

	for (let attempt = 1; ; attempt++) {
		try {
			return await User.create({
				googleSub : profile.sub,
				username  : await generateUsername(profile),
				email     : profile.email,
			});
		} catch (err) {
			// Duplicate key: a simultaneous sign-up took this username or this Google account
			if(err.code !== 11000 || attempt >= MAX_USERNAME_ATTEMPTS) throw err;
			const created = await User.findOne({ googleSub: profile.sub }).exec();
			if(created) return created;
		}
	}
};

const User = mongoose.model('User', UserSchema);

export {
	UserSchema as schema,
	User       as model,
	slugify,
};
