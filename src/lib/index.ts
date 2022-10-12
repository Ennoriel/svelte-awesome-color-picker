import { default as ColorPicker } from './components/ColorPicker.svelte';
export default ColorPicker;

export type { HsvaColor, RgbaColor } from 'colord';

import { default as ChromeInput } from './components/variant/chrome-picker/Input.svelte';
import { default as ChromePickerIndicator } from './components/variant/chrome-picker/PickerIndicator.svelte';
import { default as ChromePickerWrapper } from './components/variant/chrome-picker/PickerWrapper.svelte';
import { default as ChromeSliderIndicator } from './components/variant/chrome-picker/SliderIndicator.svelte';
import { default as ChromeSliderWrapper } from './components/variant/chrome-picker/SliderWrapper.svelte';
import { default as ChromeWrapper } from './components/variant/chrome-picker/Wrapper.svelte';

// No custom TextInput for the Chrome variant but it doesn't prevent you from making one!
import { default as TextInput } from './components/variant/default/TextInput.svelte';

export const ChromeVariant = {
	sliderIndicator: ChromeSliderIndicator,
	pickerIndicator: ChromePickerIndicator,
	alphaIndicator: ChromeSliderIndicator,
	pickerWrapper: ChromePickerWrapper,
	sliderWrapper: ChromeSliderWrapper,
	alphaWrapper: ChromeSliderWrapper,
	textInput: TextInput,
	input: ChromeInput,
	wrapper: ChromeWrapper
};

import { default as CircleInput } from './components/variant/circle-picker/Input.svelte';
import { default as CirclePickerIndicator } from './components/variant/circle-picker/PickerIndicator.svelte';
import { default as CirclePickerWrapper } from './components/variant/circle-picker/PickerWrapper.svelte';
import { default as CircleSliderIndicator } from './components/variant/circle-picker/SliderIndicator.svelte';
import { default as CircleSliderWrapper } from './components/variant/circle-picker/SliderWrapper.svelte';
import { default as CircleWrapper } from './components/variant/circle-picker/Wrapper.svelte';
// No custom TextInput for the Circle variant but it doesn't prevent you from making one!

export const CircleVariant = {
	sliderIndicator: CircleSliderIndicator,
	pickerIndicator: CirclePickerIndicator,
	alphaIndicator: CircleSliderIndicator,
	pickerWrapper: CirclePickerWrapper,
	sliderWrapper: CircleSliderWrapper,
	alphaWrapper: CircleSliderWrapper,
	textInput: TextInput,
	input: CircleInput,
	wrapper: CircleWrapper
};
