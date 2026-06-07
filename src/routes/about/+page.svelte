<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { gsap } from "gsap";
	import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
	import { Star, ExternalLink, ArrowRight } from "lucide-svelte";
	import profilePic from "$lib/assets/portrait.webp";
	import starImg from "$lib/assets/Cylindrical Half Star.png";
	import gemImg from "$lib/assets/Gem Shape.png";

	let cardEl: HTMLElement;
	let cardContainerEl: HTMLElement;
	let cardSlotEl: HTMLElement;
	let h1El: HTMLElement;
	let manifestoEl: HTMLElement;
	let pageWrapperEl: HTMLElement;
	let coreStrengthsEl: HTMLElement;

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
					return (
						cardSlotEl.getBoundingClientRect().top -
						cardContainerEl.getBoundingClientRect().top
					);
				};

				// Hero 3D Physics & FLIP Pinning
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: cardContainerEl,
						start: "center center",
						end: () => `+=${getDistance()}`,
						scrub: true,
						pin: true,
						pinSpacing: false,
						invalidateOnRefresh: true,
					},
				});

				tl.to(
					cardEl,
					{
						rotateX: 180,
						ease: "none",
					},
					0,
				).to(
					pageWrapperEl,
					{
						backgroundColor: "#0a0a0c",
						color: "#ffffff",
						ease: "none",
					},
					0,
				);

				// Fade out H1 separately as we scroll down so it doesn't overlap text
				gsap.to(h1El, {
					opacity: 0,
					y: -50,
					ease: "none",
					scrollTrigger: {
						trigger: h1El.closest("section"),
						start: "top top",
						end: "bottom center",
						scrub: true,
					},
				});

				// Manifesto Mask
				const words = manifestoEl.querySelectorAll("span");
				gsap.fromTo(
					words,
					{ color: "rgba(255,255,255,0.1)" },
					{
						color: "#ffffff",
						stagger: 0.1,
						ease: "none",
						scrollTrigger: {
							trigger: manifestoEl.closest("section"),
							start: "top center",
							end: "bottom center",
							scrub: true,
						},
					},
				);

				// Floating 3D shapes
				gsap.fromTo(
					".floating-shape",
					{ y: -12, rotation: -8 },
					{
						y: 12,
						rotation: 8,
						duration: 2,
						yoyo: true,
						repeat: -1,
						ease: "sine.inOut",
						stagger: 0.5,
					},
				);

				// Revert to light theme for Core Strengths
				gsap.to(pageWrapperEl, {
					backgroundColor: "#f4f4f6",
					color: "#171717",
					ease: "none",
					immediateRender: false,
					scrollTrigger: {
						trigger: coreStrengthsEl,
						start: "top 60%",
						end: "top 20%",
						scrub: true,
					},
				});
			}); // End gsap context
		}, 700);
	});

	onDestroy(() => {
		clearTimeout(initTimeout);
		if (ctx) ctx.revert();
	});

	let activeIndex = $state(0);
	let timelineCards: HTMLElement[] = $state([]);

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					activeIndex = parseInt(entry.target.dataset.index || "0");
				}
			});
		}, {
			rootMargin: '-50% 0px -50% 0px',
			threshold: 0
		});

		setTimeout(() => {
			timelineCards.forEach(card => {
				if (card) observer.observe(card);
			});
		}, 100);

		return () => observer.disconnect();
	});

	const experiences = [
		{
			company: "SomeTechWork",
			role: "Product Designer & Frontend Designer",
			date: "Dec 2025 — Present",
			description: "Developing product blueprints and translating client requirements into clear, user-centered UI/UX designs. Implementing front-end pages in WordPress using Elementor and Gutenberg, ensuring WCAG-aligned accessibility and cross-device responsiveness."
		},
		{
			company: "Eclectic",
			role: "Product Designer & Social Media Designer",
			date: "Mar 2025 — Present",
			description: "Leading app redesigns using scalable Figma design systems for multi-region localization. Leveraging AI tools and After Effects to accelerate graphic design workflows and motion graphics production."
		},
		{
			company: "WPMU DEV",
			role: "Product Designer",
			date: "May 2022 — Sep 2024",
			description: "Spearheaded a scalable atomic design system and WordPress-standard monochrome mode. Redesigned core plugin flows (Smush, Hummingbird, Snapshot) to boost Pro conversions, reduce bounce rates, and streamline complex database restore UX."
		},
		{
			company: "Ideajam",
			role: "UI/UX Designer",
			date: "Aug 2021 — Jan 2022",
			description: "Led a Kanban SaaS redesign, leveraging user feedback to remove bottlenecks. Engineered a fresh, white-labeled design system from scratch to ensure cross-brand consistency and future scalability."
		},
		{
			company: "Searchmetrics",
			role: "SaaS Video & Brand Designer",
			date: "May 2021 — Jan 2022",
			description: "Produced engaging data-driven animations demonstrating API capabilities. Designed marketing materials, brochures, and client awards to highlight core sales points and strengthen brand loyalty."
		},
		{
			company: "Themeisle",
			role: "Starter Template Designer",
			date: "Jul 2018 — May 2021",
			description: "Designed 50+ diverse, high-performance layouts for the Neve Theme. Conducted niche research to optimize typography, color systems, and cohesive WordPress starter template designs."
		}
	];

	let timelineContainer = $state<HTMLElement | null>(null);
	let innerHeight = $state(0);
	let scrollY = $state(0);
	
	const fillPercentage = $derived.by(() => {
		const _ = scrollY; // Force dependency
		if (timelineContainer && innerHeight) {
			const rect = timelineContainer.getBoundingClientRect();
			// Trigger point is the vertical center of the viewport
			const triggerPoint = innerHeight / 2;
			const scrolledPast = triggerPoint - rect.top;
			const rawPercentage = scrolledPast / rect.height;
			
			// Clamp the value strictly between 0 and 100
			return Math.max(0, Math.min(1, rawPercentage)) * 100;
		}
		return 0;
	});
</script>

<svelte:window bind:scrollY bind:innerHeight />

<svelte:head>
	<title>About | Hitanshu Sahu</title>
</svelte:head>

<div
	bind:this={pageWrapperEl}
	class="bg-[#f4f4f6] text-neutral-900 min-h-screen"
>
	<!-- Phase 2: Hero Section -->
	<section
		data-theme="light"
		id="about-hero"
		class="relative min-h-screen flex flex-col items-center pt-[160px] pb-24"
	>
		<!-- Experience Badge -->
		<div
			class="relative z-20 inline-flex items-center justify-center p-[1.5px] rounded-full overflow-hidden mb-8 shadow-sm bg-neutral-200"
		>
			<div
				class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,#f97316_360deg)]"
			></div>
			<div
				class="relative bg-white px-5 py-2 rounded-full w-full h-full flex items-center justify-center"
			>
				<span
					class="text-xs font-semibold tracking-tight text-neutral-800"
					>{experienceYears}+ years of experience</span
				>
			</div>
		</div>

		<h1
			bind:this={h1El}
			class="relative z-10 text-center font-black uppercase text-neutral-900 whitespace-nowrap mb-8 lg:mb-12"
			style="font-size: clamp(4rem, 10.5vw, 10rem); letter-spacing: -0.03em; line-height: 0.85; transform-style: preserve-3d;"
		>
			<img
				src={starImg}
				alt="3D Star"
				class="floating-shape absolute object-contain pointer-events-none"
				style="z-index: -1; top: -3vw; left: -6vw; width: clamp(80px, 7vw, 140px);"
			/>
			Product <br /> Designer
			<img
				src={gemImg}
				alt="3D Gem"
				class="floating-shape absolute object-contain pointer-events-none"
				style="z-index: -1; bottom: -3vw; right: -6vw; width: clamp(80px, 7vw, 140px);"
			/>
		</h1>

		<div
			bind:this={cardContainerEl}
			class="relative z-20 w-full max-w-[260px] lg:max-w-[320px] aspect-[4/5] mx-auto"
			style="perspective: 1500px;"
		>
			<div
				bind:this={cardEl}
				class="w-full h-full relative"
				style="transform-style: preserve-3d;"
			>
				<!-- Front Face (Grayscale) -->
				<div
					class="absolute inset-0 rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.15)] border border-neutral-900/10"
					style="backface-visibility: hidden;"
				>
					<img
						src={profilePic}
						alt="Hitanshu Sahu Profile"
						fetchpriority="high"
						decoding="async"
						class="w-full h-full object-cover grayscale"
					/>
				</div>
				<!-- Back Face (Color) -->
				<div
					class="absolute inset-0 rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] border border-white/10"
					style="backface-visibility: hidden; transform: rotateX(180deg);"
				>
					<img
						src={profilePic}
						alt="Hitanshu Sahu Profile Color"
						fetchpriority="high"
						decoding="async"
						class="w-full h-full object-cover"
					/>
				</div>
			</div>
		</div>
	</section>

	<!-- Phase 3: The Copy Split Grid -->
	<!-- Strictly boxed global container -->
	<section
		data-theme="dark"
		id="about-bio"
		class="w-full max-w-6xl mx-auto px-6 py-24 relative"
	>
		<!-- 3-Column Strict Grid locked to vertical center -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
			<!-- Left Column: Intro -->
			<div class="col-span-1 flex flex-col justify-center">
				<h2
					class="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white"
				>
					Hey!
				</h2>
				<p class="text-gray-400 text-lg leading-relaxed font-medium">
					I'm Hitanshu Sahu, a tech-obsessed Product Designer based in
					Kanpur, India. I focus on bridging the exact gap between
					advanced visual interfaces and technical frontend
					architecture.
				</p>
			</div>

			<!-- Center Column: Portrait (GSAP Target Slot) -->
			<div class="col-span-1 flex justify-center">
				<div
					bind:this={cardSlotEl}
					class="relative w-full max-w-sm aspect-[4/5] rounded-3xl pointer-events-none opacity-0"
				></div>
			</div>

			<!-- Right Column: Details -->
			<div class="col-span-1 flex flex-col justify-center space-y-6">
				<p class="text-gray-400 text-lg leading-relaxed">
					With over 7 years of deep ecosystem experience, I build,
					launch, and scale intuitive UI systems for complex SaaS
					platforms, high-growth digital products, and optimized
					WordPress frameworks.
				</p>
				<p class="text-gray-400 text-lg leading-relaxed">
					Holding an academic foundation with a Master in Computer
					Application (MCA), my design logic translates naturally to
					robust developer handoffs and clean atomic systems—no
					delays, no drama.
				</p>
			</div>
		</div>
	</section>

	<!-- Phase 4: Manifesto Reveal -->
	<section
		data-theme="dark"
		id="about-manifesto"
		class="py-40 px-6 flex items-center justify-center border-t border-white/5 relative"
	>
		<div bind:this={manifestoEl} class="max-w-5xl mx-auto text-center">
			<p
				class="text-3xl md:text-5xl lg:text-[4.5rem] font-bold leading-tight tracking-tight flex flex-wrap justify-center gap-x-3 md:gap-x-4 gap-y-2"
			>
				{#each "From idea to launch. Clean, scalable digital products built to move fast, stay simple, and perform in real-world use. Driven by clarity, structured systems, and intentional design.".split(" ") as word}
					<span class="inline-block transition-colors">{word}</span>
				{/each}
			</p>
		</div>
	</section>

	<!-- The Dark Theme Timeline Track -->
	<section class="w-full max-w-5xl mx-auto py-24 px-6 relative border-t border-gray-900" data-theme="dark">
		<div class="mb-20">
			<div class="mb-4 relative inline-flex overflow-hidden rounded-full p-[1px]">
				<div class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,#FF4400_360deg)]"></div>
				<div class="inline-flex h-full w-full items-center justify-center rounded-full bg-neutral-950 px-6 py-2 relative z-10">
					<span class="text-[11px] font-mono tracking-widest text-gray-400 uppercase">PROOF OF EXECUTION</span>
				</div>
			</div>
			<h2 class="text-4xl md:text-5xl font-bold tracking-tight text-white">
				Work Experience
			</h2>
		</div>

		<div class="relative pl-8 md:pl-12" bind:this={timelineContainer}>
			<!-- The Absolute Vertical Line (Dark Mode) -->
			<div class="absolute left-0 top-2 bottom-0 w-[2px] bg-gray-800"></div>

			<!-- The Animated Draw Line -->
			<div 
				class="absolute left-0 top-2 w-[2px] bg-[#FF4400] transition-all duration-75 ease-out"
				style="height: {fillPercentage}%;"
			></div>

			<!-- The Data Loop -->
			<div class="space-y-16">
				{#each experiences as exp, i}
					<div 
						bind:this={timelineCards[i]} 
						data-index={i}
						class="relative group transition-opacity duration-500 {activeIndex >= i ? 'opacity-100' : 'opacity-40'}"
					>
						<!-- The Tracking Node -->
						<div class="absolute -left-[39px] md:-left-[55px] top-1.5 flex h-4 w-4 items-center justify-center">
							<!-- Node Outer Pulse -->
							<span class="absolute inline-flex h-full w-full rounded-full transition-all duration-500 {activeIndex >= i ? 'bg-[#FF4400] opacity-30 scale-150' : 'bg-gray-800 scale-100'}"></span>
							<!-- Node Inner Core -->
							<span class="relative inline-flex rounded-full h-2 w-2 transition-colors duration-500 {activeIndex >= i ? 'bg-[#FF4400]' : 'bg-gray-600'}"></span>
						</div>

						<!-- Card Content -->
						<div class="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 mb-4">
							<div>
								<h3 class="text-2xl font-semibold text-white transition-colors duration-500 {activeIndex >= i ? 'text-white' : 'text-gray-400'}">{exp.role}</h3>
								<p class="text-lg text-gray-500 font-medium mt-1">{exp.company}</p>
							</div>
							<span class="text-sm font-mono tracking-widest uppercase shrink-0 transition-colors duration-500 {activeIndex >= i ? 'text-[#FF4400]' : 'text-gray-600'}">
								{exp.date}
							</span>
						</div>
						
						<p class="text-gray-400 text-base md:text-lg leading-relaxed max-w-3xl transition-colors duration-500 {activeIndex >= i ? 'text-gray-300' : 'text-gray-600'}">
							{exp.description}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Phase 5: Credentials Bento Box -->
	<section
		data-theme="dark"
		id="credentials-bento"
		class="py-32 px-6 border-t border-white/5 bg-transparent"
	>
		<div class="max-w-5xl mx-auto w-full px-6 mb-24">
			<h3
				class="text-sm font-mono text-primary tracking-widest uppercase mb-12 text-center md:text-left"
			>
				Verifiable Credentials
			</h3>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				<!-- Google Bento Card -->
				<div
					class="group/card relative overflow-hidden rounded-[17px] p-[1px] flex flex-col transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
				>
					<!-- Default subtle border -->
					<div
						class="absolute inset-0 bg-white/5 transition-opacity duration-500 group-hover/card:opacity-0"
					></div>

					<!-- Animated spinning border -->
					<div
						class="absolute inset-[-1000%] motion-safe:animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,#FF4400_360deg)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
					></div>

					<!-- Inner Card -->
					<div
						class="relative bg-[#121318] p-10 rounded-2xl flex flex-col h-full w-full"
					>
						<!-- Ambient Glow -->
						<div
							class="absolute -top-12 -right-12 w-48 h-48 bg-[#FF4400]/[0.15] rounded-full blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
						></div>

						<div
							class="flex items-center gap-4 mb-6 pb-6 border-b border-gray-800 relative z-10"
						>
							<svg
								class="w-10 h-10"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								><path
									fill="#f4f4f4"
									d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
								/></svg
							>
							<h4 class="text-2xl font-bold tracking-tight">
								Google Cloud / AI
							</h4>
						</div>

						<div class="flex flex-col relative z-10">
							{#each ["Foundations of UX Design", "Prompt Design in Vertex AI", "Generative AI Explorer", "Intro to Image Generation", "Responsible AI", "MLOps for Gen AI", "Google Prompting Essentials", "Google AI Essentials"] as item}
								<a
									href="https://www.linkedin.com/in/phantom-cluster/details/certifications/"
									target="_blank"
									rel="noopener noreferrer"
									class="group flex items-center justify-between py-4"
								>
									<span
										class="font-medium text-gray-400 group-hover:text-[#FF4400] transition-colors duration-300"
										>{item}</span
									>
									<ExternalLink
										class="w-4 h-4 text-[#FF4400] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
									/>
								</a>
							{/each}
						</div>
					</div>
				</div>

				<!-- Uxcel Bento Card -->
				<div
					class="group/card relative overflow-hidden rounded-[17px] p-[1px] flex flex-col transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
				>
					<!-- Default subtle border -->
					<div
						class="absolute inset-0 bg-white/5 transition-opacity duration-500 group-hover/card:opacity-0"
					></div>

					<!-- Animated spinning border -->
					<div
						class="absolute inset-[-1000%] motion-safe:animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,#FF4400_360deg)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
					></div>

					<!-- Inner Card -->
					<div
						class="relative bg-[#121318] p-10 rounded-2xl flex flex-col h-full w-full"
					>
						<!-- Ambient Glow -->
						<div
							class="absolute -top-12 -right-12 w-48 h-48 bg-[#FF4400]/[0.15] rounded-full blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
						></div>

						<div
							class="flex items-center gap-4 mb-6 pb-6 border-b border-gray-800 relative z-10"
						>
							<svg
								class="w-10 h-10"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12 2L2 7L12 12L22 7L12 2Z"
									fill="#f4f4f4"
								/>
								<path
									d="M2 17L12 22L22 17M2 12L12 17L22 12"
									stroke="#f4f4f4"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
							<h4 class="text-2xl font-bold tracking-tight">
								Uxcel Visual Engineering
							</h4>
						</div>

						<div class="flex flex-col relative z-10">
							{#each ["UX Design Psychology", "3D Design Foundations", "Wireframing", "Design Accessibility (WCAG)", "UI Components I", "UX Design Foundations"] as item}
								<a
									href="https://www.linkedin.com/in/phantom-cluster/details/certifications/"
									target="_blank"
									rel="noopener noreferrer"
									class="group flex items-center justify-between py-4"
								>
									<span
										class="font-medium text-gray-400 group-hover:text-[#FF4400] transition-colors duration-300"
										>{item}</span
									>
									<ExternalLink
										class="w-4 h-4 text-[#FF4400] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
									/>
								</a>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Core Strengths -->
		<div
			data-theme="light"
			bind:this={coreStrengthsEl}
			class="max-w-5xl mx-auto mt-32 mb-16 px-6 text-center"
		>
			<h2
				class="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-12"
			>
				Core Strengths
			</h2>
			<ul
				class="flex flex-wrap justify-center gap-3 md:gap-4"
				aria-label="List of core strengths"
			>
				{#each ["Design Systems (Atomic)", "Starter Templates", "WordPress (Gutenberg/Elementor)", "UX Strategy & Psychology", "Generative AI / LLMs", "Prompt Engineering", "User Flow Mapping", "Wireframes & 3D Design", "Accessibility (WCAG)", "UI Optimization", "Interaction Design", "Animation", "Motion UI", "Agile Collaboration", "SaaS Product Design", "Developer Handoff"] as strength}
					<li
						class="group relative inline-flex items-center justify-center p-[1px] rounded-full overflow-hidden transition-all duration-300"
					>
						<!-- Default subtle border -->
						<div
							class="absolute inset-0 bg-neutral-200 dark:bg-white/10 group-hover:bg-transparent transition-colors duration-300"
						></div>
						<!-- Animated border on hover (respects reduced motion) -->
						<div
							class="absolute inset-[-1000%] motion-safe:animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,#f97316_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
						></div>
						<!-- Inner background -->
						<div
							class="relative bg-white dark:bg-[#121318] px-5 md:px-6 py-2 md:py-2.5 rounded-full w-full h-full flex items-center justify-center transition-colors"
						>
							<span
								class="text-sm font-medium tracking-tight text-neutral-600 dark:text-neutral-300 group-hover:text-primary transition-colors duration-300"
								>{strength}</span
							>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<!-- Phase 6: Ecosystem Cross-Linking -->
	<section
		data-theme="light"
		id="project-routing"
		class="py-32 px-6 border-t border-neutral-900/5 text-center bg-transparent"
	>
		<div class="mb-4 relative inline-flex overflow-hidden rounded-full p-[1.5px] shadow-sm bg-neutral-200">
			<div class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,#FF4400_360deg)]"></div>
			<div class="inline-flex h-full w-full items-center justify-center rounded-full bg-white px-6 py-2 relative z-10">
				<span class="text-[11px] font-mono tracking-widest text-gray-400 uppercase">EXPLORE</span>
			</div>
		</div>
		<h2
			class="text-4xl md:text-5xl font-black mb-16 tracking-tight text-neutral-900"
		>
			See systems in action →
		</h2>

		<div
			class="flex flex-col md:flex-row items-center justify-center gap-6 max-w-4xl mx-auto"
		>
			<a
				href="/#wpmudev"
				class="group relative px-8 py-6 rounded-[2rem] bg-[#121318] border border-white/5 transition-transform hover:-translate-y-1 after:absolute after:inset-0 after:-z-10 after:shadow-[0_16px_48px_-12px_rgba(245,53,0,0.15)] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500 after:rounded-[2rem] flex items-center gap-4 w-full md:w-auto justify-center"
			>
				<span class="font-bold text-lg text-white">WPMU DEV</span>
				<ArrowRight
					class="w-5 h-5 text-neutral-500 group-hover:text-primary transition-colors group-hover:translate-x-1 duration-300"
				/>
			</a>
			<a
				href="/#ideajam"
				class="group relative px-8 py-6 rounded-[2rem] bg-[#121318] border border-white/5 transition-transform hover:-translate-y-1 after:absolute after:inset-0 after:-z-10 after:shadow-[0_16px_48px_-12px_rgba(245,53,0,0.15)] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500 after:rounded-[2rem] flex items-center gap-4 w-full md:w-auto justify-center"
			>
				<span class="font-bold text-lg text-white">Ideajam</span>
				<ArrowRight
					class="w-5 h-5 text-neutral-500 group-hover:text-primary transition-colors group-hover:translate-x-1 duration-300"
				/>
			</a>
			<a
				href="/#eclectic"
				class="group relative px-8 py-6 rounded-[2rem] bg-[#121318] border border-white/5 transition-transform hover:-translate-y-1 after:absolute after:inset-0 after:-z-10 after:shadow-[0_16px_48px_-12px_rgba(245,53,0,0.15)] after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500 after:rounded-[2rem] flex items-center gap-4 w-full md:w-auto justify-center"
			>
				<span class="font-bold text-lg text-white">Eclectic</span>
				<ArrowRight
					class="w-5 h-5 text-neutral-500 group-hover:text-primary transition-colors group-hover:translate-x-1 duration-300"
				/>
			</a>
		</div>
	</section>
</div>

<style>
	/* Styles specific to About page if needed */
</style>
