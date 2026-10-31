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

const ameaca = (classes, tipo)=>{
		return function(){
			const elemento = _.sample(elementos);
			const fraqueza = _.sample(_.without(elementos, elemento));
			const vd = _.sample([20, 40, 80, 120, 160, 200, 240]);
			const pv = vd * 2 + _.random(10, 40);
			return dedent`
				{{${classes}
				## ${tipo ? 'Nome da Pessoa' : _.sample(nomes)}
				*${tipo ?? `Criatura de ${elemento}`} ${_.sample(tamanhos)}, VD ${vd}*
				___
				**Sentidos** :: Percepção ${pericia(3)}, visão no escuro
				**Iniciativa** :: ${pericia(3)}
				**Presença Perturbadora** :: DT ${10 + vd / 10}, ${_.random(1, 4)}d6 de dano mental (NEX ${_.sample([10, 25, 40, 60])}% imune)
				___
				**Defesa** :: ${15 + vd / 10}
				**Fortitude** :: ${pericia(4)}
				**Reflexos** :: ${pericia(3)}
				**Vontade** :: ${pericia(3)}
				**Pontos de Vida** :: ${pv} (machucado ${Math.floor(pv / 2)})
				**Resistências** :: ${elemento.toLowerCase()} 10
				**Vulnerabilidades** :: ${fraqueza.toLowerCase()}
				**Deslocamento** :: 9m
				___
				| AGI | FOR | INT | PRE | VIG |
				|:---:|:---:|:---:|:---:|:---:|
				| ${atributo()} | ${atributo()} | ${atributo()} | ${atributo()} | ${atributo()} |
				___
				**Perícias** :: Atletismo ${pericia(3)}, Furtividade ${pericia(3)}

				### Habilidades
				**Nome da Habilidade.** Descreva uma habilidade passiva da criatura.

				### Ações
				**Padrão: Agredir.** Corpo a corpo x2. Teste ${pericia(4)}, crítico 19. Dano ${_.random(1, 4)}d8+${_.random(2, 10)} de ${elemento.toLowerCase()}.

				**Reação: Nome da Reação.** Descreva quando ela acontece e o efeito.

				**Enigma de Medo.** Descreva a condição para que a criatura possa ser derrotada.
				}}
				\n`;
		};
};

export default {
	ameaca,
	pessoa : ameaca('ameaca,frame', 'Pessoa'),
};
