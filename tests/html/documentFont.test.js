import { applyDocumentFont, wrapWithFont, fontFromSnippet } from '../../client/homebrew/utils/documentFont.js';

describe('applyDocumentFont', ()=>{
	it('keeps the existing style', ()=>{
		const style = applyDocumentFont('.page { color: red; }', 'OpenSans');
		expect(style).toContain('font-family : OpenSans !important;');
		expect(style).toContain('.page { color: red; }');
	});

	it('replaces the previous font instead of stacking', ()=>{
		const style = applyDocumentFont(applyDocumentFont('', 'OpenSans'), '"Times New Roman"');
		expect(style).toContain('"Times New Roman"');
		expect(style).not.toContain('OpenSans');
	});

	it('goes back to the theme fonts', ()=>{
		expect(applyDocumentFont(applyDocumentFont('.a {}', 'Sigilos'), 'unset')).toBe('.a {}');
	});

	it('works when the brew has no style yet', ()=>{
		expect(applyDocumentFont(undefined, 'Sigilos')).toContain('Sigilos');
	});
});

describe('wrapWithFont', ()=>{
	it('uses a span for text in one line', ()=>{
		expect(wrapWithFont('o Outro Lado', 'Sigilos')).toBe('{{font-family:Sigilos o Outro Lado}}');
	});

	it('uses a block for text across lines', ()=>{
		expect(wrapWithFont('um\ndois', '"Times New Roman"')).toBe('{{font-family:"Times New Roman"\num\ndois\n}}');
	});
});

describe('fontFromSnippet', ()=>{
	it('reads the font from the snippets of the Fontes menu', ()=>{
		expect(fontFromSnippet('{{font-family:OpenSans Dummy Text}}')).toBe('OpenSans');
		expect(fontFromSnippet('{{font-family:"Times New Roman" Dummy Text}}')).toBe('"Times New Roman"');
	});

	it('ignores other snippets', ()=>{
		expect(fontFromSnippet('{{note\ntexto\n}}')).toBeUndefined();
	});
});
