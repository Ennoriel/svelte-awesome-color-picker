<script lang="ts">
	export let focused: boolean;
	export let toRight: boolean;
</script>

<div class:focused class:to-right={toRight}>
	<slot />
</div>

<style>
	div {
		--slider-width: 30px;
		--picker-height: 300px;
		display: inline-block;
		margin: 0 5px;
		width: var(--slider-width);
		height: var(--picker-height);

		outline: 3px solid transparent;
		outline-offset: 3px;
		transition: outline 0.2s ease-in-out;
	}

	div.focused {
		outline: 3px solid var(--focus-color, red);
	}

	div.to-right {
		--slider-width: 300px;
		--picker-height: 30px;
		margin: 5px 0;
	}
</style>
