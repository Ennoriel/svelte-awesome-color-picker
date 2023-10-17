## Migration

### update from v2 to v3

The major version 3 has been made to remove accessibility issues (see [issue #43](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/43)). The library has been made simpler and lighter.

- `sliderIndicator`, `alphaIndicator`, `pickerWrapper`, `sliderWrapper` and `alphaWrapper` were removed, you can use css variables in the `wrapper` component instead.
- props `isA11y` has been removed. The accessibility display is now a variant: `<ColorPicker components={A11yVariant} />`. This change has been made to reduce the library bundle size.
- props `isInput` and `isPopup` have been merged and renamed as `isDialog`.
- props `isRight` has been replaced by `sliderDirection="horizontal"`.
- props `isA11yOpen` has been removed.
