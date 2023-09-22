import { readFileSync, writeFileSync } from 'fs';

const readmeStartTag = '<!-- README-LESS -->';
const readmeEndTag = '<!-- ~README-LESS -->';
const readmeRegexp = new RegExp(`${readmeStartTag}[^~]*${readmeEndTag}\r?\n?\r?\n?`, 'gs');
const readmeEndTagRexep = new RegExp(`${readmeEndTag}\r?\n?`, 'g');

export function generateReadme() {
	const toto = readFileSync('./src/routes/+page.md')
		.toString()
		.replace(readmeRegexp, '')
		.replace(readmeEndTagRexep, '');
	writeFileSync('./README.md', toto);
}
