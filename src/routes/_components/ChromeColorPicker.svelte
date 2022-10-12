<script lang="ts">
	import ColorPicker, { ChromeVariant } from '$lib';
	import type { Rgb, Hsv } from 'chyme';

	export let rgb: Rgb | undefined = undefined;
	export let hsv: Hsv | undefined = undefined;
	export let hex: string | undefined = undefined;
</script>

<ColorPicker bind:rgb bind:hsv bind:hex components={ChromeVariant} toRight />
