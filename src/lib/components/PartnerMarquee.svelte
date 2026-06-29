<section
	data-theme="light"
	class="py-20 overflow-hidden border-y border-neutral-200/50 bg-[#f4f4f6] flex flex-col items-center"
>
	<!-- Animated Stroke Pill -->
	<div
		class="mb-12 relative z-20 inline-flex items-center justify-center p-[1.5px] rounded-full overflow-hidden shadow-sm bg-neutral-200"
	>
		<div
			class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,#D1D5DB_360deg)]"
		></div>
		<div
			class="relative h-full w-full items-center justify-center rounded-full bg-white px-5 py-2 flex text-[10px] font-mono tracking-widest text-gray-500 uppercase z-10"
		>
			Proud to work with
		</div>
	</div>

	<!-- GPU-Accelerated Marquee Track -->
	<div class="w-full flex overflow-hidden select-none pointer-events-none">
		<div class="flex w-max animate-gpu-marquee">
			<!-- Group 1 -->
			<div
				class="flex shrink-0 items-center justify-around gap-16 px-8 min-w-[100vw]"
			>
				<span class="text-xl md:text-2xl font-semibold text-neutral-700"
					>WPMU DEV</span
				>
				<span class="text-primary text-sm">●</span>
				<span class="text-xl md:text-2xl font-semibold text-neutral-700"
					>Themeisle</span
				>
				<span class="text-primary text-sm">●</span>
				<span class="text-xl md:text-2xl font-semibold text-neutral-700"
					>Searchmetrics</span
				>
				<span class="text-primary text-sm">●</span>
				<span class="text-xl md:text-2xl font-semibold text-neutral-700"
					>Ideajam</span
				>
				<span class="text-primary text-sm">●</span>
			</div>
			<!-- Group 2 (aria-hidden duplicate for seamless loop) -->
			<div
				class="flex shrink-0 items-center justify-around gap-16 px-8 min-w-[100vw]"
				aria-hidden="true"
			>
				<span class="text-xl md:text-2xl font-semibold text-neutral-700"
					>WPMU DEV</span
				>
				<span class="text-primary text-sm">●</span>
				<span class="text-xl md:text-2xl font-semibold text-neutral-700"
					>Themeisle</span
				>
				<span class="text-primary text-sm">●</span>
				<span class="text-xl md:text-2xl font-semibold text-neutral-700"
					>Searchmetrics</span
				>
				<span class="text-primary text-sm">●</span>
				<span class="text-xl md:text-2xl font-semibold text-neutral-700"
					>Ideajam</span
				>
				<span class="text-primary text-sm">●</span>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes gpu-marquee {
		0% {
			transform: translate3d(0, 0, 0);
		}
		100% {
			transform: translate3d(-50%, 0, 0);
		}
	}
	.animate-gpu-marquee {
		animation: gpu-marquee 30s linear infinite;
		will-change: transform;
	}
</style>
