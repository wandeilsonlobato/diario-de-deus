import './navbar.less';
import React from 'react';

import Nav from './nav.jsx';

const Credits = ()=>(
	<div className='creditos'>
		<a className='credito' href='https://www.instagram.com/w.ander7/' target='_blank' rel='noopener noreferrer' title='Instagram do criador'>
			<i className='fab fa-instagram' /> @w.ander7
		</a>
		<a className='credito' href='https://x.com/fluxo_naruto' target='_blank' rel='noopener noreferrer' title='Twitter do criador'>
			<i className='fab fa-twitter' /> @fluxo_naruto
		</a>
	</div>
);

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
				<Credits />
				{!global.config?.staticSite && <Nav.item newTab={true} href='/changelog' color='purple' icon='far fa-file-alt'>
					{`v${version}`}
				</Nav.item>}
				{/* this.renderChromeWarning() */}
			</Nav.section>
			{children}
		</Nav.base>
	);
};

export { Credits };
export default Navbar;