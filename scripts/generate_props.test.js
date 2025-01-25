import { describe, it, expect } from 'vitest';
import {
	extractMetadataFromInterface,
	extractMetadataFromProps,
	getDestructuredPropsStr,
	getInterfacePropsStr,
	getScriptStr,
	parseComponentPropsDocs
} from './generate_props';
import { a11yHorizontalWrapperData, colorPickerData } from './generateProps.data';

describe.each([
	['11yHorizontalWrapper', a11yHorizontalWrapperData],
	['ColorPicker', colorPickerData]
])(
	'generate doc: %s',
	(
		_componentName,
		{
			componentStr,
			scriptTagStr,
			interfacePropsStr,
			destructuredPropsStr,
			metadataFromInterface,
			metadataFromProps,
			allMetadata
		}
	) => {
		it('getScriptStr', () => {
			expect(getScriptStr(componentStr)).toBe(scriptTagStr);
		});

		it('getInterfacePropsStr', () => {
			expect(getInterfacePropsStr(scriptTagStr)).toBe(interfacePropsStr);
		});

		it('getDestructuredPropsStr', () => {
			expect(getDestructuredPropsStr(scriptTagStr)).toBe(destructuredPropsStr);
		});

		it('extractMetadataFromInterface', () => {
			expect(extractMetadataFromInterface(interfacePropsStr)).toStrictEqual(metadataFromInterface);
		});

		it('extractMetadataFromProps', () => {
			expect(extractMetadataFromProps(destructuredPropsStr)).toStrictEqual(metadataFromProps);
		});

		it('parseComponentPropsDocs', () => {
			expect(parseComponentPropsDocs('', componentStr)).toStrictEqual(allMetadata);
		});
	}
);
