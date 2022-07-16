<script lang="ts">
    import type { Color } from 'chyme';

    export let pos: number;
    export let color: Color;
    export let toRight: boolean;
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
