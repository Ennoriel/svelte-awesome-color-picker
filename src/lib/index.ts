import { default as ColorPicker } from './components/ColorPicker.svelte';
export default ColorPicker;

export type { Colord, HsvaColor, RgbaColor } from 'colord';

import { default as ChromePickerIndicator } from './components/variant/chrome-picker/PickerIndicator.svelte';
import { default as ChromePickerWrapper } from './components/variant/chrome-picker/PickerWrapper.svelte';
import { default as ChromeSliderIndicator } from './components/variant/chrome-picker/SliderIndicator.svelte';
import { default as ChromeSliderWrapper } from './components/variant/chrome-picker/SliderWrapper.svelte';
import { default as ChromeWrapper } from './components/variant/chrome-picker/Wrapper.svelte';

export { default as A11yHorizontalWrapper } from './components/variant/A11yHorizontalWrapper.svelte';
export { default as A11yNotice } from './components/variant/default/A11yNotice.svelte';

export const ChromeVariant = {
	sliderIndicator: ChromeSliderIndicator,
	pickerIndicator: ChromePickerIndicator,
	alphaIndicator: ChromeSliderIndicator,
	pickerWrapper: ChromePickerWrapper,
	sliderWrapper: ChromeSliderWrapper,
	alphaWrapper: ChromeSliderWrapper,
	wrapper: ChromeWrapper
};
