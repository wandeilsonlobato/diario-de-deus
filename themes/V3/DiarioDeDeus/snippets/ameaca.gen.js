import _ from 'lodash';
import dedent from 'dedent';

const nomes = [
	'Sussurrante',
	'Devorador de Memórias',
	'Marionete de Lodo',
	'Anfitrião Quebrado',
	'Criatura da Fenda',
	'Vulto Sem Rosto',
	'Coletor de Ecos',
];
const elementos = ['Sangue', 'Morte', 'Conhecimento', 'Energia', 'Medo'];
const tamanhos = ['Pequena', 'Média', 'Grande', 'Enorme'];

const atributo = ()=>_.random(0, 5);
const pericia = (dados)=>`${_.random(1, dados)}d20+${_.random(0, 10)}`;

export default {
	ameaca : function(classes){
		return function(){
			const elemento = _.sample(elementos);
			const fraqueza = _.sample(_.without(elementos, elemento));
			const vd = _.sample([20, 40, 80, 120, 160, 200, 240]);
			return dedent`
				{{${classes}
				## ${_.sample(nomes)}
				*Criatura de ${elemento} ${_.sample(tamanhos)}, VD ${vd}*
				___
				**Presença Perturbadora** :: DT ${10 + vd / 10}, ${_.random(1, 4)}d6 de dano mental (NEX ${_.sample([10, 25, 40, 60])}% imune)
				**Percepção** :: ${pericia(3)} (visão no escuro)
				**Iniciativa** :: ${pericia(3)}
				**Fortitude** :: ${pericia(4)}
				**Reflexos** :: ${pericia(3)}
				**Vontade** :: ${pericia(3)}
				___
				| AGI | FOR | INT | PRE | VIG |
				|:---:|:---:|:---:|:---:|:---:|
				| ${atributo()} | ${atributo()} | ${atributo()} | ${atributo()} | ${atributo()} |
				___
				**Defesa** :: ${15 + vd / 10}
				**Pontos de Vida** :: ${vd * 2 + _.random(10, 40)}
				**Deslocamento** :: 9m
				**Imunidades** :: ${elemento.toLowerCase()}
				**Vulnerabilidades** :: ${fraqueza.toLowerCase()}

				### Habilidades
				**Nome da Habilidade.** Descreva uma habilidade passiva da criatura.

				### Ações
				**Padrão: Agredir.** Corpo a corpo x2. Teste ${pericia(4)}, dano ${_.random(1, 4)}d8+${_.random(2, 10)} de ${elemento.toLowerCase()}.

				**Enigma de Medo.** Descreva a condição para que a criatura possa ser derrotada.
				}}
				\n`;
		};
	},
};
