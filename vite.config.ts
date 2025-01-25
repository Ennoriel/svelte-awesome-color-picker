import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],

	test: {
		include: ['{src,scripts}/**/*.{test,spec}.{js,ts}']
	}
});
