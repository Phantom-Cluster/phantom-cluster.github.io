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
		{ icon: '◫', title: 'Category-Led Navigation', desc: 'Six editorial beats (Sports, Tech, Health, Business, Lifestyle, Covid-19) surface in both the header bar and the footer columns — readers jump to their specific topic from anywhere.' },
		{ icon: '◳', title: 'Four-Column Hero Grid', desc: 'Four articles visible immediately on load, each labeled with category before headline. No card is anonymous — topic context always comes first.' },
		{ icon: '◈', title: 'Trending 2-Up Layout', desc: 'A large featured card anchors the Trending section with a secondary highlight alongside, then three equal-weight cards below — visual hierarchy without per-article editorial decisions.' },
		{ icon: '▦', title: 'Sidebar as Utility Layer', desc: 'Newsletter signup and social follower counts sit alongside the article list — utility delivered inline without a popup or a separate page interrupting the reading flow.' },
		{ icon: '◑', title: 'Videos in the Dark', desc: 'The Videos section switches to a near-black background, giving thumbnails the contrast and visual weight they need without competing with editorial text content.' },
		{ icon: '◉', title: 'Footer as Discovery', desc: 'Five category columns transform the footer into a topic-discovery tool — readers who scroll to the bottom find article links, not just legal text.' },
	];

	onMount(() => {
		navTheme.set('light');
		document.body.style.backgroundColor = '#ffffff';
		gsap.registerPlugin(ScrollTrigger);
		const t = setTimeout(() => {
			ctx = gsap.context(() => {
				gsap.to(pageWrapperEl, {
					backgroundColor: '#000000', color: '#ffffff', ease: 'none',
					scrollTrigger: { trigger: bentoTriggerEl, start: 'top 90%', end: 'top 60%', scrub: true,
						onEnter: () => navTheme.set('dark'), onLeaveBack: () => navTheme.set('light') }
				});
				gsap.to(pageWrapperEl, {
					backgroundColor: '#ffffff', color: '#171717', ease: 'none', immediateRender: false,
					scrollTrigger: { trigger: editorialTriggerEl, start: 'top 90%', end: 'top 60%', scrub: true,
						onEnter: () => navTheme.set('light'), onLeaveBack: () => navTheme.set('dark') }
				});
				gsap.from('.cs-hero-element', { y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' });
				gsap.utils.toArray('.cs-fade-up').forEach((el: any) => {
					gsap.from(el, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
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
	<title>Alt News Concept | Hitanshu Sahu</title>
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
						<span class="text-[11px] font-mono tracking-widest text-neutral-500 uppercase">Concept — News Template Design</span>
					</div>
				</div>
				<div class="hidden sm:flex items-center gap-4">
					<a href="https://www.behance.net/gallery/109173469/Alt-News-(Concept-Design)" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#CC0000]/40 bg-[#CC0000]/5 text-[9px] font-mono tracking-widest text-[#CC0000] uppercase hover:border-[#CC0000]/70 hover:bg-[#CC0000]/10 transition-colors">Behance ↗</a>
					<span class="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">2020</span>
				</div>
			</div>

			<div class="flex items-start gap-10 cs-hero-element">
				<div class="flex-1 min-w-0">
					<p class="text-[11px] font-mono tracking-[0.35em] uppercase text-neutral-400 mb-5">Alt News</p>
					<h1 class="text-[clamp(3rem,8vw,7.5rem)] font-black tracking-tight leading-[0.9] text-neutral-900">
						One&nbsp;Section.<br/>
						<span class="text-neutral-300">One</span>&nbsp;Purpose.
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
						<span class="text-sm font-semibold text-neutral-800">Web / News</span>
					</div>
					<div>
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Tools</span>
						<span class="text-sm font-semibold text-neutral-800">Figma</span>
					</div>
					<div>
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Type</span>
						<span class="text-sm font-semibold text-neutral-800">Concept / Template</span>
					</div>
					<div class="pt-5 border-t border-neutral-100">
						<a href="https://www.behance.net/gallery/109173469/Alt-News-(Concept-Design)" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-[#CC0000] hover:underline">
							<span class="text-[9px] font-mono tracking-widest uppercase">View on Behance</span>
							<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
						</a>
					</div>
				</div>
			</div>

			<div class="grid grid-cols-3 border-t border-b border-neutral-200 mt-12 cs-hero-element">
				<div class="py-7 pr-4 md:pr-8 border-r border-neutral-200">
					<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">Page Sections</span>
					<div class="flex items-baseline gap-1.5 leading-none flex-wrap">
						<span class="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">5</span>
						<span class="text-xs md:text-sm font-semibold text-neutral-400 leading-none">Dedicated Zones</span>
					</div>
				</div>
				<div class="py-7 px-3 md:px-8 border-r border-neutral-200">
					<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">Content Categories</span>
					<div class="flex items-baseline gap-1 leading-none flex-wrap">
						<span class="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">6</span>
						<span class="text-xs md:text-sm font-semibold text-neutral-400 leading-none">Editorial Beats</span>
					</div>
				</div>
				<div class="py-7 pl-3 md:pl-8">
					<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">Year</span>
					<div class="flex items-baseline gap-1 leading-none flex-wrap">
						<span class="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">2020</span>
						<span class="text-xs md:text-sm font-semibold text-neutral-400 leading-none">Concept</span>
					</div>
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
						<div class="sp-inner bg-neutral-950 rounded-4xl p-10 lg:p-14 border border-white/5 flex flex-col justify-between min-h-[260px]">
							<p class="text-[11px] font-mono tracking-widest text-[#CC0000]/70 uppercase mb-8">{project.role} · News Template Concept · 2020</p>
							<h2 class="text-3xl lg:text-5xl font-black tracking-tight text-white leading-[1.05]">
								A <span class="text-shimmer-white">section-by-section news interface</span> — where each content type gets its own zone so readers always know what they're looking at.
							</h2>
						</div>
					</div>
					<div class="lg:col-span-4 sp-wrap rounded-4xl cs-fade-up">
						<div class="sp-spin-accent"></div>
						<div class="sp-inner bg-neutral-950 rounded-4xl p-10 border border-white/5 flex flex-col justify-between min-h-[260px]">
							<div>
								<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-3">Project</span>
								<span class="text-4xl font-black tracking-tighter text-white">Alt News</span>
							</div>
							<div class="space-y-3">
								<div>
									<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-1">Status</span>
									<span class="text-sm font-semibold text-neutral-300">Concept · Published on Behance</span>
								</div>
								<div>
									<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-1">Accent</span>
									<span class="inline-flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-[#CC0000] shrink-0"></span><span class="text-sm font-semibold text-neutral-300">Bold Red — ALT News brand</span></span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-5">
					<div class="sp-wrap rounded-4xl cs-fade-up">
						<div class="sp-spin"></div>
						<div class="sp-inner bg-neutral-950 rounded-4xl p-10 border border-white/5">
							<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-500 uppercase block mb-4">Page Sections</span>
							<div class="flex items-baseline gap-2 mb-3">
								<span class="text-5xl font-black tracking-tight text-white">5</span>
							</div>
							<p class="text-sm text-neutral-500 leading-relaxed">Hero · Trending · Latest News · Videos · Footer — each section isolated with a single visual language and purpose.</p>
						</div>
					</div>
					<div class="sp-wrap rounded-4xl cs-fade-up">
						<div class="sp-spin"></div>
						<div class="sp-inner bg-neutral-950 rounded-4xl p-10 border border-white/5">
							<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-500 uppercase block mb-4">Content Categories</span>
							<div class="flex items-baseline gap-2 mb-3">
								<span class="text-5xl font-black tracking-tight text-white">6</span>
							</div>
							<p class="text-sm text-neutral-500 leading-relaxed">Sports, Technology, Health, Business, Lifestyle, Covid-19 — surfaced in the header and anchoring the footer.</p>
						</div>
					</div>
					<div class="sp-wrap rounded-4xl cs-fade-up">
						<div class="sp-spin"></div>
						<div class="sp-inner bg-neutral-950 rounded-4xl p-10 border border-white/5">
							<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-500 uppercase block mb-4">Navigation Layers</span>
							<div class="flex items-baseline gap-2 mb-3">
								<span class="text-5xl font-black tracking-tight text-white">2×</span>
							</div>
							<p class="text-sm text-neutral-500 leading-relaxed">Category nav in the header bar and five category columns in the footer — readers reach any beat from anywhere on the page.</p>
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

			<div class="an-video-card group cs-fade-up" bind:this={wrapperEl}>
				<!-- svelte-ignore a11y_media_has_caption -->
				<div class="relative overflow-hidden rounded-t-[calc(1.5rem-1px)]">
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
					<video
						bind:this={videoEl}
						bind:paused={isPaused}
						bind:currentTime
						bind:duration
						src="/images/projects/alt-news/Alt%20News%20-%20Figma.mp4"
						class="w-full aspect-video object-cover block cursor-pointer"
						playsinline preload="metadata"
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
					<p class="text-sm text-neutral-400 leading-relaxed">Complete walkthrough of the Figma file — covers Homepage Hero, Trending News, Latest News with newsletter sidebar, Videos section, and Footer.</p>
				</div>
			</div>

		</div>
	</section>

	<!-- SCREEN 01: HOMEPAGE HERO — white -->
	<section class="bg-white px-6 py-24 border-t border-neutral-200">
		<div class="max-w-7xl mx-auto cs-fade-up">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
				<div>
					<span class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase block mb-5">Screen 01 — Homepage Hero</span>
					<h3 class="text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight leading-[0.93] mb-5">Category first.<br/>Always.</h3>
					<p class="text-sm text-neutral-500 leading-relaxed">The homepage is anchored by two navigation layers — a utility bar at the top with About, Contact, the ALT News logo centre, and social platform icons right, then a dedicated category bar beneath it with six editorial beats always visible. The main content area is a four-column card grid where every card surfaces its category label before the headline — never anonymous content. Below the grid, a full-width search bar with a bold red underline marks the transition into the next section, so the search affordance is always in the reader's peripheral view as they scroll past the hero.</p>
				</div>
				<ul class="space-y-3 lg:pt-14">
					{#each [
						'Dual navigation: utility topbar + dedicated category bar across 6 editorial beats',
						'Four-column hero card grid — category label always appears before the headline',
						'Social icons in topbar: Facebook, Instagram, Twitter, YouTube — direct platform links',
						'Full-width search bar at hero bottom with red accent underline and placeholder guidance',
						'Card grid uses photo thumbnails with title and author attribution on every card',
						'Clean white-and-dark-navy palette — content takes priority over decoration',
					] as b}
						<li class="flex items-start gap-3 text-sm text-neutral-600 leading-snug"><span class="w-1 h-1 rounded-full bg-neutral-300 shrink-0 mt-[6px]"></span>{b}</li>
					{/each}
				</ul>
			</div>
			<div class="bg-neutral-100 rounded-3xl p-4 lg:p-5">
				<p class="text-[8px] font-mono tracking-widest text-neutral-400 uppercase mb-3 pl-1">Homepage — Hero Section</p>
				<button type="button" class="img-trigger rounded-2xl overflow-hidden shadow-sm" onclick={() => openModal('/images/projects/alt-news/Hero%20.png', 'Homepage Hero')} aria-label="View homepage hero">
					<img src="/images/projects/alt-news/Hero%20.png" alt="Homepage Hero" class="w-full block" loading="lazy" />
					<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
					<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
				</button>
			</div>
		</div>
	</section>

	<!-- SCREEN 02: TRENDING NEWS — black -->
	<section class="bg-black px-6 py-24 border-t border-white/4">
		<div class="max-w-7xl mx-auto cs-fade-up">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
				<div>
					<span class="text-[9px] font-mono tracking-widest text-neutral-600 uppercase block mb-5">Screen 02 — Trending News</span>
					<h3 class="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[0.93] mb-5">The feed with<br/>a hierarchy.</h3>
					<p class="text-sm text-neutral-500 leading-relaxed">The Trending section uses a featured 2-up card layout that creates natural editorial weight without requiring a per-article decision. One large card anchors the left side, a second highlighted story holds the right, and three equal-weight cards fill the row below. An "all trending news" link with a red underline sits in the section header — always visible, never blocking the content, letting readers escape to the full feed without disrupting their current browse. Author name and date run on every card without exception.</p>
				</div>
				<ul class="space-y-3 lg:pt-14">
					{#each [
						'1 large featured card left + 1 secondary highlight right — natural visual hierarchy',
						'3 equal supporting cards below the featured pair — consistent weight, no favouritism',
						'"All trending news" link in section header with red underline — escape hatch always visible',
						'Author name and publish date on every single card — no anonymous content',
						'White background for Trending keeps it distinct from the dark Videos section below',
						'Section heading bold black on white — content-first, decoration-last',
					] as b}
						<li class="flex items-start gap-3 text-sm text-neutral-500 leading-snug"><span class="w-1 h-1 rounded-full bg-neutral-600 shrink-0 mt-[6px]"></span>{b}</li>
					{/each}
				</ul>
			</div>
			<div class="bg-neutral-900 rounded-3xl p-4 lg:p-5 border border-white/5">
				<p class="text-[8px] font-mono tracking-widest text-neutral-500 uppercase mb-3 pl-1">Trending News Section</p>
				<button type="button" class="img-trigger rounded-2xl overflow-hidden" onclick={() => openModal('/images/projects/alt-news/Trending%20news%20section.png', 'Trending News Section')} aria-label="View trending news section">
					<img src="/images/projects/alt-news/Trending%20news%20section.png" alt="Trending News Section" class="w-full block" loading="lazy" />
					<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
					<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
				</button>
			</div>
		</div>
	</section>

	<!-- SCREEN 03: LATEST NEWS — white -->
	<section class="bg-white px-6 py-24 border-t border-neutral-200">
		<div class="max-w-7xl mx-auto cs-fade-up">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
				<div>
					<span class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase block mb-5">Screen 03 — Latest News</span>
					<h3 class="text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight leading-[0.93] mb-5">Content left.<br/>Utility right.</h3>
					<p class="text-sm text-neutral-500 leading-relaxed">The Latest News section runs as a clean two-column layout. The left column is a scannable article list — thumbnail, bold title, author in red accent colour, date, and a two-line excerpt so readers can evaluate the story before clicking. The right column surfaces utility: a newsletter signup with a single email field and a bold Subscribe CTA, then below it four social follower count tiles (Facebook 56,568 · Instagram 1.8K · YouTube 56K · Twitter 2.9K) that let readers connect on their preferred platform. Utility never interrupts — it sits alongside, not between, the content.</p>
				</div>
				<ul class="space-y-3 lg:pt-14">
					{#each [
						'Article list: thumbnail + bold title + author (in red) + date + 2-line excerpt',
						'Author names in red accent — consistent with site-wide link colour language',
						'Newsletter signup: email field + Subscribe CTA — no popup, no modal',
						'Social counts: Facebook 56,568 · Instagram 1.8K · YouTube 56K · Twitter 2.9K',
						'Utility sidebar content never interrupts the article list — sits alongside it',
						'Clean white background keeps article typography readable at comfortable line lengths',
					] as b}
						<li class="flex items-start gap-3 text-sm text-neutral-600 leading-snug"><span class="w-1 h-1 rounded-full bg-neutral-300 shrink-0 mt-[6px]"></span>{b}</li>
					{/each}
				</ul>
			</div>
			<div class="bg-neutral-100 rounded-3xl p-4 lg:p-5">
				<p class="text-[8px] font-mono tracking-widest text-neutral-400 uppercase mb-3 pl-1">Latest News + Newsletter Sidebar</p>
				<button type="button" class="img-trigger rounded-2xl overflow-hidden shadow-sm" onclick={() => openModal('/images/projects/alt-news/Auto-sorted%20latest%20news.png', 'Latest News Section')} aria-label="View latest news section">
					<img src="/images/projects/alt-news/Auto-sorted%20latest%20news.png" alt="Latest News Section" class="w-full block" loading="lazy" />
					<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
					<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
				</button>
			</div>
		</div>
	</section>

	<!-- SCREEN 04 & 05: VIDEOS + FOOTER — dark -->
	<section class="bg-black px-6 py-24 border-t border-white/4">
		<div class="max-w-7xl mx-auto">

			<div class="cs-fade-up mb-24">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
					<div>
						<span class="text-[9px] font-mono tracking-widest text-neutral-600 uppercase block mb-5">Screen 04 — Videos</span>
						<h3 class="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[0.93] mb-5">Video gets<br/>its own dark.</h3>
						<p class="text-sm text-neutral-500 leading-relaxed">The Videos section switches to a near-black background — the only section on the page with a dark treatment. This gives video thumbnails the contrast and visual weight they need to read as video rather than static editorial. A single large featured video anchors the left with title and author attribution below. Four secondary video entries fill the right column as a compact list: thumbnail with play icon overlay, title bold, author and date below. An "All Videos" link in the section header mirrors the Trending section's escape hatch pattern — consistent navigation language across the page.</p>
					</div>
					<ul class="space-y-3 lg:pt-14">
						{#each [
							'Dark near-black background isolates video content from the white editorial sections',
							'1 large featured video left — title and author attribution below thumbnail',
							'4 secondary video entries right — thumbnail + play icon + title + author + date',
							'"All Videos" link in section header — consistent escape-hatch pattern',
							'Play icon overlaid on every thumbnail — affordance is always visible, never hidden',
							'Dark section creates a visual chapter break between Latest News and the Footer',
						] as b}
							<li class="flex items-start gap-3 text-sm text-neutral-500 leading-snug"><span class="w-1 h-1 rounded-full bg-neutral-600 shrink-0 mt-[6px]"></span>{b}</li>
						{/each}
					</ul>
				</div>
				<div class="bg-neutral-900 rounded-3xl p-4 lg:p-5 border border-white/5">
					<p class="text-[8px] font-mono tracking-widest text-neutral-500 uppercase mb-3 pl-1">Videos Section</p>
					<button type="button" class="img-trigger rounded-2xl overflow-hidden" onclick={() => openModal('/images/projects/alt-news/Videos%20section.png', 'Videos Section')} aria-label="View videos section">
						<img src="/images/projects/alt-news/Videos%20section.png" alt="Videos Section" class="w-full block" loading="lazy" />
						<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
						<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
					</button>
				</div>
			</div>

			<div class="cs-fade-up">
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
					<div>
						<span class="text-[9px] font-mono tracking-widest text-neutral-600 uppercase block mb-5">Screen 05 — Footer</span>
						<h3 class="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[0.93] mb-5">Footer as<br/>a discovery tool.</h3>
						<p class="text-sm text-neutral-500 leading-relaxed">The footer transforms from a legal afterthought into an editorial map. Five category columns — Business, Technology, Health, Sports, Lifestyle — each hold topic-specific article links, turning the end of the page into another discovery surface for readers who scroll all the way down. The section uses the same near-black background as the Videos section, creating a unified dark chapter that closes the page. The ALT News logo anchors the bottom bar alongside standard legal links: Contact, Terms of Use, Advertise, Newsletter, Sitemap, Accessibility, and Copyright.</p>
					</div>
					<ul class="space-y-3 lg:pt-14">
						{#each [
							'5 category columns: Business, Technology, Health, Sports, Lifestyle',
							'Each column holds article links — footer as discovery, not just compliance',
							'ALT News logo bottom-left — brand identity present at page-end',
							'Legal links: Contact · Terms · Advertise · Newsletter · Sitemap · Accessibility',
							'Continuous dark background from Videos → Footer creates a strong visual close',
							'Copyright attribution bottom-left: PhantomCluster',
						] as b}
							<li class="flex items-start gap-3 text-sm text-neutral-500 leading-snug"><span class="w-1 h-1 rounded-full bg-neutral-600 shrink-0 mt-[6px]"></span>{b}</li>
						{/each}
					</ul>
				</div>
				<div class="bg-neutral-900 rounded-3xl p-4 lg:p-5 border border-white/5">
					<p class="text-[8px] font-mono tracking-widest text-neutral-500 uppercase mb-3 pl-1">Footer — Category Discovery</p>
					<button type="button" class="img-trigger rounded-2xl overflow-hidden" onclick={() => openModal('/images/projects/alt-news/Footer.png', 'Footer — Category Discovery')} aria-label="View footer">
						<img src="/images/projects/alt-news/Footer.png" alt="Footer — Category Discovery" class="w-full block" loading="lazy" />
						<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
						<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
					</button>
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
							{ n: '∞', label: 'Competing sections', sub: 'Visible on a single news page' },
							{ n: '6', label: 'Content types', sub: 'Mixed without visual separation' },
							{ n: '0', label: 'Clear section breaks', sub: 'In the original layout' },
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
							{ n: '01', title: 'Map Reader Intent', desc: 'Identified five core reader goals: discover trending, browse a specific beat, read the latest, watch videos, find articles by topic. Each intent became a dedicated section with its own layout.' },
							{ n: '02', title: 'Design Section by Section', desc: 'Each section was built for one purpose and given a visual treatment matched to its content — card grid for Hero, 2-up for Trending, article list for Latest, dark background for Videos.' },
							{ n: '03', title: 'Connect Through Navigation', desc: 'Six categories surface twice: in the header category bar for quick access from the top, and as five columns in the footer for discovery at the bottom. Consistent escape hatches throughout.' },
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
							{ decision: 'Page layout', before: 'Single long mixed feed', after: '5 named, isolated sections' },
							{ decision: 'Category access', before: 'Top nav or sidebar only', after: 'Header bar + 5 footer columns' },
							{ decision: 'Content type mixing', before: 'Articles and videos in one feed', after: 'Videos isolated in dark section' },
							{ decision: 'Newsletter placement', before: 'Footer or popup overlay', after: 'Sidebar inline with article list' },
							{ decision: 'Trending vs Latest', before: 'Merged into the same feed', after: 'Separate sections, different layouts' },
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
									<div class="w-1.5 h-1.5 rounded-full bg-[#CC0000] shrink-0 animate-pulse"></div>
									<span class="text-[8px] font-mono tracking-[0.3em] text-[#CC0000]/70 uppercase">The Moment</span>
								</div>
								<p class="text-2xl font-black text-white leading-snug mb-3">Section-based thinking — proved as a system, not a theory.</p>
								<p class="text-sm text-neutral-500 leading-relaxed flex-1">{project.outcome}</p>
							</div>
							<div class="p-8 md:p-10 flex flex-col">
								<div class="flex items-center gap-2 mb-5">
									<div class="w-1.5 h-1.5 rounded-full bg-neutral-500 shrink-0"></div>
									<span class="text-[8px] font-mono tracking-[0.3em] text-neutral-500 uppercase">The Lesson</span>
								</div>
								<p class="text-2xl font-black text-white leading-snug mb-3">Less isn't always the answer. Separation is.</p>
								<p class="text-sm text-neutral-500 leading-relaxed flex-1">The noise on news sites doesn't come from too much content — it comes from too many content types sharing the same visual space with no hierarchy. Five sections, six categories, each doing one job: less noise than a single page trying to do everything simultaneously. Clarity through separation, not subtraction.</p>
								<a href="https://www.behance.net/gallery/109173469/Alt-News-(Concept-Design)" target="_blank" rel="noopener noreferrer" class="mt-6 flex items-center gap-2 text-[#CC0000]/60 hover:text-[#CC0000] transition-colors">
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

<ExploreProjectComponent currentSlug="alt-news-concept" />

<style>
	.sp-wrap { position: relative; padding: 1px; overflow: hidden; display: flex; flex-direction: column; }
	.sp-spin, .sp-spin-accent {
		position: absolute; inset: -1000%;
		animation: spin 3s linear infinite; animation-play-state: paused;
		opacity: 0; transition: opacity 0.3s ease;
	}
	.sp-spin { background: conic-gradient(transparent 270deg, rgba(255,255,255,0.6) 360deg); }
	.sp-spin-accent { background: conic-gradient(transparent 270deg, rgba(204,0,0,0.7) 360deg); }
	.sp-inner { position: relative; flex: 1; overflow: hidden; }
	.sp-wrap:hover .sp-spin, .sp-wrap:hover .sp-spin-accent { animation-play-state: running; opacity: 0.85; }
	@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

	.an-video-card {
		background: #111111;
		border: 1px solid rgba(255,255,255,0.07);
		border-radius: 1.5rem;
		overflow: hidden;
		transition: box-shadow 0.4s ease, transform 0.4s ease;
	}
	.an-video-card:hover {
		box-shadow: 0 4px 16px rgba(0,0,0,0.65), 0 20px 64px rgba(0,0,0,0.55), 0 0 120px rgba(204,0,0,0.04), 0 48px 100px rgba(0,0,0,0.4);
		transform: translateY(-3px);
	}
	input[type='range'] { accent-color: #CC0000; }

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
</style>
