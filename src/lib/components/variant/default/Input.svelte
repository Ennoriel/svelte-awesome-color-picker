<script lang="ts">
	export let labelWrapper: HTMLLabelElement;
	export let hex: string;
	export let label: string;
	/* svelte-ignore unused-export-let */
	export let isOpen: boolean;
</script>

<label bind:this={labelWrapper}>
	<div>
		<input
			type="color"
			value={hex}
			on:click|preventDefault={() => {
				/* prevent default behavior on most browsers */
			}}
			on:mousedown|preventDefault={() => {
				/* prevent default behavior on safari */
			}}
			aria-haspopup="dialog"
		/>
	</div>
	{label}
</label>

<style>
	label {
		display: flex;
		align-items: center;
		gap: 8px;
		cursor: pointer;
		border-radius: 3px;
		margin: 4px;
	}

	div {
		display: block;
		width: 30px;
		height: 30px;
		overflow: hidden;
		border-radius: 15px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	input {
		margin: 0;
		padding: 0;
		border: none;
		width: 32px;
		height: 32px;
		flex-shrink: 0;
		cursor: pointer;
	}

	:global(.has-been-tabbed) label:focus-within {
		outline: 2px solid var(--focus-color, red);
		outline-offset: 2px;
	}
</style>
