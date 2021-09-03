<script lang="ts">
	import { keyPressed } from '../util/store';

	function keyup(e: KeyboardEvent) {
		if (['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].includes(e.key)) {
			$keyPressed[e.key] = 0;
			$keyPressed = $keyPressed;
		}
	}

	function keydown(e: KeyboardEvent) {
		if (['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].includes(e.key)) {
			if (!e.repeat) {
				$keyPressed[e.key] = 1;
				$keyPressed = $keyPressed;
			}
		}
	}
</script>

<svelte:window on:keyup={keyup} on:keydown={keydown} />
