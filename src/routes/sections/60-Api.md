## Api

The library exports 4 different things:

- The color picker as a default export
- `ChromeVariant`: the Chrome variant
- `A11yVariant`: the accessibility variant (to display a panel which shows the WCAG grades)
- `HsvaColor` and `RgbaColor`: the two types defining HSV and RGB colors

### Color picker

#### props

<!-- PROPS_ColorPicker.svelte -->

| name                     | type                                                                                                                                                 | default value            | usage                                                                                                                                                                                                        |
| :----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| components               | `Partial<Components>`                                                                                                                                | `{}`                     | customize the ColorPicker component parts. Can be used to display a Chrome variant or an Accessibility Notice                                                                                                |
| label                    | `string`                                                                                                                                             | `'Choose a color'`       | input label, hidden when the ColorPicker is always shown (prop `isDialog={false}`)                                                                                                                           |
| name                     | `string &#124; undefined`                                                                                                                            | `undefined`              | input name, useful in a native form                                                                                                                                                                          |
| nullable                 | `boolean`                                                                                                                                            | `false`                  | if set to true, the color picker becomes nullable (rgb, hsv and hex set to undefined)                                                                                                                        |
| rgb                      | `RgbaColor &#124; null`                                                                                                                              |                          | **bindable**<br/>rgb color                                                                                                                                                                                   |
| hsv                      | `HsvaColor &#124; null`                                                                                                                              |                          | **bindable**<br/>hsv color                                                                                                                                                                                   |
| hex                      | `string &#124; null`                                                                                                                                 |                          | **bindable**<br/>hex color                                                                                                                                                                                   |
| color                    | `Colord &#124; null`                                                                                                                                 | `null`                   | **bindable**<br/>Colord color                                                                                                                                                                                |
| isDark                   | `boolean`                                                                                                                                            | `false`                  | **bindable**<br/>indicator whether the selected color is light or dark                                                                                                                                       |
| isAlpha                  | `boolean`                                                                                                                                            | `true`                   | if set to false, disables the alpha channel                                                                                                                                                                  |
| isDialog                 | `boolean`                                                                                                                                            | `true`                   | if set to false, the input and the label will not be displayed and the ColorPicker will always be visible                                                                                                    |
| isOpen                   | `boolean`                                                                                                                                            | `!isDialog`              | **bindable**<br/>indicator of the popup state                                                                                                                                                                |
| position                 | `'fixed' &#124; 'responsive' &#124; 'responsive-x' &#124; 'responsive-y'`                                                                            | `'responsive'`           | if set to "responsive", the popup will adjust its x and y position depending on the available window space, "responsive-x" and "responsive-y" limit the behavior to either the x or y axis                   |
| dir                      | `'ltr' &#124; 'rtl'`                                                                                                                                 | `'ltr'`                  | directionality left to right, or right to left                                                                                                                                                               |
| isTextInput              | `boolean`                                                                                                                                            | `true`                   | if set to false, hide the hex, rgb and hsv text inputs                                                                                                                                                       |
| textInputModes           | `Array<'hex' &#124; 'rgb' &#124; 'hsv'>`                                                                                                             | `['hex', 'rgb', 'hsv']`  | configure which hex, rgb and hsv inputs will be visible and in which order. If overridden, it is necessary to provide at least one value                                                                     |
| sliderDirection          | `'horizontal' &#124; 'vertical'`                                                                                                                     | `'vertical'`             | If set to "horizontal", the hue and alpha sliders will be displayed horizontally. It is necessary to set this props to "horizontal" for the ChromeVariant                                                    |
| disableCloseClickOutside | `boolean`                                                                                                                                            | `false`                  | If set to true, it will not be possible to close the color picker by clicking outside                                                                                                                        |
| a11yColors               | `Array<A11yColor>`                                                                                                                                   | `[{ bgHex: '#ffffff' }]` | used with the A11yVariant. Define the accessibility examples in the color picker                                                                                                                             |
| a11yLevel                | `'AA' &#124; 'AAA'`                                                                                                                                  | `'AA'`                   | required WCAG contrast level                                                                                                                                                                                 |
| texts                    | `TextsPartial &#124; undefined`                                                                                                                      | `undefined`              | all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts)                  |
| a11yTexts                | `A11yTextsPartial &#124; undefined`                                                                                                                  | `undefined`              | all a11y translation tokens used in the library; override with translations if necessary; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts) |
| onInput                  | `((color: { hsv: HsvaColor &#124; null; rgb: RgbaColor &#124; null; hex: string &#124; null; color: Colord &#124; null }) => void) &#124; undefined` |                          | **event**<br/>listener, dispatch an event when the color changes                                                                                                                                             |

<!-- ~PROPS_ColorPicker.svelte -->

#### events

| Event | Type                       | Usage                                                           |
| ----- | -------------------------- | --------------------------------------------------------------- |
| input | `{ color, hsv, rgb, hex }` | Event fired on every color change (click & drag & mouse, touch) |

See the example [Bind event '`onInput`'](#bind-event-oninput).

#### css variables

| Props                   | Default Value                            | Usage                                  |
| :---------------------- | ---------------------------------------- | -------------------------------------- |
| --picker-height         | `200px`                                  | picker & sliders height                |
| --picker-width          | `200px` (`260px` for the Chrome variant) | picker width                           |
| --slider-width          | `30px`                                   | sliders width                          |
| --picker-indicator-size | `10px`                                   | picker indicator size                  |
| --picker-z-index        | `2`                                      | popup picker z-index                   |
| --input-size            | `25px`                                   | color circle size                      |
| --focus-color           | `red`                                    | focus color                            |
| --cp-bg-color           | `white`                                  | background color                       |
| --cp-border-color       | `black`                                  | border color                           |
| --cp-text-color         | `--cp-border-color`                      | text color                             |
| --cp-input-color        | `#eee`                                   | background color of the inputs         |
| --cp-button-hover-color | `#ccc`                                   | background color of the hovered button |

See the example [Override the css variables](#override-the-css-variables).

### components

The color picker can be customized with components. The details and props are detailed below. It is easier to copy the library components and tweak them to your needs.

A **Chrome** variant and an **accessibility** variant are available. **To use the Chrome variant you need to set the props** `sliderDirection` to `horizontal`. You can also partially overwrite the components:

```svelte
<script>
	import ColorPicker, { ChromeVariant } from 'svelte-awesome-color-picker';
	import CustomInput from '$lib/path/to/my/awesome/variant/Input.svelte';
	import CustomWrapper from '$lib/path/to/my/awesome/variant/Wrapper.svelte';

	let rgb;
</script>

<!-- example with the default display and a custom Input component -->
<ColorPicker bind:rgb components={{ input: CustomInput }} />

<!-- example with the Chrome variant and a custom Wrapper component -->
<ColorPicker bind:rgb components={{ ...ChromeVariant, wrapper: CustomWrapper }} />

<!-- example with the ChromeVariant -->
<ColorPicker bind:rgb components={ChromeVariant} sliderDirection="horizontal" />
```

The components that can be overridden are:

- [Api](#api)
  - [Color picker](#color-picker)
    - [props](#props)
    - [events](#events)
    - [css variables](#css-variables)
  - [components](#components)
    - [pickerIndicator](#pickerindicator)
    - [textInput](#textinput)
    - [Input](#input)
    - [wrapper](#wrapper)
    - [nullabilityCheckbox](#nullabilitycheckbox)
    - [a11yNotice](#a11ynotice)
    - [a11ySingleNotice](#a11ysinglenotice)
  - [Accessibility](#accessibility)
    - [The component itself](#the-component-itself)
    - [Accessibility notice](#accessibility-notice)

The 3 components `a11yNotice`, `a11ySummary` and `a11ySingleNotice` are no longer included by default but can still be defined or passed through the a11yVariant object. This change was made in version 3.0.0 to lighten the library for those who do not use it.

Some components are no longer customizable in version 3.0.0: `pickerWrapper`, `sliderWrapper`, `alphaWrapper`, `sliderIndicator` and `alphaIndicator`. Instead you can either use the css variables or you can style them from the `wrapper` component.

#### pickerIndicator

Component representing the picker indicator.

- The component should be positioned with `position: absolute;`.
- It should also have the css property `pointer-events: none;`.

Props:

<!-- PROPS_PickerIndicator.svelte -->

| name | type                       | default value | usage                                    |
| :--- | -------------------------- | ------------- | ---------------------------------------- |
| pos  | `{ x: number; y: number }` |               | **required**<br/>indicator position in % |

<!-- ~PROPS_PickerIndicator.svelte -->

#### textInput

Component representing the rgb / hex / hsv textual input below the picker

Props:

<!-- PROPS_TextInput.svelte -->

| name           | type                                                                  | default value | usage                                                                                                                                                                                                        |
| :------------- | --------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| isAlpha        | `boolean`                                                             |               | **required**<br/>if set to false, disables the alpha channel                                                                                                                                                 |
| rgb            | `RgbaColor`                                                           |               | **required**, **bindable**<br/>rgb color                                                                                                                                                                     |
| hsv            | `HsvaColor`                                                           |               | **required**, **bindable**<br/>hsv color                                                                                                                                                                     |
| hex            | `string`                                                              |               | **required**, **bindable**<br/>hex color                                                                                                                                                                     |
| textInputModes | `Array<'hex' &#124; 'rgb' &#124; 'hsv'>`                              |               | **required**<br/>configure which hex, rgb and hsv inputs will be visible and in which order. If overridden, it is necessary to provide at least one value                                                    |
| texts          | `Texts`                                                               |               | **required**<br/>all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts) |
| onInput        | `(color: { hsv?: HsvaColor; rgb?: RgbaColor; hex?: string }) => void` |               | **required**, **event**<br/>listener, dispatch an event when one of the color changes                                                                                                                        |

<!-- ~PROPS_TextInput.svelte -->

#### Input

Component representing the button to open the color picker and a hidden input with the hex value selected by the user

Props:

<!-- PROPS_Input.svelte -->

| name         | type                                | default value | usage                                                           |
| :----------- | ----------------------------------- | ------------- | --------------------------------------------------------------- |
| labelElement | `HTMLLabelElement &#124; undefined` |               | **required**, **bindable**<br/>DOM element of the label wrapper |
| hex          | `string &#124; null`                |               | **required**<br/>hex color                                      |
| label        | `string`                            |               | **required**<br/>input label                                    |
| name         | `string &#124; undefined`           | `undefined`   | input name, useful in a native form                             |
| dir          | `'ltr' &#124; 'rtl'`                |               | **required**<br/>directionality left to right, or right to left |

<!-- ~PROPS_Input.svelte -->

#### wrapper

Encapsulates the whole color picker

Props:

<!-- PROPS_Wrapper.svelte -->

| name     | type                           | default value | usage                                                                                                                   |
| :------- | ------------------------------ | ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| wrapper  | `HTMLElement &#124; undefined` |               | **required**, **bindable**<br/>DOM element of the wrapper element                                                       |
| isOpen   | `boolean`                      |               | **required**<br/>indicator of the popup state                                                                           |
| isDialog | `boolean`                      |               | **required**<br/>if set to true, the wrapper should have a dialog role and be absolute. It should be relative otherwise |
| children | `import('svelte').Snippet`     |               | **required**<br/>children                                                                                               |

<!-- ~PROPS_Wrapper.svelte -->

#### nullabilityCheckbox

Displays the checkbox to toggle an undefined value

Props:

<!-- PROPS_NullabilityCheckbox.svelte -->

| name        | type      | default value | usage                                                                                                                                                                                                        |
| :---------- | --------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| isUndefined | `boolean` |               | **required**, **bindable**<br/>whether the color picker is undefined                                                                                                                                         |
| texts       | `Texts`   |               | **required**<br/>all translation tokens used in the library; can be partially overridden; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts) |

<!-- ~PROPS_NullabilityCheckbox.svelte -->

#### a11yNotice

Component displaying accessible contrast issues with the color chosen.

Props:

<!-- PROPS_A11yNotice.svelte -->

| name       | type                                | default value | usage                                                                                                                                                                                                        |
| :--------- | ----------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| components | `Components`                        |               | **required**<br/>customize the ColorPicker component parts. Can be used to display a Chrome variant or an Accessibility Notice                                                                               |
| hex        | `string`                            |               | **required**<br/>hex color                                                                                                                                                                                   |
| a11yColors | `Array<A11yColor>`                  |               | **required**<br/>define the accessibility examples in the color picker                                                                                                                                       |
| a11yLevel  | `'AA' &#124; 'AAA'`                 |               | **required**<br/>required WCAG contrast level                                                                                                                                                                |
| a11yTexts  | `A11yTextsPartial &#124; undefined` | `undefined`   | all a11y translation tokens used in the library; override with translations if necessary; see [full object type](https://github.com/Ennoriel/svelte-awesome-color-picker/blob/master/src/lib/utils/texts.ts) |

<!-- ~PROPS_A11yNotice.svelte -->

<span id="type-a11y-color"></span>

Type A11yColor:

```ts
type A11yColor = {
	placeholder?: string;
	size?: 'normal' | 'large';
} & (
	| {
			textHex: string;
			bgHex: string;
			reverse: true;
	  }
	| {
			bgHex: string;
			reverse?: false;
	  }
);
```

with:

| Attribute   | Type            | Usage                                                                                                                                             |
| :---------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| placeholder | `string`        | placeholder text, default to `Lorem Ipsum`                                                                                                        |
| size        | `normal, large` | used to check the contrast guidelines                                                                                                             |
| reverse     | `boolean`       | set to true if the color picker is used to chose a background color                                                                               |
| textHex     | `string`        | when choosing the background color, defines the text color                                                                                        |
| bgHex       | `string`        | when choosing the text color, defines the background color ; hen choosing th background color, defines the color behind (in case of transparency) |

read more about this component accessibility in the [a11y section](#accessibility).

#### a11ySingleNotice

component display the accessibility result of the color over a single item of the `a11yColors` props.

Props:

<!-- PROPS_A11ySingleNotice.svelte -->

| name         | type                                       | default value | usage                                                               |
| :----------- | ------------------------------------------ | ------------- | ------------------------------------------------------------------- |
| placeholder  | `string &#124; undefined`                  | `undefined`   | placeholder, falls back to `Lorem Ipsum`                            |
| size         | `'normal' &#124; 'large' &#124; undefined` | `undefined`   | size of the text                                                    |
| a11yLevel    | `'AA' &#124; 'AAA'`                        |               | **required**<br/>required WCAG contrast level                       |
| textColor    | `string`                                   |               | **required**<br/>placeholder text color                             |
| bgColor      | `string`                                   |               | **required**<br/>placeholder background color                       |
| contrast     | `number`                                   | `1`           | RGAA contrast between the text and its background. Between 1 and 21 |
| contrastText | `string`                                   |               | **required**<br/>define the accessibility "contrast" text           |

<!-- ~PROPS_A11ySingleNotice.svelte -->

### Accessibility

#### The component itself

The svelte-awesome-color-picker uses [svelte-awesome-slider](https://github.com/Ennoriel/svelte-awesome-slider) (also made by me) to display the sliders. This library follows the [W3c slider component accessibility guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/slider/).

The color picker follows the [W3c component dialog combobox accessibility guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/).

#### Accessibility notice

The component can display an accessibility notice that updates the WCAG contrast grades by using the `a11yVariant` component override.

The contrast between 2 colors is a value between 1 and 21. It is computed with [the colord a11y plugin library](https://github.com/omgovich/colord) based on [WCAG 2.0 guidelines for contrast accessibility](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html).

A contrast between 2 colors succeed if it follows the WCAG contrast guidelines:

| Text size           | <span class="grade">AA</span> | <span class="grade">AAA</span> |
| :------------------ | ----------------------------- | ------------------------------ |
| small text (18.5px) | contrast > 4.5                | contrast > 7                   |
| big text (24px)     | contrast > 3                  | contrast > 4.5                 |

In the default `A11ySingleNotice` component that renders the <span class="grade">AA</span> and <span class="grade">AAA</span> tags, the small text values are used (can be configured for each reference color with the `color` props).

See and the [accessibility notice variant example](#accessibility-notice-variant) and the [definition of the A11yColor type](#type-a11y-color) for more information.
