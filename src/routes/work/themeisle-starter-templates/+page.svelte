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
	let museumTriggerEl: HTMLElement;
	let gridTriggerEl: HTMLElement;
	let variantsTriggerEl: HTMLElement;
	let editorialTriggerEl: HTMLElement;
	let ctx: gsap.Context;

	let modalImg = $state<{ src: string; alt: string } | null>(null);
	function openModal(src: string, alt: string) { modalImg = { src, alt }; }

	let museumView = $state(0);
	let museumPlaying = $state(true);
	let _museumInterval: ReturnType<typeof setInterval> | undefined;

	function selectMuseumView(i: number) {
		museumView = i;
		museumPlaying = false;
		clearInterval(_museumInterval);
	}

	const T = '/videos/Themeisle/';

	const museumViews = [
		{ src: T + 'Neve%20Museum%20-%20figma.png', label: 'Figma Source' },
		{ src: T + 'Neve%20Museum%20.png',           label: 'View 1' },
		{ src: T + 'Neve%20Museum%202.png',          label: 'View 2' },
		{ src: T + 'Neve%20Museum%203.png',          label: 'View 3' },
	];

	const industryGrid = [
		{ src: T + 'Law%20firm.png', label: 'Law Firm' },
		{ src: T + 'IT%20firm.png', label: 'IT Firm' },
		{ src: T + 'Tech%20firm.png', label: 'Tech Firm' },
		{ src: T + 'Industrial%20heavy%20duty%20.png', label: 'Industrial' },
		{ src: T + 'Coffee.png', label: 'Coffee Shop' },
		{ src: T + 'Neve%20Wine.png', label: 'Wine Bar' },
		{ src: T + 'Resort.png', label: 'Resort' },
		{ src: T + 'Barber%20shop.png', label: 'Barber Shop' },
		{ src: T + 'Neve%20Church.png', label: 'Church' },
		{ src: T + 'Wedding%20.png', label: 'Wedding' },
		{ src: T + 'Tatto.png', label: 'Tattoo Studio' },
		{ src: T + 'Interior%20design%20.png', label: 'Interior Design' },
		{ src: T + 'Conference.png', label: 'Conference' },
		{ src: T + 'Coupon%20site.png', label: 'Coupon Site' },
		{ src: T + 'Furniture.png', label: 'Furniture' },
		{ src: T + 'Neve%20Insurance.png', label: 'Insurance' },
		{ src: T + 'Car%20rental.png', label: 'Car Rental' },
		{ src: T + 'Transport.png', label: 'Transport' },
		{ src: T + 'Farm.png', label: 'Farm & Agriculture' },
		{ src: T + 'Neve%20Cycle%20racing.png', label: 'Cycle Racing' },
	];

	onMount(() => {
		navTheme.set('light');
		document.body.style.backgroundColor = '#ffffff';
		gsap.registerPlugin(ScrollTrigger);
		ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });

		const t = setTimeout(() => {
			ctx = gsap.context(() => {
				gsap.to(pageWrapperEl, {
					backgroundColor: '#000000', color: '#ffffff', ease: 'none',
					scrollTrigger: {
						trigger: bentoTriggerEl, start: 'top 85%', end: 'top 40%', scrub: 1.2,
						onEnter: () => navTheme.set('dark'),
						onLeaveBack: () => navTheme.set('light'),
					}
				});
				gsap.to(pageWrapperEl, {
					backgroundColor: '#ffffff', color: '#171717', ease: 'none', immediateRender: false,
					scrollTrigger: {
						trigger: editorialTriggerEl, start: 'top 85%', end: 'top 40%', scrub: 1.2,
						onEnter: () => navTheme.set('light'),
						onLeaveBack: () => navTheme.set('dark'),
					}
				});
				ScrollTrigger.create({
					trigger: museumTriggerEl, start: 'top 70%',
					onEnter: () => navTheme.set('light'),
					onLeaveBack: () => navTheme.set('dark'),
				});
				ScrollTrigger.create({
					trigger: gridTriggerEl, start: 'top 70%',
					onEnter: () => navTheme.set('dark'),
					onLeaveBack: () => navTheme.set('light'),
				});
				ScrollTrigger.create({
					trigger: variantsTriggerEl, start: 'top 70%',
					onEnter: () => navTheme.set('light'),
					onLeaveBack: () => navTheme.set('dark'),
				});

				gsap.from('.cs-hero-element', { y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' });
				gsap.utils.toArray('.cs-fade-up').forEach((el: any) => {
					gsap.from(el, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
						scrollTrigger: { trigger: el, start: 'top 85%' }
					});
				});
			});
		}, 400);

		_museumInterval = setInterval(() => {
			if (museumPlaying) museumView = (museumView + 1) % museumViews.length;
		}, 2800);

		return () => clearTimeout(t);
	});

	onDestroy(() => {
		navTheme.set(null);
		if (typeof document !== 'undefined') document.body.style.backgroundColor = '';
		if (ctx) ctx.revert();
		clearInterval(_museumInterval);
	});
</script>

<svelte:head>
	<title>Neve Starter Templates | Hitanshu Sahu</title>
</svelte:head>

<LightboxModal bind:modalImg />

<div bind:this={pageWrapperEl} class="min-h-screen bg-white text-neutral-900" style="background-color: #ffffff; will-change: background-color; transform: translateZ(0);">

	<!-- ── HERO ──────────────────────────────────────────────────────────────── -->
	<section data-theme="light" class="w-full bg-white px-6 pt-[160px] md:pt-[180px] pb-28 min-h-screen flex flex-col justify-center">
		<div class="max-w-7xl mx-auto w-full">

			<div class="flex items-center justify-between border-b border-neutral-200 pb-5 mb-12 cs-hero-element">
				<div class="relative inline-flex overflow-hidden rounded-full p-[1.5px] shadow-sm bg-neutral-200">
					<div class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,rgba(0,0,0,0.75)_360deg)]"></div>
					<div class="inline-flex h-full w-full items-center justify-center rounded-full bg-white px-6 py-2 relative z-10">
						<span class="text-[11px] font-mono tracking-widest text-neutral-500 uppercase">Client Work — WordPress Starter Templates</span>
					</div>
				</div>
				<span class="text-[11px] font-mono tracking-widest text-neutral-400 uppercase hidden sm:block">Jul 2018 — May 2021</span>
			</div>

			<div class="flex items-start gap-10 cs-hero-element">
				<div class="flex-1 min-w-0">
					<p class="text-[11px] font-mono tracking-[0.35em] uppercase text-neutral-400 mb-5">Themeisle · Neve Theme</p>
					<h1 class="text-[clamp(3rem,8vw,7.5rem)] font-black tracking-tight leading-[0.9] text-neutral-900">
						Neve&nbsp;Theme<br/>
						<span class="text-neutral-300">Starter</span><br/>
						Templates.
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
						<span class="text-sm font-semibold text-neutral-800">WordPress / Neve Theme</span>
					</div>
					<div>
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Templates</span>
						<span class="text-sm font-semibold text-neutral-800">50+ Across 20+ Niches</span>
					</div>
					<div>
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Performance</span>
						<span class="text-sm font-semibold text-neutral-800">PageSpeed 100% · 0.6s · 28KB</span>
					</div>
					<div class="pt-5 border-t border-neutral-100">
						<div class="flex items-center gap-2" style="color: #4EA361;">
							<span class="text-[9px] font-mono tracking-widest uppercase">Scroll to explore</span>
							<svg class="w-3.5 h-3.5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
							</svg>
						</div>
					</div>
				</div>
			</div>

			<div class="grid grid-cols-3 border-t border-b border-neutral-200 mt-12 cs-hero-element">
				<div class="py-7 pr-4 md:pr-8 border-r border-neutral-200">
					<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">Templates Delivered</span>
					<div class="flex items-baseline gap-1.5 leading-none flex-wrap">
						<span class="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">50+</span>
					</div>
					<span class="text-[9px] text-neutral-400 font-mono block mt-1">across 20+ industry niches</span>
				</div>
				<div class="py-7 px-3 md:px-8 border-r border-neutral-200">
					<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">PageSpeed Score</span>
					<div class="flex items-baseline gap-1 leading-none flex-wrap">
						<span class="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">100%</span>
					</div>
					<span class="text-[9px] text-neutral-400 font-mono block mt-1">0.6s load · 28KB base theme</span>
				</div>
				<div class="py-7 pl-3 md:pl-8">
					<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">Neve Installs</span>
					<div class="flex items-baseline gap-1 leading-none flex-wrap">
						<span class="text-xl md:text-2xl font-black tracking-tight" style="color: #4EA361;">200K+</span>
					</div>
					<span class="text-[9px] text-neutral-400 font-mono block mt-1">active installations</span>
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10 cs-hero-element">
				<div class="md:col-span-2">
					<p class="text-xl md:text-2xl text-neutral-500 leading-relaxed">{project.description}</p>
				</div>
				<div class="flex flex-col gap-4 pt-1">
					<p class="text-sm text-neutral-400 leading-relaxed">Each template was built to a specific niche brief — not resized or recolored from a master layout, but designed from scratch for that industry's visual language and conversion goals.</p>
				</div>
			</div>

		</div>
	</section>

	<!-- ── DARK: FIGMA CANVAS + BENTO ───────────────────────────────────────── -->
	<div bind:this={bentoTriggerEl} data-theme="dark">

		<section class="bg-black px-6 pt-24 pb-12">
			<div class="max-w-7xl mx-auto cs-fade-up">
				<div class="mb-8">
					<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase">The Starting Point</span>
					<h2 class="text-3xl font-black tracking-tight text-white mt-3 leading-[1.05]">Every template<br/>starts here.</h2>
				</div>
				<div class="rounded-3xl overflow-hidden border border-white/5">
					<button type="button" class="img-trigger w-full" onclick={() => openModal(T + 'Figma%20preview%20-%20drafts.png', 'Figma — All Template Drafts')} aria-label="View Figma drafts overview">
						<img src={T + 'Figma%20preview%20-%20drafts.png'} alt="Figma workspace showing all starter template drafts" class="w-full block" loading="lazy" />
						<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
						<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
					</button>
				</div>
				<p class="text-xs text-neutral-600 font-mono mt-4 pl-1">50+ templates in one Figma file — each niche designed independently, not copied and recolored.</p>
			</div>
		</section>

		<section class="bg-black py-16 px-6 pb-24">
			<div class="max-w-7xl mx-auto">

				<div class="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
					<div class="lg:col-span-8 sp-wrap rounded-4xl cs-fade-up">
						<div class="sp-spin-accent"></div>
						<div class="sp-inner bg-neutral-950 rounded-4xl p-10 lg:p-14 border border-white/5 flex flex-col justify-between">
							<p class="text-[11px] font-mono tracking-widest text-neutral-500 uppercase mb-8">{project.role} · WordPress · Gutenberg · Elementor · Brizy</p>
							<h2 class="text-3xl lg:text-5xl font-black tracking-tight text-white leading-[1.05]">
								Designed 50+ starter templates that lowered Neve's activation barrier — contributing to <span style="color: #4EA361;">200,000+ active installations</span>.
							</h2>
						</div>
					</div>
					<div class="lg:col-span-4 sp-wrap rounded-4xl cs-fade-up">
						<div class="sp-spin-accent"></div>
						<div class="sp-inner bg-neutral-950 rounded-4xl p-10 border border-white/5 flex flex-col justify-between">
							<div>
								<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-3">Client</span>
								<span class="text-4xl font-black tracking-tighter text-white">Themeisle</span>
							</div>
							<div class="space-y-3">
								<div>
									<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-1">Product</span>
									<span class="text-sm font-semibold text-neutral-300">Neve WordPress Theme</span>
								</div>
								<div>
									<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-1">Duration</span>
									<span class="text-sm font-semibold text-neutral-300">Jul 2018 — May 2021</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-5">
					<div class="sp-wrap rounded-4xl cs-fade-up">
						<div class="sp-spin"></div>
						<div class="sp-inner bg-neutral-950 rounded-4xl p-10 border border-white/5">
							<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-500 uppercase block mb-4">Templates Delivered</span>
							<div class="flex items-baseline gap-2 mb-3">
								<span class="text-5xl font-black tracking-tight text-white stat-glow-white">50+</span>
							</div>
							<p class="text-sm text-neutral-500 leading-relaxed">Spanning 20+ industry niches — from law firm to cycle racing. One-click import. Gutenberg, Elementor, and Brizy.</p>
						</div>
					</div>
					<div class="sp-wrap rounded-4xl cs-fade-up">
						<div class="sp-spin-green"></div>
						<div class="sp-inner bg-[#061a0f] rounded-4xl p-10 border border-portfolio-success/25">
							<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-500 uppercase block mb-4">Google PageSpeed</span>
							<div class="flex items-baseline gap-2 mb-3">
								<span class="text-5xl font-black tracking-tight text-portfolio-success stat-glow-green">100</span>
								<span class="text-xl font-black text-portfolio-success">%</span>
							</div>
							<p class="text-sm text-neutral-500 leading-relaxed">Neve default loads in 0.6s at 28KB. Every template validated to maintain that baseline before delivery.</p>
						</div>
					</div>
					<div class="sp-wrap rounded-4xl cs-fade-up">
						<div class="sp-spin"></div>
						<div class="sp-inner bg-neutral-950 rounded-4xl p-10 border border-white/5">
							<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-500 uppercase block mb-4">Neve Installs</span>
							<div class="flex items-baseline gap-2 mb-3">
								<span class="text-5xl font-black tracking-tight text-white" style="text-shadow: 0 0 24px rgba(78,163,97,0.9), 0 0 60px rgba(78,163,97,0.45);">200K+</span>
							</div>
							<p class="text-sm text-neutral-500 leading-relaxed">Templates became a primary activation tool, contributing to Neve crossing 200,000 active installations.</p>
						</div>
					</div>
				</div>

			</div>
		</section>

	</div>

	<!-- ── MUSEUM: ONE TEMPLATE, THREE VIEWS ────────────────────────────────── -->
	<div bind:this={museumTriggerEl}>
		<section class="bg-white px-6 py-24 border-t border-neutral-200">
			<div class="max-w-7xl mx-auto">

				<div class="cs-fade-up mb-14">
					<div class="flex items-center gap-4 mb-10">
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase">01</span>
						<div class="h-px flex-1 bg-neutral-200"></div>
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase">Process</span>
					</div>
					<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
						<h2 class="text-[34px] md:text-5xl font-black tracking-tight text-neutral-900 leading-[0.95]">One template.<br/>Multiple views.</h2>
						<p class="text-xl font-light text-neutral-500 leading-relaxed pt-2">The Museum template illustrates how each niche is built — from the Figma source file through to final layout. Click the tabs to step through each view. Every template started as an independent Figma file, not a reskin of a previous design.</p>
					</div>
				</div>

				<div class="cs-fade-up">
					<!-- Tab navigation -->
					<div class="flex items-center gap-2 mb-4 pl-1">
						{#each museumViews as view, i}
							<button
								type="button"
								onclick={() => selectMuseumView(i)}
								class="text-[9px] font-mono tracking-widest uppercase px-4 py-2 rounded-full border transition-all duration-200 {museumView === i ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-400 text-neutral-600 hover:border-neutral-800 hover:text-neutral-900 hover:bg-neutral-50'}"
							>
								{view.label}
							</button>
						{/each}
						<span class="text-[9px] font-mono text-neutral-500 ml-2 tabular-nums">{museumView + 1} / {museumViews.length}</span>
						{#if museumPlaying}
							<span class="text-[8px] font-mono text-neutral-300 tracking-widest uppercase ml-1">auto</span>
						{/if}
					</div>
					<!-- Carousel - only active slide in DOM, fade-in animation -->
					<div class="rounded-3xl overflow-hidden bg-neutral-100">
						{#each museumViews as view, i}
							{#if museumView === i}
								<div class="museum-slide-active">
									<button type="button" class="img-trigger w-full" onclick={() => openModal(view.src, 'Museum — ' + view.label)} aria-label={'Museum ' + view.label}>
										<img src={view.src} alt={'Museum template — ' + view.label} class="w-full block" loading="lazy" />
										<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
										<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
									</button>
								</div>
							{/if}
						{/each}
					</div>
				</div>

			</div>
		</section>
	</div>

	<!-- ── INDUSTRY GRID ─────────────────────────────────────────────────────── -->
	<div bind:this={gridTriggerEl}>
		<section class="px-6 py-24" style="background-color: #0a0a0a;">
			<div class="max-w-7xl mx-auto">

				<div class="cs-fade-up mb-14">
					<div class="flex items-center gap-4 mb-10">
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase">02</span>
						<div class="h-px flex-1 bg-white/5"></div>
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase">Scope</span>
					</div>
					<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
						<h2 class="text-[34px] md:text-5xl font-black tracking-tight text-white leading-[0.95]">50+ niches.<br/>One theme.</h2>
						<p class="text-xl font-light text-neutral-500 leading-relaxed pt-2">Each template designed for a specific industry — its visual language, its conversion goal, its audience. No shared starting point. Click any to expand.</p>
					</div>
				</div>

				<div class="grid grid-cols-2 md:grid-cols-4 gap-3 cs-fade-up">
					{#each industryGrid as img}
						<button type="button" class="ts-grid-card" onclick={() => openModal(img.src, img.label)} aria-label={'View ' + img.label + ' template'}>
							<img src={img.src} alt={img.label + ' starter template'} loading="lazy" class="w-full h-full object-cover object-top" />
							<div class="ts-grid-overlay">
								<span class="ts-grid-label">{img.label}</span>
							</div>
						</button>
					{/each}
				</div>

			</div>
		</section>
	</div>

	<!-- ── VARIANT PAIRS ─────────────────────────────────────────────────────── -->
	<div bind:this={variantsTriggerEl}>
		<section class="bg-white px-6 py-24 border-t border-neutral-200">
			<div class="max-w-7xl mx-auto">

				<div class="cs-fade-up mb-14">
					<div class="flex items-center gap-4 mb-10">
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase">03</span>
						<div class="h-px flex-1 bg-neutral-200"></div>
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase">Detail</span>
					</div>
					<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
						<h2 class="text-[34px] md:text-5xl font-black tracking-tight text-neutral-900 leading-[0.95]">The depth behind<br/>the thumbnail.</h2>
						<p class="text-xl font-light text-neutral-500 leading-relaxed pt-2">Selected multi-view and Figma process shots — showing that each niche goes beyond a single hero screenshot.</p>
					</div>
				</div>

				<!-- Wine: design + figma -->
				<div class="mb-12 cs-fade-up">
					<p class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase mb-4">Wine & Hospitality — Design + Figma Process</p>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						{#each [
							{ src: T + 'Wine.png', alt: 'Wine template — final design' },
							{ src: T + 'Neve%20Wine%20-%20figma.png', alt: 'Wine template — Figma process file' },
						] as img}
							<div class="rounded-2xl overflow-hidden bg-neutral-100">
								<button type="button" class="img-trigger w-full" onclick={() => openModal(img.src, img.alt)} aria-label={img.alt}>
									<img src={img.src} alt={img.alt} loading="lazy" class="w-full block object-cover object-top" style="max-height: 520px;" />
									<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
									<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
								</button>
							</div>
						{/each}
					</div>
				</div>

				<!-- Conference trio -->
				<div class="mb-12 cs-fade-up">
					<p class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase mb-4">Conference — Three Layout Views</p>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
						{#each [
							{ src: T + 'Conference.png', alt: 'Conference template' },
							{ src: T + 'confernce%202%20.png', alt: 'Conference template — variant 2' },
							{ src: T + 'Conference%20-%20full.png', alt: 'Conference template — full page' },
						] as img}
							<div class="rounded-2xl overflow-hidden bg-neutral-100">
								<button type="button" class="img-trigger w-full" onclick={() => openModal(img.src, img.alt)} aria-label={img.alt}>
									<img src={img.src} alt={img.alt} loading="lazy" class="w-full block object-cover object-top" style="max-height: 400px;" />
									<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
									<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
								</button>
							</div>
						{/each}
					</div>
				</div>

				<!-- IT Firm + Insurance side by side -->
				<div class="mb-12 cs-fade-up">
					<div class="grid grid-cols-1 md:grid-cols-2 gap-10">
						<div>
							<p class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase mb-4">IT Firm — Two Views</p>
							<div class="grid grid-cols-2 gap-3">
								{#each [
									{ src: T + 'IT%20firm.png', alt: 'IT Firm template' },
									{ src: T + 'IT%20Firm%202%20.png', alt: 'IT Firm template — view 2' },
								] as img}
									<div class="rounded-xl overflow-hidden bg-neutral-100">
										<button type="button" class="img-trigger w-full" onclick={() => openModal(img.src, img.alt)} aria-label={img.alt}>
											<img src={img.src} alt={img.alt} loading="lazy" class="w-full block object-cover object-top" style="max-height: 320px;" />
											<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
											<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View</span></div>
										</button>
									</div>
								{/each}
							</div>
						</div>
						<div>
							<p class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase mb-4">Insurance — Main + Closeup</p>
							<div class="grid grid-cols-2 gap-3">
								{#each [
									{ src: T + 'Neve%20Insurance.png', alt: 'Insurance template' },
									{ src: T + 'Insurance%20-%20closeup%20shot.png', alt: 'Insurance template — closeup' },
								] as img}
									<div class="rounded-xl overflow-hidden bg-neutral-100">
										<button type="button" class="img-trigger w-full" onclick={() => openModal(img.src, img.alt)} aria-label={img.alt}>
											<img src={img.src} alt={img.alt} loading="lazy" class="w-full block object-cover object-top" style="max-height: 320px;" />
											<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
											<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View</span></div>
										</button>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>

				<!-- Resume + Cycle Racing -->
				<div class="mb-14 cs-fade-up">
					<div class="grid grid-cols-1 md:grid-cols-2 gap-10">
						<div>
							<p class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase mb-4">Resume — Two Pages</p>
							<div class="grid grid-cols-2 gap-3">
								{#each [
									{ src: T + 'Resume%20.png', alt: 'Resume template — page 1' },
									{ src: T + 'Resume%202.png', alt: 'Resume template — page 2' },
								] as img}
									<div class="rounded-xl overflow-hidden bg-neutral-100">
										<button type="button" class="img-trigger w-full" onclick={() => openModal(img.src, img.alt)} aria-label={img.alt}>
											<img src={img.src} alt={img.alt} loading="lazy" class="w-full block object-cover object-top" style="max-height: 320px;" />
											<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
											<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View</span></div>
										</button>
									</div>
								{/each}
							</div>
						</div>
						<div>
							<p class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase mb-4">Cycle Racing — Overview + Pricing</p>
							<div class="grid grid-cols-2 gap-3">
								{#each [
									{ src: T + 'Neve%20Cycle%20racing.png', alt: 'Cycle Racing template' },
									{ src: T + 'Cycle%20racing%20-%20price.png', alt: 'Cycle Racing template — pricing section' },
								] as img}
									<div class="rounded-xl overflow-hidden bg-neutral-100">
										<button type="button" class="img-trigger w-full" onclick={() => openModal(img.src, img.alt)} aria-label={img.alt}>
											<img src={img.src} alt={img.alt} loading="lazy" class="w-full block object-cover object-top" style="max-height: 320px;" />
											<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
											<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View</span></div>
										</button>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>

				<!-- Neve Main Product site standalone -->
				<div class="cs-fade-up">
					<p class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase mb-4">The Theme Behind the Templates</p>
					<div class="rounded-3xl overflow-hidden bg-neutral-100">
						<button type="button" class="img-trigger w-full" onclick={() => openModal(T + 'Neve%20Main%20Product%20site.png', 'Neve — Main Product Site')} aria-label="View Neve main product site">
							<img src={T + 'Neve%20Main%20Product%20site.png'} alt="Neve theme — main product site" loading="lazy" class="w-full block" />
							<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
							<div class="img-preview-badge"><svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg><span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span></div>
						</button>
					</div>
					<p class="text-xs text-neutral-400 font-mono mt-3 pl-1">Neve — the WordPress theme the starter templates were built for. 200K+ active installations.</p>
				</div>

			</div>
		</section>
	</div>

	<!-- ── EDITORIAL ──────────────────────────────────────────────────────────── -->
	<div bind:this={editorialTriggerEl} data-theme="light">
		<section class="bg-white px-6 py-32">
			<div class="max-w-7xl mx-auto space-y-28">

				<!-- 01 Problem -->
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
							{ n: '~35', label: 'Templates when I joined', sub: 'Generic layouts, no niche depth' },
							{ n: '100+', label: 'Competing templates', sub: 'Astra & OceanWP had the head start' },
							{ n: '30s', label: 'Decision window', sub: 'Average activation threshold' },
						] as s}
							<div class="border border-neutral-200 rounded-2xl p-5">
								<span class="text-4xl font-black text-neutral-900 block leading-none mb-2">{s.n}</span>
								<span class="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block">{s.label}</span>
								<span class="text-xs text-neutral-400 mt-1 block">{s.sub}</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- 02 Process -->
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
							{ n: '01', title: 'Niche Research', desc: 'Surveyed 20+ industry verticals — identifying the visual patterns, conversion priorities, and content structure each industry expected from its website.' },
							{ n: '02', title: 'Figma Design', desc: 'Each template designed independently with its own palette, typography, and layout system. No template was a reskin of a previous design.' },
							{ n: '03', title: 'Build & Validate', desc: 'Exported to Neve, tested across Gutenberg, Elementor, and Brizy. Validated against Lighthouse 90+ threshold before every delivery.' },
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

				<!-- 03 Design -->
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
						<div class="grid grid-cols-[1fr_160px_200px] border-b border-neutral-200 bg-neutral-50 px-6 py-3">
							<span class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">Decision</span>
							<span class="text-[9px] font-mono tracking-widest text-[#C40E0B] uppercase">Before</span>
							<span class="text-[9px] font-mono tracking-widest uppercase" style="color: #4EA361;">After</span>
						</div>
						{#each [
							{ decision: 'Starter templates', before: '~35 generic', after: '50+ niche-specific' },
							{ decision: 'Niche coverage', before: 'None', after: '20+ industries' },
							{ decision: 'Builder support', before: 'Elementor only', after: 'Gutenberg · Elementor · Brizy · WooCommerce' },
							{ decision: 'Performance', before: 'Not validated', after: 'PageSpeed 100% · 0.6s load · 28KB' },
							{ decision: 'User setup time', before: 'Blank canvas', after: 'One-click import, same-day launch' },
						] as row}
							<div class="grid grid-cols-[1fr_160px_200px] border-b border-neutral-100 last:border-0 px-6 py-4 items-center">
								<span class="text-sm font-semibold text-neutral-700">{row.decision}</span>
								<span class="text-sm text-[#C40E0B] line-through">{row.before}</span>
								<span class="text-sm font-semibold" style="color: #4EA361;">{row.after}</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- 04 Outcome -->
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
									<span class="text-[8px] font-mono tracking-[0.3em] text-[#4EA361]/70 uppercase">The Impact</span>
								</div>
								<p class="text-2xl font-black text-white leading-snug mb-3">200,000 installations. Templates were the reason people chose Neve.</p>
								<p class="text-sm text-neutral-500 leading-relaxed flex-1">Neve crossed 200,000 active installs during the period the template library was live. Templates became the primary activation trigger — the reason a non-developer chose Neve over Astra or OceanWP was that the library covered their specific industry niche. A blank-canvas theme became a same-day launch platform.</p>
								<div class="mt-5 pt-5 border-t border-white/5 flex items-center gap-3">
									<span class="text-[10px] font-mono tracking-widest text-neutral-600 uppercase">Library today</span>
									<span class="text-[10px] font-mono tracking-widest text-neutral-500">—</span>
									<span class="text-sm font-black" style="color: #4EA361;">110+ templates</span>
									<span class="text-[10px] font-mono text-neutral-600">on the live site · built on the foundation shipped here</span>
								</div>
							</div>
							<div class="p-8 md:p-10 flex flex-col">
								<div class="flex items-center gap-2 mb-5">
									<div class="w-1.5 h-1.5 rounded-full bg-neutral-500 shrink-0"></div>
									<span class="text-[8px] font-mono tracking-[0.3em] text-neutral-500 uppercase">The Lesson</span>
								</div>
								<p class="text-2xl font-black text-white leading-snug mb-3">Designing at scale is a system problem, not a style problem.</p>
								<p class="text-sm text-neutral-500 leading-relaxed flex-1">The challenge wasn't designing one great template — it was building a process for producing 50+ consistently great templates across industries you've never designed for before. Niche research as a design input. Performance as a non-negotiable constraint. Every template tested before it shipped.</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Feature grid -->
				<div class="cs-fade-up">
					<div class="flex items-center gap-4 mb-10">
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase">Key Design Decisions</span>
						<div class="h-px flex-1 bg-neutral-200"></div>
					</div>
					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

						<!-- 1. Niche-First Design — rings ping outward -->
						<div class="feat-card border border-neutral-200 rounded-2xl p-6 hover:border-neutral-300 transition-colors">
							<div class="mb-5 w-6 h-6 text-neutral-900">
								<svg viewBox="0 0 24 24" fill="none" class="w-full h-full" aria-hidden="true">
									<circle cx="12" cy="12" r="2.5" fill="currentColor"/>
									<circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="1.5" class="fi-r1"/>
									<circle cx="12" cy="12" r="10.5" stroke="currentColor" stroke-width="1.5" class="fi-r2"/>
								</svg>
							</div>
							<p class="text-sm font-bold text-neutral-900 mb-2">Niche-First Design</p>
							<p class="text-sm text-neutral-500 leading-relaxed">Each template started with understanding the target industry — its visual language, conversion goals, and audience expectations.</p>
						</div>

						<!-- 2. Performance Constrained — bars pop with stagger -->
						<div class="feat-card border border-neutral-200 rounded-2xl p-6 hover:border-neutral-300 transition-colors">
							<div class="mb-5 w-6 h-6 text-neutral-900">
								<svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full" aria-hidden="true">
									<rect x="2"  y="15" width="5" height="7"  rx="1" class="fi-b1"/>
									<rect x="9"  y="9"  width="5" height="13" rx="1" class="fi-b2"/>
									<rect x="16" y="3"  width="5" height="19" rx="1" class="fi-b3"/>
								</svg>
							</div>
							<p class="text-sm font-bold text-neutral-900 mb-2">Performance Constrained</p>
							<p class="text-sm text-neutral-500 leading-relaxed">No template shipped without passing a Lighthouse 90+ threshold. Performance was a design constraint from the start, not an afterthought.</p>
						</div>

						<!-- 3. Builder-Agnostic — rows slide in with stagger -->
						<div class="feat-card border border-neutral-200 rounded-2xl p-6 hover:border-neutral-300 transition-colors">
							<div class="mb-5 w-6 h-6 text-neutral-900">
								<svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full" aria-hidden="true">
									<rect x="2" y="3"  width="20" height="5" rx="1.5" class="fi-c1"/>
									<rect x="2" y="10" width="20" height="5" rx="1.5" class="fi-c2"/>
									<rect x="2" y="17" width="20" height="5" rx="1.5" class="fi-c3"/>
								</svg>
							</div>
							<p class="text-sm font-bold text-neutral-900 mb-2">Builder-Agnostic</p>
							<p class="text-sm text-neutral-500 leading-relaxed">Three builder formats per template — Gutenberg, Elementor, and Brizy — from a single Figma source. One design, three exports.</p>
						</div>

						<!-- 4. One-Click Import — arrow bounces down -->
						<div class="feat-card border border-neutral-200 rounded-2xl p-6 hover:border-neutral-300 transition-colors">
							<div class="mb-5 w-6 h-6 text-neutral-900">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full" aria-hidden="true">
									<g class="fi-arrow-grp">
										<line x1="12" y1="3" x2="12" y2="14"/>
										<polyline points="8 10 12 14 16 10"/>
									</g>
									<line x1="4" y1="20" x2="20" y2="20" class="fi-tray"/>
								</svg>
							</div>
							<p class="text-sm font-bold text-neutral-900 mb-2">One-Click Import</p>
							<p class="text-sm text-neutral-500 leading-relaxed">Pre-configured with real content, real images, and a complete page structure. Users could launch the same day they installed Neve.</p>
						</div>

						<!-- 5. Unique Identity — half circle spins -->
						<div class="feat-card border border-neutral-200 rounded-2xl p-6 hover:border-neutral-300 transition-colors">
							<div class="mb-5 w-6 h-6 text-neutral-900">
								<svg viewBox="0 0 24 24" fill="none" class="w-full h-full" aria-hidden="true">
									<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/>
									<g class="fi-half-grp">
										<path d="M12 3 A9 9 0 0 1 12 21 Z" fill="currentColor"/>
									</g>
								</svg>
							</div>
							<p class="text-sm font-bold text-neutral-900 mb-2">Unique Identity</p>
							<p class="text-sm text-neutral-500 leading-relaxed">No two templates share the same color palette or layout pattern. Each niche got its own visual identity, not a reskin.</p>
						</div>

						<!-- 6. Scale System — frames expand outward -->
						<div class="feat-card border border-neutral-200 rounded-2xl p-6 hover:border-neutral-300 transition-colors">
							<div class="mb-5 w-6 h-6 text-neutral-900">
								<svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full" aria-hidden="true">
									<rect x="10" y="10" width="4"  height="4"  rx="0.5"/>
									<rect x="7"  y="7"  width="10" height="10" rx="1"   fill="none" stroke="currentColor" stroke-width="1.5" class="fi-frame2"/>
									<rect x="3"  y="3"  width="18" height="18" rx="2"   fill="none" stroke="currentColor" stroke-width="1.5" class="fi-frame3"/>
								</svg>
							</div>
							<p class="text-sm font-bold text-neutral-900 mb-2">Scale System</p>
							<p class="text-sm text-neutral-500 leading-relaxed">A repeatable process for producing consistently great templates across 20+ industries — from research brief to Lighthouse validation.</p>
						</div>

					</div>
				</div>

			</div>
		</section>
	</div>

</div>

<ExploreProjectComponent currentSlug="themeisle-starter-templates" />

<style>
	.sp-wrap { position: relative; padding: 1px; overflow: hidden; display: flex; flex-direction: column; }
	.sp-spin, .sp-spin-accent, .sp-spin-green {
		position: absolute; inset: -1000%;
		animation: spin 3s linear infinite; animation-play-state: paused;
		opacity: 0; transition: opacity 0.3s ease;
	}
	.sp-spin { background: conic-gradient(transparent 270deg, rgba(255,255,255,0.6) 360deg); }
	.sp-spin-accent { background: conic-gradient(transparent 270deg, rgba(78,163,97,0.7) 360deg); }
	.sp-spin-green { background: conic-gradient(transparent 270deg, rgba(29,185,84,0.6) 360deg); }
	.sp-inner { position: relative; flex: 1; overflow: hidden; }
	.sp-wrap:hover .sp-spin,
	.sp-wrap:hover .sp-spin-accent,
	.sp-wrap:hover .sp-spin-green { animation-play-state: running; opacity: 0.85; }
	@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

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

	/* ── Feature card motion icons ────────────────────────── */

	/* 1. Niche — rings ping outward */
	@keyframes ring-ping {
		0%   { transform: scale(1);    opacity: 1; }
		65%  { transform: scale(1.55); opacity: 0; }
		100% { transform: scale(1);    opacity: 1; }
	}
	.feat-card:hover .fi-r1 {
		animation: ring-ping 0.55s cubic-bezier(0.22,1,0.36,1) 0s both;
		transform-box: fill-box; transform-origin: center;
	}
	.feat-card:hover .fi-r2 {
		animation: ring-ping 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s both;
		transform-box: fill-box; transform-origin: center;
	}

	/* 2. Performance — bars pop up with spring stagger */
	@keyframes bar-pop {
		0%   { transform: translateY(0)    scaleY(1); }
		40%  { transform: translateY(-3px) scaleY(1.07); }
		70%  { transform: translateY(1px)  scaleY(0.97); }
		100% { transform: translateY(0)    scaleY(1); }
	}
	.fi-b1, .fi-b2, .fi-b3 { transform-box: fill-box; transform-origin: 50% 100%; }
	.feat-card:hover .fi-b1 { animation: bar-pop 0.45s cubic-bezier(0.34,1.56,0.64,1) 0s    both; }
	.feat-card:hover .fi-b2 { animation: bar-pop 0.45s cubic-bezier(0.34,1.56,0.64,1) 0.07s both; }
	.feat-card:hover .fi-b3 { animation: bar-pop 0.45s cubic-bezier(0.34,1.56,0.64,1) 0.14s both; }

	/* 3. Builder — rows slide in from left */
	@keyframes row-slide {
		from { transform: translateX(-5px); opacity: 0.4; }
		to   { transform: translateX(0);    opacity: 1; }
	}
	.feat-card:hover .fi-c1 { animation: row-slide 0.3s cubic-bezier(0.34,1.56,0.64,1) 0s    both; }
	.feat-card:hover .fi-c2 { animation: row-slide 0.3s cubic-bezier(0.34,1.56,0.64,1) 0.07s both; }
	.feat-card:hover .fi-c3 { animation: row-slide 0.3s cubic-bezier(0.34,1.56,0.64,1) 0.14s both; }

	/* 4. Import — arrow group bounces down */
	@keyframes arrow-drop {
		0%, 100% { transform: translateY(0);  }
		30%       { transform: translateY(4px); }
		60%       { transform: translateY(-1px); }
		80%       { transform: translateY(2px); }
	}
	.feat-card:hover .fi-arrow-grp {
		animation: arrow-drop 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
	}

	/* 5. Identity — half circle spins once */
	@keyframes spin-once {
		from { transform: rotate(0deg); }
		to   { transform: rotate(360deg); }
	}
	.feat-card:hover .fi-half-grp {
		animation: spin-once 0.6s cubic-bezier(0.34,1.56,0.64,1) both;
		transform-box: view-box; transform-origin: 50% 50%;
	}

	/* 6. Scale — outer frames expand with spring */
	@keyframes frame-pulse {
		0%   { transform: scale(1);    }
		50%  { transform: scale(1.12); }
		100% { transform: scale(1);    }
	}
	.fi-frame2, .fi-frame3 { transform-box: fill-box; transform-origin: center; }
	.feat-card:hover .fi-frame3 { animation: frame-pulse 0.45s cubic-bezier(0.34,1.56,0.64,1) 0s    both; }
	.feat-card:hover .fi-frame2 { animation: frame-pulse 0.45s cubic-bezier(0.34,1.56,0.64,1) 0.07s both; }

	/* Museum carousel */
	.museum-slide-active {
		animation: museum-fade 0.35s ease forwards;
	}
	@keyframes museum-fade {
		from { opacity: 0; }
		to   { opacity: 1; }
	}

	/* GPU composition for scrolling images */
	.ts-grid-card,
	.img-trigger {
		transform: translateZ(0);
		will-change: transform;
		backface-visibility: hidden;
	}
	.ts-grid-card img,
	.img-trigger img {
		transform: translateZ(0);
		backface-visibility: hidden;
	}

	.ts-grid-card {
		position: relative; overflow: hidden; border-radius: 0.75rem;
		cursor: zoom-in; border: none; padding: 0; background: #111;
		aspect-ratio: 4 / 3; display: block; width: 100%;
	}
	.ts-grid-overlay {
		position: absolute; inset: 0;
		background: rgba(0,0,0,0); transition: background 0.25s ease;
		display: flex; align-items: flex-end; padding: 10px;
	}
	.ts-grid-card:hover .ts-grid-overlay { background: rgba(0,0,0,0.6); }
	.ts-grid-label {
		font-size: 8px; font-family: monospace; letter-spacing: 0.2em;
		text-transform: uppercase; color: #fff;
		background: rgba(0,0,0,0.55); backdrop-filter: blur(8px);
		padding: 3px 8px; border-radius: 999px;
		opacity: 0; transform: translateY(4px); transition: opacity 0.2s, transform 0.25s;
		white-space: nowrap;
	}
	.ts-grid-card:hover .ts-grid-label { opacity: 1; transform: translateY(0); }
</style>
