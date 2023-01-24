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
		padding: 8px 5px 5px 8px;
		background-color: white;
		margin: 0 10px 10px;
		border: 1px solid black;
		border-radius: 12px;
		display: none;
		width: max-content;
	}
	.isOpen {
		display: block;
	}
	.isPopup {
		position: absolute;
		top: 30px;
		z-index: 2;
	}
</style>
