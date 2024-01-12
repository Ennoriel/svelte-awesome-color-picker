<script lang="ts">
	/** DOM element of the label wrapper */
	export let labelElement: HTMLLabelElement;

	/** hex color */
	export let hex: string | undefined;

	/** input label */
	export let label: string;

	/** input name, useful in a native form */
	export let name: string | undefined = undefined;

	/* svelte-ignore unused-export-let /** indicator of the popup state */
	export let isOpen: boolean;

	function noop() {
		/* prevent browser color picker from opening unless javascript is broken */
	}
</script>

<label bind:this={labelElement}>
	<div class="container">
		<input type="color" {name} value={hex} on:click|preventDefault={noop} aria-haspopup="dialog" />
		<div class="alpha" />
		<div class="color" style:background={hex} />
	</div>
	{label}
</label>

<!-- 
@component button to open the color picker. Also provides a hidden input with the hex value selected by the user
to fallback to color picker to the default browser one if a problem happens. This component cannot be imported
directly but can be overridden.

**Import**
_N.A._

**Use**
_N.A._

**Props**
@prop labelElement: HTMLLabelElement — DOM element of the label wrapper
@prop hex: string | undefined — hex color
@prop label: string — input label
@prop name: string | undefined = undefined — input name, useful in a native form
@prop isOpen: boolean — indicator of the popup state
-->
<style>
	label {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		cursor: pointer;
		border-radius: 3px;
		margin: 4px;
		height: var(--input-size, 25px);
		user-select: none;
	}

	.container {
		position: relative;
		display: block;
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--input-size, 25px);
	}

	input {
		margin: 0;
		padding: 0;
		border: none;
		width: 1px;
		height: 1px;
		flex-shrink: 0;
		opacity: 0;
	}

	.alpha {
		clip-path: circle(50%);
		background: var(--alpha-grid-bg);
	}

	.alpha,
	.color {
		position: absolute;
		width: var(--input-size, 25px);
		height: var(--input-size, 25px);
		border-radius: 50%;
		user-select: none;
	}

	input:focus-visible ~ .color {
		outline: 2px solid var(--focus-color, red);
		outline-offset: 2px;
	}
</style>
