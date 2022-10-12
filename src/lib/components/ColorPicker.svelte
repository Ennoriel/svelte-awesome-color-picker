<script lang="ts">
	import type { RgbaColor, HsvaColor, Colord } from 'colord';
	import Picker from './Picker.svelte';
	import Slider from './Slider.svelte';
	import Alpha from './Alpha.svelte';
	import TextInput from './variant/default/TextInput.svelte';
	import SliderIndicator from './variant/default/SliderIndicator.svelte';
	import PickerIndicator from './variant/default/PickerIndicator.svelte';
	import ArrowKeyHandler from './ArrowKeyHandler.svelte';
	import PickerWrapper from './variant/default/PickerWrapper.svelte';
	import SliderWrapper from './variant/default/SliderWrapper.svelte';
	import Input from './variant/default/Input.svelte';
	import Wrapper from './variant/default/Wrapper.svelte';
	import type { Components } from '../type/types';
	import { colord } from 'colord';

	export let components: Partial<Components> = {};

	/**
	 * Customization properties
	 */
	export let label = 'Choose a color';
	export let isAlpha = true;
	export let isInput = true;
	export let isTextInput = true;
	export let isPopup = true;
	export let isOpen = !isInput;
	export let toRight = false;
	export let isDark = false;

	export let rgb: RgbaColor = { r: 255, g: 0, b: 0 } as RgbaColor;
	export let hsv: HsvaColor = { h: 0, s: 1, v: 1 } as HsvaColor;
	export let hex = '#ff0000';

	let _rgb: RgbaColor = { r: 255, g: 0, b: 0 } as RgbaColor;
	let _hsv: HsvaColor = { h: 0, s: 1, v: 1 } as HsvaColor;
	let _hex = '#ff0000';

	let span: HTMLSpanElement;

	const default_components: Components = {
		sliderIndicator: SliderIndicator,
		pickerIndicator: PickerIndicator,
		alphaIndicator: SliderIndicator,
		pickerWrapper: PickerWrapper,
		sliderWrapper: SliderWrapper,
		alphaWrapper: SliderWrapper,
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

	let button: HTMLButtonElement;
	let wrapper: HTMLElement;

	function mousedown({ target }: MouseEvent) {
		if (isInput) {
			if (button.isSameNode(target as Node)) {
				isOpen = !isOpen;
			} else if (isOpen && !wrapper.contains(target as Node)) {
				isOpen = false;
			}
		}
	}

	function keyup(e: KeyboardEvent) {
		if (e.key === 'Tab') {
			isOpen = span?.contains(document.activeElement);
		}
	}

	/**
	 * using a function seems to trigger the exported value change only once when all of them has been updated
	 * and not just after the hsv change
	 */
	function updateColor() {
		// reinitialize empty alpha values
		if (hsv.a === undefined) hsv.a = 1;
		if (_hsv.a === undefined) _hsv.a = 1;
		if (rgb.a === undefined) rgb.a = 1;
		if (_rgb.a === undefined) _rgb.a = 1;
		if (hex?.substring(7) === 'ff') hex = hex.substring(0, 7);
		if (hex?.substring(7) === 'ff') hex = hex.substring(0, 7);

		let tmpColor: Colord | undefined;

		// check which color format changed and updates the others accordingly
		if (hsv.h !== _hsv.h || hsv.s !== _hsv.s || hsv.v !== _hsv.v || hsv.a !== _hsv.a) {
			tmpColor = colord(hsv);
			rgb = tmpColor.toRgb();
			hex = tmpColor.toHex();
		} else if (rgb.r !== _rgb.r || rgb.g !== _rgb.g || rgb.b !== _rgb.b || rgb.a !== _rgb.a) {
			tmpColor = colord(rgb);
			hex = tmpColor.toHex();
			hsv = tmpColor.toHsv();
		} else if (hex !== _hex) {
			tmpColor = colord(hex);
			rgb = tmpColor.toRgb();
			hsv = tmpColor.toHsv();
		}

		if (tmpColor) {
			isDark = tmpColor.isDark();
		}

		// update old colors
		_hsv = Object.assign({}, hsv);
		_rgb = Object.assign({}, rgb);
		_hex = hex;
	}

	$: if (hsv || rgb || hex) {
		updateColor();
	}

	function keydown(e: KeyboardEvent) {
		if (e.key === 'Tab') span.classList.add('has-been-tabbed');
	}
</script>

<ArrowKeyHandler />

<svelte:window on:mousedown={mousedown} on:keydown={keydown} on:keyup={keyup} />

<span bind:this={span}>
	{#if isInput}
		<svelte:component this={getComponents().input} {hex} {label} bind:button bind:isOpen />
	{/if}

	<svelte:component this={getComponents().wrapper} bind:wrapper {isOpen} {isPopup} {toRight}>
		<Picker
			components={getComponents()}
			h={hsv.h}
			bind:s={hsv.s}
			bind:v={hsv.v}
			bind:isOpen
			{toRight}
			{isDark}
		/>
		<Slider components={getComponents()} bind:h={hsv.h} {toRight} />
		{#if isAlpha}
			<Alpha
				components={getComponents()}
				h={hsv.h}
				s={hsv.s}
				v={hsv.v}
				bind:a={hsv.a}
				{hex}
				bind:isOpen
				{toRight}
			/>
		{/if}
		{#if isTextInput}
			<svelte:component this={getComponents().textInput} bind:hex bind:rgb bind:hsv {isAlpha} />
		{/if}
	</svelte:component>
</span>
