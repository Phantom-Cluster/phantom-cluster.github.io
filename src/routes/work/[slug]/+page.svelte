<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { Badge } from '$lib/components/ui/badge';

	let { data }: { data: PageData } = $props();
	let project = $derived(data.project);

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Hero fade up
		gsap.from('.cs-hero-element', {
			y: 50,
			opacity: 0,
			duration: 1,
			stagger: 0.15,
			ease: 'power3.out'
		});

		// Parallax for hero image
		gsap.to('.cs-hero-img', {
			yPercent: 20,
			ease: 'none',
			scrollTrigger: {
				trigger: '.cs-hero-img-container',
				start: 'top bottom',
				end: 'bottom top',
				scrub: true
			}
		});

		// Section reveals and pinning
		gsap.utils.toArray('.cs-section').forEach((section: any) => {
			// Fade up content
			gsap.from(section.querySelectorAll('.cs-fade-up'), {
				y: 50,
				opacity: 0,
				duration: 1,
				stagger: 0.15,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: section,
					start: 'top 85%'
				}
			});

			// Pin target (if exists and on larger screens)
			const pinTarget = section.querySelector('.cs-pin-target');
			if (pinTarget && window.innerWidth > 768) {
				ScrollTrigger.create({
					trigger: section,
					start: 'top 20%',
					end: 'bottom 50%',
					pin: pinTarget,
					pinSpacing: false
				});
			}
		});
	});
</script>

<svelte:head>
	<title>{project.title} | Hitanshu Sahu</title>
</svelte:head>

<article class="min-h-screen pb-24">
	<!-- Hero Header -->
	<header class="container mx-auto px-6 pt-12 md:pt-24 pb-16 max-w-5xl">
		<div class="mb-6 flex flex-wrap gap-2 cs-hero-element">
			{#each project.tags as tag}
				<Badge variant="secondary">{tag}</Badge>
			{/each}
		</div>
		<h1 class="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-foreground cs-hero-element">
			{project.title}
		</h1>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-border pt-12 cs-hero-element">
			<div class="md:col-span-2">
				<p class="text-xl md:text-2xl text-muted-foreground leading-relaxed">
					{project.description}
				</p>
			</div>
			<div>
				<h3 class="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Role</h3>
				<p class="text-muted-foreground mb-6">{project.role}</p>
				
				<h3 class="text-sm font-bold uppercase tracking-wider text-foreground mb-2">Impact</h3>
				<ul class="space-y-2">
					{#each project.metrics as metric}
						<li class="text-muted-foreground flex items-start gap-2">
							<span class="text-primary mt-1">✓</span>
							<span>{metric}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</header>

	<!-- Main Image -->
	<div class="container mx-auto px-6 max-w-[1440px] mb-32 cs-hero-img-container overflow-hidden rounded-[2rem]">
		<img 
			src={project.images[0] || project.thumbnail} 
			alt="Project Showcase" 
			class="w-full h-auto aspect-video object-cover cs-hero-img origin-center"
		/>
	</div>

	<!-- Content Sections -->
	<div class="container mx-auto px-6 max-w-5xl space-y-32">
		
		<section class="cs-section flex flex-col md:flex-row gap-12 md:gap-24">
			<div class="md:w-1/3">
				<div class="cs-pin-target">
					<h2 class="text-[34px] md:text-5xl font-semibold tracking-[-0.02em] mb-6 cs-fade-up">The Problem</h2>
				</div>
			</div>
			<div class="md:w-2/3 pt-2 md:pt-0">
				<p class="text-[21px] md:text-[24px] font-light text-muted-foreground leading-[1.5] cs-fade-up">
					{project.problem}
				</p>
			</div>
		</section>

		<section class="cs-section flex flex-col md:flex-row gap-12 md:gap-24">
			<div class="md:w-1/3">
				<div class="cs-pin-target">
					<h2 class="text-[34px] md:text-5xl font-semibold tracking-[-0.02em] mb-6 cs-fade-up">Process & Strategy</h2>
				</div>
			</div>
			<div class="md:w-2/3 pt-2 md:pt-0">
				<p class="text-[21px] md:text-[24px] font-light text-muted-foreground leading-[1.5] cs-fade-up">
					{project.process}
				</p>
			</div>
		</section>

		<!-- Mid-way Image if exists -->
		{#if project.images[1]}
			<section class="cs-section -mx-6 md:-mx-12 overflow-hidden">
				<img 
					src={project.images[1]} 
					alt="Process visual" 
					class="w-full h-auto rounded-[2rem] cs-fade-up transform hover:scale-[1.02] transition-transform duration-700"
				/>
			</section>
		{/if}

		<section class="cs-section flex flex-col md:flex-row gap-12 md:gap-24">
			<div class="md:w-1/3">
				<div class="cs-pin-target">
					<h2 class="text-[34px] md:text-5xl font-semibold tracking-[-0.02em] mb-6 cs-fade-up">The Solution</h2>
				</div>
			</div>
			<div class="md:w-2/3 pt-2 md:pt-0">
				<p class="text-[21px] md:text-[24px] font-light text-muted-foreground leading-[1.5] cs-fade-up">
					{project.solution}
				</p>
			</div>
		</section>

		<section class="cs-section">
			<div class="bg-background/50 backdrop-blur-xl p-8 md:p-20 rounded-[2rem] cs-fade-up border border-border/40 shadow-sm">
				<h2 class="text-[40px] md:text-[56px] font-semibold tracking-[-0.04em] mb-6">Outcome</h2>
				<p class="text-[21px] md:text-[28px] font-light text-muted-foreground leading-[1.14] mb-16 max-w-3xl tracking-[0.01em]">
					{project.outcome}
				</p>
				<div class="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-border/50">
					{#each project.metrics as metric}
						<div class="bg-background/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-border/30">
							<div class="text-primary text-[28px] mb-3 leading-none">✦</div>
							<p class="font-semibold text-[17px] md:text-xl text-foreground leading-snug tracking-[-0.02em]">{metric}</p>
						</div>
					{/each}
				</div>
			</div>
		</section>

	</div>
</article>
