<script lang="ts">
	import { defaultA11yTexts, type A11yTextsPartial } from '$lib/texts';
	import type { A11yColor } from '$lib/type/types';
	import type { Components } from '$lib/type/types';
	import { extend, type Colord } from 'colord';
	import a11yPlugin from 'colord/plugins/a11y';
	import { getNumberOfGradeFailed } from './grades';

	/** customize the ColorPicker component parts. Can be used to display a Chrome variant or an Accessibility Notice */
	export let components: Components;

	/** hex color */
	export let hex: string;

	/** Colord color */
	export let color: Colord | undefined;

	/** define the accessibility examples in the color picker */
	export let a11yColors: Array<A11yColor>;

	/** required WCAG contrast level */
	export let a11yLevel: 'AA' | 'AAA';

	/** if set to false, the accessibility panel will always be shown */
	export let isA11yClosable: boolean;

	/** all a11y translation tokens used in the library; override with translations if necessary; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/texts.ts) */
	export let a11yTexts: A11yTextsPartial | undefined = undefined;

	let open = true;

	extend([a11yPlugin]);

	function getTexts() {
		return {
			...defaultA11yTexts,
			...a11yTexts
		};
	}

	$: _a11yColors = a11yColors.map((a11yColor) => ({
		...a11yColor,
		contrast: color?.contrast(a11yColor.hex)
	}));

	$: count = _a11yColors.map((color) => getNumberOfGradeFailed(color, a11yLevel)).reduce((acc, c) => acc + c);
</script>

<!-- https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/ -->
<div class="a11y-notice">
	<button on:click={() => (open = !open)} disabled={!isA11yClosable} aria-expanded={open ? 'true' : 'false'}>
		{#if isA11yClosable}
			{open ? '⯆' : '⯈'}&nbsp;
		{/if}
		{getTexts().nbGradeSummary(count)}
	</button>
	{#if open}
		{#each _a11yColors as { contrast, hex: a11yHex, placeholder, reverse, size }}
			<svelte:component
				this={components.a11ySingleNotice}
				{contrast}
				{a11yLevel}
				textColor={reverse ? a11yHex : hex}
				bgColor={reverse ? hex : a11yHex}
				{placeholder}
				{size}
				contrastText={getTexts().contrast}
			/>
		{/each}
		{#if getTexts().guidelines}
			<span>
				{@html getTexts().guidelines}
			</span>
		{/if}
	{/if}
</div>

<!-- 
@component Accessibility notice — this component is meant to be used with the A11yVariant object as a variant to display the accessibility notice.

**Import**
```js
import { A11yVariant } from 'svelte-awesome-color-picker';
```

**Use**
```svelte
<ColorPicker bind:hex components={A11yVariant} />
```

**Props**
@prop components: Components — customize the ColorPicker component parts. Can be used to display a Chrome variant or an Accessibility Notice
@prop hex: string — hex color
@prop color: Colord | undefined — Colord color
@prop a11yColors: Array&lt;A11yColor&gt; — define the accessibility examples in the color picker
@prop a11yLevel: 'AA' | 'AAA' — required WCAG contrast level
@prop isA11yClosable: boolean — if set to false, the accessibility panel will always be shown
@prop a11yTexts: A11yTextsPartial | undefined = undefined — all a11y translation tokens used in the library; override with translations if necessary; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/texts.ts)
-->
<style>
	div {
		width: 245px;
	}

	button {
		background: none;
		border: none;
		padding: 0 8px;
		margin: 0;
		line-height: 32px;
	}
	button:disabled {
		color: inherit;
		cursor: default;
	}

	:focus-visible,
	span :global(:focus-visible) {
		border-radius: 2px;
		outline: 2px solid var(--focus-color, red);
		outline-offset: 2px;
	}
</style>
