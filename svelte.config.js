import path from 'path';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import vercel from '@sveltejs/adapter-vercel';

const config = {
	preprocess: [
		preprocess(),
		mdsvex({
			extensions: ['.md'],
			rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
		})
	],

	extensions: ['.svelte', '.md'],

	kit: {
		adapter: vercel(),

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
