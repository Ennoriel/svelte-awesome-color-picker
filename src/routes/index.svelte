<script lang="ts">
	import ColorPicker from '$lib/ColorPicker.svelte';
	import CirclePickerColorPicker from './_components/circle-picker/ColorPicker.svelte';
</script>

<h1>Standard color picker</h1>

<ColorPicker />

<h1>Examples</h1>

<p>
	The customization of the color picker can be done by redefining the components of the library.
</p>

<CirclePickerColorPicker />
