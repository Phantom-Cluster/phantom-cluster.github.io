<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { Star, ExternalLink, ArrowRight } from 'lucide-svelte';
	import profilePic from '$lib/assets/527DDCBC-EBF7-4AD8-AEB8-1F3087FDB9E1.JPG';
	import starImg from '$lib/assets/Cylindrical Half Star.png';
	import gemImg from '$lib/assets/Gem Shape.png';

	let cardEl: HTMLElement;
	let cardContainerEl: HTMLElement;
	let cardSlotEl: HTMLElement;
	let h1El: HTMLElement;
	let manifestoEl: HTMLElement;
	let pageWrapperEl: HTMLElement;

	const experienceYears = new Date().getFullYear() - 2018;

	let ctx: gsap.Context;
	let initTimeout: NodeJS.Timeout;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Delay initialization by 700ms to guarantee SvelteKit page transitions have finished
		initTimeout = setTimeout(() => {
			ctx = gsap.context(() => {

		// Calculate exact distance for the FLIP landing
		const getDistance = () => {
			if (!cardContainerEl || !cardSlotEl) return 0;
			return cardSlotEl.getBoundingClientRect().top - cardContainerEl.getBoundingClientRect().top;
		};

		// Hero 3D Physics & FLIP Pinning
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: cardContainerEl,
				start: 'center center',
				end: () => `+=${getDistance()}`,
				scrub: true,
				pin: true,
				pinSpacing: false,
				invalidateOnRefresh: true
			}
		});

		tl.to(cardEl, {
			rotateX: 180,
			ease: 'none'
		}, 0)
		.to(pageWrapperEl, {
			backgroundColor: '#0a0a0c',
			color: '#ffffff',
			ease: 'none'
		}, 0);

		// Fade out H1 separately as we scroll down so it doesn't overlap text
		gsap.to(h1El, {
			opacity: 0,
			y: -50,
			ease: 'none',
			scrollTrigger: {
				trigger: h1El.closest('section'),
				start: 'top top',
				end: 'bottom center',
				scrub: true
			}
		});

		// Manifesto Mask
		const words = manifestoEl.querySelectorAll('span');
		gsap.fromTo(words, 
			{ color: 'rgba(255,255,255,0.1)' },
			{
				color: '#ffffff',
				stagger: 0.1,
				ease: 'none',
				scrollTrigger: {
					trigger: manifestoEl.closest('section'),
					start: 'top center',
					end: 'bottom center',
					scrub: true
				}
			}
		);

		// Floating 3D shapes
		gsap.fromTo('.floating-shape', 
			{ y: -12, rotation: -8 },
			{ y: 12, rotation: 8, duration: 2, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 0.5 }
		);
		}); // End gsap context
		}, 700);
	});

	onDestroy(() => {
		clearTimeout(initTimeout);
		if (ctx) ctx.revert();
	});
</script>

<svelte:head>
	<title>About | Hitanshu Sahu</title>
</svelte:head>

<div bind:this={pageWrapperEl} class="bg-[#f4f4f6] text-neutral-900 min-h-screen">
	<!-- Phase 2: Hero Section -->
	<section id="about-hero" class="relative min-h-screen flex flex-col items-center justify-center pt-20 lg:pt-0">
		
		<!-- Experience Badge -->
		<div class="relative z-20 inline-flex items-center justify-center p-[1.5px] rounded-full overflow-hidden mb-8 shadow-sm bg-neutral-200">
			<div class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,#f97316_360deg)]"></div>
			<div class="relative bg-white px-5 py-2 rounded-full w-full h-full flex items-center justify-center">
				<span class="text-xs font-semibold tracking-tight text-neutral-800">{experienceYears}+ years of experience</span>
			</div>
		</div>

		<h1 bind:this={h1El} class="relative z-10 text-center font-black uppercase text-neutral-900 whitespace-nowrap mb-8 lg:mb-12" style="font-size: clamp(4rem, 10.5vw, 10rem); letter-spacing: -0.03em; line-height: 0.85; transform-style: preserve-3d;">
			<img src={starImg} alt="3D Star" class="floating-shape absolute object-contain pointer-events-none" style="z-index: -1; top: -3vw; left: -6vw; width: clamp(80px, 7vw, 140px);" />
			Product <br/> Designer
			<img src={gemImg} alt="3D Gem" class="floating-shape absolute object-contain pointer-events-none" style="z-index: -1; bottom: -3vw; right: -6vw; width: clamp(80px, 7vw, 140px);" />
		</h1>

		<div bind:this={cardContainerEl} class="relative z-20 w-full max-w-[260px] lg:max-w-[320px] aspect-[4/5] mx-auto" style="perspective: 1500px;">
			<div bind:this={cardEl} class="w-full h-full relative" style="transform-style: preserve-3d;">
				<!-- Front Face (Grayscale) -->
				<div class="absolute inset-0 rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.15)] border border-neutral-900/10" style="backface-visibility: hidden;">
					<img src={profilePic} alt="Hitanshu Sahu Profile" class="w-full h-full object-cover grayscale" />
				</div>
				<!-- Back Face (Color) -->
				<div class="absolute inset-0 rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] border border-white/10" style="backface-visibility: hidden; transform: rotateX(180deg);">
					<img src={profilePic} alt="Hitanshu Sahu Profile Color" class="w-full h-full object-cover" />
				</div>
			</div>
		</div>
	</section>

	<!-- Phase 3: The Copy Split Grid -->
	<section id="about-bio" class="relative py-20 lg:py-32 px-6">
		<div class="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px_1fr] gap-12 lg:gap-16 items-center lg:items-start">
			<div class="flex flex-col gap-8 lg:pr-4">
				<h2 class="text-5xl md:text-6xl font-bold tracking-tight">Hey!</h2>
				<p class="text-xl text-neutral-400 leading-relaxed font-medium">
					I'm Hitanshu Sahu, a tech-obsessed Product Designer based in Kanpur, India. I focus on bridging the exact gap between advanced visual interfaces and technical frontend architecture.
				</p>
			</div>
			
			<!-- Structural Gap for Card Positioning (Target Slot) -->
			<div bind:this={cardSlotEl} class="w-full max-w-[260px] lg:max-w-none mx-auto aspect-[4/5] rounded-3xl pointer-events-none opacity-0"></div>
			
			<div class="flex flex-col gap-12 lg:pl-4 lg:pt-4">
				<p class="text-lg text-neutral-400 leading-relaxed">
					With over 7 years of deep ecosystem experience, I build, launch, and scale intuitive UI systems for complex SaaS platforms, high-growth digital products, and optimized WordPress frameworks.
				</p>
				<p class="text-lg text-neutral-400 leading-relaxed">
					Holding an academic foundation with a Master in Computer Application (MCA), my design logic translates naturally to robust developer handoffs and clean atomic systems—no delays, no drama.
				</p>
			</div>
		</div>
	</section>

	<!-- Phase 4: Manifesto Reveal -->
	<section id="about-manifesto" class="py-40 px-6 flex items-center justify-center border-t border-white/5 relative">
		<div bind:this={manifestoEl} class="max-w-5xl mx-auto text-center">
			<p class="text-3xl md:text-5xl lg:text-[4.5rem] font-bold leading-tight tracking-tight flex flex-wrap justify-center gap-x-3 md:gap-x-4 gap-y-2">
				{#each "From idea to launch. Clean, scalable digital products built to move fast, stay simple, and perform in real-world use. Driven by clarity, structured systems, and intentional design.".split(" ") as word}
					<span class="inline-block transition-colors">{word}</span>
				{/each}
			</p>
		</div>
	</section>

	<!-- Phase 5: Credentials Bento Box -->
	<section id="credentials-bento" class="py-32 px-6 border-t border-white/5 bg-transparent">
		<div class="max-w-[1440px] mx-auto mb-24">
			<h3 class="text-sm font-mono text-primary tracking-widest uppercase mb-12 text-center md:text-left">Verifiable Credentials</h3>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				<!-- Google Bento Card -->
				<div class="bg-[#121318] border border-white/5 p-10 md:p-12 rounded-[2.5rem] flex flex-col">
					<div class="flex items-center gap-4 mb-8 pb-8 border-b border-white/5">
						<svg class="w-10 h-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#f4f4f4" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
						<h4 class="text-2xl font-bold tracking-tight">Google Cloud / AI</h4>
					</div>
					<ul class="flex flex-col gap-4">
						{#each ['Foundations of UX Design', 'Prompt Design in Vertex AI', 'Generative AI Explorer', 'Intro to Image Generation', 'Responsible AI', 'MLOps for Gen AI', 'Google Prompting Essentials', 'Google AI Essentials'] as item}
							<a href="https://www.linkedin.com/in/phantom-cluster/details/certifications/" target="_blank" rel="noopener noreferrer" class="group flex items-center justify-between text-neutral-400 hover:text-white transition-all duration-300 hover:translate-x-1 relative p-2 rounded-lg after:absolute after:inset-0 after:-z-10 after:bg-primary/5 after:shadow-[0_0_20px_rgba(245,53,0,0.15)] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500 after:rounded-lg">
								<span class="relative z-10 font-medium">{item}</span>
								<ExternalLink class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary relative z-10" />
							</a>
						{/each}
					</ul>
				</div>
				
				<!-- Uxcel Bento Card -->
				<div class="bg-[#121318] border border-white/5 p-10 md:p-12 rounded-[2.5rem] flex flex-col">
					<div class="flex items-center gap-4 mb-8 pb-8 border-b border-white/5">
						<!-- Custom SVG matching Uxcel logo vibe -->
						<svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#f4f4f4"/>
							<path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#f4f4f4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
						<h4 class="text-2xl font-bold tracking-tight">Uxcel Visual Engineering</h4>
					</div>
					<ul class="flex flex-col gap-4">
						{#each ['UX Design Psychology', '3D Design Foundations', 'Wireframing', 'Design Accessibility (WCAG)', 'UI Components I', 'UX Design Foundations'] as item}
							<a href="https://www.linkedin.com/in/phantom-cluster/details/certifications/" target="_blank" rel="noopener noreferrer" class="group flex items-center justify-between text-neutral-400 hover:text-white transition-all duration-300 hover:translate-x-1 relative p-2 rounded-lg after:absolute after:inset-0 after:-z-10 after:bg-primary/5 after:shadow-[0_0_20px_rgba(245,53,0,0.15)] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500 after:rounded-lg">
								<span class="relative z-10 font-medium">{item}</span>
								<ExternalLink class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary relative z-10" />
							</a>
						{/each}
					</ul>
				</div>
			</div>
		</div>

		<!-- Infinite Marquee -->
		<div class="w-full overflow-hidden relative select-none mt-12 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
			<div class="flex gap-4 whitespace-nowrap animate-marquee w-max">
				{#each Array(4) as _}
					{#each ['Atomic Design Systems', 'Starter Templates', 'WordPress Gutenberg/Elementor', 'User Flow Mapping', 'Animation', 'Motion UI', 'Developer Handoff'] as strength}
						<div class="px-6 py-3 border border-white/10 rounded-full text-sm font-semibold tracking-wide text-neutral-300 bg-white/5 backdrop-blur-sm shadow-sm">
							{strength}
						</div>
					{/each}
				{/each}
			</div>
		</div>
	</section>

	<!-- Phase 6: Ecosystem Cross-Linking -->
	<section id="project-routing" class="py-32 px-6 border-t border-white/5 text-center bg-transparent">
		<span class="font-mono text-xs uppercase text-neutral-500 tracking-widest block mb-4">Explore</span>
		<h2 class="text-4xl md:text-5xl font-black mb-16 tracking-tight text-white">See systems in action →</h2>
		
		<div class="flex flex-col md:flex-row items-center justify-center gap-6 max-w-4xl mx-auto">
			<a href="/#wpmudev" class="group relative px-8 py-6 rounded-[2rem] bg-[#121318] border border-white/5 transition-transform hover:-translate-y-1 after:absolute after:inset-0 after:-z-10 after:shadow-[0_16px_48px_-12px_rgba(245,53,0,0.15)] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500 after:rounded-[2rem] flex items-center gap-4 w-full md:w-auto justify-center">
				<span class="font-bold text-lg text-white">WPMU DEV</span>
				<ArrowRight class="w-5 h-5 text-neutral-500 group-hover:text-primary transition-colors group-hover:translate-x-1 duration-300" />
			</a>
			<a href="/#ideajam" class="group relative px-8 py-6 rounded-[2rem] bg-[#121318] border border-white/5 transition-transform hover:-translate-y-1 after:absolute after:inset-0 after:-z-10 after:shadow-[0_16px_48px_-12px_rgba(245,53,0,0.15)] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500 after:rounded-[2rem] flex items-center gap-4 w-full md:w-auto justify-center">
				<span class="font-bold text-lg text-white">Ideajam</span>
				<ArrowRight class="w-5 h-5 text-neutral-500 group-hover:text-primary transition-colors group-hover:translate-x-1 duration-300" />
			</a>
			<a href="/#eclectic" class="group relative px-8 py-6 rounded-[2rem] bg-[#121318] border border-white/5 transition-transform hover:-translate-y-1 after:absolute after:inset-0 after:-z-10 after:shadow-[0_16px_48px_-12px_rgba(245,53,0,0.15)] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500 after:rounded-[2rem] flex items-center gap-4 w-full md:w-auto justify-center">
				<span class="font-bold text-lg text-white">Eclectic</span>
				<ArrowRight class="w-5 h-5 text-neutral-500 group-hover:text-primary transition-colors group-hover:translate-x-1 duration-300" />
			</a>
		</div>
	</section>
</div>

<style>
	@keyframes marquee {
		0% { transform: translateX(0); }
		100% { transform: translateX(-50%); }
	}
	.animate-marquee {
		animation: marquee 30s linear infinite;
	}
</style>
