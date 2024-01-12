<script lang="ts">
	import type { Texts } from '$lib/utils/texts';
	import type { RgbaColor, HsvaColor } from 'colord';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		input: { hsv?: HsvaColor; rgb?: RgbaColor; hex?: string };
	}>();

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

	/** all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/texts.ts) */
	export let texts: Texts;

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
			dispatch('input', { hex });
		}
	}

	function updateRgb(property: string) {
		return function (e: InputEvent) {
			rgb = { ...rgb, [property]: parseFloat((e.target as HTMLInputElement).value) };
			dispatch('input', { rgb });
		};
	}

	function updateHsv(property: string) {
		return function (e: InputEvent) {
			hsv = { ...hsv, [property]: parseFloat((e.target as HTMLInputElement).value) };
			dispatch('input', { hsv });
		};
	}
</script>

<div class="text-input">
	<div class="input-container">
		{#if mode === 0}
			<input aria-label={texts.label.hex} value={hex} on:input={updateHex} style:flex={3} />
		{:else if mode === 1}
			<input aria-label={texts.label.r} value={rgb.r} type="number" min="0" max="255" on:input={updateRgb('r')} />
			<input aria-label={texts.label.g} value={rgb.g} type="number" min="0" max="255" on:input={updateRgb('g')} />
			<input aria-label={texts.label.b} value={rgb.b} type="number" min="0" max="255" on:input={updateRgb('b')} />
		{:else}
			<input aria-label={texts.label.h} value={h} type="number" min="0" max="360" on:input={updateHsv('h')} />
			<input aria-label={texts.label.s} value={s} type="number" min="0" max="100" on:input={updateHsv('s')} />
			<input aria-label={texts.label.v} value={v} type="number" min="0" max="100" on:input={updateHsv('v')} />
		{/if}
		{#if isAlpha}
			<input
				aria-label={texts.label.a}
				value={a}
				type="number"
				min="0"
				max="1"
				step="0.01"
				on:input={mode <= 1 ? updateRgb('a') : updateHsv('a')}
			/>
		{/if}
	</div>

	{#if textInputModes.length > 1}
		<button on:click={() => (mode = (mode + 1) % 3)}>
			<span class="disappear" aria-hidden="true">{texts.color[textInputModes[mode]]}</span>
			<span class="appear">{texts.changeTo} {texts.color[textInputModes[(mode + 1) % 3]]}</span>
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
@prop texts: Texts — all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/texts.ts)
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
		background-color: var(--cp-input-color, #eee);
		color: var(--cp-border-color);
		padding: 0;
		border-radius: 5px;
		height: 30px;
		line-height: 30px;
		text-align: center;
	}
	input {
		width: 5px;
		font-family: inherit;
	}

	button {
		position: relative;
		flex: 1;
		margin: 8px 0 0;
		height: 30px;
		width: 100%;
		transition: background-color 0.2s;
		cursor: pointer;
		font-family: inherit;
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
		background-color: var(--cp-button-hover-color, #ccc);
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
