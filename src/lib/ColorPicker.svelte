<script lang="ts">
	import { hsv2Color, hex2Color, rgb2Color } from 'chyme';
	import type { Color, Rgb, Hsv } from 'chyme';
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
	import type { Components } from '$lib/type/types';

	export let components: Partial<Components> = {};

	/**
	 * Customization properties
	 */
	export let isAlpha = true;
	export let isInput = true;
	export let isPopup = true;
	export let isOpen = !isInput;
	export let toRight = false;

	export let rgb: Rgb = { r: 255, g: 0, b: 0 } as Rgb;
	export let hsv: Hsv = {} as Hsv;
	export let hex = '';

	const default_components: Components = {
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

	$: {
		let color: Color = {} as Color;
		if (hsv && "h" in hsv) {
			color = hsv2Color(hsv);
		} else if (hex && hex.length) {
			color = hex2Color({ hex });
		} else if (rgb && "r" in rgb) {
			color = rgb2Color(rgb);
		}
		const { r, g, b, h, s, v, a, hex: cHex } = color;
		rgb = { r, g, b, a };
		hsv = { h, s, v, a };
		hex = cHex;
	}
</script>

<ArrowKeyHandler />

<svelte:window on:mousedown={mousedown} />

{#if isInput}
	<svelte:component
		this={getComponents().input}
		color={{ ...hsv, ...rgb, hex }}
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
</svelte:component>
