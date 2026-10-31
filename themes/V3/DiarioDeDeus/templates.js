// Ready-made documents offered when starting a case. All text is original: book text can't be reproduced under the license.
const SELO_LICENCA = '{{licenca\n![Selo da Licença da Comunidade](/assets/selo-licenca.png)\n}}';

const capa = (titulo, subtitulo)=>`{{capa\n![](COLE_O_LINK_DA_IMAGEM_AQUI) {capaImagem}\n\n# ${titulo}\n## ${subtitulo}\n{{autores Escrito por Seu Nome}}\n\n${SELO_LICENCA}\n}}\n\n\\page\n\n`;

const AVISO = '{{note\n##### Aviso de conteúdo\nEste material contém horror e violência. Combine os limites com a sua mesa antes de jogar.\n}}';

// Stat block with every field a threat or character sheet needs
const ficha = (nome, tipo, classes = 'ameaca,frame')=>`{{${classes}
## ${nome}
*${tipo}*
___
**Sentidos** :: Percepção 2d20+5, visão no escuro
**Iniciativa** :: 2d20+5
**Presença Perturbadora** :: DT 14, 1d6 de dano mental (NEX 10% imune)
___
**Defesa** :: 19
**Fortitude** :: 2d20+5
**Reflexos** :: 1d20+5
**Vontade** :: 1d20+5
**Pontos de Vida** :: 100 (machucado 50)
**Resistências** :: balístico 5, corte 5
**Vulnerabilidades** :: morte
**Deslocamento** :: 9m
___
| AGI | FOR | INT | PRE | VIG |
|:---:|:---:|:---:|:---:|:---:|
| 2 | 3 | 1 | 1 | 3 |
___
**Perícias** :: Atletismo 2d20+5, Furtividade 2d20+5

### Habilidades
**Nome da Habilidade.** Descreva uma habilidade passiva.

### Ações
**Padrão: Agredir.** Corpo a corpo x2. Teste 2d20+10, crítico 19. Dano 2d8+5 de corte.

**Reação: Nome da Reação.** Descreva quando ela acontece e o efeito.

**Livre: Nome da Ação.** Descreva o efeito e o limite de uso.

**Enigma de Medo.** Descreva o que é preciso fazer para derrotar a criatura.
}}`;

const diario = `{{diario
##### 12 de março
Escreva aqui a primeira entrada. Comece com algo comum, antes de tudo dar errado.

##### 19 de março
Mostre o primeiro detalhe estranho. Quem escreve ainda tenta explicar o que viu.

##### 2 de abril
A letra muda. Termine com uma frase que deixe os jogadores inquietos.
}}`;

const carta = `{{carta
Cidade, data.

Prezado(a) destinatário(a),

Escreva a carta aqui. Conte o que o remetente sabe, o que ele esconde e o que pede.

Com pesar,

*Nome de quem assina*
}}`;

const regras = `### Origem
{{origem
#### Nome da Origem
*O que o personagem fazia antes de conhecer o paranormal.*

**Perícias Treinadas** :: duas perícias à sua escolha
**Poder de Origem** :: nome e efeito do poder
}}

### Trilha
{{trilha
#### Nome da Trilha
*Trilha de Combatente, Especialista ou Ocultista*

Descreva a filosofia da trilha e o tipo de agente que a segue.

**NEX 10% - Nome do Poder.** Descreva o que o agente recebe neste estágio.

**NEX 40% - Nome do Poder.** Descreva o que o agente recebe neste estágio.

**NEX 65% - Nome do Poder.** Descreva o que o agente recebe neste estágio.

**NEX 99% - Nome do Poder.** Descreva o que o agente recebe neste estágio.
}}

### Ritual
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

### Item amaldiçoado
{{item,sangue
#### Nome do Item
*Item paranormal*

**Espaços** :: 1
**Maldição** :: descreva o efeito e o custo de usar o item.
}}`;

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

${ficha('Nome da Criatura', 'Criatura de Sangue Média, VD 40')}

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

${AVISO}

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
	{
		id          : 'arquivo',
		name        : 'Arquivo Secreto',
		icon        : 'fas fa-archive',
		description : 'Pacote completo: história em documentos, fichas e regras.',
		title       : 'Arquivo Secreto',
		text        : `${capa('Nome do Arquivo', 'Pacote de Conteúdo')}# Boas-vindas, agente
Apresente o arquivo em poucas linhas: o que foi encontrado e por que estava escondido.

${AVISO}

### O que há neste pacote
- **História:** os documentos que contam o que aconteceu.
- **Fichas:** as pessoas e criaturas envolvidas.
- **Regras:** o que os jogadores podem usar na mesa.

\\column

### Relato
Conte a história principal como narrador. Termine com uma pergunta sem resposta.

${carta}

\\page

# A história em documentos
Reúna aqui o que os agentes podem encontrar. Cada documento revela uma parte.

${diario}

\\column

{{documento
{{carimbo Sigiloso}}
##### RELATÓRIO DE MISSÃO
**Local:** ______________

**Data:** ______________

Descreva o que os agentes encontraram no local.
}}

{{note
##### Para o mestre
Explique o que é verdade, o que é boato e como usar estes documentos como pistas.
}}

\\page

# Fichas
Apresente as pessoas e criaturas deste arquivo.

${ficha('Nome da Pessoa', 'Pessoa Média, VD 80')}

\\column

${ficha('Nome da Criatura', 'Criatura de Sangue Grande, VD 120')}

\\page

# Regras
Tudo o que os jogadores podem levar para a mesa.

${regras}

${FINAL}

{{pageNumber 1}}
{{footnote NOME DO ARQUIVO}}
`,
	},
	{
		id          : 'personagem',
		name        : 'Perfil de Personagem',
		icon        : 'fas fa-user-secret',
		description : 'História, relações, segredos e ficha de um NPC.',
		title       : 'Perfil de Personagem',
		text        : `${capa('Nome do Personagem', 'Perfil Confidencial')}# Quem é
Em duas frases, diga quem é esta pessoa e por que os agentes deveriam se preocupar.

${AVISO}

### Passado
Conte a origem do personagem e o momento em que tudo mudou.

### O que quer
Explique o objetivo e até onde está disposto a ir.

### Relações
| Nome | Ligação | O que esconde |
|:-----|:--------|:--------------|
| Nome | Aliado | Um segredo |
| Nome | Rival | Um segredo |

### Como usar na mesa
Sugira como apresentar este personagem e o que muda se ele morrer.

\\column

${ficha('Nome do Personagem', 'Pessoa Média, VD 80')}

${FINAL}

{{pageNumber 1}}
{{footnote PERFIL CONFIDENCIAL}}
`,
	},
	{
		id          : 'diario',
		name        : 'Diário Encontrado',
		icon        : 'fas fa-book-dead',
		description : 'Conte uma história por entradas datadas e cartas.',
		title       : 'Diário Encontrado',
		text        : `${capa('Diário de Alguém', 'Encontrado no Local')}# Sobre este diário
Conte onde o diário foi encontrado, em que estado e quem o escreveu.

${AVISO}

${diario}

\\column

${carta}

{{note
##### Para o mestre
Marque quais trechos entregar aos jogadores e o que cada um revela.
}}

${FINAL}

{{pageNumber 1}}
{{footnote DIÁRIO ENCONTRADO}}
`,
	},
	{
		id          : 'regras',
		name        : 'Pacote de Regras',
		icon        : 'fas fa-dice-d20',
		description : 'Origem, trilha, ritual e item para a sua mesa.',
		title       : 'Pacote de Regras',
		text        : `${capa('Pacote de Regras', 'Regras Opcionais')}# Regras
Explique o tema deste pacote e como incluir estas regras em uma campanha.

${AVISO}

${regras}

${FINAL}

{{pageNumber 1}}
{{footnote PACOTE DE REGRAS}}
`,
	},
];
