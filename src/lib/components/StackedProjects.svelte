<script lang="ts">
	import { projects } from '$lib/data/projects';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { ArrowRight } from 'lucide-svelte';

	let colorThief: any;

	onMount(async () => {
		gsap.registerPlugin(ScrollTrigger);

		// Dynamically import ColorThief to avoid SSR issues
		const ColorThiefModule = await import('colorthief');
		colorThief = new ColorThiefModule.default();

		// GSAP 3D Scroll Stacking Animations
		const cards = gsap.utils.toArray('.project-stack-card');
		
		cards.forEach((card: any, i: number) => {
			const isLast = i === cards.length - 1;
			const nextTrigger = isLast 
				? document.querySelector('.last-card-sentinel') 
				: cards[i + 1];

			if (!nextTrigger) return;

			const overlay = card.querySelector('.card-overlay');
			
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: nextTrigger,
					start: 'top 75%',
					end: () => `top ${window.innerWidth >= 1024 ? 100 + (i + 1) * 24 : 60 + (i + 1) * 16}px`,
					scrub: true,
					invalidateOnRefresh: true
				}
			});

			tl.to(card, {
				scale: 0.95 - (cards.length - 1 - i) * 0.01,
				rotateX: 8,
				yPercent: -4,
				transformOrigin: 'top center',
				ease: 'none'
			}, 0);

			if (overlay) {
				tl.to(overlay, {
					opacity: 0.55,
					ease: 'none'
				}, 0);
			}
		});
	});

	function handleImageLoad(event: Event) {
		if (!colorThief) return;
		const img = event.target as HTMLImageElement;
		try {
			const color = colorThief.getColor(img);
			const hex = rgbToHex(color[0], color[1], color[2]);
			const wrapper = img.closest('.project-image-wrapper') as HTMLElement;
			if (wrapper) {
				wrapper.style.setProperty('--ambient-color', hex);
			}
		} catch (e) {
			console.warn("Could not extract color for ambient lighting", e);
		}
	}

	function rgbToHex(r: number, g: number, b: number) {
		return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
	}

	function handlePrefetch(e: Event, url: string) {
		const target = e.currentTarget as HTMLAnchorElement;
		
		// Respect Save-Data header
		const connection = (navigator as any).connection;
		if (connection && connection.saveData) {
			return;
		}

		if (target.dataset.prefetched) return;
		
		const link = document.createElement('link');
		link.rel = 'prefetch';
		link.href = url;
		document.head.appendChild(link);
		target.dataset.prefetched = 'true';
	}

	function onHoverEnter(e: MouseEvent) {
		const wrapper = e.currentTarget as HTMLElement;
		gsap.to(wrapper, {
			y: -8,
			"--shadow-blur": "120px",
			"--shadow-opacity": 0.45,
			duration: 0.8,
			ease: "elastic.out(1, 0.75)"
		});
	}

	function onHoverLeave(e: MouseEvent) {
		const wrapper = e.currentTarget as HTMLElement;
		gsap.to(wrapper, {
			y: 0,
			"--shadow-blur": "80px",
			"--shadow-opacity": 0.35,
			duration: 0.6,
			ease: "power2.out"
		});
	}

	const cardThemes = [
		{
			bg: 'bg-[#18181b]',
			accent: 'text-primary',
			year: '2025',
			role: 'Product Designer',
			services: ['SaaS Dashboard Design', 'Atomic Figma Variables', 'White-Label Monochrome Mode'],
			btnClass: 'hover:bg-primary hover:border-primary hover:shadow-[0_0_20px_rgba(245,53,0,0.45)]',
			cardShadow: 'hover:border-white/20 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(245,53,0,0.12)]',
			themeColor: '#f53500'
		},
		{
			bg: 'bg-[#2c1b18]',
			accent: 'text-primary',
			year: '2024',
			role: 'UI/UX Designer',
			services: ['Kanban SaaS Platform', 'B2B Flow Optimization', 'Scalable White-Label Framework'],
			btnClass: 'hover:bg-[#e0533c] hover:border-[#e0533c] hover:shadow-[0_0_20px_rgba(224,83,60,0.45)]',
			cardShadow: 'hover:border-white/20 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(224,83,60,0.22)]',
			themeColor: '#e0533c'
		},
		{
			bg: 'bg-[#111e1c]',
			accent: 'text-primary',
			year: '2024',
			role: 'Product Designer',
			services: ['Mobile App Redesign', 'Localized Design Library', 'AI Asset Integration'],
			btnClass: 'hover:bg-[#14b8a6] hover:border-[#14b8a6] hover:shadow-[0_0_20px_rgba(20,184,166,0.45)]',
			cardShadow: 'hover:border-white/20 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(20,184,166,0.22)]',
			themeColor: '#14b8a6'
		},
		{
			bg: 'bg-[#121926]',
			accent: 'text-primary',
			year: '2023',
			role: 'WordPress Specialist',
			services: ['Elementor & Gutenberg Systems', '50+ High-Performance Starter Sites', 'UX & Performance Tuning'],
			btnClass: 'hover:bg-[#3b82f6] hover:border-[#3b82f6] hover:shadow-[0_0_20px_rgba(59,130,246,0.45)]',
			cardShadow: 'hover:border-white/20 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(59,130,246,0.22)]',
			themeColor: '#3b82f6'
		}
	];
</script>

<section id="projects" class="py-32 bg-[#f4f4f6] relative flex flex-col items-center">
	
	<div class="relative z-0 w-full text-center select-none pointer-events-none mb-16 sm:mb-24 px-6">
		<span class="font-mono text-xs uppercase text-neutral-500 tracking-[0.25em] block mb-3">
			(Why clients love Hitanshu)
		</span>
		<h3 class="text-[10vw] sm:text-[12vw] font-black tracking-[-0.05em] uppercase leading-none text-neutral-200/40">
			Recent Works
		</h3>
	</div>

	<div class="relative z-10 w-full max-w-[1320px] mx-auto px-6" style="perspective: 1800px;">
		{#each projects as project, i}
			<!-- Progressively higher z-index (z: {i + 10}) combined with opaque cardThemes[i].bg 
			     ensures shadows from layers above do not bleed downwards into underlying cards. -->
			<div class="project-stack-card w-full rounded-[2.5rem] p-8 md:p-12 text-white border border-white/10 shadow-2xl shadow-black/80 flex flex-col justify-between transition-[border-color,box-shadow] duration-500 sticky {cardThemes[i].bg} mb-[15vh] lg:mb-[35vh] h-auto lg:h-[70vh] min-h-[480px] lg:max-h-[580px] group {cardThemes[i].cardShadow}"
			     style="--stack-offset: {i}; z-index: {i + 10};">
				
				<div class="card-overlay absolute inset-0 bg-[#0c0c0e] rounded-[2.5rem] opacity-0 pointer-events-none z-20"></div>
				
				<!-- Specular glass reflection sheen sweep removed due to rendering artifacts -->

				<div 
					class="absolute right-[5%] bottom-[10%] w-[40%] h-[40%] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[100px] pointer-events-none z-10" 
					style="background: radial-gradient(circle, color-mix(in srgb, {cardThemes[i].themeColor} 15%, transparent) 0%, transparent 70%);"
					aria-hidden="true"
				></div>
				
				<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch h-full w-full relative z-30">
					
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

					<div class="flex items-center justify-center order-3 lg:order-2 h-full py-4 lg:py-0 w-full relative z-20">
						<!-- Ambient Image Wrapper 
						     overflow: visible allows the massive blur shadow to render without clipping -->
						<div 
							role="presentation"
							class="project-image-wrapper relative w-full rounded-[1.5rem]"
							style="
								overflow: visible;
								--ambient-color: transparent;
								--shadow-blur: 80px;
								--shadow-opacity: 0.35;
								box-shadow: 0px 24px var(--shadow-blur) -12px color-mix(in srgb, var(--ambient-color) calc(var(--shadow-opacity) * 100%), transparent);
								will-change: transform, box-shadow;
							"
							onmouseenter={onHoverEnter}
							onmouseleave={onHoverLeave}
						>
							<a href="/work/{project.slug}" class="relative w-full aspect-[16/11] max-w-[420px] rounded-[1.5rem] overflow-hidden group border border-white/10 block bg-neutral-900 transition-all duration-500 ease-out">
								
								<div class="absolute top-0 left-0 right-0 h-6 bg-neutral-950/80 backdrop-blur-md border-b border-white/5 px-3 flex items-center z-20">
									<div class="flex gap-1.5">
										<span class="size-2 rounded-full bg-[#ff5f56]"></span>
										<span class="size-2 rounded-full bg-[#ffbd2e]"></span>
										<span class="size-2 rounded-full bg-[#27c93f]"></span>
									</div>
								</div>

								<img 
									src={project.thumbnail} 
									alt={project.title} 
									crossorigin="anonymous"
									onload={handleImageLoad}
									class="object-cover w-full h-[110%] absolute -top-[5%] left-0 transition-transform duration-700 group-hover:scale-[1.04] z-10"
									loading="lazy"
								/>
								<div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 z-30 pointer-events-none"></div>
							</a>
						</div>
					</div>

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
							<a 
								href="/work/{project.slug}" 
								onmouseenter={(e) => handlePrefetch(e, `/work/${project.slug}`)}
								class="flex items-center gap-2.5 bg-white/10 text-white font-bold rounded-full px-5 py-2.5 text-xs uppercase tracking-wider transition-all duration-300 active:scale-95 group border border-white/10 {cardThemes[i].btnClass}"
							>
								<span>Explore Case</span>
								<ArrowRight class="size-3.5 text-white transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
							</a>
						</div>
					</div>

				</div>

			</div>
		{/each}

		<div class="last-card-sentinel h-1 w-full pointer-events-none mt-[10vh]"></div>
	</div>
</section>

<style>
	.project-stack-card {
		will-change: transform, opacity;
		transform: translate3d(0, 0, 0);
		transform-style: preserve-3d;
		outline: none !important;
		-webkit-tap-highlight-color: transparent;
		top: calc(60px + var(--stack-offset) * 16px);
	}
	
	@media (min-width: 1024px) {
		.project-stack-card {
			top: calc(100px + var(--stack-offset) * 24px);
		}
	}
</style>
