<script lang="ts">
	import Chip from '$lib/components/Chip.svelte';

	const companies = [
		{ name: 'WPMU DEV',      role: 'Product Design',     years: '2018–2025' },
		{ name: 'Themeisle',     role: 'Template Design',    years: '2023' },
		{ name: 'Ideajam',       role: 'UI/UX Design',       years: '2022' },
		{ name: 'Eclectic',      role: 'Product Design',     years: '2022' },
		{ name: 'Searchmetrics', role: 'Brand & Motion',     years: '2021' },
		{ name: 'SomeTechWork',  role: 'Product & Frontend', years: '2020' },
	];

	const roles = companies.map(c => c.role);
</script>

<!-- ─── DRAFT A: Dual opposing marquees ─────────────────────────────────────── -->
<section data-draft="A" class="py-16 sm:py-24 lg:py-28 bg-[#f4f4f6] border-t-4 border-dashed border-blue-400">

	<!-- Draft label -->
	<div class="max-w-[1320px] mx-auto px-6 mb-2">
		<span class="text-[10px] font-mono tracking-widest text-blue-500 uppercase bg-blue-100 px-3 py-1 rounded-full">Draft — Option A: Dual Marquee</span>
	</div>

	<!-- Header -->
	<div class="max-w-[1320px] mx-auto px-6 mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
		<div>
			<Chip theme="light" spin="always" class="mb-6" innerClass="px-6 py-2">
				<span class="text-[11px] font-mono tracking-widest text-neutral-500 uppercase">Client Work</span>
			</Chip>
			<h2 class="text-4xl sm:text-5xl font-black tracking-tight text-black leading-[1.0] mt-2">
				Embedded in teams.<br/>
				<span class="text-black/35">Not just handing off screens.</span>
			</h2>
		</div>
		<p class="text-sm text-gray-500 leading-relaxed max-w-[26ch] md:text-right shrink-0">
			6 production teams · 7+ years<br/>Product, Design &amp; Frontend
		</p>
	</div>

	<!-- Dual marquee tracks with edge fade -->
	<div
		class="relative overflow-hidden select-none"
		style="mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
		       -webkit-mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);"
	>
		<!-- Track 1 — company names, scrolls left -->
		<div class="flex mb-4 py-3 border-y border-black/8">
			<div class="marquee-rosta flex items-center gap-10 whitespace-nowrap">
				{#each [...companies, ...companies] as c}
					<span class="text-2xl md:text-3xl font-black tracking-tight text-black">{c.name}</span>
					<span class="w-1.5 h-1.5 rounded-full bg-black/25 shrink-0"></span>
				{/each}
			</div>
		</div>

		<!-- Track 2 — roles, scrolls right (reverse) -->
		<div class="flex py-3 border-b border-black/8">
			<div class="marquee-rostb flex items-center gap-10 whitespace-nowrap">
				{#each [...roles, ...roles] as role}
					<span class="text-2xl md:text-3xl font-black tracking-tight text-black/25">{role}</span>
					<span class="w-1.5 h-1.5 rounded-full bg-black/15 shrink-0"></span>
				{/each}
			</div>
		</div>
	</div>

	<!-- Bottom stat strip -->
	<div class="max-w-[1320px] mx-auto px-6 mt-12 flex flex-wrap gap-x-12 gap-y-4">
		<div class="flex items-baseline gap-2">
			<span class="text-4xl font-black tracking-tighter text-black">6</span>
			<span class="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Production Teams</span>
		</div>
		<div class="flex items-baseline gap-2">
			<span class="text-4xl font-black tracking-tighter text-black">7+</span>
			<span class="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Years</span>
		</div>
		<div class="flex items-baseline gap-2">
			<span class="text-4xl font-black tracking-tighter text-black">2M+</span>
			<span class="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Users Impacted</span>
		</div>
	</div>
</section>

<style>
	/* Track 1: scroll left — GPU transform only */
	.marquee-rosta {
		animation: rosta-left 28s linear infinite;
		will-change: transform;
	}

	/* Track 2: scroll right — reverse direction, slightly slower */
	.marquee-rostb {
		animation: rosta-right 36s linear infinite;
		will-change: transform;
	}

	@keyframes rosta-left {
		from { transform: translateX(0); }
		to   { transform: translateX(-50%); }
	}

	@keyframes rosta-right {
		from { transform: translateX(-50%); }
		to   { transform: translateX(0); }
	}

	@media (prefers-reduced-motion: reduce) {
		.marquee-rosta,
		.marquee-rostb { animation: none; }
	}
</style>
