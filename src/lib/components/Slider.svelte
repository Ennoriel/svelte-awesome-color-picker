<script lang="ts">
	import { keyPressed, keyPressedCustom } from '../util/store';
	import { easeInOutSin } from '../util/transition';
	import type { Components } from '$lib/type/types';

	let slider: HTMLDivElement;
	let isMouseDown = false;

	export let components: Components;

	export let h: number;
	let pos = 0;

	let focused = false;

	let focusMovementIntervalId: number;
	let focusMovementCounter: number;

	function onClick(posY: number) {
		let boundedPosY = Math.max(0, Math.min(slider.getBoundingClientRect().height, posY));
		h = (boundedPosY / slider.getBoundingClientRect().height) * 360;
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

	function mouseMove(e: MouseEvent) {
		if (isMouseDown) onClick(e.clientY - slider.getBoundingClientRect().top);
	}

	function keyup(e: KeyboardEvent) {
		if (e.key === 'Tab') focused = document.activeElement.isSameNode(slider);
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
				focusMovementIntervalId = setInterval(() => {
					let focusMovementFactor = easeInOutSin(++focusMovementCounter);
					h = Math.min(
						360,
						Math.max(
							0,
							h + ($keyPressed.ArrowDown - $keyPressed.ArrowUp) * 360 * focusMovementFactor
						)
					);
				}, 10) as number;
			}
		} else if (focusMovementIntervalId) {
			clearInterval(focusMovementIntervalId);
			focusMovementIntervalId = undefined;
		}
	}

	function touch(e) {
		onClick(e.changedTouches[0].clientY - slider.getBoundingClientRect().top)
	}

	$: if (typeof h === 'number' && slider) pos = (100 * h) / 360;
</script>

<svelte:window
	on:mouseup={mouseUp}
	on:mousemove={mouseMove}
	on:keyup={keyup}
	on:keydown={keydown}
	on:dbclick={(e) => e.preventDefault()}
/>

<svelte:component this={components.sliderWrapper} {focused}>
	<div
		class="slider"
		tabindex="0"
		bind:this={slider}
		on:mousedown={mouseDown}
		on:touchstart={touch}
		on:touchmove={touch}
		on:touchend={touch}
	>
		<svelte:component this={components.sliderIndicator} {pos} />
	</div>
</svelte:component>

<style>
	.slider {
		position: relative;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			#ff0000,
			#ffff00 12.5%,
			#0bed00 25%,
			#00ff40 37.5%,
			#00ffff 50%,
			#0040ff 62.5%,
			#8000ff 75%,
			#ff00ff 87.5%,
			#ff0000
		);
		outline: none;
	}
</style>
