<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import TubesBackground from "$lib/components/TubesBackground.svelte";
</script>

<!-- Massive rounded visual card -->
<div class="relative z-10 w-full">
		<div
			class="relative w-full rounded-[2.5rem] overflow-hidden min-h-[480px] md:h-[60vh] flex flex-col justify-between border border-white/5 bg-neutral-950 shadow-2xl shadow-black/90"
		>
			<!-- Visual WebGL Tubes canvas locked inside the card borders -->
			<div class="absolute inset-0 z-0">
				<TubesBackground
					class="w-full h-full"
					enableClickInteraction={true}
					forceDark={true}
				/>
			</div>

			<!-- Dark overlay gradient to ensure high readability of visual layers -->
			<div
				class="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none z-1"
			></div>

			<!-- TOP ROW: Clock & Case Study Badge -->
			<div
				class="relative z-10 p-8 md:p-10 flex justify-between items-start w-full gap-4 flex-wrap"
			>
				<div
					class="flex items-center gap-3 bg-black/45 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs font-medium text-white/90"
				>
					<span class="relative flex h-2 w-2">
						<span
							class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
						></span>
						<span
							class="relative inline-flex rounded-full h-2 w-2 bg-primary"
						></span>
					</span>
					<span>Featured product</span>
				</div>

				<div
					class="bg-black/45 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs font-bold text-primary uppercase tracking-wider"
				>
					FLAGSHIP WPMU DEV WORK
				</div>
			</div>

			<!-- CENTER ROW: Giant Project Title overlay -->
			<div class="relative z-10 p-8 md:p-10 w-full text-left">
				<h4
					class="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tighter max-w-[20ch] leading-[1.1] pb-2"
				>
					WPMU DEV Dashboard & Design System Overhaul
				</h4>
			</div>

			<!-- BOTTOM ROW: Social proof & value CTA statement -->
			<div
				class="relative z-10 p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-end w-full"
			>
				<!-- Left column: Overlapping avatars and Proven Expertise rating block -->
				<div
					class="flex flex-wrap items-center gap-4 bg-black/45 backdrop-blur-md p-4 rounded-[2rem] border border-white/10 w-fit"
				>
					<div class="flex -space-x-3 overflow-hidden">
						<img
							class="inline-block h-8 w-8 rounded-full ring-2 ring-neutral-900 object-cover"
							src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
							alt="Plugin User avatar"
						/>
						<img
							class="inline-block h-8 w-8 rounded-full ring-2 ring-neutral-900 object-cover"
							src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
							alt="WordPress Developer avatar"
						/>
						<img
							class="inline-block h-8 w-8 rounded-full ring-2 ring-neutral-900 object-cover"
							src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
							alt="Creator avatar"
						/>
					</div>
					<div class="flex flex-col text-left">
						<span class="text-xs font-bold text-white leading-none"
							>2M+ Smush Installs</span
						>
						<span
							class="text-[10px] text-neutral-400 mt-1 uppercase tracking-wider"
							>⭐ Monochrome Mode</span
						>
					</div>
				</div>

				<!-- Right column: Tags summary statement and CTA trigger button -->
				<div
					class="flex flex-col md:flex-row md:items-center justify-end gap-6 w-full"
				>
					<p
						class="text-sm text-neutral-300 max-w-[32ch] leading-snug md:text-right font-medium drop-shadow-md"
					>
						Spearheaded a scalable atomic design system in Figma and
						launched white-label monochrome dashboards.
					</p>
					<div
						class="flex items-center gap-2 border border-gray-800 rounded-full p-1.5 group cursor-pointer hover:border-gray-600 transition-colors duration-300"
					>
						<!-- Circular Arrow Icon -->
						<div
							class="flex items-center justify-center w-10 h-10 rounded-full bg-black/50 transition-all duration-300"
						>
							<svg
								class="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M14 5l7 7m0 0l-7 7m7-7H3"
								></path>
							</svg>
						</div>
						<!-- Main Action Button -->
						<a
							href="/work/wpmu-dev"
							class="bg-[#FF4400] text-white px-6 py-2.5 rounded-full font-semibold tracking-wide text-xs whitespace-nowrap shadow-[0_0_15px_rgba(255,68,0,0.4)] transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(255,68,0,0.6)] group-hover:bg-[#ff5511]"
						>
							EXPLORE PROJECT
						</a>
					</div>
				</div>
			</div>
	</div>
</div>
