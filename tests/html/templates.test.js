import { hbfm } from 'marked-hbfm';
import templates from '../../themes/V3/DiarioDeDeus/templates.js';

describe('templates', ()=>{
	it.each(templates.map((t)=>[t.name, t]))('%s renders cleanly and carries the license notices', (name, template)=>{
		template.text.split('\\page').forEach((page, index)=>{
			expect(hbfm.render(page, index)).not.toMatch(/\{\{|\}\}/);
		});
		expect(template.text).toContain('/assets/selo-licenca.png');
		expect(template.text).toContain('{capaImagem}');
		expect(template.text).toContain('Aviso de conteúdo');
		expect(template.text).toContain('Este é um conteúdo não oficial, publicado sob a Licença da Comunidade de Ordem Paranormal.');
	});

	it('keep the complete sheet where there is one', ()=>{
		const arquivo = templates.find((t)=>t.id === 'arquivo').text;
		['**Sentidos**', 'machucado', '**Resistências**', '**Perícias**', '**Reação:', '**Livre:'].forEach((field)=>expect(arquivo).toContain(field));
	});

	it('have unique ids', ()=>{
		expect(new Set(templates.map((t)=>t.id)).size).toBe(templates.length);
	});
});
