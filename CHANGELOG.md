# svelte-awesome-color-picker

## 4.0.0

### Major Changes

- 35c887c: set the position props default value to responsive instead of fixed
- d384e21: revert picker indicator cursor position extrapolation to bound to the wrapper picker element ([issue #76](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/76))
- c275511: migrate codebase to svelte 5

### Patch Changes

- de2725f: fix alpha slider background in case of a portal wrapper (fix [issue #93](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/93))
- 0fd681f: up deps
- 1c8f4d1: support rtl alignment ([issue #90](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/90))

## 3.1.4

### Patch Changes

- d005b46: fix auto-positionning when the popup is outside of the viewport (fix [issue #82](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/82))
- 1efb3d5: add svelte 5 peer dependency (fix [issue #84](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/84))
- a17d991: bump dependencies

## 3.1.3

### Patch Changes

- d8ebead: bump svelte-awesome-slider to 1.1.1 (fix [issue #81](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/81))

## 3.1.2

### Patch Changes

- e36c45d: add contributing guide
- b46d0ae: compute color change if only one of hsv, rgb, hex is set (fix [issue #80](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/80))
- 086c20a: add `position` props to adjust its position to always be visible on screen ([issue #82](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/82) - thanks to [LeonHeidelbach](https://github.com/LeonHeidelbach))

## 3.1.1

### Patch Changes

- ffd3e01: set CI node version to 20 and update actions version
- 190e932: fix doc title 'translate the color picker'
- 2938a06: use translations on the keyboard controlled sliders aria-label

## 3.1.0

### Minor Changes

- 89fc763: Create a css variable --cp-text-color instead of using --cp-border-color (fix [issue #72](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/72))

## 3.0.6

### Patch Changes

- prevent button to trigger form (fix [issue #70](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/70))

## 3.0.5

- Fix bug occurring when limiting the amount of textModeInputs or changing the order of textModeInputs (thanks to [al-soup](https://github.com/al-soup))

## 3.0.4

### Patch Changes

- Fix how the changeTo label is overriden (related to #65)

## 3.0.3

### Patch Changes

- Fix color picker being stuck when the color is initialized to undefined (fix [issue #64](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/64))

## 3.0.2

### Patch Changes

- Prvent native iOS color picker to open (fix [issue #62](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/62))

## 3.0.1

### Patch Changes

- Remove info of v3 in beta

## 3.0.0

### Major Changes

- remove accessibility issues ([issue #43](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/43))
- add nullable props to make the color picker nullable ([issue #56](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/56))
- add dark theme support ([issue #59](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/59))
- simplify lots of small things (removed some useless props) (see [the migration guide](https://svelte-awesome-color-picker.vercel.app/#upgrade-from-v2-to-v3))

## 2.4.8

### Patch Changes

- Display info of v3 in beta

## 2.4.7

### Patch Changes

- Fix canChangeMode typo in the documentation ([issue #49](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/49) - thanks to [willuhmjs](https://github.com/willuhmjs))

## 2.4.6

### Patch Changes

- Fix doc: remove the CircleVariant which is the default display since v.2.0.0 ([issue #39](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/39))
- 6dba255: Fix chrome variant hue max value ([issue #40](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/40))

## 2.4.5

### Patch Changes

- Add props disableCloseClickOutside ([issue #37](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/37) - thanks to [JanRoma](https://github.com/JanRoma))

## 2.4.4

### Patch Changes

- Fix always open version disapear when tabbing ([issue #36](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/36) - thanks to [frostbytedata](https://github.com/frostbytedata))

## 2.4.3

### Patch Changes

- Add --picker-z-index to customize z-index ([issue #29](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/29))
- Remove the stopPropagation directive that blocks the events from bubbling ([issue #32](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/32))

## 2.4.2

### Patch Changes

- Fix css variables --picker-height, --picker-width and --slider-width ([issue #25](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/31))

## 2.4.1

### Patch Changes

- Remove console.log

## 2.4.0

### Minor Changes

- Fix tabbing into the input (thanks again to [Manstie](https://github.com/manstie))
- Fix a11y notice display
- Fix focus style when pressing tab ([issue #25](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/25))
- Fix default color input opening on Safari on label click ([issue #18](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/18))
- Fix color picker initialization ([issue #27](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/27))

## 2.3.0

### Minor Changes

- use SvelteKit 1.0.0 😁

### Patch Changes

- 3670d7c: fix a11y summary & svelte-check

## 2.2.5

### Patch Changes

- Fix indicator positioning and add the border on the default display too

## 2.2.4

### Patch Changes

- add border in slider indicator to be always visible (thanks to [JinIgarashi](https://github.com/JinIgarashi))

## 2.2.3

### Patch Changes

- Display transparency in the closed picker (thanks to [Manstie](https://github.com/manstie))

## 2.2.2

### Patch Changes

- fix [issue #18](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/18): prevent default color input picker to open on safari

## 2.2.1

### Patch Changes

- Fix event type

## 2.2.0

### Minor Changes

- Add input event fired at every color change (thanks to [Valandur](https://github.com/Valandur))

## 2.1.3

### Patch Changes

- Add option to show the mode button (thanks to [dnlml](https://github.com/dnlml))

## 2.1.2

### Patch Changes

- add license

## 2.1.1

### Patch Changes

- fix dependency

## 2.1.0

### Minor Changes

- Add aria attributes

## 2.0.0

### Major Changes

- 6d6e45e: use circle variant as the default one

### Minor Changes

- 029c474: Use an input color to fallback when javascript is disabled

## 2.0.0

### Major Changes

- 2631865: Add accessibility contrast notice
- 382c7dc: use colord internally & remove the Color type

### Patch Changes

- 382c7dc: bump all libraries
