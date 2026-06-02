<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	let containerEl: HTMLElement | null = $state(null);
	let innerEl: HTMLElement | null = $state(null);

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		
		if (!containerEl || !innerEl) return;

		const animation = gsap.to(innerEl, {
			xPercent: -50,
			ease: 'none',
			scrollTrigger: {
				trigger: containerEl,
				start: 'top bottom',
				end: 'bottom top',
				scrub: 1
			}
		});

		return () => {
			animation.kill();
		};
	});
</script>

<section bind:this={containerEl} class="py-16 overflow-hidden border-y border-neutral-200/50 bg-white">
	<div class="container mx-auto px-6 max-w-[1440px] grid grid-cols-1 lg:grid-cols-4 gap-8 items-center mb-8">
		<span class="font-mono text-xs uppercase text-neutral-500 tracking-widest">
			Proud to work with
		</span>
	</div>
	<div class="relative w-full overflow-hidden select-none">
		<div bind:this={innerEl} class="flex gap-16 whitespace-nowrap min-w-[200%]">
			{#each Array(4) as _}
				<div class="flex gap-16 items-center text-lg md:text-xl font-bold text-neutral-600 font-sans tracking-tight">
					<span>WPMU DEV</span>
					<span class="text-primary">•</span>
					<span>Themeisle</span>
					<span class="text-primary">•</span>
					<span>Searchmetrics</span>
					<span class="text-primary">•</span>
					<span>Ideajam</span>
					<span class="text-primary">•</span>
				</div>
			{/each}
		</div>
	</div>
</section>
