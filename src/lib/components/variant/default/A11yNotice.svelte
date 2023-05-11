<script lang="ts">
	import type { A11yColor } from '$lib/type/types';
	import type { Components } from '$lib/type/types';
	import type { Colord } from 'colord';

	export let components: Components;
	export let a11yColors: Array<A11yColor>;
	export let hex: string;
	export let color: Colord | undefined;
	export let a11yGuidelines: string;
	export let isA11yOpen: boolean;
	export let isA11yClosable: boolean;

	$: closable = isA11yOpen && !isA11yClosable;
	$: _a11yColors = a11yColors.map((a11yColor) => ({
		...a11yColor,
		contrast: color?.contrast(a11yColor.hex)
	}));
</script>

<details class="a11y-notice {closable ? 'not-closable' : ''}" open={isA11yOpen}>
	<summary tabindex={closable ? -1 : undefined}>
		<svelte:component this={components.a11ySummary} a11yColors={_a11yColors} {hex} />
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
