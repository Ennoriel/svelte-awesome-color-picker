<script lang="ts">
	export let labelWrapper: HTMLLabelElement;
	export let hex: string;
	export let label: string;
	/* svelte-ignore unused-export-let */
	export let isOpen: boolean;
</script>

<label bind:this={labelWrapper}>
	<div class="container">
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
		<div class="alpha" />
		<div class="color" style="background: {hex}" />
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

	.container {
		position: relative;
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
		visibility: hidden;
	}

	.alpha {
		clip-path: circle(50%);
		background-image: linear-gradient(
				to right,
				rgba(238, 238, 238, 0.75),
				rgba(238, 238, 238, 0.75)
			),
			linear-gradient(to right, black 50%, white 50%),
			linear-gradient(to bottom, black 50%, white 50%);
		background-blend-mode: normal, difference, normal;
		background-size: 15px 15px;
	}

	.alpha,
	.color {
		position: absolute;
		width: 30px;
		height: 30px;
		border-radius: 15px;
		user-select: none;
	}

	:global(.has-been-tabbed) label:focus-within {
		outline: 2px solid var(--focus-color, red);
		outline-offset: 2px;
	}
</style>
