<script lang="ts">
	/** DOM element of the wrapper element */
	export let wrapper: HTMLElement;

	/** indicator of the popup state */
	export let isOpen: boolean;

	/** if set to true, the wrapper should have a dialog role and be absolute. It should be relative otherwise */
	export let isDialog: boolean;
</script>

<div
	bind:this={wrapper}
	class="wrapper"
	class:is-open={isOpen}
	role={isDialog ? 'dialog' : undefined}
	aria-label="color picker"
>
	<slot />
</div>

<!-- 
@component Default variant wrapper

**Import**
this component is the default variant and cannot be imported

**Use**
N.A.

**Props**
@prop wrapper: HTMLElement — DOM element of the wrapper element
@prop isOpen: boolean — indicator of the popup state
@prop isDialog: boolean — if set to true, the wrapper should have a dialog role and be absolute. It should be relative otherwise
-->
<style>
	div {
		padding: 8px;
		background-color: var(--cp-bg-color, white);
		margin: 0 10px 10px;
		border: 1px solid var(--cp-border-color, black);
		border-radius: 12px;
		display: none;
		width: max-content;
	}
	.is-open {
		display: inline-block;
	}
	[role='dialog'] {
		position: absolute;
		top: calc(var(--input-size, 25px) + 12px);
		left: 0;
		z-index: var(--picker-z-index, 2);
	}
</style>
