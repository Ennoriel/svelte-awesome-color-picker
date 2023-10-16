import type TextInput from '../components/variant/default/TextInput.svelte';
import type A11yNotice from '../components/variant/accessibility/A11yNotice.svelte';
import type A11ySingleNotice from '../components/variant/accessibility/A11ySingleNotice.svelte';
import type A11ySummary from '$lib/components/variant/accessibility/A11ySummary.svelte';
import type Input from '../components/variant/default/Input.svelte';
import type Wrapper from '../components/variant/default/Wrapper.svelte';
import type PickerIndicator from '$lib/components/variant/default/PickerIndicator.svelte';

export type Components = {
	pickerIndicator: typeof PickerIndicator;
	textInput: typeof TextInput;
	input: typeof Input;
	wrapper: typeof Wrapper;

	a11yNotice?: typeof A11yNotice;
	a11ySingleNotice?: typeof A11ySingleNotice;
	a11ySummary?: typeof A11ySummary;
};

export type A11yColor = {
	hex: string;
	reverse?: boolean;
	placeholder?: string;
	size?: 'normal' | 'large';
};

export type A11yColorContract = A11yColor & {
	contrast?: number;
};
