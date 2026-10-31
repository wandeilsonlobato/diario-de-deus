import React, { useEffect, useRef, useState } from 'react';
import Nav from './nav.jsx';
import { CASES_SYNCED, getUser, isGoogleLoginAvailable, renderGoogleButton, signIn, signOut, syncCases } from '../utils/cloud.js';
import { forgetSyncedCases } from '../utils/caseLibrary.js';

const CloudNavItem = ()=>{
	const [available, setAvailable] = useState(false);
	const [user, setUser] = useState(null);
	const [status, setStatus] = useState('');
	const [buttonFailed, setButtonFailed] = useState(false);
	const buttonRef = useRef(null);

	useEffect(()=>{
		isGoogleLoginAvailable().then(setAvailable);
		getUser().then(async (current)=>{
			setUser(current);
			if(!current) return;
			try {
				const currentChanged = await syncCases(current.id);
				window.dispatchEvent(new Event(CASES_SYNCED));
				if(currentChanged && window.location.pathname.startsWith('/new')) window.location.reload();
			} catch (err) {
				console.warn('Não foi possível sincronizar:', err.message);
				setStatus('sem sincronizar');
			}
		});
	}, []);

	useEffect(()=>{
		if(available && !user && buttonRef.current) renderGoogleButton(buttonRef.current).catch(()=>setButtonFailed(true));
	}, [available, user]);

	const handleSignOut = async ()=>{
		if(!confirm('Sair da conta? Seus casos continuam salvos nela, mas saem deste navegador.')) return;
		forgetSyncedCases();
		await signOut();
		window.onbeforeunload = null;
		window.location.href = '/';
	};

	if(user) {
		const name = user.user_metadata?.name?.split(' ')[0] || user.email;
		return <Nav.dropdown className='cloudAccount'>
			<Nav.item color='blue' icon='fas fa-user'>{status || name}</Nav.item>
			<Nav.item color='red' icon='fas fa-power-off' onClick={handleSignOut}>sair</Nav.item>
		</Nav.dropdown>;
	}

	if(!available) return null;

	if(buttonFailed) return <Nav.item color='blue' icon='fab fa-google' onClick={()=>signIn()}>entrar com Google</Nav.item>;

	return <div className='googleButton' ref={buttonRef} />;
};

export default CloudNavItem;
