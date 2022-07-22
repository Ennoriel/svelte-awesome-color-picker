<script lang="ts">
	import { hsv2Color, hex2Color, rgb2Color } from 'chyme';
	import type { Rgb, Hsv } from 'chyme';
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

	export let rgb: Rgb = { r: 255, g: 0, b: 0 } as Rgb;
	export let hsv: Hsv = { h: 0, s: 1, v: 1 } as Hsv;
	export let hex = '#ff0000';

	let _rgb: Rgb = { r: 255, g: 0, b: 0 } as Rgb;
	let _hsv: Hsv = { h: 0, s: 1, v: 1 } as Hsv;
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

		// check which color format changed and updates the others accordingly
		if (hsv.h !== _hsv.h || hsv.s !== _hsv.s || hsv.v !== _hsv.v || hsv.a !== hsv.a) {
			const color = hsv2Color(hsv);
			const { r, g, b, a, hex: cHex } = color;
			rgb = { r, g, b, a };
			hex = cHex;
		} else if (rgb.r !== _rgb.r || rgb.g !== _rgb.g || rgb.b !== _rgb.b || rgb.a !== _rgb.a) {
			const color = rgb2Color(rgb);
			const { h, s, v, a, hex: cHex } = color;
			hsv = { h, s, v, a };
			hex = cHex;
		} else if (hex !== _hex) {
			const color = hex2Color({ hex });
			const { r, g, b, h, s, v, a } = color;
			rgb = { r, g, b, a };
			hsv = { h, s, v, a };
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
		<svelte:component
			this={getComponents().input}
			color={{ ...hsv, ...rgb, hex }}
			{label}
			bind:button
			bind:isOpen
		/>
	{/if}

	<svelte:component this={getComponents().wrapper} bind:wrapper {isOpen} {isPopup} {toRight}>
		<Picker
			components={getComponents()}
			h={hsv.h}
			bind:s={hsv.s}
			bind:v={hsv.v}
			bind:isOpen
			{toRight}
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
			<svelte:component this={getComponents().textInput} bind:hex bind:rgb bind:hsv />
		{/if}
	</svelte:component>
</span>
