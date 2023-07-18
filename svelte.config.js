import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		scss: {
			prependData: '@use "../styles/functions";@use "@unsass/breakpoint";'
		}
	}),

	kit: {
		adapter: adapter(),
		alias: {
			$components: 'src/lib/components'
		}
	}
};

export default config;
