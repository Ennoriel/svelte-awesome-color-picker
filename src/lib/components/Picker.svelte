<script lang="ts">
	import { colord } from 'colord';
	import type { Components } from '$lib/type/types';
	import { Slider } from 'svelte-awesome-slider';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		input: {
			s: number;
			v: number;
		};
	}>();

	/** customize the ColorPicker component parts. Can be used to display a Chrome variant or an Accessibility Notice */
	export let components: Components;

	/** hue value */
	export let h: number;

	/** saturation value */
	export let s: number;

	/** vibrance value */
	export let v: number;

	/** indicator whether the selected color is light or dark */
	export let isDark: boolean;

	let picker: HTMLDivElement;

	let isMouseDown = false;
	let focused = false;

	let pickerColorBg: string;
	let pos = { x: 100, y: 0 };

	$: if (typeof h === 'number') pickerColorBg = colord({ h, s: 100, v: 100, a: 1 }).toHex();

	function clamp(value: number, min: number, max: number): number {
		return Math.min(Math.max(min, value), max);
	}

	function onClick(e: { clientX: number; clientY: number }) {
		const { width, left, height, top } = picker.getBoundingClientRect();
		const mouse = { x: clamp(e.clientX - left, 0, width), y: clamp(e.clientY - top, 0, height) };

		s = clamp(mouse.x / width, 0, 1) * 100;
		v = clamp((height - mouse.y) / height, 0, 1) * 100;
	}

	function pickerMousedown(e: MouseEvent) {
		if (e.button === 0) {
			isMouseDown = true;
			onClick(e);
		}
	}

	function mouseUp() {
		isMouseDown = false;
	}

	function mouseMove(e: MouseEvent) {
		if (isMouseDown) onClick(e);
	}

	function mouseDown(e: MouseEvent) {
		if (!(<HTMLElement>e.target).isSameNode(picker)) focused = false;
	}

	function touch(e: TouchEvent) {
		e.preventDefault();
		onClick(e.changedTouches[0]);
	}

	$: if (typeof s === 'number' && typeof v === 'number' && picker)
		pos = {
			x: s,
			y: 100 - v
		};

	$: dispatch('input', { s, v });
</script>

<svelte:window on:mouseup={mouseUp} on:mousedown={mouseDown} on:mousemove={mouseMove} />

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="picker"
	bind:this={picker}
	on:mousedown|preventDefault={pickerMousedown}
	on:touchstart|nonpassive={touch}
	on:touchmove|nonpassive|preventDefault={touch}
	on:touchend|nonpassive={touch}
	style:--picker-color-bg={pickerColorBg}
>
	<svelte:component this={components.pickerIndicator} {pos} {isDark} />
	<div class="s" style:--pos-y={pos.y}>
		<Slider bind:value={s} keyboardOnly ariaValueText={(value) => `${value}%`} ariaLabel="saturation color" />
	</div>
	<div class="v" style:--pos-x={pos.x}>
		<Slider
			bind:value={v}
			keyboardOnly
			ariaValueText={(value) => `${value}%`}
			direction="vertical"
			ariaLabel="brightness color"
		/>
	</div>
</div>

<!-- 
@component Picker wrapper containing the mouse and keyboard logic to select the color. _internal component_ 

**Import**
N.A.

**Use**
N.A.

**Props**
@prop components: Components — customize the ColorPicker component parts. Can be used to display a Chrome variant or an Accessibility Notice
@prop h: number — hue value
@prop s: number — saturation value
@prop v: number — vibrance value
@prop isDark: boolean — indicator whether the selected color is light or dark
-->
<style>
	.picker {
		position: relative;
		display: inline-block;
		width: var(--picker-width, 200px);
		height: var(--picker-height, 200px);
		background: linear-gradient(#ffffff00, #000000ff), linear-gradient(0.25turn, #ffffffff, #00000000),
			var(--picker-color-bg);
		border-radius: var(--picker-radius, 8px);
		outline: none;
		user-select: none;
	}

	.s,
	.v {
		position: absolute;
		--track-background: none;
		--track-border: none;
		--thumb-background: none;
		--thumb-border: none;
		--thumb-size: 2px;
		--margin-block: 0;
		--track-height: var(--picker-indicator-size, 10px);
		user-select: none;
		-webkit-user-select: none;
	}

	.s {
		top: calc(var(--pos-y) * (var(--picker-height, 200px) - var(--picker-indicator-size, 10px) - 4px) / 100 + 2px);
		left: 2px;
		--track-width: calc(var(--picker-width, 200px) - 4px);
	}

	.v {
		top: 2px;
		left: calc(var(--pos-x) * (var(--picker-width, 200px) - var(--picker-indicator-size, 10px) - 4px) / 100 + 2px);
		--track-width: calc(var(--picker-height, 200px) - 4px);
	}
</style>
