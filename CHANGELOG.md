# svelte-awesome-color-picker

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

- fix issue #18: prevent default color input picker to open on safari

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
