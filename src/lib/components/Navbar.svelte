<script lang="ts">
	import { Menu, X } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { navTheme } from '$lib/stores/navTheme';
	import { openNavDropdown } from '$lib/stores/navDropdown';

	// observedTheme: driven by IntersectionObserver (fallback for all pages)
	// $navTheme: driven by GSAP onUpdate when a page sets it explicitly (frame-accurate)
	let observedTheme = $state<'dark' | 'light'>('dark');
	const currentTheme = $derived($navTheme ?? observedTheme);

	let isOpen = $state(false);
	let mobileExpanded = $state<'projects' | 'lab' | null>(null);
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

	// When another component sets openNavDropdown, open the requested dropdown.
	$effect(() => {
		const k = $openNavDropdown;
		if (k) {
			ddClick(k);
			openNavDropdown.set(null);
		}
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

	// Dark: translucent dark glass — saturation pulls background hues through
	// Light: warm parchment glass (#F4F0E8 tinted) — contrast opposite of dark
	const capsuleClasses = $derived(
		currentTheme === 'dark'
			? 'bg-[rgba(8,8,16,0.40)] border-transparent shadow-[0_1px_0_rgba(255,255,255,0.22)_inset,0_-1px_0_rgba(0,0,0,0.50)_inset,1px_0_0_rgba(200,185,255,0.18)_inset,-1px_0_0_rgba(140,205,255,0.12)_inset,0_16px_52px_rgba(0,0,0,0.30),0_4px_16px_rgba(0,0,0,0.18)]'
			: 'bg-[rgba(244,240,232,0.72)] border-transparent shadow-[0_1px_0_rgba(255,255,255,1)_inset,0_-1px_0_rgba(27,25,22,0.06)_inset,1px_0_0_rgba(200,185,170,0.20)_inset,-1px_0_0_rgba(180,195,175,0.14)_inset,0_14px_40px_rgba(27,25,22,0.10),0_2px_10px_rgba(27,25,22,0.06)]'
	);

	// ── Dropdown data ────────────────────────────────────────────────────────
	const mainProjects = [
		{ title: 'WPMU DEV Dashboard', sub: 'Design System', slug: 'wpmu-dev-dashboard', dot: '#2244CC' },
		{ title: 'Ideajam Kanban', sub: 'SaaS Redesign', slug: 'ideajam-kanban-saas', dot: '#e0533c' },
		{ title: 'Eclectic App', sub: 'Travel & Tours', slug: 'eclectic-app-design', dot: '#14b8a6' },
		{ title: 'Neve Templates', sub: 'WordPress', slug: 'themeisle-starter-templates', dot: '#3b82f6' },
	];

	const conceptProjects = [
		{ title: 'Spotify Redesign', year: '2018', slug: 'spotify-redesign' },
		{ title: 'Effido Productivity', year: '2021', slug: 'effido-productivity-app' },
		{ title: 'WordPress Admin', year: '2020', slug: 'wordpress-redesign' },
		{ title: 'Discord Redesign', year: '2020', slug: 'discord-redesign' },
		{ title: 'Alt News Concept', year: '2020', slug: 'alt-news-concept' },
	];

	// ── Dropdown state ───────────────────────────────────────────────────────
	let ddOpen = $state({ projects: false, explore: false });
	let ddPinned = $state({ projects: false, explore: false });
	const ddTimers: Record<string, ReturnType<typeof setTimeout> | undefined> = {};

	const ddOther = (k: 'projects' | 'explore') => k === 'projects' ? 'explore' : 'projects';

	function ddHoverOpen(k: 'projects' | 'explore') {
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

		<!-- LEFT: Stacked wordmark + hairline + availability pill -->
		<div class="flex items-center gap-5 shrink-0 relative z-10">

			<a href="/" class="flex flex-col leading-none group">
				<span class="text-[1.05rem] font-black tracking-[-0.04em] transition-opacity group-hover:opacity-75 {currentTheme === 'dark' ? 'text-white' : 'text-[#1B1916]'}">
					HITANSHU SAHU
				</span>
				<span class="text-[8.5px] font-mono tracking-[0.22em] uppercase mt-[3px] {currentTheme === 'dark' ? 'text-white/30' : 'text-black/35'}">
					Product Designer
				</span>
			</a>

			<!-- Hairline divider -->
			<span class="hidden lg:block w-px h-7 shrink-0 {currentTheme === 'dark' ? 'bg-white/10' : 'bg-black/10'}"></span>

			<!-- Availability pill -->
			<div class="hidden lg:inline-flex items-center gap-2 rounded-full px-3 py-1.5
				{currentTheme === 'dark'
					? 'bg-emerald-500/10 border border-emerald-500/20'
					: 'bg-emerald-700/[0.06] border border-emerald-700/15'}">
				<span class="relative flex h-1.5 w-1.5">
					<span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70
						{currentTheme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-600'}"></span>
					<span class="relative inline-flex rounded-full h-1.5 w-1.5
						{currentTheme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-600'}"></span>
				</span>
				<span class="text-[9px] font-mono tracking-[0.18em] uppercase whitespace-nowrap
					{currentTheme === 'dark' ? 'text-emerald-400/80' : 'text-emerald-700/75'}">
					Open to join a team
				</span>
			</div>
		</div>

		<!-- CENTER: Desktop nav links -->
		<nav aria-label="Desktop navigation" class="hidden md:flex items-center gap-0.5 relative z-10">

			<!-- Work (Projects) dropdown -->
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
						: (currentTheme === 'dark' ? 'dd-trigger-dark dd-work-glow-dark' : 'dd-trigger-light dd-work-glow-light')}"
				>
					Work
					<svg class="dd-chevron {ddOpen.projects ? 'dd-chevron-open' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
					</svg>
				</button>

				{#if ddOpen.projects}
					<div class="nav-dropdown {currentTheme === 'dark' ? 'dd-dark' : 'dd-light'}" role="menu">
						<div class="dd-header {currentTheme === 'dark' ? 'dd-header-dark' : 'dd-header-light'}">
							<span>Case Studies</span><span>{mainProjects.length}</span>
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

			<!-- Lab (Explore) dropdown -->
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
							<span>Concepts &amp; Explorations</span><span>{conceptProjects.length}</span>
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

			<!-- About -->
			<a
				href="/about"
				class="dd-trigger {currentTheme === 'dark' ? 'dd-trigger-dark' : 'dd-trigger-light'}"
			>
				About
			</a>

		</nav>

		<!-- RIGHT: Resume ghost pill + Hire Me CTA + mobile hamburger -->
		<div class="flex items-center gap-2 relative z-10">

			<!-- Resume ghost pill (desktop) -->
			<a
				href="/Hitanshu_Sahu___Resume_JUN_Updated.pdf"
				target="_blank"
				rel="noopener noreferrer"
				class="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-150
					{currentTheme === 'dark'
						? 'text-white/50 border border-white/10 hover:text-white hover:border-white/30'
						: 'text-black/45 border border-black/10 hover:text-black hover:border-black/25'}"
			>
				Resume
				<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
				</svg>
			</a>

			<!-- Hire Me CTA — inverts between themes for max contrast -->
			<a
				href="/#contact"
				class="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-wider active:scale-95 transition-all duration-150
					{currentTheme === 'dark'
						? 'text-black bg-white hover:bg-white/90 shadow-lg shadow-black/40'
						: 'text-white bg-[#1B1916] hover:bg-[#2a2620] shadow-lg shadow-black/15'}"
			>
				<span class="relative flex h-1.5 w-1.5">
					<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-80"></span>
					<span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
				</span>
				Hire Me
			</a>

			<!-- Mobile hamburger -->
			<button
				onclick={() => (isOpen = !isOpen)}
				class="inline-flex md:hidden items-center gap-2 px-4 py-2.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all
					{currentTheme === 'dark'
						? 'text-white border border-white/15 hover:bg-white/10'
						: 'text-black border border-black/12 hover:bg-black/05'}"
				aria-label="Toggle navigation menu"
			>
				{#if isOpen}
					<X class="size-3.5 animate-spin-once" />
				{:else}
					<Menu class="size-3.5" />
				{/if}
				<span>Menu</span>
			</button>
		</div>
	</div>
</header>

<!-- Slide-Out Mobile Navigation Drawer -->
{#if isOpen}
	<div
		class="fixed inset-0 z-[999] bg-[#0E0D0C]/96 backdrop-blur-2xl flex flex-col justify-between p-8 md:p-16"
		style="transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);"
	>
		<!-- Top bar -->
		<div class="flex justify-between items-center w-full">
			<a
				href="/"
				onclick={() => (isOpen = false)}
				class="flex flex-col leading-none"
			>
				<span class="text-white font-black tracking-[-0.04em] text-xl">HITANSHU SAHU</span>
				<span class="text-[9px] font-mono tracking-[0.2em] text-white/30 uppercase mt-0.5">Product Designer</span>
			</a>

			<button
				onclick={() => (isOpen = false)}
				class="border border-white/10 text-white rounded-full p-3 hover:bg-white/5 transition-all"
				aria-label="Close menu"
			>
				<X class="size-5" />
			</button>
		</div>

		<!-- Center nav stack -->
		<nav class="flex flex-col gap-1 my-auto">

			<!-- Work accordion -->
			<button
				type="button"
				onclick={() => mobileExpanded = mobileExpanded === 'projects' ? null : 'projects'}
				class="flex items-center justify-between w-full text-4xl font-bold tracking-tighter text-white py-3 hover:text-primary transition-colors"
			>
				<span class="flex items-center gap-4">
					<span class="text-xs font-mono text-neutral-600">01</span>
					Work
				</span>
				<svg class="w-5 h-5 opacity-40 transition-transform duration-300 {mobileExpanded === 'projects' ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
				</svg>
			</button>
			{#if mobileExpanded === 'projects'}
				<div class="flex flex-col gap-0 pl-10 mb-2">
					{#each mainProjects as p}
						<a
							href="/work/{p.slug}"
							onclick={() => { isOpen = false; mobileExpanded = null; }}
							class="flex items-center gap-3 py-3 border-b border-white/5 last:border-0 group"
						>
							<span class="w-2 h-2 rounded-full shrink-0" style="background:{p.dot}"></span>
							<div class="flex-1 min-w-0">
								<span class="block text-base font-bold text-white/90 group-hover:text-white transition-colors">{p.title}</span>
								<span class="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest mt-0.5">{p.sub}</span>
							</div>
							<svg class="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 18l6-6-6-6"/>
							</svg>
						</a>
					{/each}
				</div>
			{/if}

			<!-- Lab accordion -->
			<button
				type="button"
				onclick={() => mobileExpanded = mobileExpanded === 'lab' ? null : 'lab'}
				class="flex items-center justify-between w-full text-4xl font-bold tracking-tighter text-white py-3 hover:text-primary transition-colors"
			>
				<span class="flex items-center gap-4">
					<span class="text-xs font-mono text-neutral-600">02</span>
					Lab
				</span>
				<svg class="w-5 h-5 opacity-40 transition-transform duration-300 {mobileExpanded === 'lab' ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
				</svg>
			</button>
			{#if mobileExpanded === 'lab'}
				<div class="flex flex-col gap-0 pl-10 mb-2">
					{#each conceptProjects as p}
						<a
							href="/work/{p.slug}"
							onclick={() => { isOpen = false; mobileExpanded = null; }}
							class="flex items-center justify-between py-3 border-b border-white/5 last:border-0 group"
						>
							<span class="text-base font-bold text-white/90 group-hover:text-white transition-colors">{p.title}</span>
							<span class="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">{p.year}</span>
						</a>
					{/each}
				</div>
			{/if}

			<!-- About -->
			<a
				href="/about"
				class="text-4xl font-bold tracking-tighter text-white py-3 hover:text-primary transition-colors flex items-center gap-4"
				onclick={() => (isOpen = false)}
			>
				<span class="text-xs font-mono text-neutral-600">03</span>
				About
			</a>

			<!-- Resume -->
			<a
				href="/Hitanshu_Sahu___Resume_JUN_Updated.pdf"
				target="_blank"
				rel="noopener noreferrer"
				class="text-4xl font-bold tracking-tighter text-white py-3 hover:text-primary transition-colors flex items-center gap-4"
				onclick={() => (isOpen = false)}
			>
				<span class="text-xs font-mono text-neutral-600">04</span>
				Resume ↗
			</a>

		</nav>

		<!-- Hire Me full-width CTA -->
		<a
			href="/#contact"
			onclick={() => (isOpen = false)}
			class="mt-8 w-full flex items-center justify-center gap-2 bg-white text-black px-6 py-4 rounded-2xl font-black uppercase tracking-wider text-sm"
		>
			<span class="w-2 h-2 rounded-full bg-emerald-500"></span>
			Hire Me
		</a>

		<!-- Bottom: email + socials -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 mt-6 border-t border-white/10 w-full text-sm text-neutral-400">
			<div>
				<p class="font-mono text-xs text-neutral-600 mb-2 uppercase tracking-wider">Get in touch</p>
				<a href="mailto:phantomcluster17@gmail.com" class="text-white hover:text-primary transition-colors text-lg">
					phantomcluster17@gmail.com
				</a>
			</div>

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
		text-decoration: none;
	}
	.dd-trigger-dark        { color: rgba(255,255,255,0.52); }
	.dd-trigger-dark:hover  { color: #fff; background: rgba(255,255,255,0.13); }
	.dd-trigger-active-dark { color: #fff; background: rgba(255,255,255,0.15); }

	.dd-trigger-light        { color: rgba(0,0,0,0.52); }
	.dd-trigger-light:hover  { color: #1B1916; background: rgba(0,0,0,0.08); }
	.dd-trigger-active-light { color: #1B1916; background: rgba(0,0,0,0.09); }

	.dd-chevron {
		width: 11px; height: 11px;
		transition: transform 0.2s cubic-bezier(0.16,1,0.3,1);
		opacity: 0.7;
	}
	.dd-chevron-open { transform: rotate(180deg); }

	/* ── WORK LINK GLOW PULSE ───────────────────────────────────────────
	   Dark bg: white glow. Light bg: muted dark shimmer. */
	@keyframes work-glow-dark {
		0%, 100% { color: rgba(255,255,255,0.55); background: transparent; box-shadow: 0 0 0 transparent; }
		50%       { color: #fff; background: rgba(255,255,255,0.08); box-shadow: 0 0 18px rgba(255,255,255,0.12), 0 0 6px rgba(255,255,255,0.08); }
	}
	.dd-work-glow-dark {
		animation: work-glow-dark 2.8s ease-in-out infinite;
	}
	.dd-work-glow-dark:hover,
	.dd-trigger-active-dark.dd-work-glow-dark {
		animation: none;
		color: #fff;
		background: rgba(255,255,255,0.13);
		box-shadow: none;
	}

	@keyframes work-glow-light {
		0%, 100% { color: rgba(0,0,0,0.52); background: transparent; }
		50%       { color: #1B1916; background: rgba(0,0,0,0.06); }
	}
	.dd-work-glow-light {
		animation: work-glow-light 2.8s ease-in-out infinite;
	}
	.dd-work-glow-light:hover,
	.dd-trigger-active-light.dd-work-glow-light {
		animation: none;
		color: #1B1916;
		background: rgba(0,0,0,0.08);
	}

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
		background: rgba(248,245,238,0.97);
		border: 1px solid rgba(27,25,22,0.08);
		box-shadow:
			0 1px 0 rgba(255,255,255,1) inset,
			0 20px 56px rgba(27,25,22,0.12),
			0 4px 12px rgba(27,25,22,0.07);
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
	.dd-header-light { color: rgba(27,25,22,0.30); border-bottom: 1px solid rgba(27,25,22,0.08); }

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

	.nav-dd-item-light        { color: #1B1916; border-bottom: 1px solid rgba(27,25,22,0.06); }
	.nav-dd-item-light:last-child { border-bottom: none; }
	.nav-dd-item-light:hover  { background: rgba(27,25,22,0.06); }
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
