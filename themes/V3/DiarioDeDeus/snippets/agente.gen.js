import _ from 'lodash';
import dedent from 'dedent';

const patentes = ['Recruta', 'Operador', 'Agente Especial', 'Oficial de Operações', 'Agente de Elite'];

export default {
	ficha : function(){
		return dedent`
			{{documento
			{{carimbo Confidencial}}
			##### DOSSIÊ DE AGENTE
			**Nome:** ______________

			**Patente:** ${_.sample(patentes)}

			**Classe:** Combatente / Especialista / Ocultista

			**NEX:** 5%

			**AGI** 1 | **FOR** 1 | **INT** 1 | **PRE** 1 | **VIG** 1

			**PV** __ | **PE** __ | **SAN** __ | **Defesa** 10
			}}
			\n`;
	},

	trilha : function(){
		const poderes = [10, 40, 65, 99].map((nex)=>`**NEX ${nex}% - Nome do Poder.** Descreva o que o agente recebe neste estágio.`);
		return `{{trilha\n#### Nome da Trilha\n*Trilha de Combatente, Especialista ou Ocultista*\n\nDescreva a filosofia da trilha e o tipo de agente que a segue.\n\n${poderes.join('\n\n')}\n}}\n\n`;
	},

	origem : function(){
		return dedent`
			{{origem
			#### Nome da Origem
			*O que o personagem fazia antes de conhecer o paranormal.*

			**Perícias Treinadas** :: duas perícias à sua escolha
			**Poder de Origem** :: nome e efeito do poder
			}}
			\n`;
	},

	item : function(){
		return dedent`
			{{item,${_.sample(['sangue', 'morte', 'conhecimento', 'energia', 'medo'])}
			#### Nome do Item Amaldiçoado
			*Item paranormal*

			**Espaços** :: ${_.random(1, 3)}
			**Maldição** :: descreva o efeito e o custo de usar o item.
			}}
			\n`;
	},

	tabelaNex : function(){
		const linhas = _.range(5, 100, 5).concat(99).map((nex)=>`| ${nex}% | Descreva o benefício |`);
		return `##### Progressão de NEX\n| NEX | Benefício |\n|:---:|:----------|\n${linhas.join('\n')}\n\n`;
	},
};
