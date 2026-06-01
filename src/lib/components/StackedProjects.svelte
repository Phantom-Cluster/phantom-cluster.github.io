<script lang="ts">
	import { projects } from '$lib/data/projects';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { ArrowRight } from 'lucide-svelte';

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// GSAP 3D Scroll Stacking Animations
		// We animate each card as the NEXT card slides over it
		const cards = gsap.utils.toArray('.project-stack-card');
		
		cards.forEach((card: any, i: number) => {
			const isLast = i === cards.length - 1;
			const nextTrigger = isLast 
				? document.querySelector('.last-card-sentinel') 
				: cards[i + 1];

			if (!nextTrigger) return;

			const overlay = card.querySelector('.card-overlay');
			
			// We create a ScrollTrigger timeline to orchestrate the scale down, 3D tilt, and dynamic shadow fade-in
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: nextTrigger,
					start: 'top 75%', // starts animating exactly as the next trigger begins to slide on top of this one
					end: `top ${100 + (i + 1) * 24}px`, // completes animating precisely when the next card/trigger reaches its sticky position
					scrub: true,
					invalidateOnRefresh: true
				}
			});

			tl.to(card, {
				// Perfect dynamic scale: scales down gently to show layered perspective depth
				scale: 0.95 - (cards.length - 1 - i) * 0.01,
				// Gorgeous 3D perspective tilt back around X axis
				rotateX: 8,
				// Gentle upward lift to simulate cards sliding underneath
				yPercent: -4,
				transformOrigin: 'top center',
				ease: 'none'
			}, 0);

			if (overlay) {
				tl.to(overlay, {
					// Smoothly fade in dynamic black cast shadow to keep the colors rich and high-contrast
					opacity: 0.55,
					ease: 'none'
				}, 0);
			}
		});
	});

	// Assign custom harmonious, premium color palettes to each project card
	const cardThemes = [
		{
			bg: 'bg-[#18181b]', // Sleek Charcoal Zinc
			accent: 'text-primary',
			year: '2025',
			role: 'Product Designer',
			services: ['SaaS Dashboard Design', 'Atomic Figma Variables', 'White-Label Monochrome Mode'],
			btnClass: 'hover:bg-primary hover:border-primary hover:shadow-[0_0_20px_rgba(245,53,0,0.45)]',
			cardShadow: 'hover:border-white/20 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(245,53,0,0.12)]',
			spotlight: 'bg-primary/20'
		},
		{
			bg: 'bg-[#2c1b18]', // Warm Terracotta / Dark Rust
			accent: 'text-primary',
			year: '2024',
			role: 'UI/UX Designer',
			services: ['Kanban SaaS Platform', 'B2B Flow Optimization', 'Scalable White-Label Framework'],
			btnClass: 'hover:bg-[#e0533c] hover:border-[#e0533c] hover:shadow-[0_0_20px_rgba(224,83,60,0.45)]',
			cardShadow: 'hover:border-white/20 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(224,83,60,0.22)]',
			spotlight: 'bg-[#e0533c]/25'
		},
		{
			bg: 'bg-[#111e1c]', // Deep Forest Pine
			accent: 'text-primary',
			year: '2024',
			role: 'Product Designer',
			services: ['Mobile App Redesign', 'Localized Design Library', 'AI Asset Integration'],
			btnClass: 'hover:bg-[#14b8a6] hover:border-[#14b8a6] hover:shadow-[0_0_20px_rgba(20,184,166,0.45)]',
			cardShadow: 'hover:border-white/20 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(20,184,166,0.22)]',
			spotlight: 'bg-[#14b8a6]/25'
		},
		{
			bg: 'bg-[#121926]', // Rich Midnight Sapphire
			accent: 'text-primary',
			year: '2023',
			role: 'WordPress Specialist',
			services: ['Elementor & Gutenberg Systems', '50+ High-Performance Starter Sites', 'UX & Performance Tuning'],
			btnClass: 'hover:bg-[#3b82f6] hover:border-[#3b82f6] hover:shadow-[0_0_20px_rgba(59,130,246,0.45)]',
			cardShadow: 'hover:border-white/20 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(59,130,246,0.22)]',
			spotlight: 'bg-[#3b82f6]/25'
		}
	];
</script>

<!-- STACKING RECENT PROJECTS CONTAINER (Light gray background section) -->
<section id="projects" class="py-32 bg-[#f4f4f6] relative flex flex-col items-center">
	
	<!-- Giant watermark heading sitting behind the cards stack exactly like the Agero screenshots -->
	<div class="relative z-0 w-full text-center select-none pointer-events-none mb-16 sm:mb-24 px-6">
		<span class="font-mono text-xs uppercase text-neutral-500 tracking-[0.25em] block mb-3">
			(Why clients love Hitanshu)
		</span>
		<h3 class="text-[10vw] sm:text-[12vw] font-black tracking-[-0.05em] uppercase leading-none text-neutral-200/40">
			Recent Works
		</h3>
	</div>

	<!-- Sticky Cards Stack Wrapper -->
	<div class="relative z-10 w-full max-w-[1320px] mx-auto px-6" style="perspective: 1800px;">
		{#each projects as project, i}
			<!-- The absolute visual masterpiece project card container:
			     Using native CSS sticky sibling elements to stack them physically on scroll -->
			<div class="project-stack-card w-full rounded-[2.5rem] p-8 md:p-12 text-white border border-white/10 shadow-2xl shadow-black/80 flex flex-col justify-between transition-[border-color,box-shadow] duration-500 sticky {cardThemes[i].bg} mb-[35vh] group {cardThemes[i].cardShadow}"
			     style="height: 70vh; max-height: 580px; min-height: 480px; top: {100 + i * 24}px; z-index: {i + 10};">
				
				<!-- Ambient dynamic overlay simulating 3D shadow cast -->
				<div class="card-overlay absolute inset-0 bg-[#0c0c0e] rounded-[2.5rem] opacity-0 pointer-events-none z-20"></div>
				
				<!-- Specular glass reflection sheen sweep -->
				<div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 overflow-hidden rounded-[2.5rem]" aria-hidden="true">
					<div class="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/8 to-transparent -translate-x-[50%] -translate-y-[50%] group-hover:translate-x-[50%] group-hover:translate-y-[50%] transition-transform duration-1000 ease-out"></div>
				</div>

				<!-- Ambient glowing themed blur blob (spotlight) that expands softly on hover -->
				<div class="absolute right-[5%] bottom-[10%] w-[40%] h-[40%] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[100px] pointer-events-none z-10 {cardThemes[i].spotlight}" aria-hidden="true"></div>
				
				<!-- Card Inner Layout (Col 1: Desc/Title, Col 2: Image Mockup, Col 3: Metadata) -->
				<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch h-full w-full">
					
					<!-- LEFT COLUMN: Description & Massive Title -->
					<div class="flex flex-col justify-between order-1 h-full">
						<div>
							<span class="font-mono text-[10px] tracking-widest text-neutral-400 block mb-4 uppercase">
								// {project.tags[0]} Showcase
							</span>
							<p class="text-sm md:text-base text-neutral-300 leading-relaxed font-medium max-w-[32ch]">
								{project.description}
							</p>
						</div>
						
						<div class="mt-8 lg:mt-0">
							<span class="font-mono text-xs text-neutral-400 block tracking-wider">
								0{i + 1} / 0{projects.length}
							</span>
							<h4 class="text-3xl sm:text-4xl lg:text-[2.5rem] font-extrabold tracking-[-0.04em] leading-tight text-white mt-3 max-w-[15ch]">
								{project.title.split(' & ')[0]}
							</h4>
						</div>
					</div>

					<!-- CENTER COLUMN: Premium Devices Browser Preview -->
					<div class="flex items-center justify-center order-3 lg:order-2 h-full py-4 lg:py-0">
						<a href="/work/{project.slug}" class="relative w-full aspect-[16/11] max-w-[420px] rounded-[1.5rem] overflow-hidden group shadow-2xl bg-neutral-900 border border-white/10 block transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:-translate-y-2 group-hover:border-white/20 group-hover:shadow-black/90">
							<!-- Simulated Premium Browser Window Top bar -->
							<div class="absolute top-0 left-0 right-0 h-6 bg-neutral-950/80 backdrop-blur-md border-b border-white/5 px-3 flex items-center justify-between z-10">
								<div class="flex gap-1.5">
									<span class="size-2 rounded-full bg-[#ff5f56]"></span>
									<span class="size-2 rounded-full bg-[#ffbd2e]"></span>
									<span class="size-2 rounded-full bg-[#27c93f]"></span>
								</div>
								<div class="w-1/2 h-3.5 bg-white/5 rounded text-[8px] flex items-center justify-center text-neutral-500 font-mono scale-90">
									{project.slug}.design
								</div>
								<div class="w-4"></div>
							</div>

							<!-- Actual Project Image inside browser with high-contrast subtle lighting -->
							<img 
								src={project.thumbnail} 
								alt={project.title} 
								class="object-cover w-full h-[110%] absolute -top-[5%] left-0 transition-transform duration-700 group-hover:scale-[1.04]"
								loading="lazy"
							/>
							<div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
						</a>
					</div>

					<!-- RIGHT COLUMN: Metadata details matching Agero design -->
					<div class="flex flex-col justify-between items-end text-right order-2 lg:order-3 h-full">
						<div class="space-y-6 w-full lg:w-auto">
							<div class="grid grid-cols-2 lg:grid-cols-1 gap-4 text-left lg:text-right">
								<div>
									<span class="font-mono text-[10px] uppercase text-neutral-400 tracking-widest block mb-1">
										Year
									</span>
									<span class="text-sm font-bold text-white">
										{cardThemes[i].year}
									</span>
								</div>
								<div>
									<span class="font-mono text-[10px] uppercase text-neutral-400 tracking-widest block mb-1">
										Role
									</span>
									<span class="text-sm font-bold text-white">
										{cardThemes[i].role}
									</span>
								</div>
							</div>
							
							<div class="hidden lg:block">
								<span class="font-mono text-[10px] uppercase text-neutral-400 tracking-widest block mb-2">
									Services Included
								</span>
								<ul class="space-y-1.5">
									{#each cardThemes[i].services as service}
										<li class="text-xs text-neutral-300 font-medium">{service}</li>
									{/each}
								</ul>
							</div>
						</div>

						<div class="w-full lg:w-auto flex justify-start lg:justify-end mt-6 lg:mt-0">
							<a href="/work/{project.slug}" class="flex items-center gap-2.5 bg-white/10 text-white font-bold rounded-full px-5 py-2.5 text-xs uppercase tracking-wider transition-all duration-300 active:scale-95 group border border-white/10 {cardThemes[i].btnClass}">
								<span>Explore Case</span>
								<ArrowRight class="size-3.5 text-white transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
							</a>
						</div>
					</div>

				</div>

			</div>
		{/each}

		<!-- Sentinel element to trigger the last card's stacking animation exactly like the others -->
		<div class="last-card-sentinel h-1 w-full pointer-events-none mt-[10vh]"></div>
	</div>
</section>

<style>
	/* Promote stacked cards to their own GPU compositor layers for buttery-smooth 60fps/120fps scroll physics */
	.project-stack-card {
		will-change: transform, opacity;
		transform: translate3d(0, 0, 0);
		transform-style: preserve-3d;
		outline: none !important;
		-webkit-tap-highlight-color: transparent;
	}
</style>
