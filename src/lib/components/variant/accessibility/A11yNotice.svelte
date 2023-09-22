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

	/** define the accessibility guidelines (HTML) */
	export let a11yGuidelines: string;

	/** if set to true, the accessibility panel will be shown by default */
	export let isA11yOpen: boolean;

	/** if set to false, the accessibility panel will always be shown */
	export let isA11yClosable: boolean;

	extend([a11yPlugin]);

	$: closable = isA11yOpen && !isA11yClosable;
	$: _a11yColors = a11yColors.map((a11yColor) => ({
		...a11yColor,
		contrast: color?.contrast(a11yColor.hex)
	}));
</script>

<details class="a11y-notice {closable ? 'not-closable' : ''}" open={isA11yOpen}>
	<summary tabindex={closable ? -1 : undefined}>
		<svelte:component this={components.a11ySummary} a11yColors={_a11yColors} />
	</summary>
	<div>
		{#each _a11yColors as { contrast, hex: a11yHex, placeholder, reverse, size }}
			<svelte:component
				this={components.a11ySingleNotice}
				{contrast}
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
	</div>
</details>

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
@prop a11yGuidelines: string — define the accessibility guidelines (HTML)
@prop isA11yOpen: boolean — if set to true, the accessibility panel will be shown by default
@prop isA11yClosable: boolean — if set to false, the accessibility panel will always be shown
-->
<style>
	details {
		width: 245px;
		margin: 8px auto;
	}

	summary {
		margin-bottom: 8px;
		cursor: pointer;
		transition: color 0.2s;
	}

	summary:hover {
		color: blue;
	}

	.not-closable summary {
		pointer-events: none;
	}

	.not-closable summary {
		list-style: none;
	}

	:focus-visible,
	span :global(:focus-visible) {
		border-radius: 2px;
		outline: 2px solid var(--focus-color, red);
		outline-offset: 2px;
	}
</style>
