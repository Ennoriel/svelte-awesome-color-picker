<script lang="ts">
	import ColorPicker, { CircleVariant } from '$lib';
	import type { RgbaColor, HsvaColor } from 'colord';

	export let rgb: RgbaColor | undefined = undefined;
	export let hsv: HsvaColor | undefined = undefined;
	export let hex: string | undefined = undefined;
</script>

<ColorPicker bind:rgb bind:hsv bind:hex components={CircleVariant} />
