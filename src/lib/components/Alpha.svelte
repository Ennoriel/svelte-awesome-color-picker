<script lang="ts">
	import { keyPressed, keyPressedCustom } from '../util/store';
	import { easeInOutSin } from '../util/transition';
	import type { Components } from '$lib/type/types';

	export let components: Components;
	/* svelte-ignore unused-export-let */
	export let isOpen: boolean;

	export let a = 1;
	export let hex: string | undefined;
	export let toRight: boolean;

	let alpha: HTMLDivElement;
	let isMouseDown = false;

	let focused = false;

	let focusMovementIntervalId: number | undefined;
	let focusMovementCounter: number;
	let pos: number;

	function onClick(pos: number): void {
		const size = toRight
			? alpha.getBoundingClientRect().width
			: alpha.getBoundingClientRect().height;
		const boundedPos = Math.max(0, Math.min(size, pos));
		a = boundedPos / size;
	}

	function mouseDown(e: MouseEvent) {
		if (e.button === 0) {
			isMouseDown = true;
			onClick(toRight ? e.offsetX : e.offsetY);
		}
	}

	function mouseUp() {
		isMouseDown = false;
	}

	function mouseMove(e: MouseEvent) {
		if (isMouseDown)
			onClick(
				toRight
					? e.clientX - alpha.getBoundingClientRect().left
					: e.clientY - alpha.getBoundingClientRect().top
			);
	}

	function keyup(e: KeyboardEvent) {
		if (e.key === 'Tab') focused = !!document.activeElement?.isSameNode(alpha);
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
					const focusMovementFactor = easeInOutSin(++focusMovementCounter);
					const movement = toRight
						? $keyPressed.ArrowRight - $keyPressed.ArrowLeft
						: $keyPressed.ArrowDown - $keyPressed.ArrowUp;
					a = Math.min(1, Math.max(0, a + movement * focusMovementFactor));
				}, 10) as number;
			}
		} else if (focusMovementIntervalId) {
			clearInterval(focusMovementIntervalId);
			focusMovementIntervalId = undefined;
		}
	}

	function touch(e: TouchEvent) {
		e.preventDefault();
		onClick(
			toRight
				? e.changedTouches[0].clientX - alpha.getBoundingClientRect().left
				: e.changedTouches[0].clientY - alpha.getBoundingClientRect().top
		);
	}

	$: if (typeof a === 'number' && alpha) pos = 100 * a;
</script>

<svelte:window
	on:mouseup={mouseUp}
	on:mousemove={mouseMove}
	on:keyup={keyup}
	on:keydown={keydown}
/>

<svelte:component this={components.alphaWrapper} {focused} {toRight}>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div
		class="alpha"
		tabindex="0"
		class:to-right={toRight}
		style="--alpha-color: {hex?.substring(0, 7)}"
		bind:this={alpha}
		on:mousedown|preventDefault={mouseDown}
		on:touchstart={touch}
		on:touchmove|preventDefault={touch}
		on:touchend={touch}
		aria-label="transparency picker (arrow keyboard navigation)"
		aria-valuemin={0}
		aria-valuemax={100}
		aria-valuenow={Math.round(pos)}
		aria-valuetext="{pos?.toFixed()}%"
	>
		<svelte:component this={components.alphaIndicator} {pos} {toRight} />
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
	.to-right:after {
		background: linear-gradient(0.25turn, #00000000, var(--alpha-color));
	}
	.alpha {
		position: relative;
		width: 100%;
		height: 100%;
		background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%),
			linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%);
		background-size: var(--pattern-size-2x, 12px) var(--pattern-size-2x, 12px);
		background-position: 0 0, var(--pattern-size, 6px) var(--pattern-size, 6px);
		outline: none;
		user-select: none;
	}
</style>
