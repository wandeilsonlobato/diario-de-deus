// Ready-made documents offered when starting a case. All text is original: book text can't be reproduced under the license.
const SELO_LICENCA = '{{licenca\n![Selo da Licença da Comunidade](/assets/selo-licenca.png)\n\nContém material gerado por inteligência artificial\n}}';

const capa = (titulo, subtitulo)=>`{{capa\n{{selo}}\n# ${titulo}\n## ${subtitulo}\n{{classificado Confidencial}}\n\n${SELO_LICENCA}\n}}\n\n\\page\n\n`;

const AVISO = '{{note\n##### Aviso de conteúdo\nEste material contém horror e violência. Combine os limites com a sua mesa antes de jogar.\n}}';

const FINAL = 'Este é um conteúdo não oficial, publicado sob a Licença da Comunidade de Ordem Paranormal.';

export default [
	{
		id          : 'caso',
		name        : 'Caso completo',
		icon        : 'fas fa-folder-open',
		description : 'Missão com briefing, cenas, pistas e ameaça.',
		title       : 'Novo Caso',
		text        : `${capa('O Nome do Caso', 'Arquivo Ordo Realitas')}# O Caso
Resuma em duas frases o que aconteceu e o que os agentes vão descobrir.

${AVISO}

### Briefing
{{descriptive
##### Leia para os jogadores
Escreva aqui como os agentes recebem a missão: quem chama, onde se encontram e o que sabem até agora.
}}

### Linha do tempo
| Quando | O que aconteceu |
|:-------|:----------------|
| Há um mês | O primeiro sinal de que algo estava errado. |
| Há uma semana | O incidente que chamou atenção. |
| Hoje | O que os agentes encontram ao chegar. |

\\column

### Cena 1: Chegada
Descreva o local, quem está lá e o que parece fora do lugar.

### Cena 2: Investigação
Liste o que pode ser descoberto e como.

{{documento
{{carimbo Sigiloso}}
##### PISTA 1
Escreva aqui um documento para entregar aos jogadores.
}}

### Cena 3: Confronto
Explique como a ameaça se revela e o que acontece se os agentes demorarem.

### Desfecho
Conte o que muda se os agentes vencerem, fugirem ou falharem.

${FINAL}

{{pageNumber 1}}
{{footnote NOME DO CASO}}
`,
	},
	{
		id          : 'ameacas',
		name        : 'Bestiário',
		icon        : 'fas fa-spider',
		description : 'Coleção de criaturas com fichas prontas para editar.',
		title       : 'Bestiário',
		text        : `${capa('Bestiário', 'Criaturas do Outro Lado')}# Ameaças
Explique o que une estas criaturas: onde surgem e o que as atrai.

${AVISO}

{{ameaca,frame
## Nome da Criatura
*Criatura de Sangue Média, VD 40*
___
**Presença Perturbadora** :: DT 14, 1d6 de dano mental (NEX 10% imune)
**Percepção** :: 1d20+5 (visão no escuro)
**Iniciativa** :: 2d20+5
**Fortitude** :: 2d20+5
**Reflexos** :: 1d20+5
**Vontade** :: 1d20+5
___
| AGI | FOR | INT | PRE | VIG |
|:---:|:---:|:---:|:---:|:---:|
| 2 | 3 | 1 | 1 | 3 |
___
**Defesa** :: 19
**Pontos de Vida** :: 100
**Deslocamento** :: 9m
**Imunidades** :: sangue
**Vulnerabilidades** :: morte

### Habilidades
**Nome da Habilidade.** Descreva uma habilidade passiva.

### Ações
**Padrão: Agredir.** Corpo a corpo. Descreva o ataque e o dano.

**Enigma de Medo.** Descreva o que é preciso fazer para derrotar a criatura.
}}

\\column

### Como usar
Conte onde encontrar a criatura, como ela age e que pistas deixa.

${FINAL}

{{pageNumber 1}}
{{footnote BESTIÁRIO}}
`,
	},
	{
		id          : 'rituais',
		name        : 'Livro de Rituais',
		icon        : 'fas fa-book',
		description : 'Rituais organizados por elemento e círculo.',
		title       : 'Livro de Rituais',
		text        : `${capa('Livro de Rituais', 'Conhecimento Proibido')}# Rituais
Conte quem escreveu este livro e o preço de usá-lo.

${AVISO}

### Rituais de {{sangue Sangue}}
{{ritual,sangue
#### Nome do Ritual
*Ritual de Sangue, 1º círculo (1 PE)*

**Execução** :: padrão
**Alcance** :: toque
**Alvo** :: 1 ser
**Duração** :: cena
**Resistência** :: nenhuma

Descreva o efeito do ritual.

**Discente.** Descreva o custo adicional e a versão aprimorada.

**Verdadeiro.** Descreva o custo adicional e a versão mais poderosa.
}}

\\column

### Rituais de {{conhecimento Conhecimento}}
{{ritual,conhecimento
#### Nome do Ritual
*Ritual de Conhecimento, 2º círculo (3 PE)*

**Execução** :: padrão
**Alcance** :: curto
**Alvo** :: 1 ser
**Duração** :: sustentada
**Resistência** :: Vontade anula

Descreva o efeito do ritual.
}}

${FINAL}

{{pageNumber 1}}
{{footnote LIVRO DE RITUAIS}}
`,
	},
	{
		id          : 'dossie',
		name        : 'Dossiê de Agentes',
		icon        : 'fas fa-id-card',
		description : 'Fichas e histórico dos agentes da sua mesa.',
		title       : 'Dossiê de Agentes',
		text        : `${capa('Dossiê de Agentes', 'Acesso Restrito')}# Equipe
Descreva a equipe e a sua primeira missão.

{{documento
{{carimbo Confidencial}}
##### DOSSIÊ DE AGENTE
**Nome:** ______________

**Patente:** Recruta

**Classe:** Combatente / Especialista / Ocultista

**NEX:** 5%

**AGI** 1 | **FOR** 1 | **INT** 1 | **PRE** 1 | **VIG** 1

**PV** __ | **PE** __ | **SAN** __ | **Defesa** 10
}}

### Histórico
Conte como este agente conheceu o paranormal e o que ele quer esconder.

### Relatórios de missão
| Missão | Resultado |
|:-------|:----------|
| Nome da missão | O que aconteceu |

${FINAL}

{{pageNumber 1}}
{{footnote DOSSIÊ DE AGENTES}}
`,
	},
];
