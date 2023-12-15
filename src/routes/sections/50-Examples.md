<!-- README-LESS -->
<script lang="ts">
  import ColorPicker, { ChromeVariant, A11yVariant } from '$lib';
  import { bgColor } from '../store';

  let hex = "#f6f0dc";
  let rgb;
  let hsv;
  let color;
  let historyHex = [];
  $: historyHex = historyHex.length > 8 ? ['...', ...historyHex.slice(Math.max(0, historyHex.length - 8))] : historyHex

  function beautify(object, name) {
    return `<span class="token keyword">let</span> ${name}<span class="token operator"> = </span>` + JSON.stringify(object || {}, null, 2)
    .replace(/("#\w+")/g, '<span class="token string">$1</span>')
    .replace(/("...")/g, '<span class="token string">$1</span>')
    .replace(/:\s(\d+\.?\d*)/g, ': <span class="token keyword">$1</span>')
    .replace(/":/g, '"<span class="token operator">:</span>');
  }

  $: $bgColor = hex;
</script>

## Examples

### Default layout

<ColorPicker bind:hex bind:rgb bind:hsv />

<!-- README-LESS -->
<div class="example-wrapper">
<div class="overflow">
<!-- ~README-LESS -->

**Source code**

<!-- prettier-ignore -->
```svelte
<script>
	import ColorPicker from 'svelte-awesome-color-picker';
</script>

<ColorPicker
	bind:hex
	bind:rgb
	bind:hsv
	bind:color
/>
```

</div>
<div>

**Color props**

<pre class="language-javascript">{@html beautify(hex, "hex")}

{@html beautify(rgb, "rgb")}

{@html beautify(hsv, "hsv")}

{@html beautify("// instance of Colord", "color")}
</pre>

</div>
</div>

### Chrome variant

<ColorPicker bind:rgb bind:hsv bind:hex components={ChromeVariant} sliderDirection="horizontal" />

**Source code**

```svelte
<script>
	import ColorPicker, { ChromeVariant } from 'svelte-awesome-color-picker';
</script>

<ColorPicker bind:rgb bind:hsv bind:hex components={ChromeVariant} sliderDirection="horizontal" />
```

### Accessibility notice variant

<ColorPicker
components={ A11yVariant }
bind:hex
bind:rgb
bind:hsv
isAlpha
a11yColors={[
{ textHex: '#FFF', reverse: true, placeholder: 'background' },
{ textHex: '#FFF', bgHex: "#FF0000", reverse: true, placeholder: 'background /w alpha' },
{ bgHex: '#FFF', placeholder: 'title', size: 'large' },
{ bgHex: '#7F7F7F', placeholder: 'button' }
]}
/>

**Source code**

```svelte
<script>
	import ColorPicker, { A11yVariant } from 'svelte-awesome-color-picker';
</script>

<ColorPicker
	components={A11yVariant}
	bind:hex
	bind:rgb
	bind:hsv
	isAlpha
	a11yColors={[
		{ textHex: '#FFF', reverse: true, placeholder: 'background' },
		{ textHex: '#FFF', bgHex: '#FF0000', reverse: true, placeholder: 'background' },
		{ bgHex: '#FFF', placeholder: 'title', size: 'large' },
		{ bgHex: '#7F7F7F', placeholder: 'button' }
	]}
/>
```

### Always open version

<div class="example-wrapper">
  <div class="center">
    <ColorPicker bind:rgb bind:hsv bind:hex components={ChromeVariant} sliderDirection="horizontal" isDialog={false} />
  </div>
  <div class="overflow">

**Source code**

<!-- prettier-ignore -->
```svelte
<script>
	import ColorPicker, { ChromeVariant } from 'svelte-awesome-color-picker';
</script>

<ColorPicker
	bind:rgb
	bind:hsv
	bind:hex
	components={ChromeVariant}
	sliderDirection="horizontal"
	isDialog={false}
/>
```

</div>
</div>

### Bind event '`on:input`'

<ColorPicker {rgb} on:input={event => {
historyHex = [...historyHex, event.detail.hex]
}} />

In this example, the color is appended to the history at each event.

<button on:click={() => historyHex = [hex]}>Reset history</button>

<div class="example-wrapper">
<div>

**Source code**

```svelte
<ColorPicker
	{rgb}
	on:input={(event) => {
		historyHex = [...historyHex, event.detail.hex];
	}}
/>
```

</div>
<div class="overflow">

**history variable**

<pre class="language-javascript">{@html beautify(historyHex, "history")}</pre>

</div>
</div>

### Override the css variables

<div class="example-wrapper">
  <div class="center">
	<ColorPicker
		bind:rgb
		bind:hsv
		bind:hex
		--picker-height="100px"
		--picker-width="100px"
		--slider-width="25px"
		--picker-indicator-size="25px"
		--picker-z-index="10"
		--input-size="100px"
		--focus-color="green"
	/>
  </div>
  <div class="overflow">

**Source code**

<!-- prettier-ignore -->
```svelte
<ColorPicker
	bind:rgb
	bind:hsv
	bind:hex
	--picker-height="100px"
	--picker-width="100px"
	--slider-width="25px"
	--picker-indicator-size="25px"
	--picker-z-index="10"
	--input-size="100px"
	--focus-color="green"
/>
```

</div>
</div>
