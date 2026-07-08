import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === '/favicon.ico') {
		throw redirect(301, '/favicon.svg');
	}
	return resolve(event);
};
