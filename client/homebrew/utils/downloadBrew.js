import * as yaml from 'js-yaml';
import _         from 'lodash';

const METADATA_FIELDS = ['title', 'description', 'renderer', 'theme', 'lang'];

// Same format read by the "de arquivo" option: metadata block, optional css block, then the text
export const brewToFileText = (brew)=>{
	const metadata = yaml.dump(_.pick(brew, METADATA_FIELDS));
	const style = brew.style ? `\`\`\`css\n${brew.style}\n\`\`\`\n\n` : '';
	return `\`\`\`metadata\n${metadata}\`\`\`\n\n${style}${brew.text ?? ''}`;
};

const downloadBrew = (brew)=>{
	const name = (brew.title || 'documento').replace(/[^\p{L}\p{N} _-]/gu, '').trim() || 'documento';
	const url = URL.createObjectURL(new Blob([brewToFileText(brew)], { type: 'text/plain;charset=utf-8' }));
	const link = document.createElement('a');
	link.href = url;
	link.download = `${name}.txt`;
	link.click();
	URL.revokeObjectURL(url);
};

export default downloadBrew;
