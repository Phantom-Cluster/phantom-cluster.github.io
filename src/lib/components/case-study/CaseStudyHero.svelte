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
		gsap.from('.cs-hero-element', {
			y: 40,
			opacity: 0,
			duration: 0.9,
			stagger: 0.12,
			ease: 'power3.out'
		});
	});
</script>

<!-- bg-white here is intentional — prevents the GSAP dark-stage bleed from inverting hero text -->
<section class="w-full bg-white px-6 pt-[160px] md:pt-[180px] pb-28 min-h-screen flex flex-col justify-center">
	<div class="max-w-6xl mx-auto w-full">

		<!-- Top meta strip -->
		<div class="flex items-center justify-between border-b border-neutral-200 pb-5 mb-12 cs-hero-element">
			<div class="inline-flex overflow-hidden rounded-full p-px relative">
				<div class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,#f53500_360deg)]"></div>
				<div class="inline-flex h-full w-full items-center justify-center rounded-full bg-white/80 backdrop-blur-sm px-5 py-2 relative z-10">
					<span class="text-[11px] font-mono tracking-widest text-neutral-500 uppercase">Case Study — Dashboard &amp; Plugin Suite</span>
				</div>
			</div>
			<span class="text-[11px] font-mono tracking-widest text-neutral-400 uppercase hidden sm:block">May 2022 — Sep 2024</span>
		</div>

		<!-- Main split: giant title left / meta right -->
		<div class="flex items-start gap-10 cs-hero-element">

			<!-- Display title -->
			<div class="flex-1 min-w-0">
				<p class="text-[11px] font-mono tracking-[0.35em] uppercase text-neutral-400 mb-5">WPMU DEV</p>
				<h1 class="text-[clamp(3rem,8vw,7.5rem)] font-black tracking-tight leading-[0.9] text-neutral-900">
					Plugin Suite<br/>
					<span class="text-neutral-300">&amp;&nbsp;Dashboard</span><br/>
					Overhaul.
				</h1>

				<!-- Product chips — the 6 products touched -->
				<div class="flex flex-wrap gap-2 mt-8">
					{#each ['Smush', 'Hummingbird', 'Snapshot', 'SmartCrawl', 'Beehive', 'Dashboard'] as product}
						<span class="px-3 py-1 rounded-full bg-neutral-50 border border-neutral-200 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">{product}</span>
					{/each}
				</div>
			</div>

			<!-- Right meta column — visible md+ -->
			<div class="shrink-0 w-56 hidden md:flex flex-col gap-6 pt-14">
				<div>
					<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Role</span>
					<span class="text-sm font-semibold text-neutral-800">{role}</span>
				</div>
				<div>
					<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Platform</span>
					<span class="text-sm font-semibold text-neutral-800">SaaS / WordPress</span>
				</div>
				<div>
					<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Products</span>
					<span class="text-sm font-semibold text-neutral-800">6 Plugins + Dashboard</span>
				</div>
				<div>
					<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-1.5">Design System</span>
					<span class="text-sm font-semibold text-neutral-800">SUI 3 Atomic</span>
				</div>
				<div class="pt-5 border-t border-neutral-100">
					<div class="flex items-center gap-2 text-[#FF4400]">
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

			<!-- Smush growth -->
			<div class="py-7 pr-4 md:pr-8 border-r border-neutral-200">
				<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">Smush Installs</span>
				<div class="flex items-baseline gap-1.5 leading-none flex-wrap">
					<span class="text-lg md:text-xl font-black text-neutral-300 tracking-tight line-through decoration-[#FF4400]/60">1M</span>
					<span class="text-[#FF4400] font-black text-sm md:text-base leading-none">→</span>
					<span class="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">2M+</span>
				</div>
			</div>

			<!-- Hummingbird perf -->
			<div class="py-7 px-3 md:px-8 border-r border-neutral-200">
				<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">Page Load Speed</span>
				<div class="flex items-baseline gap-1 leading-none flex-wrap">
					<span class="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">75%</span>
					<span class="text-xs md:text-sm font-semibold text-neutral-400 leading-none">Faster</span>
				</div>
			</div>

			<!-- Design system scope -->
			<div class="py-7 pl-3 md:pl-8">
				<span class="text-[9px] font-mono tracking-[0.22em] text-neutral-400 uppercase block mb-2">Plugins Unified</span>
				<div class="flex items-baseline gap-1 leading-none flex-wrap">
					<span class="text-xl md:text-2xl font-black text-[#FF4400] tracking-tight">6+</span>
					<span class="text-xs md:text-sm font-semibold text-neutral-400 leading-none">under SUI&nbsp;3</span>
				</div>
			</div>

		</div>

		<!-- Description + tags -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10 cs-hero-element">
			<div class="md:col-span-2">
				<p class="text-xl md:text-2xl text-neutral-500 leading-relaxed">{description}</p>
			</div>
			<div class="flex flex-wrap gap-2 content-start pt-1">
				{#each tags as tag}
					<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase bg-neutral-100 border border-neutral-200 text-neutral-600">{tag}</span>
				{/each}
			</div>
		</div>

	</div>
</section>
