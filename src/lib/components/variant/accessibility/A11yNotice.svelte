<script lang="ts">
	import type { A11yColor } from '$lib/type/types';
	import type { Components } from '$lib/type/types';
	import { extend, type Colord } from 'colord';
	import a11yPlugin from 'colord/plugins/a11y';

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

	/** define the accessibility guidelines (HTML) */
	export let a11yGuidelines: string;

	/** if set to false, the accessibility panel will always be shown */
	export let isA11yClosable: boolean;

	let open = true;

	extend([a11yPlugin]);

	$: _a11yColors = a11yColors.map((a11yColor) => ({
		...a11yColor,
		contrast: color?.contrast(a11yColor.hex)
	}));
</script>

<!-- https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/ -->
<div class="a11y-notice">
	<button on:click={() => (open = !open)} disabled={!isA11yClosable} aria-expanded={open ? 'true' : 'false'}>
		{#if isA11yClosable}
			{open ? '⯆' : '⯈'}&nbsp;
		{/if}
		<svelte:component this={components.a11ySummary} a11yColors={_a11yColors} {a11yLevel} />
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
			/>
		{/each}
		{#if a11yGuidelines}
			<span>
				{@html a11yGuidelines}
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
@prop a11yGuidelines: string — define the accessibility guidelines (HTML)
@prop isA11yClosable: boolean — if set to false, the accessibility panel will always be shown
-->
<style>
	div {
		width: 245px;
	}

	button {
		background: none;
		padding: 2px 8px;
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
