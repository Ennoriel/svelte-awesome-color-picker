import type SliderIndicator from '../components/variant/default/SliderIndicator.svelte';
import type PickerIndicator from '../components/variant/default/PickerIndicator.svelte';
import type PickerWrapper from '../components/variant/default/PickerWrapper.svelte';
import type SliderWrapper from '../components/variant/default/SliderWrapper.svelte';
import type Input from '../components/variant/default/Input.svelte';
import type Wrapper from '../components/variant/default/Wrapper.svelte';

export type Components = {
	pickerIndicator: typeof PickerIndicator;
	sliderIndicator: typeof SliderIndicator;
	alphaIndicator: typeof SliderIndicator;
	pickerWrapper: typeof PickerWrapper;
	sliderWrapper: typeof SliderWrapper;
	alphaWrapper: typeof SliderWrapper;
	input: typeof Input;
	wrapper: typeof Wrapper;
};
