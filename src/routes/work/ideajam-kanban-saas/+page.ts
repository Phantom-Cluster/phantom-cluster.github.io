import { error } from '@sveltejs/kit';
import { projects } from '$lib/data/projects';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const project = projects.find((p) => p.slug === 'ideajam-kanban-saas');

	if (!project) {
		error(404, 'Project not found');
	}

	return { project };
};
