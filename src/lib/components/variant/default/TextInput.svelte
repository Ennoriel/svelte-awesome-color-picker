<script lang="ts">
	import type { RgbaColor, HsvaColor } from 'colord';

	/** if set to false, disables the alpha channel */
	export let isAlpha: boolean;

	/** rgb color */
	export let rgb: RgbaColor;

	/** hsv color */
	export let hsv: HsvaColor;

	/** hex color */
	export let hex: string;

	/** configure which hex, rgb and hsv inputs will be visible and in which order. If overridden, it is necessary to provide at least one value */
	export let textInputModes: Array<'hex' | 'rgb' | 'hsv'>;

	const HEX_COLOR_REGEX = /^#?([A-F0-9]{6}|[A-F0-9]{8})$/i;

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
			<input aria-label="red color" value={rgb.r} type="number" min="0" max="255" on:input={updateRgb('r')} />
			<input aria-label="green color" value={rgb.g} type="number" min="0" max="255" on:input={updateRgb('g')} />
			<input aria-label="blue color" value={rgb.b} type="number" min="0" max="255" on:input={updateRgb('b')} />
			{#if isAlpha}
				<input
					aria-label="transparency color"
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
			<input aria-label="hue color" value={h} type="number" min="0" max="360" on:input={updateHsv('h')} />
			<input aria-label="saturation color" value={s} type="number" min="0" max="100" on:input={updateHsv('s')} />
			<input aria-label="brightness color" value={v} type="number" min="0" max="100" on:input={updateHsv('v')} />
			{#if isAlpha}
				<input
					aria-label="transparency color"
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

	{#if textInputModes.length > 1}
		<button aria-label="change inputs to {textInputModes[(mode + 1) % 3]}" on:click={() => (mode = (mode + 1) % 3)}>
			<span class="disappear" aria-hidden="true">{textInputModes[mode]}</span>
			<span class="appear">change to {textInputModes[(mode + 1) % 3]}</span>
		</button>
	{/if}
</div>

<!-- 
@component text inputs for the hex, rgb and hsv colors. This component cannot be imported
directly but can be overridden.

**Import**
_N.A._

**Use**
_N.A._

**Props**
@prop isAlpha: boolean — if set to false, disables the alpha channel
@prop rgb: RgbaColor — rgb color
@prop hsv: HsvaColor — hsv color
@prop hex: string — hex color
@prop textInputModes: Array&lt;'hex' | 'rgb' | 'hsv'&gt; — configure which hex, rgb and hsv inputs will be visible and in which order. If overridden, it is necessary to provide at least one value
-->
<style>
	.text-input {
		margin: var(--text-input-margin, 5px 0 0);
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
		position: relative;
		flex: 1;
		margin: 8px 0 0;
		height: 30px;
		width: 100%;
		transition: background-color 0.2s;
		cursor: pointer;
	}

	.appear,
	.disappear {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		transition: all 0.5s;
	}
	button:hover .disappear,
	.appear {
		opacity: 0;
	}

	.disappear,
	button:hover .appear {
		opacity: 1;
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
