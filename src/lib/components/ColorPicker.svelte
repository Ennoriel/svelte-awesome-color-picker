<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { RgbaColor, HsvaColor, Colord } from 'colord';
	import { colord } from 'colord';
	import type { A11yColor, Components } from '../type/types';
	import { defaultTexts, type TextsPartial, type A11yTextsPartial } from '../texts';
	import Picker from './Picker.svelte';
	import { Slider } from 'svelte-awesome-slider';
	import PickerIndicator from './variant/default/PickerIndicator.svelte';
	import TextInput from './variant/default/TextInput.svelte';
	import Input from './variant/default/Input.svelte';
	import Wrapper from './variant/default/Wrapper.svelte';

	const dispatch = createEventDispatcher<{
		input: { hsv: HsvaColor; rgb: RgbaColor; hex: string; color: Colord | undefined };
	}>();

	/** customize the ColorPicker component parts. Can be used to display a Chrome variant or an Accessibility Notice */
	export let components: Partial<Components> = {};

	/** input label, hidden when the ColorPicker is always shown (prop `isDialog={false}`) */
	export let label: string = 'Choose a color';

	/** input name, useful in a native form */
	export let name: string | undefined = undefined;

	/** rgb color */
	export let rgb: RgbaColor = { r: 255, g: 0, b: 0, a: 1 };

	/** hsv color */
	export let hsv: HsvaColor = { h: 0, s: 100, v: 100, a: 1 };

	/** hex color */
	export let hex: string = '#ff0000';

	/** Colord color */
	export let color: Colord | undefined = undefined;

	/** indicator whether the selected color is light or dark */
	export let isDark: boolean = false;

	/** if set to false, disables the alpha channel */
	export let isAlpha: boolean = true;

	/** if set to false, the input and the label will not be displayed and the ColorPicker will always be visible */
	export let isDialog: boolean = true;

	/** indicator of the popup state */
	export let isOpen: boolean = !isDialog;

	/** if set to false, hide the hex, rgb and hsv text inputs */
	export let isTextInput: boolean = true;

	/** configure which hex, rgb and hsv inputs will be visible and in which order. If overridden, it is necessary to provide at least one value */
	export let textInputModes: Array<'hex' | 'rgb' | 'hsv'> = ['hex', 'rgb', 'hsv'];

	/** If set to "horizontal", the hue and alpha sliders will be displayed horizontally. It is necessary to set this props to "horizontal" for the ChromeVariant */
	export let sliderDirection: 'horizontal' | 'vertical' = 'vertical';

	/** If set to true, it will not be possible to close the color picker by clicking outside */
	export let disableCloseClickOutside: boolean = false;

	/** used with the A11yVariant. Define the accessibility examples in the color picker */
	export let a11yColors: Array<A11yColor> = [{ hex: '#ffffff' }];

	/** required WCAG contrast level */
	export let a11yLevel: 'AA' | 'AAA' = 'AA';

	/** used with the A11yVariant. If set to false, the accessibility panel will always be shown */
	export let isA11yClosable: boolean = true;

	/** all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/texts.ts) */
	export let texts: TextsPartial | undefined = undefined;

	/** all a11y translation tokens used in the library; override with translations if necessary; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/texts.ts) */
	export let a11yTexts: A11yTextsPartial | undefined = undefined;

	/**
	 * Internal old values to trigger color conversion
	 */
	let _rgb: RgbaColor = { r: 255, g: 0, b: 0, a: 1 };
	let _hsv: HsvaColor = { h: 0, s: 100, v: 100, a: 1 };
	let _hex = '#ff0000';

	let spanElement: HTMLSpanElement;
	let labelElement: HTMLLabelElement;
	let wrapper: HTMLElement;

	const default_components: Components = {
		pickerIndicator: PickerIndicator,
		textInput: TextInput,
		input: Input,
		wrapper: Wrapper
	};

	function getComponents() {
		return {
			...default_components,
			...components
		};
	}

	function getTexts() {
		return {
			label: {
				...defaultTexts.label,
				...texts?.label
			},
			color: {
				...defaultTexts.color,
				...texts?.color
			},
			changeTo: defaultTexts.changeTo ?? texts?.changeTo
		};
	}

	function mousedown({ target }: MouseEvent) {
		if (isDialog) {
			if (labelElement.contains(target as Node) || labelElement.isSameNode(target as Node)) {
				isOpen = !isOpen;
			} else if (isOpen && !wrapper.contains(target as Node) && !disableCloseClickOutside) {
				isOpen = false;
			}
		}
	}

	function keyup({ key, target }: KeyboardEvent) {
		if (!isDialog) {
			return;
		} else if (key === 'Enter' && labelElement.contains(target as Node)) {
			isOpen = !isOpen;
		} else if (key === 'Escape' && isOpen) {
			isOpen = false;
			if (spanElement.contains(target as Node)) {
				labelElement?.focus();
			}
		}
	}

	/**
	 * using a function seems to trigger the exported value change only once when all of them has been updated
	 * and not just after the hsv change
	 */
	function updateColor() {
		if (
			hsv.h === _hsv.h &&
			hsv.s === _hsv.s &&
			hsv.v === _hsv.v &&
			hsv.a === _hsv.a &&
			rgb.r === _rgb.r &&
			rgb.g === _rgb.g &&
			rgb.b === _rgb.b &&
			rgb.a === _rgb.a &&
			hex === _hex
		) {
			return;
		}

		// reinitialize empty alpha values
		if (hsv.a === undefined) hsv.a = 1;
		if (_hsv.a === undefined) _hsv.a = 1;
		if (rgb.a === undefined) rgb.a = 1;
		if (_rgb.a === undefined) _rgb.a = 1;
		if (hex?.substring(7) === 'ff') hex = hex.substring(0, 7);
		if (hex?.substring(7) === 'ff') hex = hex.substring(0, 7);

		// check which color format changed and updates the others accordingly
		if (hsv.h !== _hsv.h || hsv.s !== _hsv.s || hsv.v !== _hsv.v || hsv.a !== _hsv.a) {
			color = colord(hsv);
			rgb = color.toRgb();
			hex = color.toHex();
		} else if (rgb.r !== _rgb.r || rgb.g !== _rgb.g || rgb.b !== _rgb.b || rgb.a !== _rgb.a) {
			color = colord(rgb);
			hex = color.toHex();
			hsv = color.toHsv();
		} else if (hex !== _hex) {
			color = colord(hex);
			rgb = color.toRgb();
			hsv = color.toHsv();
		}

		if (color) {
			isDark = color.isDark();
		}

		// update old colors
		_hsv = Object.assign({}, hsv);
		_rgb = Object.assign({}, rgb);
		_hex = hex;

		dispatch('input', { color, hsv, rgb, hex });
	}

	$: if (hsv || rgb || hex) {
		updateColor();
	}
</script>

<svelte:window on:mousedown={mousedown} on:keyup={keyup} />

<span bind:this={spanElement} class="color-picker {sliderDirection}" style:--alphaless-color={hex?.substring(0, 7)}>
	{#if isDialog}
		<svelte:component this={getComponents().input} bind:labelElement bind:isOpen {hex} {label} {name} />
	{:else if name}
		<input type="hidden" value={hex} {name} />
	{/if}

	<svelte:component this={getComponents().wrapper} bind:wrapper {isOpen} {isDialog}>
		<Picker components={getComponents()} h={hsv.h} bind:s={hsv.s} bind:v={hsv.v} {isDark} />
		<div class="h">
			<Slider
				min={0}
				max={360}
				step={1}
				bind:value={hsv.h}
				direction={sliderDirection}
				reverse={sliderDirection === 'vertical'}
				ariaLabel={getTexts().label.h}
			/>
		</div>
		{#if isAlpha}
			<div class="a">
				<Slider
					min={0}
					max={1}
					step={0.01}
					bind:value={hsv.a}
					direction={sliderDirection}
					reverse={sliderDirection === 'vertical'}
					ariaLabel={getTexts().label.a}
				/>
			</div>
		{/if}
		{#if isTextInput}
			<svelte:component
				this={getComponents().textInput}
				bind:hex
				bind:rgb
				bind:hsv
				{isAlpha}
				{textInputModes}
				texts={getTexts()}
			/>
		{/if}
		{#if getComponents().a11yNotice}
			<svelte:component
				this={getComponents().a11yNotice}
				components={getComponents()}
				{a11yColors}
				{color}
				{hex}
				{a11yTexts}
				{isA11yClosable}
				{a11yLevel}
			/>
		{/if}
	</svelte:component>
</span>

<!-- 
@component Color Picker Component — default export of the library

**Import**
```js
import ColorPicker from 'svelte-awesome-color-picker';
```

**Use**
```svelte
<ColorPicker bind:hex />
```

**Props**
@prop components: Partial&lt;Components&gt; = {} — customize the ColorPicker component parts. Can be used to display a Chrome variant or an Accessibility Notice
@prop label: string = 'Choose a color' — input label, hidden when the ColorPicker is always shown (prop `isDialog={false}`)
@prop name: string | undefined = undefined — input name, useful in a native form
@prop rgb: RgbaColor = { r: 255, g: 0, b: 0, a: 1 } — rgb color
@prop hsv: HsvaColor = { h: 0, s: 100, v: 100, a: 1 } — hsv color
@prop hex: string = '#ff0000' — hex color
@prop color: Colord | undefined = undefined — Colord color
@prop isDark: boolean = false — indicator whether the selected color is light or dark
@prop isAlpha: boolean = true — if set to false, disables the alpha channel
@prop isDialog: boolean = true — if set to false, the input and the label will not be displayed and the ColorPicker will always be visible
@prop isOpen: boolean = !isDialog — indicator of the popup state
@prop isTextInput: boolean = true — if set to false, hide the hex, rgb and hsv text inputs
@prop textInputModes: Array&lt;'hex' | 'rgb' | 'hsv'&gt; = ['hex', 'rgb', 'hsv'] — configure which hex, rgb and hsv inputs will be visible and in which order. If overridden, it is necessary to provide at least one value
@prop sliderDirection: 'horizontal' | 'vertical' = 'vertical' — If set to "horizontal", the hue and alpha sliders will be displayed horizontally. It is necessary to set this props to "horizontal" for the ChromeVariant
@prop disableCloseClickOutside: boolean = false — If set to true, it will not be possible to close the color picker by clicking outside
@prop a11yColors: Array&lt;A11yColor&gt; = [{ hex: '#ffffff' }] — used with the A11yVariant. Define the accessibility examples in the color picker
@prop a11yLevel: 'AA' | 'AAA' = 'AA' — required WCAG contrast level
@prop isA11yClosable: boolean = true — used with the A11yVariant. If set to false, the accessibility panel will always be shown
@prop texts: TextsPartial | undefined = undefined — all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/texts.ts)
@prop a11yTexts: A11yTextsPartial | undefined = undefined — all a11y translation tokens used in the library; override with translations if necessary; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/texts.ts)
-->
<style>
	span {
		position: relative;

		--alpha-grid-bg: linear-gradient(45deg, #eee 25%, #0000 25%, #0000 75%, #eee 75%) 0 0 / 10px 10px,
			linear-gradient(45deg, #eee 25%, #0000 25%, #0000 75%, #eee 75%) 5px 5px / 10px 10px;
	}

	.h,
	.a {
		display: inline-flex;
		justify-content: center;
		--track-height: var(--slider-width, 10px);
		--track-width: var(--picker-height, 200px);
		--track-border: none;
		--thumb-size: calc(var(--slider-width, 10px) - 3px);
		--thumb-background: white;
		--thumb-border: 1px solid black;
		--margin-block: 0;

		--gradient-direction: 0.5turn;
	}
	.horizontal .h,
	.horizontal .a {
		--track-width: calc(var(--picker-width, 200px) - 12px);

		--gradient-direction: 0.25turn;
		margin: 4px 6px;
	}
	.horizontal .h {
		margin-top: 8px;
	}
	.vertical .h,
	.vertical .a {
		margin-left: 3px;
	}

	.h {
		--gradient-hue: #ff1500fb, #ffff00 17.2%, #ffff00 18.2%, #00ff00 33.3%, #00ffff 49.5%, #00ffff 51.5%, #0000ff 67.7%,
			#ff00ff 83.3%, #ff0000;
		--track-background: linear-gradient(var(--gradient-direction), var(--gradient-hue));
	}

	.a {
		margin-top: 2px;

		--track-background: linear-gradient(var(--gradient-direction), rgba(0, 0, 0, 0), var(--alphaless-color)),
			var(--alpha-grid-bg);
	}

	span :global(.sr-only) {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}
</style>
