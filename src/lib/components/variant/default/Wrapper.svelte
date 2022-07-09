<script lang="ts">
	export let wrapper: HTMLElement;
	export let isOpen: boolean;
	export let isPopup: boolean;
	export let toRight: boolean;
</script>

<div class="wrapper" bind:this={wrapper} class:isOpen class:isPopup class:to-right={toRight}>
	<slot />
</div>

<style>
	.wrapper {
		padding: 10px;
		background-color: white;
		margin: 0 10px 10px;
		border: 1px solid black;
		display: none;
	}
	.isOpen {
		display: block;
	}
	.isOpen.to-right {
		display: flex;
		flex-direction: column;
	}
	.isPopup {
		position: absolute;
		z-index: 2;
	}
</style>
