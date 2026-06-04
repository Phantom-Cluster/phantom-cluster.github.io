<script lang="ts">
	import FeaturedProject from "$lib/components/FeaturedProject.svelte";
	import StackedProjects from "$lib/components/StackedProjects.svelte";
	import PartnerMarquee from "$lib/components/PartnerMarquee.svelte";
	import { projects } from "$lib/data/projects";
	import { Button } from "$lib/components/ui/button";
	import { onMount } from "svelte";
	import { gsap } from "gsap";
	import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
	import { ChevronDown, Send, ArrowRight } from "lucide-svelte";
	import VanillaTilt from "vanilla-tilt";
	import portrait from "$lib/assets/527DDCBC-EBF7-4AD8-AEB8-1F3087FDB9E1.JPG";
	import heroVideo from "$lib/assets/Header_grid node.mp4";
	import cubeImg from "$lib/assets/4 Cube Abstract Glass Spectrum.png";
	import gemImg from "$lib/assets/Gem Shape.png";

	// Hero element refs for GSAP entrance
	let heroHeadline: HTMLElement;
	let heroBio: HTMLElement;
	let heroImage: HTMLElement;
	let heroBar: HTMLElement;

	// Spotlight cursor tracking — initialised to visual center
	let mouseX = $state(800);
	let mouseY = $state(400);

	// Target coords updated on every mousemove (raw, rect-relative)
	let targetX = 800;
	let targetY = 400;

	const handleMouseMove = (event: MouseEvent) => {
		const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
		targetX = event.clientX - rect.left;
		targetY = event.clientY - rect.top;
	};

	let bridgeRotateX = $state(0);
	let bridgeRotateY = $state(0);

	const handleBridgeMouseMove = (e: MouseEvent) => {
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		
		bridgeRotateY = ((x / rect.width) - 0.5) * 30; 
		bridgeRotateX = ((y / rect.height) - 0.5) * -30;
	};
	
	const handleBridgeMouseLeave = () => {
		bridgeRotateX = 0;
		bridgeRotateY = 0;
	};

	let activeFaq = $state(-1);

	const capabilities = [
		{
			id: "001",
			title: "Product Strategy",
			desc: "Defining user flows, mapping technical constraints, and establishing the architectural blueprint before high-fidelity execution.",
		},
		{
			id: "002",
			title: "Design Systems",
			desc: "Engineering modular, scalable Figma libraries for seamless cross-functional engineering handoffs.",
		},
		{
			id: "003",
			title: "SaaS Interface Design",
			desc: "Structuring complex data into clean, accessible user interfaces focused on retention and usability.",
		},
		{
			id: "004",
			title: "WordPress Ecosystems",
			desc: "Developing custom Gutenberg block workflows, Elementor systems, and highly optimized starter templates.",
		},
		{
			id: "005",
			title: "Motion & Interaction",
			desc: "Prototyping hardware-accelerated animations to improve perceived performance and interactive feedback.",
		},
		{
			id: "006",
			title: "AI-Assisted Workflows",
			desc: "Leveraging platforms like Vertex AI and Google Stitch to accelerate design operations and prototype application logic.",
		},
		{
			id: "007",
			title: "Conversion Optimization",
			desc: "Reducing friction in critical user onboarding paths and operational dashboards.",
		},
	];

	let activeProcessIndex = $state(0);
	let processCards: HTMLElement[] = $state([]);

	const processSteps = [
		{
			num: "01",
			title: "Think",
			desc: "Every project starts with understanding. I listen, analyze constraints, and study user behaviors to make context-driven decisions.",
		},
		{
			num: "02",
			title: "Define",
			desc: "Ideas take clear shape. I outline structural blueprints, UX layouts, and functional details connecting design with product goals.",
		},
		{
			num: "03",
			title: "Design",
			desc: "Pixel-perfect execution. I build unified atomic components, establish flexible typography systems, and customize visual variables.",
		},
		{
			num: "04",
			title: "Refine",
			desc: "Details make excellence. I test across devices, conduct performance reviews, and continuously polish micro-interactions.",
		},
		{
			num: "05",
			title: "Deliver",
			desc: "Confident execution. I deliver clean Figma libraries or optimized front-end systems ready for scalable deployment.",
		},
	];

	const engagementModels = [
		{
			title: "Project Based",
			desc: "Best for clearly defined projects with a fixed scope, set timelines, and definitive milestones.",
			benefits: [
				"Defined deliverables",
				"Fixed timeline",
				"Full design execution",
				"Two refinement rounds",
				"Complete handoff",
			],
			ctaUrl: "mailto:phantomcluster17@gmail.com?subject=Inquiry:%20Project%20Based%20Engagement&body=Hi%20Hitanshu,%0D%0A%0D%0AI%20am%20interested%20in%20a%20project-based%20engagement.%0D%0A%0D%0AMy%20current%20challenge%20is:%20[Briefly%20describe]%0D%0AEstimated%20Timeline:%20[Timeline]%0D%0A%0D%0AThank%20you.",
		},
		{
			title: "Retainer Support",
			desc: "Ideal for product teams needing ongoing, adaptive design leadership and constant feature upgrades.",
			benefits: [
				"Monthly hour allocation",
				"Ongoing designer support",
				"Flexible prioritizations",
				"Interactive review cycles",
				"Dev alignment channels",
			],
			ctaUrl: "mailto:phantomcluster17@gmail.com?subject=Inquiry:%20Retainer%20Support&body=Hi%20Hitanshu,%0D%0A%0D%0AI%20am%20interested%20in%20securing%20retainer%20support%20for%20my%20product%20team.%0D%0A%0D%0AOur%20primary%20design%20needs%20are:%20[Briefly%20describe]%0D%0A%0D%0AThank%20you.",
		},
		{
			title: "Custom Partnership",
			desc: "Tailored consulting models for early-stage startups and complex enterprise system setups.",
			benefits: [
				"Multi-phase work systems",
				"Customized team scope",
				"Cross-disciplinary design",
				"Fractional system leadership",
				"Weekly alignments",
			],
			ctaUrl: "mailto:phantomcluster17@gmail.com?subject=Inquiry:%20Custom%20Partnership&body=Hi%20Hitanshu,%0D%0A%0D%0AI%20would%20like%20to%20discuss%20a%20custom%20partnership/consulting%20model.%0D%0A%0D%0AOur%20company%20goals%20are:%20[Briefly%20describe]%0D%0A%0D%0AThank%20you.",
		},
	];

	const faqs = [
		{
			q: "Who do you typically work with?",
			a: "I partner with tech founders, SaaS startups, and WordPress plugin businesses who value design as a primary business accelerator. Industry matters less than a shared drive for visual clarity and robust engineering.",
		},
		{
			q: "Do you design and code?",
			a: "Yes! I bridge the gap between design systems in Figma and frontend performance. I specialize in building atomic design systems, Gutenberg/Elementor blocks, and clean SvelteKit/Tailwind templates.",
		},
		{
			q: "How do projects usually start?",
			a: "I start with a quick alignment session to outline structural constraints and goals. From there, I build a custom interactive flow map and visual design system that aligns with your technical timelines.",
		},
		{
			q: "What engagement models do you offer?",
			a: "I offer fixed-scope project arrangements, monthly design support contracts (retainers), and custom fractional Product Design consulting.",
		},
		{
			q: "Do you offer support after a project ends?",
			a: "Absolutely. I provide documentation support for developer handoffs and offer retainer options for ongoing updates, testing, and audits.",
		},
	];

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Page reveals
		gsap.from(".reveal-section", {
			opacity: 0,
			y: 50,
			duration: 1,
			stagger: 0.15,
			ease: "power3.out",
			scrollTrigger: {
				trigger: ".reveal-trigger",
				start: "top 80%",
			},
		});

		// Spotlight horizontal marquee scroll
		gsap.to(".marquee-inner", {
			xPercent: -50,
			ease: "none",
			scrollTrigger: {
				trigger: ".marquee-container",
				start: "top bottom",
				end: "bottom top",
				scrub: 1,
			},
		});

		// --- Metrics Card 3D Tilt ---
		const metricsCard = document.querySelector(".metrics-tilt-card");
		if (metricsCard) {
			const isTouchDevice = window.matchMedia(
				"(hover: none) and (pointer: coarse)",
			).matches;
			if (!isTouchDevice) {
				VanillaTilt.init(metricsCard as HTMLElement, {
					max: 3.5,
					speed: 400,
					glare: true,
					"max-glare": 0.06,
					easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)", // Spring-like cubic bezier
				});
			}
		}

		// --- Process Scroll-Driven Reveal ---
		const processStepsList = document.querySelectorAll(".process-step");
		gsap.set(processStepsList, {
			opacity: 0.3,
			x: -15,
			willChange: "opacity, transform",
		});

		processStepsList.forEach((step) => {
			ScrollTrigger.create({
				trigger: step,
				start: "top 65%",
				end: "bottom 35%",
				onEnter: () =>
					gsap.to(step, {
						opacity: 1,
						x: 0,
						duration: 0.4,
						ease: "power2.out",
						overwrite: "auto",
					}),
				onLeave: () =>
					gsap.to(step, {
						opacity: 0.3,
						x: -15,
						duration: 0.4,
						ease: "power2.out",
						overwrite: "auto",
						filter: "grayscale(100%)",
					}),
				onEnterBack: () =>
					gsap.to(step, {
						opacity: 1,
						x: 0,
						duration: 0.4,
						ease: "power2.out",
						overwrite: "auto",
						filter: "grayscale(0%)",
					}),
				onLeaveBack: () =>
					gsap.to(step, {
						opacity: 0.3,
						x: -15,
						duration: 0.4,
						ease: "power2.out",
						overwrite: "auto",
						filter: "grayscale(100%)",
					}),
			});
		});
		// ---- Hero entrance stagger ----
		gsap.from(
			[heroHeadline, heroBio, heroImage, heroBar],
			{
				y: 30,
				opacity: 0,
				duration: 1,
				stagger: 0.1,
				ease: "power3.out",
				delay: 0.15,
			}
		);

		// ---- Spotlight lerp loop (10% per frame → smooth trailing inertia) ----
		let rafId: number;
		const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
		const tick = () => {
			mouseX = lerp(mouseX, targetX, 0.1);
			mouseY = lerp(mouseY, targetY, 0.1);
			rafId = requestAnimationFrame(tick);
		};
		rafId = requestAnimationFrame(tick);

		// ---- Process card center-viewport active state ----
		const processObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeProcessIndex = parseInt(
							(entry.target as HTMLElement).dataset.index ?? '0'
						);
					}
				});
			},
			{ rootMargin: '-40% 0px -40% 0px', threshold: 0 }
		);
		// Wait a tick for bind:this to populate processCards
		setTimeout(() => {
			processCards.forEach((card) => { if (card) processObserver.observe(card); });
		}, 100);

		return () => {
			cancelAnimationFrame(rafId);
			processObserver.disconnect();
		};
	});
</script>

<!-- ═══════════════════════════════════════════════════════════
     EDITORIAL HERO
     Layout: 12-col grid · fluid nameplate · greyscale portrait
     ══════════════════════════════════════════════════════════ -->
<section
	onmousemove={handleMouseMove}
	data-theme="dark"
	role="region"
	aria-label="Hero"
	class="relative h-[100svh] w-full overflow-hidden bg-black flex flex-col"
>
	<!-- ─── Video Background (full-width, edge-to-edge) ──────────────────── -->
	<div class="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
		<!-- High-Contrast Blended Video: screen burns black away, orange nodes punch through -->
		<video
			autoplay
			loop
			muted
			playsinline
			class="absolute min-w-full min-h-full object-cover opacity-70 mix-blend-screen contrast-125 brightness-110"
		>
			<source src={heroVideo} type="video/mp4" />
		</video>
	</div>

	<!-- Dynamic spotlight vignette — tracks cursor with lerp inertia -->
	<div
		class="absolute inset-0 z-[1] pointer-events-none"
		style="background: radial-gradient(circle 600px at {mouseX}px {mouseY}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 40%, #000000 70%);"
	></div>

	<!-- ─── Content wrapper (constrained) ───────────────────────────────── -->
	<div class="relative z-10 flex-1 flex flex-col justify-center max-w-[1600px] mx-auto w-full px-6 lg:px-12 mt-16 md:mt-0">
		<!-- 12-col primary grid -->
		<div class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center w-full">

			<!-- Left col · span 8 · three-tier nameplate -->
			<div class="col-span-1 md:col-span-8 flex flex-col justify-center">
				<div class="relative z-20 flex flex-col justify-center">
					<h1
						bind:this={heroHeadline}
						class="text-[16vw] md:text-[9vw] leading-[0.85] tracking-tighter font-medium text-white select-none"
					>
						Hitanshu <br /> Sahu.
					</h1>

					<h2 class="text-2xl md:text-4xl text-gray-300 font-normal tracking-tight mt-6">
						Product Designer.
					</h2>

					<p
						bind:this={heroBio}
						class="max-w-md text-gray-500 mt-6 text-lg font-normal leading-relaxed"
					>
						Building clean digital products, high-growth SaaS interfaces, and
						optimized frontend systems.
					</p>
				</div>
			</div>

			<!-- Right col · span 4 · greyscale portrait -->
			<div class="col-span-1 md:col-span-4 flex justify-start md:justify-end">
				<div
					bind:this={heroImage}
					class="w-full max-w-[320px] aspect-[3/4] relative"
				>
					<img
						src={portrait}
						alt="Hitanshu Sahu — Product Designer"
						class="w-full h-full object-cover rounded-2xl grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-500 relative z-20"
					/>
				</div>
			</div>
		</div>
	</div>

	<!-- ─── Pinned Utility Bar ──────────────────────────────────────────── -->
	<div class="relative z-20 w-full max-w-[1600px] mx-auto px-6 lg:px-12 pb-8 mt-auto">
		<div class="border-t border-white/10 pt-6">
			<!-- Utility chips · content-hugging flex row -->
			<div
				bind:this={heroBar}
				class="w-full flex flex-col md:flex-row flex-wrap justify-between items-center gap-4 text-[10px] md:text-xs font-mono uppercase tracking-widest"
			>
				<div class="w-full md:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white/[0.03] border border-white/10 text-gray-400 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.08] hover:text-white hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-default">
					<span>Core: Figma, Svelte, WordPress</span>
				</div>

				<div class="w-full md:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white/[0.03] border border-white/10 text-gray-400 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.08] hover:text-white hover:border-[#FF4400]/50 hover:shadow-[0_0_20px_rgba(255,68,0,0.15)] cursor-default">
					<span>Specialization: SaaS, Dashboards &amp; Atomic Systems</span>
				</div>

				<div class="w-full md:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white/[0.03] border border-white/10 text-gray-400 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.08] hover:text-white hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-default">
					<span>7+ Years Deep Ecosystem Experience</span>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- (01) ABOUT SPLIT SECTION (Light Section) -->
<!-- (01) CREATIVE SPECIALIST SECTION (Light Section) -->
<section
	id="studio"
	data-theme="light"
	class="bg-[#f4f4f6] border-t border-neutral-200/50"
>
	<div class="w-full max-w-[1600px] mx-auto px-6 lg:px-12 py-32 lg:py-40">
		<div class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">

			<!-- Left Column: Meta Label (2 Columns) -->
			<div class="col-span-1 md:col-span-2 pt-2">
				<p class="text-[10px] font-mono tracking-widest text-gray-500 uppercase">
					(01) System Architecture
				</p>
			</div>

			<!-- Center Column: Value Proposition (6 Columns) -->
			<div class="col-span-1 md:col-span-6 pr-0 md:pr-8">
				<h2 class="text-3xl md:text-[2.5rem] leading-[1.15] font-semibold tracking-tight text-black mb-6">
					Architecting scalable UI systems and production-ready frontends for high-growth SaaS.
				</h2>

				<p class="text-gray-600 text-lg leading-relaxed mb-10">
					I operate at the intersection of high-fidelity design and technical execution. Over the past 7 years, I've integrated with companies like WPMU DEV to translate complex constraints into robust, compliant design systems.
				</p>

				<ul class="space-y-6">
					<li class="flex items-start gap-4">
						<div class="relative flex h-3 w-3 mt-1.5 flex-shrink-0">
							<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4400] opacity-60" style="animation-delay: 0ms;"></span>
							<span class="relative inline-flex rounded-full h-3 w-3 bg-[#FF4400]"></span>
						</div>
						<span class="text-gray-600 text-lg leading-snug">
							<strong class="font-semibold text-black tracking-tight">Atomic Design:</strong>
							Engineering modular, reusable component libraries.
						</span>
					</li>

					<li class="flex items-start gap-4">
						<div class="relative flex h-3 w-3 mt-1.5 flex-shrink-0">
							<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4400] opacity-60" style="animation-delay: 300ms;"></span>
							<span class="relative inline-flex rounded-full h-3 w-3 bg-[#FF4400]"></span>
						</div>
						<span class="text-gray-600 text-lg leading-snug">
							<strong class="font-semibold text-black tracking-tight">WordPress &amp; Gutenberg:</strong>
							Optimizing custom editor workflows.
						</span>
					</li>

					<li class="flex items-start gap-4">
						<div class="relative flex h-3 w-3 mt-1.5 flex-shrink-0">
							<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4400] opacity-60" style="animation-delay: 600ms;"></span>
							<span class="relative inline-flex rounded-full h-3 w-3 bg-[#FF4400]"></span>
						</div>
						<span class="text-gray-600 text-lg leading-snug">
							<strong class="font-semibold text-black tracking-tight">Frontend Architecture:</strong>
							Building scalable systems for long-term growth.
						</span>
					</li>
				</ul>
			</div>

			<!-- Right Column: Metrics & Impact Card (4 Columns) -->
			<div class="col-span-1 md:col-span-4 mt-12 md:mt-0">
				<div class="w-full bg-[#0b0c10] border border-gray-800 rounded-[2rem] p-8 md:p-10 text-white min-h-[400px] flex flex-col justify-between">

					<p class="text-[#FF4400] text-[10px] font-mono tracking-widest uppercase mb-12">
						Metrics &amp; Impact
					</p>

					<div class="space-y-10">
						<div>
							<h3 class="text-6xl font-medium tracking-tighter mb-2">98%</h3>
							<p class="text-gray-500 text-xs tracking-widest uppercase font-mono">Client Satisfaction</p>
						</div>
						<div>
							<h3 class="text-6xl font-medium tracking-tighter mb-2">2M+</h3>
							<p class="text-gray-500 text-xs tracking-widest uppercase font-mono">Active Plugin Users</p>
						</div>
						<div>
							<h3 class="text-6xl font-medium tracking-tighter mb-2">50+</h3>
							<p class="text-gray-500 text-xs tracking-widest uppercase font-mono">Starter Templates Completed</p>
						</div>
					</div>

				</div>
			</div>

		</div>
	</div>
</section>

<!-- BRIDGING THE GAP PARALLAX (Light Section) -->
<section 
	data-theme="light"
	onmousemove={handleBridgeMouseMove} 
	onmouseleave={handleBridgeMouseLeave}
	class="relative w-full py-32 md:py-40 flex flex-col items-center justify-center bg-[#f8f9fa] overflow-hidden border-t border-gray-200"
	style="perspective: 1000px;"
>
	<div class="relative z-10 flex flex-col justify-center items-center text-center w-full max-w-[1600px] px-6 lg:px-12">
		<img 
			src={cubeImg} 
			alt="Glass Cubes" 
			class="absolute top-0 -left-8 md:-top-12 md:left-12 w-28 md:w-48 h-auto object-contain opacity-90 pointer-events-none drop-shadow-[0_20px_30px_rgba(0,0,0,0.1)] z-20 transition-transform duration-300 ease-out"
			style="transform: rotateX({bridgeRotateX * 0.8}deg) rotateY({bridgeRotateY * 0.8}deg) translateZ(40px);"
		/>

		<div class="relative z-30 max-w-4xl mx-auto">
			<h2 class="text-[10vw] md:text-[7vw] leading-[0.9] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-black via-[#1a1a1a] to-[#666666] uppercase">
				BRIDGING <br/> THE GAP.
			</h2>
			
			<p class="mt-8 text-lg md:text-xl text-gray-500 font-medium tracking-tight">
				Translating high-fidelity interface design into production-ready code. <br class="hidden md:block"/> 
				Here is the proof.
			</p>
		</div>

		<img 
			src={gemImg} 
			alt="Glass Gem" 
			class="absolute bottom-0 -right-4 md:-bottom-8 md:right-24 w-20 md:w-36 h-auto object-contain opacity-90 pointer-events-none drop-shadow-[0_20px_30px_rgba(0,0,0,0.1)] z-20 transition-transform duration-300 ease-out"
			style="transform: rotateX({bridgeRotateX * -1.2}deg) rotateY({bridgeRotateY * -1.2}deg) translateZ(60px);"
		/>
	</div>
</section>

<!-- PARTNER LOGO MARQUEE (Light Section) -->
<PartnerMarquee />

<!-- Repurposed Visual Card WPMU DEV Highlight Case study with Watermark background -->
<FeaturedProject />

<!-- (02) FEATURED PROJECTS SECTION (Light Section) -->
<StackedProjects />

<!-- (02) CAPABILITIES SECTION (Dark Section) -->
<section
	id="capabilities"
	data-theme="dark"
	class="py-32 bg-neutral-950 text-white border-t border-white/5 z-10 relative"
>
	<div class="container mx-auto px-6 max-w-[1440px]">
		<div class="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-20">
			<div class="lg:col-span-1">
				<span
					class="font-mono text-xs uppercase text-neutral-500 tracking-widest block mb-4"
					>(04) Capabilities</span
				>
			</div>
			<div class="lg:col-span-3">
				<h2
					class="text-4xl md:text-7xl font-bold tracking-tighter text-white leading-none"
				>
					What I Do
				</h2>
				<p
					class="text-neutral-400 mt-6 max-w-[55ch] text-sm md:text-base leading-relaxed"
				>
					Combining UX strategy, pixel-perfect visual engineering, and
					systematic responsive layouts to launch high-performance
					digital solutions.
				</p>
			</div>
		</div>

		<!-- Seven numbered capabilities rows -->
		<div class="border-t border-white/5 divide-y divide-white/5">
			{#each capabilities as cap}
				<!-- The interactive row wrapper now uses CSS Grid -->
				<div class="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 border-b border-gray-800 transition-colors duration-300 hover:bg-white/[0.02] px-4 -mx-4 cursor-default">
				  
				  <!-- Column 1: Number -->
				  <div class="col-span-1 flex items-start pt-1">
				    <span class="font-mono text-xs text-gray-500 transition-colors duration-300 group-hover:text-[#FF4400]">
				      {cap.id}
				    </span>
				  </div>

				  <!-- Column 2: Title (Brightens, shifts, and glows on hover) -->
				  <div class="col-span-1 md:col-span-4">
				    <h3 class="text-xl md:text-2xl font-medium text-gray-300 transition-all duration-300 transform group-hover:text-white group-hover:translate-x-2 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]">
				      {cap.title}
				    </h3>
				  </div>

				  <!-- Column 3: Description (Strictly left-aligned) -->
				  <div class="col-span-1 md:col-span-7">
				    <p class="text-gray-400 text-sm md:text-base text-left leading-relaxed transition-colors duration-300 group-hover:text-gray-200">
				      {cap.desc}
				    </p>
				  </div>

				</div>
			{/each}
		</div>
	</div>
</section>

<!-- (03) MY PROCESS SECTION (Light Section) -->
<section data-theme="light" class="py-32 bg-[#f4f4f6] border-t border-neutral-200/50">
	<div class="container mx-auto px-6 max-w-[1440px] grid grid-cols-1 lg:grid-cols-4 gap-12">
		<div class="lg:col-span-1">
			<p class="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block mb-4">(03) My Process</p>
			<h3 class="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-none sticky top-32">
				A Thoughtful Process Behind My Work
			</h3>
		</div>

		<div class="lg:col-span-3 space-y-6">
			{#each processSteps as step, i}
				{@const isActive = activeProcessIndex === i}
				<div
					bind:this={processCards[i]}
					data-index={i}
					class="process-step w-full text-left p-8 md:p-12 border rounded-[2rem] flex flex-col justify-between bg-white transition-all duration-500 ease-out {isActive ? 'shadow-lg scale-[1.02]' : 'border-neutral-200 opacity-60 scale-100'}"
					style={isActive ? 'border-color: rgba(255,68,0,0.35);' : ''}
				>
					<div class="flex items-center gap-6 mb-4">
						<span class="font-mono text-sm text-neutral-400">{step.num}</span>
						<h4
							class="text-2xl md:text-3xl font-semibold tracking-tight transition-colors duration-500 ease-out"
							style="color: {isActive ? '#FF4400' : '#171717'};"
						>
							{step.title}
						</h4>
					</div>
					<p class="mt-2 text-neutral-600 text-lg leading-relaxed font-medium">
						{step.desc}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- (05) ENGAGEMENT MODELS (Dark Section) -->
<section
	data-theme="dark"
	class="py-32 bg-neutral-950 text-white border-t border-white/5 z-10 relative"
>
	<div class="container mx-auto px-6 max-w-[1440px]">
		<div class="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-24">
			<div class="lg:col-span-1">
				<span
					class="font-mono text-xs uppercase text-neutral-500 tracking-widest block mb-4"
					>(05) Engagement Models</span
				>
			</div>
			<div class="lg:col-span-3">
				<h2
					class="text-4xl md:text-7xl font-bold tracking-tighter text-white leading-none"
				>
					Ways to Collaborate
				</h2>
			</div>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
			{#each engagementModels as model}
				<div
					class="relative z-10 bg-neutral-900 border border-white/5 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between hover:border-primary/20 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 after:absolute after:inset-0 after:-z-10 after:rounded-[2.5rem] after:shadow-[0px_16px_48px_-12px_rgba(245,53,0,0.15)] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-[400ms] after:ease-[cubic-bezier(0.16,1,0.3,1)] after:pointer-events-none"
				>
					<div>
						<span
							class="text-primary font-mono text-xs uppercase tracking-widest block mb-6"
							>{model.title}</span
						>
						<p
							class="text-neutral-400 text-sm leading-relaxed mb-8"
						>
							{model.desc}
						</p>
					</div>
					<div>
						<span
							class="font-mono text-xs text-neutral-600 block mb-4 uppercase tracking-widest"
							>What's included</span
						>
						<ul class="space-y-3">
							{#each model.benefits as benefit}
								<li
									class="flex items-center gap-3 text-xs md:text-sm text-neutral-300"
								>
									<span
										class="size-1.5 rounded-full bg-primary flex-shrink-0"
									></span>
									<span>{benefit}</span>
								</li>
							{/each}
						</ul>

						<!-- Parameterized Routing CTA -->
						<div class="mt-12 flex justify-end">
							<a
								href={model.ctaUrl}
								class="group flex items-center gap-2 text-white/50 hover:text-primary transition-colors duration-300 font-medium text-sm"
							>
								<span>Start Conversation</span>
								<ArrowRight
									class="size-4 transition-transform duration-500 group-hover:translate-x-1"
									style="transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);"
								/>
							</a>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- (06) PARTNER MARQUEE SECTION (Light Section) -->
<section data-theme="light" class="py-32 bg-[#f4f4f6] border-t border-neutral-200/50">
	<div
		class="container mx-auto px-6 max-w-[1440px] grid grid-cols-1 lg:grid-cols-4 gap-12"
	>
		<div class="lg:col-span-1">
			<span
				class="font-mono text-xs uppercase text-neutral-500 tracking-widest block mb-4"
				>(06) Client Stories</span
			>
		</div>
		<div class="lg:col-span-3">
			<!-- Testimonial card stays solid black for gorgeous contrast pop -->
			<div
				class="bg-neutral-950 border border-white/5 rounded-[2.5rem] p-10 md:p-16 flex flex-col justify-between relative overflow-hidden shadow-2xl"
			>
				<div class="space-y-8">
					<span
						class="text-6xl text-primary font-serif select-none leading-none"
						>“</span
					>
					<blockquote
						class="text-xl md:text-3xl font-medium tracking-tight text-white leading-normal"
					>
						"Hitanshu spearheaded the design overhauled of our WPMU
						DEV plugins. His visual confidence combined with deep
						technical constraints was outstanding. He brought our
						legacy dashboards to life."
					</blockquote>
					<div
						class="border-t border-white/5 pt-8 flex items-center justify-between"
					>
						<div>
							<cite
								class="not-italic font-bold text-white block text-lg"
								>Alex Morgan</cite
							>
							<span class="text-xs text-neutral-500"
								>Founder, Nietzsche & WordPress Partner</span
							>
						</div>
						<div class="hidden sm:block text-right">
							<span class="text-xs text-neutral-500 block"
								>Scope</span
							>
							<span class="text-xs font-semibold text-white"
								>Visual Design & Gutenberg UI</span
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- (07) INSIGHTS SECTION (Dark Section) -->
<section
	id="blog"
	data-theme="dark"
	class="py-32 bg-neutral-950 text-white border-t border-white/5 z-10 relative"
>
	<div class="container mx-auto px-6 max-w-[1440px]">
		<div class="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-20">
			<div class="lg:col-span-1">
				<span
					class="font-mono text-xs uppercase text-neutral-500 tracking-widest block mb-4"
					>(07) Insights with Purpose</span
				>
			</div>
			<div class="lg:col-span-3">
				<h2
					class="text-4xl md:text-7xl font-bold tracking-tighter text-white leading-none"
				>
					Insights with Purpose
				</h2>
			</div>
		</div>

		<!-- Rows of Articles -->
		<div class="border-t border-white/5 divide-y divide-white/5">
			<div
				class="py-8 md:py-10 grid grid-cols-1 md:grid-cols-4 gap-6 items-center hover:bg-neutral-900/40 transition-colors px-4 rounded-xl"
			>
				<div class="col-span-1">
					<span class="text-neutral-500 font-mono text-xs"
						>↳ Mar 28, 2026</span
					>
				</div>
				<div class="md:col-span-2">
					<h4
						class="text-lg md:text-2xl font-bold text-white tracking-tight mb-2"
					>
						How Design Shapes More Than Just Reality
					</h4>
					<p class="text-sm text-neutral-400 leading-relaxed">
						Why brands that start with aesthetics often stall and
						how strategy shapes work that actually lasts.
					</p>
				</div>
				<div class="text-right">
					<span
						class="text-xs font-semibold text-primary uppercase tracking-widest"
						>Read Article ↳</span
					>
				</div>
			</div>

			<div
				class="py-8 md:py-10 grid grid-cols-1 md:grid-cols-4 gap-6 items-center hover:bg-neutral-900/40 transition-colors px-4 rounded-xl"
			>
				<div class="col-span-1">
					<span class="text-neutral-500 font-mono text-xs"
						>↳ Feb 19, 2026</span
					>
				</div>
				<div class="md:col-span-2">
					<h4
						class="text-lg md:text-2xl font-bold text-white tracking-tight mb-2"
					>
						It's decision-making. Design is not decoration.
					</h4>
					<p class="text-sm text-neutral-400 leading-relaxed">
						How strong creative direction turns uncertainty into
						clarity and why the best design choices are often
						invisible.
					</p>
				</div>
				<div class="text-right">
					<span
						class="text-xs font-semibold text-primary uppercase tracking-widest"
						>Read Article ↳</span
					>
				</div>
			</div>

			<div
				class="py-8 md:py-10 grid grid-cols-1 md:grid-cols-4 gap-6 items-center hover:bg-neutral-900/40 transition-colors px-4 rounded-xl"
			>
				<div class="col-span-1">
					<span class="text-neutral-500 font-mono text-xs"
						>↳ Jan 05, 2026</span
					>
				</div>
				<div class="md:col-span-2">
					<h4
						class="text-lg md:text-2xl font-bold text-white tracking-tight mb-2"
					>
						Art direction in the age of short attention.
					</h4>
					<p class="text-sm text-neutral-400 leading-relaxed">
						How to build visual systems that hold meaning even when
						people scroll fast and forget faster.
					</p>
				</div>
				<div class="text-right">
					<span
						class="text-xs font-semibold text-primary uppercase tracking-widest"
						>Read Article ↳</span
					>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- FAQ ACCORDION SECTION (Light Section) -->
<section data-theme="light" class="py-32 bg-[#f4f4f6] border-t border-neutral-200/50">
	<div
		class="container mx-auto px-6 max-w-[1440px] grid grid-cols-1 lg:grid-cols-4 gap-12"
	>
		<div class="lg:col-span-1">
			<p
				class="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block mb-4"
			>(03) Shared Expectations</p>
			<h3
				class="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-none"
			>
				Ask Anything.
			</h3>
		</div>

		<div class="lg:col-span-3 space-y-4">
			{#each faqs as faq, index}
				<div
					class="bg-white border border-neutral-200 rounded-[1.5rem] overflow-hidden transition-all duration-300 shadow-sm"
				>
					<button
						onclick={() =>
							(activeFaq = activeFaq === index ? -1 : index)}
						class="w-full text-left p-6 md:p-8 flex justify-between items-center text-neutral-900 font-semibold"
					>
						<span class="text-base md:text-lg tracking-tight"
							>{faq.q}</span
						>
						<ChevronDown
							class="size-4 text-neutral-450 transition-transform duration-300 {activeFaq ===
							index
								? 'rotate-180 text-primary'
								: ''}"
						/>
					</button>
					{#if activeFaq === index}
						<div
							class="px-6 md:px-8 pb-6 md:pb-8 text-neutral-600 text-sm md:text-base leading-relaxed border-t border-neutral-100 pt-4 font-medium"
						>
							{faq.a}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- (08) GET IN TOUCH (CONTACT FORM SECTION - Dark Section) -->
<section
	id="contact"
	data-theme="dark"
	class="py-32 bg-black text-white border-t border-white/5 z-10 relative"
>
	<div
		class="container mx-auto px-6 max-w-[1440px] grid grid-cols-1 lg:grid-cols-4 gap-12"
	>
		<div class="lg:col-span-1 space-y-8">
			<div>
				<p
					class="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block mb-4"
				>(04) Start A Conversation</p>
				<h3
					class="text-4xl md:text-6xl font-bold tracking-tight text-white leading-none"
				>
					Let’s Start Something Meaningful
				</h3>
				<p
					class="text-neutral-400 mt-6 text-sm leading-relaxed max-w-[25ch]"
				>
					Have a project in mind or just an idea taking shape? Tell me
					where you are. I'll take it from there.
				</p>
			</div>

			<!-- Direct contact shortcuts with monochrome SVG icons -->
			<div class="space-y-4 pt-6 border-t border-white/10 max-w-[25ch]">
				<a
					href="mailto:phantomcluster17@gmail.com"
					class="flex items-center gap-3 text-sm text-neutral-400 hover:text-primary transition-colors group"
				>
					<svg
						aria-hidden="true"
						class="size-4 fill-neutral-500 group-hover:fill-primary transition-colors"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
						/>
					</svg>
					<span class="font-medium tracking-tight"
						>phantomcluster17@gmail.com</span
					>
				</a>
				<a
					href="https://www.linkedin.com/in/phantom-cluster/"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-3 text-sm text-neutral-400 hover:text-primary transition-colors group"
				>
					<svg
						aria-hidden="true"
						class="size-4 fill-neutral-500 group-hover:fill-primary transition-colors"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7H9.33V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z"
						/>
					</svg>
					<span class="font-medium tracking-tight"
						>LinkedIn Profile</span
					>
				</a>
			</div>
		</div>

		<div class="lg:col-span-3">
			<form class="space-y-8" onsubmit={(e) => e.preventDefault()}>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div class="flex flex-col gap-2">
						<label
							for="firstName"
							class="text-xs font-mono text-neutral-500 uppercase tracking-widest"
							>First Name</label
						>
						<input
							type="text"
							id="firstName"
							placeholder="Alex"
							class="bg-neutral-900 border border-white/5 rounded-xl px-5 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-primary/50 transition-colors"
						/>
					</div>
					<div class="flex flex-col gap-2">
						<label
							for="lastName"
							class="text-xs font-mono text-neutral-500 uppercase tracking-widest"
							>Last Name</label
						>
						<input
							type="text"
							id="lastName"
							placeholder="Morgan"
							class="bg-neutral-900 border border-white/5 rounded-xl px-5 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-primary/50 transition-colors"
						/>
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div class="flex flex-col gap-2">
						<label
							for="email"
							class="text-xs font-mono text-neutral-500 uppercase tracking-widest"
							>Email Address</label
						>
						<input
							type="email"
							id="email"
							placeholder="alex@example.com"
							class="bg-neutral-900 border border-white/5 rounded-xl px-5 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-primary/50 transition-colors"
						/>
					</div>
					<div class="flex flex-col gap-2">
						<label
							for="phone"
							class="text-xs font-mono text-neutral-500 uppercase tracking-widest"
							>Phone Number (Optional)</label
						>
						<input
							type="tel"
							id="phone"
							placeholder="e.g. +1 (555) 000-0000"
							class="bg-neutral-900 border border-white/5 rounded-xl px-5 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-primary/50 transition-colors"
						/>
					</div>
				</div>

				<div class="flex flex-col gap-2">
					<label
						for="details"
						class="text-xs font-mono text-neutral-500 uppercase tracking-widest"
						>Project Details</label
					>
					<textarea
						id="details"
						rows="6"
						placeholder="Tell me about your product, timeline, and design challenges..."
						class="bg-neutral-900 border border-white/5 rounded-2xl px-5 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-primary/50 transition-colors resize-none"
					></textarea>
				</div>

				<div class="flex justify-end pt-4">
					<Button
						type="submit"
						class="bg-primary hover:bg-primary/95 text-white font-semibold rounded-full px-8 py-4 h-14 text-sm uppercase tracking-wider flex items-center gap-3 transition-transform active:scale-98"
					>
						<span>Send Enquiry</span>
						<Send class="size-4" />
					</Button>
				</div>
			</form>
		</div>
	</div>
</section>

<!-- BOTTOM MARQUEE -->
<PartnerMarquee />
