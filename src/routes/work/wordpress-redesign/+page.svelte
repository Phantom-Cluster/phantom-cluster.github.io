<script lang="ts">
	import type { PageData } from './$types';
	import { onMount, onDestroy } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { navTheme } from '$lib/stores/navTheme';
	import LightboxModal from '$lib/components/LightboxModal.svelte';
	import ExploreProjectComponent from '$lib/components/ExploreProjectComponent.svelte';

	let { data }: { data: PageData } = $props();
	let project = $derived(data.project);

	let pageWrapperEl: HTMLElement;
	let bentoTriggerEl: HTMLElement;
	let editorialTriggerEl: HTMLElement;
	let ctx: gsap.Context;

	let videoEl: HTMLVideoElement;
	let wrapperEl: HTMLElement;
	let isPaused = $state(true);
	let currentTime = $state(0);
	let duration = $state(0);
	function togglePlay() { isPaused = !isPaused; }
	function skipBack() { currentTime = Math.max(0, currentTime - 5); }
	function skipFwd() { if (videoEl) currentTime = Math.min(duration, currentTime + 10); }
	function toggleFullscreen() {
		if (!document.fullscreenElement) wrapperEl?.requestFullscreen().catch(console.error);
		else document.exitFullscreen();
	}
	function formatTime(s: number) {
		if (isNaN(s) || s < 0) return '00:00';
		return `${Math.floor(s / 60).toString().padStart(2, '0')}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
	}

	let modalImg = $state<{ src: string; alt: string } | null>(null);
	function openModal(src: string, alt: string) { modalImg = { src, alt }; }

	const features = [
		{ icon: '⊞', title: 'Three-Column Dashboard', desc: 'Left navigation (WebPages / WP Settings / Plugins), centre content, right activity feed — full admin context on one screen without hunting through menus.' },
		{ icon: '◎', title: 'Create with Dropdown', desc: 'One Create button expands into Post, Media, Page, and User — every content creation action accessible from any screen, right in the topbar.' },
		{ icon: '◑', title: 'Role Badge & Security Login', desc: 'Role displayed next to your name at all times (Admin, Subscriber, Moderator). Logout screen shows last sign-in time for quick security awareness.' },
		{ icon: '◉', title: 'Unified Global Search', desc: 'Searches plugins, themes, posts, pages, and settings in one query. Results grouped by type with contextual actions — Install, Open, or Activate per result.' },
		{ icon: '▦', title: 'Page Quick Access', desc: 'Last 4 pages or posts opened shown as cards at the top of the Pages screen — jump back in without re-scanning the full list every session.' },
		{ icon: '◈', title: 'Structured Settings Hierarchy', desc: 'Three clear categories: WebPages (core WP), WordPress Settings (appearance/plugins/users/advanced), and dedicated Plugin pages that never mix with each other.' },
	];

	onMount(() => {
		navTheme.set('light');
		document.body.style.backgroundColor = '#ffffff';
		gsap.registerPlugin(ScrollTrigger);
		const t = setTimeout(() => {
			ctx = gsap.context(() => {
				ScrollTrigger.create({
					trigger: bentoTriggerEl, start: 'top 90%',
					onEnter: () => navTheme.set('dark'), onLeaveBack: () => navTheme.set('light')
				});
				ScrollTrigger.create({
					trigger: editorialTriggerEl, start: 'top 90%',
					onEnter: () => navTheme.set('light'), onLeaveBack: () => navTheme.set('dark')
				});
				gsap.from('.cs-hero-element', { y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' });
				gsap.set('.cs-fade-up', { y: 40, opacity: 0 });
				ScrollTrigger.batch('.cs-fade-up', {
					start: 'top 85%',
					onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out' }),
					once: true
				});
			});
		}, 400);
		return () => clearTimeout(t);
	});

	onDestroy(() => {
		navTheme.set(null);
		if (typeof document !== 'undefined') document.body.style.backgroundColor = '';
		if (ctx) ctx.revert();
	});
</script>

<svelte:head>
	<title>WordPress Admin Redesign | Hitanshu Sahu</title>
</svelte:head>

<LightboxModal bind:modalImg />

<div bind:this={pageWrapperEl} class="min-h-screen bg-white text-neutral-900" style="background-color: #ffffff;">

	<!-- HERO -->
	<section data-theme="light" class="w-full bg-white px-6 pt-[160px] md:pt-[180px] pb-20 min-h-screen flex flex-col justify-center">
		<div class="max-w-7xl mx-auto w-full">

			<div class="flex items-center justify-between border-b border-neutral-200 pb-5 mb-12 cs-hero-element">
				<div class="relative inline-flex overflow-hidden rounded-full p-[1.5px] shadow-sm bg-neutral-200">
					<div class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,rgba(0,0,0,0.75)_360deg)]"></div>
					<div class="inline-flex h-full w-full items-center justify-center rounded-full bg-white px-6 py-2 relative z-10">
						<span class="text-[11px] font-mono tracking-widest text-neutral-500 uppercase">Concept — WordPress Admin UX</span>
					</div>
				</div>
				<div class="hidden sm:flex items-center gap-4">
					<a href="https://www.behance.net/gallery/111596675/WordPress-Redesign-(New-Features-Changes)" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#0073aa]/40 bg-[#0073aa]/5 text-[9px] font-mono tracking-widest text-[#4da6cc] uppercase hover:border-[#0073aa]/70 hover:bg-[#0073aa]/10 transition-colors">Behance ↗</a>
					<span class="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">2021</span>
				</div>
			</div>

			<div class="flex items-start gap-10 cs-hero-element">
				<div class="flex-1 min-w-0">
					<p class="text-[11px] font-mono tracking-[0.35em] uppercase text-neutral-400 mb-5">WordPress</p>
					<h1 class="text-[clamp(3rem,8vw,7.5rem)] font-black tracking-tight leading-[0.9] text-neutral-900">
						Admin<br/>
						<span class="text-neutral-300">Redesigned&nbsp;&amp;</span><br/>
						Extended.
					</h1>
					<div class="flex flex-wrap gap-2 mt-8">
						{#each project.tags as tag}
							<span class="px-3 py-1 rounded-full bg-neutral-50 border border-neutral-200 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">{tag}</span>
						{/each}
					</div>
				</div>

				<div class="shrink-0 w-56 hidden md:flex flex-col gap-6 pt-14">
					<div>
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Role</span>
						<span class="text-sm font-semibold text-neutral-800">{project.role}</span>
					</div>
					<div>
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Platform</span>
						<span class="text-sm font-semibold text-neutral-800">WordPress Admin / Gutenberg</span>
					</div>
					<div>
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Tools</span>
						<span class="text-sm font-semibold text-neutral-800">Figma</span>
					</div>
					<div>
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Type</span>
						<span class="text-sm font-semibold text-neutral-800">Concept / Exploration</span>
					</div>
					<div class="pt-5 border-t border-neutral-100">
						<a href="https://www.behance.net/gallery/111596675/WordPress-Redesign-(New-Features-Changes)" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-portfolio-accent hover:underline">
							<span class="text-[9px] font-mono tracking-widest uppercase">View on Behance</span>
							<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
						</a>
					</div>
				</div>
			</div>

			<div class="grid grid-cols-3 border-t border-b border-neutral-200 mt-12 cs-hero-element">
				<div class="py-7 pr-4 md:pr-8 border-r border-neutral-200">
					<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">Flows Redesigned</span>
					<div class="flex items-baseline gap-1.5 leading-none flex-wrap">
						<span class="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">4 Flows</span>
					</div>
					<span class="text-xs text-neutral-400 block mt-1">Dashboard · Search · Pages/Posts · Settings</span>
				</div>
				<div class="py-7 px-3 md:px-8 border-r border-neutral-200">
					<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">New Features Added</span>
					<div class="flex items-baseline gap-1 leading-none flex-wrap">
						<span class="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">6+</span>
					</div>
					<span class="text-xs text-neutral-400 block mt-1">Search · Role badge · Activity feed · Events</span>
				</div>
				<div class="py-7 pl-3 md:pl-8">
					<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">Year</span>
					<div class="flex items-baseline gap-1 leading-none flex-wrap">
						<span class="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">2021</span>
					</div>
					<span class="text-xs text-neutral-400 block mt-1">Led to WPMU DEV role</span>
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10 cs-hero-element">
				<div class="md:col-span-2">
					<p class="text-xl md:text-2xl text-neutral-500 leading-relaxed">{project.description}</p>
				</div>
			</div>

		</div>
	</section>

	<!-- BENTO -->
	<div bind:this={bentoTriggerEl} data-theme="dark">
		<section class="bg-black py-24 px-6">
			<div class="max-w-7xl mx-auto">

				<div class="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
					<div class="lg:col-span-8 sp-wrap rounded-4xl cs-fade-up">
						<div class="sp-spin-accent"></div>
						<div class="sp-inner bg-neutral-950 rounded-4xl p-10 lg:p-14 border border-white/5 flex flex-col justify-between">
							<p class="text-[11px] font-mono tracking-widest text-[#0073aa] uppercase mb-8">{project.role} · Concept Exploration</p>
							<h2 class="text-3xl lg:text-5xl font-black tracking-tight text-white leading-[1.05]">
								WordPress admin hadn't changed in years — <span class="text-shimmer-white">so I redesigned it from the dashboard up.</span>
							</h2>
						</div>
					</div>
					<div class="lg:col-span-4 sp-wrap rounded-4xl cs-fade-up">
						<div class="sp-spin-accent"></div>
						<div class="sp-inner bg-neutral-950 rounded-4xl p-10 border border-white/5 flex flex-col justify-between">
							<div>
								<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-3">Project</span>
								<span class="text-4xl font-black tracking-tighter text-white">WordPress</span>
							</div>
							<div class="space-y-3">
								<div>
									<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-1">Status</span>
									<span class="text-sm font-semibold text-neutral-300">Concept · Published on Behance</span>
								</div>
								<div>
									<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-1">Outcome</span>
									<span class="text-sm font-semibold text-neutral-300">Led to WPMU DEV role</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-5">
					<div class="sp-wrap rounded-4xl cs-fade-up">
						<div class="sp-spin"></div>
						<div class="sp-inner bg-neutral-950 rounded-4xl p-10 border border-white/5">
							<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-500 uppercase block mb-4">Admin Flows</span>
							<div class="flex items-baseline gap-2 mb-3">
								<span class="text-5xl font-black tracking-tight text-white">4</span>
							</div>
							<p class="text-sm text-neutral-500 leading-relaxed">Dashboard, Global Search, Pages &amp; Posts, and Settings — fully redesigned with new interaction patterns.</p>
						</div>
					</div>
					<div class="sp-wrap rounded-4xl cs-fade-up">
						<div class="sp-spin"></div>
						<div class="sp-inner bg-neutral-950 rounded-4xl p-10 border border-white/5">
							<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-500 uppercase block mb-4">New Features</span>
							<div class="flex items-baseline gap-2 mb-3">
								<span class="text-5xl font-black tracking-tight text-white">6+</span>
							</div>
							<p class="text-sm text-neutral-500 leading-relaxed">Global search, role badge, create dropdown, recent activity, WP events with timezone, page quick-access, last login.</p>
						</div>
					</div>
					<div class="sp-wrap rounded-4xl cs-fade-up">
						<div class="sp-spin"></div>
						<div class="sp-inner bg-neutral-950 rounded-4xl p-10 border border-white/5">
							<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-500 uppercase block mb-4">Career Outcome</span>
							<div class="flex items-baseline gap-2 mb-3">
								<span class="text-3xl font-black tracking-tight text-white leading-tight">WPMU<br/>DEV</span>
							</div>
							<p class="text-sm text-neutral-500 leading-relaxed">WordPress domain depth signalled through this concept — opened the door to the product design role.</p>
						</div>
					</div>
				</div>

			</div>
		</section>
	</div>

	<!-- VIDEO WALKTHROUGH -->
	<section class="bg-black py-24 px-6 border-t border-white/5">
		<div class="max-w-7xl mx-auto">
			<div class="flex items-center gap-4 mb-12 cs-fade-up">
				<span class="text-[9px] font-mono tracking-widest text-neutral-600 uppercase">Design Craft</span>
				<div class="h-px flex-1 bg-white/5"></div>
				<span class="text-[9px] font-mono tracking-widest text-neutral-600 uppercase">Figma Walkthrough</span>
			</div>

			<div class="wp-video-card group cs-fade-up" bind:this={wrapperEl}>
				<!-- svelte-ignore a11y_media_has_caption -->
				<div class="relative overflow-hidden rounded-t-[calc(1.5rem-1px)]">
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
					<video
						bind:this={videoEl}
						bind:paused={isPaused}
						bind:currentTime
						bind:duration
						src="/images/projects/wordpress/WordPress%20Redesign.mp4"
						class="w-full aspect-video object-cover block cursor-pointer"
						autoplay loop muted playsinline preload="metadata"
						onclick={togglePlay}
					></video>

					<div class="absolute bottom-4 inset-x-4 flex flex-col gap-3 px-4 py-3.5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
						<div class="flex items-center gap-3 w-full">
							<span class="text-white/70 text-[10px] font-mono w-8 text-right">{formatTime(currentTime)}</span>
							<input type="range" aria-label="Seek" min="0" max={duration || 100} step="0.01" bind:value={currentTime}
								class="flex-1 h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer" />
							<span class="text-white/70 text-[10px] font-mono w-8">{formatTime(duration)}</span>
						</div>
						<div class="flex items-center justify-between w-full">
							<div class="flex items-center gap-5">
								<button aria-label="Skip back 5 seconds" onclick={skipBack} class="text-white/80 hover:text-white transition-colors flex items-center gap-1">
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"/></svg>
									<span class="text-[10px] font-mono tracking-widest mt-1">-5s</span>
								</button>
								<button aria-label={isPaused ? 'Play' : 'Pause'} onclick={togglePlay} class="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
									{#if isPaused}
										<svg class="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
									{:else}
										<svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
									{/if}
								</button>
								<button aria-label="Skip forward 10 seconds" onclick={skipFwd} class="text-white/80 hover:text-white transition-colors flex items-center gap-1">
									<span class="text-[10px] font-mono tracking-widest mt-1">+10s</span>
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.334-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.334-4z"/></svg>
								</button>
							</div>
							<button aria-label="Toggle fullscreen" onclick={toggleFullscreen} class="text-white/80 hover:text-white transition-colors">
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
							</button>
						</div>
					</div>

					<div class="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/55 backdrop-blur-sm rounded-full px-2.5 py-1.5 group-hover:opacity-0 transition-opacity duration-200 pointer-events-none">
						<svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
						<span class="text-[9px] text-white/60 font-mono tracking-wider">Hover to control</span>
					</div>
				</div>
				<div class="px-5 py-4 border-t border-white/5">
					<p class="text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-1.5">Figma File Walkthrough</p>
					<p class="text-sm text-neutral-400 leading-relaxed">Full walkthrough of the Figma file — covers Dashboard, Search, Pages &amp; Posts, and the Settings restructure.</p>
				</div>
			</div>

		</div>
	</section>

	<!-- BEFORE / AFTER -->
	<section class="bg-black px-6 pt-4 pb-24">
		<div class="max-w-7xl mx-auto">
			<div class="mb-12 cs-fade-up">
				<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase">Before → After</span>
				<h2 class="text-3xl lg:text-4xl font-black tracking-tight text-white mt-3 leading-[1.05]">The same admin.<br/>Completely rethought.</h2>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-5 cs-fade-up">

				<div class="rounded-3xl overflow-hidden border border-white/5 bg-neutral-950 flex flex-col">
					<div class="px-5 py-3 border-b border-white/5 flex items-center gap-2.5">
						<span class="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
						<span class="text-[10px] font-mono tracking-widest text-[#EF4444] uppercase">Before — Original WordPress</span>
					</div>
					<button type="button" class="img-trigger" onclick={() => openModal('/images/projects/wordpress/Real%20WordPress.webp', 'Original WordPress Admin')} aria-label="View original WordPress admin">
						<div class="h-[260px] overflow-hidden">
							<img src="/images/projects/wordpress/thumbs/Real%20WordPress.webp" alt="Original WordPress Admin" class="w-full h-full object-cover object-top" loading="lazy" decoding="async" />
						</div>
						<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
					</button>
					<div class="p-6 flex-1">
						<ul class="space-y-2.5">
							{#each [
								'Flat 8-item sidebar — Posts, Appearance, Plugins, Users all at the same level with no grouping or priority',
								'No search — finding a specific setting or plugin required clicking through multiple nested menus every time',
								'No user context — no role indicator, no recent activity, no notification badge anywhere in the UI',
								'"Screen Options" hidden top-right — dashboard personalisation was an afterthought, not a designed feature',
							] as b}
								<li class="flex items-start gap-2.5 text-sm text-neutral-500 leading-snug">
									<span class="text-[#C40E0B] shrink-0 mt-0.5 text-xs font-bold">✗</span>{b}
								</li>
							{/each}
						</ul>
					</div>
				</div>

				<div class="rounded-3xl overflow-hidden border border-white/5 bg-neutral-950 flex flex-col">
					<div class="px-5 py-3 border-b border-white/5 flex items-center gap-2.5">
						<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse"></span>
						<span class="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">After — Redesigned</span>
					</div>
					<button type="button" class="img-trigger" onclick={() => openModal('/images/projects/wordpress/Dashboard.webp', 'Redesigned WordPress Dashboard')} aria-label="View redesigned WordPress dashboard">
						<div class="h-[260px] overflow-hidden">
							<img src="/images/projects/wordpress/thumbs/Dashboard.webp" alt="Redesigned WordPress Dashboard" class="w-full h-full object-cover object-top" loading="lazy" decoding="async" />
						</div>
						<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
					</button>
					<div class="p-6 flex-1">
						<ul class="space-y-2.5">
							{#each [
								'Three-column layout: grouped sidebar (WebPages / WP Settings / Plugins), content, Recent Activity + WP Events',
								'Global search bar across every screen — finds plugins, themes, posts, pages, settings with contextual CTAs',
								'Role badge next to username, red update indicator, Create dropdown — full context visible at a glance',
								'Dashboard Screen Toggle: drag widgets to reorder, enable/disable any panel, add or remove plugin widgets',
							] as b}
								<li class="flex items-start gap-2.5 text-sm text-neutral-400 leading-snug">
									<span class="text-emerald-400 shrink-0 mt-0.5 text-xs font-bold">✓</span>{b}
								</li>
							{/each}
						</ul>
					</div>
				</div>

			</div>
		</div>
	</section>

	<!-- PAIN POINTS -->
	<section class="bg-black px-6 pb-24">
		<div class="max-w-7xl mx-auto">
			<div class="mb-12 cs-fade-up">
				<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase">Design Rationale</span>
				<h2 class="text-3xl lg:text-4xl font-black tracking-tight text-white mt-3 leading-[1.05]">Three problems.<br/>Four screens built to solve them.</h2>
			</div>
			<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 cs-fade-up">
				<div class="rounded-2xl p-6 flex flex-col gap-3 border border-red-900/40" style="background: linear-gradient(135deg, #2a0a0a 0%, #1a0606 100%);">
					<div class="flex items-center justify-between">
						<span class="text-[8px] font-mono tracking-[0.3em] text-red-400/60 uppercase">Pain Point</span>
						<span class="px-2.5 py-1 rounded-full text-[8px] font-black font-mono tracking-wider uppercase text-red-300 border border-red-500/40" style="background: rgba(220,38,38,0.18);">Critical</span>
					</div>
					<span class="text-[clamp(2rem,5vw,3.5rem)] font-black text-white tracking-tight leading-none block">0</span>
					<p class="text-xs text-red-200/60 leading-relaxed">Search didn't exist in WordPress admin. Finding a plugin setting, a specific post, or a configuration option meant clicking through nested menus every single time.</p>
					<span class="text-[8px] font-mono tracking-[0.3em] text-red-400/40 uppercase mt-auto pt-2 border-t border-red-900/30">No Global Search</span>
				</div>
				<div class="rounded-2xl p-6 flex flex-col gap-3 border border-red-900/40" style="background: linear-gradient(135deg, #2a0a0a 0%, #1a0606 100%);">
					<div class="flex items-center justify-between">
						<span class="text-[8px] font-mono tracking-[0.3em] text-red-400/60 uppercase">Pain Point</span>
						<span class="px-2.5 py-1 rounded-full text-[8px] font-black font-mono tracking-wider uppercase text-red-300 border border-red-500/40" style="background: rgba(220,38,38,0.18);">Critical</span>
					</div>
					<span class="text-[clamp(2rem,5vw,3.5rem)] font-black text-white tracking-tight leading-none block">8+</span>
					<p class="text-xs text-red-200/60 leading-relaxed">Sidebar items at the same hierarchy level — core WordPress features mixed with plugin settings with no grouping, no visual priority, no way to tell what belonged where.</p>
					<span class="text-[8px] font-mono tracking-[0.3em] text-red-400/40 uppercase mt-auto pt-2 border-t border-red-900/30">Flat Sidebar</span>
				</div>
				<div class="rounded-2xl p-6 flex flex-col gap-3 border border-orange-900/40" style="background: linear-gradient(135deg, #2a1200 0%, #1a0c00 100%);">
					<div class="flex items-center justify-between">
						<span class="text-[8px] font-mono tracking-[0.3em] text-orange-400/60 uppercase">Pain Point</span>
						<span class="px-2.5 py-1 rounded-full text-[8px] font-black font-mono tracking-wider uppercase text-orange-300 border border-orange-500/40" style="background: rgba(234,88,12,0.18);">High</span>
					</div>
					<span class="text-[clamp(2rem,5vw,3.5rem)] font-black text-white tracking-tight leading-none block">0</span>
					<p class="text-xs text-orange-200/60 leading-relaxed">No role indicator, no activity feed, no local events, no personalisation — same generic view regardless of who you were or what you'd been working on.</p>
					<span class="text-[8px] font-mono tracking-[0.3em] text-orange-400/40 uppercase mt-auto pt-2 border-t border-orange-900/30">No User Context</span>
				</div>
			</div>
		</div>
	</section>

	<!-- SCREEN 01: DASHBOARD — white -->
	<section class="bg-white px-6 py-24 border-t border-neutral-200">
		<div class="max-w-7xl mx-auto cs-fade-up">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
				<div>
					<span class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase block mb-5">Screen 01 — Dashboard</span>
					<h3 class="text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight leading-[0.93] mb-5">Your full admin<br/>at a glance.</h3>
					<p class="text-sm text-neutral-500 leading-relaxed">The dashboard is restructured around three clear zones. The left sidebar is now grouped into named categories — WebPages for core content (Dashboard, Post, Media, Pages, Comments), WordPress Settings for admin config (Appearance, Plugins, Users, Tools, Advanced Settings), and Plugin Settings for each installed plugin's own dedicated page. The centre holds all the dashboard widgets, beautifully aligned with proper spacing. The right column shows a live Recent Activity feed — timestamped entries for every page added, plugin installed, or user created — plus a WordPress Events section where you enter your city to see upcoming local WP events, shown in your account's local timezone.</p>
				</div>
				<ul class="space-y-3 lg:pt-14">
					{#each [
						'Create dropdown — Post, Media, Page, or User without navigating away from the current screen',
						'Role badge next to username at all times: Admin, Subscriber, or Moderator — always visible',
						'Red notification badge for WordPress updates — hard to miss, easy to act on immediately',
						'Recent Activity feed: who added pages, installed plugins, created users — all timestamped',
						'WordPress Events: enter your city → upcoming local WP events + your account timezone',
						'Logout shows last sign-in date and time — a simple but meaningful security cue',
						'Dashboard Screen Toggle: drag widgets to reorder, enable or disable any panel',
					] as b}
						<li class="flex items-start gap-3 text-sm text-neutral-600 leading-snug"><span class="w-1 h-1 rounded-full bg-neutral-300 shrink-0 mt-[6px]"></span>{b}</li>
					{/each}
				</ul>
			</div>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div class="bg-neutral-100 rounded-3xl p-4 lg:p-5">
					<p class="text-[8px] font-mono tracking-widest text-neutral-400 uppercase mb-3 pl-1">Dashboard Redesign</p>
					<button type="button" class="img-trigger rounded-2xl overflow-hidden shadow-sm" onclick={() => openModal('/images/projects/wordpress/Dashboard.webp', 'Redesigned WordPress Dashboard')} aria-label="View Dashboard redesign">
						<img src="/images/projects/wordpress/thumbs/Dashboard.webp" alt="Redesigned WordPress Dashboard" class="w-full block" loading="lazy" decoding="async" />
						<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
						<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
					</button>
				</div>
				<div class="bg-neutral-900 rounded-3xl p-4 lg:p-5">
					<p class="text-[8px] font-mono tracking-widest text-neutral-500 uppercase mb-3 pl-1">Screen Elements Toggle</p>
					<button type="button" class="img-trigger rounded-2xl overflow-hidden" onclick={() => openModal('/images/projects/wordpress/Dashboard%20toggle%20elements.webp', 'Dashboard Screen Elements Toggle')} aria-label="View Dashboard elements toggle">
						<img src="/images/projects/wordpress/thumbs/Dashboard%20toggle%20elements.webp" alt="Dashboard Screen Elements Toggle" class="w-full block" loading="lazy" decoding="async" />
						<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
						<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
					</button>
				</div>
			</div>
		</div>
	</section>

	<!-- SCREEN 02: SEARCH — black -->
	<section class="bg-black px-6 py-24 border-t border-white/4">
		<div class="max-w-7xl mx-auto cs-fade-up">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
				<div>
					<span class="text-[9px] font-mono tracking-widest text-neutral-600 uppercase block mb-5">Screen 02 — Global Search</span>
					<h3 class="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[0.93] mb-5">Find anything.<br/>Without the hunt.</h3>
					<p class="text-sm text-neutral-500 leading-relaxed">The search bar is entirely new to WordPress admin — it didn't exist before. It sits at the top of every screen and searches across all content types simultaneously: plugins, themes, posts, pages, and settings. Results arrive grouped into named sections so you always know what category you're looking at. Plugin results show a contextual action button based on current state — Install for new ones, Open for active ones, Activate for installed but inactive. Theme results render as thumbnail cards with star ratings. Post and page results show title, author, and timestamp with a direct link to the editor.</p>
				</div>
				<ul class="space-y-3 lg:pt-14">
					{#each [
						'Searches across plugins, themes, posts, pages, and settings in a single query',
						'Results grouped by type: Plugins · Themes · Posts · Pages · Settings sections',
						'Plugin results show contextual action: Install / Open / Activate based on current state',
						'"Search in Plugins" or "View in Posts" links navigate directly to the full section',
						'Theme results render as thumbnail cards with ratings, Preview, or Activate options',
						'Post and page results show title, author, and date — one click to open the editor',
						'Blank state: clean placeholder before typing — no cluttered suggestions or noise',
					] as b}
						<li class="flex items-start gap-3 text-sm text-neutral-500 leading-snug"><span class="w-1 h-1 rounded-full bg-neutral-600 shrink-0 mt-[6px]"></span>{b}</li>
					{/each}
				</ul>
			</div>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div class="bg-neutral-900 rounded-3xl p-4 lg:p-5 border border-white/5">
					<p class="text-[8px] font-mono tracking-widest text-neutral-500 uppercase mb-3 pl-1">Blank State</p>
					<button type="button" class="img-trigger rounded-2xl overflow-hidden" onclick={() => openModal('/images/projects/wordpress/Search_blank.webp', 'Search — Blank State')} aria-label="View search blank state">
						<img src="/images/projects/wordpress/thumbs/Search_blank.webp" alt="Search — Blank State" class="w-full block" loading="lazy" decoding="async" />
						<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
						<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
					</button>
				</div>
				<div class="bg-neutral-900 rounded-3xl p-4 lg:p-5 border border-white/5">
					<p class="text-[8px] font-mono tracking-widest text-neutral-500 uppercase mb-3 pl-1">Search Results</p>
					<button type="button" class="img-trigger rounded-2xl overflow-hidden" onclick={() => openModal('/images/projects/wordpress/Search.webp', 'Search — Results View')} aria-label="View search results">
						<img src="/images/projects/wordpress/thumbs/Search.webp" alt="Search — Results View" class="w-full block" loading="lazy" decoding="async" />
						<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
						<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
					</button>
				</div>
			</div>
		</div>
	</section>

	<!-- SCREEN 03: PAGES/POSTS — white -->
	<section class="bg-white px-6 py-24 border-t border-neutral-200">
		<div class="max-w-7xl mx-auto cs-fade-up">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
				<div>
					<span class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase block mb-5">Screen 03 — Pages &amp; Posts</span>
					<h3 class="text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight leading-[0.93] mb-5">Pick up exactly<br/>where you left off.</h3>
					<p class="text-sm text-neutral-500 leading-relaxed">Pages and Posts now open with a Quick Access strip at the top — the last four items you worked on appear as cards, each showing the title, type (Post or Page), and the date it was last opened. One click gets you straight back in. Below that, the full list uses improved filter tabs and a new Search Inside Post field that can match words written within the page body — not just the title. A gear icon opens the Page Settings modal where you can toggle visible columns, set items per page, and choose between view modes.</p>
				</div>
				<ul class="space-y-3 lg:pt-14">
					{#each [
						'Quick Access strip: last 4 pages/posts as cards with title, type badge, and last-opened date',
						'Search Inside Post: matches keywords written inside page body content, not just title',
						'"Add New" promoted to a clearly visible position next to the Recent Pages tab',
						'Filter tabs: All · Published · Draft with clean layout and count badges',
						'Page Settings: toggle visible columns (Author, Comments, Date), items per page, view mode',
						'All sections properly aligned and spaced — clean, readable, no visual clutter',
					] as b}
						<li class="flex items-start gap-3 text-sm text-neutral-600 leading-snug"><span class="w-1 h-1 rounded-full bg-neutral-300 shrink-0 mt-[6px]"></span>{b}</li>
					{/each}
				</ul>
			</div>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div class="bg-neutral-100 rounded-3xl p-4 lg:p-5">
					<p class="text-[8px] font-mono tracking-widest text-neutral-400 uppercase mb-3 pl-1">Pages List</p>
					<button type="button" class="img-trigger rounded-2xl overflow-hidden shadow-sm" onclick={() => openModal('/images/projects/wordpress/Pages%20or%20post.webp', 'Pages — Redesigned List View')} aria-label="View pages redesign">
						<img src="/images/projects/wordpress/thumbs/Pages%20or%20post.webp" alt="Pages — Redesigned List View" class="w-full block" loading="lazy" decoding="async" />
						<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
						<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
					</button>
				</div>
				<div class="bg-neutral-100 rounded-3xl p-4 lg:p-5">
					<p class="text-[8px] font-mono tracking-widest text-neutral-400 uppercase mb-3 pl-1">Page Settings Modal</p>
					<button type="button" class="img-trigger rounded-2xl overflow-hidden shadow-sm" onclick={() => openModal('/images/projects/wordpress/Page%20and%20Post%20settings.webp', 'Page Settings Modal')} aria-label="View page settings modal">
						<img src="/images/projects/wordpress/thumbs/Page%20and%20Post%20settings.webp" alt="Page Settings Modal" class="w-full block" loading="lazy" decoding="async" />
						<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
						<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
					</button>
				</div>
			</div>
		</div>
	</section>

	<!-- SETTINGS CATEGORIES — black -->
	<section class="bg-black px-6 py-24 border-t border-white/4">
		<div class="max-w-7xl mx-auto">
			<div class="mb-14 cs-fade-up">
				<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase">Sidebar Restructure</span>
				<h2 class="text-3xl lg:text-4xl font-black tracking-tight text-white mt-3 leading-[1.05] mb-5">Settings you can<br/>actually find.</h2>
				<p class="text-sm text-neutral-500 leading-relaxed max-w-2xl">The original WordPress sidebar lumped everything together — core WP features, appearance options, and every plugin's settings at the same visual level. The redesign introduces three clearly named categories. You always know where to look, and nothing ever gets buried under something unrelated.</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-5 cs-fade-up">
				<div class="bg-neutral-950 border border-white/5 rounded-3xl p-8 flex flex-col gap-5">
					<div class="flex items-center gap-3">
						<span class="w-8 h-8 rounded-full bg-[#0073aa]/20 border border-[#0073aa]/30 text-[#4da6cc] text-sm flex items-center justify-center font-black">1</span>
						<span class="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">Category One</span>
					</div>
					<h4 class="text-2xl font-black text-white">WebPages</h4>
					<p class="text-sm text-neutral-500 leading-relaxed">Core WordPress content features — the things you use to actually run and publish on the website. If you're creating or managing content, it lives here.</p>
					<ul class="space-y-1.5 mt-auto pt-4 border-t border-white/5">
						{#each ['Dashboard', 'Post', 'Media', 'Pages', 'Comments'] as item}
							<li class="text-xs text-neutral-600 flex items-center gap-2"><span class="w-1 h-1 rounded-full bg-[#0073aa]/50 shrink-0"></span>{item}</li>
						{/each}
					</ul>
				</div>
				<div class="bg-neutral-950 border border-white/5 rounded-3xl p-8 flex flex-col gap-5">
					<div class="flex items-center gap-3">
						<span class="w-8 h-8 rounded-full bg-[#0073aa]/20 border border-[#0073aa]/30 text-[#4da6cc] text-sm flex items-center justify-center font-black">2</span>
						<span class="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">Category Two</span>
					</div>
					<h4 class="text-2xl font-black text-white">WordPress Settings</h4>
					<p class="text-sm text-neutral-500 leading-relaxed">All admin configuration in one grouped section. Appearance, Plugins, Users — with Advanced Settings nesting import/export, Customizer, and other power-user tools.</p>
					<ul class="space-y-1.5 mt-auto pt-4 border-t border-white/5">
						{#each ['Appearance', 'Plugins', 'Users (profile, creation, deletion)', 'Tools', 'Advanced Settings (import/export, Customizer)'] as item}
							<li class="text-xs text-neutral-600 flex items-center gap-2"><span class="w-1 h-1 rounded-full bg-[#0073aa]/50 shrink-0"></span>{item}</li>
						{/each}
					</ul>
				</div>
				<div class="bg-neutral-950 border border-white/5 rounded-3xl p-8 flex flex-col gap-5">
					<div class="flex items-center gap-3">
						<span class="w-8 h-8 rounded-full bg-[#0073aa]/20 border border-[#0073aa]/30 text-[#4da6cc] text-sm flex items-center justify-center font-black">3</span>
						<span class="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">Category Three</span>
					</div>
					<h4 class="text-2xl font-black text-white">Plugin Settings</h4>
					<p class="text-sm text-neutral-500 leading-relaxed">Each installed plugin gets its own dedicated settings page, clearly labelled. Plugin settings never mix with core WordPress settings — they can't get confused or lost.</p>
					<ul class="space-y-1.5 mt-auto pt-4 border-t border-white/5">
						{#each ['Elementor', 'WP Rocket', 'WPML', 'Gutenberg', 'Any installed plugin…'] as item}
							<li class="text-xs text-neutral-600 flex items-center gap-2"><span class="w-1 h-1 rounded-full bg-[#0073aa]/50 shrink-0"></span>{item}</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- EDITORIAL -->
	<div bind:this={editorialTriggerEl} data-theme="light">
		<section class="bg-white px-6 py-32">
			<div class="max-w-7xl mx-auto space-y-28">

				<!-- 01 — Problem -->
				<div class="cs-fade-up">
					<div class="flex items-center gap-4 mb-10">
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase">01</span>
						<div class="h-px flex-1 bg-neutral-200"></div>
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase">Problem</span>
					</div>
					<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
						<h2 class="text-[34px] md:text-5xl font-black tracking-tight text-neutral-900 leading-[0.95]">The<br/>Problem</h2>
						<p class="text-xl font-light text-neutral-500 leading-relaxed pt-2">{project.problem}</p>
					</div>
					<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
						{#each [
							{ n: '0', label: 'Global search', sub: 'Didn\'t exist in WP admin' },
							{ n: '8+', label: 'Sidebar items', sub: 'All at the same flat level' },
							{ n: '3', label: 'Settings categories', sub: 'Redesigned into clear groups' },
						] as s}
							<div class="border border-neutral-200 rounded-2xl p-5">
								<span class="text-4xl font-black text-neutral-900 block leading-none mb-2">{s.n}</span>
								<span class="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block">{s.label}</span>
								<span class="text-xs text-neutral-400 mt-1 block">{s.sub}</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- 02 — Process -->
				<div class="cs-fade-up">
					<div class="flex items-center gap-4 mb-10">
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase">02</span>
						<div class="h-px flex-1 bg-neutral-200"></div>
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase">Process</span>
					</div>
					<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
						<h2 class="text-[34px] md:text-5xl font-black tracking-tight text-neutral-900 leading-[0.95]">Process<br/>&amp;&nbsp;Approach</h2>
						<p class="text-xl font-light text-neutral-500 leading-relaxed pt-2">{project.process}</p>
					</div>
					<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
						{#each [
							{ n: '01', title: 'Audit & Map', desc: 'Documented every admin flow — Dashboard, settings, plugin pages, user management — and mapped exactly where the navigation hierarchy broke down and friction accumulated.' },
							{ n: '02', title: 'Redesign in Figma', desc: 'Rebuilt Dashboard with a three-column layout, introduced global search bar, restructured sidebar into named categories, and redesigned Pages & Posts with quick access.' },
							{ n: '03', title: 'Extend & Iterate', desc: 'Added features the original admin never had: role badge, Create dropdown, Recent Activity feed, WordPress Events with location and timezone, last-login security indicator.' }
						] as s}
							<div class="border border-neutral-100 rounded-2xl p-5 flex gap-5 hover:border-neutral-300 transition-colors">
								<span class="text-[11px] font-black font-mono text-neutral-300 shrink-0 mt-0.5">{s.n}</span>
								<div>
									<p class="text-sm font-bold text-neutral-900 mb-2">{s.title}</p>
									<p class="text-sm text-neutral-500 leading-relaxed">{s.desc}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- 03 — Design -->
				<div class="cs-fade-up">
					<div class="flex items-center gap-4 mb-10">
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase">03</span>
						<div class="h-px flex-1 bg-neutral-200"></div>
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase">Design</span>
					</div>
					<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
						<h2 class="text-[34px] md:text-5xl font-black tracking-tight text-neutral-900 leading-[0.95]">The<br/>Design</h2>
						<p class="text-xl font-light text-neutral-500 leading-relaxed pt-2">{project.solution}</p>
					</div>
					<div class="border border-neutral-200 rounded-2xl overflow-hidden">
						<div class="grid grid-cols-[1fr_180px_220px] border-b border-neutral-200 bg-neutral-50 px-6 py-3">
							<span class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">Decision</span>
							<span class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">Before</span>
							<span class="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">After</span>
						</div>
						{#each [
							{ decision: 'Dashboard layout', before: 'Single column, flat widgets', after: 'Three-column with activity feed' },
							{ decision: 'Navigation', before: '8-item flat sidebar', after: '3 named groups: WebPages / WP / Plugins' },
							{ decision: 'Search', before: 'Didn\'t exist', after: 'Global bar, results on every screen' },
							{ decision: 'Create content', before: 'Navigate to Post or Page menu', after: 'Create dropdown in topbar' },
							{ decision: 'Dashboard personalisation', before: 'Hidden Screen Options button', after: 'Dedicated Toggle panel with drag reorder' },
						] as row}
							<div class="grid grid-cols-[1fr_180px_220px] border-b border-neutral-100 last:border-0 px-6 py-4 items-center">
								<span class="text-sm font-semibold text-neutral-700">{row.decision}</span>
								<span class="text-sm text-neutral-400 line-through">{row.before}</span>
								<span class="text-sm font-semibold text-neutral-900">{row.after}</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- 04 — Outcome -->
				<div class="cs-fade-up">
					<div class="bg-neutral-950 rounded-3xl overflow-hidden">
						<div class="px-10 md:px-16 pt-12 pb-10 border-b border-white/5">
							<div class="flex items-center gap-3 mb-8">
								<span class="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase">04</span>
								<div class="h-px flex-1 bg-white/5"></div>
								<span class="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase">Outcome</span>
							</div>
							<h2 class="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
								Where it <span class="text-shimmer-white">Led.</span>
							</h2>
						</div>
						<div class="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5">
							<div class="p-8 md:p-10 flex flex-col">
								<div class="flex items-center gap-2 mb-5">
									<div class="w-1.5 h-1.5 rounded-full bg-[#0073aa] shrink-0 animate-pulse"></div>
									<span class="text-[8px] font-mono tracking-[0.3em] text-[#0073aa]/70 uppercase">The Moment</span>
								</div>
								<p class="text-2xl font-black text-white leading-snug mb-3">WordPress domain knowledge — turned into a career.</p>
								<p class="text-sm text-neutral-500 leading-relaxed flex-1">{project.outcome}</p>
							</div>
							<div class="p-8 md:p-10 flex flex-col">
								<div class="flex items-center gap-2 mb-5">
									<div class="w-1.5 h-1.5 rounded-full bg-neutral-500 shrink-0"></div>
									<span class="text-[8px] font-mono tracking-[0.3em] text-neutral-500 uppercase">The Lesson</span>
								</div>
								<p class="text-2xl font-black text-white leading-snug mb-3">Depth signals expertise. Breadth signals curiosity.</p>
								<p class="text-sm text-neutral-500 leading-relaxed flex-1">The WordPress admin isn't glamorous to redesign — but that's exactly why it worked. Going deep on a product most designers avoid, then adding features the original never had, proved platform understanding that a generic portfolio piece couldn't. Specificity is what opened the door.</p>
								<a href="https://www.behance.net/gallery/111596675/WordPress-Redesign-(New-Features-Changes)" target="_blank" rel="noopener noreferrer" class="mt-6 flex items-center gap-2 text-[#0073aa]/60 hover:text-[#4da6cc] transition-colors">
									<span class="text-[9px] font-mono tracking-widest uppercase">View full project on Behance ↗</span>
								</a>
							</div>
						</div>
					</div>
				</div>

				<!-- Key Design Decisions -->
				<div class="cs-fade-up">
					<div class="flex items-center gap-4 mb-10">
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase">Key Design Decisions</span>
						<div class="h-px flex-1 bg-neutral-200"></div>
					</div>
					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{#each features as f}
							<div class="border border-neutral-200 rounded-2xl p-6 hover:border-neutral-300 transition-colors">
								<span class="text-2xl mb-4 block">{f.icon}</span>
								<p class="text-sm font-bold text-neutral-900 mb-2">{f.title}</p>
								<p class="text-sm text-neutral-500 leading-relaxed">{f.desc}</p>
							</div>
						{/each}
					</div>
				</div>

			</div>
		</section>
	</div>

</div>

<ExploreProjectComponent currentSlug="wordpress-redesign" />

<style>
	.sp-wrap { position: relative; padding: 1px; overflow: hidden; display: flex; flex-direction: column; }
	.sp-spin, .sp-spin-accent {
		position: absolute; inset: -1000%;
		animation: spin 3s linear infinite; animation-play-state: paused;
		opacity: 0; transition: opacity 0.3s ease;
	}
	.sp-spin { background: conic-gradient(transparent 270deg, rgba(255,255,255,0.6) 360deg); }
	.sp-spin-accent { background: conic-gradient(transparent 270deg, rgba(0,115,170,0.7) 360deg); }
	.sp-inner { position: relative; flex: 1; overflow: hidden; }
	.sp-wrap:hover .sp-spin, .sp-wrap:hover .sp-spin-accent { animation-play-state: running; opacity: 0.85; }
	@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

	.wp-video-card {
		border-radius: 1.5rem; overflow: hidden; background: #0a0a0a;
		border: 1px solid rgba(255,255,255,0.06); display: flex; flex-direction: column;
		box-shadow: 0 4px 16px rgba(0,0,0,0.55), 0 16px 48px rgba(0,0,0,0.45), 0 0 70px rgba(255,255,255,0.02);
		transition: box-shadow 0.5s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1);
	}
	.wp-video-card:hover {
		box-shadow: 0 4px 16px rgba(0,0,0,0.65), 0 20px 64px rgba(0,0,0,0.55), 0 0 120px rgba(255,255,255,0.06), 0 48px 100px rgba(0,0,0,0.4);
		transform: translateY(-3px);
	}
	input[type='range'] { accent-color: #ffffff; }

	.img-trigger {
		display: block; width: 100%; position: relative;
		cursor: zoom-in; border: none; padding: 0; background: none; text-align: left;
	}
	.img-preview-badge {
		position: absolute; bottom: 10px; right: 10px;
		display: flex; align-items: center; gap: 5px;
		background: rgba(0,0,0,0.55); backdrop-filter: blur(8px);
		border-radius: 99px; padding: 4px 10px 4px 6px;
		opacity: 1; transition: opacity 0.2s ease; pointer-events: none;
	}
	.img-trigger:hover .img-preview-badge { opacity: 0; }
	.img-trigger-overlay {
		position: absolute; inset: 0;
		display: flex; align-items: center; justify-content: center;
		background: rgba(0,0,0,0); transition: background 0.2s ease; pointer-events: none;
	}
	.img-trigger:hover .img-trigger-overlay { background: rgba(0,0,0,0.4); }
	.img-expand-icon {
		width: 44px; height: 44px; border-radius: 50%;
		background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
		backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center;
		opacity: 0; transform: scale(0.85); transition: opacity 0.2s ease, transform 0.2s ease;
	}
	.img-trigger:hover .img-expand-icon { opacity: 1; transform: scale(1); }

	@media (pointer: coarse) {
		.wp-video-card .absolute.bottom-4 { opacity: 1 !important; transform: translateY(0) !important; }
		.wp-video-card .pointer-events-none { display: none; }
	}
</style>
