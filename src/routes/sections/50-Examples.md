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
    return `<span class="token keyword">let</span> ${name}<span class="token operator"> = </span>` + (object ? JSON.stringify(object, null, 2)
    .replace(/("#\w+")/g, '<span class="token string">$1</span>')
    .replace(/("...")/g, '<span class="token string">$1</span>')
    .replace(/:\s(\d+\.?\d*)/g, ': <span class="token keyword">$1</span>')
    .replace(/":/g, '"<span class="token operator">:</span>') : `<span class="token keyword">undefined</span>;`);
  }

  $: $bgColor = hex;
</script>

## Examples

### Default layout

<form action="post">
<ColorPicker bind:hex bind:rgb bind:hsv />
</form>
<div class="example-wrapper">
<div class="overflow">

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
{ textHex: '#FFF', bgHex: "#FF0000", reverse: true, placeholder: 'background' },
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

Note: set both attributes `resverse` and `bgHex` when you are chosing a transparency background color over a non white background.

### Nullable version

<ColorPicker bind:hex bind:rgb bind:hsv nullable />

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
	nullable
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
  <div>
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

### Dark theme

<div class="example-wrapper">
  <div>
	<div class="dark">
		<ColorPicker bind:hex bind:rgb bind:hsv />
	</div>
  </div>
  <div class="overflow">

**Source code**

<!-- prettier-ignore -->
```svelte
<script>
	import ColorPicker from 'svelte-awesome-color-picker';
</script>

<ColorPicker />

<style>
	.dark {
		--cp-bg-color: #333;
		--cp-border-color: white;
		--cp-input-color: #555;
		--cp-button-hover-color: #777;
	}</style>
```

</div>
</div>

### Override the css variables

Note: the `texts` props can be **partially** overridden. It's mostly used to translate the component. Most texts are used for accessibility aria-labels.

<div class="example-wrapper">
  <div>
	<ColorPicker
		bind:rgb
		bind:hsv
		bind:hex
		label="Choisir une couleur"
		texts={{
			label: {
				h: 'teinte',
				s: 'saturation',
				v: 'luminosité',
				r: 'rouge',
				g: 'vert',
				b: 'bleu',
				a: 'transparence',
				hex: 'couleur hexadécimale',
				withoutColor: 'sans couleur'
			},
			color: {
				rgb: 'rgb',
				hsv: 'hsv',
				hex: 'hex'
			},
			changeTo: 'changer à '
		}}
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
	label="Choisir une couleur"
	texts={{
		label: {
			h: 'teinte',
			s: 'saturation',
			v: 'luminosité',
			r: 'rouge',
			g: 'vert',
			b: 'bleu',
			a: 'transparence',
			hex: 'couleur hexadécimale',
			withoutColor: 'sans couleur'
		},
		color: {
			rgb: 'rgb',
			hsv: 'hsv',
			hex: 'hex'
		},
		changeTo: 'changer à '
	}}
/>
```

</div>
</div>
