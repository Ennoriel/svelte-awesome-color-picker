<script lang="ts">
	import type { Color } from 'chyme';

	export let button: HTMLButtonElement;
	export let color: Color;
	export let isOpen: boolean;

	function keyup(e: KeyboardEvent) {
		if (document.activeElement?.isSameNode(button) && !e.shiftKey && e.key === 'Tab') isOpen = true;
	}
</script>

<svelte:window on:keyup={keyup} />

<button bind:this={button}>
	<div style="background-color: {color.hex};" />
	Choose a color
</button>
<input type="hidden" value={color.hex} />

<style>
	div {
		width: 40px;
		height: 20px;
		border-radius: 3px;
	}
	button {
		display: flex;
		align-items: center;
		gap: 10px;

		margin: 10px;
		padding: 10px 20px 10px 10px;
		background-color: white;
		border: none;
		border-radius: 3px 20px 20px 3px;
		box-shadow: 0 0 2px black;
		cursor: pointer;

		outline: 3px solid transparent;
		outline-offset: 3px;
		transition: all 0.2s ease-in-out;
	}
	button:hover {
		box-shadow: 0 0 5px black;
	}
	button:focus-visible {
		outline: 3px solid var(--focus-color, red);
	}
</style>
