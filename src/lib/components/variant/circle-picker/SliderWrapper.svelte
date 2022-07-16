<script lang="ts">
	export let focused: boolean;
	export let toRight: boolean;
</script>

<div class:focused>
	<slot />
</div>

<style>
	div {
		display: inline-block;
		margin: 0 5px;
		width: var(--slider-width, 14px);
		height: var(--picker-height, 200px);
		border-radius: 7px;
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
