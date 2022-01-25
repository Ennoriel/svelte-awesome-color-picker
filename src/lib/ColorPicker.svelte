<script lang="ts">
	import _ from './util/convert';

	import Picker from './components/Picker.svelte';
	import Slider from './components/Slider.svelte';
	import Alpha from './components/Alpha.svelte';
	import SliderIndicator from './components/SliderIndicator.svelte';
	import PickerIndicator from './components/PickerIndicator.svelte';
	import ArrowKeyHandler from './components/ArrowKeyHandler.svelte';
	import PickerWrapper from './components/PickerWrapper.svelte';
	import SliderWrapper from './components/SliderWrapper.svelte';
	import Input from './components/Input.svelte';
	import Wrapper from './components/Wrapper.svelte';
	import type { Color, Components, Rgb, Hsv, Hex } from '$lib/type/types';

	export let components: Partial<Components> = {};

	/**
	 * Customization properties
	 */
	export let isAlpha = true;
	export let isInput = true;
	export let isPopup = true;
	export let isOpen = !isInput;
	export let toRight = false;

	export let color: Color = {
		h: 0,
		s: 1,
		v: 1,
		a: 1,
		hex: '#FF0000',
		r: 255,
		g: 0,
		b: 0
	} as Color;

	const default_components = {
		sliderIndicator: SliderIndicator,
		pickerIndicator: PickerIndicator,
		alphaIndicator: SliderIndicator,
		pickerWrapper: PickerWrapper,
		sliderWrapper: SliderWrapper,
		alphaWrapper: SliderWrapper,
		input: Input,
		wrapper: Wrapper
	};

	function getComponents() {
		return {
			...default_components,
			...components
		};
	}

	let button;
	let wrapper;

	function mousedown({ target }) {
		if (isInput) {
			if (button.isSameNode(target)) {
				isOpen = !isOpen;
			} else if (isOpen && !wrapper.contains(target)) {
				isOpen = false;
			}
		}
	}

	function isHsv(color: Color): color is Hsv {
		return (
			(color as Hsv).h !== undefined &&
			(color as Hsv).s !== undefined &&
			(color as Hsv).v !== undefined
		);
	}

	function isHex(color: Color): color is Hex {
		return (color as Hex).hex !== undefined;
	}

	function isRgb(color: Color): color is Rgb {
		return (
			(color as Rgb).r !== undefined &&
			(color as Rgb).g !== undefined &&
			(color as Rgb).b !== undefined
		);
	}

	$: {
		if (color && isHsv(color)) {
			color = _.hsv2Color(color);
		} else if (color && isHex(color)) {
			color = _.hex2Color(color as Hex);
		} else if (color && isRgb(color)) {
			color = _.rgb2Color(color as Rgb);
		}
	}
</script>

<ArrowKeyHandler />

<svelte:window on:mousedown={mousedown} />

{#if isInput}
	<svelte:component this={getComponents().input} {color} bind:button bind:isOpen />
{/if}

<svelte:component this={getComponents().wrapper} bind:wrapper {isOpen} {isPopup} {toRight}>
	<Picker
		components={getComponents()}
		h={color.h}
		bind:s={color.s}
		bind:v={color.v}
		bind:isOpen
		{toRight}
	/>
	<Slider components={getComponents()} bind:h={color.h} {toRight} />
	{#if isAlpha}
		<Alpha
			components={getComponents()}
			h={color.h}
			s={color.s}
			v={color.v}
			bind:a={color.a}
			hex={color.hex}
			bind:isOpen
			{toRight}
		/>
	{/if}
</svelte:component>
