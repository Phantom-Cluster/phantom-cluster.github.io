<section
	data-theme="light"
	class="py-20 overflow-hidden border-y border-neutral-200/50 bg-[#f4f4f6] flex flex-col items-center"
>
	<!-- Animated Stroke Pill -->
	<div class="mb-12 relative inline-flex overflow-hidden rounded-full p-[1px]">
		<span class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#f4f4f6_0%,#FF4400_50%,#f4f4f6_100%)]"></span>
		<div class="inline-flex h-full w-full items-center justify-center rounded-full bg-[#f4f4f6] px-6 py-2 text-[10px] font-mono tracking-widest text-gray-500 uppercase z-10">
			Proud to work with
		</div>
	</div>

	<!-- GPU-Accelerated Marquee Track -->
	<div class="w-full flex overflow-hidden select-none pointer-events-none">
		<div class="flex w-max animate-gpu-marquee">
			<!-- Group 1 -->
			<div class="flex shrink-0 items-center justify-around gap-16 px-8 min-w-[100vw]">
				<span class="text-xl md:text-2xl font-semibold text-neutral-700">WPMU DEV</span>
				<span class="text-[#FF4400] text-sm">●</span>
				<span class="text-xl md:text-2xl font-semibold text-neutral-700">Themeisle</span>
				<span class="text-[#FF4400] text-sm">●</span>
				<span class="text-xl md:text-2xl font-semibold text-neutral-700">Searchmetrics</span>
				<span class="text-[#FF4400] text-sm">●</span>
				<span class="text-xl md:text-2xl font-semibold text-neutral-700">Ideajam</span>
				<span class="text-[#FF4400] text-sm">●</span>
			</div>
			<!-- Group 2 (aria-hidden duplicate for seamless loop) -->
			<div class="flex shrink-0 items-center justify-around gap-16 px-8 min-w-[100vw]" aria-hidden="true">
				<span class="text-xl md:text-2xl font-semibold text-neutral-700">WPMU DEV</span>
				<span class="text-[#FF4400] text-sm">●</span>
				<span class="text-xl md:text-2xl font-semibold text-neutral-700">Themeisle</span>
				<span class="text-[#FF4400] text-sm">●</span>
				<span class="text-xl md:text-2xl font-semibold text-neutral-700">Searchmetrics</span>
				<span class="text-[#FF4400] text-sm">●</span>
				<span class="text-xl md:text-2xl font-semibold text-neutral-700">Ideajam</span>
				<span class="text-[#FF4400] text-sm">●</span>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes gpu-marquee {
		0%   { transform: translate3d(0, 0, 0); }
		100% { transform: translate3d(-50%, 0, 0); }
	}
	.animate-gpu-marquee {
		animation: gpu-marquee 30s linear infinite;
		will-change: transform;
	}
</style>
