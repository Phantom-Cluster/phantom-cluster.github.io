<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	let { project }: { project: Project } = $props();

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		const img = document.querySelector(`.card-img-${project.slug}`);
		if (img) {
			gsap.to(img, {
				yPercent: 12,
				ease: 'none',
				scrollTrigger: {
					trigger: `.card-container-${project.slug}`,
					start: 'top bottom',
					end: 'bottom top',
					scrub: true
				}
			});
		}
	});
</script>

<a href="/work/{project.slug}" class="block group card-container-{project.slug}">
	<!-- Premium white card on light background with subtle shadows and premium borders -->
	<Card class="overflow-hidden bg-white border border-neutral-200/60 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-neutral-300/40 hover:-translate-y-1.5 rounded-[2rem] p-4">
		<CardContent class="p-4">
			<div class="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] mb-6 bg-neutral-100">
				<img 
					src={project.thumbnail} 
					alt={project.title} 
					class="object-cover w-full h-[120%] absolute -top-[10%] transition-transform duration-700 group-hover:scale-[1.03] card-img-{project.slug}"
					loading="lazy"
				/>
				<!-- Overlay visual filter -->
				<div class="absolute inset-0 bg-neutral-900/5 group-hover:bg-transparent transition-colors duration-300"></div>
			</div>
			
			<div class="space-y-4 px-2">
				<div class="flex justify-between items-center w-full gap-4">
					<h3 class="text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-950 group-hover:text-primary transition-colors leading-tight">
						{project.title}
					</h3>
					<span class="text-xs font-bold text-neutral-400 group-hover:text-primary transition-colors">↳ VIEW CASE</span>
				</div>
				
				<p class="text-sm md:text-base text-neutral-600 line-clamp-2 leading-relaxed font-medium">
					{project.description}
				</p>
				
				<div class="flex flex-wrap gap-2 pt-2">
					{#each project.tags as tag}
						<Badge variant="secondary" class="font-semibold bg-neutral-100 border border-neutral-200 text-neutral-500 hover:text-primary hover:border-primary/30 transition-all rounded-lg text-[10px] py-1">
							{tag}
						</Badge>
					{/each}
				</div>
			</div>
		</CardContent>
	</Card>
</a>
