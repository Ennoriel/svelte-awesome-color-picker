import { derived, writable } from 'svelte/store';

/**
 * Store that keeps track of the keys pressed, updated by the ArrowKeyHandler component
 */
export const keyPressed = writable({
	ArrowLeft: 0,
	ArrowUp: 0,
	ArrowRight: 0,
	ArrowDown: 0
});

/**
 * Store that keeps track of the keys pressed, with utility horizontal / vertical attributes
 * updated by the ArrowKeyHandler component
 */
export const keyPressedCustom = derived(keyPressed, ($keyPressed) => {
	return {
		...$keyPressed,
		ArrowV: $keyPressed.ArrowUp + $keyPressed.ArrowDown,
		ArrowH: $keyPressed.ArrowLeft + $keyPressed.ArrowRight,
		ArrowVH:
			$keyPressed.ArrowUp + $keyPressed.ArrowDown + $keyPressed.ArrowLeft + $keyPressed.ArrowRight
	};
});
