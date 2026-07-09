<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	interface Props {
		title: string;
		description: string;
		role: string;
		tags: string[];
	}

	let { title, description, role, tags }: Props = $props();

	onMount(() => {
		const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (rm) return;

		// Per-line curtain wipe on H1, then stagger everything else
		gsap.set('.cs-hero-line-inner', { yPercent: 110 });
		gsap.set('.cs-hero-eyebrow, .cs-hero-badge', { opacity: 0, y: 14 });
		gsap.set('.cs-hero-chips span', { opacity: 0, y: 12 });
		gsap.set('.cs-hero-meta-item', { opacity: 0, y: 16 });
		gsap.set('.cs-hero-ledger-cell', { opacity: 0, y: 20 });
		gsap.set('.cs-hero-desc', { opacity: 0, y: 18 });
		gsap.set('.cs-hero-tags span', { opacity: 0, y: 10 });

		gsap.timeline({ delay: 0.05 })
			.to('.cs-hero-badge', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
			.to('.cs-hero-line-inner', { yPercent: 0, duration: 1.0, stagger: 0.09, ease: 'power4.out' }, '-=0.2')
			.to('.cs-hero-eyebrow', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.1)
			.to('.cs-hero-chips span', { opacity: 1, y: 0, duration: 0.45, stagger: 0.055, ease: 'power3.out' }, '-=0.5')
			.to('.cs-hero-meta-item', { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out' }, '-=0.6')
			.to('.cs-hero-ledger-cell', { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power3.out' }, '-=0.4')
			.to('.cs-hero-desc', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
			.to('.cs-hero-tags span', { opacity: 1, y: 0, duration: 0.4, stagger: 0.045, ease: 'power2.out' }, '-=0.45');
	});
</script>

<!-- bg-white here is intentional — prevents the GSAP dark-stage bleed from inverting hero text -->
<section class="w-full bg-white px-6 pt-[160px] md:pt-[180px] pb-28 min-h-screen flex flex-col justify-center">
	<div class="max-w-7xl mx-auto w-full">

		<!-- Top meta strip -->
		<div class="flex items-center justify-between border-b border-neutral-200 pb-5 mb-12">
			<div class="cs-hero-badge relative inline-flex overflow-hidden rounded-full p-[1.5px] shadow-sm bg-neutral-200">
				<div class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,rgba(0,0,0,0.75)_360deg)]"></div>
				<div class="inline-flex h-full w-full items-center justify-center rounded-full bg-white px-6 py-2 relative z-10">
					<span class="text-[11px] font-mono tracking-widest text-neutral-500 uppercase">Case Study — Dashboard &amp; Plugin Suite</span>
				</div>
			</div>
			<span class="cs-hero-badge text-[11px] font-mono tracking-widest text-neutral-400 uppercase hidden sm:block">May 2022 — Sep 2024</span>
		</div>

		<!-- Main split: giant title left / meta right -->
		<div class="flex items-start gap-10">

			<!-- Display title -->
			<div class="flex-1 min-w-0">
				<p class="cs-hero-eyebrow text-[11px] font-mono tracking-[0.35em] uppercase text-neutral-400 mb-5">WPMU DEV</p>
				<h1 class="text-[clamp(2.8rem,7vw,6rem)] font-black tracking-tight leading-[1.10] text-neutral-900">
					<span class="block overflow-hidden pb-[0.08em] mb-[-0.2em]">
						<span class="cs-hero-line-inner block">Plugin Suite</span>
					</span>
					<span class="block overflow-hidden pb-[0.08em] mb-[-0.2em]">
						<span class="cs-hero-line-inner block text-neutral-300">&amp;&nbsp;Dashboard</span>
					</span>
					<span class="block overflow-hidden pb-[0.08em]">
						<span class="cs-hero-line-inner block">Overhaul.</span>
					</span>
				</h1>

				<!-- Product chips -->
				<div class="cs-hero-chips flex flex-wrap gap-2 mt-8">
					{#each ['Smush', 'Hummingbird', 'Snapshot', 'SmartCrawl', 'Beehive', 'Dashboard'] as product}
						<span class="px-3 py-1 rounded-full bg-neutral-50 border border-neutral-200 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">{product}</span>
					{/each}
				</div>
			</div>

			<!-- Right meta column — visible md+ -->
			<div class="shrink-0 w-56 hidden md:flex flex-col gap-6 pt-14">
				<div class="cs-hero-meta-item">
					<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Role</span>
					<span class="text-sm font-semibold text-neutral-800">{role}</span>
				</div>
				<div class="cs-hero-meta-item">
					<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Platform</span>
					<span class="text-sm font-semibold text-neutral-800">SaaS / WordPress</span>
				</div>
				<div class="cs-hero-meta-item">
					<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Products</span>
					<span class="text-sm font-semibold text-neutral-800">6 Plugins + Dashboard</span>
				</div>
				<div class="cs-hero-meta-item">
					<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Design System</span>
					<span class="text-sm font-semibold text-neutral-800">SUI 3 Atomic</span>
				</div>
				<div class="cs-hero-meta-item pt-5 border-t border-neutral-100">
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
		<div class="grid grid-cols-3 border-t border-b border-neutral-200 mt-12">

			<!-- Business Impact — list of 2 key outcomes -->
			<div class="cs-hero-ledger-cell py-7 pr-4 md:pr-8 border-r border-neutral-200">
				<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">Business Impact</span>
				<div class="flex flex-col gap-0.5">
					<span class="text-sm md:text-base font-black text-neutral-900 tracking-tight">+47% Conversions</span>
					<span class="text-sm md:text-base font-black text-neutral-900 tracking-tight">−37% Bounce Rate</span>
				</div>
			</div>

			<!-- Smush growth — before/after -->
			<div class="cs-hero-ledger-cell py-7 px-3 md:px-8 border-r border-neutral-200">
				<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">Smush Installs</span>
				<div class="flex items-baseline gap-1.5 leading-none flex-wrap">
					<span class="text-lg md:text-xl font-black text-neutral-300 tracking-tight line-through decoration-portfolio-error">1M</span>
					<span class="text-portfolio-accent font-black text-sm md:text-base leading-none">→</span>
					<span class="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">2M+</span>
				</div>
			</div>

			<!-- Plugins redesigned — list of 3 -->
			<div class="cs-hero-ledger-cell py-7 pl-3 md:pl-8">
				<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">Plugins Redesigned</span>
				<div class="flex flex-col gap-0.5">
					<span class="text-sm md:text-base font-black text-neutral-900 tracking-tight">Smush</span>
					<span class="text-sm md:text-base font-black text-neutral-900 tracking-tight">Hummingbird</span>
					<span class="text-sm md:text-base font-black text-neutral-900 tracking-tight">Snapshot</span>
				</div>
			</div>

		</div>

		<!-- Description + tags -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10">
			<div class="md:col-span-2">
				<p class="cs-hero-desc text-xl md:text-2xl text-neutral-500 leading-relaxed">{description}</p>
			</div>
			<div class="cs-hero-tags flex flex-wrap gap-2 content-start pt-1">
				{#each tags as tag}
					<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase bg-neutral-100 border border-neutral-200 text-neutral-600">{tag}</span>
				{/each}
			</div>
		</div>

	</div>
</section>
