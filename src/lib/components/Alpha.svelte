<script lang="ts">
	import _ from '../util/convert';
	import { keyPressed, keyPressedCustom } from '../util/store';
	import { easeInOutSin } from '../util/transition';
	import type { Components } from '$lib/type/types';

	export let components: Components;
	export let isOpen: boolean;

	export let h: number;
	export let s: number;
	export let v: number;
	export let a: number;
	export let hex: string;

	let alpha: HTMLDivElement;
	let isMouseDown = false;

	let focused = false;

	let focusMovementIntervalId: number;
	let focusMovementCounter: number;
	let pos: number;

	function onClick(posY: number): void {
		let boudedPosY = Math.max(0, Math.min(alpha.getBoundingClientRect().height, posY));
		a = boudedPosY / alpha.getBoundingClientRect().height;
	}

	function mouseDown(e: MouseEvent) {
		if (e.button === 0) {
			isMouseDown = true;
			onClick(e.offsetY);
		}
	}

	function mouseUp() {
		isMouseDown = false;
	}

	function mousemove(e: MouseEvent) {
		if (isMouseDown) onClick(e.clientY - alpha.getBoundingClientRect().top);
	}

	function keyup(e: KeyboardEvent) {
		if (e.key === 'Tab') focused = document.activeElement.isSameNode(alpha);
		if (!e.repeat && focused) move();
	}

	function keydown(e: KeyboardEvent) {
		if (focused && $keyPressedCustom.ArrowVH) {
			e.preventDefault();
			if (!e.repeat) move();
		}
		if (focused && !e.shiftKey && e.key === 'Tab') {
			isOpen = false;
		}
	}

	function move() {
		if ($keyPressedCustom.ArrowVH) {
			if (!focusMovementIntervalId) {
				focusMovementCounter = 0;
				focusMovementIntervalId = setInterval(() => {
					let focusMovementFactor = easeInOutSin(++focusMovementCounter);
					a = Math.min(
						1,
						Math.max(0, a + ($keyPressed.ArrowDown - $keyPressed.ArrowUp) * focusMovementFactor)
					);
				}, 10) as number;
			}
		} else if (focusMovementIntervalId) {
			clearInterval(focusMovementIntervalId);
			focusMovementIntervalId = undefined;
		}
	}

	$: if (typeof a === 'number' && alpha) pos = 100 * a;
</script>

<svelte:window
	on:mouseup={mouseUp}
	on:mousemove={mousemove}
	on:keyup={keyup}
	on:keydown={keydown}
	on:dbclick={(e) => e.preventDefault()}
/>

<svelte:component this={components.alphaWrapper} {focused}>
	<div
		class="alpha"
		tabindex="0"
		style="--alpha-color: {hex.substring(0, 7)}"
		bind:this={alpha}
		on:mousedown={mouseDown}
	>
		<svelte:component this={components.alphaIndicator} {pos} color={_.hsv2rgb({ h, s, v, a })} />
	</div>
</svelte:component>

<style>
	.alpha:after {
		position: absolute;
		content: '';
		inset: 0;
		background: linear-gradient(#00000000, var(--alpha-color));
		z-index: 0;
	}
	.alpha {
		position: relative;
		width: 100%;
		height: 100%;
		background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%),
			linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%);
		background-size: 10px 10px;
		background-position: 0 0, 5px 5px;
		outline: none;
	}
</style>
