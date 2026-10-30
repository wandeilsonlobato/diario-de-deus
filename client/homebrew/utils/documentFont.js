const START = '/* Fonte do documento */';
const END   = '/* Fim da fonte do documento */';
const BLOCK = /\/\* Fonte do documento \*\/[\s\S]*?\/\* Fim da fonte do documento \*\/\n*/;

// Icons and text marked as sigils keep their own fonts
const fontRule = (font)=>`.page, .page *:not(i, [class*="fa-"], .gi, .ei, .df, .sigilos, .sigilos *) {
	font-family : ${font} !important;
}`;

// Sets the font of the whole document in its style, replacing the previous choice. 'unset' goes back to the theme's fonts.
const applyDocumentFont = (style = '', font)=>{
	const rest = style.replace(BLOCK, '');
	if(font === 'unset') return rest;
	return `${START}\n${fontRule(font)}\n${END}\n\n${rest}`;
};

const fontFromSnippet = (text)=>/^\{\{font-family:("[^"]+"|\S+) /.exec(text)?.[1];

export { applyDocumentFont, fontFromSnippet };
