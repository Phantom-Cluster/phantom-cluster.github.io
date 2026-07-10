<script lang="ts">
	import type { PageData } from './$types';
	import { onMount, onDestroy } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { navTheme } from '$lib/stores/navTheme';
	import CsImageCard from '$lib/components/CsImageCard.svelte';
	import LightboxModal from '$lib/components/LightboxModal.svelte';
	import ExploreProjectComponent from '$lib/components/ExploreProjectComponent.svelte';

	let { data }: { data: PageData } = $props();
	let project = $derived(data.project);

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
				ScrollTrigger.create({
					trigger: bentoTriggerEl, start: 'top 90%',
					onEnter: () => navTheme.set('dark'), onLeaveBack: () => navTheme.set('light')
				});
				ScrollTrigger.create({
					trigger: editorialTriggerEl, start: 'top 90%',
					onEnter: () => navTheme.set('light'), onLeaveBack: () => navTheme.set('dark')
				});

				// ── Hero entrance ─────────────────────────────────────────
				gsap.set('.ec-hero-badge',     { opacity: 0, y: 14 });
				gsap.set('.ec-hero-eyebrow',   { opacity: 0, y: 12 });
				gsap.set('.ec-hero-line',      { yPercent: 110 });
				gsap.set('.ec-hero-chips span',{ opacity: 0, y: 10 });
				gsap.set('.ec-hero-meta-item', { opacity: 0, y: 16 });
				gsap.set('.ec-hero-ledger',    { opacity: 0, y: 20 });
				gsap.set('.ec-hero-desc',      { opacity: 0, y: 16 });
				gsap.set('.ec-hero-tags',      { opacity: 0, y: 16 });

				gsap.timeline({ delay: 0.05 })
					.to('.ec-hero-badge',     { opacity: 1, y: 0, duration: 0.5,  ease: 'power2.out' })
					.to('.ec-hero-line',      { yPercent: 0,       duration: 1.0,  stagger: 0.09, ease: 'power4.out' }, '-=0.2')
					.to('.ec-hero-eyebrow',   { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 0.1)
					.to('.ec-hero-chips span',{ opacity: 1, y: 0, duration: 0.45, stagger: 0.055, ease: 'power3.out' }, '-=0.5')
					.to('.ec-hero-meta-item', { opacity: 1, y: 0, duration: 0.5,  stagger: 0.07, ease: 'power3.out' }, '-=0.6')
					.to('.ec-hero-ledger',    { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.4')
					.to('.ec-hero-desc',      { opacity: 1, y: 0, duration: 0.5,  ease: 'power3.out' }, '-=0.35')
					.to('.ec-hero-tags',      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.4');

				// ── Scroll animations ─────────────────────────────────────────
				gsap.set('.cs-fade-up', { y: 36, opacity: 0 });
				ScrollTrigger.batch('.cs-fade-up', {
					start: 'top 88%',
					onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out' }),
					once: true
				});

				gsap.utils.toArray('.cs-grid-stagger').forEach((grid: any) => {
					const children = Array.from((grid as HTMLElement).children);
					gsap.set(children, { y: 40, opacity: 0, scale: 0.96 });
					gsap.to(children, {
						y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out',
						scrollTrigger: { trigger: grid, start: 'top 85%', once: true }
					});
				});

				gsap.utils.toArray('.cs-img').forEach((img: any) => {
					gsap.set(img, { scale: 1.06 });
					gsap.to(img, {
						scale: 1, duration: 1.1, ease: 'power2.out',
						scrollTrigger: { trigger: img, start: 'top 90%', once: true }
					});
				});
			});

			ScrollTrigger.refresh();
		}, 400);

		return () => clearTimeout(t);
	});

	onDestroy(() => {
		navTheme.set(null);
		if (typeof document !== 'undefined') document.body.style.backgroundColor = '';
		if (ctx) ctx.revert();
	});
</script>

<style>
	/* ── Click-to-zoom image trigger — identical to Ideajam ─────────────── */
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
	.img-trigger:hover .img-trigger-overlay { background: rgba(0, 0, 0, 0.35); }
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

	/* ── Spinning arc border — Ideajam card style ───────────────────────── */
	@keyframes spin-border {
		from { transform: rotate(0deg); }
		to   { transform: rotate(360deg); }
	}
	.ij-wrap {
		position: relative;
		padding: 1px;
		overflow: hidden;
		background: rgba(255, 255, 255, 0.055);
		transition: background 0.9s ease, box-shadow 0.9s ease;
		display: flex;
		flex-direction: column;
	}
	.ij-wrap:hover {
		background: rgba(255, 255, 255, 0.025);
		box-shadow:
			0 0 18px 1px rgba(255, 255, 255, 0.055),
			0 0 55px 6px rgba(255, 255, 255, 0.028);
	}
	.ij-spin {
		position: absolute;
		inset: -1000%;
		background: conic-gradient(transparent 260deg, rgba(255, 255, 255, 0.65) 360deg);
		opacity: 0;
		animation: spin-border 4s linear infinite;
		animation-play-state: paused;
		transition: opacity 0.8s ease;
		pointer-events: none;
	}
	.ij-wrap:hover .ij-spin { opacity: 0.85; animation-play-state: running; }
	.ij-spin-green {
		position: absolute;
		inset: -1000%;
		background: conic-gradient(transparent 260deg, rgba(0, 230, 118, 0.6) 360deg);
		opacity: 0;
		animation: spin-border 4s linear infinite;
		animation-play-state: paused;
		transition: opacity 0.8s ease;
		pointer-events: none;
	}
	.ij-wrap:hover .ij-spin-green { opacity: 0.85; animation-play-state: running; }
	.ij-inner { position: relative; flex: 1; overflow: hidden; }

</style>

<svelte:head>
	<title>Eclectic App Redesign | Hitanshu Sahu</title>
</svelte:head>

<LightboxModal bind:modalImg />

<div bind:this={pageWrapperEl} class="min-h-screen bg-white text-neutral-900" style="background-color: #ffffff;">

	<!-- ═══════════════════════════════════════════════
	     STAGE 1: LIGHT HERO
	     ═══════════════════════════════════════════════ -->
	<section data-theme="light" class="w-full bg-white px-6 pt-[160px] md:pt-[180px] pb-16 flex flex-col justify-center">
		<div class="max-w-7xl mx-auto w-full">

			<div class="ec-hero-badge flex items-center justify-between border-b border-neutral-200 pb-5 mb-12">
				<div class="relative inline-flex overflow-hidden rounded-full p-[1.5px] shadow-sm bg-neutral-200">
					<div class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,rgba(0,0,0,0.75)_360deg)]"></div>
					<div class="inline-flex h-full w-full items-center justify-center rounded-full bg-white px-6 py-2 relative z-10">
						<span class="text-[11px] font-mono tracking-widest text-neutral-500 uppercase">Case Study — Consumer App Redesign</span>
					</div>
				</div>
				<span class="text-[11px] font-mono tracking-widest text-neutral-400 uppercase hidden sm:block">Mar 2025 — Present</span>
			</div>

			<div class="flex items-start gap-10">
				<div class="flex-1 min-w-0">
					<p class="ec-hero-eyebrow text-[11px] font-mono tracking-[0.35em] uppercase text-neutral-400 mb-5">Eclectic</p>
					<h1 class="text-[clamp(2.8rem,7vw,6rem)] font-black tracking-tight leading-[1.10] text-neutral-900">
						<span class="block overflow-hidden pb-[0.08em] mb-[-0.2em]"><span class="ec-hero-line block">Built&nbsp;to</span></span>
						<span class="block overflow-hidden pb-[0.08em] mb-[-0.2em]"><span class="ec-hero-line block text-neutral-300">Convert.</span></span>
						<span class="block overflow-hidden pb-[0.08em]"><span class="ec-hero-line block">Then&nbsp;Keep.</span></span>
					</h1>
					<div class="ec-hero-chips flex flex-wrap gap-2 mt-8">
						{#each ['Mobile App', 'Consumer Product', 'Travel Guides', 'Multi-region'] as product}
							<span class="px-3 py-1 rounded-full bg-neutral-50 border border-neutral-200 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">{product}</span>
						{/each}
					</div>
				</div>
				<div class="shrink-0 w-56 hidden md:flex flex-col gap-6 pt-14">
					<div class="ec-hero-meta-item">
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Role</span>
						<span class="text-sm font-semibold text-neutral-800">{project.role}</span>
					</div>
					<div class="ec-hero-meta-item">
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Platform</span>
						<span class="text-sm font-semibold text-neutral-800">Mobile · iOS &amp; Android</span>
					</div>
					<div class="ec-hero-meta-item">
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Tools</span>
						<span class="text-sm font-semibold text-neutral-800">Figma · Protopie</span>
					</div>
					<div class="ec-hero-meta-item">
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Regions</span>
						<span class="text-sm font-semibold text-neutral-800">3 Simultaneous Markets</span>
					</div>
					<div class="ec-hero-meta-item pt-5 border-t border-neutral-100">
						<div class="flex items-center gap-2 text-portfolio-accent">
							<span class="text-[9px] font-mono tracking-widest uppercase">Scroll to explore</span>
							<svg class="w-3.5 h-3.5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
							</svg>
						</div>
					</div>
				</div>
			</div>

			<!-- 3-col impact ledger -->
			<div class="ec-hero-ledger grid grid-cols-3 border-t border-b border-neutral-200 mt-12">
				<div class="py-7 pr-4 md:pr-8 border-r border-neutral-200">
					<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">Market Scale</span>
					<div class="flex items-baseline gap-1.5 leading-none flex-wrap">
						<span class="text-lg md:text-xl font-black text-neutral-300 tracking-tight line-through decoration-portfolio-error">1</span>
						<span class="text-portfolio-accent font-black text-sm md:text-base leading-none">→</span>
						<span class="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">3×</span>
					</div>
					<span class="text-[9px] text-neutral-400 font-mono block mt-1">Regional Markets</span>
				</div>
				<div class="py-7 px-3 md:px-8 border-r border-neutral-200">
					<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">Rebuilt</span>
					<div class="flex flex-col gap-0.5">
						<span class="text-sm md:text-base font-black text-neutral-900 tracking-tight">Onboarding</span>
						<span class="text-sm md:text-base font-black text-neutral-900 tracking-tight">Player Controls</span>
						<span class="text-sm md:text-base font-black text-neutral-900 tracking-tight">Profile &amp; History</span>
					</div>
				</div>
				<div class="py-7 pl-3 md:pl-8">
					<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">Net-new</span>
					<div class="flex flex-col gap-0.5">
						<span class="text-sm md:text-base font-black text-neutral-900 tracking-tight">Transcript</span>
						<span class="text-sm md:text-base font-black text-neutral-900 tracking-tight">3D Live Map</span>
						<span class="text-sm md:text-base font-black text-neutral-900 tracking-tight">−10s / +15s Seek</span>
					</div>
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10">
				<div class="ec-hero-desc md:col-span-2">
					<p class="text-xl md:text-2xl text-neutral-500 leading-relaxed">{project.description}</p>
				</div>
				<div class="ec-hero-tags flex flex-wrap gap-2 content-start pt-1">
					{#each project.tags as tag}
						<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase bg-neutral-100 border border-neutral-200 text-neutral-600">{tag}</span>
					{/each}
				</div>
			</div>

		</div>
	</section>

	<!-- ═══════════════════════════════════════════════
	     STAGE 2: DARK METRICS
	     ═══════════════════════════════════════════════ -->
	<div bind:this={bentoTriggerEl} data-theme="dark">
		<section class="bg-black py-24 px-6">
			<div class="max-w-7xl mx-auto">

				<div class="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5 cs-grid-stagger">
					<div class="lg:col-span-8 ij-wrap" style="border-radius: 2rem;">
						<div class="ij-spin"></div>
						<div class="ij-inner bg-neutral-950 p-10 lg:p-14 flex flex-col justify-between" style="border-radius: calc(2rem - 1px);">
							<p class="text-[11px] font-mono tracking-widest text-neutral-500 uppercase mb-8">{project.role} · Mobile App · Travel Guides · Multi-region</p>
							<h2 class="text-3xl lg:text-5xl font-black tracking-tight text-white leading-[1.05]">
								Every surface was broken. <span class="text-shimmer-white">We rebuilt the whole thing</span> — from onboarding to the player, the map, the profile, and everything in between.
							</h2>
						</div>
					</div>
					<div class="lg:col-span-4 ij-wrap" style="border-radius: 2rem;">
						<div class="ij-spin"></div>
						<div class="ij-inner bg-neutral-950 p-10 flex flex-col justify-between" style="border-radius: calc(2rem - 1px);">
							<div>
								<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-3">Client</span>
								<span class="text-4xl font-black tracking-tighter text-white">Eclectic</span>
							</div>
							<div>
								<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-2">Tools</span>
								<span class="text-sm font-semibold text-neutral-300">Figma · Protopie</span>
							</div>
						</div>
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-5 cs-grid-stagger">
					<div class="ij-wrap" style="border-radius: 2rem;">
						<div class="ij-spin"></div>
						<div class="ij-inner bg-neutral-950 p-10 flex flex-col justify-center" style="border-radius: calc(2rem - 1px);">
							<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-500 uppercase block mb-4">Net-new Feature</span>
							<div class="flex items-baseline gap-2 mb-3">
								<span class="text-4xl font-black tracking-tight text-white stat-glow-white">Transcript</span>
							</div>
							<p class="text-sm text-neutral-500 leading-relaxed">Live audio transcript as a core feature — a second mode of engaging with tour content that didn't exist before.</p>
						</div>
					</div>
					<div class="ij-wrap" style="border-radius: 2rem; background: rgba(0, 230, 118, 0.1);">
						<div class="ij-spin-green"></div>
						<div class="ij-inner bg-[#061a0f] p-10 flex flex-col justify-center" style="border-radius: calc(2rem - 1px);">
							<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-500 uppercase block mb-4">Net-new Feature</span>
							<div class="flex items-baseline gap-2 mb-3">
								<span class="text-4xl font-black tracking-tight text-portfolio-success stat-glow-green">3D Map</span>
							</div>
							<p class="text-sm text-neutral-500 leading-relaxed">Interactive 3D map with live tour position tracking — for a product built around navigating cities on foot.</p>
						</div>
					</div>
					<div class="ij-wrap" style="border-radius: 2rem;">
						<div class="ij-spin"></div>
						<div class="ij-inner bg-neutral-950 p-10 flex flex-col justify-center" style="border-radius: calc(2rem - 1px);">
							<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-500 uppercase block mb-4">Rebuilt</span>
							<div class="flex items-baseline gap-2 mb-3">
								<span class="text-4xl font-black tracking-tight text-white stat-glow-white">Onboarding</span>
							</div>
							<p class="text-sm text-neutral-500 leading-relaxed">Completely restructured to surface the value of a purchase before asking for anything. The old flow dropped users into the app with no context.</p>
						</div>
					</div>
				</div>

			</div>
		</section>

		<!-- ── Before / After ─────────────────────────────────────────────── -->
		<section class="bg-black px-6 pt-4 pb-24">
			<div class="max-w-7xl mx-auto">
				<div class="mb-12 cs-fade-up">
					<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase">Before → After</span>
					<h2 class="text-3xl lg:text-4xl font-black tracking-tight text-white mt-3 leading-[1.05]">From a manual-heavy UI<br/>to a localized, AI-assisted pipeline.</h2>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-5 cs-grid-stagger">
					<CsImageCard
						src="/videos/Eclectic/old UI.webp"
						label="Before"
						caption="Eclectic original UI — before redesign"
						labelVariant="error"
						subtitle="Original UI"
						footer="Manual workflow, no localization structure, assets produced per-region one at a time."
						onOpen={openModal}
					/>
					<CsImageCard
						src="/videos/Eclectic/New UI .webp"
						label="After"
						caption="Eclectic redesigned UI — new app with localized design system and AI-assisted pipeline"
						labelVariant="success"
						subtitle="Redesigned · 2025"
						footer="Localized component structure. Single Figma source deploys to 3 regions. AI handles templated asset generation."
						onOpen={openModal}
					/>
				</div>
			</div>
		</section>

		<!-- ── Key screens ─────────────────────────────────────────────────── -->
		<section class="bg-black px-6 pb-24">
			<div class="max-w-7xl mx-auto">
				<div class="mb-12 cs-fade-up">
					<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase">Key Screens</span>
					<h2 class="text-3xl lg:text-4xl font-black tracking-tight text-white mt-3 leading-[1.05]">Every surface designed<br/>for multi-region delivery.</h2>
				</div>

				<!-- Row 1: 3 phone screenshots -->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5 cs-grid-stagger">
					{#each [
						{ src: '/videos/Eclectic/New UI second screenshot.webp', label: 'App UI — View 2', caption: 'Second primary screen' },
						{ src: '/videos/Eclectic/New Walkthrough.webp',           label: 'New Walkthrough',  caption: 'Onboarding walkthrough flow' },
						{ src: '/videos/Eclectic/New Sign up and sign in process.webp', label: 'Auth Flow', caption: 'Sign-up & sign-in redesign' },
					] as screen}
						<CsImageCard
							src={screen.src}
							label={screen.label}
							caption={screen.caption}
							onOpen={openModal}
						/>
					{/each}
				</div>

				<!-- Row 2: 2 more screens -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-5 cs-grid-stagger">
					{#each [
						{ src: '/videos/Eclectic/checkout.webp', label: 'Checkout Flow', caption: 'Purchase flow — checkout screen' },
						{ src: '/videos/Eclectic/Switch language.webp', label: 'Language Switch', caption: 'Multi-region language switching — single Figma source' },
					] as screen}
						<CsImageCard
							src={screen.src}
							label={screen.label}
							caption={screen.caption}
							onOpen={openModal}
						/>
					{/each}
				</div>
			</div>
		</section>
	</div>

	<!-- ═══════════════════════════════════════════════
	     STAGE 3: LIGHT EDITORIAL
	     ═══════════════════════════════════════════════ -->
	<div bind:this={editorialTriggerEl} data-theme="light">
		<section class="bg-white px-6 py-32">
			<div class="max-w-7xl mx-auto space-y-40">

				<!-- ── 01 PROBLEM ──────────────────────────────────────────── -->
				<div class="flex flex-col md:flex-row gap-12 md:gap-20">
					<div class="md:w-[260px] shrink-0">
						<div class="sticky top-32">
							<div class="flex items-center gap-3 mb-5 cs-fade-up">
								<span class="text-[10px] font-mono tracking-[0.3em] text-neutral-300 uppercase">01</span>
								<div class="h-px flex-1 bg-neutral-200"></div>
							</div>
							<h2 class="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-[0.9] cs-fade-up">The<br/>Problem</h2>
						</div>
					</div>

					<div class="flex-1 min-w-0 pt-2 md:pt-0">
						<!-- Pull quote — big typographic moment -->
						<p class="text-[clamp(1.4rem,3vw,2.1rem)] font-black text-neutral-900 leading-[1.15] tracking-tight mb-10 cs-fade-up">
							"You're selling guided city tours.<br/>
							<span class="text-neutral-300">There was no map."</span>
						</p>

						<!-- Problem inventory — each failure as a labelled row -->
						<div class="space-y-px mb-10 cs-fade-up">
							{#each [
								{ id: '01', area: 'Onboarding',      was: 'Dropped users into the app cold — no value signal, no context, no reason to stay.' },
								{ id: '02', area: 'Player',          was: 'No seek controls. Missed a moment in the audio? You were locked in.' },
								{ id: '03', area: 'Preview States',  was: 'Bought and un-bought tours looked identical. Nothing communicated what a purchase unlocked.' },
								{ id: '04', area: 'Profile',         was: 'Effectively empty. No purchase history, no tour progress, no reviews.' },
								{ id: '05', area: 'Map',             was: 'Didn\'t exist. A walking-tour product with no way to know where you are.' },
								{ id: '06', area: 'Language',        was: 'No multi-region support. Every market required a separate build.' },
							] as item}
								<div class="group flex items-start gap-5 py-4 border-t border-neutral-100 hover:bg-neutral-50 transition-colors px-1 -mx-1 rounded-lg">
									<span class="text-[10px] font-mono text-neutral-300 pt-0.5 w-6 shrink-0">{item.id}</span>
									<span class="text-sm font-black text-neutral-900 w-28 shrink-0 pt-0.5">{item.area}</span>
									<span class="text-sm text-neutral-500 leading-relaxed">{item.was}</span>
								</div>
							{/each}
						</div>

						<!-- Old UI screenshot — full-width landscape crop -->
						<figure class="rounded-2xl overflow-hidden border border-neutral-100 cs-fade-up">
							<div class="px-4 py-2.5 border-b border-neutral-100 bg-neutral-50 flex items-center gap-2">
								<div class="w-1.5 h-1.5 rounded-full bg-red-400"></div>
								<span class="text-[9px] font-mono tracking-widest text-[#EF4444] uppercase">Before — Original UI</span>
							</div>
							<button
								type="button"
								class="img-trigger"
								onclick={() => openModal('/videos/Eclectic/old UI.webp', 'Eclectic original UI — before redesign')}
								aria-label="Preview: original UI"
							>
								<div class="relative overflow-hidden w-full h-72 md:h-96">
									<img src="/videos/Eclectic/old UI.webp" alt="Eclectic original UI" class="w-full h-full object-cover object-top cs-img" />
								</div>
								<div class="img-trigger-overlay">
									<div class="img-expand-icon">
										<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
									</div>
								</div>
								<div class="img-preview-badge">
									<svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
									<span class="text-[9px] text-white/60 font-mono tracking-wider">View full image</span>
								</div>
							</button>
						</figure>
					</div>
				</div>

				<!-- ── 02 STRATEGY ─────────────────────────────────────────── -->
				<div class="flex flex-col md:flex-row gap-12 md:gap-20">
					<div class="md:w-[260px] shrink-0">
						<div class="sticky top-32">
							<div class="flex items-center gap-3 mb-5 cs-fade-up">
								<span class="text-[10px] font-mono tracking-[0.3em] text-neutral-300 uppercase">02</span>
								<div class="h-px flex-1 bg-neutral-200"></div>
							</div>
							<h2 class="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-[0.9] cs-fade-up">Design<br/>Decisions</h2>
						</div>
					</div>

					<div class="flex-1 min-w-0 pt-2 md:pt-0">
						<p class="text-[clamp(1.4rem,3vw,2.1rem)] font-black text-neutral-900 leading-[1.15] tracking-tight mb-10 cs-fade-up">
							"Traced every drop-off back to its cause.<br/>
							<span class="text-neutral-300">Then built against each one."</span>
						</p>

						<!-- Decision log — 2-column table -->
						<div class="mb-10 cs-fade-up">
							<div class="grid grid-cols-[1fr_1fr] border border-neutral-200 rounded-2xl overflow-hidden">
								<div class="px-5 py-3 border-b border-neutral-200 bg-neutral-50 flex items-center gap-2">
									<div class="w-1.5 h-1.5 rounded-full bg-red-400"></div>
									<span class="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">Was</span>
								</div>
								<div class="px-5 py-3 border-b border-l border-neutral-200 bg-neutral-50 flex items-center gap-2">
									<div class="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
									<span class="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">Now</span>
								</div>
								{#each [
									{ was: 'No onboarding context',         now: 'Value-first onboarding — rebuilt from scratch' },
									{ was: 'No seek controls on player',    now: '−10s / +15s rewind & skip controls' },
									{ was: 'Uniform preview for all tours', now: 'Gated states — bought vs. un-bought are distinct' },
									{ was: 'Empty profile section',         now: 'Purchase history, tours done, reviews left' },
									{ was: 'No map',                        now: 'Interactive 3D map with live tour position' },
									{ was: 'No transcript',                 now: 'Transcript as a native feature (new)' },
									{ was: 'Single-language only',          now: 'Language switching — multi-region ready' },
									{ was: 'Flat FAQ section',              now: 'Redesigned FAQ + support flow' },
								] as row, i}
									<div class="px-5 py-3.5 {i > 0 ? 'border-t' : ''} border-neutral-200 text-sm text-neutral-500 leading-snug">{row.was}</div>
									<div class="px-5 py-3.5 {i > 0 ? 'border-t' : ''} border-l border-neutral-200 text-sm font-semibold text-neutral-900 leading-snug">{row.now}</div>
								{/each}
							</div>
						</div>

						<!-- Design system token grid -->
						<div class="grid grid-cols-2 gap-4 cs-fade-up">
							{#each [
								{ src: '/videos/Eclectic/Color tokens with accessibility.webp', label: 'Color Tokens' },
								{ src: '/videos/Eclectic/Typography.webp',                      label: 'Typography Scale' },
								{ src: '/videos/Eclectic/Breakpoints.webp',                     label: 'Breakpoints' },
								{ src: '/videos/Eclectic/Radius.webp',                          label: 'Radius Tokens' },
							] as token}
								<CsImageCard
									src={token.src}
									label={token.label}
									caption="Design system — {token.label}"
									aspect="aspect-video"
									theme="light"
									rounded="rounded-xl"
									onOpen={openModal}
								/>
							{/each}
						</div>
					</div>
				</div>

				<!-- ── 03 SOLUTION ────────────────────────────────────────── -->
				<div class="flex flex-col md:flex-row gap-12 md:gap-20">
					<div class="md:w-[260px] shrink-0">
						<div class="sticky top-32">
							<div class="flex items-center gap-3 mb-5 cs-fade-up">
								<span class="text-[10px] font-mono tracking-[0.3em] text-neutral-300 uppercase">03</span>
								<div class="h-px flex-1 bg-neutral-200"></div>
							</div>
							<h2 class="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-[0.9] cs-fade-up">What<br/>Shipped</h2>
						</div>
					</div>

					<div class="flex-1 min-w-0 pt-2 md:pt-0">
						<p class="text-[clamp(1.4rem,3vw,2.1rem)] font-black text-neutral-900 leading-[1.15] tracking-tight mb-10 cs-fade-up">
							"Everything missing: built.<br/>
							<span class="text-neutral-300">Everything broken: fixed."</span>
						</p>

						<!-- Feature status chips -->
						<div class="flex flex-wrap gap-2 mb-10 cs-fade-up">
							{#each [
								{ label: 'New Onboarding',      status: 'rebuilt',  color: 'bg-blue-50 border-blue-200 text-blue-700' },
								{ label: 'Transcript',          status: 'new',      color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
								{ label: '−10s / +15s Player',  status: 'new',      color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
								{ label: '3D Live Map',         status: 'new',      color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
								{ label: 'Gated Preview States',status: 'rebuilt',  color: 'bg-blue-50 border-blue-200 text-blue-700' },
								{ label: 'Profile + History',   status: 'rebuilt',  color: 'bg-blue-50 border-blue-200 text-blue-700' },
								{ label: 'Language Switching',  status: 'new',      color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
								{ label: 'FAQ & Support',       status: 'rebuilt',  color: 'bg-blue-50 border-blue-200 text-blue-700' },
							] as chip}
								<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold {chip.color}">
									<span class="uppercase text-[8px] font-mono tracking-widest opacity-60">{chip.status}</span>
									{chip.label}
								</span>
							{/each}
						</div>

						<!-- New UI screenshots side by side -->
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4 cs-fade-up">
							{#each [
								{ src: '/videos/Eclectic/New Walkthrough.webp',  label: 'New Onboarding', caption: 'Redesigned onboarding walkthrough' },
								{ src: '/videos/Eclectic/Switch language.webp',  label: 'Language Switch', caption: 'Multi-region language switching' },
							] as screen}
								<CsImageCard
									src={screen.src}
									label={screen.label}
									caption={screen.caption}
									labelVariant="success"
									aspect="h-64 md:h-80"
									theme="light"
									rounded="rounded-2xl"
									onOpen={openModal}
								/>
							{/each}
						</div>
					</div>
				</div>

			</div>
		</section>
	</div>

	<!-- ═══════════════════════════════════════════════
	     STAGE 4: FEATURE SHOWCASE (light)
	     ═══════════════════════════════════════════════ -->
	<section data-theme="light" class="bg-[#f5f5f7] px-6 py-24">
		<div class="max-w-7xl mx-auto">

			<div class="mb-12 cs-fade-up">
				<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-400 uppercase mb-3 block">05 — Feature Highlights</span>
				<h2 class="text-3xl md:text-4xl font-black tracking-tight text-neutral-900">Key flows &amp; interactions</h2>
			</div>

			<!-- 3-col grid of remaining phone screens -->
			<div class="grid grid-cols-2 md:grid-cols-3 gap-4 cs-grid-stagger">
				{#each [
					{ src: '/videos/Eclectic/Tours when u dont buy, right one when u buy the play is there.webp', label: 'Tour States', caption: 'Tour states — pre and post purchase' },
					{ src: '/videos/Eclectic/Preview of transcript in the live .webp',                           label: 'Live Transcript', caption: 'Transcript preview in live session' },
					{ src: '/videos/Eclectic/User dropping feedback.webp',                                       label: 'User Feedback', caption: 'User feedback drop flow' },
					{ src: '/videos/Eclectic/FAQ and support.webp',                                             label: 'FAQ & Support', caption: 'FAQ and support screen' },
					{ src: '/videos/Eclectic/effect.webp',                                                      label: 'Motion Details', caption: 'Motion and effect details' },
					{ src: '/videos/Eclectic/New Sign up and sign in process.webp',                             label: 'Auth Flow', caption: 'Sign-up and sign-in redesigned flow' },
				] as screen}
					<CsImageCard
						src={screen.src}
						label={screen.label}
						caption={screen.caption}
						theme="light"
						rounded="rounded-2xl"
						onOpen={openModal}
					/>
				{/each}
			</div>

		</div>
	</section>

	<!-- ═══════════════════════════════════════════════
	     STAGE 5: FIGMA FILE PREVIEW (dark)
	     ═══════════════════════════════════════════════ -->
	<section data-theme="dark" class="bg-black px-6 py-24">
		<div class="max-w-7xl mx-auto cs-fade-up">
			<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase block mb-6">06 — Figma File</span>
			<h2 class="text-3xl md:text-4xl font-black tracking-tight text-white mb-10">Design file walkthrough</h2>
			<div class="rounded-4xl overflow-hidden border border-white/5">
				<video
					src="/videos/Eclectic/Figma file preview.mp4"
					autoplay
					muted
					loop
					playsinline
					class="w-full"
				></video>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════
	     STAGE 6: VERDICT — Full Rebuild. Shipped.
	     ═══════════════════════════════════════════════ -->
	<section data-theme="dark" class="bg-black px-6 pb-32 pt-4">
		<div class="max-w-7xl mx-auto cs-fade-up">
			<div class="bg-neutral-950 rounded-bento overflow-hidden border border-white/5">
				<!-- Header band -->
				<div class="px-10 md:px-16 pt-12 pb-10 border-b border-white/5">
					<div class="flex items-center gap-3 mb-8">
						<span class="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase">04</span>
						<div class="h-px flex-1 bg-white/5"></div>
						<span class="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase">Outcome</span>
					</div>
					<h2 class="text-5xl md:text-7xl font-black tracking-tight text-white leading-[0.88] mb-0">Full&nbsp;Rebuild.<br/><span class="text-neutral-500">Shipped.</span></h2>
				</div>
				<!-- 3-col detail cards -->
				<div class="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
					<div class="p-8 md:p-10 flex flex-col">
						<div class="flex items-center gap-2 mb-5">
							<div class="w-1.5 h-1.5 rounded-full bg-portfolio-success shrink-0 animate-pulse"></div>
							<span class="text-[8px] font-mono tracking-[0.3em] text-portfolio-success/70 uppercase">Net-new</span>
						</div>
						<p class="text-2xl font-black text-white leading-snug mb-3">Transcript &amp;<br/>Live Map.</p>
						<p class="text-sm text-neutral-500 leading-relaxed flex-1">Two features that didn't exist in the product. Transcript gives users a second mode to engage with tour audio. The interactive 3D map puts their live position on the route — essential for a product built around navigating cities on foot.</p>
					</div>
					<div class="p-8 md:p-10 flex flex-col">
						<div class="flex items-center gap-2 mb-5">
							<div class="w-1.5 h-1.5 rounded-full bg-portfolio-accent shrink-0 animate-pulse"></div>
							<span class="text-[8px] font-mono tracking-[0.3em] text-portfolio-accent/70 uppercase">Rebuilt</span>
						</div>
						<p class="text-2xl font-black text-white leading-snug mb-3">Onboarding<br/>from scratch.</p>
						<p class="text-sm text-neutral-500 leading-relaxed flex-1">The old flow dropped users straight into the app. The new onboarding surfaces the product value before asking for a purchase — showing previews, tour highlights, and the gated experience users unlock on buy.</p>
					</div>
					<div class="p-8 md:p-10 flex flex-col">
						<div class="flex items-center gap-2 mb-5">
							<div class="w-1.5 h-1.5 rounded-full bg-neutral-500 shrink-0"></div>
							<span class="text-[8px] font-mono tracking-[0.3em] text-neutral-500 uppercase">Redesigned</span>
						</div>
						<p class="text-2xl font-black text-white leading-snug mb-3">Player · Profile<br/>· Language.</p>
						<p class="text-sm text-neutral-500 leading-relaxed flex-1">Player gained −10s / +15s seek controls. Profile was rebuilt to surface purchase history, tours completed, and dropped reviews. Language switching was added for simultaneous deployment across 3 regional markets.</p>
					</div>
				</div>
			</div>
		</div>
	</section>

</div>

<ExploreProjectComponent currentSlug="eclectic-app-design" />

