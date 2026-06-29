<script lang="ts">
	import { Menu, X } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import { navTheme } from '$lib/stores/navTheme';

	// observedTheme: driven by IntersectionObserver (fallback for all pages)
	// $navTheme: driven by GSAP onUpdate when a page sets it explicitly (frame-accurate)
	let observedTheme = $state<'dark' | 'light'>('dark');
	const currentTheme = $derived($navTheme ?? observedTheme);

	let isScrolled = $state(false);
	let isOpen = $state(false);
	let capsuleEl = $state<HTMLElement | null>(null);
	let observer: IntersectionObserver | null = null;

	function setupObserver() {
		if (observer) observer.disconnect();
		
		// Small delay to allow SvelteKit layout transitions to mount the new page
		setTimeout(() => {
			const sections = document.querySelectorAll('[data-theme]');
			observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							const t = entry.target.getAttribute('data-theme') as 'dark' | 'light';
							if (t) observedTheme = t;
						}
					});
				},
				// Fire when a section's top edge crosses 80px from viewport top
				{ rootMargin: '-80px 0px -80% 0px' }
			);
			sections.forEach((s) => observer.observe(s));
		}, 100);
	}

	afterNavigate(() => {
		setupObserver();
		// Fallback setup in case of slow page transitions
		setTimeout(setupObserver, 400);
	});

	onMount(() => {
		// Scroll state
		const handleScroll = () => { isScrolled = window.scrollY > 40; };
		window.addEventListener('scroll', handleScroll, { passive: true });
		
		setupObserver();

		return () => {
			window.removeEventListener('scroll', handleScroll);
			if (observer) observer.disconnect();
		};
	});

	function handleMouseMove(e: MouseEvent) {
		if (!capsuleEl) return;
		const rect = capsuleEl.getBoundingClientRect();
		capsuleEl.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
		capsuleEl.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
		capsuleEl.style.setProperty('--opacity', '1');
	}

	function handleMouseLeave() {
		if (!capsuleEl) return;
		capsuleEl.style.setProperty('--opacity', '0');
	}

	// Reactive class sets driven by currentTheme
	const capsuleClasses = $derived(
		currentTheme === 'dark'
			? 'bg-white/[0.04] border-white/10 hover:bg-white/[0.07] hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.07)]'
			: 'bg-white/80 border-gray-200 hover:bg-white/95 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]'
	);

	const logoClasses = $derived(currentTheme === 'dark' ? 'text-white' : 'text-black');

	const aboutLinkClasses = $derived(
		currentTheme === 'dark'
			? 'text-gray-300 bg-white/5 hover:bg-white/10 hover:text-white'
			: 'text-gray-700 bg-black/5 hover:bg-black/10 hover:text-black'
	);

	const linkClasses = $derived((isActive: boolean) =>
		isActive
			? 'bg-[#f53500]/10 text-[#f53500] rounded-[20px]'
			: currentTheme === 'dark'
				? 'text-gray-400 hover:text-white'
				: 'text-gray-700 hover:text-black'
	);

	const navLinks = [
		{ name: 'Projects', href: '/#projects' },
		{ name: 'Studio', href: '/#studio' },
		{ name: 'Blog', href: '/#blog' },
		{ name: 'About', href: '/about' },
		{ name: 'Contact', href: '/#contact' }
	];
</script>

<!-- FLOATING THEME-ADAPTIVE GLASS NAVIGATION BAR -->
<header
	class="fixed z-[100] inset-x-0 top-6 px-4 md:px-6 flex justify-center pointer-events-none transition-all duration-300"
	aria-label="Main navigation"
>
	<div
		bind:this={capsuleEl}
		onmousemove={handleMouseMove}
		onmouseleave={handleMouseLeave}
		role="presentation"
		class="w-full max-w-[1320px] h-16 md:h-18 rounded-full flex items-center justify-between px-6 md:px-8 border pointer-events-auto transition-all duration-300 backdrop-blur-2xl saturate-[1.8] shadow-lg relative interactive-glow {capsuleClasses}"
	>

		<!-- Logo (Left) -->
		<a
			href="/"
			class="relative z-10 text-lg md:text-xl font-extrabold tracking-tight hover:opacity-90 transition-opacity flex items-center gap-1 {logoClasses}"
		>
			Hitanshu <span class="text-[#FF4400]">Sahu</span>
		</a>

		<!-- Minimal Center Menu Links (Desktop Only) -->
		<div class="hidden md:flex items-center gap-8 relative z-10">
			{#each navLinks.filter(l => l.name !== 'Contact' && l.name !== 'About') as link}
				<div class="relative group flex items-center justify-center">
					<a
						href={link.href}
						class="text-[14px] font-bold px-4 py-1.5 transition-colors duration-200 {linkClasses($page.url.pathname === link.href)}"
					>
						{link.name}
					</a>
				</div>
			{/each}
		</div>

		<!-- Desktop Action Button vs Mobile Hamburger (Right) -->
		<div class="flex items-center gap-3 relative z-10">

			<!-- About Pill with Tooltip (Desktop Only) -->
			<div class="hidden md:block relative group">
				<a
					href="/about"
					class="relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 {aboutLinkClasses}"
				>
					About
					<svg class="attention-nudge w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
					</svg>
				</a>

				<!-- Motion Tooltip (Desktop Only) -->
				<div class="absolute top-[130%] left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-neutral-900 text-white text-[11px] font-medium rounded-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl">
					View Capabilities &amp; Credentials
					<div class="absolute bottom-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-b-neutral-900"></div>
				</div>
			</div>

			<!-- Contact CTA — solid brand-orange, universally readable on any theme -->
			<a
				href="/#contact"
				class="hidden md:inline-flex bg-[#FF4400] hover:bg-[#e03d00] text-white px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider items-center gap-2 transition-all active:scale-95 shadow-md shadow-[#FF4400]/20"
			>
				Contact Us
			</a>

			<!-- Mobile Only: Hamburger Toggle Button -->
			<button
				onclick={() => (isOpen = !isOpen)}
				class="inline-flex md:hidden bg-[#FF4400] hover:bg-[#e03d00] text-white px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider items-center gap-2.5 transition-all active:scale-95 shadow-md shadow-[#FF4400]/20"
				aria-label="Toggle navigation menu"
			>
				<span>Menu</span>
				{#if isOpen}
					<X class="size-3.5 text-white animate-spin-once" />
				{:else}
					<Menu class="size-3.5 text-white" />
				{/if}
			</button>
		</div>
	</div>
</header>

<!-- Slide-Out Mobile Navigation Sheet Drawer Overlay -->
{#if isOpen}
	<div
		class="fixed inset-0 z-[60] bg-black/90 backdrop-blur-2xl flex flex-col justify-between p-8 md:p-16 transition-all duration-500"
		style="transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);"
	>
		<!-- Top Space Drawer Bar -->
		<div class="flex justify-between items-center w-full">
			<a
				href="/"
				class="text-2xl font-bold tracking-tight text-white flex items-center gap-1"
				onclick={() => (isOpen = false)}
			>
				Hitanshu <span class="text-[#FF4400]">Sahu</span>
			</a>

			<button
				onclick={() => (isOpen = false)}
				class="border border-white/10 text-white rounded-full p-3 hover:bg-white/5 transition-all"
				aria-label="Close menu"
			>
				<X class="size-5" />
			</button>
		</div>

		<!-- Center Links Stack -->
		<nav class="flex flex-col gap-6 my-auto">
			{#each navLinks as link, index}
				<a
					href={link.href}
					class="text-4xl md:text-6xl font-bold tracking-tighter text-white hover:text-[#FF4400] transition-colors flex items-center gap-4"
					onclick={() => (isOpen = false)}
				>
					<span class="text-xs font-mono text-neutral-600">0{index + 1}</span>
					{link.name}
				</a>
			{/each}
		</nav>

		<!-- Bottom Details: Social Icons -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10 w-full text-sm text-neutral-400">
			<div>
				<p class="font-mono text-xs text-neutral-600 mb-2 uppercase tracking-wider">Get in touch</p>
				<a href="mailto:phantomcluster17@gmail.com" class="text-white hover:text-[#FF4400] transition-colors text-lg">
					phantomcluster17@gmail.com
				</a>
			</div>

			<!-- Social monochrome SVG icons -->
			<div class="flex items-center gap-6 md:justify-end flex-wrap">
				<a href="https://www.linkedin.com/in/phantom-cluster/" target="_blank" rel="noopener noreferrer" class="hover:text-[#FF4400] text-white transition-all flex items-center gap-2 group text-xs font-bold uppercase tracking-wider">
					<svg aria-hidden="true" class="size-4 fill-neutral-400 group-hover:fill-[#FF4400] transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7H9.33V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z"/>
					</svg>
					<span>LinkedIn</span>
				</a>

				<a href="https://dribbble.com/phantomcluster17" target="_blank" rel="noopener noreferrer" class="hover:text-[#FF4400] text-white transition-all flex items-center gap-2 group text-xs font-bold uppercase tracking-wider">
					<svg aria-hidden="true" class="size-4 fill-neutral-400 group-hover:fill-[#FF4400] transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.203c-.4-.108-3.54-.88-7.14-.383 1.498 4.13 2.106 7.412 2.193 7.846 2.92-1.716 4.83-4.757 4.947-7.463zm-6.386 8.358c-.136-.575-.794-3.99-2.39-8.156-4.225 1.182-8.318 1.258-8.822 1.258a9.887 9.887 0 0 0 6.16 6.945c.417-.674 2.593-5.26 5.05-7.047zm-12.016-8.9c.07-.008 4.79-.533 9.47-1.856a39.566 39.566 0 0 0-3.34-6.425 9.945 9.945 0 0 0-6.13 8.28zm8.103-8.84a37.28 37.28 0 0 1 3.2 6.143c3.553-1.332 5.02-3.218 5.163-3.414A9.92 9.92 0 0 0 11.82 4.415zm7.393 2.68c-.173.237-1.85 2.37-5.592 3.8 1.155 3.09 1.636 5.86 1.765 6.697 2.148-1.583 3.65-4.043 3.827-6.862v-3.635zM2.146 10.7c.394 0 5 .043 9.77-.96a36.438 36.438 0 0 0-2.92-5.787 9.914 9.914 0 0 0-6.85 6.747z"/>
					</svg>
					<span>Dribbble</span>
				</a>

				<a href="https://behance.net/phantomcluster" target="_blank" rel="noopener noreferrer" class="hover:text-[#FF4400] text-white transition-all flex items-center gap-2 group text-xs font-bold uppercase tracking-wider">
					<svg aria-hidden="true" class="size-4 fill-neutral-400 group-hover:fill-[#FF4400] transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M22 7h-7v1.5h7V7zm1.5 5.5c-.015-3.323-2.155-5.228-5.323-5.228-3.215 0-5.394 2.115-5.394 5.385s2.2 5.343 5.485 5.343c2.4 0 4.156-1.077 4.88-2.615l-2.09-.983c-.415.86-1.283 1.54-2.67 1.54-1.63 0-2.6-1-2.73-2.316h7.525c.015-.224.016-.47.016-.726zm-7.665-.77c.105-1.285.955-2.073 2.45-2.073 1.413 0 2.296.8 2.38 2.073h-4.83zm-10.155.27c1.37 0 2.36-.615 2.36-1.785 0-1.046-.86-1.584-2.18-1.584H3v3.37h.68zm-.55 4.3c1.55 0 2.65-.675 2.65-2 0-1.26-1.015-1.77-2.6-1.77H3v3.77h.78zM0 3.5h4.63c3.06 0 4.88 1.416 4.88 3.523 0 1.585-.92 2.693-2.34 3.123 1.83.4 2.88 1.63 2.88 3.554 0 2.46-1.92 4.3-5.06 4.3H0V3.5z"/>
					</svg>
					<span>Behance</span>
				</a>
			</div>
		</div>
	</div>
{/if}

<style>
	@keyframes spin-once {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(180deg); }
	}
	:global(.animate-spin-once) {
		animation: spin-once 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	/* 6-second cycle: Rests for ~5 seconds, nudges quickly, then rests again */
	@keyframes subtle-nudge {
		0%, 85%, 100% { transform: translateX(0); opacity: 0.4; }
		88% { transform: translateX(3px); opacity: 1; color: #FF4400; }
		91% { transform: translateX(0); opacity: 0.4; }
		94% { transform: translateX(3px); opacity: 1; color: #FF4400; }
	}
	.attention-nudge {
		animation: subtle-nudge 6s infinite ease-in-out;
		will-change: transform, opacity;
	}

	/* Interactive mouse glow */
	.interactive-glow::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: radial-gradient(
			250px circle at var(--mouse-x, 0px) var(--mouse-y, 0px),
			rgba(255, 255, 255, 0.5),
			transparent 80%
		);
		opacity: var(--opacity, 0);
		transition: opacity 0.4s ease;
		pointer-events: none;
		z-index: -1;
	}
</style>
