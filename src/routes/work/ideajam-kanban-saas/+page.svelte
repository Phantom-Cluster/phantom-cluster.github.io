<script lang="ts">
	import type { PageData } from './$types';
	import { onMount, onDestroy } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { navTheme } from '$lib/stores/navTheme';
	import CsImageCard from '$lib/components/CsImageCard.svelte';

	let { data }: { data: PageData } = $props();
	let project = $derived(data.project);

	let pageWrapperEl: HTMLElement;
	let bentoTriggerEl: HTMLElement;
	let editorialTriggerEl: HTMLElement;
	let ctx: gsap.Context;

	let modalImg = $state<{ src: string; alt: string } | null>(null);
	function openModal(src: string, alt: string) { modalImg = { src, alt }; }

	let metricsVisible = $state(false);
	let metricsSectionEl: HTMLElement;

	const features = [
		{ icon: '◈', title: 'White-label Support', desc: 'Brand tokens fully decoupled from structural components. Enterprise clients swapped palette in Figma and deployed — no engineering changes.' },
		{ icon: '⊑', title: 'Idea Preview on Create', desc: 'Live preview pane visible while drafting an idea — users saw their card as it would appear in the Kanban grid before submitting.' },
		{ icon: '⌥', title: 'Thread Reply', desc: 'Nested reply threads on each idea post. Inline Reply action expands a sub-thread without leaving the idea card.' },
		{ icon: '◉', title: 'Global Channel Shoutouts', desc: 'Broadcast promising ideas to the organisation-wide channel. Members outside the project get visibility on high-scoring concepts.' },
		{ icon: '▣', title: 'Detailed Progress View', desc: 'Stage pipeline with evaluation count, team assignment list, and cumulative score — all visible on a single idea detail screen without scrolling.' },
		{ icon: '◐', title: 'Per-User Idea Profile', desc: 'Each user profile shows ideas they pitched and ideas they are supporting — creating accountability and peer visibility into contribution.' }
	];

	onMount(() => {
		navTheme.set('light');
		document.body.style.backgroundColor = '#ffffff';
		gsap.registerPlugin(ScrollTrigger);

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const handleKeydown = (e: KeyboardEvent) => { if (e.key === 'Escape') modalImg = null; };
		window.addEventListener('keydown', handleKeydown);

		const metricsObs = new IntersectionObserver(
			([entry]) => { if (entry.isIntersecting) { metricsVisible = true; metricsObs.disconnect(); } },
			{ threshold: 0.2 }
		);
		if (metricsSectionEl) metricsObs.observe(metricsSectionEl);

		const t = setTimeout(() => {
			ctx = gsap.context(() => {
				gsap.to(pageWrapperEl, {
					backgroundColor: '#000000',
					color: '#ffffff',
					ease: 'none',
					scrollTrigger: {
						trigger: bentoTriggerEl,
						start: 'top 90%',
						end: reducedMotion ? 'top 90%' : 'top 60%',
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
						end: reducedMotion ? 'top 90%' : 'top 60%',
						scrub: true,
						onEnter: () => navTheme.set('light'),
						onLeaveBack: () => navTheme.set('dark')
					}
				});

				if (!reducedMotion) {
					gsap.from('.cs-hero-element', {
						y: 40,
						opacity: 0,
						duration: 0.9,
						stagger: 0.12,
						ease: 'power3.out'
					});

					gsap.utils.toArray('.cs-fade-up').forEach((el: any) => {
						gsap.from(el, {
							y: 36,
							opacity: 0,
							duration: 0.8,
							ease: 'power3.out',
							scrollTrigger: { trigger: el, start: 'top 88%', invalidateOnRefresh: true }
						});
					});

					// cs-card: only animate cards NOT inside a cs-grid-stagger (avoid double-animation)
					gsap.utils.toArray('.cs-card').forEach((el: any) => {
						if (!(el as HTMLElement).closest('.cs-grid-stagger')) {
							gsap.from(el, {
								y: 32,
								scale: 0.96,
								opacity: 0,
								duration: 0.75,
								ease: 'power2.out',
								scrollTrigger: { trigger: el, start: 'top 90%', invalidateOnRefresh: true }
							});
						}
					});

					gsap.utils.toArray('.cs-grid-stagger').forEach((grid: any) => {
						const children = Array.from((grid as HTMLElement).children);
						gsap.from(children, {
							y: 40,
							opacity: 0,
							scale: 0.96,
							duration: 0.7,
							stagger: 0.1,
							ease: 'power2.out',
							scrollTrigger: { trigger: grid, start: 'top 85%', invalidateOnRefresh: true }
						});
					});

					gsap.utils.toArray('.cs-img').forEach((img: any) => {
						gsap.from(img, {
							scale: 1.06,
							duration: 1.1,
							ease: 'power2.out',
							scrollTrigger: { trigger: img, start: 'top 90%', invalidateOnRefresh: true }
						});
					});
				}
			});

			ScrollTrigger.refresh();
		}, 400);

		return () => {
			clearTimeout(t);
			window.removeEventListener('keydown', handleKeydown);
			metricsObs.disconnect();
		};
	});

	onDestroy(() => {
		navTheme.set(null);
		if (typeof document !== 'undefined') document.body.style.backgroundColor = '';
		if (ctx) ctx.revert();
	});
</script>

<style>
	@keyframes spin-border {
		from { transform: rotate(0deg); }
		to   { transform: rotate(360deg); }
	}

	/* ── Bento metric cards only — spinning arc border ───────────────── */
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
	.ij-wrap:hover .ij-spin {
		opacity: 0.85;
		animation-play-state: running;
	}
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
	.ij-wrap:hover .ij-spin-green {
		opacity: 0.85;
		animation-play-state: running;
	}
	.ij-inner {
		position: relative;
		flex: 1;
		overflow: hidden;
	}

	/* ── Video cards — bloom + depth shadow ──────────────────────────── */
	.ij-video-card {
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
	.ij-video-card:hover {
		box-shadow:
			0 4px 16px rgba(0, 0, 0, 0.65),
			0 20px 64px rgba(0, 0, 0, 0.55),
			0 0 120px rgba(255, 255, 255, 0.06),
			0 48px 100px rgba(0, 0, 0, 0.4);
		transform: translateY(-3px);
	}

	/* ── Image click-to-preview ──────────────────────────────────────── */
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
	.img-trigger:hover .img-preview-badge {
		opacity: 0;
	}
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
	.img-trigger:hover .img-trigger-overlay {
		background: rgba(0, 0, 0, 0.4);
	}
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
	.img-trigger:hover .img-expand-icon {
		opacity: 1;
		transform: scale(1);
	}

	/* ══════════════════════════════════════════════════════════════════
	   METRIC CARD CONTEXTUAL ANIMATIONS
	   ══════════════════════════════════════════════════════════════════ */

	/* ── Card 1: Stage pipeline collapse (4 → 2) ─────────────────────── */
	.stage-node {
		width: 22px;
		height: 22px;
		border-radius: 50%;
		border: 1px solid rgba(255, 255, 255, 0.1);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 8px;
		font-family: var(--font-mono);
		color: rgba(255, 255, 255, 0.25);
		flex-shrink: 0;
		transition: border-color 0.5s ease 0.9s,
		            color 0.5s ease 0.9s,
		            box-shadow 0.5s ease 0.9s;
	}
	.metrics-visible .stage-node.keep {
		border-color: rgba(255, 255, 255, 0.45);
		color: rgba(255, 255, 255, 0.75);
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.18);
	}
	.stage-connector {
		height: 1px;
		background: rgba(255, 255, 255, 0.07);
		flex-shrink: 0;
		width: 14px;
	}
	.stage-connector.keep {
		transition: background 0.5s ease 0.9s, width 0.5s ease 0.9s;
	}
	.metrics-visible .stage-connector.keep {
		background: rgba(255, 255, 255, 0.25);
		width: 22px;
	}
	/* The eliminated middle nodes collapse their width */
	.stage-elim-wrap {
		display: flex;
		align-items: center;
		overflow: hidden;
		max-width: 80px;
		opacity: 1;
		transition: max-width 0.55s cubic-bezier(0.4, 0, 0.2, 1) 0.2s,
		            opacity 0.4s ease 0.25s;
	}
	.metrics-visible .stage-elim-wrap {
		max-width: 0;
		opacity: 0;
	}

	/* ── Card 2: Bloom glow behind the zero ─────────────────────────── */
	@keyframes bloom-pulse {
		0%, 100% { opacity: 0.3;  transform: translate(-50%, -50%) scale(1); }
		50%       { opacity: 0.65; transform: translate(-50%, -50%) scale(1.35); }
	}
	.green-bloom {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 90px;
		height: 90px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(0, 230, 118, 0.55) 0%, rgba(0, 230, 118, 0) 72%);
		transform: translate(-50%, -50%) scale(0.9);
		opacity: 0;
		filter: blur(10px);
		animation: bloom-pulse 2.8s ease-in-out infinite;
		animation-play-state: paused;
		pointer-events: none;
	}
	.metrics-visible .green-bloom {
		animation-play-state: running;
	}

	/* ── Card 3: Token layer assembly (build from scratch) ───────────── */
	@keyframes token-build {
		from { transform: translateY(14px); opacity: 0; }
		to   { transform: translateY(0);    opacity: 1; }
	}
	.token-layer {
		display: flex;
		align-items: center;
		gap: 8px;
		opacity: 0;
		transform: translateY(14px);
	}
	.metrics-visible .token-layer {
		animation: token-build 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	/* ── Lightbox modal ──────────────────────────────────────────────── */
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
	@keyframes modal-fade-in {
		from { opacity: 0; }
		to   { opacity: 1; }
	}
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

<svelte:head>
	<title>Ideajam Kanban Redesign | Hitanshu Sahu</title>
</svelte:head>

<div bind:this={pageWrapperEl} class="min-h-screen bg-white text-neutral-900" style="background-color: #ffffff;">

	<!-- ═══════════════════════════════════════════════
	     STAGE 1: LIGHT HERO
	     ═══════════════════════════════════════════════ -->
	<section data-theme="light" class="w-full bg-white px-6 pt-[160px] md:pt-[180px] pb-28 min-h-screen flex flex-col justify-center">
		<div class="max-w-7xl mx-auto w-full">

			<!-- Top meta strip -->
			<div class="flex items-center justify-between border-b border-neutral-200 pb-5 mb-12 cs-hero-element">
				<div class="relative inline-flex overflow-hidden rounded-full p-[1.5px] shadow-sm bg-neutral-200">
					<div class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,#2244CC_360deg)]"></div>
					<div class="inline-flex h-full w-full items-center justify-center rounded-full bg-white px-6 py-2 relative z-10">
						<span class="text-[11px] font-mono tracking-widest text-neutral-500 uppercase">Case Study — Kanban SaaS Redesign</span>
					</div>
				</div>
				<span class="text-[11px] font-mono tracking-widest text-neutral-400 uppercase hidden sm:block">Aug 2021 — Jan 2022</span>
			</div>

			<!-- Main split: title left / meta right -->
			<div class="flex items-start gap-10 cs-hero-element">
				<div class="flex-1 min-w-0">
					<p class="text-[11px] font-mono tracking-[0.35em] uppercase text-neutral-400 mb-5">Ideajam</p>
					<h1 class="text-[clamp(3rem,8vw,7.5rem)] font-black tracking-tight leading-[0.9] text-neutral-900">
						Kanban&nbsp;SaaS<br/>
						<span class="text-neutral-300">&amp;&nbsp;White&#8209;label</span><br/>
						Redesign.
					</h1>
					<div class="flex flex-wrap gap-2 mt-8">
						{#each ['Kanban Board', 'Task Management', 'Design System', 'White-label'] as product}
							<span class="px-3 py-1 rounded-full bg-neutral-50 border border-neutral-200 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">{product}</span>
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
						<span class="text-sm font-semibold text-neutral-800">SaaS / B2B</span>
					</div>
					<div>
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Scope</span>
						<span class="text-sm font-semibold text-neutral-800">Full Redesign + System</span>
					</div>
					<div>
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Design System</span>
						<span class="text-sm font-semibold text-neutral-800">Built from Scratch</span>
					</div>
					<div class="pt-5 border-t border-neutral-100">
						<div class="flex items-center gap-2 text-portfolio-accent">
							<span class="text-[9px] font-mono tracking-widest uppercase">Scroll to explore</span>
							<svg class="w-3.5 h-3.5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
							</svg>
						</div>
					</div>
				</div>
			</div>

			<!-- 3-col key impact ledger -->
			<div class="grid grid-cols-3 border-t border-b border-neutral-200 mt-12 cs-hero-element">
				<div class="py-7 pr-4 md:pr-8 border-r border-neutral-200">
					<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">Card Progression</span>
					<div class="flex items-baseline gap-1.5 leading-none flex-wrap">
						<span class="text-lg md:text-xl font-black text-neutral-300 tracking-tight line-through decoration-portfolio-error">4 Steps</span>
						<span class="text-portfolio-accent font-black text-sm md:text-base leading-none">→</span>
						<span class="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">2 Steps</span>
					</div>
				</div>
				<div class="py-7 px-3 md:px-8 border-r border-neutral-200">
					<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">Enterprise Adoption</span>
					<div class="flex items-baseline gap-1 leading-none flex-wrap">
						<span class="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">0</span>
						<span class="text-xs md:text-sm font-semibold text-neutral-400 leading-none">Custom Requests</span>
					</div>
				</div>
				<div class="py-7 pl-3 md:pl-8">
					<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">White-label System</span>
					<div class="flex items-baseline gap-1 leading-none flex-wrap">
						<span class="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">Ready</span>
						<span class="text-xs md:text-sm font-semibold text-neutral-400 leading-none">Day&nbsp;One</span>
					</div>
				</div>
			</div>

			<!-- Description + tags -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10 cs-hero-element">
				<div class="md:col-span-2">
					<p class="text-xl md:text-2xl text-neutral-500 leading-relaxed">{project.description}</p>
				</div>
				<div class="flex flex-wrap gap-2 content-start pt-1">
					{#each project.tags as tag}
						<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase bg-neutral-100 border border-neutral-200 text-neutral-600">{tag}</span>
					{/each}
				</div>
			</div>

		</div>
	</section>

	<!-- ═══════════════════════════════════════════════
	     STAGE 2: DARK METRICS — spinning arc border stays here only
	     ═══════════════════════════════════════════════ -->
	<div bind:this={bentoTriggerEl} data-theme="dark">
		<section bind:this={metricsSectionEl} class="bg-black py-24 px-6" class:metrics-visible={metricsVisible}>
			<div class="max-w-7xl mx-auto">
				<div class="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5 cs-grid-stagger">
					<div class="lg:col-span-8 ij-wrap" style="border-radius: 2rem;">
						<div class="ij-spin"></div>
						<div class="ij-inner bg-neutral-950 p-10 lg:p-14 flex flex-col justify-between" style="border-radius: calc(2rem - 1px);">
							<p class="text-[11px] font-mono tracking-widest text-primary uppercase mb-8">{project.role} · Kanban Board · Design System</p>
							<h2 class="text-3xl lg:text-5xl font-black tracking-tight text-white leading-[1.05]">
								Restructured Kanban hierarchy and shipped a <span class="text-shimmer-white">white-label design system</span> that enterprise clients deployed without modification.
							</h2>
						</div>
					</div>
					<div class="lg:col-span-4 ij-wrap" style="border-radius: 2rem;">
						<div class="ij-spin"></div>
						<div class="ij-inner bg-neutral-950 p-10 flex flex-col justify-between" style="border-radius: calc(2rem - 1px);">
							<div>
								<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-3">Client</span>
								<span class="text-4xl font-black tracking-tighter text-white">Ideajam</span>
							</div>
							<div>
								<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-2">Type</span>
								<span class="text-sm font-semibold text-neutral-300">Kanban SaaS · B2B Platform</span>
							</div>
						</div>
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-5 cs-grid-stagger">
					<div class="ij-wrap" style="border-radius: 2rem;">
						<div class="ij-spin"></div>
						<div class="ij-inner bg-neutral-950 p-10 flex flex-col justify-center" style="border-radius: calc(2rem - 1px);">
							<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-500 uppercase block mb-4">Progression Steps</span>
							<div class="flex items-baseline gap-2 mb-3">
								<span class="text-5xl font-black tracking-tight text-white stat-glow-white">−40%</span>
							</div>
							<p class="text-sm text-neutral-500 leading-relaxed">Steps to move a card from submission to review, post-redesign.</p>
							<!-- Stage collapse visual: 4 nodes → 2 on enter -->
							<div class="mt-5 flex items-center">
								<div class="stage-node keep">1</div>
								<div class="stage-elim-wrap">
									<div class="stage-connector" style="width:14px;"></div>
									<div class="stage-node">2</div>
									<div class="stage-connector" style="width:14px;"></div>
									<div class="stage-node">3</div>
								</div>
								<div class="stage-connector keep"></div>
								<div class="stage-node keep">4</div>
							</div>
							<p class="text-[9px] font-mono text-neutral-700 mt-2 tracking-widest uppercase">4 stages → 2 active</p>
						</div>
					</div>
					<div class="ij-wrap" style="border-radius: 2rem; background: rgba(0, 230, 118, 0.1);">
						<div class="ij-spin-green"></div>
						<div class="ij-inner bg-[#061a0f] p-10 flex flex-col justify-center" style="border-radius: calc(2rem - 1px);">
							<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-500 uppercase block mb-4">Enterprise Adoption</span>
							<div class="flex items-baseline gap-2 mb-3">
								<!-- Bloom glow behind the zero — brightens on enter -->
								<div class="relative" style="display:inline-block;">
									<div class="green-bloom"></div>
									<span class="text-5xl font-black tracking-tight text-portfolio-success stat-glow-green relative" style="z-index:1;">0</span>
								</div>
								<span class="text-xl font-semibold text-portfolio-success/70">Custom Requests</span>
							</div>
							<p class="text-sm text-neutral-500 leading-relaxed">White-label system deployed by enterprise clients without any engineering rework.</p>
						</div>
					</div>
					<div class="ij-wrap" style="border-radius: 2rem;">
						<div class="ij-spin"></div>
						<div class="ij-inner bg-neutral-950 p-10 flex flex-col justify-center" style="border-radius: calc(2rem - 1px);">
							<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-500 uppercase block mb-4">Design System</span>
							<div class="flex items-baseline gap-2 mb-3">
								<span class="text-5xl font-black tracking-tight text-white stat-glow-white">Built</span>
							</div>
							<p class="text-lg font-bold text-neutral-200">From Scratch</p>
							<p class="text-sm text-neutral-500 leading-relaxed mt-2">Separated brand tokens from structural components for zero-friction white-labeling.</p>
							<!-- Token layers assembling — design system built layer by layer -->
							<div class="mt-5 space-y-2">
								<div class="token-layer" style="animation-delay: 0.1s;">
									<div class="w-3 h-3 rounded-sm shrink-0" style="background: rgba(255,107,157,0.7);"></div>
									<div class="h-1.5 rounded-full bg-white/8 flex-1" style="max-width: 52px; background: rgba(255,255,255,0.07);"></div>
									<span class="text-[8px] font-mono text-neutral-600 tracking-wider">Colors</span>
								</div>
								<div class="token-layer" style="animation-delay: 0.35s;">
									<div class="w-3 h-3 rounded-sm shrink-0" style="background: rgba(255,255,255,0.2);"></div>
									<div class="h-1.5 rounded-full flex-1" style="max-width: 70px; background: rgba(255,255,255,0.07);"></div>
									<span class="text-[8px] font-mono text-neutral-600 tracking-wider">Typography</span>
								</div>
								<div class="token-layer" style="animation-delay: 0.6s;">
									<div class="w-3 h-3 rounded-sm shrink-0" style="background: rgba(255,255,255,0.35);"></div>
									<div class="h-1.5 rounded-full flex-1" style="max-width: 40px; background: rgba(255,255,255,0.07);"></div>
									<span class="text-[8px] font-mono text-neutral-600 tracking-wider">Components</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>

	<!-- ═══════════════════════════════════════════════
	     STAGE 2B: BEFORE / AFTER
	     ═══════════════════════════════════════════════ -->
	<section class="bg-black px-6 pt-4 pb-24">
		<div class="max-w-7xl mx-auto">
			<div class="mb-12 cs-fade-up">
				<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase">Before → After</span>
				<h2 class="text-3xl lg:text-4xl font-black tracking-tight text-white mt-3 leading-[1.05]">From legacy table rows<br/>to structured visual hierarchy.</h2>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-5 cs-grid-stagger">
				<CsImageCard
					src="/videos/ideajam/old design.png"
					label="Before"
					caption="Old Ideajam interface — table-based inline editing with no visual stage hierarchy"
					labelVariant="error"
					subtitle="Legacy Enterprise UI · Pre-2021"
					aspect="aspect-4/3"
					footer="Table-based inline editing, no visual stage hierarchy, dense modals. Users relied on external documentation to track card status."
					onOpen={openModal}
				/>
				<CsImageCard
					src="/videos/ideajam/ideation  card and idea page.png"
					label="After"
					caption="New Ideajam Kanban interface — structured card grid with explicit status tags and activity sidebar"
					labelVariant="success"
					subtitle="Redesigned Kanban · 2022"
					aspect="aspect-4/3"
					footer="Structured card grid with explicit status tags, sort controls, and a persistent activity sidebar. Stage progression visible at a glance."
					onOpen={openModal}
				/>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════
	     STAGE 2C: KEY SCREENS
	     ═══════════════════════════════════════════════ -->
	<section class="bg-black px-6 pb-24">
		<div class="max-w-7xl mx-auto">
			<div class="mb-12 cs-fade-up">
				<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase">Key Screens</span>
				<h2 class="text-3xl lg:text-4xl font-black tracking-tight text-white mt-3 leading-[1.05]">Every surface designed<br/>for structured ideation.</h2>
			</div>

			<!-- Row 1 — col-span-2 wrapper keeps grid span -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5 cs-grid-stagger">
				<div class="md:col-span-2">
					<CsImageCard
						src="/videos/ideajam/idea page .png"
						label="Idea Detail — Stage Pipeline"
						caption="Idea detail page showing stage pipeline tabs"
						aspect="aspect-16/10"
						onOpen={openModal}
					/>
				</div>
				<CsImageCard
					src="/videos/ideajam/ideation - rating.png"
					label="Evaluation Panel"
					caption="Evaluation panel showing 5-dimension scoring"
					aspect="aspect-3/4"
					onOpen={openModal}
				/>
			</div>

			<!-- Row 2 -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-5 cs-grid-stagger">
				<CsImageCard
					src="/videos/ideajam/ideation commulative rating.png"
					label="Cumulative Innovation Score"
					caption="Cumulative innovation score view showing 4.3 aggregate rating"
					aspect="aspect-4/3"
					onOpen={openModal}
				/>
				<CsImageCard
					src="/videos/ideajam/data room.png"
					label="Data Room — Document Versioning"
					caption="Data room showing versioned documents"
					aspect="aspect-4/3"
					onOpen={openModal}
				/>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════
	     STAGE 2D: RESEARCH SIGNALS (audit findings)
	     ═══════════════════════════════════════════════ -->
	<section class="bg-black px-6 pb-24">
		<div class="max-w-7xl mx-auto">

			<!-- Header + quote row -->
			<div class="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 mb-14 cs-fade-up">
				<div>
					<div class="flex flex-wrap items-center gap-2.5 mb-8">
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase">Research Signals</span>
						<span class="text-neutral-700">·</span>
						{#each ['5-Screen Audit', '4-Stage Pipeline', 'Zero Token System'] as chip}
							<span class="px-3 py-1 rounded-full border border-white/10 text-[9px] font-mono tracking-widest text-neutral-400 uppercase">{chip}</span>
						{/each}
					</div>
					<h2 class="text-3xl lg:text-5xl font-black tracking-tight text-white leading-[1.05]">
						The potential was there.<br/>
						<span class="shimmer-red">The navigation wasn't.</span>
					</h2>
				</div>
				<!-- User quote -->
				<div class="bg-neutral-950 border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
					<svg class="w-5 h-5 text-neutral-600 mb-4" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
					<p class="text-sm text-neutral-300 leading-relaxed italic flex-1">"It has the potential to be something like Jira — but I can't figure out how to navigate between my task and the other features. And I can't tell who's working on what."</p>
					<div class="mt-5 pt-4 border-t border-white/5">
						<span class="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">User research · Pre-redesign</span>
					</div>
				</div>
			</div>

			<!-- 3×2 finding cards -->
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 cs-grid-stagger">

				<!-- CRITICAL 1: Pipeline steps -->
				<div class="rounded-2xl p-6 flex flex-col gap-3 border border-red-900/40" style="background: linear-gradient(135deg, #2a0a0a 0%, #1a0606 100%);">
					<div class="flex items-center justify-between">
						<span class="text-[8px] font-mono tracking-[0.3em] text-red-400/60 uppercase">Finding</span>
						<span class="px-2.5 py-1 rounded-full text-[8px] font-black font-mono tracking-wider uppercase text-red-300 border border-red-500/40" style="background: rgba(220,38,38,0.18);">Critical</span>
					</div>
					<div>
						<span class="text-[clamp(2rem,5vw,3.5rem)] font-black text-white tracking-tight leading-none block">4</span>
					</div>
					<p class="text-xs text-red-200/60 leading-relaxed">Steps required to move a card from submission to review — each on a separate page with no persistent status indicator.</p>
					<span class="text-[8px] font-mono tracking-[0.3em] text-red-400/40 uppercase mt-auto pt-2 border-t border-red-900/30">Pipeline Friction</span>
				</div>

				<!-- CRITICAL 2: Zero tokens -->
				<div class="rounded-2xl p-6 flex flex-col gap-3 border border-red-900/40" style="background: linear-gradient(135deg, #2a0a0a 0%, #1a0606 100%);">
					<div class="flex items-center justify-between">
						<span class="text-[8px] font-mono tracking-[0.3em] text-red-400/60 uppercase">Finding</span>
						<span class="px-2.5 py-1 rounded-full text-[8px] font-black font-mono tracking-wider uppercase text-red-300 border border-red-500/40" style="background: rgba(220,38,38,0.18);">Critical</span>
					</div>
					<div>
						<span class="text-[clamp(2rem,5vw,3.5rem)] font-black text-white tracking-tight leading-none block">0</span>
					</div>
					<p class="text-xs text-red-200/60 leading-relaxed">Shared design tokens in the original UI — colors, spacing, and radii were hand-coded per screen with no source of truth.</p>
					<span class="text-[8px] font-mono tracking-[0.3em] text-red-400/40 uppercase mt-auto pt-2 border-t border-red-900/30">No Source of Truth</span>
				</div>

				<!-- HIGH 1: Pattern silos -->
				<div class="rounded-2xl p-6 flex flex-col gap-3 border border-orange-900/40" style="background: linear-gradient(135deg, #2a1200 0%, #1a0c00 100%);">
					<div class="flex items-center justify-between">
						<span class="text-[8px] font-mono tracking-[0.3em] text-orange-400/60 uppercase">Finding</span>
						<span class="px-2.5 py-1 rounded-full text-[8px] font-black font-mono tracking-wider uppercase text-orange-300 border border-orange-500/40" style="background: rgba(234,88,12,0.18);">High</span>
					</div>
					<div>
						<span class="text-[clamp(2rem,5vw,3.5rem)] font-black text-white tracking-tight leading-none block">6+</span>
					</div>
					<p class="text-xs text-orange-200/60 leading-relaxed">Distinct visual patterns for buttons, inputs, and cards across the same product — each screen designed in isolation with no shared component language.</p>
					<span class="text-[8px] font-mono tracking-[0.3em] text-orange-400/40 uppercase mt-auto pt-2 border-t border-orange-900/30">Pattern Silos</span>
				</div>

				<!-- HIGH 2: Missing social features -->
				<div class="rounded-2xl p-6 flex flex-col gap-3 border border-orange-900/40" style="background: linear-gradient(135deg, #2a1200 0%, #1a0c00 100%);">
					<div class="flex items-center justify-between">
						<span class="text-[8px] font-mono tracking-[0.3em] text-orange-400/60 uppercase">Finding</span>
						<span class="px-2.5 py-1 rounded-full text-[8px] font-black font-mono tracking-wider uppercase text-orange-300 border border-orange-500/40" style="background: rgba(234,88,12,0.18);">High</span>
					</div>
					<div>
						<span class="text-[clamp(2rem,5vw,3.5rem)] font-black text-white tracking-tight leading-none block">2</span>
					</div>
					<p class="text-xs text-orange-200/60 leading-relaxed">Core visibility features absent at audit: contributor profile pages and per-idea member counts. Users couldn't see who created what or who was supporting it.</p>
					<span class="text-[8px] font-mono tracking-[0.3em] text-orange-400/40 uppercase mt-auto pt-2 border-t border-orange-900/30">Missing Visibility</span>
				</div>

				<!-- MEDIUM 1: Evaluator load -->
				<div class="rounded-2xl p-6 flex flex-col gap-3 border border-white/5" style="background: linear-gradient(135deg, #141414 0%, #0e0e0e 100%);">
					<div class="flex items-center justify-between">
						<span class="text-[8px] font-mono tracking-[0.3em] text-neutral-500 uppercase">Finding</span>
						<span class="px-2.5 py-1 rounded-full text-[8px] font-black font-mono tracking-wider uppercase text-neutral-400 border border-neutral-600/40" style="background: rgba(115,115,115,0.12);">Medium</span>
					</div>
					<div>
						<span class="text-[clamp(2rem,5vw,3.5rem)] font-black text-white tracking-tight leading-none block">30</span>
					</div>
					<p class="text-xs text-neutral-500 leading-relaxed">Total scoring inputs per idea evaluation — 5 criteria × 6-point scale, presented sequentially with no progress indicator or guided completion flow.</p>
					<span class="text-[8px] font-mono tracking-[0.3em] text-neutral-600 uppercase mt-auto pt-2 border-t border-white/5">Evaluator Load</span>
				</div>

				<!-- MEDIUM 2: Navigation depth -->
				<div class="rounded-2xl p-6 flex flex-col gap-3 border border-white/5" style="background: linear-gradient(135deg, #141414 0%, #0e0e0e 100%);">
					<div class="flex items-center justify-between">
						<span class="text-[8px] font-mono tracking-[0.3em] text-neutral-500 uppercase">Finding</span>
						<span class="px-2.5 py-1 rounded-full text-[8px] font-black font-mono tracking-wider uppercase text-neutral-400 border border-neutral-600/40" style="background: rgba(115,115,115,0.12);">Medium</span>
					</div>
					<div>
						<span class="text-[clamp(2rem,5vw,3.5rem)] font-black text-white tracking-tight leading-none block">3×</span>
					</div>
					<p class="text-xs text-neutral-500 leading-relaxed">More navigation steps to switch between idea detail and the project board versus comparable Kanban tools. Context switching was the primary source of user drop-off.</p>
					<span class="text-[8px] font-mono tracking-[0.3em] text-neutral-600 uppercase mt-auto pt-2 border-t border-white/5">Navigation Depth</span>
				</div>

			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════
	     STAGE 2E: HYPOTHESIS CARDS
	     ═══════════════════════════════════════════════ -->
	<section class="bg-black px-6 pb-24">
		<div class="max-w-7xl mx-auto">
			<div class="mb-12 cs-fade-up">
				<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase">Design Rationale</span>
				<h2 class="text-3xl lg:text-4xl font-black tracking-tight text-white mt-3 leading-[1.05]">Three hypotheses.<br/>Three confirmed decisions.</h2>
			</div>

			<div class="flex flex-col gap-5">
				<!-- Hypothesis 1 -->
				<div class="cs-card overflow-hidden border border-white/5" style="border-radius: 1.5rem;">
					<div class="bg-neutral-950 px-8 md:px-12 py-7 border-b border-white/5">
						<div class="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
							<div class="shrink-0 flex items-center gap-2">
								<div class="w-1.5 h-1.5 rounded-full bg-portfolio-accent-vivid animate-pulse shrink-0"></div>
								<span class="text-[9px] font-bold font-mono tracking-[0.3em] text-portfolio-accent-vivid uppercase">Hypothesis</span>
							</div>
							<div class="hidden md:block w-px h-10 bg-white/10 shrink-0"></div>
							<p class="text-base font-semibold text-white leading-relaxed">Reducing card progression from 4 explicit steps to 2 — with inline status indicators — would eliminate workflow confusion and cut time-to-review.</p>
						</div>
					</div>
					<div class="h-[3px] bg-portfolio-accent w-full"></div>
					<div class="bg-neutral-900 px-8 md:px-12 pt-8 pb-7 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10">
						<div class="space-y-4">
							<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-400 uppercase">What changed</span>
							{#each [
								{ n: '01', action: 'Collapsed 4-step flow to 2 explicit stages', detail: 'Submission → In Review. Status surfaced inline on the card itself, no external doc needed.' },
								{ n: '02', action: 'Visual stage pipeline on Idea Detail page', detail: 'Pre-Validation → EH Program → Approval Case → Incorporation — always visible at the top.' },
								{ n: '03', action: 'Persistent "Ideation Stages" panel on every idea', detail: 'Progress tracker with team assignment and evaluation count visible without scrolling.' },
							] as s}
								<div class="flex gap-4">
									<span class="text-neutral-600 text-[11px] font-black font-mono shrink-0 mt-0.5">{s.n}</span>
									<div>
										<p class="text-sm font-bold text-neutral-200 leading-snug mb-1">{s.action}</p>
										<p class="text-xs text-neutral-500 leading-relaxed">{s.detail}</p>
									</div>
								</div>
							{/each}
						</div>
						<div>
							<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-400 uppercase block mb-4">Result</span>
							<div class="grid grid-cols-2 gap-3 mb-4">
								<div class="bg-neutral-950 rounded-xl px-4 py-4 border border-neutral-800">
									<span class="text-[clamp(1.4rem,3vw,2rem)] font-black text-portfolio-success tracking-tight leading-none block">−40%</span>
									<span class="text-xs font-semibold text-white block mt-1">Steps to review</span>
									<span class="text-[10px] text-neutral-500">4 → 2 stages</span>
								</div>
								<div class="bg-neutral-950 rounded-xl px-4 py-4 border border-neutral-800">
									<span class="text-[clamp(1.4rem,3vw,2rem)] font-black text-portfolio-success tracking-tight leading-none block">Zero</span>
									<span class="text-xs font-semibold text-white block mt-1">Support tickets</span>
									<span class="text-[10px] text-neutral-500">"where's my card?"</span>
								</div>
							</div>
							<div class="flex items-start gap-3 bg-green-950/50 border border-green-800/40 rounded-xl px-4 py-3">
								<div class="w-2 h-2 rounded-full bg-green-500 shrink-0 mt-0.5 animate-pulse"></div>
								<p class="text-xs font-semibold text-green-400 leading-snug">Hypothesis confirmed — users stopped losing track of card status after the inline pipeline launched.</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Hypothesis 2 -->
				<div class="cs-card overflow-hidden border border-white/5" style="border-radius: 1.5rem;">
					<div class="bg-neutral-950 px-8 md:px-12 py-7 border-b border-white/5">
						<div class="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
							<div class="shrink-0 flex items-center gap-2">
								<div class="w-1.5 h-1.5 rounded-full bg-portfolio-accent-vivid animate-pulse shrink-0"></div>
								<span class="text-[9px] font-bold font-mono tracking-[0.3em] text-portfolio-accent-vivid uppercase">Hypothesis</span>
							</div>
							<div class="hidden md:block w-px h-10 bg-white/10 shrink-0"></div>
							<p class="text-base font-semibold text-white leading-relaxed">Separating brand tokens from structural components would let enterprise clients deploy Ideajam under their own identity — zero engineering rework post-handoff.</p>
						</div>
					</div>
					<div class="h-[3px] bg-portfolio-accent w-full"></div>
					<div class="bg-neutral-900 px-8 md:px-12 pt-8 pb-7 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10">
						<div class="space-y-4">
							<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-400 uppercase">What changed</span>
							{#each [
								{ n: '01', action: 'Two-layer token system in Figma', detail: 'Default Colourstyle layer (brand) fully decoupled from the component structure layer. Swap one, the other stays intact.' },
								{ n: '02', action: 'NBT white-label variant shipped as a parallel file', detail: 'Enterprise clients received a second Figma handoff with their palette applied — no structural changes required.' },
								{ n: '03', action: 'Rounded corner + shadow system standardised', detail: '6px card, 4px normal, 40px radius buttons — documented and applied consistently across every component.' },
							] as s}
								<div class="flex gap-4">
									<span class="text-neutral-600 text-[11px] font-black font-mono shrink-0 mt-0.5">{s.n}</span>
									<div>
										<p class="text-sm font-bold text-neutral-200 leading-snug mb-1">{s.action}</p>
										<p class="text-xs text-neutral-500 leading-relaxed">{s.detail}</p>
									</div>
								</div>
							{/each}
						</div>
						<div>
							<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-400 uppercase block mb-4">Result</span>
							<div class="grid grid-cols-2 gap-3 mb-4">
								<div class="bg-neutral-950 rounded-xl px-4 py-4 border border-neutral-800">
									<span class="text-[clamp(1.4rem,3vw,2rem)] font-black text-portfolio-success tracking-tight leading-none block">0</span>
									<span class="text-xs font-semibold text-white block mt-1">Custom requests</span>
									<span class="text-[10px] text-neutral-500">post-deployment</span>
								</div>
								<div class="bg-neutral-950 rounded-xl px-4 py-4 border border-neutral-800">
									<span class="text-[clamp(1.4rem,3vw,2rem)] font-black text-portfolio-success tracking-tight leading-none block">Day 1</span>
									<span class="text-xs font-semibold text-white block mt-1">Deployed</span>
									<span class="text-[10px] text-neutral-500">no rework</span>
								</div>
							</div>
							<div class="flex items-start gap-3 bg-green-950/50 border border-green-800/40 rounded-xl px-4 py-3">
								<div class="w-2 h-2 rounded-full bg-green-500 shrink-0 mt-0.5 animate-pulse"></div>
								<p class="text-xs font-semibold text-green-400 leading-snug">Hypothesis confirmed — enterprise clients deployed the white-label variant without a single engineering modification request.</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Hypothesis 3 -->
				<div class="cs-card overflow-hidden border border-white/5" style="border-radius: 1.5rem;">
					<div class="bg-neutral-950 px-8 md:px-12 py-7 border-b border-white/5">
						<div class="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
							<div class="shrink-0 flex items-center gap-2">
								<div class="w-1.5 h-1.5 rounded-full bg-neutral-500 shrink-0"></div>
								<span class="text-[9px] font-bold font-mono tracking-[0.3em] text-neutral-500 uppercase">Hypothesis</span>
							</div>
							<div class="hidden md:block w-px h-10 bg-white/10 shrink-0"></div>
							<p class="text-base font-semibold text-white leading-relaxed">Surfacing cumulative innovation scores inline — visible on the idea card — would reduce evaluator fatigue and increase scoring completion rates per idea.</p>
						</div>
					</div>
					<div class="h-[3px] bg-neutral-700 w-full"></div>
					<div class="bg-neutral-900 px-8 md:px-12 pt-8 pb-7 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10">
						<div class="space-y-4">
							<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-400 uppercase">What shipped</span>
							{#each [
								{ n: '01', action: '5-dimension scoring panel', detail: 'Innovation Degree, Feasibility, Viability, Strategic Fit, Sustainable Impact — each on a 1–6 scale.' },
								{ n: '02', action: 'Cumulative aggregate score surface', detail: 'Single score (e.g. 4.3) visible on the idea detail and on the card in grid view.' },
								{ n: '03', action: 'Evaluation progress counter', detail: '"6 out of 8 evaluated this idea" — gives social proof and creates completion pressure.' },
							] as s}
								<div class="flex gap-4">
									<span class="text-neutral-600 text-[11px] font-black font-mono shrink-0 mt-0.5">{s.n}</span>
									<div>
										<p class="text-sm font-bold text-neutral-200 leading-snug mb-1">{s.action}</p>
										<p class="text-xs text-neutral-500 leading-relaxed">{s.detail}</p>
									</div>
								</div>
							{/each}
						</div>
						<div>
							<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-400 uppercase block mb-4">Status</span>
							<div class="bg-neutral-950 rounded-xl px-5 py-4 border border-neutral-800 mb-4">
								<span class="text-sm font-bold text-neutral-200 block mb-1">Tested at launch</span>
								<p class="text-xs text-neutral-500 leading-relaxed">Scoring completion improved in early enterprise cohorts. A forced-rank system would have been a stronger test — this is the main design regret (see Reflection).</p>
							</div>
							<div class="flex items-start gap-3 bg-neutral-800/50 border border-neutral-700/50 rounded-xl px-4 py-3">
								<div class="w-2 h-2 rounded-full bg-neutral-500 shrink-0 mt-0.5"></div>
								<p class="text-xs font-semibold text-neutral-400 leading-snug">Partially confirmed — completion improved but evaluator fatigue on 5×6 sequential scoring was not fully resolved.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════
	     STAGE 2F: INTERACTIONS / VIDEOS
	     ═══════════════════════════════════════════════ -->
	<section class="bg-black px-6 pb-28">
		<div class="max-w-7xl mx-auto">
			<div class="mb-12 cs-fade-up">
				<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase">Interactions</span>
				<h2 class="text-3xl lg:text-4xl font-black tracking-tight text-white mt-3 leading-[1.05]">Motion-first,<br/>keyboard-accessible.</h2>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-5">

				<!-- Video 1 -->
				<div class="group ij-video-card cs-card">
					<button
						type="button"
						aria-label="Open video fullscreen"
						class="relative w-full cursor-pointer focus:outline-none"
						onclick={(e) => e.currentTarget.querySelector('video')?.requestFullscreen()}
						onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.querySelector('video')?.requestFullscreen()}
					>
						<div class="overflow-hidden aspect-video">
							<video src="/videos/ideajam/Main Design elements.mp4" autoplay muted loop playsinline preload="metadata" class="w-full h-full object-cover block"></video>
						</div>
						<!-- fullscreen overlay on hover -->
						<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40">
							<div class="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
								<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
							</div>
						</div>
						<!-- default tip — fades when hovered -->
						<div class="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/55 backdrop-blur-sm rounded-full px-2.5 py-1.5 group-hover:opacity-0 transition-opacity duration-200 pointer-events-none">
							<svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
							<span class="text-[9px] text-white/60 font-mono tracking-wider">Click to expand</span>
						</div>
					</button>
					<div class="px-5 py-4 border-t border-white/5">
						<p class="text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-1.5">Main Design Elements</p>
						<p class="text-sm text-neutral-400 leading-relaxed">Core layout, card structure, and primary navigation patterns.</p>
					</div>
				</div>

				<!-- Video 2 -->
				<div class="group ij-video-card cs-card">
					<button
						type="button"
						aria-label="Open video fullscreen"
						class="relative w-full cursor-pointer focus:outline-none"
						onclick={(e) => e.currentTarget.querySelector('video')?.requestFullscreen()}
						onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.querySelector('video')?.requestFullscreen()}
					>
						<div class="overflow-hidden aspect-video">
							<video src="/videos/ideajam/Create new and FAQ, Reply thread.mp4" autoplay muted loop playsinline preload="metadata" class="w-full h-full object-cover block"></video>
						</div>
						<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40">
							<div class="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
								<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
							</div>
						</div>
						<div class="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/55 backdrop-blur-sm rounded-full px-2.5 py-1.5 group-hover:opacity-0 transition-opacity duration-200 pointer-events-none">
							<svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
							<span class="text-[9px] text-white/60 font-mono tracking-wider">Click to expand</span>
						</div>
					</button>
					<div class="px-5 py-4 border-t border-white/5">
						<p class="text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-1.5">Create + Reply Thread</p>
						<p class="text-sm text-neutral-400 leading-relaxed">Idea creation flow, FAQ modal, and threaded discussion replies.</p>
					</div>
				</div>

				<!-- Video 3 -->
				<div class="group ij-video-card cs-card">
					<button
						type="button"
						aria-label="Open video fullscreen"
						class="relative w-full cursor-pointer focus:outline-none"
						onclick={(e) => e.currentTarget.querySelector('video')?.requestFullscreen()}
						onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.querySelector('video')?.requestFullscreen()}
					>
						<div class="overflow-hidden aspect-video">
							<video src="/videos/ideajam/Mobile view.mp4" autoplay muted loop playsinline preload="metadata" class="w-full h-full object-cover block"></video>
						</div>
						<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40">
							<div class="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
								<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
							</div>
						</div>
						<div class="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/55 backdrop-blur-sm rounded-full px-2.5 py-1.5 group-hover:opacity-0 transition-opacity duration-200 pointer-events-none">
							<svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
							<span class="text-[9px] text-white/60 font-mono tracking-wider">Click to expand</span>
						</div>
					</button>
					<div class="px-5 py-4 border-t border-white/5">
						<p class="text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-1.5">Mobile View</p>
						<p class="text-sm text-neutral-400 leading-relaxed">Responsive layout adapted for mobile-first users in the field.</p>
					</div>
				</div>

			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════
	     STAGE 3: LIGHT EDITORIAL
	     ═══════════════════════════════════════════════ -->
	<div bind:this={editorialTriggerEl} data-theme="light">
		<section class="bg-white px-6 py-32">
			<div class="max-w-7xl mx-auto space-y-32">

				<!-- The Problem -->
				<div class="flex flex-col md:flex-row gap-12 md:gap-24 cs-fade-up">
					<div class="md:w-1/3">
						<div class="sticky top-32">
							<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-3">01</span>
							<h2 class="text-[34px] md:text-5xl font-black tracking-tight text-neutral-900 leading-[0.95]">The<br/>Problem</h2>
						</div>
					</div>
					<div class="md:w-2/3 pt-2 md:pt-0 space-y-8">
						<p class="text-xl md:text-2xl font-light text-neutral-500 leading-relaxed">{project.problem}</p>
						<!-- Audit stat callouts -->
						<div class="grid grid-cols-3 gap-3">
							<div class="border border-neutral-200 rounded-2xl p-5">
								<span class="text-[clamp(1.5rem,3vw,2.2rem)] font-black text-neutral-900 block leading-none mb-2">4</span>
								<span class="text-[8px] font-mono tracking-widest text-neutral-400 uppercase block">Pipeline Steps</span>
								<span class="text-[10px] text-neutral-400 block mt-1 leading-snug">to move a card to review</span>
							</div>
							<div class="border border-neutral-200 rounded-2xl p-5">
								<span class="text-[clamp(1.5rem,3vw,2.2rem)] font-black text-neutral-900 block leading-none mb-2">6+</span>
								<span class="text-[8px] font-mono tracking-widest text-neutral-400 uppercase block">Pattern Silos</span>
								<span class="text-[10px] text-neutral-400 block mt-1 leading-snug">no shared component language</span>
							</div>
							<div class="border border-neutral-200 rounded-2xl p-5">
								<span class="text-[clamp(1.5rem,3vw,2.2rem)] font-black text-neutral-900 block leading-none mb-2">0</span>
								<span class="text-[8px] font-mono tracking-widest text-neutral-400 uppercase block">Design Tokens</span>
								<span class="text-[10px] text-neutral-400 block mt-1 leading-snug">colors hand-coded per screen</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Process & Strategy -->
				<div class="flex flex-col md:flex-row gap-12 md:gap-24 cs-fade-up">
					<div class="md:w-1/3">
						<div class="sticky top-32">
							<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-3">02</span>
							<h2 class="text-[34px] md:text-5xl font-black tracking-tight text-neutral-900 leading-[0.95]">Process<br/>&amp;&nbsp;Strategy</h2>
						</div>
					</div>
					<div class="md:w-2/3 pt-2 md:pt-0 space-y-5">
						<p class="text-xl md:text-2xl font-light text-neutral-500 leading-relaxed mb-2">{project.process}</p>
						<!-- 3-phase process steps -->
						<div class="flex flex-col gap-3">
							<div class="flex gap-5 items-start border border-neutral-100 rounded-2xl p-5 hover:border-neutral-300 transition-colors duration-300">
								<span class="text-[10px] font-black font-mono text-neutral-300 shrink-0 mt-0.5 w-5">01</span>
								<div>
									<h4 class="text-sm font-bold text-neutral-900 mb-1.5">Discovery &amp; Audit</h4>
									<p class="text-sm text-neutral-500 leading-relaxed">Mapped user-reported friction against 5 key screens. Catalogued <strong class="text-neutral-700 font-semibold">6+ inconsistent UI patterns</strong> and identified 2 missing visibility features — contributor profiles and per-idea member metrics.</p>
								</div>
							</div>
							<div class="flex gap-5 items-start border border-neutral-100 rounded-2xl p-5 hover:border-neutral-300 transition-colors duration-300">
								<span class="text-[10px] font-black font-mono text-neutral-300 shrink-0 mt-0.5 w-5">02</span>
								<div>
									<h4 class="text-sm font-bold text-neutral-900 mb-1.5">Pipeline Architecture</h4>
									<p class="text-sm text-neutral-500 leading-relaxed">Collapsed the <strong class="text-neutral-700 font-semibold">4-stage card flow to 2 explicit stages</strong> with inline status visible on every card — eliminating the need for external documentation to track where an idea was in review.</p>
								</div>
							</div>
							<div class="flex gap-5 items-start border border-neutral-100 rounded-2xl p-5 hover:border-neutral-300 transition-colors duration-300">
								<span class="text-[10px] font-black font-mono text-neutral-300 shrink-0 mt-0.5 w-5">03</span>
								<div>
									<h4 class="text-sm font-bold text-neutral-900 mb-1.5">Token System &amp; Handoff</h4>
									<p class="text-sm text-neutral-500 leading-relaxed">Built a two-layer token architecture in Figma — brand palette fully decoupled from structural components. Delivered a white-label variant that <strong class="text-neutral-700 font-semibold">enterprise clients deployed on Day 1</strong> without a single engineering modification.</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- The Solution -->
				<div class="flex flex-col md:flex-row gap-12 md:gap-24 cs-fade-up">
					<div class="md:w-1/3">
						<div class="sticky top-32">
							<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-3">03</span>
							<h2 class="text-[34px] md:text-5xl font-black tracking-tight text-neutral-900 leading-[0.95]">The<br/>Solution</h2>
						</div>
					</div>
					<div class="md:w-2/3 pt-2 md:pt-0 space-y-8">
						<p class="text-xl md:text-2xl font-light text-neutral-500 leading-relaxed">{project.solution}</p>
						<!-- Before → After comparison table -->
						<div class="border border-neutral-200 rounded-2xl overflow-hidden">
							<div class="grid grid-cols-[1fr_120px_140px] border-b border-neutral-200 bg-neutral-50 px-5 py-2.5">
								<span class="text-[8px] font-mono tracking-widest text-neutral-400 uppercase">What changed</span>
								<span class="text-[8px] font-mono tracking-widest text-[#C40E0B] uppercase">Before</span>
								<span class="text-[8px] font-mono tracking-widest text-neutral-400 uppercase">After</span>
							</div>
							<div class="grid grid-cols-[1fr_120px_140px] items-center px-5 py-4 border-b border-neutral-100">
								<span class="text-sm font-medium text-neutral-600">Card progression</span>
								<span class="text-sm font-bold text-neutral-300 line-through">4 stages</span>
								<span class="text-sm font-bold text-neutral-900">2 stages <span class="text-[10px] font-mono text-portfolio-success">−40%</span></span>
							</div>
							<div class="grid grid-cols-[1fr_120px_140px] items-center px-5 py-4 border-b border-neutral-100">
								<span class="text-sm font-medium text-neutral-600">Token system</span>
								<span class="text-sm font-bold text-neutral-300 line-through">None</span>
								<span class="text-sm font-bold text-neutral-900">2-layer Figma system</span>
							</div>
							<div class="grid grid-cols-[1fr_120px_140px] items-center px-5 py-4 border-b border-neutral-100">
								<span class="text-sm font-medium text-neutral-600">UI pattern count</span>
								<span class="text-sm font-bold text-neutral-300 line-through">6+ silos</span>
								<span class="text-sm font-bold text-neutral-900">1 unified system</span>
							</div>
							<div class="grid grid-cols-[1fr_120px_140px] items-center px-5 py-4">
								<span class="text-sm font-medium text-neutral-600">Enterprise custom requests</span>
								<span class="text-sm font-bold text-neutral-300 line-through">Multiple</span>
								<span class="text-sm font-bold text-neutral-900">0 post-deployment</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Features Shipped -->
				<div class="cs-fade-up">
					<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-3">04 — Features Shipped</span>
					<h2 class="text-[34px] md:text-5xl font-black tracking-tight text-neutral-900 leading-[0.95] mb-12">What got<br/>built.</h2>
					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{#each features as feat}
							<div class="group border border-neutral-200 rounded-2xl p-6 hover:border-neutral-900 hover:bg-neutral-950 transition-all duration-300 cursor-default cs-card">
								<span class="text-2xl text-neutral-300 group-hover:text-white transition-colors duration-300 block mb-4 font-mono">{feat.icon}</span>
								<h3 class="text-sm font-bold text-neutral-900 group-hover:text-white transition-colors duration-300 mb-2">{feat.title}</h3>
								<p class="text-sm text-neutral-500 group-hover:text-neutral-400 transition-colors duration-300 leading-relaxed">{feat.desc}</p>
							</div>
						{/each}
					</div>
				</div>

				<!-- Outcome -->
				<div class="cs-fade-up">
					<div class="bg-neutral-950 rounded-bento p-10 md:p-16">
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-6">05 — Outcome</span>
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

				<!-- Design System -->
				<div class="cs-fade-up">
					<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-3">06 — Design System</span>
					<h2 class="text-[34px] md:text-5xl font-black tracking-tight text-neutral-900 leading-[0.95] mb-12">Design<br/>System</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 cs-grid-stagger">
						<CsImageCard
							src="/videos/ideajam/Brand color.png"
							label="Default Colour Styles"
							caption="Brand colour system showing neutral, primary pink, and secondary blue scales"
							aspect="aspect-4/3"
							theme="light"
							onOpen={openModal}
						/>
						<CsImageCard
							src="/videos/ideajam/NBT color style.png"
							label="NBT Colour Styles — White-label"
							caption="NBT white-label colour system with neutral tones and alternative brand palette"
							aspect="aspect-4/3"
							theme="light"
							onOpen={openModal}
						/>
					</div>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-5 cs-grid-stagger">
						<CsImageCard
							src="/videos/ideajam/Typescale .png"
							label="Type Scale — Major Third · Poppins"
							caption="Type scale documentation — Major Third ratio using Poppins"
							aspect="aspect-video"
							theme="light"
							onOpen={openModal}
						/>
						<CsImageCard
							src="/videos/ideajam/Rounded color.png"
							label="Rounded Corners + Colour Shadows"
							caption="Border radius and shadow system — 6px cards, 4px elements, 40px buttons"
							aspect="aspect-video"
							theme="light"
							onOpen={openModal}
						/>
					</div>
				</div>

				<!-- User Flow Research Artifact -->
				<div class="cs-fade-up">
					<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-3">07 — Research Artifact</span>
					<h2 class="text-[34px] md:text-5xl font-black tracking-tight text-neutral-900 leading-[0.95] mb-4">User<br/>Flow</h2>
					<p class="text-lg md:text-xl text-neutral-500 leading-relaxed mb-10 max-w-xl">Authentication and onboarding flow mapped before any visual design began — sign in, sign up, and credential recovery paths documented to surface where drop-off risk was highest.</p>
					<figure class="rounded-3xl overflow-hidden border border-neutral-100">
						<button
							type="button"
							class="img-trigger"
							onclick={() => openModal('/videos/ideajam/user flow.png', 'User flow diagram showing authentication paths: sign in, sign up, and forget password recovery')}
							aria-label="Preview: User flow diagram"
						>
							<div class="overflow-hidden aspect-video">
								<img src="/videos/ideajam/user flow.png" alt="User flow diagram showing authentication paths" class="w-full h-full object-cover object-top cs-img" />
							</div>
							<div class="img-trigger-overlay"><div class="img-expand-icon"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg></div></div>
							<div class="img-preview-badge">
								<svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
								<span class="text-[9px] text-white/60 font-mono tracking-wider">View full image</span>
							</div>
						</button>
					</figure>
				</div>

				<!-- Reflection -->
				<div class="cs-fade-up">
					<div class="bg-neutral-950 rounded-bento p-10 md:p-14">
						<div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-12">
							<div>
								<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block mb-6">08 — Reflection</span>
								<h2 class="text-4xl md:text-6xl font-black tracking-tight text-white leading-[0.95]">What I'd do<br/>differently.</h2>
							</div>
							<!-- Decorative anchor number -->
							<div class="flex flex-col items-end shrink-0 lg:pt-2">
								<span class="text-[80px] lg:text-[110px] font-black leading-none select-none" style="color: rgba(255,255,255,0.04);">30</span>
								<span class="text-[9px] font-mono tracking-widest text-neutral-700 uppercase -mt-2">inputs per evaluation</span>
							</div>
						</div>

						<div class="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/5 pt-10">

							<!-- Lesson 1: Scoring overload -->
							<div class="bg-white/[0.03] rounded-2xl p-7 border border-white/5 flex flex-col">
								<div class="flex items-center gap-2 mb-5">
									<div class="w-1.5 h-1.5 rounded-full bg-portfolio-error shrink-0"></div>
									<span class="text-[8px] font-mono tracking-[0.3em] text-portfolio-error/70 uppercase">What shipped</span>
								</div>
								<p class="text-2xl font-black text-white leading-snug mb-3">30 scoring inputs<br/>per idea.</p>
								<p class="text-sm text-neutral-500 leading-relaxed flex-1">5 criteria × 6-point scale, presented sequentially with no progress indicator. Evaluators completed the form but reported decision fatigue — especially on ideas with large team counts where everyone was expected to score independently.</p>
								<div class="mt-6 pt-5 border-t border-white/5">
									<div class="flex items-center gap-2 mb-3">
										<div class="w-1.5 h-1.5 rounded-full bg-portfolio-success shrink-0"></div>
										<span class="text-[8px] font-mono tracking-[0.3em] text-portfolio-success/70 uppercase">What I'd ship instead</span>
									</div>
									<p class="text-sm text-neutral-400 leading-relaxed">A forced-rank model — drag 5 criteria into priority order rather than scoring each on a scale. One decision instead of thirty. Faster signal, no number fatigue, more consistent cross-evaluator results.</p>
								</div>
							</div>

							<!-- Lesson 2: Late-stage design sequence -->
							<div class="bg-white/[0.03] rounded-2xl p-7 border border-white/5 flex flex-col">
								<div class="flex items-center gap-2 mb-5">
									<div class="w-1.5 h-1.5 rounded-full bg-portfolio-error shrink-0"></div>
									<span class="text-[8px] font-mono tracking-[0.3em] text-portfolio-error/70 uppercase">Design sequence regret</span>
								</div>
								<p class="text-2xl font-black text-white leading-snug mb-3">Evaluation panel<br/>came too late.</p>
								<p class="text-sm text-neutral-500 leading-relaxed flex-1">The scoring UI was designed after the Kanban structure was already locked — it inherited the card pipeline's logic without its own usability pass. The 1–6 scale was never pressure-tested in isolation before handoff. The task-completion improvement was real, but the evaluator fatigue issue was always there and went unresolved.</p>
								<div class="mt-6 pt-5 border-t border-white/5">
									<div class="flex items-center gap-2 mb-3">
										<div class="w-1.5 h-1.5 rounded-full bg-portfolio-success shrink-0"></div>
										<span class="text-[8px] font-mono tracking-[0.3em] text-portfolio-success/70 uppercase">What I'd do instead</span>
									</div>
									<p class="text-sm text-neutral-400 leading-relaxed">Run a dedicated usability session on the scoring flow independently — before any visual design begins. Even a paper prototype with 5 evaluators would have surfaced the sequential fatigue early enough to change the model.</p>
								</div>
							</div>

						</div>
					</div>
				</div>

			</div>
		</section>
	</div>

</div>

<!-- ── Image lightbox modal ─────────────────────────────────────────────── -->
{#if modalImg}
	<div
		class="img-modal-backdrop"
		role="dialog"
		aria-modal="true"
		aria-label="Image preview"
		onclick={() => modalImg = null}
		onkeydown={(e) => e.key === 'Escape' && (modalImg = null)}
		tabindex="-1"
	>
		<div
			class="img-modal-inner"
			onclick={(e) => e.stopPropagation()}
			role="presentation"
		>
			<img
				src={modalImg.src}
				alt={modalImg.alt}
				class="max-w-full max-h-[85vh] w-auto object-contain rounded-2xl"
				style="box-shadow: 0 32px 100px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.06);"
			/>
			<button
				type="button"
				onclick={() => modalImg = null}
				class="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
				aria-label="Close preview"
			>
				<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
				</svg>
			</button>
			<p class="text-center text-[10px] text-white/30 font-mono tracking-wider mt-3">Click outside or press Esc to close</p>
		</div>
	</div>
{/if}
