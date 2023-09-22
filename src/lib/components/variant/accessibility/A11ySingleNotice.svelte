<script lang="ts">
	import { isGradeAchieved } from './grades';

	/** placeholder, falls back to `Lorem Ipsum` */
	export let placeholder: string | undefined = undefined;

	/** size of the text */
	export let size: 'normal' | 'large' | undefined = undefined;

	/** placeholder text color */
	export let textColor: string;

	/** placeholder background color */
	export let bgColor: string;

	/** RGAA contrast between the text and its background. Between 1 and 21 */
	export let contrast: number = 1;
</script>

<div class="a11y-single-notice">
	<p class="lorem {size === 'large' && 'large'}" style="color: {textColor}; background-color: {bgColor}">
		{placeholder || 'Lorem Ipsum'}
	</p>
	<div class="score">
		<p>contrast: {contrast >= 10 ? contrast.toFixed(1) : contrast}</p>
		<span class="grade" class:grade-ok={isGradeAchieved(contrast, size, 'AA')}>AA</span>
		<span class="grade" class:grade-ok={isGradeAchieved(contrast, size, 'AAA')}>AAA</span>
	</div>
</div>

<!-- 
@component accessibility notice for a single color — this component is meant to be used with the A11yVariant object as a variant to display the accessibility notice.

**Import**
```js
import { A11yVariant } from 'svelte-awesome-color-picker';
```

**Use**
```svelte
<ColorPicker bind:hex components={A11yVariant} />
```

**Props**
@prop placeholder: string | undefined = undefined — placeholder, falls back to `Lorem Ipsum`
@prop size: 'normal' | 'large' | undefined = undefined — size of the text
@prop textColor: string — placeholder text color
@prop bgColor: string — placeholder background color
@prop contrast: number = 1 — RGAA contrast between the text and its background. Between 1 and 21
-->
<style>
	.a11y-single-notice {
		display: flex;
		align-items: center;
		margin: 4px 0;
		gap: 12px;
		height: 48px;
	}

	.large {
		font-size: 22px;
	}

	.score {
		width: 95px;
		flex-shrink: 0;
		margin-bottom: 10px;
	}

	.score p {
		margin-bottom: 2px;
	}

	.grade {
		border-radius: 50px;
		padding: 2px 8px;
		background-color: orange;
		font-weight: bold;
	}

	.grade-ok {
		background-color: green;
		color: white;
	}

	p {
		margin: 0;
	}

	.lorem {
		flex: 1;
		text-align: center;
		padding: 4px 8px;
		border-radius: 4px;
		border: 1px solid black;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>
