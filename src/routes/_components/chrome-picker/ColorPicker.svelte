<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker/ColorPicker.svelte';
	import Input from './Input.svelte';
	import SliderIndicator from './SliderIndicator.svelte';
	import SliderWrapper from './SliderWrapper.svelte';
	import PickerIndicator from './PickerIndicator.svelte';
	import PickerWrapper from './PickerWrapper.svelte';
	import Wrapper from './Wrapper.svelte';
	import type { Rgb, Hsv } from 'chyme';

	export let rgb: Rgb | undefined = undefined;
	export let hsv: Hsv | undefined = undefined;
	export let hex: string | undefined = undefined;
</script>

<ColorPicker
	bind:rgb
	bind:hsv
	bind:hex
	components={{
		input: Input,
		sliderIndicator: SliderIndicator,
		sliderWrapper: SliderWrapper,
		alphaIndicator: SliderIndicator,
		alphaWrapper: SliderWrapper,
		pickerIndicator: PickerIndicator,
		pickerWrapper: PickerWrapper,
		wrapper: Wrapper
	}}
	toRight
/>
