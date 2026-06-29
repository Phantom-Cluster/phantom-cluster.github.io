<!--
  CaseStudyBento.svelte
  ─────────────────────
  Reusable 6-card asymmetric bento grid for case study pages.

  Props shape (all required unless marked optional):
  ┌─────────────────────────────────────────────────────────────────┐
  │ narrative   — heading, role, product list                       │
  │ anchor      — video src, logo svg (raw), brand name, subtitle   │
  │ adoption    — label, stat string, description                   │
  │ metric1     — stat value, label, context line                   │
  │ metric2     — big number, unit, label, description              │
  │ conversion  — label, description, chip value                    │
  └─────────────────────────────────────────────────────────────────┘

  Usage example (WPMU Dev):
  <CaseStudyBento
    narrative={{
      heading: 'A <span class="text-shimmer-white">full redesign</span> ...',
      role: 'Product Designer',
      product: 'Smush, Hummingbird, Snapshot & SUI 3 Atomic Design',
    }}
    anchor={{
      videoSrc: '/videos/Smush%20with%20Userflow.mp4',
      logoSvg: wpmuLogoRaw,
      brandName: 'WPMU DEV',
      brandSub: 'Dashboard • System',
    }}
    adoption={{
      label: 'Adoption',
      from: '1M',
      to: '2M',
      description: 'Smush installs since the redesigned onboarding shipped.',
    }}
    metric1={{
      stat: '-37%',
      label: 'Bounce Rate',
      context: 'Post-Launch',
    }}
    metric2={{
      number: '80',
      unit: '%',
      label: 'Performance',
      description: 'Page rendering boost via Hummingbird.',
    }}
    conversion={{
      label: 'Pro Conversions',
      description: 'Significant uplift in premium upgrades from the free tier.',
      chip: '+47%',
    }}
  />
-->

<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	// ── Prop Types ────────────────────────────────────────────────────────────
	interface Narrative {
		/** Raw HTML allowed — use <span> for accent colour */
		heading: string;
		role: string;
		product: string;
	}
	interface Anchor {
		videoSrc: string;
		/** SVG markup string — import with ?raw and pass here */
		logoSvg: string;
		brandName: string;
		brandSub: string;
	}
	interface Adoption {
		label: string;
		from: string;
		to: string;
		description: string;
	}
	interface Metric1 {
		stat: string;
		label: string;
		context: string;
	}
	interface Metric2 {
		number: string;
		unit: string;
		label: string;
		description: string;
	}
	interface Conversion {
		label: string;
		description: string;
		chip: string;
	}

	// ── Props ─────────────────────────────────────────────────────────────────
	let {
		narrative,
		anchor,
		adoption,
		metric1,
		metric2,
		conversion,
	}: {
		narrative: Narrative;
		anchor: Anchor;
		adoption: Adoption;
		metric1: Metric1;
		metric2: Metric2;
		conversion: Conversion;
	} = $props();

	// ── DOM refs for GSAP ────────────────────────────────────────────────────
	let bentoGridEl!: HTMLElement;
	let arrowEl: HTMLElement;
	let perf80El: HTMLElement;
	let bounce37El: HTMLElement;
	let conv47El: HTMLElement;

	onMount(() => {
		// GSAP stagger entrance — clearProps:'all' removes every inline style after
		// animation so no residual compositing layers block CSS :hover hit-testing
		if (bentoGridEl) {
			const cards = Array.from(bentoGridEl.querySelectorAll(':scope > div'));
			gsap.set(cards, { opacity: 0, y: 26, scale: 0.97, force3D: true });
			gsap.to(cards, {
				opacity: 1, y: 0, scale: 1,
				duration: 0.68,
				ease: 'power2.out',
				stagger: 0.08,
				delay: 0.1,
				clearProps: 'all',
				force3D: true,
			});
		}

		// ── GPU-optimised infinite animations (force3D → compositor thread) ──

		// Arrow: smooth breath — soft rightward drift, no elastic physics
		if (arrowEl) {
			gsap.timeline({ repeat: -1, yoyo: true })
				.to(arrowEl, {
					x: 9, opacity: 0.85,
					duration: 2.2, ease: 'sine.inOut', force3D: true,
				})
				.to(arrowEl, {
					x: 0, opacity: 0.38,
					duration: 2.2, ease: 'sine.inOut', force3D: true,
				});
		}

		// Metric2 number: float + % sign glow pulse (electric mint #00E676)
		if (perf80El) {
			gsap.to(perf80El, {
				y: -6, duration: 2.4, ease: 'sine.inOut',
				yoyo: true, repeat: -1, force3D: true,
			});
			const pctSign = perf80El.querySelector('.pct-sign') as HTMLElement;
			if (pctSign) {
				gsap.to(pctSign, {
					textShadow: '0 0 22px rgba(0,230,118,1), 0 0 50px rgba(0,230,118,0.45)',
					scale: 1.1, duration: 1.0, ease: 'sine.inOut',
					yoyo: true, repeat: -1, force3D: true,
				});
			}
		}

		// Metric1 stat: counter-tick jolt + elastic settle (electric mint #00E676)
		if (bounce37El) {
			gsap.timeline({ repeat: -1, repeatDelay: 2.5 })
				.to(bounce37El, {
					y: -3, skewX: -3,
					textShadow: '0 0 24px rgba(0,230,118,1), 0 0 55px rgba(0,230,118,0.5)',
					duration: 0.18, ease: 'power3.out', force3D: true,
				})
				.to(bounce37El, {
					y: 0, skewX: 0,
					textShadow: '0 0 8px rgba(0,230,118,0.4)',
					duration: 0.5, ease: 'elastic.out(1.2, 0.4)', force3D: true,
				});
		}

		// Conversion chip: scale bounce + glow (electric mint #00E676)
		if (conv47El) {
			gsap.timeline({ repeat: -1, repeatDelay: 1.8 })
				.to(conv47El, {
					scale: 1.12,
					textShadow: '0 0 20px rgba(0,230,118,0.95), 0 0 45px rgba(0,230,118,0.4)',
					duration: 0.3, ease: 'back.out(2)', force3D: true,
				})
				.to(conv47El, {
					scale: 1,
					textShadow: '0 0 0px rgba(0,230,118,0)',
					duration: 0.6, ease: 'power3.inOut', force3D: true,
				});
		}
	});

</script>

<!-- ─────────────────────────────────────────────────────────────────────────
     Spinning conic-gradient border — same DNA as /about Core Strengths chips
     ───────────────────────────────────────────────────────────────────────── -->
<style>
	@keyframes spin-border {
		from { transform: rotate(0deg); }
		to   { transform: rotate(360deg); }
	}
	/* Outer wrapper: 1px padding reveals the conic gradient as a border arc */
	.csb-wrap {
		position: relative;
		padding: 1px;
		border-radius: 1.875rem;
		overflow: hidden;
		background: rgba(255, 255, 255, 0.055);
		transition: background 0.9s ease, box-shadow 0.9s ease;
	}
	/* Hover: whisper-thin white ambient bloom */
	.csb-wrap:hover {
		background: rgba(255, 255, 255, 0.03);
		box-shadow:
			0 0 18px 1px rgba(255, 255, 255, 0.055),
			0 0 55px 6px rgba(255, 255, 255, 0.028);
	}
	/* Spinning arc — creeps in on hover, never snaps */
	.csb-wrap .csb-spin {
		position: absolute;
		inset: -1000%;
		background: conic-gradient(
			transparent 260deg,
			rgba(255, 255, 255, 0.7) 360deg
		);
		opacity: 0;
		animation: spin-border 4s linear infinite;
		transition: opacity 0.8s ease;
		will-change: transform;
		pointer-events: none;
	}
	.csb-wrap:hover .csb-spin { opacity: 0.85; }
	/* Inner card clips the gradient to the 1px gap */
	.csb-inner {
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: 1.75rem;
		overflow: hidden;
	}

	/* Adoption card — metallic shimmer sweep (Apple polished-aluminum quality) */
	@keyframes shimmer-sweep {
		0%   { background-position: 200% center; }
		100% { background-position: -200% center; }
	}
	.stat-hero {
		background: linear-gradient(
			105deg,
			rgba(155,155,155,1)  0%,
			rgba(255,255,255,1) 28%,
			rgba(195,195,195,1) 50%,
			rgba(255,255,255,1) 72%,
			rgba(155,155,155,1) 100%
		);
		background-size: 220% auto;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: shimmer-sweep 5s linear infinite;
	}
	/* Ghost "before" state — barely there, thin crossed-out */
	.stat-from {
		color: rgba(255,255,255,0.20);
		text-decoration: line-through;
		text-decoration-color: rgba(255,255,255,0.12);
		text-decoration-thickness: 2px;
	}
</style>

<section class="w-full px-4 md:px-6 pt-24 pb-28 bg-transparent">
	<div class="max-w-7xl mx-auto">
		<div bind:this={bentoGridEl}
		     class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5
		            auto-rows-[minmax(220px,auto)] lg:auto-rows-[280px] grid-flow-row-dense">

			<!-- ── 1. Narrative (Wide 2×1) ──────────────────────────────────── -->
			<div class="col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-1 lg:col-start-1 lg:row-start-1 csb-wrap">
				<div class="csb-spin"></div>
				<div class="csb-inner bg-[#0d0d0d] p-7 md:p-9 lg:p-10 flex flex-col justify-between group
				            shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]">
					<div class="absolute inset-0 bg-gradient-to-br from-white/1.5 via-transparent to-transparent pointer-events-none"></div>
					<div class="relative z-20 flex flex-col h-full">
						<h3 class="text-[clamp(1.2rem,3.2vw,1.65rem)] font-extrabold text-white leading-[1.22] tracking-tight mb-0 max-w-lg flex-1 flex items-center">
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							<span>{@html narrative.heading}</span>
						</h3>
						<div class="flex flex-row flex-wrap gap-x-8 gap-y-3 border-t border-white/[0.07] pt-4 mt-4 shrink-0">
							<div class="shrink-0">
								<span class="text-[9px] font-mono tracking-[0.18em] text-gray-500 uppercase block mb-0.5">Role</span>
								<span class="text-[13px] font-semibold text-gray-200 leading-snug">{narrative.role}</span>
							</div>
							<div class="min-w-0">
								<span class="text-[9px] font-mono tracking-[0.18em] text-gray-500 uppercase block mb-0.5">Product</span>
								<span class="text-[13px] font-medium text-gray-300 leading-snug break-words">{narrative.product}</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- ── 2. Video Anchor (2×2 top-right) ──────────────────────────── -->
			<div class="col-span-1 md:col-span-2 lg:col-span-2 md:row-span-2 lg:row-span-2 lg:col-start-3 lg:row-start-1 csb-wrap">
				<div class="csb-spin"></div>
				<div class="csb-inner bg-[#050505] cursor-crosshair group">
					<video src={anchor.videoSrc} autoplay loop muted playsinline
					       class="absolute inset-0 w-full h-full object-cover object-left-top z-0
					              transform-gpu will-change-transform transition-all duration-1000
					              scale-100 opacity-40 group-hover:scale-[1.03] group-hover:opacity-100">
					</video>
					<!-- Dark veil: dissolves on hover -->
					<div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-[#050505]/40 z-10 transition-opacity duration-700 group-hover:opacity-0"></div>
					<!-- Logo + hint: sinks away on hover -->
					<div class="absolute inset-0 flex flex-col items-center justify-center z-20 transition-all duration-700 ease-out group-hover:opacity-0 group-hover:translate-y-8 pointer-events-none">
						<div class="w-20 h-20 rounded-full border border-white/[0.1] flex items-center justify-center mb-6 bg-[#0a0a0a] shadow-2xl p-4">
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							{@html anchor.logoSvg}
						</div>
						<span class="text-white font-bold text-2xl tracking-tight mb-1">{anchor.brandName}</span>
						<span class="text-[10px] font-mono tracking-[0.2em] text-gray-400 uppercase mb-8">{anchor.brandSub}</span>
						<div class="flex items-center gap-3 text-white/80 text-[10px] font-mono uppercase tracking-widest bg-white/[0.08] px-5 py-2.5 rounded-full backdrop-blur-md border border-white/[0.1]">
							<span class="w-2 h-2 rounded-full bg-portfolio-accent-vivid animate-pulse shrink-0"></span>
							Hover to view UI
						</div>
					</div>
					<!-- Edge vignette -->
					<div class="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.9)] z-30 pointer-events-none transition-opacity duration-700 group-hover:opacity-20"></div>
				</div>
			</div>

			<!-- ── 3. Adoption (Wide 2×1) ────────────────────────────────────── -->
			<div class="col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-1 lg:col-start-1 lg:row-start-2 csb-wrap">
				<div class="csb-spin"></div>
				<div class="csb-inner bg-[#0d0d0d] p-8 md:p-10 flex flex-col justify-center group
				            shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]">
					<!-- Ambient bloom behind the hero number -->
					<div class="absolute right-[18%] top-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-white/[0.028] blur-3xl pointer-events-none"></div>
					<div class="relative z-20 flex flex-col">
						<span class="text-[9px] font-mono tracking-[0.18em] text-gray-500 uppercase mb-4 block">{adoption.label}</span>
						<div class="flex items-baseline leading-none mb-4" style="gap: 0;">
							<!-- Before: ghost state, barely visible -->
							<span class="stat-from text-[clamp(2.2rem,5.5vw,3.4rem)] font-black tracking-tighter">{adoption.from}</span>
							<!-- Arrow: smooth breathing drift -->
							<span bind:this={arrowEl}
							      class="font-black text-[clamp(2rem,5vw,3rem)] mx-3 md:mx-5 inline-block will-change-transform"
							      style="display:inline-block; color: rgba(255,255,255,0.45);">→</span>
							<!-- Hero number: metallic shimmer -->
							<span class="stat-hero text-[clamp(3rem,8vw,5rem)] font-black tracking-tighter">{adoption.to}+</span>
						</div>
						<p class="text-sm text-gray-400 leading-relaxed max-w-sm">{adoption.description}</p>
					</div>
				</div>
			</div>

			<!-- ── 4. Metric 1 (Square 1×1) ─────────────────────────────────── -->
			<div class="col-span-1 md:col-span-1 lg:col-span-1 lg:row-span-1 lg:col-start-1 lg:row-start-3 csb-wrap">
				<div class="csb-spin"></div>
				<div class="csb-inner bg-[#0d0d0d] p-8 md:p-10 flex flex-col justify-center group
				            shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]">
					<div class="absolute inset-0 pointer-events-none"></div>
					<div class="relative z-20">
						<span bind:this={bounce37El}
						      class="text-[clamp(2rem,5vw,2.75rem)] font-black text-portfolio-success tracking-tighter block mb-1 will-change-transform"
						      style="display:block;">{metric1.stat}</span>
						<h4 class="text-base font-semibold text-white leading-tight tracking-tight mb-2">{metric1.label}</h4>
						<span class="text-[9px] font-mono tracking-[0.18em] text-gray-500 uppercase">{metric1.context}</span>
					</div>
				</div>
			</div>

			<!-- ── 5. Metric 2 (Square 1×1) ─────────────────────────────────── -->
			<div class="col-span-1 md:col-span-1 lg:col-span-1 lg:row-span-1 lg:col-start-2 lg:row-start-3 csb-wrap">
				<div class="csb-spin"></div>
				<div class="csb-inner bg-[#0d0d0d] p-8 md:p-10 flex flex-col justify-center group
				            shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]">
					<div class="absolute inset-0 pointer-events-none"></div>
					<div class="relative z-20" bind:this={perf80El}>
						<div class="flex items-baseline gap-0 leading-none mb-2">
							<span class="text-[clamp(2.5rem,6vw,3.5rem)] font-black text-white tracking-tighter">{metric2.number}</span>
							<span class="pct-sign text-portfolio-success font-black text-[clamp(1.8rem,4vw,2.5rem)] will-change-transform"
							      style="display:inline-block;">{metric2.unit}</span>
						</div>
						<span class="text-[9px] font-mono tracking-[0.18em] text-gray-500 uppercase block mb-1.5">{metric2.label}</span>
						<p class="text-[11px] text-gray-400 leading-relaxed">{metric2.description}</p>
					</div>
				</div>
			</div>

			<!-- ── 6. Conversion (Wide 2×1) ──────────────────────────────────── -->
			<div class="col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-1 lg:col-start-3 lg:row-start-3 csb-wrap">
				<div class="csb-spin"></div>
				<div class="csb-inner bg-[#0d0d0d] p-8 md:p-10
				            flex flex-col md:flex-row items-start md:items-center justify-between gap-6
				            cursor-pointer group
				            shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]">
					<div class="flex flex-col relative z-20 pointer-events-none">
						<span class="text-[9px] font-mono tracking-[0.18em] text-gray-500 uppercase block mb-3">{conversion.label}</span>
						<p class="text-base text-gray-400 max-w-xs leading-relaxed">{conversion.description}</p>
					</div>
					<!-- Sweep chip -->
					<div class="relative overflow-hidden rounded-full bg-portfolio-success/10 border border-portfolio-success/20
					            px-8 py-5 shrink-0 mt-4 md:mt-0
					            shadow-[0_0_20px_rgba(61,204,17,0.08)]">
						<span bind:this={conv47El}
						      class="text-portfolio-success font-black text-[clamp(1.5rem,3vw,1.875rem)] tracking-tight relative z-20 inline-block will-change-transform"
						>{conversion.chip}</span>
						<!-- Glass sweep blade -->
						<div class="absolute top-0 -inset-full h-full w-[150%] z-10 block transform -skew-x-12
						            bg-gradient-to-r from-transparent via-white/20 to-transparent
						            left-[-150%] transition-all duration-700 ease-out
						            group-hover:left-[150%] pointer-events-none">
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</section>
