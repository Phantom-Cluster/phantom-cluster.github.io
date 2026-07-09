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
		{ icon: '◉', title: 'Colored Usernames', desc: 'Each participant gets a distinct color — Jasmine purple, Rohit orange, Albert teal, Ronald blue. Instantly identifiable in fast-moving group chats without reading names twice.' },
		{ icon: '◫', title: 'DM Right Panel', desc: 'Active Now shows what your contact is doing (Valorant, Spotify), a shared To-Do list tracks tasks together, and a Shared Media grid surfaces every image shared in the DM.' },
		{ icon: '◳', title: 'Channel Category Groups', desc: 'Channels grouped under collapsible labels — Announcements | Read Only, Voice & Live, Chat — replacing the flat list and making server structure readable at a glance.' },
		{ icon: '▦', title: 'Role-Labeled Members', desc: '"Mentor - 1", "Onlines - 130", role subtitles under every name in the member list. You know who\'s who and what they do without hovering or asking.' },
		{ icon: '◑', title: 'Voice Connection Status', desc: '"Voice Connected — Feedback / Adobe Server" visible in the sidebar at all times when in a call, with Video and Screen toggle buttons immediately accessible.' },
		{ icon: '◈', title: 'Screen Share Layout', desc: 'Large featured presenter tile at top with a LIVE badge, participant tiles below — everyone visible, presenter prominent, name labels on every tile.' },
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
	<title>Discord Redesign | Hitanshu Sahu</title>
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
						<span class="text-[11px] font-mono tracking-widest text-neutral-500 uppercase">Concept — Discord New Features &amp; Changes</span>
					</div>
				</div>
				<div class="hidden sm:flex items-center gap-4">
					<a href="https://www.behance.net/gallery/109150543/Discord-Re-Design-(New-Features-Changes)" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#5865F2]/40 bg-[#5865F2]/5 text-[9px] font-mono tracking-widest text-[#818cf8] uppercase hover:border-[#5865F2]/70 hover:bg-[#5865F2]/10 transition-colors">Behance ↗</a>
					<span class="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">2020</span>
				</div>
			</div>

			<div class="flex items-start gap-10 cs-hero-element">
				<div class="flex-1 min-w-0">
					<p class="text-[11px] font-mono tracking-[0.35em] uppercase text-neutral-400 mb-5">Discord</p>
					<h1 class="text-[clamp(3rem,8vw,7.5rem)] font-black tracking-tight leading-[0.9] text-neutral-900">
						Built for<br/>
						<span class="text-neutral-300">the</span>&nbsp;Community.
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
						<span class="text-sm font-semibold text-neutral-800">Desktop App</span>
					</div>
					<div>
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Tools</span>
						<span class="text-sm font-semibold text-neutral-800">Figma</span>
					</div>
					<div>
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Type</span>
						<span class="text-sm font-semibold text-neutral-800">Concept / New Features</span>
					</div>
					<div class="pt-5 border-t border-neutral-100">
						<a href="https://www.behance.net/gallery/109150543/Discord-Re-Design-(New-Features-Changes)" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-[#5865F2] hover:underline">
							<span class="text-[9px] font-mono tracking-widest uppercase">View on Behance</span>
							<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
						</a>
					</div>
				</div>
			</div>

			<div class="grid grid-cols-3 border-t border-b border-neutral-200 mt-12 cs-hero-element">
				<div class="py-7 pr-4 md:pr-8 border-r border-neutral-200">
					<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">Screens Designed</span>
					<div class="flex items-baseline gap-1.5 leading-none flex-wrap">
						<span class="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">3</span>
						<span class="text-xs md:text-sm font-semibold text-neutral-400 leading-none">Key Flows</span>
					</div>
				</div>
				<div class="py-7 px-3 md:px-8 border-r border-neutral-200">
					<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">New Features</span>
					<div class="flex items-baseline gap-1 leading-none flex-wrap">
						<span class="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">6+</span>
						<span class="text-xs md:text-sm font-semibold text-neutral-400 leading-none">Additions</span>
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
							<p class="text-[11px] font-mono tracking-widest text-[#5865F2]/70 uppercase mb-8">{project.role} · Platform Features Concept · 2020</p>
							<h2 class="text-3xl lg:text-5xl font-black tracking-tight text-white leading-[1.05]">
								<span class="text-shimmer-white">Accessibility and clarity</span> — are the same problem. Colored users. Grouped channels. Context that stays.
							</h2>
						</div>
					</div>
					<div class="lg:col-span-4 sp-wrap rounded-4xl cs-fade-up">
						<div class="sp-spin-accent"></div>
						<div class="sp-inner bg-neutral-950 rounded-4xl p-10 border border-white/5 flex flex-col justify-between min-h-[260px]">
							<div>
								<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-3">Project</span>
								<span class="text-4xl font-black tracking-tighter text-white">Discord</span>
							</div>
							<div class="space-y-3">
								<div>
									<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-1">Status</span>
									<span class="text-sm font-semibold text-neutral-300">Concept · Published on Behance</span>
								</div>
								<div>
									<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-1">Outcome</span>
									<span class="text-sm font-semibold text-neutral-300">Features later shipped by Discord</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-5">
					<div class="sp-wrap rounded-4xl cs-fade-up">
						<div class="sp-spin"></div>
						<div class="sp-inner bg-neutral-950 rounded-4xl p-10 border border-white/5">
							<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-500 uppercase block mb-4">New Features</span>
							<div class="flex items-baseline gap-2 mb-3">
								<span class="text-5xl font-black tracking-tight text-white">6+</span>
							</div>
							<p class="text-sm text-neutral-500 leading-relaxed">Colored usernames, DM right panel, channel categories, role-labeled members, voice status bar, screen share layout.</p>
						</div>
					</div>
					<div class="sp-wrap rounded-4xl cs-fade-up">
						<div class="sp-spin"></div>
						<div class="sp-inner bg-neutral-950 rounded-4xl p-10 border border-white/5">
							<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-500 uppercase block mb-4">Key Screens</span>
							<div class="flex items-baseline gap-2 mb-3">
								<span class="text-5xl font-black tracking-tight text-white">3</span>
							</div>
							<p class="text-sm text-neutral-500 leading-relaxed">DM view, Server view, and Screen Share — the three core contexts where Discord breaks down for real users.</p>
						</div>
					</div>
					<div class="sp-wrap rounded-4xl cs-fade-up">
						<div class="sp-spin"></div>
						<div class="sp-inner bg-neutral-950 rounded-4xl p-10 border border-white/5">
							<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-500 uppercase block mb-4">Platform Caught Up</span>
							<div class="flex items-baseline gap-2 mb-3">
								<span class="text-3xl font-black tracking-tight text-white leading-tight">Already<br/>shipped.</span>
							</div>
							<p class="text-sm text-neutral-500 leading-relaxed">Colored usernames and channel categories are now native Discord features — proposed here in 2020.</p>
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

			<div class="dc-video-card group cs-fade-up" bind:this={wrapperEl}>
				<!-- svelte-ignore a11y_media_has_caption -->
				<div class="relative overflow-hidden rounded-t-[calc(1.5rem-1px)]">
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
					<video
						bind:this={videoEl}
						bind:paused={isPaused}
						bind:currentTime
						bind:duration
						src="/images/projects/discord/Discord%20Figma.mp4"
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
					<p class="text-sm text-neutral-400 leading-relaxed">Full walkthrough of the Figma file — covers DM view with the right panel, Server channel grouping, and the Screen Share layout.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- SCREEN 01: DM VIEW — white -->
	<section class="bg-white px-6 py-24 border-t border-neutral-200">
		<div class="max-w-7xl mx-auto cs-fade-up">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
				<div>
					<span class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase block mb-5">Screen 01 — Direct Messages</span>
					<h3 class="text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight leading-[0.93] mb-5">Your DM is a<br/>workspace now.</h3>
					<p class="text-sm text-neutral-500 leading-relaxed">The DM view gains a dedicated right sidebar panel — three sections that give you persistent context about your conversation partner. Active Now shows what they're currently doing (Ronald playing Valorant for 1h, Esther listening to Spotify) with a platform icon badge. Below that, a shared To-Do list lets both people track tasks collaboratively without leaving Discord — checkboxes, task names, one of which is already in-progress. At the bottom, Shared Media surfaces every image exchanged in the DM as a thumbnail grid so nothing gets buried in scroll history. The chat itself introduces colored usernames — each person gets a distinct color, making fast multi-person group chats immediately readable.</p>
				</div>
				<ul class="space-y-3 lg:pt-14">
					{#each [
						'Active Now: friend presence with current activity (game or app) + platform badge',
						'Shared To-Do list: collaborative task tracking directly inside the DM — no external tool',
						'Shared Media grid: every exchanged image surfaced as thumbnails — nothing lost in scroll',
						'Colored usernames: Jasmine purple, Rohit orange, Albert teal, Ronald blue — instant ID',
						'Emoji reactions visible inline: 🔥 4 / 🔥 2 — engagement without leaving the message',
						'File attachment overflow: 3 thumbnails shown + "+3" badge — clean even with many files',
					] as b}
						<li class="flex items-start gap-3 text-sm text-neutral-600 leading-snug"><span class="w-1 h-1 rounded-full bg-neutral-300 shrink-0 mt-[6px]"></span>{b}</li>
					{/each}
				</ul>
			</div>
			<div class="bg-neutral-950 rounded-3xl p-4 lg:p-5">
				<p class="text-[8px] font-mono tracking-widest text-neutral-500 uppercase mb-3 pl-1">DM View — Right Panel + Colored Usernames</p>
				<button type="button" class="img-trigger rounded-2xl overflow-hidden" onclick={() => openModal('/images/projects/discord/DM.webp', 'Discord DM View')} aria-label="View Discord DM redesign">
					<img src="/images/projects/discord/thumbs/DM.webp" alt="Discord DM View" class="w-full block" loading="lazy" decoding="async" />
					<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
					<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
				</button>
			</div>
		</div>
	</section>

	<!-- SCREEN 02: SERVER VIEW — black -->
	<section class="bg-black px-6 py-24 border-t border-white/4">
		<div class="max-w-7xl mx-auto cs-fade-up">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
				<div>
					<span class="text-[9px] font-mono tracking-widest text-neutral-600 uppercase block mb-5">Screen 02 — Server View</span>
					<h3 class="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[0.93] mb-5">A server you can<br/>actually navigate.</h3>
					<p class="text-sm text-neutral-500 leading-relaxed">The server channel list is reorganised into collapsible named category groups — Announcements | Read Only, Voice & Live, and Chat — with clear icons distinguishing channel types (# text, 📅 event, 🔊 voice). Unread badges show exactly how many messages are waiting in each channel (News: 20, Upcoming Event: 10, Challenge Suggestion: 5, Design Features: 10). Active voice channels show who's currently inside — the Feedback channel has Albert and Jasmine, Project Discuss has Albert with a LIVE badge, Wade Warren, and Robert Fox. The right member list is categorized: Mentor - 1 (Ronald, Happiness Engineer) and Onlines - 130, each member showing their role subtitle so you always know context before you @ someone.</p>
				</div>
				<ul class="space-y-3 lg:pt-14">
					{#each [
						'3 channel categories: Announcements | Read Only / Voice & Live / Chat',
						'Channel type icons: # text, 📅 event, 🔊 voice — type visible without opening',
						'Unread badges on every channel: 20 / 10 / 5 / 10 — nothing missed',
						'Voice channels show current members inline with LIVE badge on active ones',
						'Member list categorized: Mentor - 1 / Onlines - 130 with role subtitles',
						'"Voice Connected — Feedback / Adobe Server" status bar with Video + Screen buttons',
					] as b}
						<li class="flex items-start gap-3 text-sm text-neutral-500 leading-snug"><span class="w-1 h-1 rounded-full bg-neutral-600 shrink-0 mt-[6px]"></span>{b}</li>
					{/each}
				</ul>
			</div>
			<div class="bg-neutral-900 rounded-3xl p-4 lg:p-5 border border-white/5">
				<p class="text-[8px] font-mono tracking-widest text-neutral-500 uppercase mb-3 pl-1">Server View — Channel Categories + Member Roles</p>
				<button type="button" class="img-trigger rounded-2xl overflow-hidden" onclick={() => openModal('/images/projects/discord/Server%20Preview%20.webp', 'Discord Server View')} aria-label="View Discord server redesign">
					<img src="/images/projects/discord/thumbs/Server%20Preview%20.webp" alt="Discord Server View" class="w-full block" loading="lazy" decoding="async" />
					<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
					<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
				</button>
			</div>
		</div>
	</section>

	<!-- SCREEN 03: SCREEN SHARE — white -->
	<section class="bg-white px-6 py-24 border-t border-neutral-200">
		<div class="max-w-7xl mx-auto cs-fade-up">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
				<div>
					<span class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase block mb-5">Screen 03 — Screen Share &amp; Voice</span>
					<h3 class="text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight leading-[0.93] mb-5">Everyone visible.<br/>Presenter prominent.</h3>
					<p class="text-sm text-neutral-500 leading-relaxed">The screen share layout is redesigned around a clear visual hierarchy: the presenter's shared screen takes the top center with a red LIVE badge, while two participant tiles sit beneath — Phantom Cluster with a teal background, Jasmine with a brown background and a muted-mic icon. Name labels run on every tile. The sidebar shows the voice connection context clearly — "Voice Connected — Feedback / Adobe Server" as a persistent status bar, with Video and Screen toggle buttons immediately available without entering any settings. The bottom control bar provides camera, screen share, mic mute, hang up (red), fullscreen, and pop-out — all primary actions within one thumb reach.</p>
				</div>
				<ul class="space-y-3 lg:pt-14">
					{#each [
						'Presenter screen top-center with red LIVE badge — hierarchy is unambiguous',
						'2 participant tiles below with distinct background colors and name labels',
						'Muted mic icon visible on Jasmine\'s tile — state is always communicated',
						'"Voice Connected — Feedback / Adobe Server" persistent status in sidebar',
						'Video + Screen toggle buttons in sidebar — no settings menu required',
						'Bottom controls: Camera · Screen · Mic · Hang up · Fullscreen · Pop-out',
					] as b}
						<li class="flex items-start gap-3 text-sm text-neutral-600 leading-snug"><span class="w-1 h-1 rounded-full bg-neutral-300 shrink-0 mt-[6px]"></span>{b}</li>
					{/each}
				</ul>
			</div>
			<div class="bg-neutral-950 rounded-3xl p-4 lg:p-5">
				<p class="text-[8px] font-mono tracking-widest text-neutral-500 uppercase mb-3 pl-1">Screen Share + Voice — Participant Layout</p>
				<button type="button" class="img-trigger rounded-2xl overflow-hidden" onclick={() => openModal('/images/projects/discord/Screen%20share%20.webp', 'Discord Screen Share View')} aria-label="View Discord screen share redesign">
					<img src="/images/projects/discord/thumbs/Screen%20share%20.webp" alt="Discord Screen Share View" class="w-full block" loading="lazy" decoding="async" />
					<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
					<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
				</button>
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
							{ n: '0', label: 'User color coding', sub: 'In the original app at the time' },
							{ n: '∞', label: 'Channels in one flat list', sub: 'No grouping or category labels' },
							{ n: '0', label: 'DM context panel', sub: 'No presence, tasks, or media history' },
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
							{ n: '01', title: 'Audit for Gaps', desc: 'Identified where Discord broke down in real use — fast group chats where all usernames looked identical, server channel lists with no structure, and DMs that buried shared context over time.' },
							{ n: '02', title: 'Accessibility First', desc: 'Assigned distinct colors to usernames — the single change with the biggest readability impact. Grouped channels under named categories to reduce the scanning load for active server members.' },
							{ n: '03', title: 'Extend Without Breaking', desc: 'Added features that fit the existing mental model: a DM right panel that slots where whitespace already existed, voice status that mirrors the sidebar pattern, screen share tiles that follow existing grid logic.' },
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
							{ decision: 'Username display', before: 'White only — anonymous in fast chats', after: 'Color-coded — instant user ID' },
							{ decision: 'DM sidebar', before: 'Empty / absent entirely', after: 'Active Now + To-Do + Shared Media' },
							{ decision: 'Channel list', before: 'Flat list, all channels equal weight', after: 'Categorized groups with type icons' },
							{ decision: 'Member list', before: 'Name only', after: 'Name + role subtitle + activity' },
							{ decision: 'Voice status', before: 'Not visible in sidebar', after: '"Voice Connected" bar + Video/Screen buttons' },
							{ decision: 'Screen share layout', before: 'Equal grid for all participants', after: 'Featured presenter + participant tiles' },
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
									<div class="w-1.5 h-1.5 rounded-full bg-[#5865F2] shrink-0 animate-pulse"></div>
									<span class="text-[8px] font-mono tracking-[0.3em] text-[#5865F2]/70 uppercase">The Moment</span>
								</div>
								<p class="text-2xl font-black text-white leading-snug mb-3">The platform shipped what was proposed here — in 2020.</p>
								<p class="text-sm text-neutral-500 leading-relaxed flex-1">{project.outcome}</p>
							</div>
							<div class="p-8 md:p-10 flex flex-col">
								<div class="flex items-center gap-2 mb-5">
									<div class="w-1.5 h-1.5 rounded-full bg-neutral-500 shrink-0"></div>
									<span class="text-[8px] font-mono tracking-[0.3em] text-neutral-500 uppercase">The Lesson</span>
								</div>
								<p class="text-2xl font-black text-white leading-snug mb-3">Accessibility and clarity are the same problem.</p>
								<p class="text-sm text-neutral-500 leading-relaxed flex-1">Colored usernames weren't an aesthetic choice — they were a functional one. Making users identifiable in a fast chat and making channels scannable in a large server are both the same underlying need: reduce the cognitive load of figuring out who or what you're looking at. The platform eventually agreed.</p>
								<a href="https://www.behance.net/gallery/109150543/Discord-Re-Design-(New-Features-Changes)" target="_blank" rel="noopener noreferrer" class="mt-6 flex items-center gap-2 text-[#5865F2]/60 hover:text-[#818cf8] transition-colors">
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

<ExploreProjectComponent currentSlug="discord-redesign" />

<style>
	.sp-wrap { position: relative; padding: 1px; overflow: hidden; display: flex; flex-direction: column; }
	.sp-spin, .sp-spin-accent {
		position: absolute; inset: -1000%;
		animation: spin 3s linear infinite; animation-play-state: paused;
		opacity: 0; transition: opacity 0.3s ease;
	}
	.sp-spin { background: conic-gradient(transparent 270deg, rgba(255,255,255,0.6) 360deg); }
	.sp-spin-accent { background: conic-gradient(transparent 270deg, rgba(88,101,242,0.7) 360deg); }
	.sp-inner { position: relative; flex: 1; overflow: hidden; }
	.sp-wrap:hover .sp-spin, .sp-wrap:hover .sp-spin-accent { animation-play-state: running; opacity: 0.85; }
	@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

	.dc-video-card {
		background: #111111;
		border: 1px solid rgba(255,255,255,0.07);
		border-radius: 1.5rem;
		overflow: hidden;
		transition: box-shadow 0.4s ease, transform 0.4s ease;
	}
	.dc-video-card:hover {
		box-shadow: 0 4px 16px rgba(0,0,0,0.65), 0 20px 64px rgba(0,0,0,0.55), 0 0 120px rgba(88,101,242,0.05), 0 48px 100px rgba(0,0,0,0.4);
		transform: translateY(-3px);
	}
	input[type='range'] { accent-color: #5865F2; }

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
		.dc-video-card .absolute.bottom-4 { opacity: 1 !important; transform: translateY(0) !important; }
		.dc-video-card .pointer-events-none { display: none; }
	}
</style>
