<script lang="ts">
	export let pos: number;
	export let toRight: boolean;
</script>

<div
	class="slider-indicator"
	class:to-right={toRight}
	style="{toRight ? 'left' : 'top'}: {pos}%;"
/>

<style>
	div {
		position: absolute;
		width: 40px;
		height: 10px;
		border-radius: 3px;
		box-sizing: border-box;
		border: 2px solid black;
		box-shadow: 0 0 2px black;
		margin: -5px;
		pointer-events: none;
		z-index: 1;
	}
	div.to-right {
		width: 10px;
		height: 40px;
	}
</style>
