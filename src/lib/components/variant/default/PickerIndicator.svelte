<script lang="ts">
	import type { Color } from 'chyme';

	export let pos: { x: number; y: number };
	export let color: Color;
	export let isDark: boolean;
</script>

<div
	style:left="{pos.x}%"
	style:top="{pos.y}%"
	style:background-color={color.hex}
	style:border-color={isDark ? 'white' : 'black'}
/>

<style>
	div {
		position: absolute;
		width: 20px;
		height: 20px;
		border-radius: 10px;
		box-sizing: border-box;
		border: 2px solid black;
		box-shadow: 0 0 4px #777;
		margin: -10px;
		pointer-events: none;
		transition: border-color 0.2s;
	}
</style>
