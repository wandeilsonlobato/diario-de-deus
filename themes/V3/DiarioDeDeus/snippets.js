import RitualGen from './snippets/ritual.gen.js';
import AmeacaGen from './snippets/ameaca.gen.js';
import AgenteGen from './snippets/agente.gen.js';
import dedent    from 'dedent';

// Mandatory on the cover by the Licença da Comunidade, at 10% of the width or more
const SELO_LICENCA = '{{licenca\n![Selo da Licença da Comunidade](/assets/selo-licenca.png)\n}}';

export default [
	/************************* AGENTES ********************/
	{
		groupName : 'Agentes',
		icon      : 'fas fa-user-secret',
		view      : 'text',
		snippets  : [
			{
				name : 'Dossiê de Agente',
				icon : 'fas fa-id-card',
				gen  : AgenteGen.ficha,
			},
			{
				name : 'Trilha',
				icon : 'fas fa-route',
				gen  : AgenteGen.trilha,
			},
			{
				name : 'Origem',
				icon : 'fas fa-fingerprint',
				gen  : AgenteGen.origem,
			},
			{
				name : 'Tabela de NEX',
				icon : 'fas fa-table',
				gen  : AgenteGen.tabelaNex,
			},
		]
	},

	/************************* OUTRO LADO ********************/
	{
		groupName : 'Outro Lado',
		icon      : 'fas fa-eye',
		view      : 'text',
		snippets  : [
			{
				name : 'Ritual',
				icon : 'fas fa-magic',
				gen  : RitualGen.ritual,
			},
			{
				name : 'Lista de Rituais',
				icon : 'fas fa-scroll',
				gen  : RitualGen.listaRituais,
			},
			{
				name : 'Texto em Sigilos',
				icon : 'fas fa-language',
				gen  : '{{sigilos O Outro Lado observa}}',
			},
			{
				name : 'Ameaça',
				icon : 'fas fa-spider',
				gen  : AmeacaGen.ameaca('ameaca,frame'),
			},
			{
				name : 'Ameaça (sem moldura)',
				icon : 'fas fa-paw',
				gen  : AmeacaGen.ameaca('ameaca'),
			},
			{
				name : 'Item Amaldiçoado',
				icon : 'fas fa-skull',
				gen  : AgenteGen.item,
			},
		]
	},

	/************************* CASO ********************/
	{
		groupName : 'Caso',
		icon      : 'fas fa-folder-open',
		view      : 'text',
		snippets  : [
			{
				name : 'Capa do Caso',
				icon : 'fas fa-book',
				gen  : `{{capa\n![](COLE_O_LINK_DA_IMAGEM_AQUI) {capaImagem}\n\n# Nome do Caso\n## Arquivo Ordo Realitas\n{{autores Escrito por Seu Nome}}\n\n${SELO_LICENCA}\n}}\n\n\\page\n\n`,
			},
			{
				name : 'Selo da Licença',
				icon : 'fas fa-stamp',
				gen  : `${SELO_LICENCA}\n\n`,
			},
			{
				name : 'Aviso da Licença (só texto)',
				icon : 'fas fa-balance-scale',
				gen  : 'Este é um conteúdo não oficial, publicado sob a Licença da Comunidade de Ordem Paranormal.\n\n',
			},
			{
				name : 'Documento',
				icon : 'fas fa-file-alt',
				gen  : dedent`
					{{documento
					{{carimbo Sigiloso}}
					##### RELATÓRIO DE MISSÃO
					**Local:** ______________

					**Data:** ______________

					Descreva o que os agentes encontraram no local.
					}}
					\n`,
			},
			{
				name : 'Nota',
				icon : 'fas fa-sticky-note',
				gen  : dedent`
					{{note
					##### Informação Importante
					Use notas para destacar regras e observações ao mestre.
					}}
					\n`,
			},
			{
				name : 'Texto para Leitura',
				icon : 'fas fa-comment-alt',
				gen  : dedent`
					{{descriptive
					##### Cena
					Use este bloco para o texto lido em voz alta aos jogadores.
					}}
					\n`,
			},
			{
				name : 'Citação',
				icon : 'fas fa-quote-right',
				gen  : dedent`
					{{quote
					Escreva aqui a citação.

					{{attribution Autor da citação}}
					}}
					\n`,
			},
			{
				name : 'Elementos',
				icon : 'fas fa-circle-notch',
				gen  : '{{sangue Sangue}} {{morte Morte}} {{conhecimento Conhecimento}} {{energia Energia}} {{medo Medo}}',
			},
		]
	},

	/**************** IMPRESSÃO *************/
	{
		groupName : 'Impressão',
		icon      : 'fas fa-print',
		view      : 'style',
		snippets  : [
			{
				name : 'Economizar Tinta',
				icon : 'fas fa-tint',
				gen  : dedent`
					/* Economizar Tinta */
					:root {
						--HB_Color_Background : #FFFFFF;
						--HB_Color_Paper      : #F2F2F2;
						--HB_Color_Text       : #000000;
						--HB_Color_Heading    : #000000;
						--HB_Color_TextMuted  : #444444;
					}\n\n`
			},
		]
	}
];
