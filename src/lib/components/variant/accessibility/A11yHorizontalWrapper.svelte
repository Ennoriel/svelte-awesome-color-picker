<script lang="ts">
	/** DOM element of the Color Picker popup wrapper */
	export let wrapper: HTMLElement;

	/** indicator of the popup state */
	export let isOpen: boolean;

	/** if set to true, the wrapper should have a dialog role and be absolute. It should be relative otherwise */
	export let isDialog: boolean;
</script>

<div
	class="wrapper"
	bind:this={wrapper}
	class:is-open={isOpen}
	role={isDialog ? 'dialog' : undefined}
	aria-label="color picker"
>
	<slot />
</div>

<!-- 
@component Accessibility horizontal wrapper — this component is meant to be used with the A11yVariant object as a variant to display the accessibility notice.

**Import**
```js
import { A11yVariant } from 'svelte-awesome-color-picker';
```

**Use**
```svelte
<ColorPicker bind:hex components={A11yVariant} />
```

**Props**
@prop wrapper: HTMLElement — DOM element of the Color Picker popup wrapper
@prop isOpen: boolean — indicator of the popup state
@prop isDialog: boolean — if set to true, the wrapper should have a dialog role and be absolute. It should be relative otherwise
-->
<style>
	div {
		padding: 6px;
		background-color: white;
		margin: 0 10px 10px;
		border: 1px solid black;
		border-radius: 12px;
		display: none;
	}
	.is-open {
		display: block;
	}
	@media (min-width: 768px) {
		.is-open {
			display: grid;
			gap: 5px;
			grid-template:
				'picker . . a11y'
				'input input input a11y';
		}
	}

	div :global(.picker) {
		grid-area: picker;
	}

	div :global(.text-input) {
		grid-area: input;
	}

	div :global(.a11y-notice) {
		grid-area: a11y;
		margin: 0 4px 0 6px;
	}

	[role='dialog'] {
		position: absolute;
		top: 30px;
		z-index: var(--picker-z-index, 2);
	}
</style>
