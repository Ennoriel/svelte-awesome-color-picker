<script lang="ts">
	/** Function to call when a swatch is selected */
	export let selectSwatch: (color: string) => void;
	/** Optional array of color swatches to display */
	export let swatches: string[] = [];
</script>

<div class="swatches">
	{#each swatches as color}
		<button
			type="button"
			class="swatch"
			style="background: {color}"
			aria-label={`Select color ${color}`}
			onclick={() => selectSwatch(color)}
		></button>
	{/each}
</div>

<style>
	.swatches {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 8px;
		width: 100%;
		height: 100%;
		margin-top: 8px;
		margin-bottom: 8px;
	}
	.swatch {
		cursor: pointer;
		margin: 0;
		padding: 0;
		border: none;
		width: 100%;
		aspect-ratio: 1 / 1;
		height: auto;
		display: block;
	}
	.swatch:focus {
		outline: 2px solid var(--focus-color, red);
		outline-offset: 2px;
	}
</style>
