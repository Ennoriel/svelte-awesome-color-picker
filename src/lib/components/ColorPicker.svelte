<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { RgbaColor, HsvaColor, Colord } from 'colord';
	import { colord } from 'colord';
	import type { Components } from '../type/types';
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

	export let components: Partial<Components> = {};

	const dispatch = createEventDispatcher<{
		input: { hsv: HsvaColor; rgb: RgbaColor; hex: string; color: Colord | undefined };
	}>();

	/**
	 * Customization properties
	 */
	export let label = 'Choose a color';
	export let isAlpha = true;
	export let isInput = true;
	export let isTextInput = true;
	export let canChangeMode = true;
	export let isPopup = isInput;
	export let isOpen = !isInput;
	export let toRight = false;
	export let disableCloseClickOutside = false;

	/**
	 * color properties
	 */
	export let rgb: RgbaColor = { r: 255, g: 0, b: 0, a: 1 };
	export let hsv: HsvaColor = { h: 0, s: 100, v: 100, a: 1 };
	export let hex = '#ff0000';
	export let color: Colord | undefined = undefined;
	export let isDark = false;

	/**
	 * Internal old value to trigger color conversion
	 */
	let _rgb: RgbaColor = { r: 255, g: 0, b: 0, a: 1 };
	let _hsv: HsvaColor = { h: 0, s: 100, v: 100, a: 1 };
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

	let labelWrapper: HTMLLabelElement;
	let wrapper: HTMLElement;

	function mousedown({ target }: MouseEvent) {
		if (isInput) {
			if (labelWrapper.contains(target as Node) || labelWrapper.isSameNode(target as Node)) {
				isOpen = !isOpen;
			} else if (isOpen && !wrapper.contains(target as Node) && !disableCloseClickOutside) {
				isOpen = false;
			}
		}
	}

	function keyup(e: KeyboardEvent) {
		if (e.key === 'Tab' && isPopup) {
			isOpen = span?.contains(document.activeElement);
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

<ArrowKeyHandler />

<svelte:window on:mousedown={mousedown} on:keyup={keyup} />

<span bind:this={span} class="color-picker">
	{#if isInput}
		<svelte:component this={getComponents().input} bind:labelWrapper bind:isOpen {hex} {label} />
	{:else}
		<input type="hidden" value={hex} />
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
			<Alpha components={getComponents()} bind:a={hsv.a} {hex} bind:isOpen {toRight} />
		{/if}
		{#if isTextInput}
			<svelte:component
				this={getComponents().textInput}
				bind:hex
				bind:rgb
				bind:hsv
				{isAlpha}
				{canChangeMode}
			/>
		{/if}

		<slot name="a11y-notice" {color} {hex} />
	</svelte:component>
</span>

<style>
	span {
		position: relative;
	}
</style>
