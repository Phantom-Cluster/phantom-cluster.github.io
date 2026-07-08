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

	const BEHANCE_URL = 'https://www.behance.net/gallery/79737225/Spotify-Re-Design-Concept';

	let pageWrapperEl: HTMLElement;
	let bentoTriggerEl: HTMLElement;
	let editorialTriggerEl: HTMLElement;
	let ctx: gsap.Context;

	let modalImg = $state<{ src: string; alt: string } | null>(null);
	function openModal(src: string, alt: string) { modalImg = { src, alt }; }

	onMount(() => {
		navTheme.set('light');
		document.body.style.backgroundColor = '#ffffff';
		gsap.registerPlugin(ScrollTrigger);

		const t = setTimeout(() => {
			ctx = gsap.context(() => {
				gsap.to(pageWrapperEl, {
					backgroundColor: '#000000', color: '#ffffff', ease: 'none',
					scrollTrigger: {
						trigger: bentoTriggerEl, start: 'top 90%', end: 'top 60%', scrub: true,
						onEnter: () => navTheme.set('dark'),
						onLeaveBack: () => navTheme.set('light')
					}
				});
				gsap.to(pageWrapperEl, {
					backgroundColor: '#ffffff', color: '#171717', ease: 'none', immediateRender: false,
					scrollTrigger: {
						trigger: editorialTriggerEl, start: 'top 90%', end: 'top 60%', scrub: true,
						onEnter: () => navTheme.set('light'),
						onLeaveBack: () => navTheme.set('dark')
					}
				});
				gsap.from('.cs-hero-element', { y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' });
				gsap.utils.toArray('.cs-fade-up').forEach((el: any) => {
					gsap.from(el, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
						scrollTrigger: { trigger: el, start: 'top 85%' }
					});
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
	<title>Spotify Redesign Concept | Hitanshu Sahu</title>
</svelte:head>

<LightboxModal bind:modalImg />

<div bind:this={pageWrapperEl} class="min-h-screen bg-white text-neutral-900" style="background-color: #ffffff;">

	<!-- ── HERO ──────────────────────────────────────────────────────────────── -->
	<section data-theme="light" class="w-full bg-white px-6 pt-[160px] md:pt-[180px] pb-28 min-h-screen flex flex-col justify-center">
		<div class="max-w-7xl mx-auto w-full">

			<!-- Meta strip -->
			<div class="flex items-center justify-between border-b border-neutral-200 pb-5 mb-12 cs-hero-element">
				<div class="relative inline-flex overflow-hidden rounded-full p-[1.5px] shadow-sm bg-neutral-200">
					<div class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,rgba(0,0,0,0.75)_360deg)]"></div>
					<div class="inline-flex h-full w-full items-center justify-center rounded-full bg-white px-6 py-2 relative z-10">
						<span class="text-[11px] font-mono tracking-widest text-neutral-500 uppercase">Concept — Music App Interaction Design</span>
					</div>
				</div>
				<div class="hidden sm:flex items-center gap-4">
					<a href={BEHANCE_URL} target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#1DB954]/40 bg-[#1DB954]/5 text-[9px] font-mono tracking-widest text-[#1DB954] uppercase hover:border-[#1DB954]/70 hover:bg-[#1DB954]/10 transition-colors">Behance ↗</a>
					<span class="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">2018</span>
				</div>
			</div>

			<!-- Title + sidebar -->
			<div class="flex items-start gap-10 cs-hero-element">
				<div class="flex-1 min-w-0">
					<p class="text-[11px] font-mono tracking-[0.35em] uppercase text-neutral-400 mb-5">Spotify</p>
					<h1 class="text-[clamp(3rem,8vw,7.5rem)] font-black tracking-tight leading-[0.9] text-neutral-900">
						The Project<br/>
						<span class="text-neutral-300">That Started</span><br/>
						Everything.
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
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Year</span>
						<span class="text-sm font-semibold text-neutral-800">2018</span>
					</div>
					<div>
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Tools</span>
						<span class="text-sm font-semibold text-neutral-800">Adobe Photoshop · InVision Studio</span>
					</div>
					<div>
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Type</span>
						<span class="text-sm font-semibold text-neutral-800">Concept / Personal</span>
					</div>
					<div class="pt-5 border-t border-neutral-100">
						<a href={BEHANCE_URL} target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-portfolio-accent hover:underline">
							<span class="text-[9px] font-mono tracking-widest uppercase">View on Behance</span>
							<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
						</a>
					</div>
				</div>
			</div>

			<!-- 3-col impact ledger -->
			<div class="grid grid-cols-3 border-t border-b border-neutral-200 mt-12 cs-hero-element">
				<div class="py-7 pr-4 md:pr-8 border-r border-neutral-200">
					<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">Behance Views</span>
					<div class="flex items-baseline gap-1.5 leading-none flex-wrap">
						<span class="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">351</span>
					</div>
					<span class="text-[9px] text-neutral-400 font-mono block mt-1">8 appreciations</span>
				</div>
				<div class="py-7 px-3 md:px-8 border-r border-neutral-200">
					<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">First Prototype</span>
					<div class="flex items-baseline gap-1 leading-none flex-wrap">
						<span class="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">InVision</span>
					</div>
					<span class="text-[9px] text-neutral-400 font-mono block mt-1">Before the first job</span>
				</div>
				<div class="py-7 pl-3 md:pl-8">
					<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">What It Opened</span>
					<div class="flex items-baseline gap-1 leading-none flex-wrap">
						<span class="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">Themeisle</span>
					</div>
					<span class="text-[9px] text-neutral-400 font-mono block mt-1">First professional role</span>
				</div>
			</div>

			<!-- Description + origin story -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 cs-hero-element">
				<div class="space-y-6">
					<p class="text-xl md:text-2xl text-neutral-500 leading-relaxed">{project.description}</p>
					<div class="border-l-2 border-neutral-200 pl-5">
						<p class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase mb-2">Why Spotify</p>
						<p class="text-sm text-neutral-500 leading-relaxed">I've loved Spotify since 2011. It wasn't available in my country then, so I used a VPN just to get in — and from the first session, I was hooked. Music was always there; now it had a home that understood it.</p>
					</div>
				</div>
				<div class="space-y-5 pt-1">
					<p class="text-sm text-neutral-400 leading-relaxed">Years of daily use meant I knew every friction point by instinct — the buried queue, the way Browse broke your session, the now-playing screen that told you nothing about what was coming. Not because I audited it. Because I lived in it.</p>
					<p class="text-sm text-neutral-400 leading-relaxed">This redesign didn't start with a brief. It started with the same app I'd been using since before I had a job in design — and a list of things I'd always wished it did differently. InVision Studio was new, I had free time, and Spotify felt like the right problem to solve for myself.</p>
				</div>
			</div>

		</div>
	</section>

	<!-- ── DARK BENTO ────────────────────────────────────────────────────── -->
	<div bind:this={bentoTriggerEl} data-theme="dark">
		<section class="bg-black py-24 px-6">
			<div class="max-w-7xl mx-auto">

				<div class="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
					<div class="lg:col-span-8 sp-wrap cs-fade-up" style="border-radius: 2rem;">
						<div class="sp-spin"></div>
						<div class="sp-inner bg-neutral-950 p-10 lg:p-14 flex flex-col justify-between" style="border-radius: calc(2rem - 1px);">
							<p class="text-[11px] font-mono tracking-widest text-neutral-500 uppercase mb-8">{project.role} · First InVision Studio Prototype · 2018</p>
							<h2 class="text-3xl lg:text-5xl font-black tracking-tight text-white leading-[1.05]">
								Built to learn. <span class="text-shimmer-white">Ended up opening the first door.</span>
							</h2>
						</div>
					</div>
					<div class="lg:col-span-4 sp-wrap cs-fade-up" style="border-radius: 2rem;">
						<div class="sp-spin"></div>
						<div class="sp-inner bg-neutral-950 p-10 flex flex-col justify-between" style="border-radius: calc(2rem - 1px);">
							<div>
								<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-3">Project</span>
								<span class="text-4xl font-black tracking-tighter text-white">Spotify</span>
							</div>
							<div class="space-y-3">
								<div>
									<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-1">Status</span>
									<span class="text-sm font-semibold text-neutral-300">Concept · Published on Behance</span>
								</div>
								<div>
									<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-1">Platform</span>
									<span class="text-sm font-semibold text-neutral-300">Mobile · iOS</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Bento insights grid -->
				<div class="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5 cs-fade-up">
					<!-- Stat card -->
					<div class="lg:col-span-4 sp-wrap" style="border-radius: 1.5rem;">
						<div class="sp-spin"></div>
						<div class="sp-inner bg-neutral-950 p-8 flex flex-col justify-between gap-8" style="border-radius: calc(1.5rem - 1px);">
							<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-500 uppercase">Behance Discovery</span>
							<div>
								<div class="flex items-baseline gap-2 mb-2">
									<span class="text-6xl font-black tracking-tight text-white leading-none">351</span>
								</div>
								<p class="text-sm text-neutral-500">Views · 8 Appreciations</p>
								<p class="text-xs text-neutral-600 mt-3 leading-relaxed">A personal concept project published without expectation — discovered by the team that would become the first professional role.</p>
							</div>
						</div>
					</div>
					<!-- First prototype narrative card -->
					<div class="lg:col-span-8 sp-wrap" style="border-radius: 1.5rem;">
						<div class="sp-spin"></div>
						<div class="sp-inner bg-neutral-950 p-8 flex flex-col justify-between gap-10" style="border-radius: calc(1.5rem - 1px);">
							<div class="flex items-center justify-between">
								<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-500 uppercase">First Prototype</span>
								<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-600 uppercase">InVision Studio · 2018</span>
							</div>
							<div>
								<p class="text-3xl lg:text-4xl font-black text-white leading-[1.05] tracking-tight mb-4">Before a job. Before a team.<br/>Before professional tools.</p>
								<p class="text-sm text-neutral-500 leading-relaxed max-w-xl">Built entirely in InVision Studio with visual refinement in Adobe Photoshop. No client brief, no deadline, no audience in mind — just a music app I'd used since 2011 and a growing list of things I'd always wanted it to do differently.</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Career outcome strip -->
				<div class="sp-wrap cs-fade-up" style="border-radius: 1.5rem; background: rgba(29, 185, 84, 0.1);">
					<div class="sp-spin-green"></div>
					<div class="sp-inner bg-neutral-950" style="border-radius: calc(1.5rem - 1px);">
						<div class="grid grid-cols-1 md:grid-cols-[1fr_auto] items-stretch">
							<div class="p-8 flex flex-col gap-4">
								<div class="flex items-center gap-2">
									<div class="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-pulse"></div>
									<span class="text-[9px] font-mono tracking-[0.25em] text-[#1DB954]/70 uppercase">Outcome</span>
								</div>
								<p class="text-2xl font-black text-white leading-snug">No interview. No application. <span class="text-[#1DB954]">Just one Figma trial — and the job was mine.</span></p>
								<p class="text-sm text-neutral-500 leading-relaxed max-w-2xl">Themeisle reached out after finding this on Behance and asked me to show my potential. I shared this project. They gave me one trial in Figma. That was it — no interview, no rounds, no waiting. That role led to WPMU DEV, which led to everything after.</p>
							</div>
							<div class="hidden md:flex items-center justify-center px-10 border-l border-[#1DB954]/10">
								<div class="text-center flex flex-col items-center gap-3">
									<img src="/images/themeisle-icon.png" alt="Themeisle" class="w-12 h-12 rounded-xl object-contain" />
									<span class="text-[9px] font-mono tracking-widest text-neutral-600 uppercase">Themeisle</span>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</section>

		<!-- ── BEFORE → AFTER ──────────────────────────────────────────────────── -->
		<section class="bg-black px-6 pt-4 pb-24">
			<div class="max-w-7xl mx-auto">
				<div class="mb-12 cs-fade-up">
					<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase">Before → After</span>
					<h2 class="text-3xl lg:text-4xl font-black tracking-tight text-white mt-3 leading-[1.05]">From buried controls<br/>to a focused listening surface.</h2>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-5 cs-fade-up">
					<!-- Before -->
					<div class="rounded-3xl overflow-hidden border border-white/5 bg-neutral-950 flex flex-col">
						<div class="px-5 py-3 border-b border-white/5 flex items-center gap-2.5">
							<span class="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
							<span class="text-[10px] font-mono tracking-widest text-[#EF4444] uppercase">Before — The Problem</span>
						</div>
						<div class="p-8 flex-1 flex flex-col gap-5">
							<h3 class="text-xl font-black text-white leading-snug">Queue buried. Context missing.<br/>Browsing breaks the session.</h3>
							<p class="text-sm text-neutral-500 leading-relaxed">Spotify's core listening experience required constant context switching. Queue management was hidden multiple taps deep, the now-playing view showed no upcoming context, and opening Browse ejected the user from their session entirely.</p>
							<div class="grid grid-cols-3 gap-3 mt-auto pt-4 border-t border-white/5">
								{#each [{ n: '3+', label: 'Taps to queue' }, { n: '0', label: 'Session context' }, { n: '∞', label: 'Broken flows' }] as s}
									<div class="text-center">
										<span class="text-2xl font-black text-white block leading-none mb-1">{s.n}</span>
										<span class="text-[9px] font-mono text-neutral-600 uppercase tracking-widest">{s.label}</span>
									</div>
								{/each}
							</div>
						</div>
					</div>
					<!-- After -->
					<div class="rounded-3xl overflow-hidden border border-white/5 bg-neutral-950 flex flex-col">
						<div class="px-5 py-3 border-b border-white/5 flex items-center gap-2.5">
							<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse"></span>
							<span class="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">After — Redesigned</span>
						</div>
						<div class="p-8 flex-1 flex flex-col gap-5">
							<h3 class="text-xl font-black text-white leading-snug">Queue surfaced. Session anchored.<br/>Browse stays contextual.</h3>
							<p class="text-sm text-neutral-500 leading-relaxed">Reorganised the now-playing hierarchy to make the queue a native, always-accessible layer. Playlist browsing was redesigned to remain session-aware — the current track stays as the anchor, not an interruption to navigate back to.</p>
							<div class="grid grid-cols-3 gap-3 mt-auto pt-4 border-t border-white/5">
								{#each [{ n: '1', label: 'Tap to queue' }, { n: '4', label: 'Screens built' }, { n: '1', label: 'Session anchor' }] as s}
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

		<!-- ── DISCOVERY FINDINGS ───────────────────────────────────────────────── -->
		<section class="bg-black px-6 pb-24">
			<div class="max-w-7xl mx-auto">
				<div class="mb-12 cs-fade-up">
					<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase">Design Rationale</span>
					<h2 class="text-3xl lg:text-4xl font-black tracking-tight text-white mt-3 leading-[1.05]">Three friction points.<br/>Four screens redesigned around them.</h2>
				</div>
				<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 cs-fade-up">
					<div class="rounded-2xl p-6 flex flex-col gap-3 border border-red-900/40" style="background: linear-gradient(135deg, #2a0a0a 0%, #1a0606 100%);">
						<div class="flex items-center gap-2 mb-1">
							<span class="text-[8px] font-mono tracking-widest text-red-500/80 uppercase px-2 py-0.5 rounded-full border border-red-500/20 bg-red-500/5">Critical</span>
						</div>
						<span class="text-5xl font-black text-white/90 leading-none tracking-tight">3+</span>
						<p class="text-sm text-neutral-400 leading-relaxed">Taps required to access the queue from the now-playing view — a core feature buried behind UI layers.</p>
						<span class="text-[9px] font-mono text-neutral-600 uppercase tracking-widest mt-auto">Queue Accessibility</span>
					</div>
					<div class="rounded-2xl p-6 flex flex-col gap-3 border border-orange-900/40" style="background: linear-gradient(135deg, #2a1200 0%, #1a0c00 100%);">
						<div class="flex items-center gap-2 mb-1">
							<span class="text-[8px] font-mono tracking-widest text-orange-500/80 uppercase px-2 py-0.5 rounded-full border border-orange-500/20 bg-orange-500/5">High</span>
						</div>
						<span class="text-5xl font-black text-white/90 leading-none tracking-tight">0</span>
						<p class="text-sm text-neutral-400 leading-relaxed">Upcoming track context shown in the now-playing view — no way to know what comes next without opening the queue.</p>
						<span class="text-[9px] font-mono text-neutral-600 uppercase tracking-widest mt-auto">Session Context</span>
					</div>
					<div class="rounded-2xl p-6 flex flex-col gap-3 border border-white/5" style="background: linear-gradient(135deg, #141414 0%, #0e0e0e 100%);">
						<div class="flex items-center gap-2 mb-1">
							<span class="text-[8px] font-mono tracking-widest text-neutral-500 uppercase px-2 py-0.5 rounded-full border border-neutral-700/40 bg-neutral-800/40">Medium</span>
						</div>
						<span class="text-5xl font-black text-white/90 leading-none tracking-tight">↯</span>
						<p class="text-sm text-neutral-400 leading-relaxed">Opening Browse or Artist pages fully interrupted the listening session — no way back without losing context.</p>
						<span class="text-[9px] font-mono text-neutral-600 uppercase tracking-widest mt-auto">Browse Continuity</span>
					</div>
				</div>
			</div>
		</section>

	</div><!-- end bentoTriggerEl -->

	<!-- ── SCREEN 01 — Home · WHITE ──────────────────────────────────────── -->
	<section class="bg-white px-6 py-24 border-t border-neutral-200">
		<div class="max-w-7xl mx-auto cs-fade-up">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
				<div>
					<span class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase block mb-5">Screen 01 — Home</span>
					<h3 class="text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight leading-[0.93] mb-5">Your listening session,<br/>centred.</h3>
					<p class="text-sm text-neutral-500 leading-relaxed">The Home screen anchors the experience on what you're playing right now — not editorial content, not recommendations, not social activity. The current session is the hero: album art dominates, playback controls are immediate, and the queue is one tap away instead of three.</p>
				</div>
				<ul class="space-y-3 lg:pt-14">
					{#each ['Current track and album art fill the primary viewport','Playback controls are first-class — not secondary to discovery content','Queue surface reachable in a single upward swipe from now-playing','Session context: artist bio and upcoming tracks in the same view','Recently played rail below the session — never interrupting it','Listening time indicator showing session duration at a glance'] as b}
						<li class="flex items-start gap-3 text-sm text-neutral-600 leading-snug"><span class="w-1 h-1 rounded-full bg-neutral-300 shrink-0 mt-[6px]"></span>{b}</li>
					{/each}
				</ul>
			</div>
			<div class="bg-neutral-100 rounded-3xl p-4 lg:p-8">
				<p class="text-[8px] font-mono tracking-widest text-neutral-400 uppercase mb-4 pl-1">Home Screen</p>
				<button type="button" class="img-trigger rounded-2xl overflow-hidden shadow-sm" onclick={() => openModal('/images/projects/spotify/home.webp', 'Spotify Redesign — Home Screen')} aria-label="Preview Home Screen">
					<img src="/images/projects/spotify/home.webp" alt="Spotify Redesign — Home Screen" class="w-full block" loading="lazy" />
					<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
					<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
				</button>
			</div>
		</div>
	</section>

	<!-- ── SCREEN 02 — Browse · BLACK ────────────────────────────────────── -->
	<section class="bg-black px-6 py-24 border-t border-white/4">
		<div class="max-w-7xl mx-auto cs-fade-up">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
				<div>
					<span class="text-[9px] font-mono tracking-widest text-neutral-600 uppercase block mb-5">Screen 02 — Browse</span>
					<h3 class="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[0.93] mb-5">Discovery that doesn't<br/>interrupt the music.</h3>
					<p class="text-sm text-neutral-500 leading-relaxed">The original Browse pulled you completely out of your session. The redesigned Browse keeps the current track persistent at the bottom, so exploring new music never means losing your place. Categories are editorial — curated by mood, activity, and listening context rather than pure genre grids.</p>
				</div>
				<ul class="space-y-3 lg:pt-14">
					{#each ['Persistent mini-player at the bottom — session never interrupted','Category tiles organised by listening context: mood, activity, time','Featured editorial slots for new releases and curated sessions','Search integrated into Browse — one surface, not two separate tabs','Current queue badge on the mini-player shows upcoming count','Seamless transition back to full now-playing from any Browse state'] as b}
						<li class="flex items-start gap-3 text-sm text-neutral-500 leading-snug"><span class="w-1 h-1 rounded-full bg-neutral-600 shrink-0 mt-[6px]"></span>{b}</li>
					{/each}
				</ul>
			</div>
			<div class="bg-[#111111] rounded-3xl p-4 lg:p-8 border border-white/5">
				<p class="text-[8px] font-mono tracking-widest text-neutral-600 uppercase mb-4 pl-1">Browse Screen</p>
				<button type="button" class="img-trigger rounded-2xl overflow-hidden" onclick={() => openModal('/images/projects/spotify/browse.webp', 'Spotify Redesign — Browse Screen')} aria-label="Preview Browse Screen">
					<img src="/images/projects/spotify/browse.webp" alt="Spotify Redesign — Browse Screen" class="w-full block" loading="lazy" />
					<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
					<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
				</button>
			</div>
		</div>
	</section>

	<!-- ── SCREEN 03 — Artist · WHITE ────────────────────────────────────── -->
	<section class="bg-white px-6 py-24 border-t border-neutral-200">
		<div class="max-w-7xl mx-auto cs-fade-up">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
				<div>
					<span class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase block mb-5">Screen 03 — Artist</span>
					<h3 class="text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight leading-[0.93] mb-5">Context for<br/>what you're hearing.</h3>
					<p class="text-sm text-neutral-500 leading-relaxed">Artist pages previously felt like a full destination — navigating to them meant fully leaving your session. The redesigned Artist page is session-aware: the header shows the artist you're currently listening to, and the layout surfaces popular tracks, albums, and related artists in a hierarchy that encourages exploration without loss of context.</p>
				</div>
				<ul class="space-y-3 lg:pt-14">
					{#each ['Artist header with current-session badge when actively listening','Popular tracks rail with inline play — queue tracks without leaving the page','Discography section sorted by recency with album type labels','Related artists section surfaced as a secondary exploration layer','Monthly listeners count and verified badge in the header strip','Mini-player persists at bottom — return to session in one tap'] as b}
						<li class="flex items-start gap-3 text-sm text-neutral-600 leading-snug"><span class="w-1 h-1 rounded-full bg-neutral-300 shrink-0 mt-[6px]"></span>{b}</li>
					{/each}
				</ul>
			</div>
			<div class="bg-neutral-100 rounded-3xl p-4 lg:p-8">
				<p class="text-[8px] font-mono tracking-widest text-neutral-400 uppercase mb-4 pl-1">Artist Screen</p>
				<button type="button" class="img-trigger rounded-2xl overflow-hidden shadow-sm" onclick={() => openModal('/images/projects/spotify/artist.webp', 'Spotify Redesign — Artist Screen')} aria-label="Preview Artist Screen">
					<img src="/images/projects/spotify/artist.webp" alt="Spotify Redesign — Artist Screen" class="w-full block" loading="lazy" />
					<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
					<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
				</button>
			</div>
		</div>
	</section>

	<!-- ── SCREEN 04 — Profile · BLACK ───────────────────────────────────── -->
	<section class="bg-black px-6 py-24 border-t border-white/4">
		<div class="max-w-7xl mx-auto cs-fade-up">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
				<div>
					<span class="text-[9px] font-mono tracking-widest text-neutral-600 uppercase block mb-5">Screen 04 — Profile</span>
					<h3 class="text-4xl lg:text-5xl font-black text-white tracking-tight leading-[0.93] mb-5">Your listening<br/>history, visible.</h3>
					<p class="text-sm text-neutral-500 leading-relaxed">The Profile screen was an afterthought in the original — a thin settings-adjacent page with little personality. The redesign makes listening history the primary content: recently played, top artists, and playlists created are all surfaced in a personal listening digest that reflects actual use rather than generic account management.</p>
				</div>
				<ul class="space-y-3 lg:pt-14">
					{#each ['Recently played rail: albums, playlists, and stations in recency order','Top artists section with listen frequency — your actual taste fingerprint','Playlists created and followed, sorted by last-played date','Listening history count: tracks played this month across all sessions','Profile header shows followers and following in a clean stat strip','Settings and account management tucked to secondary — not the hero'] as b}
						<li class="flex items-start gap-3 text-sm text-neutral-500 leading-snug"><span class="w-1 h-1 rounded-full bg-neutral-600 shrink-0 mt-[6px]"></span>{b}</li>
					{/each}
				</ul>
			</div>
			<div class="bg-[#111111] rounded-3xl p-4 lg:p-8 border border-white/5">
				<p class="text-[8px] font-mono tracking-widest text-neutral-600 uppercase mb-4 pl-1">Profile Screen</p>
				<button type="button" class="img-trigger rounded-2xl overflow-hidden" onclick={() => openModal('/images/projects/spotify/profile.webp', 'Spotify Redesign — Profile Screen')} aria-label="Preview Profile Screen">
					<img src="/images/projects/spotify/profile.webp" alt="Spotify Redesign — Profile Screen" class="w-full block" loading="lazy" />
					<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
					<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
				</button>
			</div>
		</div>
	</section>

	<!-- ── EDITORIAL ──────────────────────────────────────────────────────── -->
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
							{ n: '3+', label: 'Taps to queue', sub: 'From now-playing view' },
							{ n: '0%', label: 'Upcoming context', sub: 'Shown in now-playing' },
							{ n: '100%', label: 'Session lost', sub: 'On any Browse visit' }
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
							{ n: '01', title: 'Audit & Map', desc: 'Mapped every tap required to access core listening features — queue, browse, artist, profile — and documented where session continuity broke.' },
							{ n: '02', title: 'Prototype in InVision', desc: 'Built the interactive flows in InVision Studio, focusing on the now-playing hierarchy and how the queue surfaced relative to the current track.' },
							{ n: '03', title: 'Refine in Photoshop', desc: "Visual refinement pass in Adobe Photoshop — typography, spacing, colour application with Spotify's design language as the baseline reference." }
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
					<!-- Comparison table -->
					<div class="border border-neutral-200 rounded-2xl overflow-hidden">
						<div class="grid grid-cols-[1fr_140px_160px] border-b border-neutral-200 bg-neutral-50 px-6 py-3">
							<span class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">Decision</span>
							<span class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">Before</span>
							<span class="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">After</span>
						</div>
						{#each [
							{ decision: 'Queue access', before: '3+ taps deep', after: '1 swipe from now-playing' },
							{ decision: 'Upcoming tracks', before: 'Not shown', after: 'Visible in now-playing layer' },
							{ decision: 'Browse navigation', before: 'Full session break', after: 'Mini-player persists' },
							{ decision: 'Artist page', before: 'Full page replacement', after: 'Session-aware overlay' },
							{ decision: 'Now-playing hierarchy', before: 'Controls + album art only', after: 'Album art dominant + quick actions' },
						] as row}
							<div class="grid grid-cols-[1fr_140px_160px] border-b border-neutral-100 last:border-0 px-6 py-4 items-center">
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
								<div class="flex items-center gap-3 mb-5">
									<img src="/images/themeisle-icon.png" alt="Themeisle" class="w-5 h-5 rounded object-contain shrink-0" />
									<span class="text-[8px] font-mono tracking-[0.3em] text-[#1DB954]/70 uppercase">The moment</span>
								</div>
								<p class="text-2xl font-black text-white leading-snug mb-3">No interview. One Figma trial. Job done.</p>
								<p class="text-sm text-neutral-500 leading-relaxed flex-1">Themeisle reached out after finding this redesign on Behance and asked me to show my potential. I shared this project — a personal concept built in 2018 with no client and no brief. They gave me one trial in Figma. That was the entire hiring process. That role led to WPMU DEV, which led to everything after. Built in 2018 as a personal exploration; it ended up being the most consequential project in the portfolio.</p>
							</div>
							<div class="p-8 md:p-10 flex flex-col">
								<div class="flex items-center gap-2 mb-5">
									<div class="w-1.5 h-1.5 rounded-full bg-neutral-500 shrink-0"></div>
									<span class="text-[8px] font-mono tracking-[0.3em] text-neutral-500 uppercase">The lesson</span>
								</div>
								<p class="text-2xl font-black text-white leading-snug mb-3">The work you do for yourself is the work that matters.</p>
								<p class="text-sm text-neutral-500 leading-relaxed flex-1">No one asked for this redesign. It existed because music players are interesting problems and InVision Studio was new and the queue management was frustrating. Personal work done with genuine curiosity is the hardest thing to fake — and the easiest to recognise.</p>
								<a href={BEHANCE_URL} target="_blank" rel="noopener noreferrer" class="mt-6 flex items-center gap-2 text-[#1DB954]/60 hover:text-[#1DB954] transition-colors">
									<span class="text-[9px] font-mono tracking-widest uppercase">View full project on Behance ↗</span>
								</a>
							</div>
						</div>
					</div>
				</div>

				<!-- Feature chips grid -->
				<div class="cs-fade-up">
					<div class="flex items-center gap-4 mb-10">
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase">Key Design Decisions</span>
						<div class="h-px flex-1 bg-neutral-200"></div>
					</div>
					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{#each [
							{ icon: '◉', title: 'Session-First Layout', desc: 'Now-playing is always the primary view — album art dominates, controls are immediate, and queue is one gesture away.' },
							{ icon: '▦', title: 'Persistent Mini-Player', desc: 'Browse, Artist, and Profile pages all anchor on a persistent mini-player strip — returning to the session is always one tap.' },
							{ icon: '▣', title: 'Queue as Native Layer', desc: 'The queue is surfaced as a slide-up panel from now-playing, not a separate screen requiring back-navigation to reach.' },
							{ icon: '◈', title: 'Session-Aware Artist Page', desc: 'Artist pages now know if you\'re currently listening to them, surfacing that context at the top rather than showing a blank profile.' },
							{ icon: '⊑', title: 'Contextual Browse', desc: 'Categories sorted by mood, activity, and time of day — not just genre — making discovery feel relevant rather than generic.' },
							{ icon: '◐', title: 'Listening Digest Profile', desc: 'Profile is a personal listening digest: recently played, top artists, and created playlists — not account management.' },
						] as f}
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

<ExploreProjectComponent currentSlug="spotify-redesign" />

<style>
	/* ── Bento cards — spinning arc border on hover ───────────────── */
	@keyframes spin-border {
		from { transform: rotate(0deg); }
		to   { transform: rotate(360deg); }
	}
	.sp-wrap {
		position: relative;
		padding: 1px;
		overflow: hidden;
		background: rgba(255, 255, 255, 0.055);
		transition: background 0.9s ease, box-shadow 0.9s ease;
		display: flex;
		flex-direction: column;
	}
	.sp-wrap:hover {
		background: rgba(255, 255, 255, 0.025);
		box-shadow:
			0 0 18px 1px rgba(255, 255, 255, 0.055),
			0 0 55px 6px rgba(255, 255, 255, 0.028);
	}
	.sp-spin {
		position: absolute;
		inset: -1000%;
		background: conic-gradient(transparent 260deg, rgba(255, 255, 255, 0.65) 360deg);
		opacity: 0;
		animation: spin-border 4s linear infinite;
		animation-play-state: paused;
		transition: opacity 0.8s ease;
		pointer-events: none;
	}
	.sp-wrap:hover .sp-spin {
		opacity: 0.85;
		animation-play-state: running;
	}
	.sp-spin-green {
		position: absolute;
		inset: -1000%;
		background: conic-gradient(transparent 260deg, rgba(29, 185, 84, 0.6) 360deg);
		opacity: 0;
		animation: spin-border 4s linear infinite;
		animation-play-state: paused;
		transition: opacity 0.8s ease;
		pointer-events: none;
	}
	.sp-wrap:hover .sp-spin-green {
		opacity: 0.85;
		animation-play-state: running;
	}
	.sp-inner {
		position: relative;
		flex: 1;
		overflow: hidden;
	}

	/* ── Image trigger cards ─────────────────────── */
	.img-trigger {
		display: block; width: 100%; position: relative;
		cursor: zoom-in; border: none; padding: 0; background: none; text-align: left;
	}
	.img-preview-badge {
		position: absolute; bottom: 10px; right: 10px;
		display: flex; align-items: center; gap: 4px;
		background: rgba(0,0,0,0.5); backdrop-filter: blur(8px);
		border-radius: 999px; padding: 4px 8px;
		opacity: 1; transition: opacity 0.2s;
	}
	.img-trigger:hover .img-preview-badge { opacity: 0; }
	.img-trigger-overlay {
		position: absolute; inset: 0; display: flex;
		align-items: center; justify-content: center;
		background: transparent; transition: background 0.2s;
	}
	.img-trigger:hover .img-trigger-overlay { background: rgba(0,0,0,0.4); }
	.img-expand-icon {
		width: 44px; height: 44px; border-radius: 50%;
		background: rgba(255,255,255,0.15); backdrop-filter: blur(8px);
		border: 1px solid rgba(255,255,255,0.2);
		display: flex; align-items: center; justify-content: center;
		opacity: 0; transform: scale(0.85); transition: opacity 0.2s, transform 0.2s;
	}
	.img-trigger:hover .img-expand-icon { opacity: 1; transform: scale(1); }

</style>
