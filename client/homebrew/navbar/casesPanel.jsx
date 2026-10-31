import React, { useState } from 'react';
import { currentCaseId, deleteCase, listCases, openCase, startFromTemplate, startNewCase } from '../utils/caseLibrary.js';
import templates from '@themes/V3/DiarioDeDeus/templates.js';
import downloadBrew from '../utils/downloadBrew.js';

const DATE_FORMAT = { dateStyle: 'short', timeStyle: 'short' };

const CasesPanel = ({ onClose })=>{
	const [cases, setCases] = useState(listCases);
	const current = currentCaseId();

	const goToEditor = ()=>{
		window.onbeforeunload = null;
		window.location.href = '/new';
	};

	const handleOpen = (id)=>{
		if(openCase(id)) goToEditor();
	};

	const handleNew = ()=>{
		startNewCase();
		goToEditor();
	};

	const handleTemplate = (template)=>{
		startFromTemplate(template);
		goToEditor();
	};

	const handleDelete = (item)=>{
		if(!confirm(`Apagar "${item.title}"? Isso não pode ser desfeito.`)) return;
		deleteCase(item.id);
		if(item.id === current) return goToEditor();
		setCases(listCases());
	};

	return <div className='casesOverlay' onClick={(e)=>e.target === e.currentTarget && onClose()}>
		<div className='casesPanel' role='dialog' aria-label='Meus casos'>
			<header>
				<h2>Meus casos</h2>
				<button className='fechar' aria-label='Fechar' onClick={onClose}><i className='fas fa-times' /></button>
			</header>
			<p className='aviso'>Seus casos ficam só neste navegador. Baixe um arquivo para guardar uma cópia ou levar para outro aparelho.</p>
			<button className='novoCaso' onClick={handleNew}><i className='fas fa-plus' /> Novo caso em branco</button>
			<h3>Começar de um modelo</h3>
			<div className='modelos'>
				{templates.map((template)=>(
					<button key={template.id} className='modelo' onClick={()=>handleTemplate(template)}>
						<i className={template.icon} />
						<strong>{template.name}</strong>
						<small>{template.description}</small>
					</button>
				))}
			</div>
			{!!cases.length && <h3>Seus casos</h3>}
			<ul>
				{cases.map((item)=>(
					<li key={item.id} className={item.id === current ? 'atual' : ''}>
						<button className='abrir' onClick={()=>handleOpen(item.id)}>
							<strong>{item.title}</strong>
							<small>{item.id === current ? 'Aberto agora · ' : ''}{new Date(item.updatedAt).toLocaleString('pt-BR', DATE_FORMAT)}</small>
						</button>
						<button aria-label={`Baixar ${item.title}`} title='Baixar arquivo' onClick={()=>downloadBrew({ ...item.meta, text: item.text, style: item.style })}>
							<i className='fas fa-download' />
						</button>
						<button aria-label={`Apagar ${item.title}`} title='Apagar' onClick={()=>handleDelete(item)}>
							<i className='fas fa-trash-alt' />
						</button>
					</li>
				))}
			</ul>
		</div>
	</div>;
};

export default CasesPanel;
