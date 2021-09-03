import type SliderIndicator from '$lib/components/SliderIndicator.svelte';
import type PickerIndicator from '$lib/components/PickerIndicator.svelte';
import type PickerWrapper from '$lib/components/PickerWrapper.svelte';
import type SliderWrapper from '$lib/components/SliderWrapper.svelte';
import type Input from '$lib/components/Input.svelte';
import type Wrapper from '$lib/components/Wrapper.svelte';

export type Hsv = {
	h: number;
	s: number;
	v: number;
	a: number;
};

export type Rgb = {
	r: number;
	g: number;
	b: number;
	a: number;
};

export type Hex = {
	hex: string;
};

export type Color = Hsv & Rgb & Hex;

export type Components = {
	pickerIndicator: PickerIndicator;
	sliderIndicator: SliderIndicator;
	alphaIndicator: SliderIndicator;
	pickerWrapper: PickerWrapper;
	sliderWrapper: SliderWrapper;
	alphaWrapper: SliderWrapper;
	input: Input;
	wrapper: Wrapper;
};
