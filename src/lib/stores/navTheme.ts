import { writable } from 'svelte/store';

// null = let the IntersectionObserver in Navbar decide (all pages except WPMU DEV)
// 'dark' | 'light' = GSAP is driving the theme directly
export const navTheme = writable<'dark' | 'light' | null>(null);
