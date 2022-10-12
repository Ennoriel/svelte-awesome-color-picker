<script lang="ts">
	export let button: HTMLButtonElement;
	export let hex: string;
	export let label: string;
	/* svelte-ignore unused-export-let */
	export let isOpen: boolean;
</script>

<button bind:this={button}>
	<div style="background-color: {hex};" />
	{label}
</button>
<input type="hidden" value={hex} />

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
