<script lang="ts">
	export let focused: boolean;
</script>

<div class:focused>
	<slot />
</div>

<style>
	div {
		display: inline-block;
		margin-right: 5px;
		height: var(--picker-height, 300px);
		width: var(--picker-width, 300px);

		outline: 3px solid transparent;
		outline-offset: 3px;
		transition: outline 0.2s ease-in-out;
	}

	div.focused {
		outline: 3px solid var(--focus-color, red);
	}
</style>
