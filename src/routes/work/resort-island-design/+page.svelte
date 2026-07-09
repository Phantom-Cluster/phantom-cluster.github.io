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

	let modalImg = $state<{ src: string; alt: string } | null>(null);
	function openModal(src: string, alt: string) { modalImg = { src, alt }; }

	const imgLabels: Record<string, string> = {
		'/images/projects/resort/hero.webp': 'Hero — Landing',
		'/images/projects/resort/homepage.webp': 'Homepage Layout',
		'/images/projects/resort/about.webp': 'About the Resort',
		'/images/projects/resort/location.webp': 'Location & Surroundings',
		'/images/projects/resort/room-details.webp': 'Room Details',
	};

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
	<title>Island Resort Design | Hitanshu Sahu</title>
</svelte:head>

<div bind:this={pageWrapperEl} class="min-h-screen bg-white text-neutral-900" style="background-color: #ffffff;">

	<section data-theme="light" class="w-full bg-white px-6 pt-[160px] md:pt-[180px] pb-20 min-h-screen flex flex-col justify-center">
		<div class="max-w-7xl mx-auto w-full">

			<div class="flex items-center justify-between border-b border-neutral-200 pb-5 mb-12 cs-hero-element">
				<div class="relative inline-flex overflow-hidden rounded-full p-[1.5px] shadow-sm bg-neutral-200">
					<div class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,rgba(0,0,0,0.75)_360deg)]"></div>
					<div class="inline-flex h-full w-full items-center justify-center rounded-full bg-white px-6 py-2 relative z-10">
						<span class="text-[11px] font-mono tracking-widest text-neutral-500 uppercase">Concept — Hospitality Digital Experience</span>
					</div>
				</div>
				<div class="hidden sm:flex items-center gap-4">
					<a href="https://www.behance.net/gallery/112078247/Resort-Design-(Based-on-island)" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#0d9488]/40 bg-[#0d9488]/5 text-[9px] font-mono tracking-widest text-[#2dd4bf] uppercase hover:border-[#0d9488]/70 hover:bg-[#0d9488]/10 transition-colors">Behance ↗</a>
					<span class="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">2021</span>
				</div>
			</div>

			<div class="flex items-start gap-10 cs-hero-element">
				<div class="flex-1 min-w-0">
					<p class="text-[11px] font-mono tracking-[0.35em] uppercase text-neutral-400 mb-5">Resort Design</p>
					<h1 class="text-[clamp(3rem,8vw,7.5rem)] font-black tracking-tight leading-[0.9] text-neutral-900">
						Island<br/>
						<span class="text-neutral-300">Resort</span><br/>
						Experience.
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
						<span class="text-sm font-semibold text-neutral-800">Web + In-Resort App</span>
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
						<a href="https://www.behance.net/gallery/112078247/Resort-Design-(Based-on-island)" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-portfolio-accent hover:underline">
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
						<span class="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">5+</span>
						<span class="text-xs md:text-sm font-semibold text-neutral-400 leading-none">Views</span>
					</div>
				</div>
				<div class="py-7 px-3 md:px-8 border-r border-neutral-200">
					<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">Platforms</span>
					<div class="flex items-baseline gap-1 leading-none flex-wrap">
						<span class="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">2</span>
						<span class="text-xs md:text-sm font-semibold text-neutral-400 leading-none">Web + App</span>
					</div>
				</div>
				<div class="py-7 pl-3 md:pl-8">
					<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">Year</span>
					<div class="flex items-baseline gap-1 leading-none flex-wrap">
						<span class="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">2021</span>
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

	<section class="bg-white px-6 pb-20">
		<div class="max-w-7xl mx-auto">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				{#each project.images as img, i}
					{@const isWide = i === 0 || (project.images.length % 2 === 0 && i === project.images.length - 1)}
					<button
						class="group relative overflow-hidden rounded-2xl bg-neutral-100 cs-fade-up {isWide ? 'md:col-span-2 min-h-[420px]' : 'min-h-[280px]'}"
						onclick={() => openModal(img, imgLabels[img] ?? `Screen ${i + 1}`)}
					>
						<img src={img} alt={imgLabels[img] ?? `Screen ${i + 1}`} class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]" />
						<div class="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
							<span class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full px-4 py-2 text-[10px] font-mono tracking-widest uppercase text-neutral-800">Expand ↗</span>
						</div>
						<div class="absolute bottom-4 left-4">
							<span class="text-[9px] font-mono tracking-widest uppercase bg-black/50 text-white/80 px-3 py-1.5 rounded-full backdrop-blur-sm">{imgLabels[img] ?? `Screen ${i + 1}`}</span>
						</div>
					</button>
				{/each}
			</div>
		</div>
	</section>

	<div bind:this={bentoTriggerEl} data-theme="dark">
		<section class="bg-black py-24 px-6">
			<div class="max-w-7xl mx-auto">

				<div class="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
					<div class="lg:col-span-8 sp-wrap rounded-4xl cs-fade-up">
						<div class="sp-spin-accent"></div>
						<div class="sp-inner bg-neutral-950 rounded-4xl p-10 lg:p-14 border border-white/5 flex flex-col justify-between">
							<p class="text-[11px] font-mono tracking-widest text-primary uppercase mb-8">{project.role} · Hospitality Experience Design</p>
							<h2 class="text-3xl lg:text-5xl font-black tracking-tight text-white leading-[1.05]">
								A <span class="text-shimmer-white">brand-first digital hospitality experience</span> — luxury resort positioning maintained through every screen.
							</h2>
						</div>
					</div>
					<div class="lg:col-span-4 sp-wrap rounded-4xl cs-fade-up">
						<div class="sp-spin-accent"></div>
						<div class="sp-inner bg-neutral-950 rounded-4xl p-10 border border-white/5 flex flex-col justify-between">
							<div>
								<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-3">Project</span>
								<span class="text-4xl font-black tracking-tighter text-white">Resort</span>
							</div>
							<div>
								<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-2">Status</span>
								<span class="text-sm font-semibold text-neutral-300">Concept · Published on Behance</span>
							</div>
						</div>
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-5">
					<div class="sp-wrap rounded-4xl cs-fade-up">
						<div class="sp-spin"></div>
						<div class="sp-inner bg-neutral-950 rounded-4xl p-10 border border-white/5">
							<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-500 uppercase block mb-4">Screens</span>
							<div class="flex items-baseline gap-2 mb-3">
								<span class="text-5xl font-black tracking-tight text-white">5+</span>
							</div>
							<p class="text-sm text-neutral-500 leading-relaxed">Hero, homepage, about, location, and room details — the complete digital guest journey.</p>
						</div>
					</div>
					<div class="sp-wrap rounded-4xl cs-fade-up">
						<div class="sp-spin"></div>
						<div class="sp-inner bg-neutral-950 rounded-4xl p-10 border border-white/5">
							<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-500 uppercase block mb-4">Platforms</span>
							<div class="flex items-baseline gap-2 mb-3">
								<span class="text-5xl font-black tracking-tight text-white">2</span>
							</div>
							<p class="text-sm text-neutral-500 leading-relaxed">Resort website and in-resort companion app — booking flow through on-property stay.</p>
						</div>
					</div>
					<div class="sp-wrap rounded-4xl cs-fade-up">
						<div class="sp-spin"></div>
						<div class="sp-inner bg-neutral-950 rounded-4xl p-10 border border-white/5">
							<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-500 uppercase block mb-4">Palette</span>
							<div class="flex items-baseline gap-2 mb-3">
								<span class="text-5xl font-black tracking-tight text-white">Sand</span>
							</div>
							<p class="text-sm text-neutral-500 leading-relaxed">Warm sand + deep teal — a visual language grounded in the resort's natural environment.</p>
						</div>
					</div>
				</div>

			</div>
		</section>
	</div>

	<div bind:this={editorialTriggerEl} data-theme="light">
		<section class="bg-white px-6 py-32">
			<div class="max-w-7xl mx-auto space-y-32">

				<div class="flex flex-col md:flex-row gap-12 md:gap-24">
					<div class="md:w-1/3">
						<div class="sticky top-32">
							<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-3">01</span>
							<h2 class="text-[34px] md:text-5xl font-black tracking-tight text-neutral-900 leading-[0.95] cs-fade-up">The<br/>Problem</h2>
						</div>
					</div>
					<div class="md:w-2/3 pt-2 md:pt-0">
						<p class="text-xl md:text-2xl font-light text-neutral-500 leading-relaxed cs-fade-up">{project.problem}</p>
					</div>
				</div>

				<div class="flex flex-col md:flex-row gap-12 md:gap-24">
					<div class="md:w-1/3">
						<div class="sticky top-32">
							<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-3">02</span>
							<h2 class="text-[34px] md:text-5xl font-black tracking-tight text-neutral-900 leading-[0.95] cs-fade-up">Process<br/>&amp;&nbsp;Strategy</h2>
						</div>
					</div>
					<div class="md:w-2/3 pt-2 md:pt-0">
						<p class="text-xl md:text-2xl font-light text-neutral-500 leading-relaxed cs-fade-up">{project.process}</p>
					</div>
				</div>

				<div class="flex flex-col md:flex-row gap-12 md:gap-24">
					<div class="md:w-1/3">
						<div class="sticky top-32">
							<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-3">03</span>
							<h2 class="text-[34px] md:text-5xl font-black tracking-tight text-neutral-900 leading-[0.95] cs-fade-up">The<br/>Solution</h2>
						</div>
					</div>
					<div class="md:w-2/3 pt-2 md:pt-0">
						<p class="text-xl md:text-2xl font-light text-neutral-500 leading-relaxed cs-fade-up">{project.solution}</p>
					</div>
				</div>

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

			</div>
		</section>
	</div>

</div>

<LightboxModal bind:modalImg />

<ExploreProjectComponent currentSlug="resort-island-design" />

<style>
	.sp-wrap { position: relative; padding: 1px; overflow: hidden; display: flex; flex-direction: column; }
	.sp-spin, .sp-spin-accent {
		position: absolute; inset: -1000%;
		animation: spin 3s linear infinite; animation-play-state: paused;
		opacity: 0; transition: opacity 0.3s ease;
	}
	.sp-spin { background: conic-gradient(transparent 270deg, rgba(255,255,255,0.6) 360deg); }
	.sp-spin-accent { background: conic-gradient(transparent 270deg, rgba(13,148,136,0.7) 360deg); }
	.sp-inner { position: relative; flex: 1; overflow: hidden; }
	.sp-wrap:hover .sp-spin, .sp-wrap:hover .sp-spin-accent { animation-play-state: running; opacity: 0.85; }
	@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

</style>
