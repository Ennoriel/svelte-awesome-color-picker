## Migration

### upgrade from v2 to v3

The major version 3 has been released to remove accessibility issues (see [issue #43](https://github.com/Ennoriel/svelte-awesome-color-picker/issues/43)). The library has also been made simpler and lighter. This comes with some breaking changes:

- `sliderIndicator`, `alphaIndicator`, `pickerWrapper`, `sliderWrapper`, `alphaWrapper` and `a11ySummary` were removed, you can use css variables in the `wrapper` component and texts in the `texts` and `a11yTexts` props instead.
- props `isA11y` has been removed. The accessibility display is now a variant: `<ColorPicker components={A11yVariant} />`. This change has been made to reduce the library bundle size.
- props `isInput` and `isPopup` have been merged and renamed as `isDialog`.
- props `isRight` has been replaced by `sliderDirection="horizontal"`.
- props `isA11yOpen` and `isA11yClosable` have been removed.
