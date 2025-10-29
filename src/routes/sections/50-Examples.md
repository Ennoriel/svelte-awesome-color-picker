<script lang="ts">
  import ColorPicker, { ChromeVariant, A11yVariant } from '$lib';
  import { bgColor } from '../store';

  let hex = $state("#f6f0dc");
  let rgb = $state(null);
  let hsv = $state(null);
  let color = $state(null);
  let historyHex = $state([]);

  function beautify(object, name) {
    return `<span class="token keyword">let</span> ${name}<span class="token operator"> = </span>` + (object ? JSON.stringify(object, null, 2)
    .replace(/("#\w+")/g, '<span class="token string">$1</span>')
    .replace(/("...")/g, '<span class="token string">$1</span>')
    .replace(/:\s(\d+\.?\d*)/g, ': <span class="token keyword">$1</span>')
    .replace(/":/g, '"<span class="token operator">:</span>') : `<span class="token keyword">undefined</span>;`);
  }

  $effect(() => $bgColor = hex)
</script>

## Examples

### Default layout

<form action="post">
<ColorPicker bind:hex bind:rgb bind:hsv position="responsive"/>
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
  position="responsive"
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

<ColorPicker {hex} {rgb} {hsv} nullable />

The color of this example is not bound to the background since it would make other color pickers to break.

**Source code**

<!-- prettier-ignore -->
```svelte
<script>
	import ColorPicker from 'svelte-awesome-color-picker';
</script>

<ColorPicker {hex} {rgb} {hsv} nullable />
```

### Right to left aligned version

<ColorPicker {hex} {rgb} {hsv} position="responsive" dir="rtl" />

**Source code**

<!-- prettier-ignore -->
```svelte
<script>
	import ColorPicker from 'svelte-awesome-color-picker';
</script>

<ColorPicker {hex} {rgb} {hsv} dir="rtl" />
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

### Bind event '`onInput`'

<ColorPicker {rgb} onInput={event => {
historyHex = [...historyHex, event.hex]
if(historyHex.length > 5) historyHex.shift()
}} />

In this example, the color is appended to the history at each event.

<button onclick={() => historyHex = [hex]}>Reset history</button>

<div class="example-wrapper">
<div>

**Source code**

```svelte
<ColorPicker
	{rgb}
	onInput={(event) => {
		historyHex = [...historyHex, event.hex];
		if (historyHex.length > 5) historyHex.shift();
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

### Override one of the components

The Color Picker comes with a default layout. A **Chrome** variant is provided with this library. You can customise part of the Color Picker by overriding one of the components. Every single component props is documented in the [components section of the Api documentation](/#components).

```svelte
<script>
	import ColorPicker, { ChromeVariant } from 'svelte-awesome-color-picker';
	import CustomInput from '$lib/path/to/my/awesome/variant/Input.svelte';
	import CustomWrapper from '$lib/path/to/my/awesome/variant/Wrapper.svelte';

	let rgb;
</script>

<!-- example with the default display and a custom Input component -->
<ColorPicker bind:rgb components={{ input: CustomInput }} />

<!-- example with the ChromeVariant -->
<ColorPicker bind:rgb components={ChromeVariant} sliderDirection="horizontal" />

<!-- example with the Chrome variant and a custom Wrapper component -->
<ColorPicker bind:rgb components={{ ...ChromeVariant, wrapper: CustomWrapper }} />
```

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

<div class="dark">
	<ColorPicker />
</div>

<style>
	.dark {
		--cp-bg-color: #333;
		--cp-border-color: white;
		--cp-text-color: white;
		--cp-input-color: #555;
		--cp-button-hover-color: #777;
	}</style>
```

</div>
</div>

### Translate the color picker

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
