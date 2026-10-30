import { brewToFileText } from '../../client/homebrew/utils/downloadBrew.js';
import { splitTextStyleAndMetadata } from '../../shared/helpers.js';

describe('brewToFileText', ()=>{
	it('produces a file the "de arquivo" import reads back', ()=>{
		const brew = { title: 'Caso: A Fenda', renderer: 'V3', theme: 'DiarioDeDeus', lang: 'pt-BR', style: '.page { color: red; }', text: '# Título\n\nTexto' };

		const imported = { text: brewToFileText(brew), style: '' };
		expect(imported.text.startsWith('```metadata')).toBe(true);
		splitTextStyleAndMetadata(imported);

		expect(imported.title).toBe('Caso: A Fenda');
		expect(imported.theme).toBe('DiarioDeDeus');
		expect(imported.style.trim()).toBe('.page { color: red; }');
		expect(imported.text).toBe('# Título\n\nTexto');
	});

	it('works without custom style', ()=>{
		const imported = { text: brewToFileText({ title: 'x', text: 'corpo' }), style: '' };
		splitTextStyleAndMetadata(imported);
		expect(imported.text).toBe('corpo');
	});
});
