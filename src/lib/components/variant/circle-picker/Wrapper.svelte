<script lang="ts">
	export let wrapper: HTMLElement;
	export let isOpen: boolean;
	export let isPopup: boolean;
	export let toRight: boolean;
</script>

<div class="wrapper" bind:this={wrapper} class:isOpen class:isPopup>
	<slot />
</div>

<style>
	.wrapper {
		padding: 8px 5px 5px 8px;
		background-color: white;
		margin: 0 10px 10px;
		border: 1px solid black;
		border-radius: 12px;
		display: none;
	}
	.isOpen {
		display: block;
	}
	.isPopup {
		position: absolute;
		z-index: 2;
	}
</style>
