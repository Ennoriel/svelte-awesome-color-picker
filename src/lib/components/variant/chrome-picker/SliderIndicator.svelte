<script lang="ts">
	import type { Color } from 'chyme';

	export let pos: number;
	/* svelte-ignore unused-export-let */
	export let color: Color;
	/* svelte-ignore unused-export-let */
	export let toRight: boolean;
</script>

<div style={`left: calc(${(pos / 200) * 190}% + 2px);`} />

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
