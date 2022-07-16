<script lang="ts">
	import type { Color } from 'chyme';

	export let button: HTMLButtonElement;
	export let color: Color;
	export let label: string;
	export let isOpen: boolean;

	function keyup(e: KeyboardEvent) {
		if (document.activeElement?.isSameNode(button) && !e.shiftKey && e.key === 'Tab') isOpen = true;
	}
</script>

<svelte:window on:keyup={keyup} />

<button bind:this={button}>
	<div style="background-color: {color.hex};" />
	{label}
</button>
<input type="hidden" value={color.hex} />

<style>
	div {
		width: 40px;
		height: 20px;
		border-radius: 10px;
		pointer-events: none;
	}
	button {
		display: flex;
		align-items: center;
		gap: 10px;

		margin: 10px;
		padding: 10px;
		background-color: white;
		border: 1px solid black;
		font-variant: small-caps;
		font-weight: bolder;
		cursor: pointer;

		outline: 3px solid transparent;
		outline-offset: 3px;
		transition: all 0.2s ease-in-out;
	}
	button:hover {
		box-shadow: 0 0 3px black;
	}
	button:focus-visible {
		outline: 3px solid var(--focus-color, red);
	}
</style>
