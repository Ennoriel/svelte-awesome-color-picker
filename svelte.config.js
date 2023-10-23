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
			layout: './src/routes/mdsvex/Layout.svelte',
			rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
			smartypants: {
				dashes: false
			}
		})
	],

	extensions: ['.svelte', '.md'],

	kit: {
		adapter: vercel()
	}
};

export default config;
