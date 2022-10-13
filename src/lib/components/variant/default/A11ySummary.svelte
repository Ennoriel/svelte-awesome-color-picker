<script lang="ts">
	import type { A11yColor } from '$lib/type/types';

	export let a11yColors: Array<A11yColor>;
	/* svelte-ignore unused-export-let */
	export let hex: string;

	function getNumberOfGradeFailed({ contrast, size }: A11yColor): number {
		if (!contrast) {
			return 2;
		}
		if (size === 'large') {
			return contrast < 3 ? 2 : contrast < 4.5 ? 1 : 0;
		} else {
			return contrast < 4.5 ? 2 : contrast < 7 ? 1 : 0;
		}
	}

	$: count = a11yColors.map(getNumberOfGradeFailed).reduce((acc, c) => acc + c);

	$: message = count
		? `⚠️ ${count} contrast grade${count && 's'} fail`
		: 'see details about the contrast';
</script>

{message}
