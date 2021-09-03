<script lang="ts">
	import type { Color } from '$lib/type/types';

	export let pos: number;
	export let color: Color;
</script>

<div style="top: {pos}%;" />

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
</style>
