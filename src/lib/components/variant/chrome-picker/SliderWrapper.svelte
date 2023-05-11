<script lang="ts">
	export let focused: boolean;
	/* svelte-ignore unused-export-let */
	export let toRight: boolean;
</script>

<div class="slider-wrapper" class:focused>
	<slot />
</div>

<style>
	div {
		display: inline-block;
		margin: 4px;
		width: calc(var(--picker-width, 260px) - 10px);
		height: var(--slider-width, 10px);
		border-radius: 7px;
		overflow: hidden;

		outline: 2px solid transparent;
		outline-offset: 3px;
		transition: outline 0.2s ease-in-out;
		user-select: none;

		--pattern-size: 5px;
		--pattern-size-2x: 10px;
	}

	div.focused {
		outline: 2px solid var(--focus-color, red);
	}
</style>
