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
