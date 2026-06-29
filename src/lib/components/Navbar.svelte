<script lang="ts">
	import { Menu, X } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { navTheme } from '$lib/stores/navTheme';

	// observedTheme: driven by IntersectionObserver (fallback for all pages)
	// $navTheme: driven by GSAP onUpdate when a page sets it explicitly (frame-accurate)
	let observedTheme = $state<'dark' | 'light'>('dark');
	const currentTheme = $derived($navTheme ?? observedTheme);

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
			sections.forEach((s) => observer!.observe(s));
		}, 100);
	}

	afterNavigate(() => {
		setupObserver();
		setTimeout(setupObserver, 400);
		// Close any open dropdowns on route change
		ddClose('projects');
		ddClose('explore');
	});

	onMount(() => {
		setupObserver();
		return () => { if (observer) observer.disconnect(); };
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
	// Dark: translucent dark glass — saturation pulls background hues through
	// Light: translucent white glass — bright specular rim, ambient shadow below
	const capsuleClasses = $derived(
		currentTheme === 'dark'
			? 'bg-[rgba(8,8,16,0.40)] border-transparent shadow-[0_1px_0_rgba(255,255,255,0.22)_inset,0_-1px_0_rgba(0,0,0,0.50)_inset,1px_0_0_rgba(200,185,255,0.18)_inset,-1px_0_0_rgba(140,205,255,0.12)_inset,0_16px_52px_rgba(0,0,0,0.30),0_4px_16px_rgba(0,0,0,0.18)]'
			: 'bg-white/[0.38] border-transparent shadow-[0_1px_0_rgba(255,255,255,0.98)_inset,0_-1px_0_rgba(0,0,0,0.07)_inset,1px_0_0_rgba(200,185,255,0.14)_inset,-1px_0_0_rgba(140,205,255,0.10)_inset,0_14px_40px_rgba(0,0,0,0.09),0_2px_10px_rgba(0,0,0,0.05)]'
	);

	const logoClasses = $derived(currentTheme === 'dark' ? 'text-white' : 'text-black');

	const aboutLinkClasses = $derived(
		currentTheme === 'dark'
			? 'text-gray-300 bg-white/5 hover:bg-white/10 hover:text-white'
			: 'text-gray-700 bg-black/5 hover:bg-black/10 hover:text-black'
	);

	const navLinks = [
		{ name: 'About', href: '/about' },
		{ name: 'Contact', href: '/#contact' }
	];

	// ── Dropdown data ────────────────────────────────────────────────────────
	const mainProjects = [
		{ title: 'WPMU DEV Dashboard', sub: 'Design System · 2024', slug: 'wpmu-dev-dashboard', dot: '#2244CC' },
		{ title: 'Ideajam Kanban', sub: 'SaaS Redesign · 2024', slug: 'ideajam-kanban-saas', dot: '#e0533c' },
		{ title: 'Eclectic App', sub: 'Travel Tours · 2024', slug: 'eclectic-app-design', dot: '#14b8a6' },
		{ title: 'Neve Templates', sub: 'WordPress · 2023', slug: 'themeisle-starter-templates', dot: '#3b82f6' },
	];

	const conceptProjects = [
		{ title: 'Spotify Redesign', year: '2018', slug: 'spotify-redesign' },
		{ title: 'Effido Productivity', year: '2021', slug: 'effido-productivity-app' },
		{ title: 'WordPress Admin', year: '2020', slug: 'wordpress-redesign' },
		{ title: 'Discord Redesign', year: '2020', slug: 'discord-redesign' },
		{ title: 'Alt News Concept', year: '2020', slug: 'alt-news-concept' },
		{ title: 'Island Resort', year: '2020', slug: 'resort-island-design' },
	];

	// ── Dropdown state ───────────────────────────────────────────────────────
	let ddOpen = $state({ projects: false, explore: false });
	let ddPinned = $state({ projects: false, explore: false });
	const ddTimers: Record<string, ReturnType<typeof setTimeout> | undefined> = {};

	const ddOther = (k: 'projects' | 'explore') => k === 'projects' ? 'explore' : 'projects';

	function ddHoverOpen(k: 'projects' | 'explore') {
		// Closing the other on hover keeps only one open at a time
		ddClose(ddOther(k));
		clearTimeout(ddTimers[`${k}_close`]);
		ddOpen[k] = true;
	}

	function ddHoverClose(k: 'projects' | 'explore') {
		if (ddPinned[k]) return;
		// 150ms grace — snappy, not jittery
		ddTimers[`${k}_close`] = setTimeout(() => {
			if (!ddPinned[k]) ddOpen[k] = false;
		}, 150);
	}

	// Click: toggle close if already pinned, otherwise pin open (+ close sibling)
	function ddClick(k: 'projects' | 'explore') {
		if (ddOpen[k] && ddPinned[k]) {
			ddClose(k);
			return;
		}
		ddClose(ddOther(k));
		clearTimeout(ddTimers[`${k}_close`]);
		ddOpen[k] = true;
		ddPinned[k] = true;
		clearTimeout(ddTimers[`${k}_pin`]);
		ddTimers[`${k}_pin`] = setTimeout(() => {
			ddPinned[k] = false;
			ddOpen[k] = false;
		}, 8000);
	}

	function ddClose(k: 'projects' | 'explore') {
		ddOpen[k] = false;
		ddPinned[k] = false;
		clearTimeout(ddTimers[`${k}_close`]);
		clearTimeout(ddTimers[`${k}_pin`]);
	}
</script>

<!-- SVG filter — glass edge refraction (feDisplacementMap bends background at edges) -->
<svg style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">
	<defs>
		<filter id="glass-refract" x="-10%" y="-30%" width="120%" height="160%" color-interpolation-filters="linearRGB">
			<feTurbulence type="fractalNoise" baseFrequency="0.012 0.022" numOctaves="3" seed="7" result="noise"/>
			<feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G"/>
		</filter>
	</defs>
</svg>

<!-- FLOATING THEME-ADAPTIVE GLASS NAVIGATION BAR -->
<header
	class="fixed z-100 inset-x-0 top-6 px-4 md:px-6 flex justify-center pointer-events-none transition-all duration-300"
	aria-label="Main navigation"
>
	<div
		bind:this={capsuleEl}
		onmousemove={handleMouseMove}
		onmouseleave={handleMouseLeave}
		role="presentation"
		class="w-full max-w-[1320px] h-16 md:h-18 rounded-4xl flex items-center justify-between px-6 md:px-8 border pointer-events-auto transition-[background-color,box-shadow] duration-500 ease-out relative liquid-glass {capsuleClasses}"
	>

		<!-- Logo (Left) -->
		<a
			href="/"
			class="relative z-10 text-lg md:text-xl font-extrabold tracking-tight hover:opacity-90 transition-opacity flex items-center gap-1 {logoClasses}"
		>
			Hitanshu <span class="text-primary">Sahu</span>
		</a>

		<!-- Desktop Dropdown Navigation -->
		<nav aria-label="Desktop navigation" class="hidden md:flex items-center gap-0.5 relative z-10">

			<!-- Projects dropdown -->
			<div
				class="relative"
				role="none"
				onmouseenter={() => ddHoverOpen('projects')}
				onmouseleave={() => ddHoverClose('projects')}
			>
				<button
					type="button"
					onclick={() => ddClick('projects')}
					aria-expanded={ddOpen.projects}
					aria-haspopup="menu"
					class="dd-trigger {ddOpen.projects
						? (currentTheme === 'dark' ? 'dd-trigger-active-dark' : 'dd-trigger-active-light')
						: (currentTheme === 'dark' ? 'dd-trigger-dark' : 'dd-trigger-light')}"
				>
					Projects
					<svg class="dd-chevron {ddOpen.projects ? 'dd-chevron-open' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
					</svg>
				</button>

				{#if ddOpen.projects}
					<div class="nav-dropdown {currentTheme === 'dark' ? 'dd-dark' : 'dd-light'}" role="menu">
						<div class="dd-header {currentTheme === 'dark' ? 'dd-header-dark' : 'dd-header-light'}">
							<span>Selected Work</span><span>4 case studies</span>
						</div>
						{#each mainProjects as p}
							<a href="/work/{p.slug}" role="menuitem" class="nav-dd-item {currentTheme === 'dark' ? 'nav-dd-item-dark' : 'nav-dd-item-light'}" onclick={() => ddClose('projects')}>
								<span class="dd-dot" style="background:{p.dot}"></span>
								<div class="flex-1 min-w-0">
									<span class="dd-title">{p.title}</span>
									<span class="dd-sub">{p.sub}</span>
								</div>
								<svg class="dd-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l6-6-6-6"/>
								</svg>
							</a>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Explore (concepts) dropdown -->
			<div
				class="relative"
				role="none"
				onmouseenter={() => ddHoverOpen('explore')}
				onmouseleave={() => ddHoverClose('explore')}
			>
				<button
					type="button"
					onclick={() => ddClick('explore')}
					aria-expanded={ddOpen.explore}
					aria-haspopup="menu"
					class="dd-trigger {ddOpen.explore
						? (currentTheme === 'dark' ? 'dd-trigger-active-dark' : 'dd-trigger-active-light')
						: (currentTheme === 'dark' ? 'dd-trigger-dark' : 'dd-trigger-light')}"
				>
					Lab
					<svg class="dd-chevron {ddOpen.explore ? 'dd-chevron-open' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
					</svg>
				</button>

				{#if ddOpen.explore}
					<div class="nav-dropdown explore-dd {currentTheme === 'dark' ? 'dd-dark' : 'dd-light'}" role="menu">
						<div class="dd-header {currentTheme === 'dark' ? 'dd-header-dark' : 'dd-header-light'}">
							<span>Concepts & Explorations</span><span>6</span>
						</div>
						{#each conceptProjects as p}
							<a href="/work/{p.slug}" role="menuitem" class="nav-dd-item explore-item {currentTheme === 'dark' ? 'nav-dd-item-dark' : 'nav-dd-item-light'}" onclick={() => ddClose('explore')}>
								<span class="dd-title flex-1">{p.title}</span>
								<span class="dd-year">{p.year}</span>
							</a>
						{/each}
					</div>
				{/if}
			</div>

		</nav>

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
					<div class="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-neutral-900"></div>
				</div>
			</div>

			<!-- Contact CTA — always near-black, readable on any theme -->
			<a
				href="/#contact"
				class="hidden md:inline-flex bg-neutral-900 hover:bg-black text-white px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider items-center gap-2 transition-all active:scale-95 shadow-md shadow-black/20"
			>
				Contact Us
			</a>

			<!-- Mobile Only: Hamburger Toggle Button -->
			<button
				onclick={() => (isOpen = !isOpen)}
				class="inline-flex md:hidden bg-neutral-900 hover:bg-black text-white px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider items-center gap-2.5 transition-all active:scale-95 shadow-md shadow-black/20"
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
		class="fixed inset-0 z-60 bg-black/90 backdrop-blur-2xl flex flex-col justify-between p-8 md:p-16 transition-all duration-500"
		style="transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);"
	>
		<!-- Top Space Drawer Bar -->
		<div class="flex justify-between items-center w-full">
			<a
				href="/"
				class="text-2xl font-bold tracking-tight text-white flex items-center gap-1"
				onclick={() => (isOpen = false)}
			>
				Hitanshu <span class="text-primary">Sahu</span>
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
					class="text-4xl md:text-6xl font-bold tracking-tighter text-white hover:text-primary transition-colors flex items-center gap-4"
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
				<a href="mailto:phantomcluster17@gmail.com" class="text-white hover:text-primary transition-colors text-lg">
					phantomcluster17@gmail.com
				</a>
			</div>

			<!-- Social monochrome SVG icons -->
			<div class="flex items-center gap-6 md:justify-end flex-wrap">
				<a href="https://www.linkedin.com/in/phantom-cluster/" target="_blank" rel="noopener noreferrer" class="hover:text-primary text-white transition-all flex items-center gap-2 group text-xs font-bold uppercase tracking-wider">
					<svg aria-hidden="true" class="size-4 fill-neutral-400 group-hover:fill-primary transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7H9.33V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z"/>
					</svg>
					<span>LinkedIn</span>
				</a>

				<a href="https://dribbble.com/phantomcluster17" target="_blank" rel="noopener noreferrer" class="hover:text-primary text-white transition-all flex items-center gap-2 group text-xs font-bold uppercase tracking-wider">
					<svg aria-hidden="true" class="size-4 fill-neutral-400 group-hover:fill-primary transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.203c-.4-.108-3.54-.88-7.14-.383 1.498 4.13 2.106 7.412 2.193 7.846 2.92-1.716 4.83-4.757 4.947-7.463zm-6.386 8.358c-.136-.575-.794-3.99-2.39-8.156-4.225 1.182-8.318 1.258-8.822 1.258a9.887 9.887 0 0 0 6.16 6.945c.417-.674 2.593-5.26 5.05-7.047zm-12.016-8.9c.07-.008 4.79-.533 9.47-1.856a39.566 39.566 0 0 0-3.34-6.425 9.945 9.945 0 0 0-6.13 8.28zm8.103-8.84a37.28 37.28 0 0 1 3.2 6.143c3.553-1.332 5.02-3.218 5.163-3.414A9.92 9.92 0 0 0 11.82 4.415zm7.393 2.68c-.173.237-1.85 2.37-5.592 3.8 1.155 3.09 1.636 5.86 1.765 6.697 2.148-1.583 3.65-4.043 3.827-6.862v-3.635zM2.146 10.7c.394 0 5 .043 9.77-.96a36.438 36.438 0 0 0-2.92-5.787 9.914 9.914 0 0 0-6.85 6.747z"/>
					</svg>
					<span>Dribbble</span>
				</a>

				<a href="https://behance.net/phantomcluster" target="_blank" rel="noopener noreferrer" class="hover:text-primary text-white transition-all flex items-center gap-2 group text-xs font-bold uppercase tracking-wider">
					<svg aria-hidden="true" class="size-4 fill-neutral-400 group-hover:fill-primary transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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

	@keyframes subtle-nudge {
		0%, 85%, 100% { transform: translateX(0); opacity: 0.4; }
		88% { transform: translateX(3px); opacity: 1; }
		91% { transform: translateX(0); opacity: 0.4; }
		94% { transform: translateX(3px); opacity: 1; }
	}
	.attention-nudge {
		animation: subtle-nudge 6s infinite ease-in-out;
		will-change: transform, opacity;
	}

	/* ── LIQUID GLASS CORE ──────────────────────────────────────────────
	   16px blur (clear glass, not frosted milk) + 2.4x saturation (background
	   hues bleed through — the "liquid" color-pickup iOS 26 characteristic).
	   brightness/contrast simulate internal luminance of a lit glass object. */
	.liquid-glass {
		-webkit-backdrop-filter: blur(16px) saturate(2.4) brightness(1.07) contrast(1.03);
		backdrop-filter: blur(16px) saturate(2.4) brightness(1.07) contrast(1.03);
		transform: translateZ(0);
		will-change: transform;
	}

	/* ── SVG REFRACTION LAYER ───────────────────────────────────────────
	   Captures the backdrop with extra saturation, then feDisplacementMap
	   bends those pixels — background content appears to warp at the glass
	   edges exactly like a physical curved glass lens (iOS 26 "lensing").  */
	.liquid-glass::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		-webkit-backdrop-filter: blur(0px) saturate(2.8) brightness(1.05);
		backdrop-filter: blur(0px) saturate(2.8) brightness(1.05);
		filter: url(#glass-refract);
		opacity: 0.55;
		pointer-events: none;
		z-index: 0;
	}

	/* ── DROPDOWN TRIGGER BUTTONS ─────────────────────────────────────── */
	.dd-trigger {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 14px;
		font-weight: 700;
		padding: 7px 13px;
		border-radius: 12px;
		border: none;
		background: transparent;
		cursor: pointer;
		transition: background 0.14s ease, color 0.14s ease;
		letter-spacing: -0.01em;
	}
	.dd-trigger-dark        { color: rgba(255,255,255,0.52); }
	.dd-trigger-dark:hover  { color: #fff; background: rgba(255,255,255,0.13); }
	.dd-trigger-active-dark { color: #fff; background: rgba(255,255,255,0.15); }

	.dd-trigger-light        { color: rgba(0,0,0,0.52); }
	.dd-trigger-light:hover  { color: #000; background: rgba(0,0,0,0.09); }
	.dd-trigger-active-light { color: #000; background: rgba(0,0,0,0.10); }

	.dd-chevron {
		width: 11px; height: 11px;
		transition: transform 0.2s cubic-bezier(0.16,1,0.3,1);
		opacity: 0.7;
	}
	.dd-chevron-open { transform: rotate(180deg); }

	/* ── DROPDOWN PANELS ───────────────────────────────────────────────── */
	.nav-dropdown {
		position: absolute;
		top: calc(100% + 8px);
		left: 0;
		min-width: 256px;
		border-radius: 18px;
		overflow: hidden;
		z-index: 200;
		-webkit-backdrop-filter: blur(24px) saturate(2.0) brightness(1.05);
		backdrop-filter: blur(24px) saturate(2.0) brightness(1.05);
		animation: dd-appear 0.18s cubic-bezier(0.16, 1, 0.3, 1) both;
	}
	.explore-dd { min-width: 226px; }

	.dd-dark {
		background: rgba(11, 11, 20, 0.93);
		border: 1px solid rgba(255,255,255,0.11);
		box-shadow:
			0 1px 0 rgba(255,255,255,0.15) inset,
			0 -1px 0 rgba(0,0,0,0.5) inset,
			0 24px 64px rgba(0,0,0,0.55),
			0 8px 24px rgba(0,0,0,0.30);
	}
	.dd-light {
		background: rgba(250,250,253,0.96);
		border: 1px solid rgba(0,0,0,0.07);
		box-shadow:
			0 1px 0 rgba(255,255,255,1) inset,
			0 20px 56px rgba(0,0,0,0.13),
			0 4px 12px rgba(0,0,0,0.07);
	}

	@keyframes dd-appear {
		from { opacity: 0; transform: translateY(-8px) scale(0.96); }
		to   { opacity: 1; transform: translateY(0) scale(1); }
	}

	/* ── DROPDOWN HEADER ─────────────────────────────────────────────── */
	.dd-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 11px 16px 9px;
		font-size: 9px;
		font-family: var(--font-mono, monospace);
		letter-spacing: 0.18em;
		text-transform: uppercase;
	}
	.dd-header-dark  { color: rgba(255,255,255,0.25); border-bottom: 1px solid rgba(255,255,255,0.07); }
	.dd-header-light { color: rgba(0,0,0,0.30); border-bottom: 1px solid rgba(0,0,0,0.07); }

	/* ── DROPDOWN ITEMS ─────────────────────────────────────────────── */
	.nav-dd-item {
		display: flex;
		align-items: center;
		gap: 11px;
		padding: 10px 16px;
		text-decoration: none;
		cursor: pointer;
		transition: background 0.12s ease;
	}
	.nav-dd-item:last-child { margin-bottom: 4px; }

	.nav-dd-item-light        { color: #111; border-bottom: 1px solid rgba(0,0,0,0.05); }
	.nav-dd-item-light:last-child { border-bottom: none; }
	.nav-dd-item-light:hover  { background: rgba(0,0,0,0.07); }
	.nav-dd-item-light:hover .dd-arrow { opacity: 0.5; transform: translateX(0); }

	.nav-dd-item-dark        { color: rgba(255,255,255,0.88); border-bottom: 1px solid rgba(255,255,255,0.06); }
	.nav-dd-item-dark:last-child { border-bottom: none; }
	.nav-dd-item-dark:hover  { background: rgba(255,255,255,0.12); }
	.nav-dd-item-dark:hover .dd-arrow { opacity: 0.55; transform: translateX(0); }

	/* Accent dot */
	.dd-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; margin-top: 2px; }

	/* Title */
	.dd-title { display: block; font-size: 13px; font-weight: 700; line-height: 1.3; letter-spacing: -0.015em; }

	/* Sub-label */
	.dd-sub { display: block; font-size: 10px; font-family: var(--font-mono,monospace); letter-spacing: 0.06em; text-transform: uppercase; opacity: 0.38; margin-top: 1px; }

	/* Year chip — explore items */
	.dd-year { font-size: 9px; font-family: var(--font-mono,monospace); letter-spacing: 0.15em; text-transform: uppercase; opacity: 0.35; flex-shrink: 0; }

	/* Arrow — hidden, slides in on item hover */
	.dd-arrow {
		width: 13px; height: 13px; flex-shrink: 0;
		opacity: 0;
		transform: translateX(-5px);
		transition: opacity 0.14s ease, transform 0.14s ease;
	}

	/* ── LENS BUBBLE + MOUSE CAUSTIC ────────────────────────────────────
	   Top ellipse: overhead light hitting the curved glass top — creates
	   the 3D depth illusion that flat frosted glass lacks.
	   Mouse radial: interactive caustic highlight (light focusing through glass). */
	.liquid-glass::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background:
			radial-gradient(ellipse 72% 58% at 50% -10%, rgba(255, 255, 255, 0.22) 0%, transparent 62%),
			radial-gradient(ellipse 30% 65% at 8% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 70%),
			radial-gradient(220px circle at var(--mouse-x, -200px) var(--mouse-y, 50%),
				rgba(255, 255, 255, calc(var(--opacity, 0) * 0.28)) 0%,
				transparent 75%
			);
		pointer-events: none;
		z-index: 0;
	}
</style>
