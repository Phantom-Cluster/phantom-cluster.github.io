<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { Badge } from '$lib/components/ui/badge';
	import Chip from '$lib/components/Chip.svelte';

	const skills = [
		'Design Systems (Atomic)', 'Starter Templates', 'WordPress (Gutenberg/Elementor)', 
		'UX Strategy & Psychology', 'Generative AI / LLMs', 'Prompt Engineering', 
		'User Flow Mapping', 'Wireframes & 3D Design', 'Accessibility (WCAG)',
		'UI Optimization', 'Interaction Design', 'Animation', 'Motion UI', 
		'Agile Collaboration', 'SaaS Product Design', 'Developer Handoff'
	];

	const experiences = [
		{ role: 'Product Designer', company: 'SomeTechWork', years: 'Dec 2025 - Present' },
		{ role: 'Product/Social Designer', company: 'Eclectic', years: 'Mar 2025 - Present' },
		{ role: 'Product Designer', company: 'WPMU DEV', years: 'May 2022 - Sep 2024' },
		{ role: 'UI/UX Designer', company: 'Ideajam', years: 'Aug 2021 - Jan 2022' },
		{ role: 'SaaS Videos & Brand', company: 'Searchmetrics', years: 'May 2021 - Jan 2022' },
		{ role: 'Starter Template Designer', company: 'Themeisle', years: 'Jul 2018 - May 2021' }
	];

	const certificates = [
		{ 
			brand: 'Google', 
			logo: 'https://www.vectorlogo.zone/logos/google/google-icon.svg',
			items: [
				{ title: 'Foundations of UX Design', year: '2025' },
				{ title: 'Generative AI Explorer', year: '2025' },
				{ title: 'Image Generation', year: '2025' },
				{ title: 'Prompting Essentials', year: '2025' },
				{ title: 'AI Essentials', year: '2025' }
			]
		},
		{ 
			brand: 'Google Cloud', 
			logo: 'https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg',
			items: [
				{ title: 'Prompt Design in Vertex AI', year: '2025' },
				{ title: 'Responsible AI Principles', year: '2025' },
				{ title: 'MLOps for Generative AI', year: '2025' },
				{ title: 'GenAI Specialization', year: '2025' },
				{ title: 'Large Language Models', year: '2025' }
			]
		},
		{ 
			brand: 'Uxcel', 
			logo: 'https://asset.brandfetch.io/idf80-rR1z/idS-C-6S6S.png',
			items: [
				{ title: 'Mobile UX Design', year: '2024' },
				{ title: '3D Design Foundations', year: '2024' },
				{ title: 'UI Components II: Advanced', year: '2024' },
				{ title: 'UX Design Psychology', year: '2024' },
				{ title: 'Design Accessibility', year: '2022' },
				{ title: 'UI Components I: Basic', year: '2022' },
				{ title: 'UX Design Foundations', year: '2022' },
				{ title: 'Design Terminology', year: '2022' }
			]
		},
		{ 
			brand: 'GrowthSchool', 
			logo: 'https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/v1619602447/vuxqf8pndx7lqpx5f9xz.png',
			items: [
				{ title: 'Chat GPT 101', year: '2024' }
			]
		}
	];

	let ctx: gsap.Context;
	
	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		ctx = gsap.context(() => {
			// Intro fade up
			gsap.from('.about-element', {
				y: 60,
				opacity: 0,
				duration: 1,
				stagger: 0.15,
				ease: 'power3.out'
			});

			// Horizontal scroll for experience (Desktop only)
			const expScrollContainer = document.querySelector('.exp-scroll-container');
			const expWrapper = document.querySelector('.exp-wrapper');
			
			if (expScrollContainer && expWrapper && window.innerWidth > 768) {
				const scrollWidth = expWrapper.scrollWidth - expScrollContainer.clientWidth;
				
				const horizontalTween = gsap.to(expWrapper, {
					x: -scrollWidth,
					ease: 'none',
					scrollTrigger: {
						trigger: '.exp-section',
						pin: true,
						scrub: 1,
						start: 'center center',
						end: () => `+=${scrollWidth}`,
						invalidateOnRefresh: true,
						anticipatePin: 1
					}
				});

				// Staggered reveal for experience items
				gsap.from('.exp-item', {
					y: 30,
					opacity: 0,
					duration: 0.8,
					stagger: 0.1,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: '.exp-wrapper',
						start: 'left 80%',
						containerAnimation: horizontalTween
					}
				});
			} else {
				// Vertical reveal for mobile
				gsap.from('.exp-item', {
					y: 40,
					opacity: 0,
					duration: 0.8,
					stagger: 0.1,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: '.exp-section',
						start: 'top 85%'
					}
				});
			}

			// Staggered skills reveal (Batch)
			ScrollTrigger.batch('.skill-badge', {
				onEnter: (elements) => {
					gsap.to(elements, {
						opacity: 1,
						scale: 1,
						stagger: 0.05,
						duration: 0.6,
						ease: 'back.out(1.7)',
						overwrite: true
					});
				},
				start: 'top 90%'
			});

			// Certificates batch reveal (fluid stacking)
			ScrollTrigger.batch('.cert-item', {
				onEnter: (elements) => {
					gsap.to(elements, {
						opacity: 1,
						y: 0,
						scale: 1,
						stagger: 0.15,
						duration: 1,
						ease: 'power4.out',
						overwrite: true
					});
				},
				start: 'top 90%'
			});

			// Final refresh to ensure everything is calculated correctly
			// We use a small timeout to ensure Svelte has finished rendering the DOM
			setTimeout(() => {
				ScrollTrigger.refresh();
			}, 100);
		});

		return () => {
			if (ctx) ctx.revert();
		};
	});
</script>

<svelte:head>
	<title>About | Hitanshu Sahu</title>
</svelte:head>

<div class="container mx-auto px-6 py-24 max-w-[1440px] min-h-screen overflow-x-hidden">
	<h1 class="text-[52px] md:text-[68px] font-semibold tracking-[-0.05em] leading-[0.95] mb-12 text-foreground about-element max-w-5xl">About Me</h1>
	
	<div class="prose prose-lg dark:prose-invert max-w-3xl mb-32 about-element">
		<p class="text-[26px] md:text-[34px] text-muted-foreground leading-[1.15] font-medium tracking-[-0.03em] [word-spacing:0.08em]">
			I'm a tech-obsessed Product Designer with over 7 years of experience designing intuitive, scalable UI/UX systems for <span class="font-bold text-primary">complex SaaS platforms</span> and the <span class="font-bold text-primary">WordPress ecosystem</span>.
		</p>
		<p class="text-[16px] md:text-[18px] text-muted-foreground/80 mt-8 leading-[1.6] tracking-[-0.01em] max-w-[65ch]">
			As a specialist in creating <span class="font-semibold text-primary">Starter Templates</span> and optimizing <span class="font-semibold text-primary">Gutenberg/Elementor</span> workflows, I excel at translating technical requirements into human-centered solutions. I am known for my <span class="font-semibold text-primary">accessibility-first</span> mindset, strategic thinking, and the ability to balance user delight with engineering constraints in fast-paced environments.
		</p>
	</div>

	<!-- Work Experience (Pinned Horizontal Timeline) -->
	<section class="exp-section mb-40 min-h-screen flex flex-col justify-center">
		<h2 class="text-[34px] md:text-[42px] font-semibold tracking-[-0.04em] mb-14 about-element">Work Experience</h2>
		
		<div class="exp-scroll-container relative overflow-hidden md:overflow-visible min-h-[450px] flex items-center">
			<div class="exp-wrapper flex flex-col md:flex-row gap-8 md:gap-0 relative">
				<!-- Timeline Line (Desktop Only) -->
				<div class="hidden md:block absolute top-[2.5rem] left-0 right-0 h-[1.5px] bg-border/40 z-0"></div>
				
				{#each experiences as exp, i}
					<div class="exp-item relative z-10 flex flex-col md:w-[400px] shrink-0 md:px-8">
						<!-- Timeline Node -->
						<div class="hidden md:flex absolute top-[2.5rem] left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-primary bg-background items-center justify-center shadow-sm">
							<div class="w-1 h-1 bg-primary rounded-full"></div>
						</div>
						
						<!-- Card Content -->
						<div class="md:mt-14 p-7 rounded-[2rem] liquid-glass diffusion-shadow hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(0,43,255,0.08)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)] transition-all duration-500 flex flex-col h-full border border-black/[0.05] dark:border-white/[0.05] group">
							<div class="md:hidden w-9 h-9 rounded-full border border-border/50 bg-background/50 flex items-center justify-center shadow-sm mb-6 shrink-0">
								<div class="w-2 h-2 bg-primary rounded-full"></div>
							</div>
							<h3 class="font-semibold text-[17px] md:text-[19px] text-foreground mb-2 tracking-[-0.03em] leading-tight group-hover:text-primary transition-colors">{exp.role}</h3>
							<div class="text-muted-foreground group-hover:text-primary/90 transition-colors font-medium text-[14px] mb-6 flex-grow">{exp.company}</div>
							<div class="text-[11px] text-muted-foreground/50 tracking-[0.2em] mt-auto font-mono uppercase opacity-80">{exp.years}</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Core Strengths -->
	<section class="skills-section mb-40 max-w-5xl mx-auto text-center">
		<h2 class="text-[34px] md:text-[42px] font-semibold tracking-[-0.04em] mb-14">Core Strengths</h2>
		<div class="flex flex-wrap gap-3 justify-center">
			{#each skills as skill}
				<div class="skill-badge opacity-0">
					<Chip>
						<span class="text-[13px] md:text-[15px] font-medium">{skill}</span>
					</Chip>
				</div>
			{/each}
		</div>
	</section>

	<!-- Certificates -->
	<section class="cert-section mb-32">
		<h2 class="text-[34px] md:text-[42px] font-semibold tracking-[-0.04em] mb-14">Certifications</h2>
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
			{#each certificates as group}
				<div class="cert-item p-10 rounded-[2.5rem] bg-secondary/30 dark:bg-white/5 backdrop-blur-xl border border-border/40 diffusion-shadow hover:-translate-y-2 hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col items-center text-center group relative overflow-hidden opacity-0">
					<!-- Brand Logo (Centered & Full Color) -->
					<div class="w-24 h-12 flex items-center justify-center transition-all duration-500 mb-8 relative z-10">
						<img src={group.logo} alt={group.brand} class="max-w-full max-h-full object-contain" loading="lazy" />
					</div>

					<h3 class="text-[24px] md:text-[28px] font-bold tracking-[-0.04em] text-foreground mb-8 group-hover:text-primary transition-colors duration-500 relative z-10">{group.brand}</h3>

					<!-- Certificates List with Bullets -->
					<div class="flex flex-col gap-4 w-full relative z-10 text-left px-5">
						{#each group.items as item}
							<div class="flex items-start gap-3 group/item">
								<div class="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover/item:bg-primary transition-all duration-300 mt-2 shrink-0 shadow-[0_0_8px_rgba(0,43,255,0)] group-hover/item:shadow-[0_0_8px_rgba(0,43,255,0.4)]"></div>
								<div class="flex flex-col">
									<span class="text-[15px] md:text-[17px] font-medium text-foreground/90 leading-tight tracking-[-0.02em]">{item.title}</span>
									<span class="text-[11px] font-mono text-muted-foreground/60 uppercase tracking-widest mt-1.2">{item.year}</span>
								</div>
							</div>
						{/each}
					</div>
					
					<!-- Background Highlight Glow -->
					<div class="absolute inset-0 bg-primary/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
				</div>
			{/each}
		</div>

		<!-- See All CTA -->
		<div class="mt-16 flex justify-center opacity-0 cert-item">
			<a 
				href="https://www.linkedin.com/in/phantom-cluster/details/certifications/" 
				target="_blank" 
				rel="noopener noreferrer"
				class="group/btn relative px-9 py-4 rounded-full bg-primary text-white font-semibold text-[15px] overflow-hidden transition-all duration-500 hover:scale-[1.03] active:scale-[0.97] shadow-[0_12px_24px_-10px_rgba(0,43,255,0.4)]"
			>
				<span class="relative z-10 flex items-center gap-3">
					See Certificate
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-500 group-hover/btn:translate-x-1.2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
				</span>
				<div class="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
			</a>
		</div>
	</section>
</div>
