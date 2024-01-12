import { default as ColorPicker } from './components/ColorPicker.svelte';
import { default as ChromeWrapper } from './components/variant/chrome-picker/Wrapper.svelte';
import { default as A11yHorizontalWrapper } from './components/variant/accessibility/A11yHorizontalWrapper.svelte';
import { default as A11yNotice } from './components/variant/accessibility/A11yNotice.svelte';
import { default as A11ySingleNotice } from './components/variant/accessibility/A11ySingleNotice.svelte';

export default ColorPicker;

export type { HsvaColor, RgbaColor } from 'colord';

export const ChromeVariant = {
	wrapper: ChromeWrapper
};

export const A11yVariant = {
	wrapper: A11yHorizontalWrapper,
	a11yNotice: A11yNotice,
	a11ySingleNotice: A11ySingleNotice
};

export { mix } from './utils/colors';
