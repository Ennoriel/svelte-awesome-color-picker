<script lang="ts">
	import A11yNoticeContent from './A11yNoticeContent.svelte';

	import type { A11yColor } from '$lib/type/types';
	import type { A11yComponents } from '$lib/type/types';
	import type { Colord } from 'colord';
	import A11ySingleNotice from './A11ySingleNotice.svelte';
	import A11ySummary from './A11ySummary.svelte';

	import { extend } from 'colord';
	import a11yPlugin from 'colord/plugins/a11y';

	extend([a11yPlugin]);

	export let components: Partial<A11yComponents> = {};
	export let a11yColors: Array<A11yColor> = [{ hex: '#ffffff' }];
	export let hex: string;
	export let color: Colord | undefined;
	export let a11yGuidelines =
		'<p style="margin: 0; font-size: 12px;">Learn more at <a href="https://webaim.org/articles/contrast/" target="_blank">WebAIM contrast guide</a></p>';
	export let isA11yOpen = true;
	export let isA11yClosable = true;

	const default_components: A11yComponents = {
		a11ySingleNotice: A11ySingleNotice,
		a11ySummary: A11ySummary
	};

	function getComponents() {
		return {
			...default_components,
			...components
		};
	}

	$: closable = isA11yClosable || !isA11yOpen;
	$: _a11yColors = a11yColors.map((a11yColor) => ({
		...a11yColor,
		contrast: color?.contrast(a11yColor.hex)
	}));
</script>

{#if closable}
	<details class="a11y-notice" open={isA11yOpen}>
		<summary>
			<svelte:component this={getComponents().a11ySummary} a11yColors={_a11yColors} {hex} />
		</summary>
		<A11yNoticeContent
			components={getComponents()}
			a11yColors={_a11yColors}
			{hex}
			{a11yGuidelines}
		/>
	</details>
{:else}
	<div class="a11y-notice">
		<p>
			<svelte:component this={getComponents().a11ySummary} a11yColors={_a11yColors} {hex} />
		</p>
		<A11yNoticeContent
			components={getComponents()}
			a11yColors={_a11yColors}
			{hex}
			{a11yGuidelines}
		/>
	</div>
{/if}

<style>
	.a11y-notice {
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

	p {
		margin: 4px 0 8px;
	}

	:focus-visible {
		border-radius: 2px;
		outline: 2px solid var(--focus-color, red);
		outline-offset: 2px;
	}
</style>
