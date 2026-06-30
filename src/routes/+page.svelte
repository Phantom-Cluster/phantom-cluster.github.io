<script lang="ts">
	import FeaturedProject from "$lib/components/FeaturedProject.svelte";
	import StackedProjectsV2 from "$lib/components/StackedProjectsV2.svelte";
	import PartnerMarquee from "$lib/components/PartnerMarquee.svelte";
	import { onMount } from "svelte";
	import { gsap } from "gsap";
	import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
	import { ArrowRight } from "lucide-svelte";
	import VanillaTilt from "vanilla-tilt";
	import portrait from "$lib/assets/portrait.webp";
	import cubeImg from "$lib/assets/4 Cube Abstract Glass Spectrum.png";
	import gemImg from "$lib/assets/Gem Shape.png";

	// Hero element refs for GSAP entrance
	let heroHeadline: HTMLElement;
	let heroBio: HTMLElement;
	let heroImage: HTMLElement;
	let heroBar: HTMLElement;

	// Spotlight — plain vars, updated via direct DOM mutation (no Svelte reactivity per frame)
	let spotlightEl: HTMLElement | undefined;
	let spX = 800, spY = 400;

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

	let workSectionRef: HTMLElement;
	let leftGlassWrapper: HTMLElement;
	let rightGlassWrapper: HTMLElement;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// 1. Ambient Bobbing
		if (!reducedMotion) gsap.to(".glass-asset", {
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
		if (!reducedMotion) gsap.from(".reveal-section", {
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
		if (!reducedMotion) {
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
						easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
					});
				}
			}
		}

		// ---- Hero entrance stagger ----
		if (!reducedMotion) gsap.from([heroHeadline, heroBio, heroImage, heroBar], {
			y: 30,
			opacity: 0,
			duration: 1,
			stagger: 0.1,
			ease: "power3.out",
			delay: 0.15,
		});

		// ---- Spotlight lerp loop — direct DOM mutation, no Svelte reactivity per frame ----
		let rafId: number;
		const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
		const tick = () => {
			spX = lerp(spX, targetX, 0.1);
			spY = lerp(spY, targetY, 0.1);
			if (spotlightEl) spotlightEl.style.background = `radial-gradient(circle 600px at ${spX}px ${spY}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 40%, #000000 70%)`;
			rafId = requestAnimationFrame(tick);
		};
		rafId = requestAnimationFrame(tick);

		// Pre-warm all ScrollTrigger positions so first scroll doesn't stutter
		setTimeout(() => ScrollTrigger.refresh(), 150);

		return () => {
			cancelAnimationFrame(rafId);
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
			aria-hidden="true"
			class="absolute min-w-full min-h-full object-cover opacity-70 mix-blend-screen contrast-125 brightness-110 grayscale"
		>
			<source src="/videos/hero-background.mp4" type="video/mp4" />
		</video>
	</div>

	<!-- Dynamic spotlight vignette — direct DOM mutation via RAF, no Svelte reactivity per frame -->
	<div
		bind:this={spotlightEl}
		class="absolute inset-0 z-[1] pointer-events-none"
		style="background: radial-gradient(circle 600px at 800px 400px, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 40%, #000000 70%);"
	></div>

	<!-- ─── Content wrapper (constrained) ───────────────────────────────── -->
	<div
		class="relative z-10 flex-1 flex flex-col justify-center max-w-[1320px] mx-auto w-full px-6 md:px-8 mt-24 md:mt-0 md:pt-24"
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
						class="leading-[0.85] tracking-tighter font-medium text-white select-none"
						style="font-size: clamp(3rem, 8vw + 1rem, 10rem);"
					>
						Hitanshu <br /> Sahu.
					</h1>

					<h2
						class="text-gray-300 font-normal tracking-tight mt-6"
						style="font-size: clamp(1.2rem, 2vw + 0.75rem, 2.25rem);"
					>
						Product Designer.
					</h2>

					<div class="flex items-center gap-2 mt-5">
						<span class="relative flex h-2 w-2" aria-hidden="true">
							<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
							<span class="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
						</span>
						<span class="text-[11px] font-mono tracking-widest text-green-400/80 uppercase">Available — open to full-time roles</span>
					</div>

					<p
						bind:this={heroBio}
						class="max-w-md text-gray-400 mt-5 text-lg font-normal leading-relaxed"
					>
						I design SaaS products that reduce operational friction
						and scale — at the intersection of product strategy,
						design systems, and frontend execution. 7 years shipping
						at WPMU DEV and across high-growth platforms.
					</p>

					<div class="flex flex-col sm:flex-row gap-3 mt-8">
						<a
							href="/#projects"
							class="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-black rounded-full text-sm font-bold tracking-wide hover:bg-gray-100 transition-all duration-200 active:scale-95 shadow-lg shadow-black/30"
						>
							View Work
							<ArrowRight class="size-3.5" />
						</a>
						<a
							href="/Hitanshu_Sahu___Resume_JUN_Updated.pdf"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/20 text-white rounded-full text-sm font-bold tracking-wide hover:border-white/50 hover:bg-white/5 transition-all duration-200"
						>
							Download Resume
							<svg class="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
							</svg>
						</a>
					</div>
				</div>
			</div>

			<!-- Right col · span 4 · greyscale portrait — hidden on mobile -->
			<div
				class="hidden md:flex col-span-1 md:col-span-4 justify-start md:justify-end"
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
				class="w-full flex flex-col md:flex-row flex-wrap justify-center items-center gap-4 text-[10px] md:text-xs font-mono uppercase tracking-widest"
			>
				<div
					class="w-full md:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white/[0.03] border border-white/10 text-gray-400 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.08] hover:text-white hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-default"
				>
					<span>Core: Figma, Svelte, WordPress</span>
				</div>

				<div
					class="w-full md:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white/[0.03] border border-white/10 text-gray-400 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.08] hover:text-white hover:border-primary/50 hover:shadow-[0_0_20px_rgba(34,68,255,0.15)] cursor-default"
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
	aria-label="System Architecture"
	data-theme="light"
	class="bg-[#f4f4f6] border-t border-neutral-200/50"
>
	<div
		class="w-full max-w-[1320px] mx-auto px-6 py-14 sm:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
	>
		<div class="lg:col-span-7 flex flex-col space-y-8">
			<div class="max-w-2xl">
				<div
					class="mb-8 relative inline-flex overflow-hidden rounded-full p-[1.5px] shadow-sm bg-neutral-200"
				>
					<div
						class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,#D1D5DB_360deg)]"
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
					class="font-bold tracking-tight text-black mb-6 leading-tight"
					style="font-size: clamp(1.75rem, 2.5vw + 1rem, 3.25rem);"
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
							class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"
							style="animation-delay: 0ms;"
						></span>
						<span
							class="relative inline-flex rounded-full h-3 w-3 bg-primary"
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
							class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"
							style="animation-delay: 300ms;"
						></span>
						<span
							class="relative inline-flex rounded-full h-3 w-3 bg-primary"
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
							class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"
							style="animation-delay: 600ms;"
						></span>
						<span
							class="relative inline-flex rounded-full h-3 w-3 bg-primary"
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
					class="text-xs font-mono tracking-widest text-portfolio-success uppercase"
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
	id="projects"
	aria-label="Selected Work"
	bind:this={workSectionRef}
	class="relative w-full overflow-hidden py-32 flex flex-col items-center gap-y-20 bg-[#f8f9fa] border-t border-gray-200"
>
	<div
		class="relative w-full max-w-[1320px] mx-auto px-6 text-center z-10 mt-12"
	>
		<div
			bind:this={leftGlassWrapper}
			class="hidden md:block absolute md:left-4 lg:left-12 top-1/2 -translate-y-1/2 w-20 md:w-28 opacity-70 pointer-events-none"
			style="will-change: transform;"
		>
			<img
				src={cubeImg}
				alt="Glass Cube"
				class="glass-asset w-full h-auto drop-shadow-2xl"
			/>
		</div>

		<div
			bind:this={rightGlassWrapper}
			class="hidden md:block absolute md:right-4 lg:right-12 top-1/4 w-16 md:w-24 opacity-70 pointer-events-none"
			style="will-change: transform;"
		>
			<img
				src={gemImg}
				alt="Glass Gem"
				class="glass-asset w-full h-auto drop-shadow-2xl"
			/>
		</div>

		<h2
			class="font-black tracking-tighter leading-[0.9] text-[#111] mb-6 relative z-10"
			style="font-size: clamp(3.5rem, 8vw, 8rem);"
		>
			BRIDGING <br />
			THE
			<span
				class="text-neutral-300"
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
					<span class="w-2 h-2 rounded-full bg-primary"></span>
					<span
						class="text-2xl md:text-3xl font-black tracking-[0.25em] text-gray-300 uppercase transition-colors hover:text-gray-800 cursor-default"
						>Themeisle</span
					>
					<span class="w-2 h-2 rounded-full bg-primary"></span>
					<span
						class="text-2xl md:text-3xl font-black tracking-[0.25em] text-gray-300 uppercase transition-colors hover:text-gray-800 cursor-default"
						>Searchmetrics</span
					>
					<span class="w-2 h-2 rounded-full bg-primary"></span>
					<span
						class="text-2xl md:text-3xl font-black tracking-[0.25em] text-gray-300 uppercase transition-colors hover:text-gray-800 cursor-default"
						>Ideajam</span
					>
					<span class="w-2 h-2 rounded-full bg-primary"></span>
					<span
						class="text-2xl md:text-3xl font-black tracking-[0.25em] text-gray-300 uppercase transition-colors hover:text-gray-800 cursor-default"
						>Eclectic</span
					>
					<span class="w-2 h-2 rounded-full bg-primary"></span>
				</div>

				<div class="flex items-center gap-16 md:gap-32 px-8 md:px-16">
					<span
						class="text-2xl md:text-3xl font-black tracking-[0.25em] text-gray-300 uppercase transition-colors hover:text-gray-800 cursor-default"
						>WPMU DEV</span
					>
					<span class="w-2 h-2 rounded-full bg-primary"></span>
					<span
						class="text-2xl md:text-3xl font-black tracking-[0.25em] text-gray-300 uppercase transition-colors hover:text-gray-800 cursor-default"
						>Themeisle</span
					>
					<span class="w-2 h-2 rounded-full bg-primary"></span>
					<span
						class="text-2xl md:text-3xl font-black tracking-[0.25em] text-gray-300 uppercase transition-colors hover:text-gray-800 cursor-default"
						>Searchmetrics</span
					>
					<span class="w-2 h-2 rounded-full bg-primary"></span>
					<span
						class="text-2xl md:text-3xl font-black tracking-[0.25em] text-gray-300 uppercase transition-colors hover:text-gray-800 cursor-default"
						>Ideajam</span
					>
					<span class="w-2 h-2 rounded-full bg-primary"></span>
					<span
						class="text-2xl md:text-3xl font-black tracking-[0.25em] text-gray-300 uppercase transition-colors hover:text-gray-800 cursor-default"
						>Eclectic</span
					>
					<span class="w-2 h-2 rounded-full bg-primary"></span>
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
					class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,#D1D5DB_360deg)]"
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

<!-- (02) FEATURED PROJECTS SECTION -->
<StackedProjectsV2 />

<!-- (03) CONCEPTS & EXPLORATIONS -->
<section class="bg-[#0a0a0b] py-16 sm:py-20 lg:py-28 px-6 border-t border-white/5">
	<div class="max-w-[1320px] mx-auto">

		<!-- Header -->
		<div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
			<div>
				<p class="text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase mb-3">(03) Personal Research</p>
				<h2 class="font-black tracking-tight text-white leading-[0.95]" style="font-size: clamp(2.25rem, 4vw + 1rem, 4rem);">
					Concepts &<br/><span class="text-neutral-600">Explorations.</span>
				</h2>
			</div>
			<p class="text-sm text-neutral-500 max-w-[32ch] leading-relaxed sm:text-right">
				Self-initiated design research — ideas built to explore new problems, not client briefs.
			</p>
		</div>

		<!-- Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">

			<!-- Card 1 — WordPress -->
			<div role="link" tabindex="0" onclick={() => window.location.href='/work/wordpress-redesign'} onkeydown={(e) => e.key === 'Enter' && (window.location.href='/work/wordpress-redesign')} class="concept-card group relative flex flex-col p-8 bg-[#0a0a0b] hover:bg-[#0d1520] transition-colors duration-300 min-h-[300px] cursor-pointer overflow-hidden">
				<div class="absolute top-0 left-0 w-[3px] h-full bg-[#0073aa] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
				<div class="absolute -top-8 -right-8 w-44 h-44 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="background: radial-gradient(circle, rgba(0,115,170,0.35) 0%, transparent 70%); filter: blur(28px);" aria-hidden="true"></div>
				<div class="flex flex-col gap-3 flex-1 relative z-10">
					<div class="flex items-center gap-2">
						<span class="px-2 py-0.5 rounded-full bg-[#0073aa]/15 border border-[#0073aa]/25 text-[9px] font-mono tracking-widest text-[#4da6cc] uppercase">Concept</span>
						<span class="text-[9px] font-mono text-neutral-600">2021</span>
					</div>
					<h3 class="text-2xl md:text-3xl font-black tracking-tight text-white leading-tight group-hover:text-[#4da6cc] transition-colors duration-200">WordPress<br/>Admin Redesign</h3>
					<p class="text-xs text-neutral-500 leading-relaxed mt-1">Modernising the Gutenberg toolbar, collapsible sidebar, and plugin management flow for large installations.</p>
				</div>
				<div class="mt-6 flex flex-col gap-3 relative z-10">
					<div class="flex flex-wrap gap-1.5">
						{#each ['Admin UX', 'Gutenberg', 'WordPress'] as tag}
							<span class="px-2 py-0.5 rounded-full bg-white/5 text-[9px] font-mono text-neutral-500 border border-white/5">{tag}</span>
						{/each}
					</div>
					<div class="flex items-center gap-4">
						<span class="flex items-center gap-1 text-[10px] font-mono text-neutral-500 group-hover:text-white transition-colors">View case <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></span>
						<a href="https://www.behance.net/gallery/111596675/WordPress-Redesign-(New-Features-Changes)" target="_blank" rel="noopener noreferrer" onclick={(e) => e.stopPropagation()} class="flex items-center gap-1 text-[10px] font-mono text-[#0073aa]/60 hover:text-[#4da6cc] transition-colors">Behance ↗</a>
					</div>
				</div>
			</div>

			<!-- Card 2 — Effido -->
			<div role="link" tabindex="0" onclick={() => window.location.href='/work/effido-productivity-app'} onkeydown={(e) => e.key === 'Enter' && (window.location.href='/work/effido-productivity-app')} class="concept-card group relative flex flex-col p-8 bg-[#0a0a0b] hover:bg-[#0a1a14] transition-colors duration-300 min-h-[300px] cursor-pointer overflow-hidden">
				<div class="absolute top-0 left-0 w-[3px] h-full bg-[#10b981] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
				<div class="absolute -top-8 -right-8 w-44 h-44 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="background: radial-gradient(circle, rgba(16,185,129,0.35) 0%, transparent 70%); filter: blur(28px);" aria-hidden="true"></div>
				<div class="flex flex-col gap-3 flex-1 relative z-10">
					<div class="flex items-center gap-2">
						<span class="px-2 py-0.5 rounded-full bg-[#10b981]/15 border border-[#10b981]/25 text-[9px] font-mono tracking-widest text-[#34d399] uppercase">Concept</span>
						<span class="text-[9px] font-mono text-neutral-600">2021</span>
					</div>
					<h3 class="text-2xl md:text-3xl font-black tracking-tight text-white leading-tight group-hover:text-[#34d399] transition-colors duration-200">Effido<br/>Productivity App</h3>
					<p class="text-xs text-neutral-500 leading-relaxed mt-1">A 3-layer focus-first task model — Now / Today / Later — built around cognitive load reduction, not list management.</p>
				</div>
				<div class="mt-6 flex flex-col gap-3 relative z-10">
					<div class="flex flex-wrap gap-1.5">
						{#each ['Mobile App', 'Productivity', 'Focus UX'] as tag}
							<span class="px-2 py-0.5 rounded-full bg-white/5 text-[9px] font-mono text-neutral-500 border border-white/5">{tag}</span>
						{/each}
					</div>
					<div class="flex items-center gap-4">
						<span class="flex items-center gap-1 text-[10px] font-mono text-neutral-500 group-hover:text-white transition-colors">View case <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></span>
						<a href="https://www.behance.net/gallery/114922057/Effido-(Productivity-App)" target="_blank" rel="noopener noreferrer" onclick={(e) => e.stopPropagation()} class="flex items-center gap-1 text-[10px] font-mono text-[#10b981]/60 hover:text-[#34d399] transition-colors">Behance ↗</a>
					</div>
				</div>
			</div>

			<!-- Card 3 — Resort -->
			<div role="link" tabindex="0" onclick={() => window.location.href='/work/resort-island-design'} onkeydown={(e) => e.key === 'Enter' && (window.location.href='/work/resort-island-design')} class="concept-card group relative flex flex-col p-8 bg-[#0a0a0b] hover:bg-[#091a1a] transition-colors duration-300 min-h-[300px] cursor-pointer overflow-hidden">
				<div class="absolute top-0 left-0 w-[3px] h-full bg-[#0d9488] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
				<div class="absolute -top-8 -right-8 w-44 h-44 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="background: radial-gradient(circle, rgba(13,148,136,0.35) 0%, transparent 70%); filter: blur(28px);" aria-hidden="true"></div>
				<div class="flex flex-col gap-3 flex-1 relative z-10">
					<div class="flex items-center gap-2">
						<span class="px-2 py-0.5 rounded-full bg-[#0d9488]/15 border border-[#0d9488]/25 text-[9px] font-mono tracking-widest text-[#2dd4bf] uppercase">Concept</span>
						<span class="text-[9px] font-mono text-neutral-600">2021</span>
					</div>
					<h3 class="text-2xl md:text-3xl font-black tracking-tight text-white leading-tight group-hover:text-[#2dd4bf] transition-colors duration-200">Island Resort<br/>Experience</h3>
					<p class="text-xs text-neutral-500 leading-relaxed mt-1">Booking interface + in-resort companion app with a warm sand + deep teal brand identity system.</p>
				</div>
				<div class="mt-6 flex flex-col gap-3 relative z-10">
					<div class="flex flex-wrap gap-1.5">
						{#each ['Hospitality', 'Brand Identity', 'Web Design'] as tag}
							<span class="px-2 py-0.5 rounded-full bg-white/5 text-[9px] font-mono text-neutral-500 border border-white/5">{tag}</span>
						{/each}
					</div>
					<div class="flex items-center gap-4">
						<span class="flex items-center gap-1 text-[10px] font-mono text-neutral-500 group-hover:text-white transition-colors">View case <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></span>
						<a href="https://www.behance.net/gallery/112078247/Resort-Design-(Based-on-island)" target="_blank" rel="noopener noreferrer" onclick={(e) => e.stopPropagation()} class="flex items-center gap-1 text-[10px] font-mono text-[#0d9488]/60 hover:text-[#2dd4bf] transition-colors">Behance ↗</a>
					</div>
				</div>
			</div>

			<!-- Card 4 — Alt News -->
			<div role="link" tabindex="0" onclick={() => window.location.href='/work/alt-news-concept'} onkeydown={(e) => e.key === 'Enter' && (window.location.href='/work/alt-news-concept')} class="concept-card group relative flex flex-col p-8 bg-[#0a0a0b] hover:bg-[#1a1208] transition-colors duration-300 min-h-[300px] cursor-pointer overflow-hidden">
				<div class="absolute top-0 left-0 w-[3px] h-full bg-[#f59e0b] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
				<div class="absolute -top-8 -right-8 w-44 h-44 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="background: radial-gradient(circle, rgba(245,158,11,0.35) 0%, transparent 70%); filter: blur(28px);" aria-hidden="true"></div>
				<div class="flex flex-col gap-3 flex-1 relative z-10">
					<div class="flex items-center gap-2">
						<span class="px-2 py-0.5 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/25 text-[9px] font-mono tracking-widest text-[#fbbf24] uppercase">Concept</span>
						<span class="text-[9px] font-mono text-neutral-600">2021</span>
					</div>
					<h3 class="text-2xl md:text-3xl font-black tracking-tight text-white leading-tight group-hover:text-[#fbbf24] transition-colors duration-200">Alt News<br/>Fact Platform</h3>
					<p class="text-xs text-neutral-500 leading-relaxed mt-1">Credibility-first reading interface — verification status as a visual layer over the headline, not an afterthought.</p>
				</div>
				<div class="mt-6 flex flex-col gap-3 relative z-10">
					<div class="flex flex-wrap gap-1.5">
						{#each ['News Platform', 'Trust Design', 'Web Design'] as tag}
							<span class="px-2 py-0.5 rounded-full bg-white/5 text-[9px] font-mono text-neutral-500 border border-white/5">{tag}</span>
						{/each}
					</div>
					<div class="flex items-center gap-4">
						<span class="flex items-center gap-1 text-[10px] font-mono text-neutral-500 group-hover:text-white transition-colors">View case <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></span>
						<a href="https://www.behance.net/gallery/109173469/Alt-News-(Concept-Design)" target="_blank" rel="noopener noreferrer" onclick={(e) => e.stopPropagation()} class="flex items-center gap-1 text-[10px] font-mono text-[#f59e0b]/60 hover:text-[#fbbf24] transition-colors">Behance ↗</a>
					</div>
				</div>
			</div>

			<!-- Card 5 — Spotify -->
			<div role="link" tabindex="0" onclick={() => window.location.href='/work/spotify-redesign'} onkeydown={(e) => e.key === 'Enter' && (window.location.href='/work/spotify-redesign')} class="concept-card group relative flex flex-col p-8 bg-[#0a0a0b] hover:bg-[#071a0d] transition-colors duration-300 min-h-[300px] cursor-pointer overflow-hidden">
				<div class="absolute top-0 left-0 w-[3px] h-full bg-[#1DB954] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
				<div class="absolute -top-8 -right-8 w-44 h-44 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="background: radial-gradient(circle, rgba(29,185,84,0.35) 0%, transparent 70%); filter: blur(28px);" aria-hidden="true"></div>
				<div class="flex flex-col gap-3 flex-1 relative z-10">
					<div class="flex items-center gap-2">
						<span class="px-2 py-0.5 rounded-full bg-[#1DB954]/15 border border-[#1DB954]/25 text-[9px] font-mono tracking-widest text-[#1DB954] uppercase">Concept</span>
						<span class="text-[9px] font-mono text-neutral-600">2018</span>
					</div>
					<h3 class="text-2xl md:text-3xl font-black tracking-tight text-white leading-tight group-hover:text-[#1DB954] transition-colors duration-200">Spotify<br/>Redesign Concept</h3>
					<p class="text-xs text-neutral-500 leading-relaxed mt-1">Reimagined the core listening interface — now-playing hierarchy, queue management, and session-contextual playlist browsing. The project that started everything.</p>
				</div>
				<div class="mt-6 flex flex-col gap-3 relative z-10">
					<div class="flex flex-wrap gap-1.5">
						{#each ['Music App', 'Interaction Design', 'UI Design'] as tag}
							<span class="px-2 py-0.5 rounded-full bg-white/5 text-[9px] font-mono text-neutral-500 border border-white/5">{tag}</span>
						{/each}
					</div>
					<div class="flex items-center gap-4">
						<span class="flex items-center gap-1 text-[10px] font-mono text-neutral-500 group-hover:text-white transition-colors">View case <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></span>
						<a href="https://www.behance.net/gallery/79737225/Spotify-Re-Design-Concept" target="_blank" rel="noopener noreferrer" onclick={(e) => e.stopPropagation()} class="flex items-center gap-1 text-[10px] font-mono text-[#1DB954]/60 hover:text-[#1DB954] transition-colors">Behance ↗</a>
					</div>
				</div>
			</div>

			<!-- Card 6 — Discord -->
			<div role="link" tabindex="0" onclick={() => window.location.href='/work/discord-redesign'} onkeydown={(e) => e.key === 'Enter' && (window.location.href='/work/discord-redesign')} class="concept-card group relative flex flex-col p-8 bg-[#0a0a0b] hover:bg-[#0e0d1f] transition-colors duration-300 min-h-[300px] cursor-pointer overflow-hidden">
				<div class="absolute top-0 left-0 w-[3px] h-full bg-[#5865f2] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
				<div class="absolute -top-8 -right-8 w-44 h-44 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="background: radial-gradient(circle, rgba(88,101,242,0.35) 0%, transparent 70%); filter: blur(28px);" aria-hidden="true"></div>
				<div class="flex flex-col gap-3 flex-1 relative z-10">
					<div class="flex items-center gap-2">
						<span class="px-2 py-0.5 rounded-full bg-[#5865f2]/15 border border-[#5865f2]/25 text-[9px] font-mono tracking-widest text-[#818cf8] uppercase">Concept</span>
						<span class="text-[9px] font-mono text-neutral-600">2021</span>
					</div>
					<h3 class="text-2xl md:text-3xl font-black tracking-tight text-white leading-tight group-hover:text-[#818cf8] transition-colors duration-200">Discord Redesign<br/>&amp; New Features</h3>
					<p class="text-xs text-neutral-500 leading-relaxed mt-1">Cross-server activity feed, interest-based Stage discovery, and notification triage for power users in 10+ servers.</p>
				</div>
				<div class="mt-6 flex flex-col gap-3 relative z-10">
					<div class="flex flex-wrap gap-1.5">
						{#each ['Social Platform', 'Cross-server UX', 'Product Design'] as tag}
							<span class="px-2 py-0.5 rounded-full bg-white/5 text-[9px] font-mono text-neutral-500 border border-white/5">{tag}</span>
						{/each}
					</div>
					<div class="flex items-center gap-4">
						<span class="flex items-center gap-1 text-[10px] font-mono text-neutral-500 group-hover:text-white transition-colors">View case <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></span>
						<a href="https://www.behance.net/gallery/109150543/Discord-Re-Design-(New-Features-Changes)" target="_blank" rel="noopener noreferrer" onclick={(e) => e.stopPropagation()} class="flex items-center gap-1 text-[10px] font-mono text-[#5865f2]/60 hover:text-[#818cf8] transition-colors">Behance ↗</a>
					</div>
				</div>
			</div>

		</div>
	</div>
</section>

<!-- (04) CAPABILITIES SECTION (Dark Section) -->
<section
	id="capabilities"
	data-theme="dark"
	class="py-16 sm:py-24 lg:py-32 bg-neutral-950 text-white border-t border-white/5 z-10 relative"
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
						class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,#D1D5DB_360deg)]"
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
					class="font-bold tracking-tighter text-white mb-6 leading-[1.1]"
					style="font-size: clamp(2.5rem, 4vw + 1rem, 4.5rem);"
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
					class="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-16 py-8 lg:py-12 border-b border-gray-800 group hover:bg-white/2 transition-colors duration-300"
				>
					<div class="lg:col-span-3 flex items-start lg:items-center">
						<span
							class="text-sm font-mono text-gray-600 group-hover:text-primary transition-colors duration-300"
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

<!-- (06) PARTNER MARQUEE SECTION (Light Section) -->
<section
	data-theme="light"
	class="py-16 sm:py-24 lg:py-32 bg-[#f4f4f6] border-t border-neutral-200/50"
>
	<div
		class="container mx-auto px-6 max-w-[1320px] grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12"
	>
		<div class="lg:col-span-1 flex flex-col justify-start">
			<p class="text-[10px] font-mono tracking-[0.3em] text-neutral-400 uppercase mb-4">(06) Client Work</p>
			<h2 class="text-3xl sm:text-4xl font-black tracking-tight text-black leading-[1.05] mb-4">
				Built with<br/>Real Teams.
			</h2>
			<p class="text-sm text-gray-500 leading-relaxed max-w-[22ch]">Companies I've shipped production-grade product with — not mockups.</p>
		</div>
		<div class="lg:col-span-3">
			<div class="bg-neutral-950 border border-white/5 rounded-3xl sm:rounded-[2.5rem] relative overflow-hidden shadow-2xl">
				<div class="px-6 sm:px-10 pt-8 sm:pt-10 pb-5 sm:pb-6">
					<p class="text-[10px] font-mono tracking-[0.2em] text-neutral-500 uppercase text-center">Trusted by teams at</p>
				</div>
				<!-- gap-px on a bg-white/5 grid creates thin hairline dividers between tiles -->
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-white/5">
					<div class="group flex flex-col gap-1.5 px-6 sm:px-8 py-5 bg-neutral-950 hover:bg-white/[0.04] transition-colors duration-300">
						<span class="text-sm font-black tracking-[0.1em] text-white/70 uppercase group-hover:text-white transition-colors duration-300 cursor-default">WPMU DEV</span>
						<span class="text-[9px] font-mono text-neutral-600 tracking-widest uppercase">Plugin Ecosystem · 7yr</span>
					</div>
					<div class="group flex flex-col gap-1.5 px-6 sm:px-8 py-5 bg-neutral-950 hover:bg-white/[0.04] transition-colors duration-300">
						<span class="text-sm font-black tracking-[0.1em] text-white/70 uppercase group-hover:text-white transition-colors duration-300 cursor-default">Themeisle</span>
						<span class="text-[9px] font-mono text-neutral-600 tracking-widest uppercase">Starter Templates · 2yr</span>
					</div>
					<div class="group flex flex-col gap-1.5 px-6 sm:px-8 py-5 bg-neutral-950 hover:bg-white/[0.04] transition-colors duration-300">
						<span class="text-sm font-black tracking-[0.1em] text-white/70 uppercase group-hover:text-white transition-colors duration-300 cursor-default">Ideajam</span>
						<span class="text-[9px] font-mono text-neutral-600 tracking-widest uppercase">Kanban SaaS · UX Lead</span>
					</div>
					<div class="group flex flex-col gap-1.5 px-6 sm:px-8 py-5 bg-neutral-950 hover:bg-white/[0.04] transition-colors duration-300">
						<span class="text-sm font-black tracking-[0.1em] text-white/70 uppercase group-hover:text-white transition-colors duration-300 cursor-default">Eclectic</span>
						<span class="text-[9px] font-mono text-neutral-600 tracking-widest uppercase">Media Platform · Product</span>
					</div>
					<div class="group flex flex-col gap-1.5 px-6 sm:px-8 py-5 bg-neutral-950 hover:bg-white/[0.04] transition-colors duration-300">
						<span class="text-sm font-black tracking-[0.1em] text-white/70 uppercase group-hover:text-white transition-colors duration-300 cursor-default">Searchmetrics</span>
						<span class="text-[9px] font-mono text-neutral-600 tracking-widest uppercase">SEO Analytics · Contract</span>
					</div>
					<div class="group flex flex-col gap-1.5 px-6 sm:px-8 py-5 bg-neutral-950 hover:bg-white/[0.04] transition-colors duration-300">
						<span class="text-sm font-black tracking-[0.1em] text-white/70 uppercase group-hover:text-white transition-colors duration-300 cursor-default">SomeTechWork</span>
						<span class="text-[9px] font-mono text-neutral-600 tracking-widest uppercase">Tech Design · Contract</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- (08) GET IN TOUCH (CONTACT FORM SECTION - Dark Section) -->
<section
	id="contact"
	data-theme="dark"
	class="w-full py-16 sm:py-24 lg:py-32 bg-portfolio-base text-white border-t border-white/5 z-10 relative"
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
					class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,#D1D5DB_360deg)]"
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
				class="font-bold tracking-tighter text-white mb-8 leading-[1.1]"
				style="font-size: clamp(2.5rem, 4vw + 1rem, 4.5rem);"
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
						class="w-6 h-6 mr-4 text-gray-600 group-hover:text-primary transition-colors"
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
						class="w-6 h-6 mr-4 text-gray-600 group-hover:text-primary transition-colors"
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
					class="absolute inset-[-1000%] motion-safe:animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,#D1D5DB_360deg)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
				></div>

				<!-- Inner Card Surface -->
				<div
					class="relative z-10 h-full w-full bg-[#0a0a0a] rounded-[calc(1.5rem-1px)] p-8 md:p-10 flex flex-col"
				>
					<!-- Ambient Glow -->
					<div
						class="absolute -top-12 -right-12 w-48 h-48 bg-primary/15 rounded-full blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
					></div>

					<div
						class="relative z-10 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary shrink-0"
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
						class="relative z-10 flex items-center text-primary text-sm font-bold tracking-widest uppercase mt-auto"
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
					class="absolute inset-[-1000%] motion-safe:animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,#D1D5DB_360deg)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
				></div>

				<!-- Inner Card Surface -->
				<div
					class="relative z-10 h-full w-full bg-[#0a0a0a] rounded-[calc(1.5rem-1px)] p-8 md:p-10 flex flex-col"
				>
					<!-- Ambient Glow -->
					<div
						class="absolute -top-12 -right-12 w-48 h-48 bg-primary/15 rounded-full blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
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
