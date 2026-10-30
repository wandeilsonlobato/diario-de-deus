import React from 'react';
import dedent from 'dedent';
import Nav from './nav.jsx';

const getShareId = (brew)=>(
	brew.googleId && !brew.stubbed
		? brew.googleId + brew.shareId
		: brew.shareId
);

const getRedditLink = (brew)=>{
	const text = dedent`
			Hey guys! I've been working on this homebrew. I'd love your feedback. Check it out.

			**[Link do Diário de Deus](${global.config.baseUrl}/share/${getShareId(brew)})**`;

	return `https://www.reddit.com/r/UnearthedArcana/submit?title=${encodeURIComponent(brew.title.toWellFormed())}&text=${encodeURIComponent(text)}`;
};

export default ({ brew, currentPage })=>(
	<Nav.dropdown>
		<Nav.item color='teal' icon='fas fa-share-alt'>
			compartilhar
		</Nav.item>
		<Nav.item color='blue' href={`/share/${getShareId(brew)}`}>
			ver
		</Nav.item>
		<Nav.item color='blue' onClick={()=>{navigator.clipboard.writeText(`${global.config.baseUrl}/share/${getShareId(brew)}`);}}>
			copiar link
		</Nav.item>
		{currentPage > 1 &&
			<Nav.item
				color='blue'
				onClick={()=>{navigator.clipboard.writeText(`${global.config.baseUrl}/share/${getShareId(brew)}#p${currentPage}`);}}>
				copy url (page {currentPage})
			</Nav.item>}
		<Nav.item color='blue' href={getRedditLink(brew)} newTab rel='noopener noreferrer'>
			post to reddit
		</Nav.item>
	</Nav.dropdown>
);
