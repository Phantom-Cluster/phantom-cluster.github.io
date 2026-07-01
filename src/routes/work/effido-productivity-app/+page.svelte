<script lang="ts">
	import type { PageData } from './$types';
	import { onMount, onDestroy } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { navTheme } from '$lib/stores/navTheme';

	let { data }: { data: PageData } = $props();
	let project = $derived(data.project);

	let pageWrapperEl: HTMLElement;
	let bentoTriggerEl: HTMLElement;
	let editorialTriggerEl: HTMLElement;
	let ctx: gsap.Context;

	// Video player state
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

	// Lightbox state
	let modalImg = $state<{ src: string; alt: string } | null>(null);
	function openModal(src: string, alt: string) { modalImg = { src, alt }; }

	const features = [
		{ icon: '◉', title: 'Dashboard Command Centre', desc: 'Performance graph, task stats donut, live Pomodoro widget, and pending tasks by label — all on a single glanceable screen.' },
		{ icon: '▦', title: 'Time-Blocked Today View', desc: 'Hourly timeline that turns your task list into a schedule. Hover any block to read full details inline without leaving the view.' },
		{ icon: '▣', title: 'Upcoming Calendar', desc: 'Day / Week / Month / Custom range. Every task and meeting colour-coded by label — shape of your week readable in one glance.' },
		{ icon: '◈', title: 'Pomodoro Timer', desc: 'Sessions, schedule, and task list side by side. Every completed round feeds directly into Dashboard stats automatically.' },
		{ icon: '⊑', title: 'Task List + Collaborators', desc: 'Working / In Progress / Recently Complete. Collaborator avatars on every card so you see who is connected to each project.' },
		{ icon: '◐', title: 'Light & Dark Full Theming', desc: 'Every screen ships in both modes. Colour-coded label system works across both themes for instant visual categorisation.' },
	];

	onMount(() => {
		navTheme.set('light');
		document.body.style.backgroundColor = '#ffffff';
		gsap.registerPlugin(ScrollTrigger);

		const handleKeydown = (e: KeyboardEvent) => { if (e.key === 'Escape') modalImg = null; };
		window.addEventListener('keydown', handleKeydown);

		const t = setTimeout(() => {
			ctx = gsap.context(() => {
				gsap.to(pageWrapperEl, {
					backgroundColor: '#000000',
					color: '#ffffff',
					ease: 'none',
					scrollTrigger: {
						trigger: bentoTriggerEl,
						start: 'top 90%',
						end: 'top 60%',
						scrub: true,
						onEnter: () => navTheme.set('dark'),
						onLeaveBack: () => navTheme.set('light')
					}
				});

				gsap.to(pageWrapperEl, {
					backgroundColor: '#ffffff',
					color: '#171717',
					ease: 'none',
					immediateRender: false,
					scrollTrigger: {
						trigger: editorialTriggerEl,
						start: 'top 90%',
						end: 'top 60%',
						scrub: true,
						onEnter: () => navTheme.set('light'),
						onLeaveBack: () => navTheme.set('dark')
					}
				});

				gsap.from('.cs-hero-element', {
					y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out'
				});

				gsap.utils.toArray('.cs-fade-up').forEach((el: any) => {
					gsap.from(el, {
						y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
						scrollTrigger: { trigger: el, start: 'top 85%' }
					});
				});
			});
		}, 400);

		return () => {
			clearTimeout(t);
			window.removeEventListener('keydown', handleKeydown);
		};
	});

	onDestroy(() => {
		navTheme.set(null);
		if (typeof document !== 'undefined') document.body.style.backgroundColor = '';
		if (ctx) ctx.revert();
	});
</script>

<svelte:head>
	<title>EffiDo Productivity App | Hitanshu Sahu</title>
</svelte:head>

{#if modalImg}
	<div class="img-modal-backdrop" role="dialog" aria-modal="true" aria-label="Image preview" onclick={() => modalImg = null}>
		<div class="img-modal-inner" onclick={(e) => e.stopPropagation()}>
			<img src={modalImg.src} alt={modalImg.alt} style="max-width: 92vw; max-height: 92vh; width: auto; height: auto; display: block; border-radius: 12px;" />
			<button onclick={() => modalImg = null} class="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors" aria-label="Close preview">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
			</button>
		</div>
	</div>
{/if}

<div bind:this={pageWrapperEl} class="min-h-screen bg-white text-neutral-900" style="background-color: #ffffff;">

	<!-- ── HERO ─────────────────────────────────────────────────────────── -->
	<section data-theme="light" class="w-full bg-white px-6 pt-[160px] md:pt-[180px] pb-28 min-h-screen flex flex-col justify-center">
		<div class="max-w-7xl mx-auto w-full">

			<div class="flex items-center justify-between border-b border-neutral-200 pb-5 mb-12 cs-hero-element">
				<div class="relative inline-flex overflow-hidden rounded-full p-[1.5px] shadow-sm bg-neutral-200">
					<div class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,#2244CC_360deg)]"></div>
					<div class="inline-flex h-full w-full items-center justify-center rounded-full bg-white px-6 py-2 relative z-10">
						<span class="text-[11px] font-mono tracking-widest text-neutral-500 uppercase">Concept — Multi-Platform Productivity App</span>
					</div>
				</div>
				<div class="hidden sm:flex items-center gap-4">
					<a href="https://www.behance.net/gallery/114922057/Effido-(Productivity-App)" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-300 bg-neutral-50 text-[9px] font-mono tracking-widest text-neutral-500 uppercase hover:border-neutral-400 hover:bg-neutral-100 transition-colors">Behance ↗</a>
					<span class="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">2021</span>
				</div>
			</div>

			<div class="flex items-start gap-10 cs-hero-element">
				<div class="flex-1 min-w-0">
					<p class="text-[11px] font-mono tracking-[0.35em] uppercase text-neutral-400 mb-5">EffiDo</p>
					<h1 class="text-[clamp(3rem,8vw,7.5rem)] font-black tracking-tight leading-[0.9] text-neutral-900">
						Productivity<br/>
						<span class="text-neutral-300">Without</span><br/>
						The&nbsp;Noise.
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
						<span class="text-sm font-semibold text-neutral-800">Desktop · iPad · SmartWatch</span>
					</div>
					<div>
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Tools</span>
						<span class="text-sm font-semibold text-neutral-800">Figma · Inter · Poppins</span>
					</div>
					<div>
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Type</span>
						<span class="text-sm font-semibold text-neutral-800">Concept / Exploration</span>
					</div>
					<div class="pt-5 border-t border-neutral-100">
						<a href="https://www.behance.net/gallery/114922057/Effido-(Productivity-App)" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-portfolio-accent hover:underline">
							<span class="text-[9px] font-mono tracking-widest uppercase">View on Behance</span>
							<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
						</a>
					</div>
				</div>
			</div>

			<!-- 3-col impact ledger -->
			<div class="grid grid-cols-3 border-t border-b border-neutral-200 mt-12 cs-hero-element">
				<div class="py-7 pr-4 md:pr-8 border-r border-neutral-200">
					<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">Screens Designed</span>
					<div class="flex items-baseline gap-1.5 leading-none">
						<span class="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">5 Screens</span>
					</div>
					<span class="text-xs text-neutral-400 block mt-1">Dashboard · Today · Upcoming · Pomodoro · Task List</span>
				</div>
				<div class="py-7 px-3 md:px-8 border-r border-neutral-200">
					<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">Device Coverage</span>
					<div class="flex items-baseline gap-1 leading-none flex-wrap">
						<span class="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">3 Devices</span>
					</div>
					<span class="text-xs text-neutral-400 block mt-1">Desktop · iPad · SmartWatch</span>
				</div>
				<div class="py-7 pl-3 md:pl-8">
					<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">Full Theming</span>
					<div class="flex items-baseline gap-1.5 leading-none">
						<span class="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">Light + Dark</span>
					</div>
					<span class="text-xs text-neutral-400 block mt-1">Every screen ships in both modes</span>
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10 cs-hero-element">
				<div class="md:col-span-2">
					<p class="text-xl md:text-2xl text-neutral-500 leading-relaxed">{project.description}</p>
				</div>
			</div>

		</div>
	</section>

	<!-- ── DARK BENTO ────────────────────────────────────────────────────── -->
	<div bind:this={bentoTriggerEl} data-theme="dark">
		<section class="bg-black py-24 px-6">
			<div class="max-w-7xl mx-auto">

				<div class="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
					<div class="lg:col-span-8 bg-neutral-950 rounded-4xl p-10 lg:p-14 border border-white/5 flex flex-col justify-between cs-fade-up">
						<p class="text-[11px] font-mono tracking-widest text-neutral-500 uppercase mb-8">{project.role} · Concept Exploration</p>
						<h2 class="text-3xl lg:text-5xl font-black tracking-tight text-white leading-[1.05]">
							Born from jumping between a Pomodoro timer and a calendar every session — <span class="text-shimmer-white">EffiDo puts both in one surface.</span>
						</h2>
					</div>
					<div class="lg:col-span-4 bg-neutral-950 rounded-4xl p-10 border border-white/5 flex flex-col justify-between cs-fade-up">
						<div>
							<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-3">Project</span>
							<span class="text-4xl font-black tracking-tighter text-white">EffiDo</span>
						</div>
						<div class="space-y-3">
							<div>
								<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-1">Status</span>
								<span class="text-sm font-semibold text-neutral-300">Concept · Published on Behance</span>
							</div>
							<div>
								<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-1">Theme</span>
								<span class="text-sm font-semibold text-neutral-300">Light &amp; Dark — full theming</span>
							</div>
						</div>
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-5">
					{#each project.metrics as metric}
						<div class="bg-neutral-950 rounded-3xl p-8 border border-white/5 cs-fade-up">
							<div class="w-1.5 h-1.5 rounded-full bg-neutral-600 mb-5 animate-pulse"></div>
							<p class="font-bold text-base text-white leading-snug tracking-tight">{metric}</p>
						</div>
					{/each}
				</div>

			</div>
		</section>
	</div>

	<!-- ── DESIGN CRAFT: intro + video ──────────────────────────────────── -->
	<section class="bg-black py-24 px-6 border-t border-white/5">
		<div class="max-w-7xl mx-auto">

			<div class="flex items-center gap-4 mb-12 cs-fade-up">
				<span class="text-[9px] font-mono tracking-widest text-neutral-600 uppercase">Design Craft</span>
				<div class="h-px flex-1 bg-white/5"></div>
				<span class="text-[9px] font-mono tracking-widest text-neutral-600 uppercase">5 screens</span>
			</div>

			<div class="bg-neutral-950 rounded-4xl overflow-hidden border border-white/5 mb-5 cs-fade-up">
				<img src="/images/projects/effido/Hero cover of presentation. .png" alt="EffiDo — full product overview" class="w-full block" loading="eager" />
			</div>

			<div class="effido-video-card group cs-fade-up" bind:this={wrapperEl}>
				<!-- svelte-ignore a11y_media_has_caption -->
				<div class="relative overflow-hidden rounded-t-[calc(1.5rem-1px)]">
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
					<video
						bind:this={videoEl}
						bind:paused={isPaused}
						bind:currentTime
						bind:duration
						src="/images/projects/effido/Effido Project.mp4"
						class="w-full aspect-video object-cover block cursor-pointer"
						playsinline preload="metadata" muted
						onclick={togglePlay}
					></video>

					<!-- hover controls bar -->
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

					<!-- idle tip — fades on hover -->
					<div class="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/55 backdrop-blur-sm rounded-full px-2.5 py-1.5 group-hover:opacity-0 transition-opacity duration-200 pointer-events-none">
						<svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
						<span class="text-[9px] text-white/60 font-mono tracking-wider">Hover to control</span>
					</div>
				</div>
				<div class="px-5 py-4 border-t border-white/5">
					<p class="text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-1.5">Product Walkthrough</p>
					<p class="text-sm text-neutral-400 leading-relaxed">Full walkthrough covering all five screens — Dashboard, Today, Upcoming, Pomodoro Timer, and Task List.</p>
				</div>
			</div>

		</div>
	</section>

	<!-- ── BEFORE → AFTER ────────────────────────────────────────────────── -->
	<section class="bg-black px-6 pt-4 pb-24">
		<div class="max-w-7xl mx-auto">
			<div class="mb-12 cs-fade-up">
				<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase">Before → After</span>
				<h2 class="text-3xl lg:text-4xl font-black tracking-tight text-white mt-3 leading-[1.05]">From scattered tools<br/>to one unified surface.</h2>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-5 cs-grid-stagger">
				<!-- Before card -->
				<div class="rounded-3xl overflow-hidden border border-white/5 bg-neutral-950 flex flex-col">
					<div class="px-5 py-3 border-b border-white/5 flex items-center gap-2.5">
						<span class="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
						<span class="text-[10px] font-mono tracking-widest text-[#EF4444] uppercase">Before — The Problem</span>
					</div>
					<div class="p-8 flex-1 flex flex-col gap-5">
						<h3 class="text-xl font-black text-white leading-snug">Pomodoro timer in one tab.<br/>Calendar in another.<br/>Task list in a third app.</h3>
						<p class="text-sm text-neutral-500 leading-relaxed">Every productivity workflow required constant context switching. No single view showed what was due, what was in progress, and how much focused time was left. The cognitive load of managing tools was eating into the work itself.</p>
						<div class="grid grid-cols-3 gap-3 mt-auto pt-4 border-t border-white/5">
							{#each [{ n: '3+', label: 'Apps to juggle' }, { n: '0', label: 'Unified view' }, { n: '∞', label: 'Context switches' }] as s}
								<div class="text-center">
									<span class="text-2xl font-black text-white block leading-none mb-1">{s.n}</span>
									<span class="text-[9px] font-mono text-neutral-600 uppercase tracking-widest">{s.label}</span>
								</div>
							{/each}
						</div>
					</div>
				</div>
				<!-- After card -->
				<div class="rounded-3xl overflow-hidden border border-white/5 bg-neutral-950 flex flex-col">
					<div class="px-5 py-3 border-b border-white/5 flex items-center gap-2.5">
						<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse"></span>
						<span class="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">After — EffiDo</span>
					</div>
					<div class="p-8 flex-1 flex flex-col gap-5">
						<h3 class="text-xl font-black text-white leading-snug">One app. Dashboard, timer,<br/>calendar, and task list —<br/>synced and side by side.</h3>
						<p class="text-sm text-neutral-500 leading-relaxed">EffiDo consolidates every productivity surface into five screens. The Dashboard gives you the full picture at a glance. Today maps your schedule. Upcoming holds the calendar. Pomodoro runs the session. Task List tracks every project. All data syncs across Desktop, iPad, and SmartWatch.</p>
						<div class="grid grid-cols-3 gap-3 mt-auto pt-4 border-t border-white/5">
							{#each [{ n: '1', label: 'Unified app' }, { n: '5', label: 'Screens' }, { n: '3', label: 'Devices synced' }] as s}
								<div class="text-center">
									<span class="text-2xl font-black text-emerald-400 block leading-none mb-1">{s.n}</span>
									<span class="text-[9px] font-mono text-neutral-600 uppercase tracking-widest">{s.label}</span>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ── DISCOVERY FINDINGS ─────────────────────────────────────────────── -->
	<section class="bg-black px-6 pb-24">
		<div class="max-w-7xl mx-auto">
			<div class="mb-12 cs-fade-up">
				<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase">Design Rationale</span>
				<h2 class="text-3xl lg:text-4xl font-black tracking-tight text-white mt-3 leading-[1.05]">Three pain points.<br/>Three screens built to fix them.</h2>
			</div>
			<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 cs-grid-stagger">
				<div class="rounded-2xl p-6 flex flex-col gap-3 border border-red-900/40" style="background: linear-gradient(135deg, #2a0a0a 0%, #1a0606 100%);">
					<div class="flex items-center justify-between">
						<span class="text-[8px] font-mono tracking-[0.3em] text-red-400/60 uppercase">Pain Point</span>
						<span class="px-2.5 py-1 rounded-full text-[8px] font-black font-mono tracking-wider uppercase text-red-300 border border-red-500/40" style="background: rgba(220,38,38,0.18);">Critical</span>
					</div>
					<span class="text-[clamp(2rem,5vw,3.5rem)] font-black text-white tracking-tight leading-none block">3+</span>
					<p class="text-xs text-red-200/60 leading-relaxed">Separate apps needed to complete one focused work session — timer, calendar, and task list all living in different tabs or devices.</p>
					<span class="text-[8px] font-mono tracking-[0.3em] text-red-400/40 uppercase mt-auto pt-2 border-t border-red-900/30">Context Switching</span>
				</div>
				<div class="rounded-2xl p-6 flex flex-col gap-3 border border-red-900/40" style="background: linear-gradient(135deg, #2a0a0a 0%, #1a0606 100%);">
					<div class="flex items-center justify-between">
						<span class="text-[8px] font-mono tracking-[0.3em] text-red-400/60 uppercase">Pain Point</span>
						<span class="px-2.5 py-1 rounded-full text-[8px] font-black font-mono tracking-wider uppercase text-red-300 border border-red-500/40" style="background: rgba(220,38,38,0.18);">Critical</span>
					</div>
					<span class="text-[clamp(2rem,5vw,3.5rem)] font-black text-white tracking-tight leading-none block">0</span>
					<p class="text-xs text-red-200/60 leading-relaxed">Existing tools offered zero cross-device sync — a task marked done on desktop wasn't reflected on mobile or wearable without manual effort.</p>
					<span class="text-[8px] font-mono tracking-[0.3em] text-red-400/40 uppercase mt-auto pt-2 border-t border-red-900/30">No Device Sync</span>
				</div>
				<div class="rounded-2xl p-6 flex flex-col gap-3 border border-orange-900/40" style="background: linear-gradient(135deg, #2a1200 0%, #1a0c00 100%);">
					<div class="flex items-center justify-between">
						<span class="text-[8px] font-mono tracking-[0.3em] text-orange-400/60 uppercase">Pain Point</span>
						<span class="px-2.5 py-1 rounded-full text-[8px] font-black font-mono tracking-wider uppercase text-orange-300 border border-orange-500/40" style="background: rgba(234,88,12,0.18);">High</span>
					</div>
					<span class="text-[clamp(2rem,5vw,3.5rem)] font-black text-white tracking-tight leading-none block">∞</span>
					<p class="text-xs text-orange-200/60 leading-relaxed">No unified view of what's scheduled today alongside how many Pomodoro rounds remain — planning and execution lived in completely separate mental models.</p>
					<span class="text-[8px] font-mono tracking-[0.3em] text-orange-400/40 uppercase mt-auto pt-2 border-t border-orange-900/30">Split Mental Model</span>
				</div>
			</div>
		</div>
	</section>

	<!-- ── SCREEN 01 — Dashboard · WHITE ────────────────────────────────── -->
	<section class="bg-white px-6 py-24 border-t border-neutral-200">
		<div class="max-w-7xl mx-auto cs-fade-up">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
				<div>
					<span class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase block mb-5">Screen 01 — Dashboard</span>
					<h3 class="text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight leading-[0.93] mb-5">Your productivity<br/>command centre.</h3>
					<p class="text-sm text-neutral-500 leading-relaxed">Everything you need to orient your day — without opening a second app. The Dashboard surfaces your 30-day performance graph, key task stats, a live Pomodoro session widget, and pending tasks by label in a single glanceable view. Syncs across Desktop, iPad, and SmartWatch every 30 seconds.</p>
				</div>
				<ul class="space-y-3 lg:pt-14">
					{#each ['Performance graph visualising task activity over 30 days','Total Tasks Created · Average Tasks Per Day · Productivity Average','Task Statistics donut: Completed / In Progress / Pending counts','Pending Task panel organised by label — Work, Personal, Shopping…','Live Pomodoro widget: current task, timer, resume / pause','Daily Progress bar showing rounds completed per task','Auto-syncs across Desktop, iPad, and SmartWatch every 30 seconds'] as b}
						<li class="flex items-start gap-3 text-sm text-neutral-600 leading-snug"><span class="w-1 h-1 rounded-full bg-neutral-300 shrink-0 mt-[6px]"></span>{b}</li>
					{/each}
				</ul>
			</div>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div class="bg-neutral-100 rounded-3xl p-4 lg:p-5">
					<p class="text-[8px] font-mono tracking-widest text-neutral-400 uppercase mb-3 pl-1">Light Mode</p>
					<button type="button" class="img-trigger rounded-2xl overflow-hidden shadow-sm" onclick={() => openModal('/images/projects/effido/Main Dashboard.png', 'EffiDo Dashboard — Light Mode')} aria-label="Preview Dashboard Light Mode">
						<img src="/images/projects/effido/Main Dashboard.png" alt="EffiDo Dashboard — Light Mode" class="w-full block" loading="lazy" />
						<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
						<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
					</button>
				</div>
				<div class="bg-neutral-900 rounded-3xl p-4 lg:p-5">
					<p class="text-[8px] font-mono tracking-widest text-neutral-500 uppercase mb-3 pl-1">Dark Mode</p>
					<button type="button" class="img-trigger rounded-2xl overflow-hidden" onclick={() => openModal('/images/projects/effido/Dashboard - Dark mode.png', 'EffiDo Dashboard — Dark Mode')} aria-label="Preview Dashboard Dark Mode">
						<img src="/images/projects/effido/Dashboard - Dark mode.png" alt="EffiDo Dashboard — Dark Mode" class="w-full block" loading="lazy" />
						<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
						<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
					</button>
				</div>
			</div>
		</div>
	</section>

	<!-- ── SCREEN 02 — Today · BLACK ─────────────────────────────────────── -->
	<section class="bg-black px-6 py-24 border-t border-white/4">
		<div class="max-w-7xl mx-auto cs-fade-up">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
				<div>
					<span class="text-[9px] font-mono tracking-widest text-neutral-600 uppercase block mb-5">Screen 02 — Today</span>
					<h3 class="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[0.93] mb-5">Every hour of<br/>your day — mapped.</h3>
					<p class="text-sm text-neutral-500 leading-relaxed">A time-blocked hourly timeline that turns your task list into a schedule. Hover any block to read full details — time window, location link, notes, attendees — without leaving the view. Add quick notes, create new tasks, and mark things complete all from the same screen.</p>
				</div>
				<ul class="space-y-3 lg:pt-14">
					{#each ['Hourly time-blocked timeline from morning to evening','Label colour-coding — tasks are instantly categorised by colour','Hover a task block to read full details inline','Add quick notes to Today without creating a formal task','Create new tasks directly from the Today view','Mark tasks complete; pending overflow visible in the right panel',"Today's Task counter: tasks done out of total, with percentage"] as b}
						<li class="flex items-start gap-3 text-sm text-neutral-500 leading-snug"><span class="w-1 h-1 rounded-full bg-neutral-600 shrink-0 mt-[6px]"></span>{b}</li>
					{/each}
				</ul>
			</div>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div class="bg-[#eeece9] rounded-3xl p-4 lg:p-5">
					<p class="text-[8px] font-mono tracking-widest text-neutral-500 uppercase mb-3 pl-1">Light Mode</p>
					<button type="button" class="img-trigger rounded-2xl overflow-hidden" onclick={() => openModal('/images/projects/effido/Today task.png', 'EffiDo Today — Light Mode')} aria-label="Preview Today Light Mode">
						<img src="/images/projects/effido/Today task.png" alt="EffiDo Today — Light Mode" class="w-full block" loading="lazy" />
						<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
						<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
					</button>
				</div>
				<div class="bg-[#111111] rounded-3xl p-4 lg:p-5 border border-white/5">
					<p class="text-[8px] font-mono tracking-widest text-neutral-600 uppercase mb-3 pl-1">Dark Mode</p>
					<button type="button" class="img-trigger rounded-2xl overflow-hidden" onclick={() => openModal('/images/projects/effido/Today task - Dark mode.png', 'EffiDo Today — Dark Mode')} aria-label="Preview Today Dark Mode">
						<img src="/images/projects/effido/Today task - Dark mode.png" alt="EffiDo Today — Dark Mode" class="w-full block" loading="lazy" />
						<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
						<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
					</button>
				</div>
			</div>
		</div>
	</section>

	<!-- ── SCREEN 03 — Upcoming · WHITE ──────────────────────────────────── -->
	<section class="bg-white px-6 py-24 border-t border-neutral-200">
		<div class="max-w-7xl mx-auto cs-fade-up">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
				<div>
					<span class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase block mb-5">Screen 03 — Upcoming</span>
					<h3 class="text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight leading-[0.93] mb-5">Day, week,<br/>month — one tap.</h3>
					<p class="text-sm text-neutral-500 leading-relaxed">A full calendar view of everything ahead. Switch between Day, Week, Month, or a custom date range with a single tap. Every task and meeting block is colour-coded by label so the shape of your week is immediately readable — no legend required.</p>
				</div>
				<ul class="space-y-3 lg:pt-14">
					{#each ['Day / Week / Month view — switch with one tap','Custom date range preview for precise planning','Filter by any Label — isolate Work, Personal, Side Project…','Collaborator avatars on shared events and meetings','Meeting blocks include location link and attendee list','Tasks and events share the same timeline — no context switch'] as b}
						<li class="flex items-start gap-3 text-sm text-neutral-600 leading-snug"><span class="w-1 h-1 rounded-full bg-neutral-300 shrink-0 mt-[6px]"></span>{b}</li>
					{/each}
				</ul>
			</div>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div class="bg-neutral-100 rounded-3xl p-4 lg:p-5">
					<p class="text-[8px] font-mono tracking-widest text-neutral-400 uppercase mb-3 pl-1">Light Mode</p>
					<button type="button" class="img-trigger rounded-2xl overflow-hidden shadow-sm" onclick={() => openModal('/images/projects/effido/Upcoming task.png', 'EffiDo Upcoming — Light Mode')} aria-label="Preview Upcoming Light Mode">
						<img src="/images/projects/effido/Upcoming task.png" alt="EffiDo Upcoming — Light Mode" class="w-full block" loading="lazy" />
						<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
						<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
					</button>
				</div>
				<div class="bg-neutral-900 rounded-3xl p-4 lg:p-5">
					<p class="text-[8px] font-mono tracking-widest text-neutral-500 uppercase mb-3 pl-1">Dark Mode</p>
					<button type="button" class="img-trigger rounded-2xl overflow-hidden" onclick={() => openModal('/images/projects/effido/Upcoming task dark mode.png', 'EffiDo Upcoming — Dark Mode')} aria-label="Preview Upcoming Dark Mode">
						<img src="/images/projects/effido/Upcoming task dark mode.png" alt="EffiDo Upcoming — Dark Mode" class="w-full block" loading="lazy" />
						<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
						<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
					</button>
				</div>
			</div>
		</div>
	</section>

	<!-- ── SCREEN 04 — Pomodoro Timer · BLACK ────────────────────────────── -->
	<section class="bg-black px-6 py-24 border-t border-white/4">
		<div class="max-w-7xl mx-auto cs-fade-up">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
				<div>
					<span class="text-[9px] font-mono tracking-widest text-neutral-600 uppercase block mb-5">Screen 04 — Pomodoro Timer</span>
					<h3 class="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[0.93] mb-5">The feature that<br/>started everything.</h3>
					<p class="text-sm text-neutral-500 leading-relaxed">EffiDo was born because switching between a Pomodoro timer and a calendar every session added up to too much friction. This screen closes that loop — your sessions, your schedule, and your task list live side by side. Every completed session feeds directly into the Dashboard stats.</p>
				</div>
				<ul class="space-y-3 lg:pt-14">
					{#each ['Session header: estimated time, tasks to complete, completed today','Pin any project to the sidebar — always visible, always in reach','Work pattern Overview chart: Day / Week / Month / Year','Ongoing Tasks list with per-task Resume and Stop controls','Work Efficiency donut with colour-coded category breakdown','Rounds and completion tracking per task','All session data syncs to Dashboard reports automatically'] as b}
						<li class="flex items-start gap-3 text-sm text-neutral-500 leading-snug"><span class="w-1 h-1 rounded-full bg-neutral-600 shrink-0 mt-[6px]"></span>{b}</li>
					{/each}
				</ul>
			</div>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div class="bg-[#eeece9] rounded-3xl p-4 lg:p-5">
					<p class="text-[8px] font-mono tracking-widest text-neutral-500 uppercase mb-3 pl-1">Light Mode</p>
					<button type="button" class="img-trigger rounded-2xl overflow-hidden" onclick={() => openModal('/images/projects/effido/Pomodoro timer.png', 'EffiDo Pomodoro — Light Mode')} aria-label="Preview Pomodoro Light Mode">
						<img src="/images/projects/effido/Pomodoro timer.png" alt="EffiDo Pomodoro — Light Mode" class="w-full block" loading="lazy" />
						<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
						<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
					</button>
				</div>
				<div class="bg-[#111111] rounded-3xl p-4 lg:p-5 border border-white/5">
					<p class="text-[8px] font-mono tracking-widest text-neutral-600 uppercase mb-3 pl-1">Dark Mode</p>
					<button type="button" class="img-trigger rounded-2xl overflow-hidden" onclick={() => openModal('/images/projects/effido/Pomodoro timer dark mode.png', 'EffiDo Pomodoro — Dark Mode')} aria-label="Preview Pomodoro Dark Mode">
						<img src="/images/projects/effido/Pomodoro timer dark mode.png" alt="EffiDo Pomodoro — Dark Mode" class="w-full block" loading="lazy" />
						<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
						<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
					</button>
				</div>
			</div>
		</div>
	</section>

	<!-- ── SCREEN 05 — Task List · WHITE ─────────────────────────────────── -->
	<section class="bg-white px-6 py-24 border-t border-neutral-200">
		<div class="max-w-7xl mx-auto cs-fade-up">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
				<div>
					<span class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase block mb-5">Screen 05 — Task List</span>
					<h3 class="text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight leading-[0.93] mb-5">A card for every<br/>project. A status<br/>for every card.</h3>
					<p class="text-sm text-neutral-500 leading-relaxed">Three categories give you the full picture at a glance. Working: actively in a Pomodoro session. In Progress: started, no active timer. Recently Complete: finished with exact completion date. Every project card includes a cover image so you recognise it instantly without reading the title.</p>
				</div>
				<ul class="space-y-3 lg:pt-14">
					{#each ['Working — projects with an active Pomodoro session running','In Progress — started but no timer active right now','Recently Complete — finished, with exact completion date shown','Cover image on every card for instant visual recognition','Label badge and due date on every card','Collaborator avatars: see exactly who is connected to each project','Cards are colour-coded by your Labels system'] as b}
						<li class="flex items-start gap-3 text-sm text-neutral-600 leading-snug"><span class="w-1 h-1 rounded-full bg-neutral-300 shrink-0 mt-[6px]"></span>{b}</li>
					{/each}
				</ul>
			</div>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div class="bg-neutral-100 rounded-3xl p-4 lg:p-5">
					<p class="text-[8px] font-mono tracking-widest text-neutral-400 uppercase mb-3 pl-1">Light Mode</p>
					<button type="button" class="img-trigger rounded-2xl overflow-hidden shadow-sm" onclick={() => openModal('/images/projects/effido/Task list - currently working, in progress not working in present time , already done .png', 'EffiDo Task List — Light Mode')} aria-label="Preview Task List Light Mode">
						<img src="/images/projects/effido/Task list - currently working, in progress not working in present time , already done .png" alt="EffiDo Task List — Light Mode" class="w-full block" loading="lazy" />
						<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
						<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
					</button>
				</div>
				<div class="bg-neutral-900 rounded-3xl p-4 lg:p-5">
					<p class="text-[8px] font-mono tracking-widest text-neutral-500 uppercase mb-3 pl-1">Dark Mode</p>
					<button type="button" class="img-trigger rounded-2xl overflow-hidden" onclick={() => openModal('/images/projects/effido/Task list dark mode .png', 'EffiDo Task List — Dark Mode')} aria-label="Preview Task List Dark Mode">
						<img src="/images/projects/effido/Task list dark mode .png" alt="EffiDo Task List — Dark Mode" class="w-full block" loading="lazy" />
						<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
						<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
					</button>
				</div>
			</div>
		</div>
	</section>

	<!-- ── EDITORIAL ─────────────────────────────────────────────────────── -->
	<div bind:this={editorialTriggerEl} data-theme="light">
		<section class="bg-white px-6 py-32">
			<div class="max-w-7xl mx-auto space-y-32">

				<!-- 01 Problem -->
				<div class="flex flex-col md:flex-row gap-12 md:gap-24 cs-fade-up">
					<div class="md:w-1/3">
						<div class="sticky top-32">
							<div class="flex items-center gap-3 mb-5">
								<span class="text-[10px] font-mono tracking-[0.3em] text-neutral-300 uppercase">01</span>
								<div class="h-px flex-1 bg-neutral-200"></div>
							</div>
							<h2 class="text-[34px] md:text-5xl font-black tracking-tight text-neutral-900 leading-[0.95]">The<br/>Problem</h2>
						</div>
					</div>
					<div class="md:w-2/3 pt-2 md:pt-0 space-y-8">
						<p class="text-xl md:text-2xl font-light text-neutral-500 leading-relaxed">{project.problem}</p>
						<div class="grid grid-cols-3 gap-3">
							<div class="border border-neutral-200 rounded-2xl p-5">
								<span class="text-[clamp(1.5rem,3vw,2.2rem)] font-black text-neutral-900 block leading-none mb-2">3+</span>
								<span class="text-[8px] font-mono tracking-widest text-neutral-400 uppercase block">Apps to Juggle</span>
								<span class="text-[10px] text-neutral-400 block mt-1 leading-snug">per work session</span>
							</div>
							<div class="border border-neutral-200 rounded-2xl p-5">
								<span class="text-[clamp(1.5rem,3vw,2.2rem)] font-black text-neutral-900 block leading-none mb-2">0</span>
								<span class="text-[8px] font-mono tracking-widest text-neutral-400 uppercase block">Unified View</span>
								<span class="text-[10px] text-neutral-400 block mt-1 leading-snug">no single surface</span>
							</div>
							<div class="border border-neutral-200 rounded-2xl p-5">
								<span class="text-[clamp(1.5rem,3vw,2.2rem)] font-black text-neutral-900 block leading-none mb-2">∞</span>
								<span class="text-[8px] font-mono tracking-widest text-neutral-400 uppercase block">Context Switches</span>
								<span class="text-[10px] text-neutral-400 block mt-1 leading-snug">per session</span>
							</div>
						</div>
					</div>
				</div>

				<!-- 02 Process -->
				<div class="flex flex-col md:flex-row gap-12 md:gap-24 cs-fade-up">
					<div class="md:w-1/3">
						<div class="sticky top-32">
							<div class="flex items-center gap-3 mb-5">
								<span class="text-[10px] font-mono tracking-[0.3em] text-neutral-300 uppercase">02</span>
								<div class="h-px flex-1 bg-neutral-200"></div>
							</div>
							<h2 class="text-[34px] md:text-5xl font-black tracking-tight text-neutral-900 leading-[0.95]">Process<br/>&amp;&nbsp;Strategy</h2>
						</div>
					</div>
					<div class="md:w-2/3 pt-2 md:pt-0 space-y-5">
						<p class="text-xl md:text-2xl font-light text-neutral-500 leading-relaxed mb-2">{project.process}</p>
						<div class="flex flex-col gap-3">
							<div class="flex gap-5 items-start border border-neutral-100 rounded-2xl p-5 hover:border-neutral-300 transition-colors duration-300">
								<span class="text-[10px] font-black font-mono text-neutral-300 shrink-0 mt-0.5 w-5">01</span>
								<div>
									<h4 class="text-sm font-bold text-neutral-900 mb-1.5">Workflow Mapping</h4>
									<p class="text-sm text-neutral-500 leading-relaxed">Mapped the full productivity lifecycle from planning (Upcoming) → execution (Pomodoro + Today) → review (Dashboard). Each screen owns exactly one phase — no overlap.</p>
								</div>
							</div>
							<div class="flex gap-5 items-start border border-neutral-100 rounded-2xl p-5 hover:border-neutral-300 transition-colors duration-300">
								<span class="text-[10px] font-black font-mono text-neutral-300 shrink-0 mt-0.5 w-5">02</span>
								<div>
									<h4 class="text-sm font-bold text-neutral-900 mb-1.5">Label System as Core Architecture</h4>
									<p class="text-sm text-neutral-500 leading-relaxed">Labels became the primary organisation layer — colour-coded categories (Work, Personal, Shopping…) that filter across every screen. One label touch-point, universal effect.</p>
								</div>
							</div>
							<div class="flex gap-5 items-start border border-neutral-100 rounded-2xl p-5 hover:border-neutral-300 transition-colors duration-300">
								<span class="text-[10px] font-black font-mono text-neutral-300 shrink-0 mt-0.5 w-5">03</span>
								<div>
									<h4 class="text-sm font-bold text-neutral-900 mb-1.5">Full Light + Dark Theming</h4>
									<p class="text-sm text-neutral-500 leading-relaxed">Every screen ships in both modes using Inter for UI copy and Poppins for display headings. Blue as the primary accent — readable across both themes at every text size.</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- 03 Solution -->
				<div class="flex flex-col md:flex-row gap-12 md:gap-24 cs-fade-up">
					<div class="md:w-1/3">
						<div class="sticky top-32">
							<div class="flex items-center gap-3 mb-5">
								<span class="text-[10px] font-mono tracking-[0.3em] text-neutral-300 uppercase">03</span>
								<div class="h-px flex-1 bg-neutral-200"></div>
							</div>
							<h2 class="text-[34px] md:text-5xl font-black tracking-tight text-neutral-900 leading-[0.95]">The<br/>Solution</h2>
						</div>
					</div>
					<div class="md:w-2/3 pt-2 md:pt-0 space-y-8">
						<p class="text-xl md:text-2xl font-light text-neutral-500 leading-relaxed">{project.solution}</p>
						<!-- Before → After comparison table -->
						<div class="border border-neutral-200 rounded-2xl overflow-hidden">
							<div class="grid grid-cols-[1fr_110px_150px] border-b border-neutral-200 bg-neutral-50 px-5 py-2.5">
								<span class="text-[8px] font-mono tracking-widest text-neutral-400 uppercase">What changed</span>
								<span class="text-[8px] font-mono tracking-widest text-[#C40E0B] uppercase">Before</span>
								<span class="text-[8px] font-mono tracking-widest text-neutral-400 uppercase">After</span>
							</div>
							{#each [
								{ what: 'Focus session setup', before: 'Switch apps', after: 'One Pomodoro screen' },
								{ what: 'Daily schedule view', before: 'Calendar app', after: 'Time-blocked Today' },
								{ what: 'Task organisation', before: 'Folder hierarchy', after: 'Label-first system' },
								{ what: 'Progress tracking', before: 'Manual check-in', after: 'Live Dashboard stats' },
								{ what: 'Device coverage', before: 'Desktop only', after: 'Desktop · iPad · Watch' },
							] as row, i}
								<div class="grid grid-cols-[1fr_110px_150px] items-center px-5 py-4 {i < 4 ? 'border-b border-neutral-100' : ''}">
									<span class="text-sm font-medium text-neutral-600">{row.what}</span>
									<span class="text-sm font-bold text-neutral-300 line-through">{row.before}</span>
									<span class="text-sm font-bold text-neutral-900">{row.after}</span>
								</div>
							{/each}
						</div>
					</div>
				</div>

				<!-- 04 Outcome -->
				<div class="cs-fade-up">
					<div class="bg-neutral-950 rounded-bento p-10 md:p-16">
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-6">04 — Outcome</span>
						<h2 class="text-4xl md:text-6xl font-black tracking-tight text-white leading-[0.95] mb-8">Results.</h2>
						<p class="text-xl md:text-2xl font-light text-neutral-400 leading-relaxed mb-16 max-w-3xl">{project.outcome}</p>
						<div class="grid grid-cols-1 sm:grid-cols-3 gap-5 border-t border-white/5 pt-10">
							{#each project.metrics as metric}
								<div class="bg-white/4 rounded-2xl p-6 border border-white/5">
									<div class="w-1.5 h-1.5 rounded-full bg-portfolio-accent mb-4 animate-pulse"></div>
									<p class="font-bold text-base text-white leading-snug tracking-tight">{metric}</p>
								</div>
							{/each}
						</div>
					</div>
				</div>

				<!-- What got designed: 6 feature cards -->
				<div class="cs-fade-up">
					<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase mb-4 block">05 — Feature Highlights</span>
					<h2 class="text-3xl md:text-4xl font-black tracking-tight text-neutral-900 mb-10">What got designed.</h2>
					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{#each features as f}
							<div class="border border-neutral-200 rounded-2xl p-6 hover:border-neutral-300 transition-colors duration-300 flex flex-col gap-3">
								<span class="text-xl text-neutral-300">{f.icon}</span>
								<h4 class="text-sm font-black text-neutral-900">{f.title}</h4>
								<p class="text-sm text-neutral-500 leading-relaxed flex-1">{f.desc}</p>
							</div>
						{/each}
					</div>
				</div>

			</div>
		</section>
	</div>

</div>

<style>
	.effido-video-card {
		border-radius: 1.5rem;
		overflow: hidden;
		background: #0a0a0a;
		border: 1px solid rgba(255, 255, 255, 0.06);
		display: flex;
		flex-direction: column;
		box-shadow:
			0 4px 16px rgba(0, 0, 0, 0.55),
			0 16px 48px rgba(0, 0, 0, 0.45),
			0 0 70px rgba(255, 255, 255, 0.02);
		transition: box-shadow 0.5s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.effido-video-card:hover {
		box-shadow:
			0 4px 16px rgba(0, 0, 0, 0.65),
			0 20px 64px rgba(0, 0, 0, 0.55),
			0 0 120px rgba(255, 255, 255, 0.06),
			0 48px 100px rgba(0, 0, 0, 0.4);
		transform: translateY(-3px);
	}
	input[type='range'] { accent-color: #ffffff; }

	/* ── Click-to-zoom image trigger ── */
	.img-trigger {
		display: block;
		width: 100%;
		position: relative;
		cursor: zoom-in;
		border: none;
		padding: 0;
		background: none;
		text-align: left;
	}
	.img-preview-badge {
		position: absolute;
		bottom: 10px;
		right: 10px;
		display: flex;
		align-items: center;
		gap: 5px;
		background: rgba(0, 0, 0, 0.55);
		backdrop-filter: blur(8px);
		border-radius: 99px;
		padding: 4px 10px 4px 6px;
		opacity: 1;
		transition: opacity 0.2s ease;
		pointer-events: none;
	}
	.img-trigger:hover .img-preview-badge { opacity: 0; }
	.img-trigger-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0);
		transition: background 0.2s ease;
		pointer-events: none;
	}
	.img-trigger:hover .img-trigger-overlay { background: rgba(0, 0, 0, 0.4); }
	.img-expand-icon {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transform: scale(0.85);
		transition: opacity 0.2s ease, transform 0.2s ease;
	}
	.img-trigger:hover .img-expand-icon { opacity: 1; transform: scale(1); }

	/* ── Lightbox modal ── */
	.img-modal-backdrop {
		position: fixed;
		inset: 0;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.92);
		backdrop-filter: blur(10px);
		animation: modal-fade-in 0.18s ease;
	}
	@keyframes modal-fade-in { from { opacity: 0; } to { opacity: 1; } }
	.img-modal-inner {
		position: relative;
		max-width: 92vw;
		max-height: 92vh;
		animation: modal-scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1);
	}
	@keyframes modal-scale-in {
		from { transform: scale(0.94); opacity: 0; }
		to   { transform: scale(1);    opacity: 1; }
	}
</style>
