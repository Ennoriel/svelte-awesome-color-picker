<script lang="ts">
	import _ from '../util/convert';
	import { keyPressed, keyPressedCustom } from '../util/store';
	import { easeInOutSin } from '../util/transition';
	import type { Components, Color } from '$lib/type/types';
	import { clamp } from '$lib/util/clamp';

	export let components: Components;

	export let h: number;
	export let s: number;
	export let v: number;

	export let isOpen: boolean;
	export let toRight: boolean;

	let picker: HTMLDivElement;
	let isMouseDown = false;
	let focused = false;

	let focusMovementIntervalId: number;
	let focusMovementCounter: number;

	let colorBg: Color;
	let pos = { x: 100, y: 0 };

	$: if (typeof h === 'number') colorBg = _.hsv2Color({ h, s: 1, v: 1, a: 1 });

	function onClick(e: { offsetX: number; offsetY: number }) {
		let mouse = { x: e.offsetX, y: e.offsetY };
		let width = picker.getBoundingClientRect().width;
		let height = picker.getBoundingClientRect().height;

		s = clamp(mouse.x / width, 0, 1);
		v = clamp((height - mouse.y) / height, 0, 1);
	}

	function pickerMouseDown(e: MouseEvent) {
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
		if (e.key === 'Tab') focused = document.activeElement.isSameNode(picker);

		if (!e.repeat && focused) move();
	}

	function keydown(e: KeyboardEvent) {
		if (focused && $keyPressedCustom.ArrowVH) {
			e.preventDefault();
			if (!e.repeat) move();
		}
		if (focused && e.shiftKey && e.key === 'Tab') {
			isOpen = false;
		}
	}

	function move() {
		if ($keyPressedCustom.ArrowVH) {
			if (!focusMovementIntervalId) {
				focusMovementCounter = 0;
				focusMovementIntervalId = window.setInterval(() => {
					let focusMovementFactor = easeInOutSin(++focusMovementCounter);
					s = Math.min(
						1,
						Math.max(0, s + ($keyPressed.ArrowRight - $keyPressed.ArrowLeft) * focusMovementFactor)
					);
					v = Math.min(
						1,
						Math.max(0, v + ($keyPressed.ArrowUp - $keyPressed.ArrowDown) * focusMovementFactor)
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
			x: s * 100,
			y: (1 - v) * 100
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
	<div
		class="picker"
		tabindex="0"
		bind:this={picker}
		on:mousedown={pickerMouseDown}
		on:touchstart={touch}
		on:touchmove={touch}
		on:touchend={touch}
		style="--color-bg: {colorBg.hex};"
	>
		<svelte:component
			this={components.pickerIndicator}
			{pos}
			color={_.hsv2Color({ h, s, v, a: 1 })}
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
	}
</style>
