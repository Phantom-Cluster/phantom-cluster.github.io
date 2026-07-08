<script lang="ts">
	import { projects } from '$lib/data/projects';
	import { ArrowRight } from 'lucide-svelte';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import Chip from '$lib/components/Chip.svelte';

	const featuredSlugs = ['ideajam-kanban-saas', 'eclectic-app-design', 'themeisle-starter-templates'];
	const stackedProjects = projects.filter(p => featuredSlugs.includes(p.slug));

	const cardMeta = [
		{
			hookStat: '−68%', hookLabel: 'Task Steps Reduced',
			fallbackHex: '#e0533c', fallbackRgb: '224,83,60',
			pills: ['White-label ready', '4→2 click flow', 'Zero onboarding'],
			year: '2024', role: 'UI/UX Designer',
			// Actual project screenshot — replaces generic Unsplash placeholder
			image: '/videos/ideajam/ideation  card and idea page.png',
		},
		{
			hookStat: '3×', hookLabel: 'Regional Markets',
			fallbackHex: '#14b8a6', fallbackRgb: '20,184,166',
			pills: ['AI asset pipeline', 'Mobile-first DLS', 'Rapid publish'],
			year: '2024', role: 'Product Designer',
			image: '/videos/Eclectic/New UI .png',
		},
		{
			hookStat: '50+', hookLabel: 'Sites Shipped',
			fallbackHex: '#3b82f6', fallbackRgb: '59,130,246',
			pills: ['300K+ user reach', 'Dual block system', '4-day delivery'],
			year: '2023', role: 'WordPress Specialist',
			image: null,
		},
	];

	let extractedColors = $state<Array<{ hex: string; rgb: string } | null>>([null, null, null]);

	function accent(i: number) {
		return extractedColors[i] ?? { hex: cardMeta[i].fallbackHex, rgb: cardMeta[i].fallbackRgb };
	}

	function rgbToHex(r: number, g: number, b: number) {
		return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
	}

	function hexToRgb(hex: string) {
		const r = parseInt(hex.slice(1, 3), 16);
		const g = parseInt(hex.slice(3, 5), 16);
		const b = parseInt(hex.slice(5, 7), 16);
		return `${r},${g},${b}`;
	}

	let sectionEl: HTMLElement;
	let gsapCtx: gsap.Context;

	onMount(async () => {
		gsap.registerPlugin(ScrollTrigger);

		// ColorThief runs outside the GSAP context — no animations involved
		try {
			const ColorThiefModule = await import('colorthief');
			const colorThief = new (ColorThiefModule as any).default();
			stackedProjects.forEach((project, i) => {
				const img = new Image();
				img.crossOrigin = 'anonymous';
				img.onload = () => {
					try {
						const [r, g, b] = colorThief.getColor(img);
						const hex = rgbToHex(r, g, b);
						extractedColors[i] = { hex, rgb: hexToRgb(hex) };
					} catch {}
				};
				img.src = project.thumbnail;
			});
		} catch {}

		// gsap.context tracks every ScrollTrigger and tween created here.
		// revert() on destroy clears inline styles AND only kills our triggers —
		// not global ones from the layout or other pages.
		gsapCtx = gsap.context(() => {
			// Scope toArray explicitly to sectionEl so we never pick up
			// .v2-stack-card elements that belong to a concurrent page transition.
			const cards = gsap.utils.toArray<HTMLElement>('.v2-stack-card', sectionEl);

			const isStacked = new Array(cards.length).fill(false);

			cards.forEach((card, i) => {
				const tiltEl  = card.querySelector<HTMLElement>('.v2-tilt-inner');
				const imgEl   = card.querySelector<HTMLElement>('.v2-project-img');
				const glowEl  = card.querySelector<HTMLElement>('.v2-glow');
				const overlay = card.querySelector<HTMLElement>('.v2-overlay');

				// immediateRender: false — prevents GSAP from setting opacity:0 as
				// an inline style on tween creation. Cards stay at natural visible CSS
				// until the trigger fires, so back-nav never leaves them invisible.
				gsap.from(card, {
					immediateRender: false,
					y: 60, opacity: 0, scale: 0.97,
					duration: 1.1, ease: 'expo.out',
					scrollTrigger: { trigger: card, start: 'top 88%', once: true, invalidateOnRefresh: true },
				});

				// Mouse-tracking 3D tilt — subtle values to avoid dizzying perspective
				card.addEventListener('mousemove', (e: MouseEvent) => {
					if (isStacked[i]) return;
					const rect = card.getBoundingClientRect();
					const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
					const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
					if (tiltEl) gsap.to(tiltEl, { rotateY: dx * 1.2, rotateX: -dy * 0.8, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
					if (imgEl)  gsap.to(imgEl,  { x: -dx * 8, y: -dy * 5,                duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
				});

				card.addEventListener('mouseenter', () => {
					if (isStacked[i]) return;
					if (glowEl) gsap.to(glowEl, { opacity: 1, duration: 0.5, ease: 'power2.out', overwrite: true });
				});

				card.addEventListener('mouseleave', () => {
					if (tiltEl) gsap.to(tiltEl, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
					if (imgEl)  gsap.to(imgEl,  { x: 0, y: 0,              duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
					if (glowEl) gsap.to(glowEl, { opacity: 0,              duration: 0.4, ease: 'power2.in',  overwrite: true  });
				});

				if (i === cards.length - 1) return;
				const nextCard = cards[i + 1];

				ScrollTrigger.create({
					trigger: nextCard,
					start: 'top 88%',
					invalidateOnRefresh: true,
					onEnter: () => {
						isStacked[i] = true;
						if (tiltEl) gsap.to(tiltEl, { rotateY: 0, rotateX: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
						if (imgEl)  gsap.to(imgEl,  { x: 0, y: 0,              duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
						if (glowEl) gsap.to(glowEl, { opacity: 0,              duration: 0.3, ease: 'power2.in',  overwrite: true  });
					},
					onLeaveBack: () => { isStacked[i] = false; },
				});

				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: nextCard,
						start: 'top 75%',
						end: () => `top ${100 + (i + 1) * 24}px`,
						scrub: 0.6,
						invalidateOnRefresh: true,
					},
				});
				tl.to(card, {
					scale: 0.96 - (cards.length - 1 - i) * 0.01,
					rotateX: 8,
					yPercent: -4,
					transformOrigin: 'top center',
					ease: 'none',
				}, 0);
				if (overlay) tl.to(overlay, { opacity: 0.55, ease: 'none' }, 0);
			});

			ScrollTrigger.refresh();
		}, sectionEl);
	});

	onDestroy(() => {
		if (!browser) return;
		// revert() kills only our ScrollTriggers and clears all GSAP inline styles,
		// so cards are never left at opacity:0 when the user navigates back.
		gsapCtx?.revert();
	});

</script>

<!-- ── SECTION ────────────────────────────────────────────────────────────── -->
<section
	bind:this={sectionEl}
	id="projects"
	data-theme="light"
	class="py-0 bg-[#f4f4f4] relative flex flex-col items-center"
>
	<!-- Section wordmark (decorative) -->
	<div class="relative z-0 w-full text-center select-none pt-24 pb-12 px-6 flex flex-col items-center pointer-events-none">
		<div class="pointer-events-auto">
			<Chip theme="light" spin="always" class="mb-6" innerClass="px-6 py-2">
				<span class="text-[11px] font-mono tracking-widest text-neutral-500 uppercase">Proof of Execution</span>
			</Chip>
		</div>
		<h3 class="text-[10vw] sm:text-[12vw] font-black tracking-[-0.05em] uppercase leading-none text-neutral-200/50">
			Recent Works
		</h3>
	</div>

	<!-- Card stack ─────────────────────────────────────────────────────────── -->
	<div class="relative z-10 w-full max-w-[1320px] mx-auto px-6 pb-[5vh]" style="perspective: 1800px;">

		{#each stackedProjects as project, i}
			{@const a = accent(i)}
			{@const m = cardMeta[i]}

			<!--
				Outer .v2-stack-card: receives stacking GSAP (scale, rotateX, yPercent).
				Does NOT have overflow:hidden so sticky behaviour is unaffected.
			-->
			<div
				class="v2-stack-card group relative mb-[8vh] lg:mb-[35vh] cursor-pointer"
				style="
					--card-idx: {i};
					z-index: {i + 10};
					will-change: transform;
					transform-style: preserve-3d;
				"
				role="link"
				tabindex="0"
				aria-label="View {project.title} case study"
				onclick={(e) => { if (!(e.target as HTMLElement).closest('a')) goto(`/work/${project.slug}`); }}
				onkeydown={(e) => { if (e.key === 'Enter') goto(`/work/${project.slug}`); }}
			>
				<!-- Stacking dimmer overlay — GPU: opacity only -->
				<div
					class="v2-overlay absolute inset-0 rounded-[2.5rem] pointer-events-none z-30 opacity-0"
					style="background: #0d0d0f; will-change: opacity;"
				></div>

				<!--
					Inner .v2-tilt-inner: receives mouse-tracking rotateX/Y (GPU transform).
					Separate from outer so stacking rotateX and tilt rotateX don't conflict.
					overflow:hidden here clips the project image correctly.
				-->
				<div
					class="v2-tilt-inner relative w-full rounded-4xl sm:rounded-bento overflow-hidden"
					style="
						will-change: transform;
						background: #0e0e10;
						box-shadow:
							0 4px 6px rgba(0,0,0,0.25),
							0 24px 64px rgba(0,0,0,0.35),
							0 64px 128px rgba(0,0,0,0.2);
					"
				>
					<!-- Accent glow (GPU: opacity) -->
					<div
						class="v2-glow absolute inset-0 pointer-events-none z-0 opacity-0"
						style="background: radial-gradient(ellipse at 55% 35%, rgba({a.rgb},0.16) 0%, transparent 60%); will-change: opacity;"
					></div>

					<!-- Two-column layout -->
					<div
						class="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_420px]"
					>

						<!-- LEFT: Editorial panel ──────────────────────────────── -->
						<div class="flex flex-col justify-between p-7 sm:p-10 md:p-10 lg:p-14 md:border-r border-white/6">

							<!-- Top: meta + title + description -->
							<div>
								<!-- Role · Year with accent dot -->
								<div class="flex items-center gap-3 mb-5 sm:mb-8">
									<span
										class="w-1.5 h-1.5 rounded-full shrink-0"
										style="background: {a.hex};"
									></span>
									<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase">
										{m.role} · {m.year}
									</span>
								</div>

								<h3 class="text-[2.2rem] lg:text-[2.7rem] font-black tracking-[-0.04em] text-white leading-[1.02] mb-5">
									{project.title}
								</h3>

								<p class="text-sm text-neutral-400 leading-relaxed max-w-[40ch]">
									{project.description}
								</p>
							</div>

							<!-- Bottom: pills + CTA -->
							<div class="mt-6 sm:mt-10">
								<div class="flex flex-wrap gap-2 mb-6 sm:mb-8">
									{#each m.pills as pill}
										<span
											class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono border"
											style="
												color: rgba({a.rgb},0.85);
												border-color: rgba({a.rgb},0.2);
												background: rgba({a.rgb},0.08);
											"
										>
											<span class="w-1 h-1 rounded-full shrink-0" style="background: rgba({a.rgb},0.55);"></span>
											{pill}
										</span>
									{/each}
								</div>

								<div class="v2-cta-wrap">
									<a
										href="/work/{project.slug}"
										class="v2-cta group/cta inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold text-white border border-white/30 w-fit"
										style="--accent: {a.hex};"
									>
										Explore Case
										<ArrowRight class="size-4 transition-transform duration-300 group-hover/cta:translate-x-1.5" />
									</a>
									<span class="v2-cta-ring" aria-hidden="true"></span>
								</div>
							</div>
						</div>

						<!-- RIGHT: Image panel ──────────────────────────────────── -->
						<div class="relative overflow-hidden min-h-[220px] sm:min-h-[280px] lg:min-h-[360px]" style="background: #141416;">

							<!-- Project screenshot — GPU: transform (parallax + scale on hover) -->
							<img
								src={m.image ?? project.thumbnail}
								alt={project.title}
								class="v2-project-img absolute inset-0 w-full h-full object-cover object-top"
								style="transform: scale(1.1); will-change: transform;"
								loading="lazy"
							/>

							<!-- Bottom gradient — darker accent wash for stat legibility -->
							<div
								class="absolute inset-0 pointer-events-none z-10"
								style="background: linear-gradient(to top, rgba({a.rgb},1.0) 0%, rgba({a.rgb},0.88) 30%, rgba({a.rgb},0.45) 55%, rgba({a.rgb},0.12) 72%, transparent 85%);"
							></div>

							<!-- Additional dark base at the very bottom so stat text is always crisp -->
							<div
								class="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
								style="background: linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%);"
							></div>

							<!-- Subtle dot grid texture (no network request) -->
							<div
								class="absolute inset-0 pointer-events-none z-20 opacity-20"
								style="background-image: radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px); background-size: 20px 20px;"
							></div>

							<!-- Stat overlay at bottom — GPU: filter drop-shadow for glow -->
							<div class="absolute bottom-0 left-0 right-0 p-8 z-30">
								<p
									class="text-[clamp(3.5rem,9vw,5.5rem)] font-black tracking-tighter leading-none text-white"
									style="filter: drop-shadow(0 4px 28px rgba({a.rgb},0.6)) drop-shadow(0 0 48px rgba({a.rgb},0.35));"
								>{m.hookStat}</p>
								<p
									class="text-[9px] font-mono tracking-[0.28em] uppercase mt-2"
									style="color: rgba(255,255,255,0.65);"
								>{m.hookLabel}</p>
							</div>
						</div>

					</div>
				</div>
			</div>
		{/each}

		<div class="h-1 w-full pointer-events-none mt-[6vh]"></div>
	</div>
</section>


<style>
	/* Sticky stacking — GPU composited */
	.v2-stack-card {
		position: sticky;
		top: calc(100px + var(--card-idx, 0) * 24px);
		transform-style: preserve-3d;
	}

	/* CTA wrapper — positions the pulsing ring relative to the button */
	.v2-cta-wrap {
		position: relative;
		width: fit-content;
	}

	/* Pulsing attention ring — GPU: transform + opacity only */
	.v2-cta-ring {
		position: absolute;
		inset: -5px;
		border-radius: 9999px;
		border: 1px solid rgba(255, 255, 255, 0.3);
		pointer-events: none;
		will-change: transform, opacity;
		animation: ring-expand 2.4s ease-out infinite;
	}

	@keyframes ring-expand {
		0%   { transform: scale(1);    opacity: 0.55; }
		100% { transform: scale(1.22); opacity: 0;    }
	}

	/* CTA hover — GPU: opacity on ::before fill, no background/color paint */
	.v2-cta {
		position: relative;
		overflow: hidden;
		isolation: isolate;
		transition: transform 0.12s ease, border-color 0.2s ease;
	}
	.v2-cta::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: var(--accent);
		opacity: 0;
		transition: opacity 0.22s ease; /* GPU: opacity only */
		pointer-events: none;
		z-index: 0;
	}
	.v2-cta:hover {
		border-color: rgba(255, 255, 255, 0.55);
	}
	.v2-cta:hover::before {
		opacity: 1;
	}
	.v2-cta:active {
		transform: scale(0.96);
	}
	/* Pause ring on hover — user is already engaged */
	.v2-cta-wrap:hover .v2-cta-ring {
		animation-play-state: paused;
		opacity: 0;
	}
	/* Keep all content above the ::before fill */
	.v2-cta > :global(*) {
		position: relative;
		z-index: 1;
	}

	/* Prevent black back-face artifact when stacked card tilts in 3D */
	.v2-tilt-inner {
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
	}

</style>
