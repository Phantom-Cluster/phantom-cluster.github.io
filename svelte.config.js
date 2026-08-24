import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => filename.split(/[/\\]/).includes('node_modules') ? undefined : true
	},
	kit: { 
		adapter: adapter(),
		prerender: {
			handleHttpError: 'warn',
			handleMissingId: 'ignore',
			handleUnseenRoutes: 'ignore',
			entries: [
				'*',
				'/work/wpmu-dev-dashboard',
				'/work/spotify-redesign',
				'/work/alt-news-concept',
				'/work/discord-redesign',
				'/work/wordpress-redesign',
				'/work/effido-productivity-app',
				'/work/resort-island-design',
				'/work/themeisle-starter-templates',
				'/work/eclectic-app-design',
				'/work/ideajam-kanban-saas'
			]
		}
	}
};

export default config;
