<script lang="ts">
	export let pos: number;
	/* svelte-ignore unused-export-let */
	export let toRight: boolean;
</script>

<div class="slider-indicator" style={`left: calc(${(pos / 200) * 192}% + 2px);`} />

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
	}
</style>
