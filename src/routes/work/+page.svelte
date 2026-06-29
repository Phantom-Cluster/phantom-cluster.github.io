<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { projects } from '$lib/data/projects';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		gsap.from('.work-header', {
			y: 40,
			opacity: 0,
			duration: 1,
			ease: 'power3.out'
		});

		gsap.from('.work-item', {
			y: 60,
			opacity: 0,
			duration: 1,
			stagger: 0.15,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: '.work-grid',
				start: 'top 85%'
			}
		});
	});
</script>

<svelte:head>
	<title>Selected Work | Hitanshu Sahu</title>
</svelte:head>

<div class="container mx-auto px-6 py-12 md:py-24 min-h-screen">
	<div class="max-w-3xl mb-16 work-header">
		<h1 class="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">Selected Work</h1>
		<p class="text-xl text-muted-foreground leading-relaxed">
			A collection of projects spanning product design, design systems, and user research.
		</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 work-grid">
		{#each projects as project}
			<div class="work-item">
				<ProjectCard {project} />
			</div>
		{/each}
	</div>
</div>
