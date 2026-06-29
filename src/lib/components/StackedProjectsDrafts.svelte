<script lang="ts">
	import { projects } from '$lib/data/projects';
	import { ArrowRight } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	const featuredSlugs = ['ideajam-kanban-saas', 'eclectic-app-design', 'themeisle-starter-templates'];
	const stackedProjects = projects.filter(p => featuredSlugs.includes(p.slug));

	const draftMeta = [
		{
			hookStat: '−68%',
			hookLabel: 'Task Steps Reduced',
			accent: '#e0533c',
			accentDim: 'rgba(224,83,60,0.1)',
			pills: ['White-label ready', '4→2 click flow', 'Zero onboarding'],
			year: '2024',
			role: 'UI/UX Designer',
		},
		{
			hookStat: '3×',
			hookLabel: 'Regional Markets',
			accent: '#14b8a6',
			accentDim: 'rgba(20,184,166,0.1)',
			pills: ['AI asset pipeline', 'Mobile-first DLS', 'Rapid publish'],
			year: '2024',
			role: 'Product Designer',
		},
		{
			hookStat: '50+',
			hookLabel: 'Sites Shipped',
			accent: '#3b82f6',
			accentDim: 'rgba(59,130,246,0.1)',
			pills: ['300K+ user reach', 'Dual block system', '4-day delivery'],
			year: '2023',
			role: 'WordPress Specialist',
		},
	];

	let activeTab = $state(0);

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Draft B: sticky scroll-stack animation
		const cards = gsap.utils.toArray<HTMLElement>('.draft-b-card');
		cards.forEach((card, i) => {
			if (i === cards.length - 1) return;
			const next = cards[i + 1];
			const overlay = card.querySelector<HTMLElement>('.draft-b-overlay');
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: next,
					start: 'top 75%',
					end: () => `top ${100 + (i + 1) * 24}px`,
					scrub: true,
					invalidateOnRefresh: true,
				},
			});
			tl.to(card, { scale: 0.95 - i * 0.01, rotateX: 7, yPercent: -3, transformOrigin: 'top center', ease: 'none' }, 0);
			if (overlay) tl.to(overlay, { opacity: 0.5, ease: 'none' }, 0);
		});
	});

	function animateStats() {
		const els = document.querySelectorAll<HTMLElement>('.draft-c-stat');
		if (!els.length) return;
		gsap.fromTo(els,
			{ y: 16, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.4, stagger: 0.07, ease: 'power2.out' }
		);
	}

	function setTab(i: number) {
		activeTab = i;
		setTimeout(animateStats, 30);
	}
</script>

<!-- ─── Section intro label ─────────────────────────────────────────────── -->
<div class="bg-neutral-100 border-t border-b border-neutral-200/80 px-6 py-5">
	<div class="max-w-[1320px] mx-auto flex flex-col sm:flex-row sm:items-center gap-4">
		<div class="flex items-center gap-3">
			<div class="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse"></div>
			<span class="text-[9px] font-mono tracking-[0.4em] text-neutral-500 uppercase">Alternative approaches — pick one to ship</span>
		</div>
		<div class="h-px flex-1 bg-neutral-200 hidden sm:block"></div>
		<div class="flex gap-2">
			<span class="px-3 py-1 rounded-md bg-neutral-200 text-[9px] font-mono text-neutral-600 uppercase tracking-wider">A · Ledger</span>
			<span class="px-3 py-1 rounded-md bg-neutral-200 text-[9px] font-mono text-neutral-600 uppercase tracking-wider">B · Cascade</span>
			<span class="px-3 py-1 rounded-md bg-neutral-200 text-[9px] font-mono text-neutral-600 uppercase tracking-wider">C · Ticker</span>
		</div>
	</div>
</div>

<!-- ══════════════════════════════════════════════════════════════════════════
     DRAFT A — Impact Ledger
     Horizontal rows · light bg · stats as inline pills · typography-led · no image
     ════════════════════════════════════════════════════════════════════════ -->
<section class="bg-[#f4f4f6] py-24 px-6">
	<div class="max-w-[1320px] mx-auto">

		<div class="flex items-center gap-4 mb-16">
			<div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-neutral-200 shadow-sm">
				<span class="w-1.5 h-1.5 rounded-full bg-neutral-800 block"></span>
				<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase">Draft A — Impact Ledger</span>
			</div>
			<div class="h-px flex-1 bg-neutral-200"></div>
			<span class="text-[9px] font-mono text-neutral-400 hidden sm:block">Horizontal · stats as pills · no image</span>
		</div>

		<div class="divide-y divide-neutral-200/60">
			{#each stackedProjects as project, i}
				{@const meta = draftMeta[i]}
				<a
					href="/work/{project.slug}"
					class="draft-a-row group flex flex-col md:flex-row md:items-center gap-5 md:gap-10 py-10 relative overflow-hidden transition-all duration-200 hover:bg-white/70 px-5 -mx-5 rounded-2xl"
				>
					<!-- Accent bar -->
					<div
						class="absolute left-0 top-4 bottom-4 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
						style="background: {meta.accent};"
					></div>

					<!-- Counter -->
					<span class="shrink-0 text-[10px] font-mono text-neutral-400 group-hover:text-neutral-700 transition-colors w-6">0{i+1}</span>

					<!-- Title + role -->
					<div class="flex-1 min-w-0">
						<h3 class="text-2xl md:text-[2rem] font-black tracking-tight text-neutral-900 leading-none mb-1.5">{project.title}</h3>
						<p class="text-xs font-mono text-neutral-400">{meta.role} · {meta.year}</p>
					</div>

					<!-- Impact indicators -->
					<div class="flex flex-wrap gap-2 md:max-w-[460px]">
						<span
							class="px-4 py-2 rounded-full text-sm font-black shrink-0"
							style="color: {meta.accent}; background: {meta.accentDim};"
						>{meta.hookStat} {meta.hookLabel}</span>
						{#each meta.pills as pill}
							<span class="px-3 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-[10px] font-mono text-neutral-500">{pill}</span>
						{/each}
					</div>

					<!-- Arrow CTA -->
					<div class="shrink-0 w-10 h-10 rounded-full border-2 border-neutral-200 flex items-center justify-center group-hover:border-neutral-900 group-hover:bg-neutral-900 transition-all duration-300 md:ml-2">
						<ArrowRight class="size-4 text-neutral-400 group-hover:text-white transition-colors" />
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- ══════════════════════════════════════════════════════════════════════════
     DRAFT B — Stat Cascade
     Scroll-sticky stacking · dark bg · giant stat as right-half anchor · no image
     ════════════════════════════════════════════════════════════════════════ -->
<section class="bg-[#080809] py-24 px-6 border-t border-white/5">
	<div class="max-w-[1320px] mx-auto" style="perspective: 1800px;">

		<div class="flex items-center gap-4 mb-16">
			<div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
				<span class="w-1.5 h-1.5 rounded-full bg-white/40 block"></span>
				<span class="text-[9px] font-mono tracking-[0.3em] text-white/40 uppercase">Draft B — Stat Cascade</span>
			</div>
			<div class="h-px flex-1 bg-white/5"></div>
			<span class="text-[9px] font-mono text-white/20 hidden sm:block">Sticky stack · stat-dominant · no image</span>
		</div>

		{#each stackedProjects as project, i}
			{@const meta = draftMeta[i]}
			<div
				class="draft-b-card relative rounded-[2.5rem] border border-white/10 mb-[20vh] lg:mb-[32vh] grid grid-cols-1 lg:grid-cols-[1fr_300px] items-stretch overflow-hidden"
				style="--card-idx: {i}; z-index: {i + 10}; background: #0e0e10;"
			>
				<!-- Stacking overlay -->
				<div class="draft-b-overlay absolute inset-0 rounded-[2.5rem] bg-black pointer-events-none z-20 opacity-0"></div>

				<!-- Ambient glow -->
				<div
					class="absolute -right-48 -top-48 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none"
					style="background: {meta.accent}; opacity: 0.07;"
				></div>

				<!-- Left: editorial content -->
				<div class="relative z-10 p-10 md:p-14 flex flex-col gap-8 border-r border-white/5">
					<div>
						<span class="text-[9px] font-mono tracking-[0.3em] text-white/25 uppercase block mb-5">
							0{i+1} of 03 · {meta.role} · {meta.year}
						</span>
						<h3 class="text-4xl lg:text-[3.2rem] font-black tracking-tight text-white leading-[1.0] mb-5">{project.title}</h3>
						<p class="text-base text-white/45 leading-relaxed max-w-[48ch]">{project.description}</p>
					</div>
					<div class="flex flex-wrap gap-2">
						{#each meta.pills as pill}
							<span
								class="px-3 py-1.5 rounded-full text-[10px] font-mono border"
								style="color: {meta.accent}; border-color: {meta.accent}25; background: {meta.accentDim};"
							>{pill}</span>
						{/each}
					</div>
					<div>
						<a
							href="/work/{project.slug}"
							class="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold text-white border border-white/10 hover:border-white/30 transition-all duration-300"
						>
							Explore Case <ArrowRight class="size-4" />
						</a>
					</div>
				</div>

				<!-- Right: hook stat panel -->
				<div class="relative z-10 p-10 md:p-14 flex flex-col items-center justify-center text-center">
					<p
						class="text-[clamp(4rem,10vw,8.5rem)] font-black tracking-tighter leading-none"
						style="color: {meta.accent}; filter: drop-shadow(0 0 50px {meta.accent}60);"
					>{meta.hookStat}</p>
					<p class="text-xs font-mono tracking-[0.25em] text-white/30 uppercase mt-3 max-w-[14ch] leading-relaxed">{meta.hookLabel}</p>
				</div>
			</div>
		{/each}

		<div class="draft-b-sentinel h-1 pointer-events-none mt-[8vh]"></div>
	</div>
</section>

<!-- ══════════════════════════════════════════════════════════════════════════
     DRAFT C — Case Ticker
     Tab selector · dark surface · animated metric reveal on switch
     ════════════════════════════════════════════════════════════════════════ -->
<section class="bg-[#0a0a0b] py-24 px-6 border-t border-white/5">
	<div class="max-w-[1320px] mx-auto">

		<div class="flex items-center gap-4 mb-16">
			<div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
				<span class="w-1.5 h-1.5 rounded-full bg-white/40 block"></span>
				<span class="text-[9px] font-mono tracking-[0.3em] text-white/40 uppercase">Draft C — Case Ticker</span>
			</div>
			<div class="h-px flex-1 bg-white/5"></div>
			<span class="text-[9px] font-mono text-white/20 hidden sm:block">Tab panel · animated metric reveal</span>
		</div>

		<!-- Tab selector -->
		<div class="flex gap-1 mb-8 p-1 bg-white/[0.03] border border-white/5 rounded-2xl w-fit">
			{#each stackedProjects as project, i}
				{@const meta = draftMeta[i]}
				<button
					onclick={() => setTab(i)}
					class="relative px-5 py-2.5 rounded-xl text-[10px] font-mono tracking-wider uppercase transition-all duration-300 {activeTab === i ? 'text-white' : 'text-white/25 hover:text-white/50'}"
				>
					{#if activeTab === i}
						<div
							class="absolute inset-0 rounded-xl border"
							style="background: {meta.accentDim}; border-color: {meta.accent}25;"
						></div>
					{/if}
					<span class="relative z-10">0{i+1} {project.title.split(' ')[0]}</span>
				</button>
			{/each}
		</div>

		<!-- Active panel -->
		{#each stackedProjects as project, i}
			{#if activeTab === i}
				{@const meta = draftMeta[i]}
				<div
					class="grid grid-cols-1 lg:grid-cols-2 rounded-[2.5rem] border border-white/5 overflow-hidden relative"
					style="background: #0e0e11;"
				>
					<!-- Ambient -->
					<div
						class="absolute -left-48 -bottom-48 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-10"
						style="background: {meta.accent};"
					></div>

					<!-- Left: editorial -->
					<div class="relative z-10 p-10 md:p-14 flex flex-col justify-between">
						<div>
							<span class="text-[9px] font-mono tracking-[0.3em] text-white/25 uppercase block mb-5">
								0{i+1} · {meta.role} · {meta.year}
							</span>
							<h3 class="text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.05] mb-6">{project.title}</h3>
							<p class="text-base text-white/45 leading-relaxed mb-8">{project.description}</p>
							<div class="flex flex-wrap gap-2">
								{#each project.tags as tag}
									<span class="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-white/30">{tag}</span>
								{/each}
							</div>
						</div>
						<div class="mt-10">
							<a
								href="/work/{project.slug}"
								class="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold text-white border border-white/10 hover:border-white/30 transition-all duration-300 w-fit"
							>
								Explore Case <ArrowRight class="size-4" />
							</a>
						</div>
					</div>

					<!-- Right: metrics -->
					<div class="relative z-10 p-10 md:p-14 border-t border-white/5 lg:border-t-0 lg:border-l lg:border-white/5 flex flex-col justify-center gap-10">
						<!-- Hook stat -->
						<div class="draft-c-stat">
							<p
								class="text-[clamp(3.5rem,8vw,7rem)] font-black tracking-tighter leading-none"
								style="color: {meta.accent};"
							>{meta.hookStat}</p>
							<p class="text-xs font-mono tracking-[0.25em] text-white/30 uppercase mt-2">{meta.hookLabel}</p>
						</div>

						<!-- Secondary metrics -->
						<div class="border-t border-white/5 pt-8 space-y-4">
							{#each meta.pills as pill}
								<div class="draft-c-stat flex items-center gap-3">
									<div
										class="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
										style="background: {meta.accentDim};"
									>
										<div class="w-1.5 h-1.5 rounded-full" style="background: {meta.accent};"></div>
									</div>
									<span class="text-sm text-white/55 font-medium">{pill}</span>
								</div>
							{/each}
						</div>
					</div>
				</div>
			{/if}
		{/each}

	</div>
</section>

<style>
	.draft-b-card {
		position: sticky;
		top: calc(100px + var(--card-idx, 0) * 24px);
		will-change: transform;
		transform-style: preserve-3d;
	}

	@media (min-width: 1024px) {
		.draft-b-card {
			top: calc(100px + var(--card-idx, 0) * 24px);
		}
	}
</style>
