<script lang="ts">
	export let pos: number;
	/* svelte-ignore unused-export-let */
	export let toRight: boolean;

	$: top = `calc(${pos} * (var(--picker-height, 200px) - 14px) / 100 + 2px)`;
</script>

<div class="slider-indicator" style="top: {top}" />

<style>
	div {
		position: absolute;
		width: 9.5px;
		height: 9.5px;
		background-color: white;
		border-radius: 5px;
		margin-left: 1.5px;

		pointer-events: none;
		z-index: 1;
		border: 1px solid black;
		box-sizing: border-box;
	}
</style>
