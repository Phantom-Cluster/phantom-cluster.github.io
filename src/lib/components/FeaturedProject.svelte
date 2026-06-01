<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import TubesBackground from '$lib/components/TubesBackground.svelte';
	import { onMount } from 'svelte';
	import { Mail } from 'lucide-svelte';

	let timeString = $state("");

	onMount(() => {
		const updateTime = () => {
			timeString = new Date().toLocaleTimeString('en-US', {
				timeZone: 'Asia/Kolkata',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: true
			});
		};
		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	});
</script>

<!-- Repurposed visual card sits on a light gray section, creating massive visual contrast -->
<section class="w-full bg-[#f4f4f6] py-28 relative overflow-hidden flex flex-col items-center">
	
	<!-- Giant watermark heading sitting behind the card exactly like the Agero screenshot -->
	<div class="relative z-0 w-full text-center select-none pointer-events-none -mb-8 sm:-mb-14">
		<span class="font-mono text-xs uppercase text-neutral-500 tracking-[0.2em] block mb-2">
			(Case Study Highlight)
		</span>
		<h3 class="text-[9vw] sm:text-[10vw] font-black tracking-[-0.05em] uppercase leading-none text-neutral-200/40">
			Featured Work
		</h3>
	</div>

	<!-- Massive rounded visual card containing Tubes WebGL canvas, sitting above the watermark (z-10) -->
	<div class="relative z-10 w-full max-w-[1320px] mx-auto px-6">
		<div class="relative w-full rounded-[2.5rem] overflow-hidden min-h-[480px] md:h-[60vh] flex flex-col justify-between border border-white/5 bg-neutral-950 shadow-2xl shadow-black/90">
			
			<!-- Visual WebGL Tubes canvas locked inside the card borders -->
			<div class="absolute inset-0 z-0">
				<TubesBackground class="w-full h-full" enableClickInteraction={true} forceDark={true} />
			</div>

			<!-- Dark overlay gradient to ensure high readability of visual layers -->
			<div class="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none z-1"></div>

			<!-- TOP ROW: Clock & Case Study Badge -->
			<div class="relative z-10 p-8 md:p-10 flex justify-between items-start w-full gap-4 flex-wrap">
				<div class="flex items-center gap-3 bg-black/45 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs font-medium text-white/90">
					<span class="relative flex h-2 w-2">
						<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
						<span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
					</span>
					<span>Kanpur • {timeString || '11:08:30 PM'} (IST)</span>
				</div>
				
				<div class="bg-black/45 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs font-bold text-primary uppercase tracking-wider">
					FLAGSHIP WPMU DEV WORK
				</div>
			</div>

			<!-- CENTER ROW: Giant Project Title overlay -->
			<div class="relative z-10 p-8 md:p-10 w-full text-left">
				<h4 class="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tighter max-w-[20ch] leading-tight">
					WPMU DEV Dashboard & Design System Overhaul
				</h4>
			</div>

			<!-- BOTTOM ROW: Social proof & value CTA statement -->
			<div class="relative z-10 p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-end w-full">
				
				<!-- Left column: Overlapping avatars and Proven Expertise rating block -->
				<div class="flex flex-wrap items-center gap-4 bg-black/45 backdrop-blur-md p-4 rounded-[2rem] border border-white/10 w-fit">
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
						<span class="text-xs font-bold text-white leading-none">2M+ Smush Installs</span>
						<span class="text-[10px] text-neutral-400 mt-1 uppercase tracking-wider">⭐ Monochrome Mode</span>
					</div>
				</div>

				<!-- Right column: Tags summary statement and CTA trigger button -->
				<div class="flex flex-col md:flex-row md:items-center justify-end gap-6 w-full">
					<p class="text-sm text-neutral-300 max-w-[32ch] leading-snug md:text-right font-medium drop-shadow-md">
						Spearheaded a scalable atomic design system in Figma and launched white-label monochrome dashboards.
					</p>
					<div class="flex items-center gap-3 bg-black/45 backdrop-blur-md p-2 rounded-full border border-white/10 w-fit">
						<div class="flex h-10 w-10 rounded-full bg-neutral-900 items-center justify-center border border-white/5">
							<Mail class="size-4 text-primary" />
						</div>
						<Button
							href="mailto:phantomcluster17@gmail.com"
							class="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-6 py-2.5 text-xs uppercase tracking-wider flex items-center gap-2"
						>
							<span>Email Me</span>
						</Button>
					</div>
				</div>

			</div>
		</div>
	</div>
</section>
