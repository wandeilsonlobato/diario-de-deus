import { hbfm } from 'marked-hbfm';
import templates from '../../themes/V3/DiarioDeDeus/templates.js';

describe('templates', ()=>{
	it.each(templates.map((t)=>[t.name, t]))('%s renders cleanly and carries the license notices', (name, template)=>{
		template.text.split('\\page').forEach((page, index)=>{
			expect(hbfm.render(page, index)).not.toMatch(/\{\{|\}\}/);
		});
		expect(template.text).toContain('/assets/selo-licenca.png');
		expect(template.text).toContain('{capaImagem}');
		expect(template.text).toContain('Este é um conteúdo não oficial, publicado sob a Licença da Comunidade de Ordem Paranormal.');
	});

	it('have unique ids', ()=>{
		expect(new Set(templates.map((t)=>t.id)).size).toBe(templates.length);
	});
});
