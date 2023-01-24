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
		margin-right: 5px;
		width: var(--slider-width, 12px);
		height: var(--picker-height, 200px);
		border-radius: 6px;
		overflow: hidden;
		user-select: none;

		outline: 2px solid transparent;
		outline-offset: 3px;
		transition: outline 0.2s ease-in-out;
	}

	div.focused {
		outline: 2px solid var(--focus-color, red);
	}
</style>
