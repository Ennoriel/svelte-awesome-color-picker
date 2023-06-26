<script lang="ts">
	export let pos: number;
	/* svelte-ignore unused-export-let */
	export let toRight: boolean;

	$: left = `calc(${pos} * (var(--picker-width, 260px) - 20px) / 100 + 2px)`;
</script>

<div class="slider-indicator" style="left: {left}" />

<style>
	div {
		position: absolute;
		width: 6px;
		height: 6px;
		background-color: white;
		border-radius: 5px;
		margin-top: 2px;

		pointer-events: none;
		z-index: 1;
		border: 1px solid black;
		box-sizing: border-box;
	}
</style>
