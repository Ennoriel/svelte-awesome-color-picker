<script lang="ts">
	import { colord } from 'colord';
	import { keyPressed, keyPressedCustom } from '../util/store';
	import { easeInOutSin } from '../util/transition';
	import type { A11yColor, Components } from '$lib/type/types';
	import { getContrastPoints } from '$lib/util/contrast';
	import { drawCurve } from '$lib/util/svg';

	export let components: Components;

	export let h: number;
	export let s: number;
	export let v: number;

	/* svelte-ignore unused-export-let */
	export let isOpen: boolean;
	export let toRight: boolean;
	export let isDark: boolean;

	export let a11yColors: Array<A11yColor>;

	let picker: HTMLDivElement;
	let isMouseDown = false;
	let focused = false;

	let focusMovementIntervalId: number | undefined;
	let focusMovementCounter: number;

	let colorBg: string;
	let pos = { x: 100, y: 0 };

	let path30 = '';
	let path45 = '';
	let path70 = '';

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

	$: if (typeof s === 'number' && typeof v === 'number' && picker) {
		pos = {
			x: s,
			y: 100 - v
		};
	}

	$: {
		path30 = getContrastPoints(a11yColors?.[0].hex, h, 3).map((points) => drawCurve(points));
		path45 = getContrastPoints(a11yColors?.[0].hex, h, 4.5).map((points) => drawCurve(points));
		path70 = getContrastPoints(a11yColors?.[0].hex, h, 7).map((points) => drawCurve(points));
	}
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
		on:mousedown|preventDefault|stopPropagation={pickerMouseDown}
		on:touchstart={touch}
		on:touchmove|preventDefault|stopPropagation={touch}
		on:touchend={touch}
		style="--color-bg: {colorBg};"
		aria-label="saturation and brightness picker (arrow keyboard navigation)"
		aria-valuemin={0}
		aria-valuemax={100}
		aria-valuetext="saturation {pos.x?.toFixed()}%, brightness {pos.y?.toFixed()}%"
	>
		<svelte:component
			this={components.pickerIndicator}
			{pos}
			{isDark}
			hex={colord({ h, s, v, a: 1 }).toHex()}
		/>
		<svg id="svg" viewBox="0 0 100 100" width="260px" height="200px" preserveAspectRatio="none">
			<defs>
				<pattern
					id="lines"
					width="2"
					height="2"
					patternUnits="userSpaceOnUse"
					patternTransform="rotate(35)"
				>
					<circle cx="1" cy="1" r=".5" style="stroke: none; fill: #0000ff" />
				</pattern>
			</defs>
			{#each path30 as path}
				<path d={path} fill="none" stroke="white" stroke-width=".5" />
			{/each}
			{#each path45 as path}
				<path d={path} fill="none" stroke="white" stroke-width=".5" />
			{/each}
			{#each path70 as path}
				<path d={path} fill="none" stroke="white" stroke-width=".5" />
			{/each}
			<!-- <path d={path45} fill="none" stroke="white" stroke-width=".5" />
			<path d={path70} fill="none" stroke="white" stroke-width=".5" /> -->
		</svg>
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
	svg {
		position: absolute;
		inset: 0;
		user-select: none;
	}
</style>
