import { readFileSync, readdirSync, writeFileSync } from 'fs';

function read_files(path) {
	const folderAndFiles = readdirSync(path, { withFileTypes: true });
	const folders = folderAndFiles
		.filter((fileOrFolder) => fileOrFolder.isDirectory())
		.map((folder) => `${folder.path}/${folder.name}`);
	return [
		...folders.map(read_files).flat(),
		...folderAndFiles.filter((fileOrFolder) => fileOrFolder.isFile()).map((folder) => `${folder.path}/${folder.name}`)
	];
}

function get_Component_name(path) {
	return path.split('/').at(-1).split('.').at(0);
}

function get_component_content(path) {
	return readFileSync(path).toString();
}

function parse_component_props_docs(componentName, componentStr) {
	const componentDocArray = componentStr.match(/(\/\*\*([^/]|\n|\r)*\*\/\r?\n\s*)?export (let|const).*/g);

	if (!componentDocArray) return;

	return componentDocArray.map((t) => {
		const attrs = t.match(
			/(?:\/\*\*(?<description>(?:[^/]|\n|\r)*)\*\/\r?\n\s*)?export (?:let|const) (?<name>\w+)(?:: (?<type>[^=;]*))?(?: ?= (?<def>[^;]*))?/m
		);

		const description = attrs.groups.description
			?.split('*')
			.map((str) => str.trim())
			.join(' ')
			.trim();
		const name = attrs.groups.name?.trim();
		const type = attrs.groups.type?.trim();
		const defaultValue = attrs.groups.def?.trim();

		const warns = [];
		if (!type) warns.push('type');
		if (!description) warns.push('description');
		if (warns.length)
			console.warn(`WARN: component ${componentName}, props ${name} does not have a ${warns.join(', ')}`);

		return { name, type, defaultValue, description };
	});
}

function generate_component_props_docs(path, componentStr, componentDocParsed) {
	const componentDocForComponent = componentDocParsed
		.map(({ name, type, defaultValue, description }) => {
			const _type = type ? `: ${type.replace(/</g, '&lt;').replace(/>/g, '&gt;')}` : '';
			const _defaultValue = defaultValue ? ` = ${defaultValue}` : '';
			const _description = description ? ` — ${description}` : '';
			return `@prop ${name}${_type}${_defaultValue}${_description}`;
		})
		.join('\n');

	writeFileSync(path, componentStr.replace(/\*\*Props\*\*.*-->/s, `**Props**\n${componentDocForComponent}\n-->`));
}

function replace_content(path, startTag, endTag, str) {
	console.log(path, startTag, endTag);
	const file = readFileSync(path).toString();

	writeFileSync(path, file.replace(new RegExp(`${startTag}.*${endTag}`, 's'), `${startTag}\n\n${str}\n\n${endTag}`));
}

function generate_docs(path, componentName, componentDocParsed) {
	const componentDocForComponent =
		`| name | type | default value | usage |
	| --- | --- | --- | --- |
	` +
		componentDocParsed
			.map(({ name, type, defaultValue, description }) => {
				const _defaultValue = defaultValue ? `\`${defaultValue}\`` : '';
				return `| ${name} | \`${type.replace(/\|/g, '&#124;')}\` | ${_defaultValue} | ${description} |`;
			})
			.join('\n');

	replace_content(
		'src/routes/sections/60-Api.md',
		`<!-- PROPS_${componentName}.svelte -->`,
		`<!-- ~PROPS_${componentName}.svelte -->`,
		componentDocForComponent
	);
}

export function generateProps() {
	read_files('./src/lib')
		.filter((file) => file.endsWith('.svelte'))
		.map((path) => ({
			path,
			componentName: get_Component_name(path),
			componentStr: get_component_content(path)
		}))
		.map(({ path, componentName, componentStr }) => ({
			path,
			componentName,
			componentStr,
			componentDocParsed: parse_component_props_docs(componentName, componentStr)
		}))
		.map(({ path, componentName, componentStr, componentDocParsed }) => {
			generate_component_props_docs(path, componentStr, componentDocParsed);
			generate_docs(path, componentName, componentDocParsed);
		});
}
