import { writable } from 'svelte/store';

/** Set to 'projects' or 'explore' to programmatically open that navbar dropdown. */
export const openNavDropdown = writable<'projects' | 'explore' | null>(null);
