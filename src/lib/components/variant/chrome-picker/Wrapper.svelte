<script lang="ts">
	export let wrapper: HTMLElement;
	export let isOpen: boolean;
	export let isPopup: boolean;
	/* svelte-ignore unused-export-let */
	export let toRight: boolean;
</script>

<div
	class="wrapper"
	bind:this={wrapper}
	class:isOpen
	class:isPopup
	role={isPopup ? 'dialog' : undefined}
	aria-label="color picker"
>
	<slot />
</div>

<style>
	div {
		background-color: white;
		margin: 0 10px 15px;
		padding-bottom: 3px;
		border: 1px solid black;
		border-radius: 8px;
		display: none;
	}
	.isOpen {
		display: flex;
		flex-direction: column;
	}
	.isPopup {
		position: absolute;
		top: 15px;
		z-index: var(--picker-z-index, 2);
	}
	div:not(.isPopup) {
		display: inline-flex;
		flex-direction: column;
	}
	div :global(.text-input) {
		margin: 5px;
	}
</style>
