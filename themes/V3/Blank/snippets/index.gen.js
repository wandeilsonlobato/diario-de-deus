import dedent from 'dedent';

export default ()=>{
	return dedent`
	{{index,wide,columns:5;
	##### Índice
	- Agentes
	  - equipe, 3
	  - dossiês, 5
	  - relatórios, 12
	- Ameaças
	  - criaturas, 8
	  - pessoas, 14
	  - enigmas de medo, 26-27
	- Elementos
	  - Sangue, 10
	  - Morte, 13
	  - Conhecimento, 23
	  - Energia, 30
	  - Medo, 31
	- Rituais
	  - primeiro círculo, 15
	  - segundo círculo, 18
	- Locais
	  - sede, 4
	  - cena do crime, 9
	}}`;
};