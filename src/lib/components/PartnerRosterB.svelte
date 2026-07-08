<script lang="ts">
	import Chip from '$lib/components/Chip.svelte';

	const companies = [
		'WPMU DEV', 'Themeisle', 'Ideajam', 'Eclectic', 'Searchmetrics', 'SomeTechWork',
		'WPMU DEV', 'Themeisle', 'Ideajam', 'Eclectic', 'Searchmetrics', 'SomeTechWork',
	];

	const stats = [
		{ value: '6',   label: 'Production Teams' },
		{ value: '7+',  label: 'Years Experience' },
		{ value: '2M+', label: 'Users Impacted' },
		{ value: '98%', label: 'Client Retention' },
	];
</script>

<!-- ─── DRAFT B: Single marquee + stat chips ──────────────────────────────────── -->
<section data-draft="B" class="py-16 sm:py-24 lg:py-28 bg-[#111] border-t-4 border-dashed border-orange-400">

	<!-- Draft label -->
	<div class="max-w-[1320px] mx-auto px-6 mb-2">
		<span class="text-[10px] font-mono tracking-widest text-orange-400 uppercase bg-orange-400/10 px-3 py-1 rounded-full">Draft — Option B: Marquee + Stats</span>
	</div>

	<!-- Header row -->
	<div class="max-w-[1320px] mx-auto px-6 mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
		<div>
			<Chip theme="dark" spin="glow" class="mb-6" innerClass="px-6 py-2">
				<span class="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">Trusted By</span>
			</Chip>
			<h2 class="text-4xl sm:text-5xl font-black tracking-tight text-white leading-[1.0] mt-2">
				Teams that shipped.<br/>
				<span class="text-white/30">I was in the room.</span>
			</h2>
		</div>
	</div>

	<!-- Bordered marquee container -->
	<div
		class="border-y border-white/10 py-6 overflow-hidden select-none relative"
		style="mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
		       -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);"
	>
		<div class="marquee-rostb-single flex items-center gap-16 whitespace-nowrap">
			{#each companies as name}
				<span class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white/80">{name}</span>
				<span class="shrink-0 text-white/20 text-3xl font-thin">·</span>
			{/each}
		</div>
	</div>

	<!-- Stat chips grid -->
	<div class="max-w-[1320px] mx-auto px-6 mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
		{#each stats as stat}
			<div class="border border-white/10 rounded-2xl px-6 py-5 bg-white/[0.03] flex flex-col gap-1">
				<span class="text-3xl font-black tracking-tight text-white">{stat.value}</span>
				<span class="text-[10px] font-mono text-white/35 uppercase tracking-widest">{stat.label}</span>
			</div>
		{/each}
	</div>
</section>

<style>
	.marquee-rostb-single {
		animation: rostb-scroll 32s linear infinite;
		will-change: transform;
	}

	@keyframes rostb-scroll {
		from { transform: translateX(0); }
		to   { transform: translateX(-50%); }
	}

	@media (prefers-reduced-motion: reduce) {
		.marquee-rostb-single { animation: none; }
	}
</style>
