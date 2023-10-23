<script lang="ts">
	export let align: 'left' | undefined = undefined;
</script>

{#if align === 'left'}
	<th scope="row">
		<slot />
	</th>
{:else}
	<td>
		<slot />
	</td>
{/if}
