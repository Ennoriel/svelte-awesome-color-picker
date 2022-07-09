<script lang="ts">
	export let pos: number;
</script>

<div style={`top: calc(${(pos / 200) * 186}% + 2px);`} />

<style>
	div {
		position: absolute;
		width: 10px;
		height: 10px;
		background-color: white;
		border-radius: 5px;
		margin-left: 2px;

		pointer-events: none;
		z-index: 1;
	}
</style>
