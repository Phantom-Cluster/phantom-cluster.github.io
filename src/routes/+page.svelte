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
	import portrait from "$lib/assets/portrait.webp";
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
		const rect = (
			event.currentTarget as HTMLElement
		).getBoundingClientRect();
		targetX = event.clientX - rect.left;
		targetY = event.clientY - rect.top;
	};

	let bridgeRotateX = $state(0);
	let bridgeRotateY = $state(0);

	const handleBridgeMouseMove = (e: MouseEvent) => {
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		bridgeRotateY = (x / rect.width - 0.5) * 30;
		bridgeRotateX = (y / rect.height - 0.5) * -30;
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

	let workSectionRef: HTMLElement;
	let leftGlassWrapper: HTMLElement;
	let rightGlassWrapper: HTMLElement;

	const brands = [
		"WPMU DEV",
		"Themeisle",
		"Searchmetrics",
		"Ideajam",
		"Eclectic",
	];

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// 1. Ambient Bobbing
		gsap.to(".glass-asset", {
			y: 12,
			rotation: 4,
			duration: 4.5,
			yoyo: true,
			repeat: -1,
			ease: "sine.inOut",
			stagger: 0.5,
		});

		// 2. Mouse Parallax Tracking
		const handleMouseMove = (e: MouseEvent) => {
			if (!workSectionRef) return;
			const rect = workSectionRef.getBoundingClientRect();
			const xPos = (e.clientX - rect.left - rect.width / 2) / rect.width;
			const yPos = (e.clientY - rect.top - rect.height / 2) / rect.height;

			gsap.to(leftGlassWrapper, {
				x: -xPos * 40,
				y: -yPos * 40,
				duration: 1,
				ease: "power2.out",
			});
			gsap.to(rightGlassWrapper, {
				x: xPos * 50,
				y: yPos * 50,
				duration: 1,
				ease: "power2.out",
			});
		};

		if (workSectionRef) {
			workSectionRef.addEventListener("mousemove", handleMouseMove);
		}

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
		gsap.from([heroHeadline, heroBio, heroImage, heroBar], {
			y: 30,
			opacity: 0,
			duration: 1,
			stagger: 0.1,
			ease: "power3.out",
			delay: 0.15,
		});

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
							(entry.target as HTMLElement).dataset.index ?? "0",
						);
					}
				});
			},
			{ rootMargin: "-40% 0px -40% 0px", threshold: 0 },
		);
		// Wait a tick for bind:this to populate processCards
		setTimeout(() => {
			processCards.forEach((card) => {
				if (card) processObserver.observe(card);
			});
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
	<div
		class="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black"
	>
		<!-- High-Contrast Blended Video: screen burns black away, orange nodes punch through -->
		<video
			autoplay
			loop
			muted
			playsinline
			preload="metadata"
			class="absolute min-w-full min-h-full object-cover opacity-70 mix-blend-screen contrast-125 brightness-110"
		>
			<source src="/videos/hero-background.mp4" type="video/mp4" />
		</video>
	</div>

	<!-- Dynamic spotlight vignette — tracks cursor with lerp inertia -->
	<div
		class="absolute inset-0 z-[1] pointer-events-none"
		style="background: radial-gradient(circle 600px at {mouseX}px {mouseY}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 40%, #000000 70%);"
	></div>

	<!-- ─── Content wrapper (constrained) ───────────────────────────────── -->
	<div
		class="relative z-10 flex-1 flex flex-col justify-center max-w-[1320px] mx-auto w-full px-6 md:px-8 mt-16 md:mt-0 md:pt-24"
	>
		<!-- 12-col primary grid -->
		<div
			class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center w-full"
		>
			<!-- Left col · span 8 · three-tier nameplate -->
			<div class="col-span-1 md:col-span-8 flex flex-col justify-center">
				<div class="relative z-20 flex flex-col justify-center">
					<h1
						bind:this={heroHeadline}
						class="text-[16vw] md:text-[9vw] leading-[0.85] tracking-tighter font-medium text-white select-none"
					>
						Hitanshu <br /> Sahu.
					</h1>

					<h2
						class="text-2xl md:text-4xl text-gray-300 font-normal tracking-tight mt-6"
					>
						Product Designer.
					</h2>

					<p
						bind:this={heroBio}
						class="max-w-md text-gray-500 mt-6 text-lg font-normal leading-relaxed"
					>
						Building clean digital products, high-growth SaaS
						interfaces, and optimized frontend systems.
					</p>
				</div>
			</div>

			<!-- Right col · span 4 · greyscale portrait -->
			<div
				class="col-span-1 md:col-span-4 flex justify-start md:justify-end"
			>
				<div
					bind:this={heroImage}
					class="w-full max-w-[320px] aspect-[3/4] relative"
				>
					<img
						src={portrait}
						alt="Hitanshu Sahu — Product Designer"
						fetchpriority="high"
						decoding="async"
						class="w-full h-full object-cover rounded-2xl grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-500 relative z-20"
					/>
				</div>
			</div>
		</div>
	</div>

	<!-- ─── Pinned Utility Bar ──────────────────────────────────────────── -->
	<div
		class="relative z-20 w-full max-w-[1320px] mx-auto px-6 md:px-8 pb-8 mt-auto"
	>
		<div class="border-t border-white/10 pt-6">
			<!-- Utility chips · content-hugging flex row -->
			<div
				bind:this={heroBar}
				class="w-full flex flex-col md:flex-row flex-wrap justify-between items-center gap-4 text-[10px] md:text-xs font-mono uppercase tracking-widest"
			>
				<div
					class="w-full md:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white/[0.03] border border-white/10 text-gray-400 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.08] hover:text-white hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-default"
				>
					<span>Core: Figma, Svelte, WordPress</span>
				</div>

				<div
					class="w-full md:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white/[0.03] border border-white/10 text-gray-400 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.08] hover:text-white hover:border-[#FF4400]/50 hover:shadow-[0_0_20px_rgba(255,68,0,0.15)] cursor-default"
				>
					<span
						>Specialization: SaaS, Dashboards &amp; Atomic Systems</span
					>
				</div>

				<div
					class="w-full md:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white/[0.03] border border-white/10 text-gray-400 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.08] hover:text-white hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-default"
				>
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
	<div
		class="w-full max-w-[1320px] mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
	>
		<div class="lg:col-span-7 flex flex-col space-y-8">
			<div class="max-w-2xl">
				<div
					class="mb-8 relative inline-flex overflow-hidden rounded-full p-[1.5px] shadow-sm bg-neutral-200"
				>
					<div
						class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,#FF4400_360deg)]"
					></div>
					<div
						class="inline-flex h-full w-full items-center justify-center rounded-full bg-white px-6 py-2 relative z-10"
					>
						<span
							class="text-[11px] font-mono tracking-widest text-gray-400 uppercase"
							>SYSTEM ARCHITECTURE</span
						>
					</div>
				</div>
				<h2
					class="text-4xl md:text-5xl font-bold tracking-tight text-black mb-6 leading-tight"
				>
					Architecting scalable UI systems and production-ready
					frontends for high-growth SaaS.
				</h2>
				<p class="text-lg text-gray-600 leading-relaxed">
					I operate at the intersection of high-fidelity design and
					technical execution. Over the past 7 years, I've integrated
					with companies like WPMU DEV to translate complex
					constraints into robust, compliant design systems.
				</p>
			</div>

			<ul class="space-y-6 max-w-2xl">
				<li class="flex items-start gap-4">
					<div class="relative flex h-3 w-3 mt-1.5 flex-shrink-0">
						<span
							class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4400] opacity-60"
							style="animation-delay: 0ms;"
						></span>
						<span
							class="relative inline-flex rounded-full h-3 w-3 bg-[#FF4400]"
						></span>
					</div>
					<span class="text-gray-600 text-lg leading-snug">
						<strong class="font-semibold text-black tracking-tight"
							>Atomic Design:</strong
						>
						Engineering modular, reusable component libraries.
					</span>
				</li>

				<li class="flex items-start gap-4">
					<div class="relative flex h-3 w-3 mt-1.5 flex-shrink-0">
						<span
							class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4400] opacity-60"
							style="animation-delay: 300ms;"
						></span>
						<span
							class="relative inline-flex rounded-full h-3 w-3 bg-[#FF4400]"
						></span>
					</div>
					<span class="text-gray-600 text-lg leading-snug">
						<strong class="font-semibold text-black tracking-tight"
							>WordPress &amp; Gutenberg:</strong
						>
						Optimizing custom editor workflows.
					</span>
				</li>

				<li class="flex items-start gap-4">
					<div class="relative flex h-3 w-3 mt-1.5 flex-shrink-0">
						<span
							class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4400] opacity-60"
							style="animation-delay: 600ms;"
						></span>
						<span
							class="relative inline-flex rounded-full h-3 w-3 bg-[#FF4400]"
						></span>
					</div>
					<span class="text-gray-600 text-lg leading-snug">
						<strong class="font-semibold text-black tracking-tight"
							>Frontend Architecture:</strong
						>
						Building scalable systems for long-term growth.
					</span>
				</li>
			</ul>
		</div>

		<div class="lg:col-span-5 flex items-center">
			<div
				class="bg-[#0a0a0a] rounded-[2rem] p-8 lg:p-10 w-full flex flex-col justify-center space-y-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]"
			>
				<p
					class="text-xs font-mono tracking-widest text-[#FF4400] uppercase"
				>
					Metrics &amp; Impact
				</p>

				<div>
					<h3
						class="text-6xl lg:text-7xl font-bold text-white tracking-tighter leading-none mb-1"
					>
						98%
					</h3>
					<p
						class="text-sm lg:text-base font-medium tracking-widest text-gray-400 uppercase"
					>
						Client Satisfaction
					</p>
				</div>

				<div>
					<h3
						class="text-6xl lg:text-7xl font-bold text-white tracking-tighter leading-none mb-1"
					>
						2M+
					</h3>
					<p
						class="text-sm lg:text-base font-medium tracking-widest text-gray-400 uppercase"
					>
						Active Plugin Users
					</p>
				</div>

				<div>
					<h3
						class="text-6xl lg:text-7xl font-bold text-white tracking-tighter leading-none mb-1"
					>
						50+
					</h3>
					<p
						class="text-sm lg:text-base font-medium tracking-widest text-gray-400 uppercase"
					>
						Starter Templates Completed
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- UNIFIED WORK SECTION (Bridging The Gap, Marquee, Case Study) -->
<section
	bind:this={workSectionRef}
	class="relative w-full overflow-hidden py-32 flex flex-col items-center gap-y-20 bg-[#f8f9fa] border-t border-gray-200"
>
	<div
		class="relative w-full max-w-[1320px] mx-auto px-6 text-center z-10 mt-12"
	>
		<div
			bind:this={leftGlassWrapper}
			class="absolute left-0 md:left-12 top-1/2 -translate-y-1/2 w-20 md:w-28 opacity-70 pointer-events-none"
		>
			<img
				src={cubeImg}
				alt="Glass Cube"
				class="glass-asset w-full h-auto drop-shadow-2xl"
			/>
		</div>

		<div
			bind:this={rightGlassWrapper}
			class="absolute right-0 md:right-12 top-1/4 w-16 md:w-24 opacity-70 pointer-events-none"
		>
			<img
				src={gemImg}
				alt="Glass Gem"
				class="glass-asset w-full h-auto drop-shadow-2xl"
			/>
		</div>

		<h2
			class="text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.9] text-[#111] mb-6 relative z-10"
		>
			BRIDGING <br />
			THE
			<span
				class="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4400] to-[#ff7733]"
				>GAP.</span
			>
		</h2>
		<p
			class="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed relative z-10 mt-6"
		>
			Architecting high-fidelity designs into scalable, production-ready
			frontends.
		</p>
	</div>

	<div
		class="w-full relative z-20 flex flex-col items-center overflow-hidden mt-16 mb-24"
	>
		<div
			class="relative w-full max-w-[1320px] mx-auto overflow-hidden"
			style="mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);"
		>
			<div class="marquee-track flex items-center">
				<div class="flex items-center gap-16 md:gap-32 px-8 md:px-16">
					<span
						class="text-2xl md:text-3xl font-black tracking-[0.25em] text-gray-300 uppercase transition-colors hover:text-gray-800 cursor-default"
						>WPMU DEV</span
					>
					<span class="w-2 h-2 rounded-full bg-[#FF4400]"></span>
					<span
						class="text-2xl md:text-3xl font-black tracking-[0.25em] text-gray-300 uppercase transition-colors hover:text-gray-800 cursor-default"
						>Themeisle</span
					>
					<span class="w-2 h-2 rounded-full bg-[#FF4400]"></span>
					<span
						class="text-2xl md:text-3xl font-black tracking-[0.25em] text-gray-300 uppercase transition-colors hover:text-gray-800 cursor-default"
						>Searchmetrics</span
					>
					<span class="w-2 h-2 rounded-full bg-[#FF4400]"></span>
					<span
						class="text-2xl md:text-3xl font-black tracking-[0.25em] text-gray-300 uppercase transition-colors hover:text-gray-800 cursor-default"
						>Ideajam</span
					>
					<span class="w-2 h-2 rounded-full bg-[#FF4400]"></span>
					<span
						class="text-2xl md:text-3xl font-black tracking-[0.25em] text-gray-300 uppercase transition-colors hover:text-gray-800 cursor-default"
						>Eclectic</span
					>
					<span class="w-2 h-2 rounded-full bg-[#FF4400]"></span>
				</div>

				<div class="flex items-center gap-16 md:gap-32 px-8 md:px-16">
					<span
						class="text-2xl md:text-3xl font-black tracking-[0.25em] text-gray-300 uppercase transition-colors hover:text-gray-800 cursor-default"
						>WPMU DEV</span
					>
					<span class="w-2 h-2 rounded-full bg-[#FF4400]"></span>
					<span
						class="text-2xl md:text-3xl font-black tracking-[0.25em] text-gray-300 uppercase transition-colors hover:text-gray-800 cursor-default"
						>Themeisle</span
					>
					<span class="w-2 h-2 rounded-full bg-[#FF4400]"></span>
					<span
						class="text-2xl md:text-3xl font-black tracking-[0.25em] text-gray-300 uppercase transition-colors hover:text-gray-800 cursor-default"
						>Searchmetrics</span
					>
					<span class="w-2 h-2 rounded-full bg-[#FF4400]"></span>
					<span
						class="text-2xl md:text-3xl font-black tracking-[0.25em] text-gray-300 uppercase transition-colors hover:text-gray-800 cursor-default"
						>Ideajam</span
					>
					<span class="w-2 h-2 rounded-full bg-[#FF4400]"></span>
					<span
						class="text-2xl md:text-3xl font-black tracking-[0.25em] text-gray-300 uppercase transition-colors hover:text-gray-800 cursor-default"
						>Eclectic</span
					>
					<span class="w-2 h-2 rounded-full bg-[#FF4400]"></span>
				</div>
			</div>
		</div>
	</div>

	<div class="w-full max-w-[1320px] mx-auto px-6 relative z-30 mt-24">
		<div class="text-center mb-8 flex justify-center">
			<div
				class="relative inline-flex overflow-hidden rounded-full p-[1.5px] shadow-sm bg-neutral-200"
			>
				<div
					class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,#FF4400_360deg)]"
				></div>
				<div
					class="inline-flex h-full w-full items-center justify-center rounded-full bg-white px-6 py-2 relative z-10"
				>
					<span
						class="text-[11px] font-mono tracking-widest text-gray-400 uppercase"
						>CASE STUDY HIGHLIGHT</span
					>
				</div>
			</div>
		</div>

		<FeaturedProject />
	</div>
</section>

<!-- (02) FEATURED PROJECTS SECTION (Light Section) -->
<StackedProjects />

<!-- (02) CAPABILITIES SECTION (Dark Section) -->
<section
	id="capabilities"
	data-theme="dark"
	class="py-32 bg-neutral-950 text-white border-t border-white/5 z-10 relative"
>
	<div class="container mx-auto px-6 max-w-[1320px]">
		<!-- ======================================= -->
		<!-- HEADER ROW -->
		<!-- ======================================= -->
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-24">
			<!-- Left Column: The Restored Chip -->
			<div class="lg:col-span-3">
				<div
					class="mb-4 relative inline-flex overflow-hidden rounded-full p-[1px]"
				>
					<div
						class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,#FF4400_360deg)]"
					></div>
					<div
						class="inline-flex h-full w-full items-center justify-center rounded-full bg-neutral-950 px-6 py-2 relative z-10"
					>
						<span
							class="text-[11px] font-mono tracking-widest text-gray-400 uppercase"
							>CAPABILITIES</span
						>
					</div>
				</div>
			</div>

			<!-- Right Column: Header Content -->
			<div class="lg:col-span-9 max-w-2xl">
				<h2
					class="text-6xl md:text-7xl font-bold tracking-tighter text-white mb-6 leading-[1.1]"
				>
					What I Do
				</h2>
				<p class="text-lg text-gray-400 leading-relaxed">
					Combining UX strategy, pixel-perfect visual engineering, and
					systematic responsive layouts to launch high-performance
					digital solutions.
				</p>
			</div>
		</div>

		<!-- ======================================= -->
		<!-- LIST ITEMS -->
		<!-- ======================================= -->
		<div class="border-t border-gray-800">
			{#each capabilities as cap}
				<div
					class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 py-12 border-b border-gray-800 group hover:bg-white/[0.02] transition-colors duration-300"
				>
					<div class="lg:col-span-3 flex items-start lg:items-center">
						<span
							class="text-sm font-mono text-gray-600 group-hover:text-[#FF4400] transition-colors duration-300"
							>{cap.id}</span
						>
					</div>
					<div class="lg:col-span-4 flex items-start lg:items-center">
						<h3
							class="text-3xl font-medium tracking-tight text-gray-300 group-hover:text-white transition-colors duration-300"
						>
							{cap.title}
						</h3>
					</div>
					<div class="lg:col-span-5 flex items-start lg:items-center">
						<p
							class="text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors duration-300"
						>
							{cap.desc}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- (03) MY PROCESS SECTION (Light Section) -->
<section
	data-theme="light"
	class="py-32 bg-[#f4f4f6] border-t border-neutral-200/50"
>
	<div
		class="container mx-auto px-6 max-w-[1320px] grid grid-cols-1 lg:grid-cols-4 gap-12"
	>
		<div class="lg:col-span-1">
			<div
				class="mb-4 relative inline-flex overflow-hidden rounded-full p-[1.5px] shadow-sm bg-neutral-200"
			>
				<div
					class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,#FF4400_360deg)]"
				></div>
				<div
					class="inline-flex h-full w-full items-center justify-center rounded-full bg-white px-6 py-2 relative z-10"
				>
					<span
						class="text-[11px] font-mono tracking-widest text-gray-400 uppercase"
						>MY PROCESS</span
					>
				</div>
			</div>
			<h3
				class="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-none sticky top-32"
			>
				A Thoughtful Process Behind My Work
			</h3>
		</div>

		<div class="lg:col-span-3 space-y-6">
			{#each processSteps as step, i}
				{@const isActive = activeProcessIndex === i}
				<div
					bind:this={processCards[i]}
					data-index={i}
					class="process-step w-full text-left p-8 md:p-12 border rounded-[2rem] flex flex-col justify-between bg-white transition-all duration-500 ease-out {isActive
						? 'shadow-lg scale-[1.02]'
						: 'border-neutral-200 opacity-60 scale-100'}"
					style={isActive ? "border-color: rgba(255,68,0,0.35);" : ""}
				>
					<div class="flex items-center gap-6 mb-4">
						<span class="font-mono text-sm text-neutral-400"
							>{step.num}</span
						>
						<h4
							class="text-2xl md:text-3xl font-semibold tracking-tight transition-colors duration-500 ease-out"
							style="color: {isActive ? '#FF4400' : '#171717'};"
						>
							{step.title}
						</h4>
					</div>
					<p
						class="mt-2 text-neutral-600 text-lg leading-relaxed font-medium"
					>
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
	<div class="container mx-auto px-6 max-w-[1320px]">
		<div
			class="flex flex-col items-center text-center max-w-3xl mx-auto mb-20"
		>
			<div
				class="mb-8 relative inline-flex overflow-hidden rounded-full p-[1px]"
			>
				<div
					class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,#FF4400_360deg)]"
				></div>
				<div
					class="inline-flex h-full w-full items-center justify-center rounded-full bg-neutral-950 px-6 py-2 relative z-10"
				>
					<span
						class="text-[11px] font-mono tracking-widest text-gray-400 uppercase"
						>ENGAGEMENT MODELS</span
					>
				</div>
			</div>
			<h2
				class="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-tight"
			>
				Ways to Collaborate
			</h2>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
			{#each engagementModels as model}
				<a
					href={model.ctaUrl}
					class="group/card relative rounded-[2rem] p-[1px] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl h-full block bg-gray-800"
				>
					<!-- Animated spinning border -->
					<div
						class="absolute inset-[-1000%] motion-safe:animate-[spin_8s_linear_infinite] bg-[conic-gradient(transparent_270deg,#FF4400_360deg)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
					></div>

					<!-- Inner Card Surface -->
					<div
						class="relative z-10 h-full w-full bg-[#111] rounded-[calc(2rem-1px)] p-8 md:p-10 flex flex-col"
					>
						<!-- Ambient Glow -->
						<div
							class="absolute -top-12 -right-12 w-48 h-48 bg-[#FF4400]/[0.15] rounded-full blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
						></div>

						<h3
							class="relative z-10 text-sm font-mono tracking-widest text-[#FF4400] uppercase mb-4"
						>
							{model.title}
						</h3>
						<p
							class="relative z-10 text-gray-400 leading-relaxed mb-10"
						>
							{model.desc}
						</p>

						<div class="relative z-10 grow flex flex-col">
							<p
								class="text-[11px] font-bold tracking-widest text-gray-500 uppercase mb-6"
							>
								What's Included
							</p>
							<ul class="space-y-4 mb-10">
								{#each model.benefits as benefit}
									<li class="flex items-start">
										<span
											class="w-1.5 h-1.5 rounded-full bg-[#FF4400] mt-2 mr-4 shrink-0"
										></span>
										<span class="text-gray-300"
											>{benefit}</span
										>
									</li>
								{/each}
							</ul>
						</div>

						<div
							class="relative z-10 mt-auto flex items-center justify-between text-gray-400 text-sm font-bold tracking-widest uppercase transition-colors group-hover/card:text-white pt-6 border-t border-gray-800"
						>
							Start Conversation
							<svg
								class="w-5 h-5 group-hover/card:translate-x-2 transition-transform duration-300 text-[#FF4400]"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								></path></svg
							>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- (06) PARTNER MARQUEE SECTION (Light Section) -->
<section
	data-theme="light"
	class="py-32 bg-[#f4f4f6] border-t border-neutral-200/50"
>
	<div
		class="container mx-auto px-6 max-w-[1320px] grid grid-cols-1 lg:grid-cols-4 gap-12"
	>
		<div class="lg:col-span-1">
			<div
				class="mb-4 relative inline-flex overflow-hidden rounded-full p-[1.5px] shadow-sm bg-neutral-200"
			>
				<div
					class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,#FF4400_360deg)]"
				></div>
				<div
					class="inline-flex h-full w-full items-center justify-center rounded-full bg-white px-6 py-2 relative z-10"
				>
					<span
						class="text-[11px] font-mono tracking-widest text-gray-400 uppercase"
						>CLIENT STORIES</span
					>
				</div>
			</div>
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
	<div class="container mx-auto px-6 max-w-[1320px]">
		<div class="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-20">
			<div class="lg:col-span-1">
				<div
					class="mb-4 relative inline-flex overflow-hidden rounded-full p-[1px]"
				>
					<div
						class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,#FF4400_360deg)]"
					></div>
					<div
						class="inline-flex h-full w-full items-center justify-center rounded-full bg-neutral-950 px-6 py-2 relative z-10"
					>
						<span
							class="text-[11px] font-mono tracking-widest text-gray-400 uppercase"
							>INSIGHTS WITH PURPOSE</span
						>
					</div>
				</div>
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
<section
	data-theme="light"
	class="py-32 bg-[#f4f4f6] border-t border-neutral-200/50"
>
	<div
		class="container mx-auto px-6 max-w-[1320px] grid grid-cols-1 lg:grid-cols-4 gap-12"
	>
		<div class="lg:col-span-1">
			<div
				class="mb-4 relative inline-flex overflow-hidden rounded-full p-[1.5px] shadow-sm bg-neutral-200"
			>
				<div
					class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,#FF4400_360deg)]"
				></div>
				<div
					class="inline-flex h-full w-full items-center justify-center rounded-full bg-white px-6 py-2 relative z-10"
				>
					<span
						class="text-[11px] font-mono tracking-widest text-gray-400 uppercase"
						>SHARED EXPECTATIONS</span
					>
				</div>
			</div>
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
	class="w-full py-32 bg-[#050505] text-white border-t border-white/5 z-10 relative"
>
	<div class="container mx-auto px-6 max-w-[1320px] flex flex-col gap-16 lg:gap-24">
		<!-- ======================================= -->
		<!-- TOP: Typography & Direct Links          -->
		<!-- ======================================= -->
		<div class="flex flex-col max-w-5xl">
			<div
				class="-ml-[25px] mb-8 self-start relative inline-flex overflow-hidden rounded-full p-[1px]"
			>
				<div
					class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,#FF4400_360deg)]"
				></div>
				<div
					class="inline-flex h-full w-full items-center justify-center rounded-full bg-[#050505] px-6 py-2.5 relative z-10"
				>
					<span
						class="text-xs md:text-sm font-mono tracking-widest text-gray-300 uppercase"
						>START A CONVERSATION</span
					>
				</div>
			</div>
			<h2
				class="text-6xl md:text-7xl font-bold tracking-tighter text-white mb-8 leading-[1.1]"
			>
				Let’s Start Something Meaningful
			</h2>
			<p
				class="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl"
			>
				Have a project in mind or just an idea taking shape? Tell me
				where you are. I'll take it from there.
			</p>

			<!-- Mathematical Horizontal Divider -->
			<div class="w-full h-px bg-gray-800/50 my-10"></div>

			<!-- Direct Links (Horizontal Row) -->
			<div
				class="flex flex-col sm:flex-row gap-8"
			>
				<a
					href="mailto:phantomcluster17@gmail.com"
					class="group flex items-center text-gray-300 hover:text-white transition-colors text-base font-medium"
				>
					<svg
						class="w-6 h-6 mr-4 text-gray-600 group-hover:text-[#FF4400] transition-colors"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
						></path></svg
					>
					phantomcluster17@gmail.com
				</a>
				<a
					href="https://linkedin.com/in/phantomcluster"
					target="_blank"
					rel="noopener noreferrer"
					class="group flex items-center text-gray-300 hover:text-white transition-colors text-base font-medium"
				>
					<svg
						class="w-6 h-6 mr-4 text-gray-600 group-hover:text-[#FF4400] transition-colors"
						fill="currentColor"
						viewBox="0 0 24 24"
						><path
							d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
						/></svg
					>
					LinkedIn Profile
				</a>
			</div>
		</div>

		<!-- ======================================= -->
		<!-- BOTTOM: Dual-Path Intake Cards          -->
		<!-- ======================================= -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
			<!-- Card 1: Typeform (Hover Physics) -->
			<a
				href="https://form.typeform.com/to/qKlWDcaw"
				target="_blank"
				rel="noopener noreferrer"
				class="group/card relative block overflow-hidden rounded-3xl p-[1px] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
			>
				<!-- Default subtle border -->
				<div
					class="absolute inset-0 bg-white/5 transition-opacity duration-500 group-hover/card:opacity-0"
				></div>

				<!-- Animated spinning border -->
				<div
					class="absolute inset-[-1000%] motion-safe:animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,#FF4400_360deg)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
				></div>

				<!-- Inner Card Surface -->
				<div
					class="relative z-10 h-full w-full bg-[#0a0a0a] rounded-[calc(1.5rem-1px)] p-8 md:p-10 flex flex-col"
				>
					<!-- Ambient Glow -->
					<div
						class="absolute -top-12 -right-12 w-48 h-48 bg-[#FF4400]/[0.15] rounded-full blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
					></div>

					<div
						class="relative z-10 w-12 h-12 rounded-full bg-[#FF4400]/10 flex items-center justify-center mb-6 text-[#FF4400] shrink-0"
					>
						<svg
							class="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							></path></svg
						>
					</div>
					<h3
						class="relative z-10 text-2xl font-bold text-white mb-3"
					>
						Submit Project Brief
					</h3>
					<p
						class="relative z-10 text-gray-400 text-sm leading-relaxed mb-8 grow"
					>
						Complete a structured intake form detailing your
						requirements for a precise technical quote.
					</p>
					<div
						class="relative z-10 flex items-center text-[#FF4400] text-sm font-bold tracking-widest uppercase mt-auto"
					>
						Start Brief
						<svg
							class="w-4 h-4 ml-2 group-hover/card:translate-x-2 transition-transform duration-300"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							></path></svg
						>
					</div>
				</div>
			</a>

			<!-- Card 2: Calendly (Hover Physics) -->
			<a
				href="https://calendly.com/phantomcluster/30min"
				target="_blank"
				rel="noopener noreferrer"
				class="group/card relative block overflow-hidden rounded-3xl p-[1px] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
			>
				<!-- Default subtle border -->
				<div
					class="absolute inset-0 bg-white/5 transition-opacity duration-500 group-hover/card:opacity-0"
				></div>

				<!-- Animated spinning border -->
				<div
					class="absolute inset-[-1000%] motion-safe:animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,#FF4400_360deg)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
				></div>

				<!-- Inner Card Surface -->
				<div
					class="relative z-10 h-full w-full bg-[#0a0a0a] rounded-[calc(1.5rem-1px)] p-8 md:p-10 flex flex-col"
				>
					<!-- Ambient Glow -->
					<div
						class="absolute -top-12 -right-12 w-48 h-48 bg-[#FF4400]/[0.15] rounded-full blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
					></div>

					<div
						class="relative z-10 w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-6 text-white shrink-0"
					>
						<svg
							class="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a.2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							></path></svg
						>
					</div>
					<h3
						class="relative z-10 text-2xl font-bold text-white mb-3"
					>
						Schedule Discovery
					</h3>
					<p
						class="relative z-10 text-gray-400 text-sm leading-relaxed mb-8 grow"
					>
						Bypass the brief and book a direct 30-minute strategic
						alignment call to discuss your ecosystem architecture.
					</p>
					<div
						class="relative z-10 flex items-center text-white text-sm font-bold tracking-widest uppercase mt-auto"
					>
						Book Call
						<svg
							class="w-4 h-4 ml-2 group-hover/card:translate-x-2 transition-transform duration-300"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							></path></svg
						>
					</div>
				</div>
			</a>
		</div>
	</div>
</section>

<!-- BOTTOM MARQUEE -->
<PartnerMarquee />

<style>
	/* This guarantees the width doesn't collapse and the animation runs natively */
	.marquee-track {
		width: max-content;
		animation: infinite-scroll 40s linear infinite;
	}

	@keyframes infinite-scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}
</style>
