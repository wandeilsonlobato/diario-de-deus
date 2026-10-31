import React from 'react';

// Replaces the blank page of a crash with what happened and a way out. Saved cases are never touched.
const RESET_KEYS = ['HB_newPage_content', 'HB_newPage_style', 'HB_newPage_snippets', 'HB_newPage_meta', 'DD_caso_atual', 'HB_renderer_toolbarState', 'HB_edit_settings'];

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { error: null };
	}

	static getDerivedStateFromError(error) {
		return { error };
	}

	resetEditor = ()=>{
		RESET_KEYS.forEach((key)=>localStorage.removeItem(key));
		window.location.href = '/new';
	};

	render() {
		if(!this.state.error) return this.props.children;

		return <div className='telaDeErro'>
			<h1>Algo deu errado</h1>
			<p>O site encontrou um erro. Seus casos salvos não foram apagados.</p>
			<button onClick={this.resetEditor}>Abrir o editor de novo</button>
			<p><small>Se isso continuar, mande um print desta tela:</small></p>
			<pre>{String(this.state.error?.message ?? this.state.error)}{'\n'}{window.location.pathname}</pre>
		</div>;
	}
}

export default ErrorBoundary;
