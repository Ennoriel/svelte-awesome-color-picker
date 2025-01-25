## Migration

### upgrade from v3 to v4

The major version 4 have been released with a rewrite in Svelte 5. From now on, the library will only be compatible with Svelte 5. This comes with some breaking changes:

- drop Svelte &amp;lt; 5 support
- color props can be `null` and can no longer be `undefined`
- event dispatch has been replaced with event props named `on<event_name>`

### upgrade from v2 to v3

The major version 3 has been released to remove accessibility issues (see [issue #43](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/43)). The library now comes with the possibility to deselect a color and it is also possible to theme the picker for dark themes. The library has also been made simpler and lighter. This comes with some breaking changes:

- `sliderIndicator`, `alphaIndicator`, `pickerWrapper`, `sliderWrapper`, `alphaWrapper` and `a11ySummary` were removed, you can use css variables in the `wrapper` component for design customization and texts in the `texts` and `a11yTexts` props instead for translating the library.
- props `isA11y` has been removed. The accessibility display is now a variant: `<ColorPicker components={A11yVariant} />`. This change has been made to reduce the library bundle size.
- props `isInput` and `isPopup` have been merged and renamed as `isDialog`.
- props `isRight` has been replaced by `sliderDirection="horizontal"`.
- props `isA11yOpen` and `isA11yClosable` have been removed.
