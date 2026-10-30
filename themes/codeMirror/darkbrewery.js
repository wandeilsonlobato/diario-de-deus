import { EditorView } from '@codemirror/view';


export default EditorView.theme({
	'&' : {
		backgroundColor : '#0C0B0E',
		color           : '#C9C2B6',
	},
	'.cm-content' : {
		padding    : '4px 0',
		fontFamily : 'monospace',
		fontSize   : '13px',
		lineHeight : '1',
	},
	'.cm-line' : {
		padding : '0 4px',
	},
	'.cm-gutters' : {
		borderRight     : '1px solid #2E2935',
		backgroundColor : '#0C0B0E',
		whiteSpace      : 'nowrap',
	},
	'.cm-foldGutter' : {
		borderLeft      : '1px solid #2E2935',
		backgroundColor : '#0C0B0E',
	},
	'.cm-foldGutter:hover' : {
		backgroundColor : '#2E2935',
	},
	'.cm-gutterElement' : {
		color : '#6F6876',
	},
	'.cm-linenumber' : {
		padding    : '0 3px 0 5px',
		minWidth   : '20px',
		textAlign  : 'right',
		color      : '#6F6876',
		whiteSpace : 'nowrap',
	},
	'.cm-cursor' : {
		borderLeft : '1px solid #E0E2E4',
	},
	'.cm-fat-cursor' : {
		width           : 'auto',
		backgroundColor : '#7e7',
		caretColor      : 'transparent',
	},
	'.cm-activeLine' : {
		backgroundColor : '#868c9323',
	},
	'.cm-gutterElement.cm-activeLineGutter' : {
		backgroundColor : '#868c9323',
	},
	'.cm-activeLine' : {
		backgroundColor : '#868c9323',
	},
	'.cm-selectionBackground' : {
		backgroundColor : '#5A1020',
	},
	'&.cm-focused .cm-selectionBackground' : {
		backgroundColor : '#5A1020 !important',
	},
	'.cm-pageLine' : {
		backgroundColor : '#1C1921',
		color           : '#E0263F',
		fontWeight      : 'bold',
		letterSpacing   : '.5px',
		borderTop       : '1px solid #C2152F',
	},
	'.cm-columnSplit' : {
		backgroundColor : '#1C1921',
		color           : '#958D9C',
		fontWeight      : 'bold',
		letterSpacing   : '1px',
		borderBottom    : '1px solid #2E2935',
	},
	'.cm-line.cm-block, .cm-line .cm-inline-block' : {
		color : '#E3E3E3',
	},
	'.cm-definitionList .cm-definitionTerm' : {
		color : '#E3E3E3',
	},
	'.cm-definitionList .cm-definitionColon' : {
		backgroundColor : '#0000',
		color           : '#958D9C',
	},
	'.cm-definitionList .cm-definitionDesc' : {
		color : '#E8E2D6',
	},

	// Semantic classes
	'.cm-header'                         : { color: '#F0566B', fontWeight: 'bold' },
	'.cm-strong'                         : { color: '#FFFFFF', fontWeight: 'bold' },
	'.cm-em'                             : { fontStyle: 'italic' },
	'.cm-keyword'                        : { color: '#fff' },
	'.cm-atom, .cm-value, .cm-color'     : { color: '#c1939a' },
	'.cm-number'                         : { color: '#2986cc' },
	'.cm-def'                            : { color: '#2986cc' },
	'.cm-list'                           : { color: '#E0B13A' },
	'.cm-variable, .cm-type'             : { color: '#085' },
	'.cm-comment'                        : { color: '#bbc700' },
	'.cm-link'                           : { color: '#A45BEF', textDecoration: 'underline' },
	'.cm-string'                         : { color: '#AA8261', textDecoration: 'none'  },
	'.cm-string-2'                       : { color: '#f50', textDecoration: 'none'  },
	'.cm-meta, .cm-qualifier, .cm-class' : { color: '#19ee2b' },
	'.cm-builtin'                        : { color: '#fff' },
	'.cm-bracket'                        : { color: '#997' },
	'.cm-tag, .cm-attribute'             : { color: '#E0B13A' },
	'.cm-hr'                             : { color: '#999' },
	'.cm-negative'                       : { color: '#d44' },
	'.cm-positive'                       : { color: '#292' },
	'.cm-error, .cm-invalidchar'         : { color: '#c50202' },
	'.cm-matchingbracket'                : { color: '#0b0' },
	'.cm-nonmatchingbracket'             : { color: '#a22' },
	'.cm-matchingtag'                    : { backgroundColor: 'rgba(255, 150, 0, 0.3)' },
	'.cm-quote'                          : { color: '#958D9C' },
}, { dark: true });