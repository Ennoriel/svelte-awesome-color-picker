<script lang="ts">
	import { defaultA11yTexts, type A11yTextsPartial } from '$lib/utils/texts';
	import type { A11yColor } from '$lib/type/types';
	import type { Components } from '$lib/type/types';
	import { extend } from 'colord';
	import a11yPlugin from 'colord/plugins/a11y';
	import { getNumberOfGradeFailed } from './grades';
	import { getContrast } from '$lib/utils/colors';

	/** customize the ColorPicker component parts. Can be used to display a Chrome variant or an Accessibility Notice */
	export let components: Components;

	/** hex color */
	export let hex: string;

	/** define the accessibility examples in the color picker */
	export let a11yColors: Array<A11yColor>;

	/** required WCAG contrast level */
	export let a11yLevel: 'AA' | 'AAA';

	/** all a11y translation tokens used in the library; override with translations if necessary; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/texts.ts) */
	export let a11yTexts: A11yTextsPartial | undefined = undefined;

	extend([a11yPlugin]);

	function getTexts() {
		return {
			...defaultA11yTexts,
			...a11yTexts
		};
	}

	$: _a11yColors = a11yColors
		.map((a11yColor) => getContrast(a11yColor, hex))
		.filter(Boolean)
		.map((x) => x!);

	$: count = _a11yColors.map((color) => getNumberOfGradeFailed(color, a11yLevel)).reduce((acc, c) => acc + c);
</script>

<div class="a11y-notice" style:--item-count={_a11yColors.length}>
	<span class="title">
		{getTexts().nbGradeSummary(count)}
	</span>
	{#each _a11yColors as { trueColors, contrast, placeholder, size }}
		<svelte:component
			this={components.a11ySingleNotice}
			{...trueColors}
			{contrast}
			{placeholder}
			{size}
			{a11yLevel}
			contrastText={getTexts().contrast}
		/>
	{/each}
	{#if getTexts().guidelines}
		<span class="guidelines">
			{@html getTexts().guidelines}
		</span>
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
@prop a11yColors: Array&lt;A11yColor&gt; — define the accessibility examples in the color picker
@prop a11yLevel: 'AA' | 'AAA' — required WCAG contrast level
@prop a11yTexts: A11yTextsPartial | undefined = undefined — all a11y translation tokens used in the library; override with translations if necessary; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/texts.ts)
-->
<style>
	.a11y-notice {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: auto repeat(var(--item-count), 1fr) auto;
		justify-items: stretch;
		align-items: center;
		gap: 0 12px;
		width: max-content;
	}
	.title {
		margin: 12px 0 0;
		grid-column: 1 / 3;
		background: none;
		border: none;
		padding: 0 8px;
		line-height: 24px;
	}

	@media (min-width: 768px) {
		.title {
			margin: 0;
		}
	}

	.guidelines {
		grid-column: 1 / 3;
		margin-top: 10px;
		font-size: 12px;
	}

	:focus-visible,
	.guidelines :global(:focus-visible) {
		border-radius: 2px;
		outline: 2px solid var(--focus-color, red);
		outline-offset: 2px;
	}
</style>
