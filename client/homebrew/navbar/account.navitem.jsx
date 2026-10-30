import React from 'react';
import createReactClass from 'create-react-class';
import request from 'superagent';
import Nav from './nav.jsx';
import loginUrl from '../utils/loginUrl.js';

const Account = createReactClass({
	displayName     : 'AccountNavItem',
	getInitialState : function() {
		return {
			url : ''
		};
	},

	componentDidMount : function(){
		if(typeof window !== 'undefined'){
			this.setState({
				url : window.location.href
			});
		}
	},

	handleLogout : async function(){
		if(confirm('Deseja mesmo sair?')) {
			await request.post('/auth/logout').catch((err)=>{ console.warn(err); });
			// Reset divider position
			window.localStorage.removeItem('naturalcrit-pane-split');
			// Clear login cookie
			let domain = '';
			if(window.location?.hostname) {
				let domainArray = window.location.hostname.split('.');
				if(domainArray.length > 2){
					domainArray = [''].concat(domainArray.slice(-2));
				}
				domain = domainArray.join('.');
			}
			document.cookie = `nc_session=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;samesite=lax;${domain ? `domain=${domain}` : ''}`;
			window.location = '/';
		}
	},

	localLogin : async function(){
		const username = prompt('Enter username:');
		if(!username) {return;}

		const expiry = new Date;
		expiry.setFullYear(expiry.getFullYear() + 1);

		const token = await request.post('/local/login')
				.send({ username })
				.then((response)=>{
					return response.body;
				})
				.catch((err)=>{
					console.warn(err);
				});
		if(!token) return;

		document.cookie = `nc_session=${token};expires=${expiry};path=/;samesite=lax;${window.domain ? `domain=${window.domain}` : ''}`;
		window.location.reload(true);
	},

	render : function(){
		//  Logged in
		if(global.account){
			return <Nav.dropdown>
				<Nav.item
					className='account username'
					color='orange'
					icon='fas fa-user'
				>
					{global.account.username}
				</Nav.item>
				<Nav.item
					href={`/user/${encodeURIComponent(global.account.username)}`}
					color='yellow'
					icon='fas fa-beer'
				>
					meus casos
				</Nav.item>
				<Nav.item
					className='account'
					color='orange'
					icon='fas fa-user'
					href='/account'
				>
					conta
				</Nav.item>
				<Nav.item
					className='logout'
					color='red'
					icon='fas fa-power-off'
					onClick={this.handleLogout}
				>
					sair
				</Nav.item>
			</Nav.dropdown>;
		}

		//  Logged out
		//  LOCAL ONLY, while Google login is not configured
		if(global.config?.local && !global.config?.googleLogin) {
			return <Nav.item color='teal' icon='fas fa-sign-in-alt' onClick={this.localLogin}>
				entrar
			</Nav.item>;
		};

		// Logged out
		// Production site
		return <Nav.item href={loginUrl()} color='teal' icon='fas fa-sign-in-alt'>
			entrar
		</Nav.item>;
	}
});

export default Account;
