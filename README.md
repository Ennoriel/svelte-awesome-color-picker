# svelte-awesome-color-picker

> _svelte-awesome-color-picker_ is a highly customizable color picker component library with built-in keyboard navigation. It is compatible with form libraries.

## Links

- 🌟 [Github repository](https://github.com/Ennoriel/svelte-awesome-color-picker)
- 🌴 [Npm repository](https://www.npmjs.com/package/svelte-awesome-color-picker)
- 🛫 [Documentation](https://svelte-awesome-color-picker.vercel.app/)

## install

```shell
npm i -D svelte-awesome-color-picker
```

## Usage

```svelte
<script>
	import ColorPicker from 'svelte-awesome-color-picker';

	let rgb; // or hsv or hex
</script>

<ColorPicker bind:rgb />
```

## Api

### props

| Props      | Type         | Default Value  | Usage                                                                            |
| ---------- | ------------ | -------------- | -------------------------------------------------------------------------------- |
| label      | `string`     | Choose a color | Label of the component                                                           |
| isAlpha    | `boolean`    | true           | The alpha slider is visible                                                      |
| isInput    | `boolean`    | true           | The input button is visible                                                      |
| isOpen     | `boolean`    | false          | The picker is open by default and cannot be closed                               |
| toRight    | `boolean`    | false          | Sliders direction, if true, the direction is horizontal                          |
| rgb        | `Rgb`        | red            | The RGB color object that should be bound to                                     |
| hex        | `string`     | red            | The hex color string that should be bound to                                     |
| hsv        | `Hsv`        | red            | The HSV color object that should be bound to                                     |
| components | `Components` |                | By default a Circle and a Chrome variants are available. Can be fully customized |

### css variables

| Props           | Default Value | Usage                   |
| --------------- | ------------- | ----------------------- |
| --picker-height | `300px`       | picker & sliders height |
| --slider-width  | `30px`        | sliders width           |
| --picker-width  | `300px`       | picker width            |
| --focus-color   | `red`         | focus color             |

### components

The color picker can be customized with components. The details and props are detailed below. It is easier to copy the library components and tweak it to your needs.

A **Circle** and a **Chrome** variants are available. **To use the Chrome variant you need to set the props** `toRight`. You can partially overwrite the components:

```svelte
<script>
	import ColorPicker, { CircleVariant } from 'svelte-awesome-color-picker';
	import CustomInput from '$lib/path/to/my/awesome/variant/Input.svelte';

	let color
</script>

<!-- example with the CircleVariant and a custom Input component -->
<ColorPicker bind:color components={{...CircleVariant: input: CustomInput}} />
```

#### pickerIndicator

Component representing the picker indicator.

- The component should be positioned with `position: absolute;`.
- It should also have the css property `pointer-events: none;`.

Props:

| Props | Default Value            | Usage            |
| ----- | ------------------------ | ---------------- |
| pos   | `{x: number, y: number}` | expressed in %   |
| color | `Color`                  | the actual color |

#### sliderIndicator & alphaIndicator

Components representing the (hue) slider and alpha indicators.

- It should have the css property `pointer-events: none;`.

Props:

| Props | Type     | Usage                                           |
| ----- | -------- | ----------------------------------------------- |
| pos   | `number` | expressed in %                                  |
| color | `Color`  | respectively the Hue color and the actual color |

#### Input

Component representing the button to open the color picker and a hidden input with the hex value selected by the user

Props:

| Props  | Type          | Usage                                                                          |
| ------ | ------------- | ------------------------------------------------------------------------------ |
| button | `HTMLElement` | this property should be exported from only focusable element of this component |
| color  | `Color`       | the actual color                                                               |
| label  | `string`      | Label of the component                                                         |
| isOpen | `boolean`     | props that can be toggled on or off to open or close the color picker          |

#### pickerWrapper & sliderWrapper & alphaWrapper

Encapsulates the picker, hue slider and alpha slider.

- They should define the css properties `width` and `height`.

Props:

| Props   | Type      | Usage                          |
| ------- | --------- | ------------------------------ |
| focused | `boolean` | whether the element is focused |

#### wrapper

Encapsulates the whole color picker

Props:

| Props   | Type             | Usage                                                          |
| ------- | ---------------- | -------------------------------------------------------------- |
| wrapper | `HTMLDivElement` | this property should be exported with the top most DOM element |
| isOpen  | `boolean`        | whether toe color picker is open or not                        |
| isPopup | `boolean`        | whether the color picker is floating or not                    |
