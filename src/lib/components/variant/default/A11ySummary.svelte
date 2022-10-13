<script lang="ts">
	import type { A11yColor } from '$lib/type/types';

	export let a11yColors: Array<A11yColor>;
	/* svelte-ignore unused-export-let */
	export let hex: string;

	$: count = (
		a11yColors
			.map((c) => c.contrast || 1)
			.map((c) => (c < 4.5 ? 2 : c < 7 ? 1 : 0)) as Array<number>
	).reduce((acc, c) => acc + c);

	$: message = count
		? `⚠️ ${count} contrast grade${count && 's'} failed`
		: 'see details about the contrast';
</script>

{message}
