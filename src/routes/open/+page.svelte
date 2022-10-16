<script lang="ts">
	import '../style.css';
	import ColorPicker, { ChromeVariant, type RgbaColor, type HsvaColor } from '$lib';

	let hex = '#ffffff';
	let rgb: RgbaColor;
	let hsv: HsvaColor;

	let hexBg = '#000000';
</script>

<div class="center">
	<ColorPicker
		bind:rgb
		bind:hsv
		bind:hex
		components={ChromeVariant}
		toRight
		isInput={false}
		isA11y
		isA11yOpen
		a11yColors={[{ hex: hexBg }]}
	/>
	<ColorPicker
		bind:hex={hexBg}
		components={ChromeVariant}
		toRight
		isInput={false}
		isA11y
		isA11yOpen
		a11yColors={[{ hex, reverse: true }]}
	/>

	<button style:--bg-color={hexBg} style:--text-color={hex}> This is a test </button>
</div>

<style>
	div {
		margin-top: 12px;
	}
	button {
		border: none;
		padding: 12px 24px;
		border-radius: 1000px;
		background-color: var(--bg-color);
		color: var(--text-color);
	}
</style>
