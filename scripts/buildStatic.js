// Generates the static site in build/ after `vite build`: one HTML file per page and the theme bundles
import fs from 'fs-extra';
import { splitTextStyleAndMetadata } from '../shared/helpers.js';

const BUILD_DIR = 'build';

const { version } = fs.readJsonSync('package.json');
const themes = fs.readJsonSync('themes/themes.json');
const template = fs.readFileSync(`${BUILD_DIR}/index.html`, 'utf8');

const config = { local: false, staticSite: true, publicUrl: '', baseUrl: '', environment: 'production', googleLogin: false };

const writePage = (dir, url, brew)=>{
	const props = { version, url, brew, account: null, config };
	const safeProps = JSON.stringify(props).replace(/<(?=\/?script)/ig, '\\u003c');
	const html = template.replace('<head>', ()=>`<head>\n<script id="props">window.__INITIAL_PROPS__ = ${safeProps}</script>\n`);
	fs.outputFileSync(`${dir}/index.html`, html);
};

// Same output as the /api/theme route for a static theme, walking up its parent themes
const themeBundle = (renderer, name)=>{
	const styles = [];
	const snippets = [];
	for (let id = name; id; id = themes[renderer][id].baseTheme) {
		styles.unshift(`/* From Theme ${id} */\n\n@import url("/themes/${renderer}/${id}/style.css");`);
		snippets.unshift(`${renderer}_${id}`);
	}
	return { styles, snippets, name };
};

for (const renderer of Object.keys(themes)) {
	for (const name of Object.keys(themes[renderer])) {
		fs.outputJsonSync(`${BUILD_DIR}/theme-bundles/${renderer}/${name}.json`, themeBundle(renderer, name));
	}
}

const home = {
	text     : fs.readFileSync('client/homebrew/pages/homePage/welcome_msg.md', 'utf8'),
	renderer : 'V3',
	theme    : 'DiarioDeDeus',
};
splitTextStyleAndMetadata(home);

writePage(`${BUILD_DIR}/new`, '/new', undefined);
writePage(BUILD_DIR, '/', home);

console.log('Static site written to build/');
