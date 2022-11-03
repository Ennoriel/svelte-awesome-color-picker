<script lang="ts">
    import './style.css';
	import ColorPicker, { ChromeVariant, A11yHorizontalWrapper } from '$lib';
    import { browser } from '$app/environment';

    let hex = "#f6f0dc";
    let rgb;
    let hsv;

    function beautify(object, name) {
        return `<span style="color: #ef3b7d;">let</span> ${name}<span style="color: #a77afe;"> = </span>` + JSON.stringify(object || {}, null, 2)
        .replace(/("#\w+")/g, '<span style="color: #e6d06c;">$1</span>')
        .replace(/:\s(\d+\.?\d*)/g, ': <span style="color: #ef3b7d;">$1</span>')
        .replace(/":/g, '"<span style="color: #a77afe;">:</span>');
    }
</script>

<div style="padding: 8px; background-color: {hex}">
<main>

# svelte-awesome-color-picker

> _svelte-awesome-color-picker_ is a highly customizable color picker component library with

- 🎹 built-in keyboard navigation
- 📱 mobile support
- 🤸‍♂️ accessibility information
- 🤯 and even works without javascript (fallback to browser default color input)
- 🏇 it's compatible with form libraries
- 🧩 fully customizable

<br/>

The library uses [colord](https://www.npmjs.com/colord) internally because it's the lightest color conversion solution on the market and supports a11y contrasts.

## Links

- 🌟 [Github repository](https://github.com/Ennoriel/svelte-awesome-color-picker)
- 🌴 [Npm repository](https://www.npmjs.com/package/svelte-awesome-color-picker)
- 🛫 [Documentation](https://svelte-awesome-color-picker.vercel.app/)

## summary

- [Links](#links)
- [install](#install)
- [Usage](#usage)
- [Api](#api)
  - [props](#props)
  - [css variables](#css-variables)
  - [components](#components)
    - [pickerIndicator](#pickerindicator)
    - [sliderIndicator & alphaIndicator](#sliderindicator--alphaindicator)
    - [TextInput](#textinput)
    - [A11yNotice](#a11ynotice)
    - [a11ySummary](#a11ysummary)
    - [a11ySingleNotice](#a11ysinglenotice)
    - [Input](#input)
    - [pickerWrapper & sliderWrapper & alphaWrapper](#pickerwrapper--sliderwrapper--alphawrapper)
    - [wrapper](#wrapper)
  - [Accessibility](#accessibility)
    - [The component itself](#the-component-itself)
    - [Accessibility notice](#accessibility-notice)

## Examples

<div class="example-wrapper">
<div class="example-col">

### Default layout

<ColorPicker bind:hex bind:rgb bind:hsv />

### With a11y contrast, custom wrapper:

<ColorPicker
components={{ wrapper: A11yHorizontalWrapper }}
bind:hex
bind:rgb
bind:hsv
isAlpha
isA11y
isA11yOpen
isA11yClosable={false}
a11yColors={[
{ hex: '#FFF', reverse: true, placeholder: 'background' },
{ hex: '#FFF', placeholder: 'title', size: 'large' },
{ hex: '#FFF', placeholder: 'text' },
{ hex: '#EEE', placeholder: 'button' }
]}
/>

### Chrome variant

<ColorPicker bind:rgb bind:hsv bind:hex components={ChromeVariant} toRight />

</div>
<div class="example-col">

### Color props

<pre class="language-javascript">{@html beautify(hex, "hex")}

{@html beautify(rgb, "rgb")}

{@html beautify(hsv, "hsv")}
</pre>

</div>
</div>

### Always open version

<div class="center">
    <ColorPicker bind:rgb bind:hsv bind:hex components={ChromeVariant} toRight isInput={false} />
</div>

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

The default export of the library is the main ColorPicker. It has the following props:

### props

| Props          | Type               | Default Value          | Usage                                                                                           |
| -------------- | ------------------ | ---------------------- | ----------------------------------------------------------------------------------------------- |
| label          | `string`           | Choose a color         | Label of the component                                                                          |
| isAlpha        | `boolean`          | `true`                 | The alpha slider is visible                                                                     |
| isInput        | `boolean`          | `true`                 | The input button is visible                                                                     |
| isTextInput    | `boolean`          | `true`                 | The textual hex / rgb / hsv input are visible                                                   |
| canChangeMode  | `boolean`          | `true`                 | Show the button to change the color mode. If true, only the hex input is visible                |
| isA11y         | `boolean`          | `true`                 | The accessibility contrast warnings are visible                                                 |
| a11yColors     | `Array<A11yColor>` | `[{ hex: '#ffffff' }]` | The colors to check the contrasts against. See [details about the type](#type-a11y-color)       |
| a11yGuidelines | `string`           | `link to WebAIM`       | Adds a custom string (rendered as @html) for additional reference                               |
| isA11yOpen     | `boolean`          | `false`                | The accessible panel is open by default                                                         |
| isA11yClosable | `boolean`          | `true`                 | The accessible panel is closable                                                                |
| isOpen         | `boolean`          | `false`                | The picker is open by default and cannot be closed                                              |
| isPopup        | `boolean`          | `true`                 | whether the color picker is floating or not                                                     |
| isDark         | `boolean`          | `false`                | Indicates if the selected color is dark based on HSP representation                             |
| toRight        | `boolean`          | `false`                | Sliders direction, if true, the direction is horizontal                                         |
| rgb            | `RgbaColor`        | `red`                  | The RGB color object that should be bound to                                                    |
| hex            | `string`           | `red`                  | The hex color string that should be bound to                                                    |
| hsv            | `HsvaColor`        | `red`                  | The HSV color object that should be bound to                                                    |
| color          | `ColorD`           | `red`                  | A colord representation of the color. It can be bound to but should not be modified             |
| components     | `Components`       |                        | A Chrome variants is available. Can be fully customized. See [#components section](#components) |

### css variables

| Props           | Default Value | Usage                   |
| --------------- | ------------- | ----------------------- |
| --picker-height | `200px`       | picker & sliders height |
| --picker-width  | `200px`       | picker width            |
| --slider-width  | `30px`        | sliders width           |
| --focus-color   | `red`         | focus color             |

### components

The color picker can be customized with components. The details and props are detailed below. It is easier to copy the library components and tweak it to your needs.

A **Chrome** variants are available. **To use the Chrome variant you need to set the props** `toRight`. You can partially overwrite the components:

```svelte
<script>
	import ColorPicker, { ChromeVariant } from 'svelte-awesome-color-picker';
	import CustomInput from '$lib/path/to/my/awesome/variant/Input.svelte';

	let rgb;
</script>

<!-- example with the ChromeVariant -->
<ColorPicker bind:rgb components={ChromeVariant} isRight />
```

The components that can be overridden are:

- [pickerIndicator](#pickerindicator)
- [sliderIndicator & alphaIndicator](#sliderindicator--alphaindicator)
- [TextInput](#textinput)
- [A11yNotice](#a11ynotice)
- [a11ySummary](#a11ysummary)
- [a11ySingleNotice](#a11ysinglenotice)
- [Input](#input)
- [pickerWrapper & sliderWrapper & alphaWrapper](#pickerwrapper--sliderwrapper--alphawrapper)
- [wrapper](#wrapper)

#### pickerIndicator

Component representing the picker indicator.

- The component should be positioned with `position: absolute;`.
- It should also have the css property `pointer-events: none;`.

Props:

| Props  | Default Value            | Usage                                                               |
| ------ | ------------------------ | ------------------------------------------------------------------- |
| pos    | `{x: number, y: number}` | expressed in %                                                      |
| hex    | string                   | the current hexadecimal color                                       |
| isDark | `boolean`                | Indicates if the selected color is dark based on HSP representation |

#### sliderIndicator & alphaIndicator

Components representing the (hue) slider and alpha indicators.

- It should have the css property `pointer-events: none;`.

Props:

| Props   | Type     | Usage                                                  |
| ------- | -------- | ------------------------------------------------------ |
| pos     | `number` | expressed in %                                         |
| toRight | boolean  | slider direction, if true, the direction is horizontal |

#### TextInput

Component representing the rgb / hex / hsv textual input below the picker

Props:

| Props         | Type        | Usage                                                                            |
| ------------- | ----------- | -------------------------------------------------------------------------------- |
| isAlpha       | `boolean`   | The alpha input is visible                                                       |
| rgb           | `RgbaColor` | The RGB color object that should be bound to                                     |
| hex           | `string`    | The hex color string that should be bound to                                     |
| hsv           | `HsvaColor` | The HSV color object that should be bound to                                     |
| canChangeMode | `boolean`   | Show the button to change the color mode. If true, only the hex input is visible |

#### A11yNotice

Component displaying accessible contrast issues with the color chosen.

Props:

| Props          | Type               | Usage                                                                                            |
| -------------- | ------------------ | ------------------------------------------------------------------------------------------------ |
| components     | `Components`       | A Chrome variants are available. Can be fully customized. See [#components section](#components) |
| a11yColors     | `Array<A11yColor>` | The colors to check the contrasts against. See [#a11y-colors section](#type-a11y-color) below    |
| hex            | `string`           | The current hexadecimal color                                                                    |
| a11yGuidelines | `string`           | Adds a custom string (rendered as @html) for additional reference                                |

<span id="type-a11y-color"></span>

Type A11yColor:

| Attribute   | Type            | Usage                                                                         |
| ----------- | --------------- | ----------------------------------------------------------------------------- |
| hex         | `string`        | The reference color                                                           |
| reverse     | `boolean`       | if set to true, use the hex color as the text color instead of the background |
| placeholder | `string`        | placeholder text, default to `Lorem Ipsum`                                    |
| size        | `normal, large` | used to check the contrast guidelines                                         |
| contrast    | `string`        | color contrast between the current color and the hex reference color          |

read more about this component accessibility in the [#a11y section](#accessibility).

#### a11ySummary

component displaying the content of the `<summary>` inside `<details>` tags.

Props:

| Props      | Type               | Usage                                                                               |
| ---------- | ------------------ | ----------------------------------------------------------------------------------- |
| a11yColors | `Array<A11yColor>` | The colors to check the contrasts against. See [#a11y-colors section](#a11y-colors) |
| hex        | `string`           | The current hexadecimal color                                                       |

#### a11ySingleNotice

component display the accessibility result of the color over a single item of the `a11yColors` props.

Props:

| Props     | Type     | Usage                                                                                                                                                                                                                                                                              |
| --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| textColor | `string` | The text color                                                                                                                                                                                                                                                                     |
| bgColor   | `string` | The background color                                                                                                                                                                                                                                                               |
| ph        | `string` | The placeholder string. Default to `Lorem Ipsum`                                                                                                                                                                                                                                   |
| contrast  | `number` | contrast of the text color over the background color as computed by [the colord a11y plugin library](https://github.com/omgovich/colord) based on [WCAG 2.0 guidelines for contrast accessibility](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) |

#### Input

Component representing the button to open the color picker and a hidden input with the hex value selected by the user

Props:

| Props  | Type          | Usage                                                                          |
| ------ | ------------- | ------------------------------------------------------------------------------ |
| button | `HTMLElement` | this property should be exported from only focusable element of this component |
| hex    | string        | the current hexadecimal color                                                  |
| label  | `string`      | Label of the component                                                         |
| isOpen | `boolean`     | props that can be toggled on or off to open or close the color picker          |

#### pickerWrapper & sliderWrapper & alphaWrapper

Encapsulates the picker, hue slider and alpha slider.

- They should define the css properties `width` and `height`.

Props:

| Props   | Type      | Usage                                                  |
| ------- | --------- | ------------------------------------------------------ |
| focused | `boolean` | whether the element is focused                         |
| toRight | boolean   | slider direction, if true, the direction is horizontal |

#### wrapper

Encapsulates the whole color picker

Props:

| Props   | Type             | Usage                                                          |
| ------- | ---------------- | -------------------------------------------------------------- |
| wrapper | `HTMLDivElement` | this property should be exported with the top most DOM element |
| isOpen  | `boolean`        | whether toe color picker is open or not                        |
| isPopup | `boolean`        | whether the color picker is floating or not                    |

### Accessibility

#### The component itself

In progress

#### Accessibility notice

The component can display an accessibility notice that updates the WCAG contrast grades by setting the `isA11y` props.

The contrast between 2 colors is a value between 1 and 21.

A contrast between 2 colors succeed if it follows the WCAG contrast guidelines:

|                         | <span class="grade">AA</span> | <span class="grade">AAA</span> |
| ----------------------- | ----------------------------- | ------------------------------ |
| for small text (18.5px) | contrast > 4.5                | contrast > 7                   |
| for big text (24px)     | contrast > 3                  | contrast > 4.5                 |

In the default `A11ySingleNotice` component that renders the <span class="grade">AA</span> and <span class="grade">AAA</span> tags, the small text values are used (can be configured for each reference color with the `color` props).

See [the definition of the A11yColor type](#type-a11y-color) for more information.

</main>
</div>
