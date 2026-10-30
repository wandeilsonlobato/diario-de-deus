import _ from 'lodash';
import dedent from 'dedent';

const elementos = ['Sangue', 'Morte', 'Conhecimento', 'Energia', 'Medo'];
const custoPorCirculo = { 1: 1, 2: 3, 3: 6, 4: 10 };

const nomes = [
	'Sussurro da Fenda',
	'Marca Rubra',
	'Eco do Outro Lado',
	'Lodo Silencioso',
	'Sigilo Ofuscante',
	'Tempo Partido',
	'Vínculo Carmesim',
	'Olhar da Membrana',
];
const execucoes = ['padrão', 'movimento', 'reação', 'completa'];
const alcances = ['pessoal', 'toque', 'curto', 'médio', 'longo'];
const alvos = ['você', '1 ser', '1 objeto', 'seres escolhidos', 'área de 6m de raio'];
const duracoes = ['instantânea', 'cena', 'sustentada', '1 rodada'];
const resistencias = ['Fortitude reduz à metade', 'Vontade anula', 'Reflexos reduz à metade', 'nenhuma'];

export default {
	ritual : function(){
		const elemento = _.sample(elementos);
		const circulo = _.random(1, 4);
		return dedent`
			{{ritual,${elemento.toLowerCase()}
			#### ${_.sample(nomes)}
			*Ritual de ${elemento}, ${circulo}º círculo (${custoPorCirculo[circulo]} PE)*

			**Execução** :: ${_.sample(execucoes)}
			**Alcance** :: ${_.sample(alcances)}
			**Alvo** :: ${_.sample(alvos)}
			**Duração** :: ${_.sample(duracoes)}
			**Resistência** :: ${_.sample(resistencias)}

			Descreva aqui o efeito do ritual e como o Outro Lado se manifesta ao ser conjurado.

			**Discente.** Descreva o custo adicional e a versão aprimorada.

			**Verdadeiro.** Descreva o custo adicional e a versão mais poderosa.
			}}
			\n`;
	},

	listaRituais : function(){
		const linhas = _.times(5, ()=>{
			const elemento = _.sample(elementos);
			return `- **${_.sample(nomes)}** ({{${elemento.toLowerCase()} ${elemento}}}): efeito resumido em uma linha.`;
		});
		return `##### Rituais de ${_.random(1, 4)}º Círculo\n${linhas.join('\n')}\n\n`;
	},
};
