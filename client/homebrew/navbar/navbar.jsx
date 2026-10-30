import './navbar.less';
import React from 'react';

import Nav from './nav.jsx';

const Navbar = ({ children })=>{
	const version = global.version || '0.0.0';

	return (
		<Nav.base>
			<Nav.section>
				<Nav.logo />
				<a className='seloNav' href='https://ordemparanormal.com.br/licenca' target='_blank' rel='noopener noreferrer'
					title='Este é um conteúdo não oficial, publicado sob a Licença da Comunidade de Ordem Paranormal'>
					<img src='/assets/selo-licenca.png' alt='Selo da Licença da Comunidade' />
				</a>
				{!global.config?.staticSite && <Nav.item newTab={true} href='/changelog' color='purple' icon='far fa-file-alt'>
					{`v${version}`}
				</Nav.item>}
				{/* this.renderChromeWarning() */}
			</Nav.section>
			{children}
		</Nav.base>
	);
};

export default Navbar;