<script lang="ts">
	import type { RgbaColor, HsvaColor } from 'colord';

	export let isAlpha: boolean;
	export let rgb: RgbaColor;
	export let hsv: HsvaColor;
	export let hex: string;
	export let canChangeMode: boolean;

	const HEX_COLOR_REGEX = /^#?([A-F0-9]{6}|[A-F0-9]{8})$/i;

	const modes = ['HEX', 'RGB', 'HSV'];
	let mode = 0;

	$: h = Math.round(hsv.h);
	$: s = Math.round(hsv.s);
	$: v = Math.round(hsv.v);
	$: a = hsv.a === undefined ? 1 : Math.round(hsv.a * 100) / 100;

	type InputEvent = Event & { currentTarget: EventTarget & HTMLInputElement };

	function updateHex(e: InputEvent) {
		const target = e.target as HTMLInputElement;
		if (HEX_COLOR_REGEX.test(target.value)) {
			hex = target.value;
		}
	}

	function updateRgb(property: string) {
		return function (e: InputEvent) {
			rgb = { ...rgb, [property]: parseFloat((e.target as HTMLInputElement).value) };
		};
	}

	function updateHsv(property: string) {
		return function (e: InputEvent) {
			hsv = { ...hsv, [property]: parseFloat((e.target as HTMLInputElement).value) };
		};
	}
</script>

<div class="text-input">
	{#if mode === 0}
		<div class="input-container">
			<input value={hex} on:input={updateHex} style="flex: 3" />
			{#if isAlpha}
				<input
					aria-label="hexadecimal color"
					value={a}
					type="number"
					min="0"
					max="1"
					step="0.01"
					on:input={updateRgb('a')}
				/>
			{/if}
		</div>
	{:else if mode === 1}
		<div class="input-container">
			<input
				aria-label="red chanel color"
				value={rgb.r}
				type="number"
				min="0"
				max="255"
				on:input={updateRgb('r')}
			/>
			<input
				aria-label="green chanel color"
				value={rgb.g}
				type="number"
				min="0"
				max="255"
				on:input={updateRgb('g')}
			/>
			<input
				aria-label="blue chanel color"
				value={rgb.b}
				type="number"
				min="0"
				max="255"
				on:input={updateRgb('b')}
			/>
			{#if isAlpha}
				<input
					aria-label="transparency chanel color"
					value={a}
					type="number"
					min="0"
					max="1"
					step="0.01"
					on:input={updateRgb('a')}
				/>
			{/if}
		</div>
	{:else}
		<div class="input-container">
			<input
				aria-label="hue chanel color"
				value={h}
				type="number"
				min="0"
				max="360"
				on:input={updateHsv('h')}
			/>
			<input
				aria-label="saturation chanel color"
				value={s}
				type="number"
				min="0"
				max="100"
				on:input={updateHsv('s')}
			/>
			<input
				aria-label="brightness chanel color"
				value={v}
				type="number"
				min="0"
				max="100"
				on:input={updateHsv('v')}
			/>
			{#if isAlpha}
				<input
					aria-label="transparency chanel color"
					value={a}
					type="number"
					min="0"
					max="1"
					step="0.01"
					on:input={updateHsv('a')}
				/>
			{/if}
		</div>
	{/if}

	{#if canChangeMode}
		<button
			aria-label="change inputs to {modes[(mode + 1) % 3]}"
			on:click={() => (mode = (mode + 1) % 3)}>{modes[mode]}</button
		>
	{/if}
</div>

<style>
	.text-input {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin: 10px 5px 5px;
	}
	.input-container {
		display: flex;
		flex: 1;
		gap: 10px;
	}
	input,
	button {
		flex: 1;
		border: none;
		background-color: #eee;
		padding: 0;
		border-radius: 5px;
		height: 30px;
		line-height: 30px;
		text-align: center;
	}
	input {
		width: 5px;
	}

	button {
		cursor: pointer;
		flex: 1;
		margin: 0;
		transition: background-color 0.2s;
	}

	button:hover {
		background-color: #ccc;
	}

	input:focus,
	button:focus {
		outline: none;
	}

	input:focus-visible,
	button:focus-visible {
		outline: 2px solid var(--focus-color, red);
		outline-offset: 2px;
	}
</style>
