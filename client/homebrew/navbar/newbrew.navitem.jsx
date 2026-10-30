import React from 'react';
import _ from 'lodash';
import Nav from './nav.jsx';
import { splitTextStyleAndMetadata } from '@shared/helpers.js';
import { startNewCase } from '../utils/caseLibrary.js';

const BREWKEY  = 'HB_newPage_content';
const STYLEKEY = 'HB_newPage_style';
const METAKEY = 'HB_newPage_meta';

const NewBrew = ()=>{
	const handleFileChange = (e)=>{
		const file = e.target.files[0];
		if(!file) return;

		if(!global.config?.staticSite && !confirmLocalStorageChange()) return;

		const reader = new FileReader();
		reader.onload = (e)=>{
			const fileContent = e.target.result;
			const newBrew = { text: fileContent, style: '' };

			if(fileContent.startsWith('```metadata')) {
				splitTextStyleAndMetadata(newBrew);
				if(global.config?.staticSite) startNewCase();
				localStorage.setItem(BREWKEY, newBrew.text);
				localStorage.setItem(STYLEKEY, newBrew.style);
				localStorage.setItem(METAKEY, JSON.stringify(
					_.pick(newBrew, ['title', 'description', 'tags', 'renderer', 'theme', 'lang'])
				));
				window.location.href = '/new';
				return;
			}

			const type = file.name.split('.').pop().toLowerCase();

			alert(`Arquivo inválido: ${!type ? 'sem extensão' :`arquivos .${type} não são aceitos`}. Use um arquivo .txt baixado do Diário de Deus.`);

			console.log(file);
		};
		reader.readAsText(file);
	};

	const confirmLocalStorageChange = ()=>{
		const currentText  = localStorage.getItem(BREWKEY);
		const currentStyle = localStorage.getItem(STYLEKEY);
		const currentMeta  = localStorage.getItem(METAKEY);

		// TRUE if no data in any local storage key
		// TRUE if data in any local storage key AND approval given
		// FALSE if data in any local storage key AND approval declined
		return (!(currentText || currentStyle || currentMeta) || confirm(
			`Você tem alterações neste documento. Se continuar, elas serão PERDIDAS.\nDeseja continuar?`
		));
	};

	const clearLocalStorage = ()=>{
		if(global.config?.staticSite) {
			startNewCase();
			window.location.href = '/new';
			return;
		}
		if(!confirmLocalStorageChange()) return;

		localStorage.removeItem(BREWKEY);
		localStorage.removeItem(STYLEKEY);
		localStorage.removeItem(METAKEY);

		window.location.href = '/new';
		return;
	};


	return (
		<Nav.dropdown>
			<Nav.item
				className='new'
				color='purple'
				icon='fa-solid fa-plus-square'>
					novo
			</Nav.item>
			{!global.config?.staticSite && <Nav.item
				className='new'
				href='/new'
				newTab={true}
				color='purple'
				icon='fa-solid fa-file'>
					retomar rascunho
			</Nav.item>}
			<Nav.item
				className='fromBlank'
				newTab={true}
				color='yellow'
				icon='fa-solid fa-file-circle-plus'
				onClick={()=>{ clearLocalStorage(); }}>
					em branco
			</Nav.item>
			<Nav.item
				className='fromFile'
				color='green'
				icon='fa-solid fa-upload'
				onClick={()=>{ document.getElementById('uploadTxt').click(); }}>
				<input id='uploadTxt' className='newFromLocal' type='file' onChange={handleFileChange} style={{ display: 'none' }} />
					de arquivo
			</Nav.item>
		</Nav.dropdown>
	);
};

export default NewBrew;
