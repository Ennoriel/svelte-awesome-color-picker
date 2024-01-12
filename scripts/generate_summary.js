import { readFileSync, readdirSync, writeFileSync } from 'fs';

const summaryStartTag = '<!-- SUMMARY -->';
const summaryEndTag = '<!-- ¤SUMMARY -->';
const summaryRegexp = new RegExp(`${summaryStartTag}[^~]*${summaryEndTag}`, 's');

export function generateSummary() {
	const path = './src/routes/sections';
	const docs = readdirSync(path)
		.map((file) => `${path}/${file}`)
		.map((file) => readFileSync(file))
		.map((content) => content.toString())
		.join('\n');
	const summaryFile = readFileSync(`${path}/40-Summary.md`).toString();

	// const file = readFileSync('./src/routes/+page.md').toString();
	const headings = docs.match(/##+ .*/g);
	const summary = headings
		.map((title) => title.split('## '))
		.map(([level, title]) => ({
			indentation: level.replace(/#/g, '  '),
			title,
			href: title
				.toLocaleLowerCase()
				.replace(/[^ a-zA-Z0-9]/g, '')
				.replace(/ /g, '-')
		}))
		.map(({ indentation, title, href }) => `${indentation}- [${title}](#${href})`)
		.join('\n');

	writeFileSync(
		`${path}/40-Summary.md`,
		summaryFile.replace(summaryRegexp, `${summaryStartTag}\n${summary}\n${summaryEndTag}`)
	);
}
