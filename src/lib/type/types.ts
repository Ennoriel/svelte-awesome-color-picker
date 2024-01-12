import type TextInput from '../components/variant/default/TextInput.svelte';
import type A11yNotice from '../components/variant/accessibility/A11yNotice.svelte';
import type A11ySingleNotice from '../components/variant/accessibility/A11ySingleNotice.svelte';
import type Input from '../components/variant/default/Input.svelte';
import type Wrapper from '../components/variant/default/Wrapper.svelte';
import type PickerIndicator from '$lib/components/variant/default/PickerIndicator.svelte';
import type NullabilityCheckbox from '$lib/components/variant/default/NullabilityCheckbox.svelte';

export type Components = {
	pickerIndicator: typeof PickerIndicator;
	textInput: typeof TextInput;
	input: typeof Input;
	nullabilityCheckbox: typeof NullabilityCheckbox;
	wrapper: typeof Wrapper;

	a11yNotice?: typeof A11yNotice;
	a11ySingleNotice?: typeof A11ySingleNotice;
};

export type A11yColor = {
	placeholder?: string;
	size?: 'normal' | 'large';
} & (
	| {
			textHex: string;
			bgHex?: string;
			reverse: true;
	  }
	| {
			bgHex?: string;
			reverse?: false;
	  }
);

export type A11yColorContract = A11yColor & {
	contrast?: number;
};
