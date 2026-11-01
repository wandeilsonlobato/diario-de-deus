/* eslint-disable max-lines */
import dedent                    from 'dedent';
import WatercolorGen 			 from './snippets/watercolor.gen.js';
import ImageMaskGen              from './snippets/imageMask.gen.js';
import FooterGen                 from './snippets/footer.gen.js';
import LicenseGenWotC            from './snippets/licenseWotC.gen.js';
import LicenseGenGNU             from './snippets/licenseGNU.gen.js';
import LicenseGen 			     from './snippets/license.gen.js';
import LicenseGenAelf            from './snippets/licenseAELF.js';
import LicenseDTTRPGGCC          from './snippets/licenseDTRPGCC.gen.js';
import LicenseMongoosePublishing from './snippets/licenseMongoose.gen.js';
import TableOfContentsGen        from './snippets/tableOfContents.gen.js';
import indexGen                  from './snippets/index.gen.js';
const domain = window.location.origin;

export default [

	{
		groupName : 'Editor de Texto',
		icon      : 'fas fa-pencil-alt',
		view      : 'text',
		snippets  : [
			{
				name : 'Quebra de Coluna',
				icon : 'fas fa-columns',
				gen  : '\n\\column\n'
			},
			{
				name : 'Nova Página',
				icon : 'fas fa-file-alt',
				gen  : '\n\\page\n'
			},
			{
				name        : 'Numeração de Página',
				icon        : 'fas fa-bookmark',
				subsnippets : [
					{
						name : 'Número da página',
						icon : 'fas fa-bookmark',
						gen  : '{{pageNumber 1}}\n'
					},
					{
						name : 'Número automático',
						icon : 'fas fa-sort-numeric-down',
						gen  : '{{pageNumber,auto}}\n'
					},
					{
						name : 'Número automático variável',
						icon : 'fas fa-sort-numeric-down',
						gen  : '{{pageNumber $[HB_pageNumber]}}\n'
					},
					{
						name : 'Pular número nesta página',
						icon : 'fas fa-xmark',
						gen  : '{{skipCounting}}\n'
					},
					{
						name : 'Reiniciar numeração',
						icon : 'fas fa-arrow-rotate-left',
						gen  : '{{resetCounting}}\n'
					},
				]
			},
			{
				name        : 'Rodapé',
				icon        : 'fas fa-shoe-prints',
				gen         : FooterGen.createFooterFunc(),
				subsnippets : [
					{
						name : 'Rodapé do título 1',
						icon : 'fas fa-dice-one',
						gen  : FooterGen.createFooterFunc(1)
					},
					{
						name : 'Rodapé do título 2',
						icon : 'fas fa-dice-two',
						gen  : FooterGen.createFooterFunc(2)
					},
					{
						name : 'Rodapé do título 3',
						icon : 'fas fa-dice-three',
						gen  : FooterGen.createFooterFunc(3)
					},
					{
						name : 'Rodapé do título 4',
						icon : 'fas fa-dice-four',
						gen  : FooterGen.createFooterFunc(4)
					},
					{
						name : 'Rodapé do título 5',
						icon : 'fas fa-dice-five',
						gen  : FooterGen.createFooterFunc(5)
					},
					{
						name : 'Rodapé do título 6',
						icon : 'fas fa-dice-six',
						gen  : FooterGen.createFooterFunc(6)
					}
				]
			},
			{
				name : 'Espaço Vertical',
				icon : 'fas fa-arrows-alt-v',
				gen  : '\n::::\n'
			},
			{
				name : 'Espaço Horizontal',
				icon : 'fas fa-arrows-alt-h',
				gen  : ' {{width:100px}} '
			},
			{
				name : 'Bloco Largo',
				icon : 'fas fa-window-maximize',
				gen  : dedent`\n
					{{wide
					Tudo aqui dentro fica mais largo: tabelas, texto, tudo!
					Atenção: as colunas podem se comportar de forma estranha. Talvez seja
					preciso colocar quebras de coluna com \`\column\` para o texto ao
					redor acompanhar este bloco.
					}}
					\n`
			},
			{
				name : 'Código QR',
				icon : 'fas fa-qrcode',
				gen  : (brew)=>{
					return `![]` +
							`(https://api.qrserver.com/v1/create-qr-code/?data=` +
							`${domain}` +
							`&amp;size=100x100) {width:100px;mix-blend-mode:multiply}`;
				}
			},
			{
				name : 'Link para página',
				icon : 'fas fa-link',
				gen  : '[Clique aqui](#p3) para ir à página 3\n'
			},
			{
				name : 'Comentário',
				icon : 'fas fa-code',
				gen  : '<!-- Este comentário não aparece no documento. Atalho: Ctrl/Cmd + /. -->'
			},
			{
				name : 'Crédito ao Homebrewery',
				icon : 'fas fa-dice-d20',
				gen  : function(){
					return dedent`
						{{homebreweryCredits
						Feito com
						
						{{homebreweryIcon}}
						
						The Homebrewery  
						[Homebrewery.Naturalcrit.com](https://homebrewery.naturalcrit.com)
						}}\n\n`;
				},
			},
			{
				name         : 'Sumário',
				icon         : 'fas fa-book',
				gen          : TableOfContentsGen,
				experimental : true,
				subsnippets  : [
					{
						name         : 'Sumário',
						icon         : 'fas fa-book',
						gen          : TableOfContentsGen,
						experimental : true
					},
					{
						name : 'Incluir até o título 3',
						icon : 'fas fa-dice-three',
						gen  : dedent `\n{{tocDepthH3
							}}\n`,

					},
					{
						name : 'Incluir até o título 4',
						icon : 'fas fa-dice-four',
						gen  : dedent `\n{{tocDepthH4
							}}\n`,
					},
					{
						name : 'Incluir até o título 5',
						icon : 'fas fa-dice-five',
						gen  : dedent `\n{{tocDepthH5
							}}\n`,
					},
					{
						name : 'Incluir até o título 6',
						icon : 'fas fa-dice-six',
						gen  : dedent `\n{{tocDepthH6
							}}\n`,
					}
				]
			},
			{
				name : 'Índice',
				icon : 'fas fa-bars',
				gen  : indexGen,
			},

		]
	},
	{
		groupName : 'Licenças',
		icon      : 'fas fa-copyright',
		view      : 'text',
		snippets  : [
			{
				name        : 'AELF',
				subsnippets : [
					{
						name : 'Title Page Declaration',
						icon : 'fas fa-sticky-note',
						gen  : LicenseGenAelf.aelfTitleNotice
					},
					{
						name : 'Legal Declaration',
						icon : 'fas fa-sticky-note',
						gen  : LicenseGenAelf.aelfLegalNotice
					},
					{
						name : 'AELF License',
						icon : 'fas fa-legal',
						gen  : LicenseGenAelf.aelf10a
					}
				]
			},
			{
				name        : 'Creative Commons',
				icon        : 'fab fa-creative-commons',
				subsnippets : [
					{
						name        : 'Text Declarations',
						icon        : 'fab fa-creative-commons',
						subsnippets : [
							{
								name : 'CC0 4.0',
								icon : 'fab fa-creative-commons',
								gen	 : LicenseGen.cczero,
							},

							{
								name : 'CC-BY-4.0',
								icon : 'fab fa-creative-commons',
								gen	 : LicenseGen.ccby,
							},

							{
								name : 'CC-BY-SA 4.0',
								icon : 'fab fa-creative-commons',
								gen	 : LicenseGen.ccbysa,
							},

							{
								name : 'CC-BY-NC 4.0',
								icon : 'fab fa-creative-commons',
								gen	 : LicenseGen.ccbync,
							},

							{
								name : 'CC-BY-NC-SA 4.0',
								icon : 'fab fa-creative-commons',
								gen	 : LicenseGen.ccbyncsa,
							},

							{
								name : 'CC-BY-ND 4.0',
								icon : 'fab fa-creative-commons',
								gen	 : LicenseGen.ccbynd,
							},

							{
								name : 'CC-BY-NC-ND 4.0',
								icon : 'fab fa-creative-commons',
								gen	 : LicenseGen.ccbyncnd,
							},
						]
					},
					{
						name        : 'Badges',
						icon        : 'fab fa-creative-commons',
						subsnippets : [
							{
								name : 'CC0 4.0',
								icon : 'fab fa-creative-commons',
								gen	 : LicenseGen.cczeroBadge,
							},

							{
								name : 'CC-BY-4.0',
								icon : 'fab fa-creative-commons',
								gen	 : LicenseGen.ccbyBadge,
							},

							{
								name : 'CC-BY-SA 4.0',
								icon : 'fab fa-creative-commons',
								gen	 : LicenseGen.ccbysaBadge,
							},

							{
								name : 'CC-BY-NC 4.0',
								icon : 'fab fa-creative-commons',
								gen	 : LicenseGen.ccbyncBadge,
							},

							{
								name : 'CC-BY-NC-SA 4.0',
								icon : 'fab fa-creative-commons',
								gen	 : LicenseGen.ccbyncsaBadge,
							},

							{
								name : 'CC-BY-ND 4.0',
								icon : 'fab fa-creative-commons',
								gen	 : LicenseGen.ccbyndBadge,
							},

							{
								name : 'CC-BY-NC-ND 4.0',
								icon : 'fab fa-creative-commons',
								gen	 : LicenseGen.ccbyncndBadge,
							},
						]
					},
				]
			},
			{
				name        : 'DTRPG Community Content',
				icon        : null,
				subsnippets : [
					{
						name : 'Chronicle System Guild Colophon',
						gen	 : LicenseDTTRPGGCC.greenRoninChronicleSystemGuildColophon,
					},

					{
						name        : 'Green Ronin\'s Age Creator\'s Alliance',
						subsnippets : [
							{
								name        : 'Required Text',
								subsnippets : [
									{
										name : 'Colophon',
										gen	 : LicenseDTTRPGGCC.greenRoninAgeCreatorsAllianceColophon,
									},

									{
										name : 'Cover',
										gen	 : LicenseDTTRPGGCC.greenRoninAgeCreatorsAllianceCover,
									},
								]
							},
							{
								name        : 'Logos',
								subsnippets : [
									{
										name : 'Age',
										gen	 : LicenseDTTRPGGCC.greenRoninAgeCreatorsAllianceLogo,
									},

									{
										name : 'Blue Rose',
										gen	 : LicenseDTTRPGGCC.greenRoninAgeCreatorsAllianceBlueRoseLogo,
									},

									{
										name : 'Fantasy Age Compatible',
										gen	 : LicenseDTTRPGGCC.greenRoninAgeCreatorsAllianceFantasyAgeCompatible,
									},

									{
										name : 'Modern AGE Compatible',
										gen	 : LicenseDTTRPGGCC.greenRoninAgeCreatorsAllianceModernAGECompatible,
									},
								]
							}
						]
					},

					{
						name        : 'Hero Kid\'s Creators Guild',
						subsnippets : [

							{
								name        : 'Required Text',
								subsnippets : [

									{
										name : 'heroForgeHeroKidsCreatorsGuildColophon',
										gen	 : LicenseDTTRPGGCC.heroForgeHeroKidsCreatorsGuildColophon,
									},

									{
										name : 'heroForgeHeroKidsCreatorsGuildSuperKidsColophon',
										gen	 : LicenseDTTRPGGCC.heroForgeHeroKidsCreatorsGuildSuperKidsColophon,
									},

									{
										name : 'heroForgeHeroKidsCreatorsGuildCover',
										gen	 : LicenseDTTRPGGCC.heroForgeHeroKidsCreatorsGuildCover,
									},

									{
										name : 'heroForgeHeroKidsCreatorsGuildSuperKidsCover',
										gen	 : LicenseDTTRPGGCC.heroForgeHeroKidsCreatorsGuildSuperKidsCover,
									},
								]
							}
						]
					},

					{
						name        : 'Travellers\' Aid Society',
						subsnippets : [
							{
								name : 'Legal Statement',
								gen  : LicenseMongoosePublishing.TASLegal,
							}
						]
					},

					{
						name        : 'Super-Powered by M&M',
						subsnippets : [
							{
								name        : 'Required Text',
								subsnippets : [
									{
										name : 'Colophon',
										gen	 : LicenseDTTRPGGCC.greenRoninSuperPoweredMMColophon,
									},

									{
										name : 'Cover',
										gen	 : LicenseDTTRPGGCC.greenRoninSuperPoweredMMCover,
									},

									{
										name : 'Section 15',
										gen	 : LicenseDTTRPGGCC.greenRoninSuperPoweredMMSection15,
									},
								]
							}
						]
					},
				]
			},
			{
				name        : 'GNU',
				icon        : 'fas fa-w',
				subsnippets : [

					{
						name : 'GNU Free Documentation License',
						icon : 'fas fa-w',
						gen	 : LicenseGenGNU.gfdl,
					},

					{
						name : 'GNU FDL Title Page',
						icon : 'fas fa-w',
						gen	 : LicenseGenGNU.gfdltitle,
					},

					{
						name : 'GNU FDL Title Page w/alterations',
						icon : 'fas fa-w',
						gen	 : LicenseGenGNU.gfdltitleinvariant,
					},

					{
						name : 'GNU General Public License v3',
						icon : 'fas fa-w',
						gen	 : LicenseGenGNU.gpl3,
					},

					{
						name : 'GNU GPLv3 Title Page',
						icon : 'fas fa-w',
						gen	 : LicenseGenGNU.gpl3title,
					},
				]
			},
			{
				name        : 'Icons',
				icon        : 'fas fa-i',
				subsnippets : [
					{
						name        : 'Text Declarations',
						icon        : null,
						subsnippets : [
							{
								name : 'Compatibility',
								icon : 'fas fa-i',
								gen	 : LicenseGen.iconsCompatibility,
							},
							{
								name : 'Section 15',
								icon : 'fas fa-i',
								gen	 : LicenseGen.icondsSection15,
							},
							{
								name : 'Trademark',
								icon : 'fas fa-i',
								gen	 : LicenseGen.iconsTrademark,
							},
						]
					},
					{
						name : 'Compatibility Logo',
						icon : 'fas fa-i',
						gen	 : LicenseGen.iconsCompatibilityLogo
					}
				]
			},

			{
				name : 'MIT License',
				icon : null,
				gen  : LicenseGen.mit,
			},

			{
				name        : 'Mongoose Publishing Fair Use',
				icon        : null,
				subsnippets : [
					{
						name : 'Long Form Fair Use',
						icon : null,
						gen  : LicenseMongoosePublishing.fairUseLong,
					},
					{
						name : 'Traveller Fair Use',
						icon : null,
						gen  : LicenseMongoosePublishing.fairUseTraveller,
					},
					{
						name : '2300AD Fair Use',
						icon : null,
						gen  : LicenseMongoosePublishing.fairUse2300AD,
					},
					{
						name : 'Twilight: 2000 Fair Use',
						icon : null,
						gen  : LicenseMongoosePublishing.fairUseTwilight2000,
					},

				]
			},

			{
				name : 'ORC Notice',
				icon : null,
				gen	 : LicenseGen.orc1,
			},


			{
				name        : 'Shadowdark',
				icon        : null,
				subsnippets : [
					{
						name        : 'Logos',
						icon        : 'fas fa-image',
						subsnippets : [
							{
								name : 'Compatibility Logo - Black',
								icon : 'fas fa-image',
								gen  : LicenseGen.shadowDarkBlack
							},
							{
								name : 'Compatibility Logo - White',
								icon : 'fas fa-image',
								gen  : LicenseGen.shadowDarkWhite
							}
						]
					},
					{
						name : 'License Statement',
						icon : 'fas fa-alt',
						gen  : LicenseGen.shadowDarkNotice
					}

				]

			},

			{
				name        : 'True 20',
				subsnippets : [
					{
						name : 'OGL 1.0 Section 15',
						gen	 : LicenseGen.grTrue20Sec15,
					},
					{
						name : 'True20 Logo',
						gen  : LicenseGen.grTrue20CompatLogo,
					}

				]
			},

			{
				name        : 'Wizards of the Coast',
				icon        : 'fab fa-wizards-of-the-coast',
				subsnippets : [

					{
						name : 'OGL 1.0 A',
						icon : 'fab fa-wizards-of-the-coast',
						gen	 : LicenseGenWotC.ogl1a,
					},

					{
						name : 'WoTC Fan Content Policy',
						icon : 'fas fa-w',
						gen	 : LicenseGenWotC.fcp,
					},
				]
			},
		]
	},
	{
		groupName : 'Editor de Estilo',
		icon      : 'fas fa-pencil-alt',
		view      : 'style',
		snippets  : [
			{
				name : 'Comentário',
				icon : 'fas fa-code',
				gen  : '/* Este comentário não aparece no documento. */'
			}
		]
	},
	/*********************** IMAGES *******************/
	{
		groupName : 'Imagens',
		icon      : 'fas fa-images',
		view      : 'text',
		snippets  : [
			{
				name : 'Imagem',
				icon : 'fas fa-image',
				gen  : dedent`
					![Pássaro em folhagem de outono, de L. Prang & Co.](${domain}/assets/bird.webp) {width:325px}`
			},
			{
				name : 'Imagem com texto à esquerda',
				icon : 'fac image-wrap-left',
				gen  : dedent`
					![Diário de Deus](${domain}/assets/logo.png) {width:280px,margin-right:-3cm,wrapLeft}`
			},
			{
				name : 'Imagem com texto à direita',
				icon : 'fac image-wrap-right',
				gen  : dedent`
					![Diário de Deus](${domain}/assets/logo.png) {width:280px,margin-left:-3cm,wrapRight}`
			},
			{
				name : 'Imagem de fundo',
				icon : 'fas fa-tree',
				gen  : dedent`
					![Diário de Deus](${domain}/assets/logo.png) {position:absolute,top:50px,right:30px,width:280px}`
			},
			{
				name : 'Mancha de aquarela',
				icon : 'fas fa-fill-drip',
				gen  : WatercolorGen,
			},
			{
				name         : 'Aquarela central',
				icon         : 'fac mask-center',
				gen          : ImageMaskGen.center,
				experimental : true,
			},
			{
				name         : 'Aquarela na borda',
				icon         : 'fac mask-edge',
				gen          : ImageMaskGen.edge('bottom'),
				experimental : true,
				subsnippets  : [
					{
						name : 'Topo',
						icon : 'fac position-top',
						gen  : ImageMaskGen.edge('top'),
					},
					{
						name : 'Direita',
						icon : 'fac position-right',
						gen  : ImageMaskGen.edge('right'),
					},
					{
						name : 'Base',
						icon : 'fac position-bottom',
						gen  : ImageMaskGen.edge('bottom'),
					},
					{
						name : 'Esquerda',
						icon : 'fac position-left',
						gen  : ImageMaskGen.edge('left'),
					},
				]
			},
			{
				name         : 'Aquarela no canto',
				icon         : 'fac mask-corner',
				gen          : ImageMaskGen.corner,
				experimental : true,
				subsnippets  : [
					{
						name : 'Superior esquerdo',
						icon : 'fac position-top-left',
						gen  : ImageMaskGen.corner('top', 'left'),
					},
					{
						name : 'Superior direito',
						icon : 'fac position-top-right',
						gen  : ImageMaskGen.corner('top', 'right'),
					},
					{
						name : 'Inferior esquerdo',
						icon : 'fac position-bottom-left',
						gen  : ImageMaskGen.corner('bottom', 'left'),
					},
					{
						name : 'Inferior direito',
						icon : 'fac position-bottom-right',
						gen  : ImageMaskGen.corner('bottom', 'right'),
					}
				]
			},
			{
				name : 'Marca-d\'água',
				icon : 'fas fa-id-card',
				gen  : dedent`
				{{watermark Diário de Deus}}\n`
			},
		]
	},

	/*********************  TABLES *********************/

	{
		groupName : 'Tabelas',
		icon      : 'fas fa-table',
		view      : 'text',
		snippets  : [
			{
				name : 'Tabela',
				icon : 'fas fa-th-list',
				gen  : function(){
					return dedent`
						##### Suspeitos do Caso
						| Nome              | Ocupação   | Álibi                |
						|:------------------|:-----------|:---------------------|
						| Nome do suspeito  | Professor  | Estava na biblioteca |
						| Nome do suspeito  | Vigia      | Fazia a ronda        |
						| Nome do suspeito  | Médica     | Atendia no hospital  |
						| Nome do suspeito  | Jornalista | Nenhum confirmado    |
						\n`;
				}
			},
			{
				name : 'Tabela Larga',
				icon : 'fas fa-list',
				gen  : function(){
					return dedent`
						{{wide
						##### Evidências Encontradas
						| Item                | Onde estava  | Estado    | Importância | Observação                  |
						|:--------------------|:-------------|:----------|:------------|:----------------------------|
						| *Na casa*           |              |           |             |                             |
						| &emsp; Diário       | Sob o assoalho | Rasgado | Alta        | Faltam as últimas páginas   |
						| &emsp; Fotografia   | Na escrivaninha | Queimada | Média     | Dá para ver dois rostos     |
						| *No porão*          |              |           |             |                             |
						| &emsp; Símbolo      | Na parede    | Recente   | Alta        | Feito com material orgânico |
						| &emsp; Chave        | No chão      | Enferrujada | Baixa     | Abre uma porta desconhecida |
						}}
						\n`;
				}
			},
			{
				name : 'Tabela dividida',
				icon : 'fas fa-th-large',
				gen  : function(){
					return dedent`
						##### Dificuldade dos Testes
						{{column-count:2
						| Dificuldade | DT |
						|:------------|:--:|
						| Muito fácil | 5  |
						| Fácil       | 10 |
						| Média       | 15 |

						| Dificuldade     | DT |
						|:----------------|:--:|
						| Difícil         | 20 |
						| Muito difícil   | 25 |
						| Quase impossível| 30 |
						}}
						\n`;
				}
			}
		]
	},
	/**************** FONTS *************/
	{
		groupName : 'Fontes',
		icon   	  : 'fas fa-keyboard',
		view   	  : 'text',
		snippets  : [
			{
				name : 'Padrão do tema',
				icon : 'fas fa-rotate-left',
				gen	 : dedent`{{font-family:unset Dummy Text}}`
			},
			{
				name : 'Sigilos',
				icon : 'font Sigilos',
				gen	 : dedent`{{font-family:Sigilos Dummy Text}}`
			},
			{
				name : 'Open Sans',
				icon : 'font OpenSans',
				gen	 : dedent`{{font-family:OpenSans Dummy Text}}`
			},
			{
				name : 'Code Bold',
				icon : 'font CodeBold',
				gen	 : dedent`{{font-family:CodeBold Dummy Text}}`
			},
			{
				name : 'Code Light',
				icon : 'font CodeLight',
				gen	 : dedent`{{font-family:CodeLight Dummy Text}}`
			},
			{
				name : 'Scaly Sans',
				icon : 'font ScalySansRemake',
				gen	 : dedent`{{font-family:ScalySansRemake Dummy Text}}`
			},
			{
				name : 'Book Insanity',
				icon : 'font BookInsanityRemake',
				gen	 : dedent`{{font-family:BookInsanityRemake Dummy Text}}`
			},
			{
				name : 'Mr Eaves',
				icon : 'font MrEavesRemake',
				gen	 : dedent`{{font-family:MrEavesRemake Dummy Text}}`
			},
			{
				name : 'Pagella',
				icon : 'font Pagella',
				gen	 : dedent`{{font-family:Pagella Dummy Text}}`
			},
			{
				name : 'Solbera Imitation',
				icon : 'font SolberaImitationRemake',
				gen  : dedent`{{font-family:SolberaImitationRemake Dummy Text}}`
			  },
			  {
				name : 'Scaly Sans Small Caps',
				icon : 'font ScalySansSmallCapsRemake',
				gen  : dedent`{{font-family:ScalySansSmallCapsRemake Dummy Text}}`
			  },
			  {
				name : 'Walter Turncoat',
				icon : 'font WalterTurncoat',
				gen  : dedent`{{font-family:WalterTurncoat Dummy Text}}`
			  },
			  {
				name : 'Lato',
				icon : 'font Lato',
				gen  : dedent`{{font-family:Lato Dummy Text}}`
			  },
			  {
				name : 'Courier',
				icon : 'font Courier',
				gen  : dedent`{{font-family:Courier Dummy Text}}`
			  },
			  {
				name : 'Nodesto Caps Condensed',
				icon : 'font NodestoCapsCondensed',
				gen  : dedent`{{font-family:NodestoCapsCondensed Dummy Text}}`
			  },
			  {
				name : 'Overpass',
				icon : 'font Overpass',
				gen  : dedent`{{font-family:Overpass Dummy Text}}`
			  },
			  {
				name : 'Davek',
				icon : 'font Davek',
				gen  : dedent`{{font-family:Davek Dummy Text}}`
			  },
			  {
				name : 'Iokharic',
				icon : 'font Iokharic',
				gen  : dedent`{{font-family:Iokharic Dummy Text}}`
			  },
			  {
				name : 'Rellanic',
				icon : 'font Rellanic',
				gen  : dedent`{{font-family:Rellanic Dummy Text}}`
			  },
			  {
				name : 'Times New Roman',
				icon : 'font TimesNewRoman',
				gen  : dedent`{{font-family:"Times New Roman" Dummy Text}}`
			  }
		]
	},

	/**************** LAYOUT *************/

	{
		groupName : 'Impressão',
		icon      : 'fas fa-print',
		view      : 'style',
		snippets  : [
			{
				name : 'Página Carta (EUA)',
				icon : 'far fa-file',
				gen  : dedent`/* Página Carta */
					.page {
						width  : 215.9mm; /* 8.5in */
						height : 279.4mm; /* 11in */
					}\n\n`,
			},
			{
				name : 'Página A3',
				icon : 'far fa-file',
				gen  : dedent`/* Página A3 */
					.page {
						width  : 297mm;
						height : 420mm;
					}\n\n`,
			},
			{
				name : 'Página A4',
				icon : 'far fa-file',
				gen  : dedent`/* Página A4 */
					.page {
						width  : 210mm;
						height : 296.8mm;
					}\n\n`
			},
			{
				name : 'Página A5',
				icon : 'far fa-file',
				gen  : dedent`/* Página A5 */
					.page {
						width  : 148mm;
						height : 210mm;
				}\n\n`,
			},
			{
				name : 'Página quadrada',
				icon : 'far fa-file',
				gen  : dedent`/* Página quadrada */
					.page {
						width   : 125mm;
						height  : 125mm;
						padding : 12.5mm;
						columns : unset;
					}\n\n`
			},
			{
				name : 'Página cartão',
				icon : 'far fa-file',
				gen  : dedent`/* Página cartão */
					.page {
						width     : 63.5mm;
						height    : 88.9mm;
						padding	  : 5mm;
						columns	  : unset;
					}\n\n`
			},
			{
				name : 'Economizar Tinta',
				icon : 'fas fa-tint',
				gen  : dedent`
					/* Economizar tinta */
					*:is(.page) {
						background : white !important;
						filter : drop-shadow(0px 0px 3px #888) !important;
					}

					.page img {
						visibility : hidden;
					}\n\n`
			},
		]
	},
];

