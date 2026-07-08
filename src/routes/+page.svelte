<script lang="ts">
	import FeaturedProject from "$lib/components/FeaturedProject.svelte";
	import StackedProjectsV2 from "$lib/components/StackedProjectsV2.svelte";
	import PartnerMarquee from "$lib/components/PartnerMarquee.svelte";
	import PartnerRosterC from "$lib/components/PartnerRosterC.svelte";
	import Chip from "$lib/components/Chip.svelte";
	import { onMount } from "svelte";
	import { afterNavigate } from "$app/navigation";
	import { gsap } from "gsap";
	import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
	import { ArrowRight } from "lucide-svelte";
	import { openNavDropdown } from "$lib/stores/navDropdown";
	import portrait from "$lib/assets/portrait.webp";
	import cubeImg from "$lib/assets/4 Cube Abstract Glass Spectrum.png";
	import gemImg from "$lib/assets/Gem Shape.png";

	// Hero element refs for GSAP entrance
	let heroBio: HTMLElement;
	let heroImage: HTMLElement;
	let heroBar: HTMLElement;

	// Spotlight — plain vars, updated via direct DOM mutation (no Svelte reactivity per frame)
	let spotlightEl: HTMLElement | undefined;
	let spX = 800, spY = 400;

	// Target coords updated on every mousemove (raw, rect-relative)
	let targetX = 800;
	let targetY = 400;

	// RAF spotlight loop — module-scope so handleMouseMove can restart it
	let rafId: number;
	let rafRunning = false;
	const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
	function startSpotlight() {
		if (rafRunning) return;
		rafRunning = true;
		const tick = () => {
			spX = lerp(spX, targetX, 0.1);
			spY = lerp(spY, targetY, 0.1);
			if (spotlightEl) spotlightEl.style.background = `radial-gradient(circle 600px at ${spX}px ${spY}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 40%, #000000 70%)`;
			if (Math.abs(spX - targetX) < 0.5 && Math.abs(spY - targetY) < 0.5) {
				rafRunning = false;
				return;
			}
			rafId = requestAnimationFrame(tick);
		};
		rafId = requestAnimationFrame(tick);
	}

	const handleMouseMove = (event: MouseEvent) => {
		const rect = (
			event.currentTarget as HTMLElement
		).getBoundingClientRect();
		targetX = event.clientX - rect.left;
		targetY = event.clientY - rect.top;
		startSpotlight();
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

	// Metric count-up element refs
	let metric1El: HTMLElement;
	let metric2El: HTMLElement;
	let metric3El: HTMLElement;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// ── Glass asset ambient bobbing ──────────────────────────────────────────
		if (!rm) gsap.to('.glass-asset', {
			y: 12, rotation: 4, duration: 4.5, yoyo: true, repeat: -1,
			ease: 'sine.inOut', stagger: 0.5,
			scrollTrigger: {
				trigger: '#projects', start: 'top bottom', end: 'bottom top',
				toggleActions: 'play pause resume pause',
			},
		});

		// ── Mouse parallax on glass wrappers (GPU: transform only) ──────────────
		const onParallax = (e: MouseEvent) => {
			if (!workSectionRef) return;
			const rect = workSectionRef.getBoundingClientRect();
			const xPos = (e.clientX - rect.left - rect.width / 2) / rect.width;
			const yPos = (e.clientY - rect.top - rect.height / 2) / rect.height;
			gsap.to(leftGlassWrapper, { x: -xPos * 40, y: -yPos * 40, duration: 1, ease: 'power2.out' });
			gsap.to(rightGlassWrapper, { x: xPos * 50, y: yPos * 50, duration: 1, ease: 'power2.out' });
		};
		workSectionRef?.addEventListener('mousemove', onParallax);

		if (!rm) {
			// ── Hero entrance — Awwwards curtain wipe per line ──────────────────
			// Use gsap.set() to establish known initial states explicitly, then
			// gsap.to() to animate to known targets. This avoids the gsap.from()
			// immediateRender race where ScrollTrigger.refresh() can fire between
			// the "record to-value" and "apply from-state" steps, causing GSAP to
			// record opacity:0 as the to-value and animate from 0→0 (invisible forever).
			gsap.set('.hero-line-inner', { yPercent: 110 });
			gsap.set('.hero-sub-inner',  { yPercent: 110 });
			gsap.set('.hero-available',  { opacity: 0, y: 10 });
			if (heroBio)   gsap.set(heroBio,   { opacity: 0, y: 18 });
			if (heroImage) gsap.set(heroImage,  { opacity: 0, scale: 0.96 });
			if (heroBar)   gsap.set(heroBar,    { opacity: 0, y: 12 });
			gsap.set('.hero-cta', { opacity: 0, y: 14 });

			gsap.timeline({ delay: 0.1 })
				.to('.hero-line-inner', { yPercent: 0,  duration: 1.0, stagger: 0.09, ease: 'power4.out' })
				.to('.hero-sub-inner',  { yPercent: 0,  duration: 0.75, ease: 'power3.out' }, '-=0.55')
				.to('.hero-available',  { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4')
				.to(heroBio,            { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.35')
				.to('.hero-cta',        { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: 'power3.out' }, '-=0.4')
				.to(heroImage,          { opacity: 1, scale: 1, duration: 1.0, ease: 'power3.out' }, 0.25)
				.to(heroBar,            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');

			// Helpers — set() establishes known initial state; to() targets explicit values.
			// gsap.from() with immediateRender records the "to" value at creation time.
			// A ScrollTrigger.refresh() or reflow can cause GSAP to re-read the from-state
			// (e.g. opacity:0) as the to-value, making the animation play 0→0 (invisible forever).
			const curtain = (sel: string, trigger: string | Element, start = 'top 82%') => {
				gsap.set(sel, { yPercent: 110 });
				return gsap.to(sel, { yPercent: 0, duration: 0.85, stagger: 0.07, ease: 'power4.out',
					scrollTrigger: { trigger, start, once: true } });
			};

			const fadeUp = (sel: string | Element, trigger: string | Element) => {
				gsap.set(sel, { opacity: 0, y: 22 });
				return gsap.to(sel, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
					scrollTrigger: { trigger, start: 'top 80%', once: true } });
			};

			// ── Studio / System Architecture ──────────────────────────────────
			gsap.set('.studio-chip', { opacity: 0, y: 16 });
			gsap.to('.studio-chip', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
				scrollTrigger: { trigger: '#studio', start: 'top 85%', once: true } });
			curtain('.studio-line-inner', '#studio h2');
			fadeUp('#studio p.text-lg', '#studio h2');
			gsap.set('#studio li', { opacity: 0, y: 18 });
			gsap.to('#studio li', { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power3.out',
				scrollTrigger: { trigger: '#studio ul', start: 'top 80%', once: true } });
			fadeUp('.metrics-card', '#studio');

			// ── Metrics count-up — expo.out with decimal precision for premium feel ──
			const countUps = [
				{ el: metric1El, target: 98, decimals: 1, suffix: '%',  finalText: '98%'  },
				{ el: metric2El, target: 2,  decimals: 1, suffix: 'M+', finalText: '2M+'  },
				{ el: metric3El, target: 50, decimals: 0, suffix: '+',  finalText: '50+'  },
			];
			countUps.forEach(({ el, target, decimals, suffix, finalText }, i) => {
				if (!el) return;
				const proxy = { val: 0 };
				el.textContent = (0).toFixed(decimals) + suffix;
				gsap.to(proxy, {
					val: target,
					duration: 2.4,
					delay: i * 0.2,
					ease: 'expo.out',
					onUpdate() { el.textContent = proxy.val.toFixed(decimals) + suffix; },
					onComplete() { el.textContent = finalText; },
					scrollTrigger: { trigger: '.metrics-card', start: 'top 80%', once: true },
				});
			});

			// ── Bridging The Gap ──────────────────────────────────────────────
			curtain('.bridging-line-inner', '.bridging-section', 'top 78%');
			gsap.set('.bridging-sub', { opacity: 0, y: 18 });
			gsap.to('.bridging-sub', { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
				scrollTrigger: { trigger: '.bridging-section', start: 'top 72%', once: true } });

			// ── Concepts & Explorations ───────────────────────────────────────
			gsap.set('.concepts-chip', { opacity: 0, y: 16 });
			gsap.to('.concepts-chip', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
				scrollTrigger: { trigger: '.concepts-section', start: 'top 85%', once: true } });
			curtain('.concepts-line-inner', '.concepts-section', 'top 80%');
			gsap.set('.concepts-sub', { opacity: 0, y: 16 });
			gsap.to('.concepts-sub', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
				scrollTrigger: { trigger: '.concepts-section', start: 'top 74%', once: true } });
			gsap.set('.concept-card', { opacity: 0, y: 28 });
			gsap.to('.concept-card', { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: 'power3.out',
				scrollTrigger: { trigger: '.concepts-section', start: 'top 78%', once: true } });

			// ── Capabilities ──────────────────────────────────────────────────
			gsap.set('.caps-chip', { opacity: 0, y: 16 });
			gsap.to('.caps-chip', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
				scrollTrigger: { trigger: '#capabilities', start: 'top 85%', once: true } });
			curtain('.caps-heading-inner', '#capabilities', 'top 80%');
			gsap.set('.caps-desc', { opacity: 0, y: 20 });
			gsap.to('.caps-desc', { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
				scrollTrigger: { trigger: '#capabilities', start: 'top 75%', once: true } });
			gsap.set('.cap-row', { opacity: 0, y: 18 });
			gsap.to('.cap-row', { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out',
				scrollTrigger: { trigger: '#capabilities .border-t', start: 'top 80%', once: true } });

			// ── Contact section ───────────────────────────────────────────────
			gsap.set('.contact-chip', { opacity: 0, y: 16 });
			gsap.to('.contact-chip', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
				scrollTrigger: { trigger: '#contact', start: 'top 85%', once: true } });
			curtain('.contact-line-inner', '#contact', 'top 80%');
			gsap.set('.contact-desc', { opacity: 0, y: 20 });
			gsap.to('.contact-desc', { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
				scrollTrigger: { trigger: '#contact', start: 'top 75%', once: true } });
			gsap.set('.contact-card', { opacity: 0, y: 24 });
			gsap.to('.contact-card', { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
				scrollTrigger: { trigger: '#contact .grid', start: 'top 85%', once: true } });
		}

		// Refresh after fonts load — handles reflow from custom font metrics.
		document.fonts.ready.then(() => ScrollTrigger.refresh());

		mounted = true;
		return () => {
			mounted = false;
			cancelAnimationFrame(rafId);
			clearTimeout(refreshTimer);
			workSectionRef?.removeEventListener('mousemove', onParallax);
			ScrollTrigger.getAll().forEach(t => t.kill());
		};
	});

	// afterNavigate fires after every SPA transition including initial load.
	// Delay past the hero animation (~2.1s) so the refresh doesn't cause a
	// visible flash while the hero curtain wipe is mid-play.
	// The mounted guard ensures we don't refresh after navigating away.
	let mounted = false;
	let refreshTimer: ReturnType<typeof setTimeout>;
	afterNavigate(() => {
		clearTimeout(refreshTimer);
		refreshTimer = setTimeout(() => {
			if (mounted) ScrollTrigger.refresh();
		}, 2400);
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
		class="relative z-10 flex-1 flex flex-col justify-center max-w-[1320px] mx-auto w-full px-6 md:px-8 mt-20 md:mt-0 md:pt-16"
	>
		<!-- 12-col primary grid -->
		<div
			class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center w-full"
		>
			<!-- Left col · span 9 · three-tier nameplate -->
			<div class="col-span-1 md:col-span-9 flex flex-col justify-center">
				<div class="relative z-20 flex flex-col justify-center">
					<h1
						class="leading-[0.85] tracking-tighter font-medium text-white select-none"
						style="font-size: clamp(3rem, 8vw + 1rem, 10rem);"
					>
						<span class="hero-line block overflow-hidden"><span class="hero-line-inner block">Hitanshu</span></span>
						<span class="hero-line block overflow-hidden"><span class="hero-line-inner block">Sahu.</span></span>
					</h1>

					<h2
						class="text-gray-300 font-normal tracking-tight mt-6 overflow-hidden"
						style="font-size: clamp(1.2rem, 2vw + 0.75rem, 2.25rem);"
					>
						<span class="hero-sub-inner block">Product Designer.</span>
					</h2>

					<div class="hero-available flex items-center gap-2 mt-5">
						<span class="relative flex h-2 w-2" aria-hidden="true">
							<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
							<span class="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
						</span>
						<span class="text-[11px] font-mono tracking-widest text-green-400/80 uppercase">Available — open to full-time roles</span>
					</div>

					<p
						bind:this={heroBio}
						class="w-full text-gray-400 mt-5 text-lg font-normal leading-relaxed"
					>
						I design SaaS products that reduce operational friction
						and scale — at the intersection of product strategy,
						design systems, and frontend execution. 7 years shipping
						at WPMU DEV and across high-growth platforms.
					</p>

					<div class="flex flex-col sm:flex-row gap-3 mt-8">
						<button
							type="button"
							onclick={() => openNavDropdown.set('projects')}
							class="hero-cta inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-black rounded-full text-sm font-bold tracking-wide hover:bg-gray-100 transition-all duration-200 active:scale-95 shadow-lg shadow-black/30"
						>
							View Work
							<ArrowRight class="size-3.5" />
						</button>
						<a
							href="/Hitanshu_Sahu___Resume_JUN_Updated.pdf"
							target="_blank"
							rel="noopener noreferrer"
							class="hero-cta inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/20 text-white rounded-full text-sm font-bold tracking-wide hover:border-white/50 hover:bg-white/5 transition-all duration-200"
						>
							Download Resume
							<svg class="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
							</svg>
						</a>
					</div>
				</div>
			</div>

			<!-- Right col · span 3 · greyscale portrait — hidden on mobile -->
			<div
				class="hidden md:flex col-span-1 md:col-span-3 justify-start md:justify-end"
			>
				<div
					bind:this={heroImage}
					class="w-full max-w-[260px] aspect-[3/4] relative"
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
				class="w-full flex flex-col md:flex-row flex-wrap justify-center items-center gap-4"
			>
				<Chip theme="dark" spin="glow" class="w-full md:w-auto" innerClass="px-6 py-3.5">
					<span class="text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors duration-200">Core: Figma, Svelte, WordPress</span>
				</Chip>

				<Chip theme="dark" spin="glow" class="w-full md:w-auto" innerClass="px-6 py-3.5">
					<span class="text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors duration-200">Specialization: SaaS, Dashboards &amp; Atomic Systems</span>
				</Chip>

				<Chip theme="dark" spin="glow" class="w-full md:w-auto" innerClass="px-6 py-3.5">
					<span class="text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors duration-200">7+ Years Deep Ecosystem Experience</span>
				</Chip>
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
		class="w-full max-w-[1320px] mx-auto px-6 py-14 sm:py-20 lg:py-24 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center"
	>
		<div class="md:col-span-8 flex flex-col space-y-8">
			<div>
				<div
					class="studio-chip mb-8 relative inline-flex overflow-hidden rounded-full p-[1.5px] shadow-sm bg-neutral-200"
				>
					<div
						class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,rgba(0,0,0,0.75)_360deg)]"
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
					class="font-black tracking-tight text-black mb-6 leading-[1.05]"
					style="font-size: clamp(1.6rem, 2vw + 0.75rem, 2.5rem);"
				>
					<span class="studio-line block overflow-hidden"><span class="studio-line-inner block">Architecting scalable UI systems</span></span>
					<span class="studio-line block overflow-hidden"><span class="studio-line-inner block"><span class="shimmer-light">and production-ready frontends for high-growth SaaS.</span></span></span>
				</h2>
				<p class="text-lg text-gray-600 leading-relaxed">
					I operate at the intersection of high-fidelity design and
					technical execution. Over the past 7 years, I've integrated
					with companies like WPMU DEV to translate complex
					constraints into robust, compliant design systems.
				</p>
			</div>

			<ul class="space-y-6">
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

		<div class="md:col-span-4 flex items-center">
			<div
				class="metrics-card bg-[#0a0a0a] rounded-[2rem] p-8 lg:p-10 w-full flex flex-col justify-center space-y-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]"
			>
				<p
					class="text-xs font-mono tracking-widest text-portfolio-success uppercase"
				>
					Metrics &amp; Impact
				</p>

				<div>
					<h3
						bind:this={metric1El}
						class="text-6xl lg:text-7xl font-bold text-white tracking-tighter leading-none mb-1 tabular-nums"
					>
						0%
					</h3>
					<p
						class="text-sm lg:text-base font-medium tracking-widest text-gray-400 uppercase"
					>
						Client Satisfaction
					</p>
				</div>

				<div>
					<h3
						bind:this={metric2El}
						class="text-6xl lg:text-7xl font-bold text-white tracking-tighter leading-none mb-1 tabular-nums"
					>
						0M+
					</h3>
					<p
						class="text-sm lg:text-base font-medium tracking-widest text-gray-400 uppercase"
					>
						Active Plugin Users
					</p>
				</div>

				<div>
					<h3
						bind:this={metric3El}
						class="text-6xl lg:text-7xl font-bold text-white tracking-tighter leading-none mb-1 tabular-nums"
					>
						0+
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
		class="bridging-section relative w-full max-w-[1320px] mx-auto px-6 text-center z-10 mt-12"
	>
		<div
			bind:this={leftGlassWrapper}
			class="hidden md:block absolute md:left-4 lg:left-12 top-1/2 -translate-y-1/2 w-20 md:w-28 pointer-events-none"
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
			class="hidden md:block absolute md:right-4 lg:right-12 top-1/4 w-16 md:w-24 pointer-events-none"
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
			<span class="bridging-line block overflow-hidden"><span class="bridging-line-inner block">BRIDGING</span></span>
			<span class="bridging-line block overflow-hidden"><span class="bridging-line-inner block">THE <span class="shimmer-light">GAP.</span></span></span>
		</h2>
		<p
			class="bridging-sub text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed relative z-10 mt-6"
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
					<span
						class="text-2xl md:text-3xl font-black tracking-[0.25em] text-gray-300 uppercase transition-colors hover:text-gray-800 cursor-default"
						>Spotify</span
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
					<span
						class="text-2xl md:text-3xl font-black tracking-[0.25em] text-gray-300 uppercase transition-colors hover:text-gray-800 cursor-default"
						>Spotify</span
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
					class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,rgba(0,0,0,0.75)_360deg)]"
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
<section class="concepts-section bg-[#0a0a0b] py-16 sm:py-20 lg:py-28 px-6 border-t border-white/5">
	<div class="max-w-[1320px] mx-auto">

		<!-- Header -->
		<div class="mb-16">
			<Chip theme="dark" spin="always" class="concepts-chip mb-6" innerClass="px-6 py-2">
				<span class="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">Personal Research</span>
			</Chip>
			<h2 class="font-black tracking-tight text-white leading-[0.95] mt-6" style="font-size: clamp(2.25rem, 4vw + 1rem, 4rem);">
				<span class="concepts-line block overflow-hidden"><span class="concepts-line-inner block">Concepts &amp;</span></span>
				<span class="concepts-line block overflow-hidden"><span class="concepts-line-inner block"><span class="shimmer-dark">Explorations.</span></span></span>
			</h2>
			<p class="concepts-sub text-sm text-neutral-500 max-w-[48ch] leading-relaxed mt-5">
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

			<!-- Card 6 — Discord (odd last card → full width) -->
			<div role="link" tabindex="0" onclick={() => window.location.href='/work/discord-redesign'} onkeydown={(e) => e.key === 'Enter' && (window.location.href='/work/discord-redesign')} class="concept-card group relative flex flex-col md:flex-row md:items-center md:gap-16 p-8 bg-[#0a0a0b] hover:bg-[#0e0d1f] transition-colors duration-300 min-h-[300px] cursor-pointer overflow-hidden md:col-span-2">
				<div class="absolute top-0 left-0 w-[3px] h-full bg-[#5865f2] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
				<div class="absolute -top-8 -right-8 w-64 h-64 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="background: radial-gradient(circle, rgba(88,101,242,0.35) 0%, transparent 70%); filter: blur(40px);" aria-hidden="true"></div>
				<div class="flex flex-col gap-3 flex-1 relative z-10">
					<div class="flex items-center gap-2">
						<span class="px-2 py-0.5 rounded-full bg-[#5865f2]/15 border border-[#5865f2]/25 text-[9px] font-mono tracking-widest text-[#818cf8] uppercase">Concept</span>
						<span class="text-[9px] font-mono text-neutral-600">2021</span>
					</div>
					<h3 class="text-2xl md:text-4xl font-black tracking-tight text-white leading-tight group-hover:text-[#818cf8] transition-colors duration-200">Discord Redesign<br/>&amp; New Features</h3>
					<p class="text-xs md:text-sm text-neutral-500 leading-relaxed mt-1 max-w-[52ch]">Cross-server activity feed, interest-based Stage discovery, and notification triage for power users in 10+ servers.</p>
				</div>
				<div class="mt-6 md:mt-0 flex flex-col gap-3 relative z-10 md:shrink-0">
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
		<div class="mb-24">
			<Chip theme="dark" spin="always" class="caps-chip mb-6" innerClass="px-6 py-2">
				<span class="text-[11px] font-mono tracking-widest text-gray-400 uppercase">Capabilities</span>
			</Chip>
			<h2
				class="font-black tracking-tighter text-white mb-6 leading-[1.1] mt-6 overflow-hidden"
				style="font-size: clamp(2.5rem, 4vw + 1rem, 4.5rem);"
			>
				<span class="caps-heading-inner block">What I <span class="shimmer-dark">Do</span></span>
			</h2>
			<p class="caps-desc text-lg text-gray-400 leading-relaxed max-w-2xl">
				Combining UX strategy, pixel-perfect visual engineering, and
				systematic responsive layouts to launch high-performance
				digital solutions.
			</p>
		</div>

		<!-- ======================================= -->
		<!-- LIST ITEMS -->
		<!-- ======================================= -->
		<div class="border-t border-gray-800">
			{#each capabilities as cap}
				<div
					class="cap-row grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-16 py-8 md:py-12 border-b border-gray-800 group hover:bg-white/2 transition-colors duration-300"
				>
					<div class="md:col-span-3 flex items-start md:items-center">
						<span
							class="text-sm font-mono text-gray-600 group-hover:text-primary transition-colors duration-300"
							>{cap.id}</span
						>
					</div>
					<div class="md:col-span-4 flex items-start md:items-center">
						<h3
							class="text-3xl font-medium tracking-tight text-gray-300 group-hover:text-white transition-colors duration-300"
						>
							{cap.title}
						</h3>
					</div>
					<div class="md:col-span-5 flex items-start md:items-center">
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

<!-- (06) CLIENT WORK / PARTNER SECTION -->
<PartnerRosterC />

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
				class="contact-chip mb-8 self-start relative inline-flex overflow-hidden rounded-full p-[1px]"
			>
				<div
					class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,rgba(255,255,255,0.65)_360deg)]"
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
				class="font-black tracking-tighter text-white mb-8 leading-[1.1]"
				style="font-size: clamp(2.5rem, 4vw + 1rem, 4.5rem);"
			>
				<span class="contact-line block overflow-hidden"><span class="contact-line-inner block">Let’s Start Something</span></span>
				<span class="contact-line block overflow-hidden"><span class="contact-line-inner block"><span class="shimmer-dark">Meaningful</span></span></span>
			</h2>
			<p
				class="contact-desc text-xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl"
			>
				Have a project in mind or just an idea taking shape? Tell me
				where you are. I’ll take it from there.
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
				class="contact-card group/card relative block overflow-hidden rounded-3xl p-[1px] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
			>
				<!-- Default subtle border -->
				<div
					class="absolute inset-0 bg-white/5 transition-opacity duration-500 group-hover/card:opacity-0"
				></div>

				<!-- Animated spinning border -->
				<div
					class="absolute inset-[-1000%] motion-safe:animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,rgba(255,255,255,0.65)_360deg)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
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
						class="relative z-10 flex items-center text-white text-sm font-bold tracking-widest uppercase mt-auto"
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
				class="contact-card group/card relative block overflow-hidden rounded-3xl p-[1px] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
			>
				<!-- Default subtle border -->
				<div
					class="absolute inset-0 bg-white/5 transition-opacity duration-500 group-hover/card:opacity-0"
				></div>

				<!-- Animated spinning border -->
				<div
					class="absolute inset-[-1000%] motion-safe:animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,rgba(255,255,255,0.65)_360deg)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
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

	/* ── Shimmer wipe — mirrors CaseStudyBento stat-hero approach ── */
	@keyframes shimmer-sweep {
		0%   { background-position: 200% center; }
		100% { background-position: -200% center; }
	}

	/* Grey shimmer for dark backgrounds: dim grey → silver → dim grey */
	.shimmer-dark {
		background: linear-gradient(
			105deg,
			rgba(80,80,80,1)   0%,
			rgba(165,165,165,1) 28%,
			rgba(100,100,100,1) 50%,
			rgba(165,165,165,1) 72%,
			rgba(80,80,80,1)   100%
		);
		background-size: 220% auto;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: shimmer-sweep 5s linear infinite;
	}

	/* Grey shimmer for light backgrounds: mid-grey → light-grey gleam → mid-grey */
	.shimmer-light {
		background: linear-gradient(
			105deg,
			rgba(130,130,130,1)  0%,
			rgba(175,175,175,1)  28%,
			rgba(140,140,140,1)  50%,
			rgba(175,175,175,1)  72%,
			rgba(130,130,130,1)  100%
		);
		background-size: 220% auto;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: shimmer-sweep 5s linear infinite;
	}
</style>
