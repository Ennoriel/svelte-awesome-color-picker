import type SliderIndicator from '$lib/components/SliderIndicator.svelte';
import type PickerIndicator from '$lib/components/PickerIndicator.svelte';
import type PickerWrapper from '$lib/components/PickerWrapper.svelte';
import type SliderWrapper from '$lib/components/SliderWrapper.svelte';
import type Input from '$lib/components/Input.svelte';
import type Wrapper from '$lib/components/Wrapper.svelte';

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
