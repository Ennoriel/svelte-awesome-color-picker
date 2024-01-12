<script lang="ts">
	/** DOM element of the wrapper element */
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
@component Chrome variant wrapper — this component is meant to be used with the ChromeVariant object to display a Chrome like variant.

**Import**
```js
import { ChromeVariant } from 'svelte-awesome-color-picker';
```

**Use**
```svelte
<ColorPicker bind:hex components={ChromeVariant} />
```

**Props**
@prop wrapper: HTMLElement — DOM element of the wrapper element
@prop isOpen: boolean — indicator of the popup state
@prop isDialog: boolean — if set to true, the wrapper should have a dialog role and be absolute. It should be relative otherwise
-->
<style>
	div {
		background-color: var(--cp-bg-color, white);
		margin: 0 10px 15px;
		border: 1px solid var(--cp-border-color, black);
		border-radius: 8px;
		display: none;

		--text-input-margin: 5px 5px 6px;
		--picker-radius: 8px 8px 0 0;
		--picker-width: 260px;
	}
	.is-open {
		display: flex;
		flex-direction: column;
	}
	[role='dialog'] {
		position: absolute;
		top: calc(var(--input-size, 25px) + 12px);
		left: 0;
		z-index: var(--picker-z-index, 2);
	}
	div:not([role='dialog']) {
		display: inline-flex;
		flex-direction: column;
	}
</style>
