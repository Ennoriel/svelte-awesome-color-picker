<script lang="ts">
	export let focused: boolean;
	export let toRight: boolean;
</script>

<div class:focused class:to-right={toRight}>
	<slot />
</div>

<style>
	div {
		display: inline-block;
		margin-right: 5px;
		height: var(--picker-height, 200px);
		width: var(--picker-width, 200px);

		outline: 3px solid transparent;
		outline-offset: 3px;
		transition: outline 0.2s ease-in-out;
		user-select: none;
	}
	div.to-right {
		margin-right: 0;
		margin-bottom: 5px;
	}

	div.focused {
		outline: 3px solid var(--focus-color, red);
	}
</style>
