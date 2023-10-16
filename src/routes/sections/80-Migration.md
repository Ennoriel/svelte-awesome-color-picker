## Migration

### update from v2 to v3

- `sliderIndicator`, `alphaIndicator`, `pickerWrapper`, `sliderWrapper` and `alphaWrapper` were removed, you can use css variables in the `wrapper` component instead.
- props `isA11y` is gone. The accessibility display is now a variant: `<ColorPicker components={A11yVariant} />`. This change has been made to reduce the library bundle size.
- props `isInput` and `isPopup` have been merged and renamed as `isDialog`.
