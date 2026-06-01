<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import FeaturedProject from '$lib/components/FeaturedProject.svelte';
	import StackedProjects from '$lib/components/StackedProjects.svelte';
	import PartnerMarquee from '$lib/components/PartnerMarquee.svelte';
	import { projects } from '$lib/data/projects';
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { ChevronDown, Send } from 'lucide-svelte';

	let activeFaq = $state(-1);
	let activeProcess = $state(0);

	const capabilities = [
		{ id: '001', title: 'Creative Strategy', desc: 'Translating business goals and technical features into clear product blueprints.' },
		{ id: '002', title: 'Art Direction', desc: 'Developing futuristic, memorable visual styles and cohesive brand guidelines.' },
		{ id: '003', title: 'Brand Identity', desc: 'Designing distinctive typography hierarchies, custom logomarks, and assets.' },
		{ id: '004', title: 'Web Design & UI Systems', desc: 'Crafting robust atomic component systems, Figma variables, and templates.' },
		{ id: '005', title: 'WordPress & Gutenberg', desc: 'Optimizing custom Gutenberg/Elementor flows and responsive starter templates.' },
		{ id: '006', title: 'Motion UI & Interactions', desc: 'Adding hardware-accelerated GSAP timelines and responsive scroll effects.' },
		{ id: '007', title: 'SaaS Onboarding UX', desc: 'Reducing user bounce rates and friction in critical setup paths.' }
	];

	const processSteps = [
		{ num: '01', title: 'Think', desc: 'Every project starts with understanding. I listen, analyze constraints, and study user behaviors to make context-driven decisions.' },
		{ num: '02', title: 'Define', desc: 'Ideas take clear shape. I outline structural blueprints, UX layouts, and functional details connecting design with product goals.' },
		{ num: '03', title: 'Design', desc: 'Pixel-perfect execution. I build unified atomic components, establish flexible typography systems, and customize visual variables.' },
		{ num: '04', title: 'Refine', desc: 'Details make excellence. I test across devices, conduct performance reviews, and continuously polish micro-interactions.' },
		{ num: '05', title: 'Deliver', desc: 'Confident execution. I deliver clean Figma libraries or optimized front-end systems ready for scalable deployment.' }
	];

	const engagementModels = [
		{
			title: 'Project Based',
			desc: 'Best for clearly defined projects with a fixed scope, set timelines, and definitive milestones.',
			benefits: ['Defined deliverables', 'Fixed timeline', 'Full design execution', 'Two refinement rounds', 'Complete handoff']
		},
		{
			title: 'Retainer Support',
			desc: 'Ideal for product teams needing ongoing, adaptive design leadership and constant feature upgrades.',
			benefits: ['Monthly hour allocation', 'Ongoing designer support', 'Flexible prioritizations', 'Interactive review cycles', 'Dev alignment channels']
		},
		{
			title: 'Custom Partnership',
			desc: 'Tailored consulting models for early-stage startups and complex enterprise system setups.',
			benefits: ['Multi-phase work systems', 'Customized team scope', 'Cross-disciplinary design', 'Fractional system leadership', 'Weekly alignments']
		}
	];

	const faqs = [
		{ q: 'Who do you typically work with?', a: 'I partner with tech founders, SaaS startups, and WordPress plugin businesses who value design as a primary business accelerator. Industry matters less than a shared drive for visual clarity and robust engineering.' },
		{ q: 'Do you design and code?', a: 'Yes! I bridge the gap between design systems in Figma and frontend performance. I specialize in building atomic design systems, Gutenberg/Elementor blocks, and clean SvelteKit/Tailwind templates.' },
		{ q: 'How do projects usually start?', a: 'I start with a quick alignment session to outline structural constraints and goals. From there, I build a custom interactive flow map and visual design system that aligns with your technical timelines.' },
		{ q: 'What engagement models do you offer?', a: 'I offer fixed-scope project arrangements, monthly design support contracts (retainers), and custom fractional Product Design consulting.' },
		{ q: 'Do you offer support after a project ends?', a: 'Absolutely. I provide documentation support for developer handoffs and offer retainer options for ongoing updates, testing, and audits.' }
	];

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Page reveals
		gsap.from('.reveal-section', {
			opacity: 0,
			y: 50,
			duration: 1,
			stagger: 0.15,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: '.reveal-trigger',
				start: 'top 80%'
			}
		});

		});
	});
</script>

<Hero />

<!-- GIANT WORD SECTION (Light section) -->
<div class="w-full bg-[#f4f4f6] text-center px-6 select-none relative overflow-hidden py-12 z-10">
	<h2 class="text-[9vw] font-extrabold tracking-[-0.04em] leading-[1.05] uppercase text-neutral-950 transition-all">
		HitanshuSahu<span class="text-primary font-mono text-[6vw]">.design</span>
	</h2>
</div>

<!-- (01) ABOUT SPLIT SECTION (Light Section) -->
<section id="studio" class="bg-[#f4f4f6] py-24 border-t border-neutral-200/50 reveal-trigger">
	<div class="container mx-auto px-6 max-w-[1440px]">
		<div class="grid grid-cols-1 lg:grid-cols-4 gap-12 pt-8 reveal-section">
			
			<!-- Left Column: Split Label -->
			<div class="lg:col-span-1">
				<span class="font-mono text-xs uppercase text-neutral-500 tracking-widest block mb-4">
					(01) A Designer, Not Just a Coder
				</span>
			</div>

			<!-- Right Column: Headline and Biography -->
			<div class="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-12">
				<div class="space-y-6">
					<h3 class="text-2xl md:text-4xl font-extrabold tracking-tight text-neutral-950 leading-tight">
						Creative specialist for ambitious web platforms — engineering atomic UI systems, custom Gutenberg workflows, and high-performance SaaS interfaces.
					</h3>
					<p class="text-neutral-600 leading-relaxed text-sm md:text-base font-medium">
						I'm not a generalist who copies layouts. I listen first, map out your technical constraints, and build custom digital experiences designed for clarity, visual strength, and long-term brand performance.
					</p>
					<p class="text-neutral-600 leading-relaxed text-sm font-medium">
						For the past 7 years, I've collaborated with leading WordPress plugin companies (like WPMU DEV) and high-growth SaaS founders to translate complex technology rules into simple, compliant design systems.
					</p>
				</div>

				<!-- Metrics Card widget stays black for massive visual contrast -->
				<div class="bg-neutral-950 border border-white/5 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between hover:border-primary/20 transition-all duration-300 shadow-2xl">
					<span class="text-primary font-mono text-xs uppercase tracking-widest block mb-12">Metrics & Impact</span>
					<div class="space-y-8">
						<div>
							<span class="text-5xl md:text-6xl font-bold text-white tracking-tighter block leading-none">98%</span>
							<span class="text-xs text-neutral-500 uppercase tracking-widest mt-2 block">Client Satisfaction</span>
						</div>
						<div>
							<span class="text-5xl md:text-6xl font-bold text-white tracking-tighter block leading-none">2M+</span>
							<span class="text-xs text-neutral-500 uppercase tracking-widest mt-2 block">Active Plugin Users</span>
						</div>
						<div>
							<span class="text-5xl md:text-6xl font-bold text-white tracking-tighter block leading-none">50+</span>
							<span class="text-xs text-neutral-500 uppercase tracking-widest mt-2 block">Starter Templates Completed</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- PARTNER LOGO MARQUEE (Light Section) -->
<PartnerMarquee />

<!-- Repurposed Visual Card WPMU DEV Highlight Case study with Watermark background -->
<FeaturedProject />

<!-- (02) FEATURED PROJECTS SECTION (Light Section) -->
<StackedProjects />

<!-- (04) CAPABILITIES LIST SECTION (Dark Section) -->
<section id="studio-capabilities" class="py-32 bg-neutral-950 text-white border-t border-white/5 relative z-10">
	<div class="container mx-auto px-6 max-w-[1440px]">
		<div class="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-20">
			<div class="lg:col-span-1">
				<span class="font-mono text-xs uppercase text-neutral-500 tracking-widest block mb-4">(04) Capabilities</span>
			</div>
			<div class="lg:col-span-3">
				<h2 class="text-4xl md:text-7xl font-bold tracking-tighter text-white leading-none">
					What I Do
				</h2>
				<p class="text-neutral-400 mt-6 max-w-[55ch] text-sm md:text-base leading-relaxed">
					Combining UX strategy, pixel-perfect visual engineering, and systematic responsive layouts to launch high-performance digital solutions.
				</p>
			</div>
		</div>

		<!-- Seven numbered capabilities rows -->
		<div class="border-t border-white/5 divide-y divide-white/5">
			{#each capabilities as cap}
				<div class="py-8 md:py-10 grid grid-cols-1 md:grid-cols-4 gap-6 items-center group">
					<div class="col-span-1 flex items-center gap-6">
						<span class="font-mono text-xs text-neutral-600 group-hover:text-primary transition-colors">{cap.id}</span>
						<h4 class="text-lg md:text-2xl font-semibold text-white tracking-tight">{cap.title}</h4>
					</div>
					<div class="md:col-span-3">
						<p class="text-neutral-400 text-sm md:text-base max-w-[70ch] leading-relaxed">
							{cap.desc}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- (03) MY PROCESS SECTION (Light Section) -->
<section class="py-32 bg-[#f4f4f6] border-t border-neutral-200/50">
	<div class="container mx-auto px-6 max-w-[1440px] grid grid-cols-1 lg:grid-cols-4 gap-12">
		<div class="lg:col-span-1">
			<span class="font-mono text-xs uppercase text-neutral-500 tracking-widest block mb-4">(03) My Process</span>
			<h3 class="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-none sticky top-32">
				A Thoughtful Process Behind My Work
			</h3>
		</div>

		<div class="lg:col-span-3 space-y-6">
			{#each processSteps as step, index}
				<button 
					onclick={() => (activeProcess = index)}
					class="w-full text-left p-8 md:p-10 border rounded-[2rem] flex flex-col justify-between transition-all duration-300 group
					       {activeProcess === index ? 'bg-white border-neutral-350 shadow-xl text-neutral-900' : 'bg-transparent border-neutral-200 hover:border-neutral-300 text-neutral-800'}"
				>
					<div class="flex justify-between items-center w-full">
						<div class="flex items-center gap-6">
							<span class="font-mono text-sm text-neutral-400 group-hover:text-primary transition-colors">{step.num}</span>
							<h4 class="text-xl md:text-2xl font-bold tracking-tight">{step.title}</h4>
						</div>
						<div class="size-8 rounded-full border border-neutral-200 flex items-center justify-center group-hover:border-primary/30 transition-colors">
							<span class="text-xs text-neutral-400 group-hover:text-primary transition-colors">↳</span>
						</div>
					</div>
					{#if activeProcess === index}
						<p class="mt-6 text-neutral-600 text-sm md:text-base leading-relaxed max-w-[65ch] font-medium">
							{step.desc}
						</p>
					{/if}
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- (05) ENGAGEMENT MODELS (Dark Section) -->
<section class="py-32 bg-neutral-950 text-white border-t border-white/5 z-10 relative">
	<div class="container mx-auto px-6 max-w-[1440px]">
		<div class="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-24">
			<div class="lg:col-span-1">
				<span class="font-mono text-xs uppercase text-neutral-500 tracking-widest block mb-4">(05) Engagement Models</span>
			</div>
			<div class="lg:col-span-3">
				<h2 class="text-4xl md:text-7xl font-bold tracking-tighter text-white leading-none">
					Ways to Collaborate
				</h2>
			</div>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
			{#each engagementModels as model}
				<div class="bg-neutral-900 border border-white/5 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between hover:border-primary/20 transition-all duration-300">
					<div>
						<span class="text-primary font-mono text-xs uppercase tracking-widest block mb-6">{model.title}</span>
						<p class="text-neutral-400 text-sm leading-relaxed mb-8">{model.desc}</p>
					</div>
					<div>
						<span class="font-mono text-xs text-neutral-600 block mb-4 uppercase tracking-widest">What's included</span>
						<ul class="space-y-3">
							{#each model.benefits as benefit}
								<li class="flex items-center gap-3 text-xs md:text-sm text-neutral-300">
									<span class="size-1.5 rounded-full bg-primary flex-shrink-0"></span>
									<span>{benefit}</span>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- (06) CLIENT STORIES SECTION (Light Section) -->
<section class="py-32 bg-[#f4f4f6] border-t border-neutral-200/50">
	<div class="container mx-auto px-6 max-w-[1440px] grid grid-cols-1 lg:grid-cols-4 gap-12">
		<div class="lg:col-span-1">
			<span class="font-mono text-xs uppercase text-neutral-500 tracking-widest block mb-4">(06) Client Stories</span>
		</div>
		<div class="lg:col-span-3">
			<!-- Testimonial card stays solid black for gorgeous contrast pop -->
			<div class="bg-neutral-950 border border-white/5 rounded-[2.5rem] p-10 md:p-16 flex flex-col justify-between relative overflow-hidden shadow-2xl">
				<div class="space-y-8">
					<span class="text-6xl text-primary font-serif select-none leading-none">“</span>
					<blockquote class="text-xl md:text-3xl font-medium tracking-tight text-white leading-normal">
						"Hitanshu spearheaded the design overhauled of our WPMU DEV plugins. His visual confidence combined with deep technical constraints was outstanding. He brought our legacy dashboards to life."
					</blockquote>
					<div class="border-t border-white/5 pt-8 flex items-center justify-between">
						<div>
							<cite class="not-italic font-bold text-white block text-lg">Alex Morgan</cite>
							<span class="text-xs text-neutral-500">Founder, Nietzsche & WordPress Partner</span>
						</div>
						<div class="hidden sm:block text-right">
							<span class="text-xs text-neutral-500 block">Scope</span>
							<span class="text-xs font-semibold text-white">Visual Design & Gutenberg UI</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- (07) INSIGHTS SECTION (Dark Section) -->
<section id="blog" class="py-32 bg-neutral-950 text-white border-t border-white/5 z-10 relative">
	<div class="container mx-auto px-6 max-w-[1440px]">
		<div class="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-20">
			<div class="lg:col-span-1">
				<span class="font-mono text-xs uppercase text-neutral-500 tracking-widest block mb-4">(07) Insights with Purpose</span>
			</div>
			<div class="lg:col-span-3">
				<h2 class="text-4xl md:text-7xl font-bold tracking-tighter text-white leading-none">
					Insights with Purpose
				</h2>
			</div>
		</div>

		<!-- Rows of Articles -->
		<div class="border-t border-white/5 divide-y divide-white/5">
			<div class="py-8 md:py-10 grid grid-cols-1 md:grid-cols-4 gap-6 items-center hover:bg-neutral-900/40 transition-colors px-4 rounded-xl">
				<div class="col-span-1">
					<span class="text-neutral-500 font-mono text-xs">↳ Mar 28, 2026</span>
				</div>
				<div class="md:col-span-2">
					<h4 class="text-lg md:text-2xl font-bold text-white tracking-tight mb-2">How Design Shapes More Than Just Reality</h4>
					<p class="text-sm text-neutral-400 leading-relaxed">Why brands that start with aesthetics often stall and how strategy shapes work that actually lasts.</p>
				</div>
				<div class="text-right">
					<span class="text-xs font-semibold text-primary uppercase tracking-widest">Read Article ↳</span>
				</div>
			</div>
			
			<div class="py-8 md:py-10 grid grid-cols-1 md:grid-cols-4 gap-6 items-center hover:bg-neutral-900/40 transition-colors px-4 rounded-xl">
				<div class="col-span-1">
					<span class="text-neutral-500 font-mono text-xs">↳ Feb 19, 2026</span>
				</div>
				<div class="md:col-span-2">
					<h4 class="text-lg md:text-2xl font-bold text-white tracking-tight mb-2">It's decision-making. Design is not decoration.</h4>
					<p class="text-sm text-neutral-400 leading-relaxed">How strong creative direction turns uncertainty into clarity and why the best design choices are often invisible.</p>
				</div>
				<div class="text-right">
					<span class="text-xs font-semibold text-primary uppercase tracking-widest">Read Article ↳</span>
				</div>
			</div>
			
			<div class="py-8 md:py-10 grid grid-cols-1 md:grid-cols-4 gap-6 items-center hover:bg-neutral-900/40 transition-colors px-4 rounded-xl">
				<div class="col-span-1">
					<span class="text-neutral-500 font-mono text-xs">↳ Jan 05, 2026</span>
				</div>
				<div class="md:col-span-2">
					<h4 class="text-lg md:text-2xl font-bold text-white tracking-tight mb-2">Art direction in the age of short attention.</h4>
					<p class="text-sm text-neutral-400 leading-relaxed">How to build visual systems that hold meaning even when people scroll fast and forget faster.</p>
				</div>
				<div class="text-right">
					<span class="text-xs font-semibold text-primary uppercase tracking-widest">Read Article ↳</span>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- FAQ ACCORDION SECTION (Light Section) -->
<section class="py-32 bg-[#f4f4f6] border-t border-neutral-200/50">
	<div class="container mx-auto px-6 max-w-[1440px] grid grid-cols-1 lg:grid-cols-4 gap-12">
		<div class="lg:col-span-1">
			<span class="font-mono text-xs uppercase text-neutral-500 tracking-widest block mb-4">Frequently Asked Questions</span>
			<h3 class="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-none">
				Ask Anything.
			</h3>
		</div>

		<div class="lg:col-span-3 space-y-4">
			{#each faqs as faq, index}
				<div class="bg-white border border-neutral-200 rounded-[1.5rem] overflow-hidden transition-all duration-300 shadow-sm">
					<button
						onclick={() => (activeFaq = activeFaq === index ? -1 : index)}
						class="w-full text-left p-6 md:p-8 flex justify-between items-center text-neutral-900 font-semibold"
					>
						<span class="text-base md:text-lg tracking-tight">{faq.q}</span>
						<ChevronDown class="size-4 text-neutral-450 transition-transform duration-300 {activeFaq === index ? 'rotate-180 text-primary' : ''}" />
					</button>
					{#if activeFaq === index}
						<div class="px-6 md:px-8 pb-6 md:pb-8 text-neutral-600 text-sm md:text-base leading-relaxed border-t border-neutral-100 pt-4 font-medium">
							{faq.a}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- (08) GET IN TOUCH (CONTACT FORM SECTION - Dark Section) -->
<section id="contact" class="py-32 bg-black text-white border-t border-white/5 z-10 relative">
	<div class="container mx-auto px-6 max-w-[1440px] grid grid-cols-1 lg:grid-cols-4 gap-12">
		<div class="lg:col-span-1 space-y-8">
			<div>
				<span class="font-mono text-xs uppercase text-neutral-500 tracking-widest block mb-4">(08) Get in touch</span>
				<h3 class="text-4xl md:text-6xl font-bold tracking-tight text-white leading-none">
					Let’s Start Something Meaningful
				</h3>
				<p class="text-neutral-400 mt-6 text-sm leading-relaxed max-w-[25ch]">
					Have a project in mind or just an idea taking shape? Tell me where you are. I'll take it from there.
				</p>
			</div>
			
			<!-- Direct contact shortcuts with monochrome SVG icons -->
			<div class="space-y-4 pt-6 border-t border-white/10 max-w-[25ch]">
				<a href="mailto:phantomcluster17@gmail.com" class="flex items-center gap-3 text-sm text-neutral-400 hover:text-primary transition-colors group">
					<svg aria-hidden="true" class="size-4 fill-neutral-500 group-hover:fill-primary transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
					</svg>
					<span class="font-medium tracking-tight">phantomcluster17@gmail.com</span>
				</a>
				<a href="https://www.linkedin.com/in/phantom-cluster/" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 text-sm text-neutral-400 hover:text-primary transition-colors group">
					<svg aria-hidden="true" class="size-4 fill-neutral-500 group-hover:fill-primary transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7H9.33V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z"/>
					</svg>
					<span class="font-medium tracking-tight">LinkedIn Profile</span>
				</a>
			</div>
		</div>

		<div class="lg:col-span-3">
			<form class="space-y-8" onsubmit={(e) => e.preventDefault()}>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div class="flex flex-col gap-2">
						<label for="firstName" class="text-xs font-mono text-neutral-500 uppercase tracking-widest">First Name</label>
						<input
							type="text"
							id="firstName"
							placeholder="Alex"
							class="bg-neutral-900 border border-white/5 rounded-xl px-5 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-primary/50 transition-colors"
						/>
					</div>
					<div class="flex flex-col gap-2">
						<label for="lastName" class="text-xs font-mono text-neutral-500 uppercase tracking-widest">Last Name</label>
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
						<label for="email" class="text-xs font-mono text-neutral-500 uppercase tracking-widest">Email Address</label>
						<input
							type="email"
							id="email"
							placeholder="alex@example.com"
							class="bg-neutral-900 border border-white/5 rounded-xl px-5 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-primary/50 transition-colors"
						/>
					</div>
					<div class="flex flex-col gap-2">
						<label for="phone" class="text-xs font-mono text-neutral-500 uppercase tracking-widest">Phone Number (Optional)</label>
						<input
							type="tel"
							id="phone"
							placeholder="e.g. +1 (555) 000-0000"
							class="bg-neutral-900 border border-white/5 rounded-xl px-5 py-4 text-white placeholder-neutral-600 focus:outline-none focus:border-primary/50 transition-colors"
						/>
					</div>
				</div>

				<div class="flex flex-col gap-2">
					<label for="details" class="text-xs font-mono text-neutral-500 uppercase tracking-widest">Project Details</label>
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
