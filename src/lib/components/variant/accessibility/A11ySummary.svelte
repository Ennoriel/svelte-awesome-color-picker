<script lang="ts">
	import type { A11yColorContract } from '$lib/type/types';
	import { getNumberOfGradeFailed } from './grades';

	/** used with the A11yVariant. Define the accessibility examples in the color picker */
	export let a11yColors: Array<A11yColorContract>;

	$: count = a11yColors.map(getNumberOfGradeFailed).reduce((acc, c) => acc + c);

	$: message = count ? `⚠️ ${count} contrast grade${count && 's'} fail` : 'Contrast grade information';
</script>

{message}

<!-- 
@component accessibility summary — this component is meant to be used with the A11yVariant object as a variant to display the accessibility notice.

**Import**
```js
import { A11yVariant } from 'svelte-awesome-color-picker';
```

**Use**
```svelte
<ColorPicker bind:hex components={A11yVariant} />
```

**Props**
@prop a11yColors: Array&lt;A11yColorContract&gt; — used with the A11yVariant. Define the accessibility examples in the color picker
-->
