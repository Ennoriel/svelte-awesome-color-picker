<script lang="ts">
	export let pos: number;
</script>

<div style={`left: calc(${(pos / 200) * 190}% + 2px);`} />

<style>
	div {
		position: absolute;
		width: 6px;
		height: 6px;
		background-color: white;
		border-radius: 5px;
		margin-top: 2px;

		pointer-events: none;
		z-index: 1;
	}
</style>
