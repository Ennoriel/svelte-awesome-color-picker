<script lang="ts">
	import type { A11yColor } from '$lib/type/types';
	import type { A11yComponents } from '$lib/type/types';

	export let components: A11yComponents;
	export let a11yColors: Array<A11yColor & { contrast: number | undefined }>;
	export let hex: string;
	export let a11yGuidelines: string;
</script>

<div>
	{#each a11yColors as { contrast, hex: a11yHex, placeholder, reverse, size }}
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

<style>
	:focus-visible,
	span :global(:focus-visible) {
		border-radius: 2px;
		outline: 2px solid var(--focus-color, red);
		outline-offset: 2px;
	}
</style>
