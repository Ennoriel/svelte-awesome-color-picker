## How to

### Fix overflow issues

If you use the ColorPicker component inside a container that is set with `overflow: auto` or `overflow: hidden`, the picker will be hidden outside of the wrapper.

To fix this, you can override the `Wrapper` component and use [the svelte-portal library](https://github.com/romkor/svelte-portal) to render the picker outside of your container. An example of how to do that is presented in this [svelte-awesome-color-picker portal REPL](https://svelte.dev/repl/aab96e19ae3e4b96a592322497b232a7?version=3.59.1).

## Use the color of the document

Override the css variable `--cp-border-color`:

```css
body {
	--cp-border-color: currentColor;
}
```

If you have a dark theme, make sure to handles it correctly.
