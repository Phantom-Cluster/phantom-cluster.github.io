<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	interface Stat {
		label: string;
		value: string;
		accent?: boolean;
		html?: boolean;
	}

	interface Props {
		prevNum: string;
		prevName: string;
		prevIconSvg: string;
		nextNum: string;
		nextName: string;
		nextIconSvg: string;
		nextDescriptor: string;
		nextShadow?: string;
		stats: [Stat, Stat, Stat];
	}

	let {
		prevNum, prevName, prevIconSvg,
		nextNum, nextName, nextIconSvg,
		nextDescriptor,
		nextShadow = 'drop-shadow(0 12px 28px rgba(0,0,0,0.15))',
		stats
	}: Props = $props();

	let sectionEl: HTMLElement;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (rm) return;

		const strip    = sectionEl.querySelector<HTMLElement>('.pt-strip');
		const iconWrap = sectionEl.querySelector<HTMLElement>('.pt-icon');
		const eyebrow  = sectionEl.querySelector<HTMLElement>('.pt-eyebrow');
		const heading  = sectionEl.querySelector<HTMLElement>('.pt-heading');
		const desc     = sectionEl.querySelector<HTMLElement>('.pt-desc');
		const rows     = sectionEl.querySelectorAll<HTMLElement>('.pt-stat-row');

		if (strip)    gsap.set(strip,    { opacity: 0, y: 10 });
		if (iconWrap) gsap.set(iconWrap, { opacity: 0, scale: 0.88 });
		if (eyebrow)  gsap.set(eyebrow,  { opacity: 0, y: 12 });
		if (heading)  gsap.set(heading,  { opacity: 0, y: 22 });
		if (desc)     gsap.set(desc,     { opacity: 0, y: 16 });
		rows.forEach(r => gsap.set(r, { opacity: 0, x: 16 }));

		const tl = gsap.timeline({
			scrollTrigger: { trigger: sectionEl, start: 'top 78%', once: true },
		});

		if (strip)    tl.to(strip,    { opacity: 1, y: 0,     duration: 0.45, ease: 'power2.out' });
		if (iconWrap) tl.to(iconWrap, { opacity: 1, scale: 1, duration: 0.5,  ease: 'back.out(1.4)' }, '-=0.25');
		if (eyebrow)  tl.to(eyebrow,  { opacity: 1, y: 0,     duration: 0.4,  ease: 'power2.out' }, '-=0.3');
		if (heading)  tl.to(heading,  { opacity: 1, y: 0,     duration: 0.6,  ease: 'power3.out' }, '-=0.3');
		if (desc)     tl.to(desc,     { opacity: 1, y: 0,     duration: 0.5,  ease: 'power2.out' }, '-=0.35');
		if (rows.length) tl.to(rows,  { opacity: 1, x: 0,     duration: 0.45, stagger: 0.09, ease: 'power3.out' }, '-=0.4');

		return () => ScrollTrigger.getAll().forEach(t => {
			if (t.vars.trigger === sectionEl) t.kill();
		});
	});
</script>

<style>
	.full-bleed {
		width: 100vw;
		position: relative;
		left: 50%;
		right: 50%;
		margin-left: -50vw;
		margin-right: -50vw;
	}
</style>

<div class="full-bleed bg-neutral-950" data-theme="dark">
	<section
		bind:this={sectionEl}
		class="max-w-7xl mx-auto px-4 md:px-6 pt-12 pb-16 md:pb-20 relative overflow-hidden"
		aria-label="Chapter transition: {prevName} complete, entering {nextName}">

		<!-- Ghost chapter numeral — left-anchored texture -->
		<span
			class="absolute -left-8 top-1/2 -translate-y-1/2 text-[clamp(14rem,40vw,36rem)] font-black text-white/4 leading-none select-none pointer-events-none tracking-tighter"
			aria-hidden="true">{nextNum}</span>

		<!-- Progress strip -->
		<div class="pt-strip flex items-center gap-3 mb-14 relative">
			<div class="flex items-center gap-2.5 opacity-35 shrink-0">
				<div class="w-4 h-4 shrink-0 [&>svg]:w-full [&>svg]:h-full">{@html prevIconSvg}</div>
				<span class="text-[9px] font-mono tracking-[0.28em] text-neutral-400 uppercase hidden sm:block">{prevNum} — {prevName}</span>
				<svg class="w-2.5 h-2.5 text-neutral-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
				</svg>
			</div>
			<div class="flex-1 h-px bg-white/10" aria-hidden="true"></div>
			<div class="flex items-center gap-2 shrink-0">
				<span class="w-1 h-1 rounded-full bg-portfolio-accent-vivid animate-pulse" aria-hidden="true"></span>
				<span class="text-[9px] font-mono tracking-[0.28em] text-portfolio-accent-vivid uppercase">{nextNum} — {nextName}</span>
			</div>
		</div>

		<!-- Two-column: identity left, stats right -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 relative">

			<!-- Left: icon + name + descriptor -->
			<div class="flex flex-col justify-center gap-6">
				<div class="flex items-center gap-5">
					<div
						class="pt-icon w-14 h-14 shrink-0 [&>svg]:w-full [&>svg]:h-full"
						style="filter: {nextShadow};"
						aria-hidden="true">{@html nextIconSvg}</div>
					<div>
						<p class="pt-eyebrow text-[10px] font-mono tracking-[0.4em] text-neutral-500 uppercase mb-1">Next Chapter</p>
						<h2 class="pt-heading text-[clamp(2rem,5vw,3.5rem)] font-black text-white tracking-tight leading-none">{nextName}</h2>
					</div>
				</div>
				<p class="pt-desc text-base text-neutral-400 leading-relaxed max-w-sm">
					{nextDescriptor}
				</p>
			</div>

			<!-- Right: 3-row stat ledger -->
			<div class="flex flex-col self-center">
				{#each stats as stat}
					<div class="pt-stat-row flex items-baseline justify-between py-5 border-b border-white/6 last:border-b-0">
						<span class="text-[10px] font-mono tracking-[0.22em] text-neutral-500 uppercase">{stat.label}</span>
						{#if stat.html}
							<span class="text-xl font-black text-white tracking-tight">{@html stat.value}</span>
						{:else}
							<span class="text-xl font-black tracking-tight {stat.accent ? 'text-portfolio-success' : 'text-white'}">{stat.value}</span>
						{/if}
					</div>
				{/each}
			</div>

		</div>

	</section>
</div>
