<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { cubicOut, cubicIn } from 'svelte/easing';

	interface Props { currentSlug?: string; }
	let { currentSlug = '' }: Props = $props();

	const allProjects = [
		{
			slug: 'wpmu-dev-dashboard', title: 'WPMU DEV', sub: 'Dashboard & Plugin System',
			hookStat: '+47%', hookLabel: 'Pro Conversions',
			impact: '2M → 3M installs. Atomic system across 200+ plugins.',
			desc: 'Redesigned the WPMU DEV dashboard and plugin ecosystem for 3M+ active WordPress professionals — reducing churn and driving pro conversions through cleaner information hierarchy.',
			accent: '#2244CC', pills: ['2M → 3M installs', '−37% bounce', 'Atomic system'],
			year: '2022–24', role: 'Product Designer', type: 'Work',
		},
		{
			slug: 'ideajam-kanban-saas', title: 'Ideajam', sub: 'Kanban SaaS Redesign',
			hookStat: '−68%', hookLabel: 'Task Steps',
			impact: '11 steps → 3.5 avg. Zero-training enterprise UX.',
			desc: 'Rebuilt a B2B Kanban SaaS from the ground up with a white-label system, collapsible sidebars, and a drag-and-drop model that eliminated onboarding friction entirely.',
			accent: '#e0533c', pills: ['White-label system', 'B2B SaaS', 'Zero-training UX'],
			year: '2021–22', role: 'UI/UX Designer', type: 'Work',
		},
		{
			slug: 'eclectic-app-design', title: 'Eclectic', sub: 'AI-Powered Travel App',
			hookStat: '3×', hookLabel: 'Regional Markets',
			impact: 'One codebase. Three markets. Eight languages.',
			desc: 'Designed a mobile-first AI travel app with a generative asset pipeline and a DLS built for simultaneous deployment across Asia-Pacific, MENA, and Latin America.',
			accent: '#14b8a6', pills: ['AI asset pipeline', 'Mobile-first DLS', 'Multi-locale'],
			year: '2025', role: 'Product Designer', type: 'Work',
		},
		{
			slug: 'themeisle-starter-templates', title: 'Neve Templates', sub: 'WordPress Template Library',
			hookStat: '110+', hookLabel: 'Templates Live',
			impact: '~35 → 110+ templates. The library behind 200K installs.',
			desc: 'Built the Neve starter template library from scratch — 50+ niche-specific layouts across Gutenberg, Elementor, Brizy and WooCommerce that became the core reason users chose the theme.',
			accent: '#3b82f6', pills: ['50+ niches', '200K+ installs', 'Multi-builder'],
			year: '2021–23', role: 'Product Designer', type: 'Work',
		},
		{
			slug: 'effido-productivity-app', title: 'Effido', sub: 'Multi-Platform Productivity App',
			hookStat: '5', hookLabel: 'Screens · One System',
			impact: '5 screens. Zero duplicate UI. Every screen owns one phase.',
			desc: 'Concept productivity app spanning Desktop, iPad and Apple Watch — each screen owning exactly one phase of the workflow (plan → execute → review) with a label system as the shared data spine.',
			accent: '#6366f1', pills: ['Desktop · iPad · Watch', 'Label system', 'Dual theme'],
			year: '2021', role: 'Concept Design', type: 'Concept',
		},
		{
			slug: 'spotify-redesign', title: 'Spotify', sub: 'Mobile Player Redesign',
			hookStat: '3', hookLabel: 'Core Flows Rebuilt',
			impact: 'Player · Library · Discovery. Every pixel earned its place.',
			desc: "Mobile-first redesign of Spotify's three core flows — rethinking playback controls, library organisation, and discovery surfaces with a focus on one-handed usability.",
			accent: '#1DB954', pills: ['Mobile-first', 'Playback UX', 'Library redesign'],
			year: '2018', role: 'Concept Design', type: 'Concept',
		},
		{
			slug: 'wordpress-redesign', title: 'WordPress Admin', sub: 'Admin Dashboard Redesign',
			hookStat: '6', hookLabel: 'Sections Rebuilt',
			impact: 'Admin UI redesigned from first principles. Dark mode included.',
			desc: 'Reimagined the WordPress admin dashboard with a component library, full dark mode, and a collapsible sidebar — bringing the editor-facing UI in line with modern design standards.',
			accent: '#21759B', pills: ['Admin UI', 'Dark mode', 'Component library'],
			year: '2020', role: 'Concept Design', type: 'Concept',
		},
		{
			slug: 'discord-redesign', title: 'Discord', sub: 'UI Redesign Concept',
			hookStat: '3', hookLabel: 'Surfaces Redesigned',
			impact: 'DM · Server · Screen Share. Less noise, more signal.',
			desc: "Redesigned Discord's three core surfaces — reducing visual clutter in DMs, improving server navigation hierarchy, and rethinking the screen-share UI for clarity during calls.",
			accent: '#5865F2', pills: ['DM redesign', 'Server nav', 'Screen share'],
			year: '2020', role: 'Concept Design', type: 'Concept',
		},
		{
			slug: 'alt-news-concept', title: 'Alt News', sub: 'News Platform Concept',
			hookStat: '4', hookLabel: 'Editorial Sections',
			impact: 'Hero · Trending · Videos · Footer. News for how people read.',
			desc: 'Editorial-first news platform concept designed around real reading patterns — a dominant hero, auto-sorted trending, a dedicated video section, and a rich footer for deep discovery.',
			accent: '#f59e0b', pills: ['Editorial layout', 'Auto-sorted news', 'Video section'],
			year: '2020', role: 'Concept Design', type: 'Concept',
		},
	];

	// If on a specific work page, start the carousel on the next project
	const startIdx = (() => {
		if (!currentSlug) return 0;
		const idx = allProjects.findIndex(p => p.slug === currentSlug);
		return idx === -1 ? 0 : (idx + 1) % allProjects.length;
	})();

	let activeIdx = $state(startIdx);
	let chipStripEl: HTMLElement | null = $state(null);
	let autoTimer: ReturnType<typeof setTimeout> | null = null;
	const AUTO_MS = 4200;

	function scrollActiveChip() {
		if (!chipStripEl) return;
		const chip = chipStripEl.querySelector<HTMLElement>('[data-active="true"]');
		if (!chip) return;
		const target = chip.offsetLeft - (chipStripEl.offsetWidth - chip.offsetWidth) / 2;
		chipStripEl.scrollTo({ left: target, behavior: 'smooth' });
	}

	function goTo(idx: number, resetAuto = true) {
		activeIdx = ((idx % allProjects.length) + allProjects.length) % allProjects.length;
		if (resetAuto) startAutoSlide();
		setTimeout(scrollActiveChip, 60);
	}

	function startAutoSlide() {
		if (autoTimer) clearTimeout(autoTimer);
		autoTimer = setTimeout(() => {
			activeIdx = (activeIdx + 1) % allProjects.length;
			setTimeout(scrollActiveChip, 60);
			startAutoSlide();
		}, AUTO_MS);
	}

	let previewCardEl: HTMLElement | null = $state(null);
	let cardRotX = $state(0);
	let cardRotY = $state(0);
	let mouseGlowX = $state(50);
	let mouseGlowY = $state(50);
	let isResting = $state(true);

	function handleCardMouseMove(e: MouseEvent) {
		if (!previewCardEl) return;
		isResting = false;
		const rect = previewCardEl.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width;
		const y = (e.clientY - rect.top) / rect.height;
		mouseGlowX = x * 100;
		mouseGlowY = y * 100;
		cardRotY = (x - 0.5) * 5;
		cardRotX = (0.5 - y) * 3;
	}

	function handleCardMouseLeave() {
		isResting = true;
		cardRotX = 0; cardRotY = 0;
		mouseGlowX = 50; mouseGlowY = 50;
	}

	function cardEnter(_node: Element) {
		return {
			duration: 480,
			css: (t: number) => {
				const e = cubicOut(t);
				return `opacity:${e}; transform:translateY(${(1 - e) * 16}px) scale(${0.96 + e * 0.04}); filter:blur(${(1 - e) * 10}px);`;
			},
		};
	}
	function cardExit(_node: Element) {
		return {
			duration: 260,
			css: (t: number) => {
				const e = cubicIn(t);
				return `opacity:${e}; transform:translateY(${(1 - e) * -8}px) scale(${0.97 + e * 0.03}); filter:blur(${(1 - e) * 8}px);`;
			},
		};
	}

	let sectionEl: HTMLElement | null = $state(null);

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					startAutoSlide();
				} else {
					if (autoTimer) { clearTimeout(autoTimer); autoTimer = null; }
				}
			},
			{ threshold: 0.1 }
		);
		if (sectionEl) observer.observe(sectionEl);
		return () => {
			observer.disconnect();
			if (autoTimer) clearTimeout(autoTimer);
		};
	});
</script>

<section bind:this={sectionEl} class="bg-white px-6 py-20 border-t border-neutral-200">
	<div class="max-w-7xl mx-auto">

		<!-- Section header -->
		<div class="mb-8">
			<p class="text-[10px] font-mono tracking-[0.22em] text-neutral-400 uppercase mb-2">Explore</p>
			<h2 class="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight leading-none">More Projects</h2>
		</div>

		<!-- Preview card -->
		<a
			href="/work/{allProjects[activeIdx].slug}"
			class="mp-preview group relative flex flex-col bg-neutral-950 rounded-3xl overflow-hidden h-[400px] sm:h-[460px]"
			bind:this={previewCardEl}
			onmousemove={handleCardMouseMove}
			onmouseleave={handleCardMouseLeave}
			style="
				transform: perspective(1200px) rotateX({cardRotX}deg) rotateY({cardRotY}deg) scale3d(1.008, 1.008, 1);
				transition: transform {isResting ? '0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' : '0.1s linear'}, box-shadow 0.4s ease;
			"
		>
			<!-- Accent ring -->
			<div class="mp-ring absolute inset-0 rounded-3xl pointer-events-none z-30"
				style="box-shadow: 0 0 0 1px {allProjects[activeIdx].accent}38, 0 0 50px {allProjects[activeIdx].accent}10;">
			</div>

			<!-- Shimmer sweep -->
			<div class="absolute inset-0 pointer-events-none z-20 rounded-3xl overflow-hidden">
				<div class="mp-shimmer-beam"></div>
			</div>

			<!-- Mouse sheen -->
			<div class="absolute inset-0 pointer-events-none z-10 rounded-3xl"
				style="background: radial-gradient(circle at {mouseGlowX}% {mouseGlowY}%, rgba(255,255,255,0.06) 0%, transparent 50%); transition: background {isResting ? '0.6s ease' : '0.1s ease'};">
			</div>

			<!-- Ambient accent glow -->
			<div class="absolute inset-0 pointer-events-none"
				style="background: radial-gradient(ellipse at {mouseGlowX}% {mouseGlowY}%, {allProjects[activeIdx].accent}20 0%, transparent 60%); transition: background {isResting ? '0.55s ease' : '0.12s ease'};">
			</div>

			<!-- Noise grain -->
			<svg class="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-[0.025]" aria-hidden="true">
				<filter id="mp-noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter>
				<rect width="100%" height="100%" filter="url(#mp-noise)"/>
			</svg>

			<!-- Transitioning content -->
			<div class="relative flex-1">
				{#each [activeIdx] as _idx (_idx)}
					<div
						class="absolute inset-0 flex flex-col p-6 sm:p-8 z-10"
						in:cardEnter
						out:cardExit
					>
						<!-- TOP: label row -->
						<div class="flex items-center gap-2.5">
							<div class="w-2 h-2 rounded-full shrink-0" style="background:{allProjects[_idx].accent};"></div>
							<span class="text-sm font-black text-white tracking-tight leading-none uppercase">{allProjects[_idx].title}</span>
							<span class="text-xs font-mono text-neutral-400 truncate flex-1 min-w-0">{allProjects[_idx].sub}</span>
							<span class="shrink-0 text-[10px] font-mono uppercase tracking-[0.12em] text-neutral-500">{allProjects[_idx].type}</span>
						</div>

						<!-- MIDDLE: vertically centred -->
						<div class="flex-1 flex flex-col justify-center gap-4 py-4">
							<div class="flex items-start gap-4">
								<p class="text-[2.75rem] sm:text-[3.5rem] font-black tracking-tighter leading-[0.9]"
									style="color:{allProjects[_idx].accent};">
									{allProjects[_idx].hookStat}
								</p>
								<div class="pt-1">
									<p class="text-xs font-mono tracking-[0.15em] text-neutral-300 uppercase leading-none">
										{allProjects[_idx].hookLabel}
									</p>
									<p class="text-[11px] font-mono text-neutral-500 mt-1.5 leading-none">
										{allProjects[_idx].role} · {allProjects[_idx].year}
									</p>
								</div>
							</div>
							<div>
								<p class="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug mb-2">
									{allProjects[_idx].impact}
								</p>
								<p class="text-sm text-neutral-400 leading-relaxed line-clamp-2">
									{allProjects[_idx].desc}
								</p>
							</div>
						</div>

						<!-- BOTTOM: pills + CTA -->
						<div class="flex items-center justify-between gap-3">
							<div class="flex flex-wrap gap-1.5">
								{#each allProjects[_idx].pills as pill}
									<span class="px-3 py-1 rounded-full text-[11px] font-mono bg-white/5 text-neutral-400">{pill}</span>
								{/each}
							</div>
							<div
								class="mp-cta shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-black tracking-wide uppercase transition-all duration-300"
								style="background:{allProjects[_idx].accent}; color:#000;"
							>
								<span>View</span>
								<ArrowRight class="size-3.5" />
							</div>
						</div>
					</div>
				{/each}
			</div>

		</a>

		<!-- Chip strip -->
		<div class="flex items-center gap-3 mt-5">
			<button type="button"
				onclick={() => goTo(activeIdx - 1)}
				class="mp-nav-btn shrink-0 w-9 h-9 rounded-full border border-neutral-200 bg-white flex items-center justify-center hover:border-neutral-900 hover:bg-neutral-900 transition-all duration-200 group"
				aria-label="Previous project">
				<ChevronLeft class="size-4 text-neutral-500 group-hover:text-white transition-colors" />
			</button>

			<div class="mp-chips flex gap-3 overflow-x-auto flex-1" bind:this={chipStripEl} data-lenis-prevent>
				{#each allProjects as proj, i}
					<button
						type="button"
						data-active={activeIdx === i ? 'true' : 'false'}
						onclick={() => goTo(i)}
						class="mp-chip shrink-0 w-40 rounded-2xl p-3 text-left border transition-all duration-200
							{activeIdx === i ? 'bg-neutral-900 border-neutral-700' : 'bg-white border-neutral-200 hover:border-neutral-300'}"
						style={activeIdx === i
							? `box-shadow: 0 0 0 1px ${proj.accent}40, 0 6px 20px rgba(0,0,0,0.16);`
							: 'box-shadow: 0 1px 4px rgba(0,0,0,0.05);'}
					>
						<div class="flex items-start justify-between gap-1 mb-1.5">
							<p class="text-xl font-black tracking-tighter leading-none"
								style="color:{activeIdx === i ? proj.accent : '#525252'}">
								{proj.hookStat}
							</p>
							{#if proj.type === 'Work'}
								<span class="shrink-0 text-[6px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded-full border
									{activeIdx === i ? 'bg-blue-500/15 text-blue-300 border-blue-500/25' : 'bg-blue-50 text-blue-600 border-blue-200'}">W</span>
							{:else}
								<span class="shrink-0 text-[6px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded-full border
									{activeIdx === i ? 'bg-violet-500/20 text-violet-300 border-violet-500/25' : 'bg-violet-50 text-violet-600 border-violet-200'}">C</span>
							{/if}
						</div>
						<p class="text-[7px] font-mono uppercase tracking-widest mb-2.5 truncate
							{activeIdx === i ? 'text-neutral-400' : 'text-neutral-600'}">
							{proj.hookLabel}
						</p>
						<div class="h-px mb-2.5 transition-colors duration-200"
							style="background:{activeIdx === i ? proj.accent + '30' : '#e5e5e5'}">
						</div>
						<div class="flex items-center gap-1.5">
							<div class="w-1.5 h-1.5 rounded-full shrink-0" style="background:{proj.accent}"></div>
							<div class="min-w-0">
								<p class="text-[11px] font-black leading-none truncate
									{activeIdx === i ? 'text-white' : 'text-neutral-800'}">
									{proj.title}
								</p>
								<p class="text-[8px] font-mono mt-0.5 {activeIdx === i ? 'text-neutral-500' : 'text-neutral-600'}">{proj.year}</p>
							</div>
						</div>
					</button>
				{/each}
			</div>

			<button type="button"
				onclick={() => goTo(activeIdx + 1)}
				class="mp-nav-btn shrink-0 w-9 h-9 rounded-full border border-neutral-200 bg-white flex items-center justify-center hover:border-neutral-900 hover:bg-neutral-900 transition-all duration-200 group"
				aria-label="Next project">
				<ChevronRight class="size-4 text-neutral-500 group-hover:text-white transition-colors" />
			</button>
		</div>

	</div>
</section>

<style>
	.mp-preview {
		box-shadow: 0 12px 48px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.15);
		transition: box-shadow 0.4s ease;
	}
	.mp-preview:hover { box-shadow: 0 24px 72px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.2); }
	.mp-preview:hover .mp-cta { filter: brightness(1.2); transform: translateX(2px); }

	@keyframes mp-ring-pulse {
		0%, 100% { opacity: 0.55; }
		50%       { opacity: 1; }
	}
	.mp-ring { animation: mp-ring-pulse 3s ease-in-out infinite; }

	@keyframes mp-shimmer {
		0%   { transform: translateX(-80%) rotate(-25deg); opacity: 0; }
		10%  { opacity: 1; }
		90%  { opacity: 1; }
		100% { transform: translateX(280%) rotate(-25deg); opacity: 0; }
	}
	.mp-shimmer-beam {
		position: absolute; top: -60%; left: 0;
		width: 35%; height: 220%;
		background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.025) 40%,
			rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.025) 60%, transparent 100%);
		animation: mp-shimmer 7s ease-in-out infinite 2s;
		pointer-events: none;
	}

	.mp-chips  { scrollbar-width: none; -ms-overflow-style: none; }
	.mp-chips::-webkit-scrollbar { display: none; }
	.mp-chip   { cursor: pointer; user-select: none; }
	.mp-nav-btn { user-select: none; }
	.mp-cta { transition: filter 0.3s ease, transform 0.3s ease; }
</style>
