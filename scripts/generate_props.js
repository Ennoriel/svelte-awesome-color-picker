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

function get_component_name(path) {
	return path.split('/').at(-1).split('.').at(0);
}

function get_component_content(path) {
	return readFileSync(path).toString();
}

/**
 * @param {string} componentStr - raw string component
 * @returns raw string of the script tag
 */
export function getScriptStr(componentStr) {
	let scriptTagStr = componentStr.match(/<script(?<result>.*)<\/script>/s);
	scriptTagStr = scriptTagStr.groups?.result;
	return scriptTagStr;
}

/**
 * @param {string} scriptTagStr - raw string script tag
 * @returns raw string of the interface body
 */
export function getInterfacePropsStr(scriptTagStr) {
	let interfacePropsStr = scriptTagStr.split('interface Props {')[1].split('	}')[0];
	interfacePropsStr = interfacePropsStr?.replace(/\t+/g, '')?.trim();
	return interfacePropsStr;
}

/**
 * @param {string} scriptTagStr - raw string script tag
 * @returns raw string of the destructured props
 */
export function getDestructuredPropsStr(scriptTagStr) {
	let destructuredPropsStr = scriptTagStr.match(/let \{(?<result>.*)\}: Props = \$props\(\);/s);
	destructuredPropsStr = destructuredPropsStr?.groups?.result;
	destructuredPropsStr = destructuredPropsStr?.replace(/\t+/g, '')?.trim();
	return destructuredPropsStr;
}

export function extractMetadataFromInterface(interfacePropsStr) {
	let metadata = interfacePropsStr.split(/;\n/);
	return metadata.map((m) => {
		const [description, rest] = m.split('*/');
		const [name, ...type] = rest.split(':');
		return {
			description: description.replace('/**', '').replace(/\*/g, '').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim(),
			isOptional: name.includes('?'),
			name: name.replace('?', '').trim(),
			type: type
				.join(':')
				.trim()
				.replace('\n', ' ')
				.replace(/^(\| )?/, '')
				.replace(/;$/, '')
		};
	});
}

export function extractMetadataFromProps(destructuredPropsStr) {
	let metadata = destructuredPropsStr.includes('\n')
		? destructuredPropsStr.split('\n')
		: destructuredPropsStr.split(',');
	return metadata.map((m) => {
		const [name, defaultValue = ''] = m.split('=');
		const isBindable = !!defaultValue?.includes('$bindable');
		const isEvent = name.startsWith('on');
		return {
			name: name.replace(',', '').trim(),
			isBindable,
			isEvent,
			defaultValue:
				(isBindable ? defaultValue.match(/\$bindable\((?<result>.*)\)/s)?.groups?.result : defaultValue)
					?.replace(/,?$/, '')
					?.trim() ?? ''
		};
	});
}

function mergeArraysByKey(arrayA, arrayB, key) {
	const map = new Map();
	arrayA.forEach((item) => map.set(key(item), item));
	arrayB.forEach((item) => map.set(key(item), { ...map.get(key(item)), ...item }));
	return Array.from(map.values());
}

export function parseComponentPropsDocs(componentName, componentStr) {
	console.log(componentName);
	const scriptTagStr = getScriptStr(componentStr);
	const interfacePropsStr = getInterfacePropsStr(scriptTagStr);
	const metadataA = extractMetadataFromInterface(interfacePropsStr);

	const destructuredPropsStr = getDestructuredPropsStr(scriptTagStr);
	const metadataB = extractMetadataFromProps(destructuredPropsStr);

	const allMetadata = mergeArraysByKey(metadataA, metadataB, (item) => item.name);
	return allMetadata;
}

function generateComponentPropsDocs(path, componentStr, componentDocParsed) {
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

function replaceContent(path, startTag, endTag, str) {
	const file = readFileSync(path).toString();

	writeFileSync(path, file.replace(new RegExp(`${startTag}.*${endTag}`, 's'), `${startTag}\n\n${str}\n\n${endTag}`));
}

function generateDocs(path, componentName, componentDocParsed) {
	const componentDocForComponent =
		`| name | type | default value | usage |
	| :-- | --- | --- | --- |
	` +
		componentDocParsed
			.map(({ name, type, defaultValue, description, isOptional, isBindable, isEvent }) => {
				const _type = `\`${type.replace(/\|/g, '&#124;')}\``;
				const _defaultValue = defaultValue ? `\`${defaultValue}\`` : '';
				let kind = [];
				if (!isOptional) kind.push('required');
				if (isBindable) kind.push('bindable');
				if (isEvent) kind.push('event');
				kind = kind.map((k) => `**${k}**`).join(', ');
				const _description = kind ? `${kind}<br\\>${description}` : description;
				return `| ${name} | ${_type} | ${_defaultValue} | ${_description} |`;
			})
			.join('\n');

	replaceContent(
		path,
		`<!-- PROPS_${componentName}.svelte -->`,
		`<!-- ~PROPS_${componentName}.svelte -->`,
		componentDocForComponent
	);
}

/**
 * parse any .svelte component in the lib folder and:
 *   - replace the component doc (from "**Props**" to "-->")
 *   - replace the lib doc (from "<!-- PROPS_${componentName}.svelte -->" to "<!-- ~PROPS_${componentName}.svelte -->")
 */
export function generateProps(documentationPath) {
	console.log('start generating doc for components:');
	read_files('./src/lib')
		.filter((file) => file.endsWith('.svelte'))
		.map((path) => ({
			path,
			componentName: get_component_name(path),
			componentStr: get_component_content(path)
		}))
		.map(({ path, componentName, componentStr }) => ({
			path,
			componentName,
			componentStr,
			componentDocParsed: parseComponentPropsDocs(componentName, componentStr)
		}))
		.map(({ path, componentName, componentStr, componentDocParsed }) => {
			generateComponentPropsDocs(path, componentStr, componentDocParsed);
			generateDocs(documentationPath, componentName, componentDocParsed);
		});
}
