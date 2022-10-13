<script lang="ts">
	export let pos: { x: number; y: number };
	/* svelte-ignore unused-export-let */
	export let hex: string;
	export let isDark: boolean;
</script>

<div class="picker-indicator"
	style={`left: calc(${(pos.x / 260) * 246}% + 2px); top: calc(${
		(pos.y / 200) * 186
	}% + 2px); box-shadow: 0 0 4px ${isDark ? 'white' : 'black'};`}
/>

<style>
	div {
		position: absolute;
		width: 10px;
		height: 10px;
		background-color: white;
		border-radius: 5px;

		pointer-events: none;
		z-index: 1;
		transition: box-shadow 0.2s;
	}
</style>
