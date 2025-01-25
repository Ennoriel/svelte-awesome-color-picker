export const a11yHorizontalWrapperData = {
	componentStr: `
<script lang="ts">
	interface Props {
		/** DOM element of the Color Picker popup wrapper */
		wrapper: HTMLElement;
		/** indicator of the popup state */
		isOpen: boolean;
		/** if set to true, the wrapper should have a dialog role and be absolute. It should be relative otherwise */
		isDialog: boolean;
		/** children */
		children: import('svelte').Snippet;
	}

	let { wrapper = $bindable(), isOpen, isDialog, children }: Props = $props();
</script>
`,

	scriptTagStr: ` lang="ts">
	interface Props {
		/** DOM element of the Color Picker popup wrapper */
		wrapper: HTMLElement;
		/** indicator of the popup state */
		isOpen: boolean;
		/** if set to true, the wrapper should have a dialog role and be absolute. It should be relative otherwise */
		isDialog: boolean;
		/** children */
		children: import('svelte').Snippet;
	}

	let { wrapper = $bindable(), isOpen, isDialog, children }: Props = $props();
`,

	interfacePropsStr: `/** DOM element of the Color Picker popup wrapper */
wrapper: HTMLElement;
/** indicator of the popup state */
isOpen: boolean;
/** if set to true, the wrapper should have a dialog role and be absolute. It should be relative otherwise */
isDialog: boolean;
/** children */
children: import('svelte').Snippet;`,

	destructuredPropsStr: `wrapper = $bindable(), isOpen, isDialog, children`,

	metadataFromInterface: [
		{
			name: 'wrapper',
			type: 'HTMLElement',
			isOptional: false,
			description: 'DOM element of the Color Picker popup wrapper'
		},
		{
			name: 'isOpen',
			type: 'boolean',
			isOptional: false,
			description: 'indicator of the popup state'
		},
		{
			name: 'isDialog',
			type: 'boolean',
			isOptional: false,
			description:
				'if set to true, the wrapper should have a dialog role and be absolute. It should be relative otherwise'
		},
		{
			name: 'children',
			type: `import('svelte').Snippet`,
			isOptional: false,
			description: 'children'
		}
	],

	metadataFromProps: [
		{
			name: 'wrapper',
			isBindable: true,
			isEvent: false,
			defaultValue: ''
		},
		{
			name: 'isOpen',
			isBindable: false,
			isEvent: false,
			defaultValue: ''
		},
		{
			name: 'isDialog',
			isBindable: false,
			isEvent: false,
			defaultValue: ''
		},
		{
			name: 'children',
			isBindable: false,
			isEvent: false,
			defaultValue: ''
		}
	],

	allMetadata: [
		{
			name: 'wrapper',
			type: 'HTMLElement',
			isOptional: false,
			description: 'DOM element of the Color Picker popup wrapper',
			isBindable: true,
			isEvent: false,
			defaultValue: ''
		},
		{
			name: 'isOpen',
			type: 'boolean',
			isOptional: false,
			description: 'indicator of the popup state',
			isBindable: false,
			isEvent: false,
			defaultValue: ''
		},
		{
			name: 'isDialog',
			type: 'boolean',
			isOptional: false,
			description:
				'if set to true, the wrapper should have a dialog role and be absolute. It should be relative otherwise',
			isBindable: false,
			isEvent: false,
			defaultValue: ''
		},
		{
			name: 'children',
			type: `import('svelte').Snippet`,
			isOptional: false,
			description: 'children',
			isBindable: false,
			isEvent: false,
			defaultValue: ''
		}
	]
};

export const colorPickerData = {
	componentStr: `<script lang="ts">
	import { tick } from 'svelte';
	import { type RgbaColor, type HsvaColor, type Colord, colord } from 'colord';
	import Picker from './Picker.svelte';
	import { Slider } from 'svelte-awesome-slider';
	import PickerIndicator from './variant/default/PickerIndicator.svelte';
	import TextInput from './variant/default/TextInput.svelte';
	import Input from './variant/default/Input.svelte';
	import Wrapper from './variant/default/Wrapper.svelte';
	import type { A11yColor, Components } from '$lib/type/types.js';
	import { defaultTexts, type TextsPartial, type A11yTextsPartial } from '$lib/utils/texts.js';
	import { trapFocus, type Trap } from '$lib/utils/trapFocus.js';
	import NullabilityCheckbox from './variant/default/NullabilityCheckbox.svelte';

	interface Props {
		/** customize the ColorPicker component parts. Can be used to display a Chrome variant or an Accessibility Notice */
		components?: Partial<Components>;
		/** input label, hidden when the ColorPicker is always shown (prop \`isDialog={false}\`) */
		label?: string;
		/** input name, useful in a native form */
		name?: string | undefined;
		/** if set to true, the color picker becomes nullable (rgb, hsv and hex set to undefined) */
		nullable?: boolean;
		/** rgb color */
		rgb?: RgbaColor | null;
		/** hsv color */
		hsv?: HsvaColor | null;
		/** hex color */
		hex?: string | null;
		/** Colord
		 * color
		 */
		color?: Colord | null;
		/** indicator whether the selected color is light or dark */
		isDark?: boolean;
		/** if set to false, disables the alpha channel */
		isAlpha?: boolean;
		/** if set to false, the input and the label will not be displayed and the ColorPicker will always be visible */
		isDialog?: boolean;
		/** indicator of the popup state */
		isOpen?: boolean;
		/** if set to "responsive", the popup will adjust its x and y position depending on the available window space, "responsive-x" and "responsive-y" limit the behavior to either the x or y axis. The value 'responsive' will become the default in the next major release */
		position?: 'fixed' | 'responsive' | 'responsive-x' | 'responsive-y';
		/** if set to false, hide the hex, rgb and hsv text inputs */
		isTextInput?: boolean;
		/** configure which hex, rgb and hsv inputs will be visible and in which order. If overridden, it is necessary to provide at least one value */
		textInputModes?: Array<'hex' | 'rgb' | 'hsv'>;
		/** If set to "horizontal", the hue and alpha sliders will be displayed horizontally. It is necessary to set this props to "horizontal" for the ChromeVariant */
		sliderDirection?: 'horizontal' | 'vertical';
		/** If set to true, it will not be possible to close the color picker by clicking outside */
		disableCloseClickOutside?: boolean;
		/** used with the A11yVariant. Define the accessibility examples in the color picker */
		a11yColors?: Array<A11yColor>;
		/** required WCAG contrast level */
		a11yLevel?: 'AA' | 'AAA';
		/** all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts) */
		texts?: TextsPartial | undefined;
		/** all a11y translation tokens used in the library; override with translations if necessary; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts) */
		a11yTexts?: A11yTextsPartial | undefined;
		/** listener, dispatch an event when an input event is dispatched from the input fields */
		onInput:
			| ((color: { hsv: HsvaColor | null; rgb: RgbaColor | null; hex: string | null; color: Colord | null }) => void)
			| undefined;
	}

	let {
		components = {},
		label = 'Choose a color',
		name = undefined,
		nullable = false,
		rgb = $bindable<RgbaColor | null>(nullable ? null : { r: 255, g: 0, b: 0, a: 1 }),
		hsv = $bindable<HsvaColor | null>(nullable ? null : { h: 0, s: 100, v: 100, a: 1 }),
		hex = $bindable<string | null>(nullable ? null : '#ff0000'),
		color = $bindable(null),
		isDark = $bindable(false),
		isAlpha = true,
		isDialog = true,
		isOpen = $bindable(!isDialog),
		position = 'fixed',
		isTextInput = true,
		textInputModes = ['hex', 'rgb', 'hsv'],
		sliderDirection = 'vertical',
		disableCloseClickOutside = false,
		a11yColors = [{ bgHex: '#ffffff' }],
		a11yLevel = 'AA',
		texts = undefined,
		a11yTexts = undefined,
		onInput
	}: Props = $props();

	/**
	 * Internal old values to trigger color conversion
	 */
	let _rgb: RgbaColor = $state({ r: 255, g: 0, b: 0, a: 1 });
	let _hsv: HsvaColor = $state({ h: 0, s: 100, v: 100, a: 1 });
	let _hex: string = $state('#ff0000');

	let isUndefined = $state(false);
	// svelte-ignore state_referenced_locally
	let _isUndefined = $state(isUndefined);
</script>`,

	scriptTagStr: ` lang="ts">
	import { tick } from 'svelte';
	import { type RgbaColor, type HsvaColor, type Colord, colord } from 'colord';
	import Picker from './Picker.svelte';
	import { Slider } from 'svelte-awesome-slider';
	import PickerIndicator from './variant/default/PickerIndicator.svelte';
	import TextInput from './variant/default/TextInput.svelte';
	import Input from './variant/default/Input.svelte';
	import Wrapper from './variant/default/Wrapper.svelte';
	import type { A11yColor, Components } from '$lib/type/types.js';
	import { defaultTexts, type TextsPartial, type A11yTextsPartial } from '$lib/utils/texts.js';
	import { trapFocus, type Trap } from '$lib/utils/trapFocus.js';
	import NullabilityCheckbox from './variant/default/NullabilityCheckbox.svelte';

	interface Props {
		/** customize the ColorPicker component parts. Can be used to display a Chrome variant or an Accessibility Notice */
		components?: Partial<Components>;
		/** input label, hidden when the ColorPicker is always shown (prop \`isDialog={false}\`) */
		label?: string;
		/** input name, useful in a native form */
		name?: string | undefined;
		/** if set to true, the color picker becomes nullable (rgb, hsv and hex set to undefined) */
		nullable?: boolean;
		/** rgb color */
		rgb?: RgbaColor | null;
		/** hsv color */
		hsv?: HsvaColor | null;
		/** hex color */
		hex?: string | null;
		/** Colord
		 * color
		 */
		color?: Colord | null;
		/** indicator whether the selected color is light or dark */
		isDark?: boolean;
		/** if set to false, disables the alpha channel */
		isAlpha?: boolean;
		/** if set to false, the input and the label will not be displayed and the ColorPicker will always be visible */
		isDialog?: boolean;
		/** indicator of the popup state */
		isOpen?: boolean;
		/** if set to "responsive", the popup will adjust its x and y position depending on the available window space, "responsive-x" and "responsive-y" limit the behavior to either the x or y axis. The value 'responsive' will become the default in the next major release */
		position?: 'fixed' | 'responsive' | 'responsive-x' | 'responsive-y';
		/** if set to false, hide the hex, rgb and hsv text inputs */
		isTextInput?: boolean;
		/** configure which hex, rgb and hsv inputs will be visible and in which order. If overridden, it is necessary to provide at least one value */
		textInputModes?: Array<'hex' | 'rgb' | 'hsv'>;
		/** If set to "horizontal", the hue and alpha sliders will be displayed horizontally. It is necessary to set this props to "horizontal" for the ChromeVariant */
		sliderDirection?: 'horizontal' | 'vertical';
		/** If set to true, it will not be possible to close the color picker by clicking outside */
		disableCloseClickOutside?: boolean;
		/** used with the A11yVariant. Define the accessibility examples in the color picker */
		a11yColors?: Array<A11yColor>;
		/** required WCAG contrast level */
		a11yLevel?: 'AA' | 'AAA';
		/** all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts) */
		texts?: TextsPartial | undefined;
		/** all a11y translation tokens used in the library; override with translations if necessary; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts) */
		a11yTexts?: A11yTextsPartial | undefined;
		/** listener, dispatch an event when an input event is dispatched from the input fields */
		onInput:
			| ((color: { hsv: HsvaColor | null; rgb: RgbaColor | null; hex: string | null; color: Colord | null }) => void)
			| undefined;
	}

	let {
		components = {},
		label = 'Choose a color',
		name = undefined,
		nullable = false,
		rgb = $bindable<RgbaColor | null>(nullable ? null : { r: 255, g: 0, b: 0, a: 1 }),
		hsv = $bindable<HsvaColor | null>(nullable ? null : { h: 0, s: 100, v: 100, a: 1 }),
		hex = $bindable<string | null>(nullable ? null : '#ff0000'),
		color = $bindable(null),
		isDark = $bindable(false),
		isAlpha = true,
		isDialog = true,
		isOpen = $bindable(!isDialog),
		position = 'fixed',
		isTextInput = true,
		textInputModes = ['hex', 'rgb', 'hsv'],
		sliderDirection = 'vertical',
		disableCloseClickOutside = false,
		a11yColors = [{ bgHex: '#ffffff' }],
		a11yLevel = 'AA',
		texts = undefined,
		a11yTexts = undefined,
		onInput
	}: Props = $props();

	/**
	 * Internal old values to trigger color conversion
	 */
	let _rgb: RgbaColor = $state({ r: 255, g: 0, b: 0, a: 1 });
	let _hsv: HsvaColor = $state({ h: 0, s: 100, v: 100, a: 1 });
	let _hex: string = $state('#ff0000');

	let isUndefined = $state(false);
	// svelte-ignore state_referenced_locally
	let _isUndefined = $state(isUndefined);
`,

	interfacePropsStr: `/** customize the ColorPicker component parts. Can be used to display a Chrome variant or an Accessibility Notice */
components?: Partial<Components>;
/** input label, hidden when the ColorPicker is always shown (prop \`isDialog={false}\`) */
label?: string;
/** input name, useful in a native form */
name?: string | undefined;
/** if set to true, the color picker becomes nullable (rgb, hsv and hex set to undefined) */
nullable?: boolean;
/** rgb color */
rgb?: RgbaColor | null;
/** hsv color */
hsv?: HsvaColor | null;
/** hex color */
hex?: string | null;
/** Colord
 * color
 */
color?: Colord | null;
/** indicator whether the selected color is light or dark */
isDark?: boolean;
/** if set to false, disables the alpha channel */
isAlpha?: boolean;
/** if set to false, the input and the label will not be displayed and the ColorPicker will always be visible */
isDialog?: boolean;
/** indicator of the popup state */
isOpen?: boolean;
/** if set to "responsive", the popup will adjust its x and y position depending on the available window space, "responsive-x" and "responsive-y" limit the behavior to either the x or y axis. The value 'responsive' will become the default in the next major release */
position?: 'fixed' | 'responsive' | 'responsive-x' | 'responsive-y';
/** if set to false, hide the hex, rgb and hsv text inputs */
isTextInput?: boolean;
/** configure which hex, rgb and hsv inputs will be visible and in which order. If overridden, it is necessary to provide at least one value */
textInputModes?: Array<'hex' | 'rgb' | 'hsv'>;
/** If set to "horizontal", the hue and alpha sliders will be displayed horizontally. It is necessary to set this props to "horizontal" for the ChromeVariant */
sliderDirection?: 'horizontal' | 'vertical';
/** If set to true, it will not be possible to close the color picker by clicking outside */
disableCloseClickOutside?: boolean;
/** used with the A11yVariant. Define the accessibility examples in the color picker */
a11yColors?: Array<A11yColor>;
/** required WCAG contrast level */
a11yLevel?: 'AA' | 'AAA';
/** all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts) */
texts?: TextsPartial | undefined;
/** all a11y translation tokens used in the library; override with translations if necessary; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts) */
a11yTexts?: A11yTextsPartial | undefined;
/** listener, dispatch an event when an input event is dispatched from the input fields */
onInput:
| ((color: { hsv: HsvaColor | null; rgb: RgbaColor | null; hex: string | null; color: Colord | null }) => void)
| undefined;`,

	destructuredPropsStr: `components = {},
label = 'Choose a color',
name = undefined,
nullable = false,
rgb = $bindable<RgbaColor | null>(nullable ? null : { r: 255, g: 0, b: 0, a: 1 }),
hsv = $bindable<HsvaColor | null>(nullable ? null : { h: 0, s: 100, v: 100, a: 1 }),
hex = $bindable<string | null>(nullable ? null : '#ff0000'),
color = $bindable(null),
isDark = $bindable(false),
isAlpha = true,
isDialog = true,
isOpen = $bindable(!isDialog),
position = 'fixed',
isTextInput = true,
textInputModes = ['hex', 'rgb', 'hsv'],
sliderDirection = 'vertical',
disableCloseClickOutside = false,
a11yColors = [{ bgHex: '#ffffff' }],
a11yLevel = 'AA',
texts = undefined,
a11yTexts = undefined,
onInput`,

	metadataFromInterface: [
		{
			description:
				'customize the ColorPicker component parts. Can be used to display a Chrome variant or an Accessibility Notice',
			isOptional: true,
			name: 'components',
			type: 'Partial<Components>'
		},
		{
			description: 'input label, hidden when the ColorPicker is always shown (prop `isDialog={false}`)',
			isOptional: true,
			name: 'label',
			type: 'string'
		},
		{
			description: 'input name, useful in a native form',
			isOptional: true,
			name: 'name',
			type: 'string | undefined'
		},
		{
			description: 'if set to true, the color picker becomes nullable (rgb, hsv and hex set to undefined)',
			isOptional: true,
			name: 'nullable',
			type: 'boolean'
		},
		{
			description: 'rgb color',
			isOptional: true,
			name: 'rgb',
			type: 'RgbaColor | null'
		},
		{
			description: 'hsv color',
			isOptional: true,
			name: 'hsv',
			type: 'HsvaColor | null'
		},
		{
			description: 'hex color',
			isOptional: true,
			name: 'hex',
			type: 'string | null'
		},
		{
			description: 'Colord color',
			isOptional: true,
			name: 'color',
			type: 'Colord | null'
		},
		{
			description: 'indicator whether the selected color is light or dark',
			isOptional: true,
			name: 'isDark',
			type: 'boolean'
		},
		{
			description: 'if set to false, disables the alpha channel',
			isOptional: true,
			name: 'isAlpha',
			type: 'boolean'
		},
		{
			description:
				'if set to false, the input and the label will not be displayed and the ColorPicker will always be visible',
			isOptional: true,
			name: 'isDialog',
			type: 'boolean'
		},
		{
			description: 'indicator of the popup state',
			isOptional: true,
			name: 'isOpen',
			type: 'boolean'
		},
		{
			description:
				'if set to "responsive", the popup will adjust its x and y position depending on the available window space, "responsive-x" and "responsive-y" limit the behavior to either the x or y axis. The value \'responsive\' will become the default in the next major release',
			isOptional: true,
			name: 'position',
			type: "'fixed' | 'responsive' | 'responsive-x' | 'responsive-y'"
		},
		{
			description: 'if set to false, hide the hex, rgb and hsv text inputs',
			isOptional: true,
			name: 'isTextInput',
			type: 'boolean'
		},
		{
			description:
				'configure which hex, rgb and hsv inputs will be visible and in which order. If overridden, it is necessary to provide at least one value',
			isOptional: true,
			name: 'textInputModes',
			type: "Array<'hex' | 'rgb' | 'hsv'>"
		},
		{
			description:
				'If set to "horizontal", the hue and alpha sliders will be displayed horizontally. It is necessary to set this props to "horizontal" for the ChromeVariant',
			isOptional: true,
			name: 'sliderDirection',
			type: "'horizontal' | 'vertical'"
		},
		{
			description: 'If set to true, it will not be possible to close the color picker by clicking outside',
			isOptional: true,
			name: 'disableCloseClickOutside',
			type: 'boolean'
		},
		{
			description: 'used with the A11yVariant. Define the accessibility examples in the color picker',
			isOptional: true,
			name: 'a11yColors',
			type: 'Array<A11yColor>'
		},
		{
			description: 'required WCAG contrast level',
			isOptional: true,
			name: 'a11yLevel',
			type: "'AA' | 'AAA'"
		},
		{
			description:
				'all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts)',
			isOptional: true,
			name: 'texts',
			type: 'TextsPartial | undefined'
		},
		{
			description:
				'all a11y translation tokens used in the library; override with translations if necessary; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts)',
			isOptional: true,
			name: 'a11yTexts',
			type: 'A11yTextsPartial | undefined'
		},
		{
			description: 'listener, dispatch an event when an input event is dispatched from the input fields',
			isOptional: false,
			name: 'onInput',
			type: '((color: { hsv: HsvaColor | null; rgb: RgbaColor | null; hex: string | null; color: Colord | null }) => void) | undefined'
		}
	],

	metadataFromProps: [
		{
			defaultValue: '{}',
			isBindable: false,
			isEvent: false,
			name: 'components'
		},
		{
			defaultValue: "'Choose a color'",
			isBindable: false,
			isEvent: false,
			name: 'label'
		},
		{
			defaultValue: 'undefined',
			isBindable: false,
			isEvent: false,
			name: 'name'
		},
		{
			defaultValue: 'false',
			isBindable: false,
			isEvent: false,
			name: 'nullable'
		},
		{
			defaultValue: '',
			isBindable: true,
			isEvent: false,
			name: 'rgb'
		},
		{
			defaultValue: '',
			isBindable: true,
			isEvent: false,
			name: 'hsv'
		},
		{
			defaultValue: '',
			isBindable: true,
			isEvent: false,
			name: 'hex'
		},
		{
			defaultValue: 'null',
			isBindable: true,
			isEvent: false,
			name: 'color'
		},
		{
			defaultValue: 'false',
			isBindable: true,
			isEvent: false,
			name: 'isDark'
		},
		{
			defaultValue: 'true',
			isBindable: false,
			isEvent: false,
			name: 'isAlpha'
		},
		{
			defaultValue: 'true',
			isBindable: false,
			isEvent: false,
			name: 'isDialog'
		},
		{
			defaultValue: '!isDialog',
			isBindable: true,
			isEvent: false,
			name: 'isOpen'
		},
		{
			defaultValue: "'fixed'",
			isBindable: false,
			isEvent: false,
			name: 'position'
		},
		{
			defaultValue: 'true',
			isBindable: false,
			isEvent: false,
			name: 'isTextInput'
		},
		{
			defaultValue: "['hex', 'rgb', 'hsv']",
			isBindable: false,
			isEvent: false,
			name: 'textInputModes'
		},
		{
			defaultValue: "'vertical'",
			isBindable: false,
			isEvent: false,
			name: 'sliderDirection'
		},
		{
			defaultValue: 'false',
			isBindable: false,
			isEvent: false,
			name: 'disableCloseClickOutside'
		},
		{
			defaultValue: "[{ bgHex: '#ffffff' }]",
			isBindable: false,
			isEvent: false,
			name: 'a11yColors'
		},
		{
			defaultValue: "'AA'",
			isBindable: false,
			isEvent: false,
			name: 'a11yLevel'
		},
		{
			defaultValue: 'undefined',
			isBindable: false,
			isEvent: false,
			name: 'texts'
		},
		{
			defaultValue: 'undefined',
			isBindable: false,
			isEvent: false,
			name: 'a11yTexts'
		},
		{
			defaultValue: '',
			isBindable: false,
			isEvent: true,
			name: 'onInput'
		}
	],

	allMetadata: [
		{
			defaultValue: '{}',
			description:
				'customize the ColorPicker component parts. Can be used to display a Chrome variant or an Accessibility Notice',
			isBindable: false,
			isEvent: false,
			isOptional: true,
			name: 'components',
			type: 'Partial<Components>'
		},
		{
			defaultValue: "'Choose a color'",
			description: 'input label, hidden when the ColorPicker is always shown (prop `isDialog={false}`)',
			isBindable: false,
			isEvent: false,
			isOptional: true,
			name: 'label',
			type: 'string'
		},
		{
			defaultValue: 'undefined',
			description: 'input name, useful in a native form',
			isBindable: false,
			isEvent: false,
			isOptional: true,
			name: 'name',
			type: 'string | undefined'
		},
		{
			defaultValue: 'false',
			description: 'if set to true, the color picker becomes nullable (rgb, hsv and hex set to undefined)',
			isBindable: false,
			isEvent: false,
			isOptional: true,
			name: 'nullable',
			type: 'boolean'
		},
		{
			defaultValue: '',
			description: 'rgb color',
			isBindable: true,
			isEvent: false,
			isOptional: true,
			name: 'rgb',
			type: 'RgbaColor | null'
		},
		{
			defaultValue: '',
			description: 'hsv color',
			isBindable: true,
			isEvent: false,
			isOptional: true,
			name: 'hsv',
			type: 'HsvaColor | null'
		},
		{
			defaultValue: '',
			description: 'hex color',
			isBindable: true,
			isEvent: false,
			isOptional: true,
			name: 'hex',
			type: 'string | null'
		},
		{
			defaultValue: 'null',
			description: 'Colord color',
			isBindable: true,
			isEvent: false,
			isOptional: true,
			name: 'color',
			type: 'Colord | null'
		},
		{
			defaultValue: 'false',
			description: 'indicator whether the selected color is light or dark',
			isBindable: true,
			isEvent: false,
			isOptional: true,
			name: 'isDark',
			type: 'boolean'
		},
		{
			defaultValue: 'true',
			description: 'if set to false, disables the alpha channel',
			isBindable: false,
			isEvent: false,
			isOptional: true,
			name: 'isAlpha',
			type: 'boolean'
		},
		{
			defaultValue: 'true',
			description:
				'if set to false, the input and the label will not be displayed and the ColorPicker will always be visible',
			isBindable: false,
			isEvent: false,
			isOptional: true,
			name: 'isDialog',
			type: 'boolean'
		},
		{
			defaultValue: '!isDialog',
			description: 'indicator of the popup state',
			isBindable: true,
			isEvent: false,
			isOptional: true,
			name: 'isOpen',
			type: 'boolean'
		},
		{
			defaultValue: "'fixed'",
			description:
				'if set to "responsive", the popup will adjust its x and y position depending on the available window space, "responsive-x" and "responsive-y" limit the behavior to either the x or y axis. The value \'responsive\' will become the default in the next major release',
			isBindable: false,
			isEvent: false,
			isOptional: true,
			name: 'position',
			type: "'fixed' | 'responsive' | 'responsive-x' | 'responsive-y'"
		},
		{
			defaultValue: 'true',
			description: 'if set to false, hide the hex, rgb and hsv text inputs',
			isBindable: false,
			isEvent: false,
			isOptional: true,
			name: 'isTextInput',
			type: 'boolean'
		},
		{
			defaultValue: "['hex', 'rgb', 'hsv']",
			description:
				'configure which hex, rgb and hsv inputs will be visible and in which order. If overridden, it is necessary to provide at least one value',
			isBindable: false,
			isEvent: false,
			isOptional: true,
			name: 'textInputModes',
			type: "Array<'hex' | 'rgb' | 'hsv'>"
		},
		{
			defaultValue: "'vertical'",
			description:
				'If set to "horizontal", the hue and alpha sliders will be displayed horizontally. It is necessary to set this props to "horizontal" for the ChromeVariant',
			isBindable: false,
			isEvent: false,
			isOptional: true,
			name: 'sliderDirection',
			type: "'horizontal' | 'vertical'"
		},
		{
			defaultValue: 'false',
			description: 'If set to true, it will not be possible to close the color picker by clicking outside',
			isBindable: false,
			isEvent: false,
			isOptional: true,
			name: 'disableCloseClickOutside',
			type: 'boolean'
		},
		{
			defaultValue: "[{ bgHex: '#ffffff' }]",
			description: 'used with the A11yVariant. Define the accessibility examples in the color picker',
			isBindable: false,
			isEvent: false,
			isOptional: true,
			name: 'a11yColors',
			type: 'Array<A11yColor>'
		},
		{
			defaultValue: "'AA'",
			description: 'required WCAG contrast level',
			isBindable: false,
			isEvent: false,
			isOptional: true,
			name: 'a11yLevel',
			type: "'AA' | 'AAA'"
		},
		{
			defaultValue: 'undefined',
			description:
				'all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts)',
			isBindable: false,
			isEvent: false,
			isOptional: true,
			name: 'texts',
			type: 'TextsPartial | undefined'
		},
		{
			defaultValue: 'undefined',
			description:
				'all a11y translation tokens used in the library; override with translations if necessary; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts)',
			isBindable: false,
			isEvent: false,
			isOptional: true,
			name: 'a11yTexts',
			type: 'A11yTextsPartial | undefined'
		},
		{
			defaultValue: '',
			description: 'listener, dispatch an event when an input event is dispatched from the input fields',
			isBindable: false,
			isEvent: true,
			isOptional: false,
			name: 'onInput',
			type: '((color: { hsv: HsvaColor | null; rgb: RgbaColor | null; hex: string | null; color: Colord | null }) => void) | undefined'
		}
	]
};
