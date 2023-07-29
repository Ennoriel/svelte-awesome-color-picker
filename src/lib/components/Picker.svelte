<script lang="ts">
	import { colord } from 'colord';
	import { keyPressed, keyPressedCustom } from '../util/store';
	import { easeInOutSin } from '../util/transition';
	import type { Components } from '$lib/type/types';

	export let components: Components;

	export let h: number;
	export let s: number;
	export let v: number;

	/* svelte-ignore unused-export-let */
	export let isOpen: boolean;
	export let toRight: boolean;
	export let isDark: boolean;

	let picker: HTMLDivElement;
	let isMouseDown = false;
	let focused = false;

	let focusMovementIntervalId: number | undefined;
	let focusMovementCounter: number;

	let colorBg: string;
	let pos = { x: 100, y: 0 };

	$: if (typeof h === 'number') colorBg = colord({ h, s: 100, v: 100, a: 1 }).toHex();

	function clamp(value: number, min: number, max: number): number {
		return Math.min(Math.max(min, value), max);
	}

	function onClick(e: { offsetX: number; offsetY: number }) {
		let mouse = { x: e.offsetX, y: e.offsetY };
		let width = picker.getBoundingClientRect().width;
		let height = picker.getBoundingClientRect().height;

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
		if (isMouseDown)
			onClick({
				offsetX: Math.max(
					0,
					Math.min(
						picker.getBoundingClientRect().width,
						e.clientX - picker.getBoundingClientRect().left
					)
				),
				offsetY: Math.max(
					0,
					Math.min(
						picker.getBoundingClientRect().height,
						e.clientY - picker.getBoundingClientRect().top
					)
				)
			});
	}

	function mouseDown(e: MouseEvent) {
		if (!(<HTMLElement>e.target).isSameNode(picker)) focused = false;
	}

	function keyup(e: KeyboardEvent) {
		if (e.key === 'Tab') focused = !!document.activeElement?.isSameNode(picker);

		if (!e.repeat && focused) move();
	}

	function keydown(e: KeyboardEvent) {
		if (focused && $keyPressedCustom.ArrowVH) {
			e.preventDefault();
			if (!e.repeat) move();
		}
	}

	function move() {
		if ($keyPressedCustom.ArrowVH) {
			if (!focusMovementIntervalId) {
				focusMovementCounter = 0;
				focusMovementIntervalId = window.setInterval(() => {
					let focusMovementFactor = easeInOutSin(++focusMovementCounter);
					s = Math.min(
						100,
						Math.max(
							0,
							s + ($keyPressed.ArrowRight - $keyPressed.ArrowLeft) * focusMovementFactor * 100
						)
					);
					v = Math.min(
						100,
						Math.max(
							0,
							v + ($keyPressed.ArrowUp - $keyPressed.ArrowDown) * focusMovementFactor * 100
						)
					);
				}, 10);
			}
		} else if (focusMovementIntervalId) {
			clearInterval(focusMovementIntervalId);
			focusMovementIntervalId = undefined;
		}
	}

	function touch(e: TouchEvent) {
		e.preventDefault();
		onClick({
			offsetX: e.changedTouches[0].clientX - picker.getBoundingClientRect().left,
			offsetY: e.changedTouches[0].clientY - picker.getBoundingClientRect().top
		});
	}

	$: if (typeof s === 'number' && typeof v === 'number' && picker)
		pos = {
			x: s,
			y: 100 - v
		};
</script>

<svelte:window
	on:mouseup={mouseUp}
	on:mousedown={mouseDown}
	on:mousemove={mouseMove}
	on:keyup={keyup}
	on:keydown={keydown}
/>

<svelte:component this={components.pickerWrapper} {focused} {toRight}>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div
		class="picker"
		tabindex="0"
		bind:this={picker}
		on:mousedown|preventDefault={pickerMousedown}
		on:touchstart={touch}
		on:touchmove|preventDefault={touch}
		on:touchend={touch}
		style="--color-bg: {colorBg};"
		role="slider"
		aria-label="saturation and brightness picker (horizontal arrows for saturation and vertical for brightness)"
		aria-valuemin={0}
		aria-valuemax={100}
		aria-valuenow={0}
		aria-valuetext="saturation {pos.x?.toFixed()}%, brightness {pos.y?.toFixed()}%"
	>
		<svelte:component
			this={components.pickerIndicator}
			{pos}
			{isDark}
			hex={colord({ h, s, v, a: 1 }).toHex()}
		/>
	</div>
</svelte:component>

<style>
	.picker {
		position: relative;
		width: 100%;
		height: 100%;
		background: linear-gradient(#ffffff00, #000000ff),
			linear-gradient(0.25turn, #ffffffff, #00000000), var(--color-bg);
		outline: none;
		user-select: none;
	}
</style>
