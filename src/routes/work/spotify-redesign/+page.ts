import { error } from '@sveltejs/kit';
import { projects } from '$lib/data/projects';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = () => {
	const project = projects.find((p) => p.slug === 'spotify-redesign');

	if (!project) {
		error(404, 'Project not found');
	}

	return {
		project
	};
};
