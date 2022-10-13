<script lang="ts">
	import type { A11yColor } from '$lib/type/types';
	import type { Components } from '$lib/type/types';

	export let components: Components;
	export let a11yColors: Array<A11yColor>;
	export let hex: string;
	export let a11yGuidelines: string;
</script>

<details>
	<summary>
		<svelte:component this={components.a11ySummary} {a11yColors} {hex} />
	</summary>
	<div>
		{#each a11yColors as color}
			<svelte:component
				this={components.a11ySingleNotice}
				contrast={color.contrast}
				textColor={color.reverse ? color.hex : hex}
				bgColor={color.reverse ? hex : color.hex}
				ph={color.placeholder}
				size={color.size}
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
		width: 230px;
		margin: 12px auto 8px;
	}

	summary {
		margin-bottom: 8px;
		cursor: pointer;
		transition: color 0.2s;
	}

	summary:hover {
		color: blue;
	}

	:focus-visible,
	span :global(:focus-visible) {
		border-radius: 2px;
		outline: 2px solid var(--focus-color, red);
		outline-offset: 2px;
	}
</style>
