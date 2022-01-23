import path from 'path';
import preprocess from 'svelte-preprocess';

const config = {
	preprocess: preprocess(),

	kit: {
		target: '#svelte',

		vite: {
			resolve: {
				alias: {
					'svelte-awesome-color-picker': path.resolve('src/lib')
				}
			}
		}
	}
};

export default config;
