import './navbar.less';
import React from 'react';

import Nav from './nav.jsx';

const Navbar = ({ children })=>{
	const version = global.version || '0.0.0';

	return (
		<Nav.base>
			<Nav.section>
				<Nav.logo />
				<Nav.item newTab={true} href='/changelog' color='purple' icon='far fa-file-alt'>
					{`v${version}`}
				</Nav.item>
				{/* this.renderChromeWarning() */}
			</Nav.section>
			{children}
		</Nav.base>
	);
};

export default Navbar;