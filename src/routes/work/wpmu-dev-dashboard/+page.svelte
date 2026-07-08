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

	let pageWrapperEl: HTMLElement;
	let bentoTriggerEl: HTMLElement;
	let editorialTriggerEl: HTMLElement;
	let ctx: gsap.Context;

	onMount(() => {
		navTheme.set('light'); // hero is white — lock navbar to light immediately
		document.body.style.backgroundColor = '#ffffff';
		gsap.registerPlugin(ScrollTrigger);

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const t = setTimeout(() => {
			ctx = gsap.context(() => {
				// Stage 1 → Stage 2: white → black
				gsap.to(pageWrapperEl, {
					backgroundColor: '#000000',
					color: '#ffffff',
					ease: 'none',
					duration: reducedMotion ? 0 : undefined,
					scrollTrigger: {
						trigger: bentoTriggerEl,
						start: 'top 90%',
						end: reducedMotion ? 'top 90%' : 'top 60%',
						scrub: true,
						onEnter: () => navTheme.set('dark'),
						onLeaveBack: () => navTheme.set('light')
					}
				});

				// Stage 2 → Stage 3: black → white
				gsap.to(pageWrapperEl, {
					backgroundColor: '#ffffff',
					color: '#171717',
					ease: 'none',
					immediateRender: false,
					duration: reducedMotion ? 0 : undefined,
					scrollTrigger: {
						trigger: editorialTriggerEl,
						start: 'top 90%',
						end: reducedMotion ? 'top 90%' : 'top 60%',
						scrub: true,
						onEnter: () => navTheme.set('light'),
						onLeaveBack: () => navTheme.set('dark')
					}
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

<div bind:this={pageWrapperEl} class="min-h-screen bg-white text-neutral-900" style="background-color: #ffffff;">

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

	</div>


</div>

<ExploreProjectComponent currentSlug="wpmu-dev-dashboard" />

