<script lang="ts">
	export let labelWrapper: HTMLLabelElement;
	export let hex: string;
	export let label: string;
	/* svelte-ignore unused-export-let */
	export let isOpen: boolean;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<label
	bind:this={labelWrapper} 
	on:click|preventDefault={() => { /* prevent default behavior on safari */ }} 
	on:mousedown|preventDefault={() => { /* prevent default behavior on safari */ }}
>
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
		display: flex;
		align-items: center;
		justify-content: center;
	}

	input {
		margin: 0;
		padding: 0;
		border: none;
		width: 4px;
		height: 4px;
		flex-shrink: 0;
		cursor: pointer;
		border-radius: 50%;
		margin: 0 12px;
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
		background-size: 12px 12px;
	}

	.alpha,
	.color {
		position: absolute;
		width: 30px;
		height: 30px;
		border-radius: 15px;
		user-select: none;
	}

	input:focus {
		outline: 2px solid var(--focus-color, red);
		outline-offset: 15px;
	}
</style>
