<script lang="ts">
	import type { PageData } from './$types';
	import { onMount, onDestroy } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { navTheme } from '$lib/stores/navTheme';

	import CaseStudyHero from '$lib/components/case-study/CaseStudyHero.svelte';
	import CaseStudyBento from '$lib/components/CaseStudyBento.svelte';

	// Ch 01 — Atomic Library
	import AtomicLibraryShowcase from '$lib/components/case-study/CaseStudyShowcaseDraft.svelte';
	// Ch 02 — Smush
	import SmushShowcase from '$lib/components/case-study/SmushShowcase.svelte';
	// Ch 03 — Hummingbird
	import HummingbirdShowcase from '$lib/components/case-study/HummingbirdShowcase.svelte';
	// Ch 04 — Snapshot
	import SnapshotShowcase from '$lib/components/case-study/SnapshotShowcase.svelte';
	// Shared transition card
	import PluginTransition from '$lib/components/case-study/PluginTransition.svelte';
	// Plugin icons for transitions
	import wpmuLogoSvg from '$lib/assets/wpmu-logo-icon.svg?raw';
	import smushIconSvg from '$lib/assets/smush-icon.svg?raw';
	import hummingbirdIconSvg from '$lib/assets/hummingbird-icon.svg?raw';
	import snapshotIconSvg from '$lib/assets/snapshot-icon.svg?raw';
	import ExploreProjectComponent from '$lib/components/ExploreProjectComponent.svelte';

	let { data }: { data: PageData } = $props();
	let project = $derived(data.project);

	let bentoTriggerEl: HTMLElement;
	let editorialTriggerEl: HTMLElement;
	let ctx: gsap.Context;

	onMount(() => {
		navTheme.set('light'); // hero is white — lock navbar to light immediately
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
			});
		}, 400);

		return () => clearTimeout(t);
	});

	onDestroy(() => {
		navTheme.set(null); // hand theme control back to IntersectionObserver on other pages
		if (typeof document !== 'undefined') document.body.style.backgroundColor = '';
		if (ctx) ctx.revert();
	});
</script>

<svelte:head>
	<title>{project.title} | Hitanshu Sahu</title>
</svelte:head>

<div class="min-h-screen bg-white text-neutral-900">

	<!-- STAGE 1: LIGHT HERO -->
	<div data-theme="light">
		<CaseStudyHero
			title={project.title}
			description={project.description}
			role={project.role}
			tags={project.tags}
		/>
	</div>

	<!-- STAGE 2: DARK BENTO -->
	<div bind:this={bentoTriggerEl} data-theme="dark">
		<CaseStudyBento
			narrative={{
				heading: 'A <span class="text-shimmer-white">full redesign</span> of the optimization flow — built for clarity, speed, and confidence at scale.',
				role: 'Product Designer',
				product: 'Smush, Hummingbird, Snapshot & SUI 3 Atomic Design',
			}}
			anchor={{
				videoSrc: '/videos/Smush%20with%20Userflow.mp4',
				logoSvg: wpmuLogoSvg,
				brandName: 'WPMU DEV',
				brandSub: 'Dashboard • System',
			}}
			adoption={{
				label: 'Adoption',
				from: '1M',
				to: '2M',
				description: 'Smush installs since the redesigned onboarding shipped.',
			}}
			metric1={{
				stat: '-37%',
				label: 'Bounce Rate',
				context: 'Post-Launch',
			}}
			metric2={{
				number: '80',
				unit: '%',
				label: 'Performance',
				description: 'Page rendering boost via Hummingbird.',
			}}
			conversion={{
				label: 'Pro Conversions',
				description: 'Significant uplift in premium upgrades from the free tier.',
				chip: '+47%',
			}}
		/>
	</div>

	<!-- STAGE 3: LIGHT EDITORIAL — 4 chapters + 3 transitions -->
	<div bind:this={editorialTriggerEl} data-theme="light">

		<!-- Chapter 01 — Atomic Library -->
		<AtomicLibraryShowcase />

		<PluginTransition
			prevNum="01" prevName="Atomic Library" prevIconSvg={wpmuLogoSvg}
			nextNum="02" nextName="Smush" nextIconSvg={smushIconSvg}
			nextDescriptor="Image optimization — Ultra, Lossy, and Lossless compression at scale."
			nextShadow="drop-shadow(0 12px 28px rgba(0,215,255,0.28)) drop-shadow(0 2px 6px rgba(0,0,0,0.08))"
			stats={[
				{ label: 'Active Installs', value: '1M <span class="text-white text-glow-accent">→</span> 2M+', html: true },
				{ label: 'Bounce Rate', value: '−37%', accent: true },
				{ label: 'Ultra vs Lossy', value: '5×' }
			]}
		/>

		<!-- Chapter 02 — Smush -->
		<SmushShowcase />

		<PluginTransition
			prevNum="02" prevName="Smush" prevIconSvg={smushIconSvg}
			nextNum="03" nextName="Hummingbird" nextIconSvg={hummingbirdIconSvg}
			nextDescriptor="Speed & performance optimization — Critical CSS, JS Defer, and Asset compression."
			nextShadow="drop-shadow(0 12px 28px rgba(255,142,60,0.35)) drop-shadow(0 2px 6px rgba(0,0,0,0.10))"
			stats={[
				{ label: 'Page Load', value: '5s <span class="text-white text-glow-accent">→</span> &lt;1s', html: true },
				{ label: 'Performance Gain', value: '+75%', accent: true },
				{ label: 'Critical CSS', value: 'NEW' }
			]}
		/>

		<!-- Chapter 03 — Hummingbird -->
		<HummingbirdShowcase />

		<PluginTransition
			prevNum="03" prevName="Hummingbird" prevIconSvg={hummingbirdIconSvg}
			nextNum="04" nextName="Snapshot" nextIconSvg={snapshotIconSvg}
			nextDescriptor="Backup & restore — Scheduled backups, selective restore, and cloud storage."
			nextShadow="drop-shadow(0 12px 28px rgba(26,50,94,0.35)) drop-shadow(0 2px 6px rgba(0,0,0,0.10))"
			stats={[
				{ label: 'Backup Success', value: '99%', accent: true },
				{ label: 'Restore', value: '1-click' },
				{ label: 'Selective', value: 'DB or Files' }
			]}
		/>

		<!-- Chapter 04 — Snapshot -->
		<SnapshotShowcase />

		<!-- ── Closing: Contribution + Retrospect ────────────────────────── -->
		<section class="bg-[#0a0a0c] px-6 py-24 md:py-32 border-t border-white/5">
			<div class="max-w-7xl mx-auto">

				<div class="flex items-center gap-4 mb-16">
					<span class="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase">Closing</span>
					<div class="h-px bg-white/5 w-24"></div>
				</div>

				<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

					<!-- What I Owned -->
					<div>
						<h2 class="text-3xl md:text-4xl font-black text-white tracking-tight mb-10 leading-tight">What I Owned.</h2>
						<div class="space-y-5">
							{#each [
								{ scope: 'End-to-End',       label: 'SUI 3 Atomic Design System',  detail: 'Token architecture, component library, monochrome mode for white-label use. Every plugin in the suite was built on this foundation.' },
								{ scope: 'End-to-End',       label: 'Smush Compression Flow',       detail: 'Reduced the core flow from 7 steps to 4. Led every Maze test and synthesised findings into the shipped design.' },
								{ scope: 'End-to-End',       label: 'Snapshot Restore UX',          detail: 'Scoped selection redesign (DB · Files · Both) — eliminated the top support ticket category within the first quarter post-launch.' },
								{ scope: 'Visual Direction', label: 'Hummingbird Onboarding',       detail: 'Led Figma system and interaction design. Product defined the performance metric triggers and threshold logic.' },
								{ scope: 'Audited',          label: 'SmartCrawl & Beehive',         detail: 'Mapped to SUI 3 tokens and audited for inconsistencies. Full redesign scoped for a subsequent phase beyond my tenure.' },
							] as item}
								<div class="flex gap-5 border-b border-white/5 pb-5 last:border-0">
									<span class="text-[9px] font-mono tracking-[0.18em] text-neutral-600 uppercase shrink-0 w-26 pt-0.5">{item.scope}</span>
									<div>
										<p class="text-[15px] font-bold text-white leading-snug mb-1">{item.label}</p>
										<p class="text-sm text-neutral-500 leading-relaxed">{item.detail}</p>
									</div>
								</div>
							{/each}
						</div>
					</div>

					<!-- What I'd Do Differently -->
					<div>
						<h2 class="text-3xl md:text-4xl font-black text-white tracking-tight mb-10 leading-tight">What I'd Do Differently.</h2>
						<div class="space-y-8">
							<div class="pl-6" style="border-left: 2px solid rgba(255,255,255,0.08);">
								<p class="text-[10px] font-mono tracking-[0.25em] text-neutral-500 uppercase mb-3">Snapshot Restore Modal</p>
								<p class="text-neutral-400 text-[15px] leading-relaxed">I'd have run a second Maze test before shipping. The first round showed clear improvement — but users were still over-reading the "Selective Restore" options before committing. A follow-up test would have told me whether the bottleneck was copy or information architecture. I shipped the first iteration and moved on to Hummingbird. That's the call I'd revisit.</p>
							</div>
							<div class="pl-6" style="border-left: 2px solid rgba(255,255,255,0.08);">
								<p class="text-[10px] font-mono tracking-[0.25em] text-neutral-500 uppercase mb-3">Token Governance</p>
								<p class="text-neutral-400 text-[15px] leading-relaxed">SUI 3 scaled across six plugins with no formal deprecation protocol. Old alias tokens persisted in legacy components longer than they should — visible in the visual gap between fully updated and partially updated plugin screens. A token governance doc from day one would have prevented that drift.</p>
							</div>
						</div>
					</div>

				</div>
			</div>
		</section>

	</div>


</div>

<ExploreProjectComponent currentSlug="wpmu-dev-dashboard" />

