<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { gsap } from "gsap";
	import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
	import { ExternalLink } from "lucide-svelte";
	import ExploreProjectComponent from '$lib/components/ExploreProjectComponent.svelte';
	import Chip from '$lib/components/Chip.svelte';
	import profilePic from "$lib/assets/portrait.webp";
	import starImg from "$lib/assets/Cylindrical Half Star.png";
	import gemImg from "$lib/assets/Gem Shape.png";

	let cardEl: HTMLElement;
	let cardContainerEl: HTMLElement;
	let cardSlotEl: HTMLElement;
	let h1El: HTMLElement;
	let manifestoEl: HTMLElement;
	let pageWrapperEl: HTMLElement;

	// Bento icon refs — individual SVG elements for stroke-draw construction animations
	let atomRing1!: SVGCircleElement;
	let atomRing2!: SVGCircleElement;
	let atomRing3!: SVGCircleElement;
	let atomCore!:  SVGCircleElement;
	let bar1!: SVGRectElement;
	let bar2!: SVGRectElement;
	let bar3!: SVGRectElement;
	let wpBox!:      SVGRectElement;
	let wpPath!:     SVGPathElement;
	let playOutline!: SVGPathElement;
	let playFill!:    SVGPathElement;
	let aiRayT!: SVGLineElement;
	let aiRayR!: SVGLineElement;
	let aiRayB!: SVGLineElement;
	let aiRayL!: SVGLineElement;
	let a11yHead!: SVGCircleElement;
	let a11yBody!: SVGPathElement;
	let a11yArmL!: SVGPathElement;
	let a11yArmR!: SVGPathElement;
	let a11yLegL!: SVGPathElement;
	let a11yLegR!: SVGPathElement;

	// Bento timelines
	let tlAtomic: gsap.core.Timeline;
	let tlSaas:   gsap.core.Timeline;
	let tlWp:     gsap.core.Timeline;
	let tlMotion: gsap.core.Timeline;
	let tlAi:     gsap.core.Timeline;
	let tlA11y:   gsap.core.Timeline;

	function bentoHover(tl: gsap.core.Timeline | undefined) {
		tl?.repeat(-1).restart();
	}
	function bentoLeave(tl: gsap.core.Timeline | undefined) {
		tl?.repeat(0); // finish the current loop iteration, then stop cleanly
	}

	const experienceYears = new Date().getFullYear() - 2018;

	let ctx: gsap.Context;
	let initTimeout: ReturnType<typeof setTimeout>;

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
						backgroundColor: "#0E0D0C",
						color: "#EDE8DE",
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

				// Note: no GSAP bg revert needed — Core Strengths and below have explicit bg-[#F4F0E8]

				// ── Work Experience — chip slide + heading curtain wipe ──
				gsap.from('.work-exp-chip', {
					x: -28, opacity: 0, duration: 0.5, ease: 'power3.out',
					scrollTrigger: { trigger: '.work-exp-chip', start: 'top 88%', once: true }
				});
				gsap.from('.work-exp-title', {
					y: 52, opacity: 0, clipPath: 'inset(0 0 100% 0)',
					duration: 0.9, ease: 'power4.out', delay: 0.12,
					clearProps: 'clipPath,transform,opacity',
					scrollTrigger: { trigger: '.work-exp-title', start: 'top 88%', once: true }
				});

				// ── Core Strengths — label slide + heading curtain wipe ──
				gsap.from('.bento-heading-label', {
					x: -20, opacity: 0, duration: 0.5, ease: 'power3.out',
					scrollTrigger: { trigger: '.bento-heading-label', start: 'top 88%', once: true }
				});
				gsap.from('.bento-heading-title', {
					y: 52, opacity: 0, clipPath: 'inset(0 0 100% 0)',
					duration: 0.9, ease: 'power4.out', delay: 0.1,
					clearProps: 'clipPath,transform,opacity',
					scrollTrigger: { trigger: '.bento-heading-title', start: 'top 88%', once: true }
				});

				// ── Bento card entrance — stagger curtain wipe ────────────
				gsap.from('.bento-card', {
					y: 36, opacity: 0, duration: 0.7,
					stagger: { each: 0.08, from: 'start' },
					ease: 'power3.out',
					clearProps: 'all',
					scrollTrigger: { trigger: '.bento-wrap', start: 'top 82%', once: true }
				});

				// ── Verifiable Credentials — heading + card wipes ────────
				gsap.from('.creds-heading', {
					y: 20, opacity: 0, duration: 0.55, ease: 'power3.out',
					scrollTrigger: { trigger: '.creds-heading', start: 'top 88%', once: true }
				});
				gsap.fromTo('.cred-card',
					{ clipPath: 'inset(0 0 100% 0 round 17px)', opacity: 0 },
					{
						clipPath: 'inset(0 0 0% 0 round 17px)', opacity: 1,
						duration: 0.85, stagger: 0.15, ease: 'power4.inOut',
						clearProps: 'clipPath,opacity',
						scrollTrigger: { trigger: '.cred-card', start: 'top 84%', once: true }
					}
				);

				// ── How I Work — editorial header + step reveal ──────────
				gsap.from('.how-work-label', {
					x: -20, opacity: 0, duration: 0.5, ease: 'power3.out',
					scrollTrigger: { trigger: '.how-work-label', start: 'top 88%', once: true }
				});
				gsap.from('.how-work-title', {
					y: 52, opacity: 0, clipPath: 'inset(0 0 100% 0)',
					duration: 0.85, ease: 'power4.out', delay: 0.1,
					clearProps: 'clipPath,transform,opacity',
					scrollTrigger: { trigger: '.how-work-title', start: 'top 88%', once: true }
				});
				gsap.from('.how-work-sub', {
					y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.24,
					scrollTrigger: { trigger: '.how-work-sub', start: 'top 90%', once: true }
				});
				// Step cards — curtain wipe from bottom, staggered
				gsap.fromTo('.how-work-step',
					{ clipPath: 'inset(100% 0 0 0)', opacity: 0 },
					{
						clipPath: 'inset(0% 0 0 0)', opacity: 1,
						duration: 0.75, stagger: 0.09, ease: 'power3.inOut',
						clearProps: 'clipPath,opacity',
						scrollTrigger: { trigger: '.how-work-grid', start: 'top 85%', once: true }
					}
				);
				// Top accent bars — draw left-to-right after cards appear
				gsap.to('.how-work-bar', {
					scaleX: 1, duration: 0.55, stagger: 0.09, ease: 'power3.out',
					delay: 0.5,
					scrollTrigger: { trigger: '.how-work-grid', start: 'top 85%', once: true }
				});
				// Inner title rules — draw after accent bars, slight delay so it sequences
				gsap.to('.how-work-rule', {
					scaleX: 1, duration: 0.4, stagger: 0.09, ease: 'power3.out',
					delay: 0.72,
					scrollTrigger: { trigger: '.how-work-grid', start: 'top 85%', once: true }
				});

				// ── Bento icon timelines ──────────────────────────────────────
				// Icons start DRAWN. On hover: erase → redraw (deconstruct → reconstruct).
				// bentoLeave calls repeat(0) so the current cycle always completes at drawn state.
				const plen = (el: SVGGeometryElement) => el.getTotalLength();

				// ATOMIC — rings / core
				const r1 = plen(atomRing1), r2 = plen(atomRing2), r3 = plen(atomRing3);
				// Initial state: fully drawn
				gsap.set(atomRing1, { strokeDasharray: r1, strokeDashoffset: 0 });
				gsap.set(atomRing2, { strokeDasharray: r2, strokeDashoffset: 0 });
				gsap.set(atomRing3, { strokeDasharray: r3, strokeDashoffset: 0 });
				gsap.set(atomCore,  { scale: 1, transformBox: 'fill-box', transformOrigin: 'center' });
				tlAtomic = gsap.timeline({ repeat: -1, paused: true, defaults: { ease: 'power2.out' } });
				tlAtomic
					// Erase: outer → inner
					.to(atomCore,  { scale: 0, duration: 0.18, ease: 'back.in(3)', transformBox: 'fill-box', transformOrigin: 'center' })
					.to(atomRing3, { strokeDashoffset: r3, duration: 0.34, ease: 'power2.in' }, '-=0.08')
					.to(atomRing2, { strokeDashoffset: r2, duration: 0.26, ease: 'power2.in' }, '-=0.22')
					.to(atomRing1, { strokeDashoffset: r1, duration: 0.18, ease: 'power2.in' }, '-=0.16')
					.to({}, { duration: 0.18 })
					// Redraw: inner → outer
					.to(atomRing1, { strokeDashoffset: 0, duration: 0.38 })
					.to(atomRing2, { strokeDashoffset: 0, duration: 0.50 }, '-=0.20')
					.to(atomRing3, { strokeDashoffset: 0, duration: 0.62 }, '-=0.26')
					.to(atomCore,  { scale: 1, duration: 0.26, ease: 'back.out(4)', transformBox: 'fill-box', transformOrigin: 'center' }, '-=0.16')
					.to({}, { duration: 0.26 });

				// SAAS — analytics bars
				// Initial state: bars fully grown
				gsap.set([bar1, bar2, bar3], { scaleY: 1, transformBox: 'fill-box', transformOrigin: 'bottom' });
				tlSaas = gsap.timeline({ repeat: -1, paused: true });
				tlSaas
					// Shrink: tallest → shortest
					.to([bar3, bar2, bar1], { scaleY: 0, duration: 0.26, ease: 'power2.in', stagger: 0.07 })
					.to({}, { duration: 0.18 })
					// Regrow: shortest → tallest
					.to(bar1, { scaleY: 1, duration: 0.30, ease: 'power3.out' })
					.to(bar2, { scaleY: 1, duration: 0.40, ease: 'power3.out' }, '-=0.10')
					.to(bar3, { scaleY: 1, duration: 0.34, ease: 'power3.out' }, '-=0.16')
					.to({}, { duration: 0.26 });

				// WP — box + W path
				const wbLen = plen(wpBox), wLen = plen(wpPath);
				// Initial state: fully drawn
				gsap.set(wpBox,  { strokeDasharray: wbLen, strokeDashoffset: 0 });
				gsap.set(wpPath, { strokeDasharray: wLen,  strokeDashoffset: 0 });
				tlWp = gsap.timeline({ repeat: -1, paused: true });
				tlWp
					// Erase: path first, then box
					.to(wpPath, { strokeDashoffset: wLen,  duration: 0.36, ease: 'power2.in' })
					.to(wpBox,  { strokeDashoffset: wbLen, duration: 0.36, ease: 'power2.in' }, '-=0.16')
					.to({}, { duration: 0.22 })
					// Redraw: box first, then W
					.to(wpBox,  { strokeDashoffset: 0, duration: 0.60, ease: 'power2.inOut' })
					.to(wpPath, { strokeDashoffset: 0, duration: 0.52, ease: 'power2.out' }, '-=0.18')
					.to({}, { duration: 0.26 });

				// MOTION — play triangle
				const plLen = plen(playOutline);
				// Initial state: outline drawn, fill visible
				gsap.set(playOutline, { strokeDasharray: plLen, strokeDashoffset: 0 });
				gsap.set(playFill, { opacity: 1 });
				tlMotion = gsap.timeline({ repeat: -1, paused: true });
				tlMotion
					// Erase: fill dissolves, then outline retracts
					.to(playFill,    { opacity: 0, duration: 0.16 })
					.to(playOutline, { strokeDashoffset: plLen, duration: 0.36, ease: 'power2.in' })
					.to({}, { duration: 0.20 })
					// Redraw: outline scribes, fill materialises
					.to(playOutline, { strokeDashoffset: 0, duration: 0.62, ease: 'power2.inOut' })
					.to(playFill,    { opacity: 1, duration: 0.26, ease: 'power2.out' })
					.to({}, { duration: 0.26 });

				// AI — 4 rays from centre
				const rayLen = 9;
				// Initial state: rays extended
				gsap.set([aiRayT, aiRayR, aiRayB, aiRayL], { strokeDasharray: rayLen, strokeDashoffset: 0 });
				tlAi = gsap.timeline({ repeat: -1, paused: true });
				tlAi
					// Retract rays inward
					.to([aiRayT, aiRayR, aiRayB, aiRayL], {
						strokeDashoffset: rayLen, duration: 0.26, ease: 'power2.in',
						stagger: { each: 0.06, from: 'end' }
					})
					.to({}, { duration: 0.20 })
					// Shoot rays outward
					.to([aiRayT, aiRayR, aiRayB, aiRayL], {
						strokeDashoffset: 0, duration: 0.36, ease: 'power3.out',
						stagger: { each: 0.06 }
					})
					.to({}, { duration: 0.26 });

				// A11Y — person figure
				const bLen = plen(a11yBody), alLen = plen(a11yArmL), arLen = plen(a11yArmR);
				const llLen = plen(a11yLegL), lrLen = plen(a11yLegR);
				// Initial state: fully assembled
				gsap.set(a11yHead, { scale: 1, transformBox: 'fill-box', transformOrigin: 'center' });
				gsap.set(a11yBody, { strokeDasharray: bLen,  strokeDashoffset: 0 });
				gsap.set(a11yArmL, { strokeDasharray: alLen, strokeDashoffset: 0 });
				gsap.set(a11yArmR, { strokeDasharray: arLen, strokeDashoffset: 0 });
				gsap.set(a11yLegL, { strokeDasharray: llLen, strokeDashoffset: 0 });
				gsap.set(a11yLegR, { strokeDasharray: lrLen, strokeDashoffset: 0 });
				tlA11y = gsap.timeline({ repeat: -1, paused: true });
				tlA11y
					// Disassemble: legs → arms → body → head
					.to([a11yLegL, a11yLegR], { strokeDashoffset: llLen, duration: 0.18, ease: 'power2.in', stagger: 0.04 })
					.to([a11yArmL, a11yArmR], { strokeDashoffset: alLen, duration: 0.20, ease: 'power2.in', stagger: 0.04 }, '-=0.06')
					.to(a11yBody, { strokeDashoffset: bLen, duration: 0.18, ease: 'power2.in' }, '-=0.10')
					.to(a11yHead, { scale: 0, duration: 0.16, ease: 'back.in(3)', transformBox: 'fill-box', transformOrigin: 'center' }, '-=0.06')
					.to({}, { duration: 0.18 })
					// Reassemble: head → body → arms → legs
					.to(a11yHead, { scale: 1, duration: 0.24, ease: 'back.out(4)', transformBox: 'fill-box', transformOrigin: 'center' })
					.to(a11yBody, { strokeDashoffset: 0, duration: 0.26, ease: 'power2.out' }, '-=0.04')
					.to(a11yArmL, { strokeDashoffset: 0, duration: 0.28, ease: 'power2.out' }, '-=0.06')
					.to(a11yArmR, { strokeDashoffset: 0, duration: 0.28, ease: 'power2.out' }, '<')
					.to(a11yLegL, { strokeDashoffset: 0, duration: 0.24, ease: 'power2.out' }, '-=0.06')
					.to(a11yLegR, { strokeDashoffset: 0, duration: 0.24, ease: 'power2.out' }, '<')
					.to({}, { duration: 0.26 });

			// ── Concept C — Awwwards-quality entrance sequence ──────────────
				// 1. Section header — chip slides in, heading rises, sub fades
				const cSection = document.querySelector<HTMLElement>('.concept-c-section');
				if (cSection) {
					const cChip    = cSection.querySelector('.concept-c-chip');
					const cHeading = cSection.querySelector('.concept-c-heading');
					const cSub     = cSection.querySelector('.concept-c-sub');
					const headerTl = gsap.timeline({
						scrollTrigger: { trigger: cSection, start: 'top 82%', once: true }
					});
					if (cChip)    headerTl.from(cChip,    { x: -28, opacity: 0, duration: 0.5, ease: 'power3.out' }, 0);
					if (cHeading) headerTl.from(cHeading, { y: 52,  opacity: 0, duration: 0.75, ease: 'power4.out' }, 0.1);
					if (cSub)     headerTl.from(cSub,     { y: 22,  opacity: 0, duration: 0.5,  ease: 'power3.out' }, 0.32);
				}

				// 2. Cards — clip-path curtain wipe from bottom + scale settle
				const cCards = document.querySelectorAll<HTMLElement>('.concept-c-card');
				if (cCards.length) {
					gsap.fromTo(cCards,
						{ clipPath: 'inset(0 0 100% 0 round 16px)', scale: 1.06 },
						{
							clipPath: 'inset(0 0 0% 0 round 16px)', scale: 1,
							duration: 0.85, stagger: 0.11, ease: 'power4.inOut',
							clearProps: 'clipPath,scale',
							scrollTrigger: { trigger: '.concept-c-grid', start: 'top 82%', once: true },
						}
					);

					// 3. Logo badges — bounce in after cards wipe (delayed)
					gsap.fromTo('.concept-c-card .logo-badge',
						{ scale: 0.35, opacity: 0, rotate: -15 },
						{
							scale: 1, opacity: 1, rotate: 0,
							duration: 0.65, stagger: 0.11, ease: 'back.out(2.8)',
							delay: 0.38,
							scrollTrigger: { trigger: '.concept-c-grid', start: 'top 82%', once: true },
						}
					);

					// 4. Year numbers — slide down from above
					gsap.fromTo('.concept-c-card .year-stat',
						{ y: -24, opacity: 0 },
						{
							y: 0, opacity: 1,
							duration: 0.48, stagger: 0.11, ease: 'power3.out',
							delay: 0.58,
							scrollTrigger: { trigger: '.concept-c-grid', start: 'top 82%', once: true },
						}
					);

					// 5. Tool name + category — fade up
					gsap.fromTo('.concept-c-card .tool-identity',
						{ y: 18, opacity: 0 },
						{
							y: 0, opacity: 1,
							duration: 0.5, stagger: 0.10, ease: 'power3.out',
							delay: 0.65,
							scrollTrigger: { trigger: '.concept-c-grid', start: 'top 82%', once: true },
						}
					);
				}

				// 6. Secondary cards — horizontal curtain wipe left→right
				const cSec = document.querySelectorAll<HTMLElement>('.concept-c-sec');
				if (cSec.length) {
					gsap.fromTo(cSec,
						{ clipPath: 'inset(0 100% 0 0 round 12px)', opacity: 0 },
						{
							clipPath: 'inset(0 0% 0 0 round 12px)', opacity: 1,
							duration: 0.6, stagger: 0.08, ease: 'power3.out',
							clearProps: 'clipPath,opacity',
							scrollTrigger: { trigger: '.concept-c-sec-grid', start: 'top 90%', once: true },
						}
					);
				}

				ScrollTrigger.refresh();
			}); // End gsap context
		}, 700);
	});

	onDestroy(() => {
		clearTimeout(initTimeout);
		if (ctx) ctx.revert();
	});

	// ── Tools & Stack Data ───────────────────────────────────────────────────
	const primaryTools = [
		{ name: "Figma",        iconUrl: "/images/logos/figma.svg",       color: "#7B61FF", years: 9, category: "Design Systems", desc: "In Figma since 2017 — components, tokens, atomic systems, and production-ready handoffs.",    glowShadow: "0 8px 48px rgba(123,97,255,0.28)",  glowBorder: "rgba(123,97,255,0.35)"  },
		{ name: "WordPress",    iconUrl: "/images/logos/wordpress.svg",    color: "#21759B", years: 8, category: "Ecosystem",      desc: "8 years deep — Gutenberg blocks, Elementor systems, starter templates at scale.",            glowShadow: "0 8px 48px rgba(33,117,155,0.28)",  glowBorder: "rgba(33,117,155,0.35)"  },
		{ name: "Svelte",       iconUrl: "/images/logos/svelte.svg",       color: "#FF3E00", years: 1, category: "Frontend Dev",   desc: "The framework this portfolio runs on. Fast, reactive, close to the metal.",                  glowShadow: "0 8px 48px rgba(255,62,0,0.28)",    glowBorder: "rgba(255,62,0,0.35)"    },
		{ name: "GSAP",         iconUrl: "/images/logos/gsap.svg",         color: "#88CE02", years: 1, category: "Motion",         desc: "Every scroll animation, stagger, and entrance on this site runs on GSAP.",                  glowShadow: "0 8px 48px rgba(136,206,2,0.28)",   glowBorder: "rgba(136,206,2,0.35)"   },
		{ name: "TypeScript",   iconUrl: "/images/logos/typescript.svg",   color: "#3178C6", years: 3, category: "Frontend Dev",   desc: "Type-safe development across every Svelte project — fewer runtime surprises, faster refactors.", glowShadow: "0 8px 48px rgba(49,120,198,0.28)",  glowBorder: "rgba(49,120,198,0.35)"  },
		{ name: "Tailwind CSS", iconUrl: "/images/logos/tailwindcss.svg",  color: "#06B6D4", years: 4, category: "Styling",        desc: "The utility-first system behind this portfolio's entire design language. Iterates fast.",      glowShadow: "0 8px 48px rgba(6,182,212,0.28)",   glowBorder: "rgba(6,182,212,0.35)"   },
	];
	const secondaryToolsData = [
		{ name: "Photoshop",      iconUrl: "/images/logos/adobephotoshop.svg",  color: "#31A8FF", years: 15, category: "Image Editing" },
		{ name: "Illustrator",    iconUrl: "/images/logos/adobeillustrator.svg",color: "#FF9A00", years: 15, category: "Vector Design" },
		{ name: "Premiere Pro",   iconUrl: "/images/logos/adobepremierepro.svg",color: "#9999FF", years: 12, category: "Video Editing" },
		{ name: "Media Encoder",  iconUrl: "/images/logos/mediaencoder.svg",    color: "#9999FF", years: 12, category: "Export / Render" },
		{ name: "After Effects",  iconUrl: "/images/logos/aftereffects.svg",    color: "#9999FF", years: 12, category: "Motion"         },
		{ name: "Miro",           iconUrl: "/images/logos/miro.svg",            color: "#FFD02F", years: 4, category: "Whiteboarding"  },
		{ name: "Maze",           iconUrl: "/images/logos/maze.svg",            color: "#EF5343", years: 3, category: "User Testing"   },
		{ name: "Elementor",      iconUrl: "/images/logos/elementor.svg",       color: "#92003B", years: 6, category: "WordPress"      },
		{ name: "Spline",         iconUrl: "/images/logos/spline.svg",          color: "#0D6EFD", years: 2, category: "3D Design"      },
		{ name: "Framer",         iconUrl: "/images/logos/framer.svg",          color: "#0559F9", years: 2, category: "Prototyping"    },
		{ name: "VS Code",        iconUrl: "/images/logos/vscode.svg",          color: "#007ACC", years: 6, category: "Dev Env"        },
		{ name: "Notion",         iconUrl: "/images/logos/notion.svg",          color: "#a8a29e", years: 3, category: "Workflow"       },
		{ name: "Vertex AI",      iconUrl: "/images/logos/googlecloud.svg",     color: "#4285F4", years: 1, category: "AI Ops"         },
	];
	let hoveredToolIdx = $state(-1);

	function magneticMove(e: MouseEvent, _i: number) {
		const card = e.currentTarget as HTMLElement;
		const rect  = card.getBoundingClientRect();
		const dx = (e.clientX - (rect.left + rect.width  / 2)) * 0.06;
		const dy = (e.clientY - (rect.top  + rect.height / 2)) * 0.06;
		const badge = card.querySelector<HTMLElement>('.logo-badge');
		if (badge) gsap.to(badge, { x: dx, y: dy, rotateY: dx * 1.2, duration: 0.35, ease: 'power2.out', overwrite: true });
	}

	function magneticLeave(card: HTMLElement) {
		const badge = card.querySelector<HTMLElement>('.logo-badge');
		if (badge) gsap.to(badge, { x: 0, y: 0, rotateY: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)', overwrite: true });
	}

	let activeIndex = $state(0);
	let timelineCards: HTMLElement[] = $state([]);


	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					activeIndex = parseInt((entry.target as HTMLElement).dataset.index || "0");
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
		void scrollY; // Force reactive dependency
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
	class="bg-[#F4F0E8] text-neutral-900 min-h-screen"
>
	<!-- Phase 2: Hero Section -->
	<section
		data-theme="light"
		id="about-hero"
		class="relative min-h-screen flex flex-col items-center pt-[160px] pb-24"
	>
		<!-- Experience Badge -->
		<div
			class="relative z-20 inline-flex items-center justify-center p-[1.5px] rounded-full overflow-hidden mb-8 shadow-sm"
			style="isolation: isolate;"
		>
			<div
				class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,rgba(0,0,0,0.75)_360deg)]"
			></div>
			<div
				class="relative z-10 bg-white px-5 py-2 rounded-full w-full h-full flex items-center justify-center"
			>
				<span
					class="text-xs font-semibold tracking-tight text-neutral-800"
					>{experienceYears}+ years of experience</span
				>
			</div>
		</div>

		<h1
			bind:this={h1El}
			class="relative z-10 text-center font-black uppercase text-neutral-900 mb-8 lg:mb-12"
			style="font-size: clamp(2.75rem, 10.5vw, 10rem); letter-spacing: -0.03em; line-height: 0.85; transform-style: preserve-3d;"
		>
			<img
				src={starImg}
				alt="3D Star"
				class="floating-shape absolute object-contain pointer-events-none hidden lg:block"
				style="z-index: -1; top: -3vw; left: -6vw; width: clamp(80px, 7vw, 140px);"
			/>
			Product <br /> Designer
			<img
				src={gemImg}
				alt="3D Gem"
				class="floating-shape absolute object-contain pointer-events-none hidden lg:block"
				style="z-index: -1; bottom: -3vw; right: -6vw; width: clamp(80px, 7vw, 140px);"
			/>
		</h1>

		<div
			bind:this={cardContainerEl}
			class="relative z-20 w-full max-w-[260px] lg:max-w-[320px] aspect-4/5 mx-auto"
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
		class="w-full max-w-5xl mx-auto px-6 py-24 relative"
	>
		<!-- 3-Column Strict Grid locked to vertical center -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
			<!-- Left Column: Intro -->
			<div class="col-span-1 flex flex-col justify-center">
				<h2
					class="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white leading-tight"
				>
					I Build<br />Systems.
				</h2>
				<p class="text-gray-400 text-base leading-relaxed">
					Product designer with 7 years embedded inside high-growth
					SaaS teams — not consulting from the outside, but shipping
					inside WPMU DEV, Themeisle, Eclectic, and Ideajam.
				</p>
			</div>

			<!-- Center Column: Portrait (GSAP Target Slot) — hidden on mobile to avoid blank gap -->
			<div class="hidden md:flex col-span-1 justify-center">
				<div
					bind:this={cardSlotEl}
					class="relative w-full max-w-sm aspect-4/5 rounded-3xl pointer-events-none opacity-0"
				></div>
			</div>

			<!-- Right Column: Details -->
			<div class="col-span-1 flex flex-col justify-center space-y-6">
				<p class="text-gray-400 text-base leading-relaxed">
					My MCA background means engineering pushback doesn't
					surprise me. Design decisions I make are grounded in how
					they'll actually be built — no throwaway concepts, no
					handoffs that go in a drawer.
				</p>
				<p class="text-gray-400 text-base leading-relaxed">
					Technical constraints are the medium, not an obstacle.
					I design for what can scale, not just what looks sharp
					in Figma.
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
				{#each "Most SaaS products have three flows that account for eighty percent of user time. I find them early, design them precisely, and build systems around them that hold up when the product scales. Design is engineering with a different tool set.".split(" ") as word}
					<span class="inline-block transition-colors">{word}</span>
				{/each}
			</p>
		</div>
	</section>

	<!-- The Dark Theme Timeline Track -->
	<section class="w-full py-24 px-6 border-t border-gray-900" data-theme="dark">
		<div class="max-w-7xl mx-auto relative">
		<div class="mb-20">
			<div class="work-exp-chip mb-4 relative inline-flex overflow-hidden rounded-full p-px">
				<div class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,rgba(255,255,255,0.65)_360deg)]"></div>
				<div class="inline-flex h-full w-full items-center justify-center rounded-full bg-neutral-950 px-6 py-2 relative z-10">
					<span class="text-[11px] font-mono tracking-widest text-gray-400 uppercase">PROOF OF EXECUTION</span>
				</div>
			</div>
			<h2 class="work-exp-title text-4xl md:text-5xl font-bold tracking-tight text-white">
				Work Experience
			</h2>
		</div>

		<div class="relative pl-8 md:pl-12" bind:this={timelineContainer}>
			<!-- The Absolute Vertical Line (Dark Mode) -->
			<div class="absolute left-0 top-2 bottom-0 w-[2px] bg-gray-800"></div>

			<!-- The Animated Draw Line -->
			<div
				class="absolute left-0 top-2 w-[2px] bg-[#D1D5DB] transition-all duration-75 ease-out"
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
						<div class="absolute left-[-39px] md:left-[-55px] top-1.5 flex h-4 w-4 items-center justify-center">
							<!-- Node Outer Pulse -->
							<span class="absolute inline-flex h-full w-full rounded-full transition-all duration-500 {activeIndex >= i ? 'bg-[#D1D5DB] opacity-30 scale-150' : 'bg-gray-800 scale-100'}"></span>
							<!-- Node Inner Core -->
							<span class="relative inline-flex rounded-full h-2 w-2 transition-colors duration-500 {activeIndex >= i ? 'bg-[#D1D5DB]' : 'bg-gray-600'}"></span>
						</div>

						<!-- Card Content -->
						<div class="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 mb-4">
							<div>
								<h3 class="text-2xl font-semibold text-white transition-colors duration-500 {activeIndex >= i ? 'text-white' : 'text-gray-400'}">{exp.role}</h3>
								<p class="text-lg text-gray-500 font-medium mt-1">{exp.company}</p>
							</div>
							<span class="text-sm font-mono tracking-widest uppercase shrink-0 transition-colors duration-500 {activeIndex >= i ? 'text-[#D1D5DB]' : 'text-gray-600'}">
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
		</div>
	</section>

	<!-- Core Strengths Bento -->
	<section data-theme="dark" class="py-24 px-6 bg-[#0a0a0e] border-t border-white/6">
		<div class="max-w-7xl mx-auto">
			<p class="bento-heading-label text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase mb-3">Core Strengths</p>
			<h2 class="bento-heading-title text-3xl sm:text-4xl font-black text-white tracking-tight mb-10">What I'm Known For</h2>

			<div class="bento-wrap">

				<!-- 1: Atomic Design — col 1-2, row 1 -->
				<div role="group" class="bento-card b-atomic rounded-2xl border border-white/[0.07] bg-[#111116] p-6 flex flex-col justify-between cursor-default"
					onmouseenter={() => bentoHover(tlAtomic)} onmouseleave={() => bentoLeave(tlAtomic)}>
					<div class="bento-glow" aria-hidden="true"></div>
					<div class="flex items-start justify-between gap-4">
						<span class="text-[10px] font-mono tracking-[0.2em] text-neutral-500 uppercase pt-0.5">Design Systems</span>
						<div class="bento-icon icon-atomic shrink-0">
							<svg width="32" height="32" viewBox="0 0 24 24" fill="none">
								<circle bind:this={atomRing3} cx="12" cy="12" r="10"  stroke="#6366F1" stroke-width="0.9" opacity="0.35"/>
								<circle bind:this={atomRing2} cx="12" cy="12" r="6.5" stroke="#6366F1" stroke-width="1.1" opacity="0.65"/>
								<circle bind:this={atomRing1} cx="12" cy="12" r="3"   stroke="#6366F1" stroke-width="1.4"/>
								<circle bind:this={atomCore}  cx="12" cy="12" r="1.4" fill="#6366F1"/>
							</svg>
						</div>
					</div>
					<div>
						<p class="text-xl font-black text-white tracking-tight leading-snug mb-3">Atomic Design Systems</p>
						<div class="flex flex-wrap gap-1.5">
							{#each ['Figma', 'Design Tokens', 'Component Library', 'Dev Handoff'] as t}
								<span class="text-[10px] font-mono text-neutral-600 bg-white/4 px-2 py-0.5 rounded-full">{t}</span>
							{/each}
						</div>
					</div>
				</div>

				<!-- 2: Complex SaaS — col 3, rows 1-2 (tall) -->
				<div role="group" class="bento-card b-saas rounded-2xl border border-white/[0.07] bg-[#111116] p-6 flex flex-col justify-between cursor-default"
					onmouseenter={() => bentoHover(tlSaas)} onmouseleave={() => bentoLeave(tlSaas)}>
					<div class="bento-glow" aria-hidden="true"></div>
					<div class="flex items-start justify-between gap-4">
						<span class="text-[10px] font-mono tracking-[0.2em] text-neutral-500 uppercase pt-0.5">Enterprise</span>
						<div class="bento-icon icon-saas shrink-0">
							<svg width="28" height="28" viewBox="0 0 24 24">
								<rect bind:this={bar1} x="2"   y="8"  width="5" height="14" rx="1.5" fill="#38BDF8"/>
								<rect bind:this={bar2} x="9.5" y="3"  width="5" height="19" rx="1.5" fill="#38BDF8" opacity="0.85"/>
								<rect bind:this={bar3} x="17"  y="11" width="5" height="11" rx="1.5" fill="#38BDF8" opacity="0.65"/>
							</svg>
						</div>
					</div>
					<div>
						<p class="text-xl font-black text-white tracking-tight leading-snug mb-3">Complex SaaS Interface Design</p>
						<div class="flex flex-wrap gap-1.5">
							{#each ['B2B', 'Multi-tenant', 'Dashboards', 'Data-heavy UI'] as t}
								<span class="text-[10px] font-mono text-neutral-600 bg-white/4 px-2 py-0.5 rounded-full">{t}</span>
							{/each}
						</div>
					</div>
				</div>

				<!-- 3: WordPress — col 1, row 2 -->
				<div role="group" class="bento-card b-wp rounded-2xl border border-white/[0.07] bg-[#111116] p-6 flex flex-col justify-between cursor-default"
					onmouseenter={() => bentoHover(tlWp)} onmouseleave={() => bentoLeave(tlWp)}>
					<div class="bento-glow" aria-hidden="true"></div>
					<div class="flex items-start justify-between gap-4">
						<span class="text-[10px] font-mono tracking-[0.2em] text-neutral-500 uppercase pt-0.5">CMS</span>
						<div class="bento-icon icon-wp shrink-0">
							<svg width="28" height="28" viewBox="0 0 24 24" fill="none">
								<rect bind:this={wpBox} x="2" y="2" width="20" height="20" rx="5" stroke="#3B82F6" stroke-width="1.4"/>
								<path bind:this={wpPath} d="M6.5 9l2.2 6 2.3-5.5 2.3 5.5 2.2-6" stroke="#3B82F6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</div>
					</div>
					<div>
						<p class="text-base font-black text-white tracking-tight leading-snug mb-2">WordPress Ecosystem</p>
						<div class="flex flex-wrap gap-1.5">
							{#each ['Gutenberg', 'Elementor'] as t}
								<span class="text-[10px] font-mono text-neutral-600 bg-white/4 px-2 py-0.5 rounded-full">{t}</span>
							{/each}
						</div>
					</div>
				</div>

				<!-- 4: Interaction Design — col 2, row 2 -->
				<div role="group" class="bento-card b-motion rounded-2xl border border-white/[0.07] bg-[#111116] p-6 flex flex-col justify-between cursor-default"
					onmouseenter={() => bentoHover(tlMotion)} onmouseleave={() => bentoLeave(tlMotion)}>
					<div class="bento-glow" aria-hidden="true"></div>
					<div class="flex items-start justify-between gap-4">
						<span class="text-[10px] font-mono tracking-[0.2em] text-neutral-500 uppercase pt-0.5">Motion</span>
						<div class="bento-icon icon-motion shrink-0">
							<svg width="28" height="28" viewBox="0 0 24 24" fill="none">
								<path bind:this={playFill}    d="M5 3L19 12L5 21Z" fill="#F59E0B" fill-opacity="0.15"/>
								<path bind:this={playOutline} d="M5 3L19 12L5 21Z" stroke="#F59E0B" stroke-width="1.5" stroke-linejoin="round"/>
							</svg>
						</div>
					</div>
					<div>
						<p class="text-base font-black text-white tracking-tight leading-snug mb-2">Interaction Design & Motion</p>
						<div class="flex flex-wrap gap-1.5">
							{#each ['GSAP', 'Framer', 'After Effects'] as t}
								<span class="text-[10px] font-mono text-neutral-600 bg-white/4 px-2 py-0.5 rounded-full">{t}</span>
							{/each}
						</div>
					</div>
				</div>

				<!-- 5: AI Ops — col 1-2, row 3 (wide banner) -->
				<div role="group" class="bento-card b-ai rounded-2xl border border-white/[0.07] bg-[#111116] p-6 flex items-center gap-6 cursor-default"
					onmouseenter={() => bentoHover(tlAi)} onmouseleave={() => bentoLeave(tlAi)}>
					<div class="bento-glow" aria-hidden="true"></div>
					<div class="bento-icon icon-ai shrink-0">
						<svg width="36" height="36" viewBox="0 0 24 24" fill="none">
							<line bind:this={aiRayT} x1="12" y1="12" x2="12" y2="3"  stroke="#A78BFA" stroke-width="2"   stroke-linecap="round"/>
							<line bind:this={aiRayR} x1="12" y1="12" x2="21" y2="12" stroke="#A78BFA" stroke-width="1.6" stroke-linecap="round"/>
							<line bind:this={aiRayB} x1="12" y1="12" x2="12" y2="21" stroke="#A78BFA" stroke-width="2"   stroke-linecap="round"/>
							<line bind:this={aiRayL} x1="12" y1="12" x2="3"  y2="12" stroke="#A78BFA" stroke-width="1.6" stroke-linecap="round"/>
							<circle cx="12" cy="12" r="2.5" fill="#A78BFA"/>
						</svg>
					</div>
					<div class="flex-1 min-w-0">
						<span class="text-[10px] font-mono tracking-[0.2em] text-neutral-500 uppercase">AI · Operations</span>
						<p class="text-xl font-black text-white tracking-tight mt-1">AI-Assisted Design Operations</p>
					</div>
					<div class="flex flex-wrap gap-1.5 shrink-0">
						{#each ['Prompt Engineering', 'Midjourney', 'Cursor', 'Workflow Automation'] as t}
							<span class="text-[10px] font-mono text-neutral-600 bg-white/4 px-2 py-0.5 rounded-full">{t}</span>
						{/each}
					</div>
				</div>

				<!-- 6: Accessibility — col 3, row 3 -->
				<div role="group" class="bento-card b-a11y rounded-2xl border border-white/[0.07] bg-[#111116] p-6 flex flex-col justify-between cursor-default"
					onmouseenter={() => bentoHover(tlA11y)} onmouseleave={() => bentoLeave(tlA11y)}>
					<div class="bento-glow" aria-hidden="true"></div>
					<div class="flex items-start justify-between gap-4">
						<span class="text-[10px] font-mono tracking-[0.2em] text-neutral-500 uppercase pt-0.5">Standards</span>
						<div class="bento-icon icon-a11y shrink-0">
							<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
								<circle bind:this={a11yHead} cx="12" cy="4.5" r="2"/>
								<path   bind:this={a11yBody} d="M12 7.5v5.5"/>
								<path   bind:this={a11yArmL} d="M12 10L7 10"/>
								<path   bind:this={a11yArmR} d="M12 10L17 10"/>
								<path   bind:this={a11yLegL} d="M12 13L9 19"/>
								<path   bind:this={a11yLegR} d="M12 13L15 19"/>
							</svg>
						</div>
					</div>
					<div>
						<p class="text-sm font-black text-white tracking-tight leading-snug mb-1">Accessibility-First UI Engineering</p>
						<p class="text-[11px] font-mono text-neutral-600">WCAG 2.1 AA</p>
					</div>
				</div>

			</div>
		</div>
	</section>

	<!-- Tools & Stack -->
	<section data-theme="light" class="concept-c-section py-24 px-6 bg-white border-t border-neutral-200">
		<div class="max-w-7xl mx-auto">

			<!-- Header -->
			<div class="mb-16">
				<div class="concept-c-chip mb-6">
					<Chip theme="light" spin="always" innerClass="px-6 py-2">
						<span class="text-[11px] font-mono tracking-widest text-neutral-500 uppercase">My Toolkit</span>
					</Chip>
				</div>
				<h2 class="concept-c-heading font-black tracking-tight text-neutral-900 leading-none mt-6" style="font-size: clamp(2.5rem, 5vw, 5rem);">
					Tools &amp; <span class="text-neutral-400">Stack.</span>
				</h2>
				<p class="concept-c-sub text-neutral-500 mt-4 text-base max-w-[44ch] leading-relaxed">
					The tools I reach for first. Every one shipped in production.
				</p>
			</div>

			<!-- 6 primary hero cards — logo is the visual anchor -->
			<div class="concept-c-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
				{#each primaryTools as tool, i}
					<div
						role="group"
						class="concept-c-card group relative rounded-2xl border border-neutral-200 bg-white flex flex-col cursor-default overflow-hidden"
						onmouseenter={() => { hoveredToolIdx = i; }}
						onmousemove={(e) => { magneticMove(e, i); }}
						onmouseleave={(e) => { hoveredToolIdx = -1; magneticLeave(e.currentTarget as HTMLElement); }}
						style={hoveredToolIdx === i
							? `box-shadow: ${tool.glowShadow}; border-color: ${tool.glowBorder};`
							: 'transition: box-shadow 0.35s ease, border-color 0.35s ease;'}
					>
						<!-- Brand zone — subtle color wash + large logo -->
						<div
							class="relative px-7 pt-8 pb-10 flex items-start justify-between"
							style="background: linear-gradient(145deg, {tool.color}15 0%, {tool.color}06 55%, transparent 100%);"
						>
							<!-- Large brand logo badge — magnetic target -->
							<div
								class="logo-badge w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden"
								style="background: {tool.color}14; border: 1px solid {tool.color}28;"
							>
								<img
									src="{tool.iconUrl}"
									alt="{tool.name} logo"
									class="w-12 h-12 object-contain"
									loading="lazy"
								/>
							</div>
							<!-- Years — white, top right — counter-magnetic target -->
							<div class="year-stat text-right">
								<span class="text-[clamp(2rem,4vw,3rem)] font-black leading-none tracking-tighter text-neutral-900">{tool.years}</span>
								<span class="text-[9px] font-mono text-neutral-400 tracking-[0.2em] uppercase block mt-0.5">yrs</span>
							</div>

							<!-- Corner glow on hover -->
							<div
								class="absolute -bottom-8 -left-8 w-36 h-36 rounded-full pointer-events-none transition-opacity duration-300"
								style="background: radial-gradient(circle, {tool.color}22 0%, transparent 70%); opacity: {hoveredToolIdx === i ? 1 : 0};"
							></div>
						</div>

						<!-- Tool identity + description -->
						<div class="px-7 pb-7 pt-1 relative z-10 flex-1 flex flex-col justify-between">
							<div class="tool-identity">
								<p class="text-xl font-black text-neutral-900 tracking-tight">{tool.name}</p>
								<p class="text-[10px] font-mono tracking-widest text-neutral-500 uppercase mt-1.5">{tool.category}</p>
							</div>

							<!-- Description slides in on hover -->
							<div
								class="overflow-hidden"
								style="max-height: {hoveredToolIdx === i ? '5rem' : '0'}; opacity: {hoveredToolIdx === i ? 1 : 0}; margin-top: {hoveredToolIdx === i ? '0.875rem' : '0'}; transition: max-height 0.3s ease, opacity 0.25s ease, margin-top 0.3s ease;"
							>
								<p class="text-xs text-neutral-500 leading-relaxed">{tool.desc}</p>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Secondary tools — compact card grid with real logos -->
			<div class="concept-c-sec-grid border-t border-neutral-200 pt-8">
				<span class="text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase block mb-5">Also in the stack</span>
				<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
					{#each secondaryToolsData as t}
						<div class="concept-c-sec flex flex-col items-center gap-2.5 p-4 rounded-xl bg-neutral-100 border border-neutral-200 hover:border-neutral-300 hover:bg-white transition-all duration-200 cursor-default group">
							<!-- Logo badge — dark tinted -->
							<div
								class="w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden"
								style="background: {t.color}14; border: 1px solid {t.color}22;"
							>
								<img
									src="{t.iconUrl}"
									alt="{t.name} logo"
									class="w-5 h-5 object-contain"
									loading="lazy"
								/>
							</div>
							<span class="text-[11px] font-semibold text-neutral-700 text-center leading-tight group-hover:text-neutral-900 transition-colors duration-200">{t.name}</span>
							<div class="flex flex-col items-center gap-0.5">
								<span class="text-[9px] font-mono text-neutral-400 tracking-widest">{t.years} yrs</span>
								<span class="text-[9px] font-mono text-neutral-500 tracking-widest uppercase">{t.category}</span>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Phase 5: Credentials Bento Box -->
	<section
		data-theme="dark"
		id="credentials-bento"
		class="py-32 px-6 border-t border-white/5 bg-[#0a0a0c]"
	>
		<div class="max-w-5xl mx-auto w-full mb-24">
			<h3
				class="creds-heading text-sm font-mono text-gray-400 tracking-widest uppercase mb-12 text-center md:text-left"
			>
				Verifiable Credentials
			</h3>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">

				<!-- ── Google Cloud / AI ── -->
				<div class="cred-card group/card relative overflow-hidden rounded-[17px] p-px flex flex-col transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6)]">
					<div class="absolute inset-0 bg-white/5 transition-opacity duration-500 group-hover/card:opacity-0" aria-hidden="true"></div>
					<div class="absolute inset-[-1000%] motion-safe:animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,rgba(255,255,255,0.65)_360deg)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
					<div class="relative bg-[#121318] p-10 rounded-2xl flex flex-col h-full w-full">
						<div class="absolute -top-12 -right-12 w-48 h-48 bg-primary/15 rounded-full blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true"></div>
						<!-- Header -->
						<div class="flex items-center gap-4 mb-6 pb-6 border-b border-white/6 relative z-10">
							<svg class="w-9 h-9 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
								<path fill="#f4f4f4" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
							</svg>
							<h4 class="text-xl font-bold tracking-tight text-white">Google Cloud / AI</h4>
						</div>
						<!-- Certification list -->
						<ul class="flex flex-col relative z-10 flex-1" role="list">
							{#each ["Foundations of UX Design", "Prompt Design in Vertex AI", "Google Prompting Essentials", "Google AI Essentials"] as item}
								<li>
									<a
										href="https://www.linkedin.com/in/phantom-cluster/details/certifications/"
										target="_blank"
										rel="noopener noreferrer"
										class="group/item flex items-center justify-between py-4 border-b border-white/5 last:border-0 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20"
										aria-label="{item} — view on LinkedIn"
									>
										<span class="font-medium text-gray-400 transition-all duration-250 group-hover/item:text-white group-hover/item:translate-x-1">{item}</span>
										<ExternalLink class="w-3.5 h-3.5 text-gray-600 shrink-0 opacity-0 -translate-x-2 transition-all duration-250 group-hover/item:opacity-100 group-hover/item:translate-x-0" aria-hidden="true" />
									</a>
								</li>
							{/each}
						</ul>
						<!-- Footer CTA -->
						<a
							href="https://www.linkedin.com/in/phantom-cluster/details/certifications/"
							target="_blank"
							rel="noopener noreferrer"
							class="group/cta flex items-center gap-2 pt-5 mt-5 border-t border-white/6 text-xs font-mono tracking-widest text-gray-500 uppercase hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 rounded-sm z-10 relative"
						>
							View all certifications
							<ExternalLink class="w-3 h-3 opacity-0 -translate-x-1 transition-all duration-300 group-hover/cta:opacity-100 group-hover/cta:translate-x-0" aria-hidden="true" />
						</a>
					</div>
				</div>

				<!-- ── Uxcel Visual Engineering ── -->
				<div class="cred-card group/card relative overflow-hidden rounded-[17px] p-px flex flex-col transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6)]">
					<div class="absolute inset-0 bg-white/5 transition-opacity duration-500 group-hover/card:opacity-0" aria-hidden="true"></div>
					<div class="absolute inset-[-1000%] motion-safe:animate-[spin_3s_linear_infinite] bg-[conic-gradient(transparent_270deg,rgba(255,255,255,0.65)_360deg)] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
					<div class="relative bg-[#121318] p-10 rounded-2xl flex flex-col h-full w-full">
						<div class="absolute -top-12 -right-12 w-48 h-48 bg-primary/15 rounded-full blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true"></div>
						<!-- Header -->
						<div class="flex items-center gap-4 mb-6 pb-6 border-b border-white/6 relative z-10">
							<svg class="w-9 h-9 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
								<path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#f4f4f4"/>
								<path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="#f4f4f4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
							<h4 class="text-xl font-bold tracking-tight text-white">Uxcel Visual Engineering</h4>
						</div>
						<!-- Certification list -->
						<ul class="flex flex-col relative z-10 flex-1" role="list">
							{#each ["UX Design Psychology", "3D Design Foundations", "Wireframing", "Design Accessibility (WCAG)", "UI Components I", "UX Design Foundations"] as item}
								<li>
									<a
										href="https://www.linkedin.com/in/phantom-cluster/details/certifications/"
										target="_blank"
										rel="noopener noreferrer"
										class="group/item flex items-center justify-between py-4 border-b border-white/5 last:border-0 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20"
										aria-label="{item} — view on LinkedIn"
									>
										<span class="font-medium text-gray-400 transition-all duration-250 group-hover/item:text-white group-hover/item:translate-x-1">{item}</span>
										<ExternalLink class="w-3.5 h-3.5 text-gray-600 shrink-0 opacity-0 -translate-x-2 transition-all duration-250 group-hover/item:opacity-100 group-hover/item:translate-x-0" aria-hidden="true" />
									</a>
								</li>
							{/each}
						</ul>
						<!-- Footer CTA -->
						<a
							href="https://www.linkedin.com/in/phantom-cluster/details/certifications/"
							target="_blank"
							rel="noopener noreferrer"
							class="group/cta flex items-center gap-2 pt-5 mt-5 border-t border-white/6 text-xs font-mono tracking-widest text-gray-500 uppercase hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 rounded-sm z-10 relative"
						>
							View all certifications
							<ExternalLink class="w-3 h-3 opacity-0 -translate-x-1 transition-all duration-300 group-hover/cta:opacity-100 group-hover/cta:translate-x-0" aria-hidden="true" />
						</a>
					</div>
				</div>

			</div>
		</div>

		<!-- How I Work — Premium Process Section -->
		<div class="max-w-7xl mx-auto mt-24 px-6">

			<!-- Editorial header -->
			<div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 pb-12 border-b border-white/6">
				<div>
					<p class="how-work-label text-[10px] font-mono tracking-[0.3em] text-gray-500 uppercase mb-5">Process</p>
					<h2 class="how-work-title font-black tracking-tight text-white leading-none" style="font-size: clamp(2rem, 4.5vw, 3.25rem);">
						How I Work
					</h2>
				</div>
				<p class="how-work-sub text-sm text-gray-500 leading-relaxed max-w-xs">
					Five focused phases. No wasted motion.<br/>Every decision traces back to the problem.
				</p>
			</div>

			<!-- 5-step grid — gap-px dividers -->
			<div class="how-work-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/5 rounded-2xl overflow-hidden">
				{#each [
					{ num: "01", title: "Discover", type: "Research",  desc: "User interviews, heuristic audits, competitive mapping. Understand the real problem before touching Figma.",               color: "#7C8FD9" },
					{ num: "02", title: "Define",   type: "Strategy",  desc: "Problem framing, success metrics, technical constraints. Scope is set here — ambiguity is the enemy of good design.",     color: "#5FA8D8" },
					{ num: "03", title: "Design",   type: "Execution", desc: "Tokens first, atoms second, screens last. Everything is a system — nothing is a one-off.",                               color: "#9B80D6" },
					{ num: "04", title: "Ship",     type: "Delivery",  desc: "Production Figma or working Svelte components. Engineering receives zero-ambiguity specs, every time.",                   color: "#3DB48C" },
					{ num: "05", title: "Iterate",  type: "Growth",    desc: "Real user data drives every revision. Keep what earns its place in the critical path. Cut what doesn't.",               color: "#CFA055" },
				] as step}
					<div
						class="how-work-step group relative cursor-default overflow-hidden bg-[#0c0c10] transition-colors duration-500 hover:bg-[#111118]"
						style="display: grid; grid-template-rows: auto 1fr auto; min-height: 380px; padding: 2.25rem 2rem 2rem;"
					>
						<!-- accent bar -->
						<div class="how-work-bar absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0" style="background: {step.color};"></div>

						<!-- ghost watermark — bottom-right, barely visible -->
						<div class="absolute bottom-0 right-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
							<span class="how-work-num font-mono font-black leading-[0.82] block" style="font-size: clamp(6.5rem, 8vw, 9rem); color: {step.color}; opacity: 0.06; transform: translateY(20%);">{step.num}</span>
						</div>

						<!-- Row 1: counter + phase badge -->
						<div class="flex items-center justify-between relative z-10">
							<span class="text-[10px] font-mono text-gray-600 tracking-[0.25em]">{step.num}&nbsp;/&nbsp;05</span>
							<span
								class="text-[9px] font-mono tracking-[0.12em] uppercase px-2.5 py-1 rounded-full"
								style="color: {step.color}; background: {step.color}18; border: 1px solid {step.color}35;"
							>{step.type}</span>
						</div>

						<!-- Row 2 (1fr): title zone — title anchors to the bottom of this row so it aligns across all cards -->
						<div class="relative z-10 flex flex-col justify-end pb-5">
							<div class="how-work-rule w-5 h-px origin-left scale-x-0 mb-4" style="background: {step.color};"></div>
							<h3 class="font-black text-white tracking-tight leading-tight" style="font-size: clamp(1.5rem, 2vw, 1.9rem);">{step.title}</h3>
						</div>

						<!-- Row 3: description — fixed height via line-clamp keeps row consistent -->
						<div class="relative z-10">
							<p class="text-sm text-gray-400 leading-relaxed line-clamp-4">{step.desc}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

	</section>

	<ExploreProjectComponent />

</div>

<style>
	/* ── Bento grid layout ─────────────────────────────────────── */
	.bento-wrap {
		display: grid;
		gap: 12px;
		grid-template-columns: 1fr;
	}
	@media (min-width: 640px) {
		.bento-wrap { grid-template-columns: 1fr 1fr; }
	}
	@media (min-width: 1024px) {
		.bento-wrap {
			grid-template-columns: 1fr 1fr 1fr;
			grid-template-rows: 220px 220px 130px;
		}
		.b-atomic { grid-column: 1 / 3; grid-row: 1 / 2; }
		.b-saas   { grid-column: 3 / 4; grid-row: 1 / 3; }
		.b-wp     { grid-column: 1 / 2; grid-row: 2 / 3; }
		.b-motion { grid-column: 2 / 3; grid-row: 2 / 3; }
		.b-ai     { grid-column: 1 / 3; grid-row: 3 / 4; }
		.b-a11y   { grid-column: 3 / 4; grid-row: 3 / 4; }
	}

	/* ── Bento card hover — glow + lift ──────────────────────── */
	.bento-card {
		position: relative;
		isolation: isolate;
		transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.35s ease;
	}
	.bento-card:hover { transform: translateY(-2px); }

	.bento-glow {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		z-index: -1;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.45s ease;
	}
	.bento-card:hover .bento-glow { opacity: 1; }

	/* Radial spotlight colour-matched to each SVG stroke */
	.b-atomic .bento-glow  { background: radial-gradient(circle at 93% 7%,  rgba(99,102,241,0.22) 0%, transparent 55%); }
	.b-atomic:hover        { border-color: rgba(99,102,241,0.30);  box-shadow: 0 10px 40px -6px rgba(99,102,241,0.22); }

	.b-saas .bento-glow    { background: radial-gradient(circle at 93% 5%,  rgba(56,189,248,0.18) 0%, transparent 55%); }
	.b-saas:hover          { border-color: rgba(56,189,248,0.28);  box-shadow: 0 10px 40px -6px rgba(56,189,248,0.18); }

	.b-wp .bento-glow      { background: radial-gradient(circle at 93% 7%,  rgba(59,130,246,0.18) 0%, transparent 55%); }
	.b-wp:hover            { border-color: rgba(59,130,246,0.28);  box-shadow: 0 10px 40px -6px rgba(59,130,246,0.18); }

	.b-motion .bento-glow  { background: radial-gradient(circle at 93% 7%,  rgba(245,158,11,0.18) 0%, transparent 55%); }
	.b-motion:hover        { border-color: rgba(245,158,11,0.28);  box-shadow: 0 10px 40px -6px rgba(245,158,11,0.16); }

	/* AI card is horizontal — icon on LEFT side */
	.b-ai .bento-glow      { background: radial-gradient(circle at 5%  50%, rgba(167,139,250,0.22) 0%, transparent 50%); }
	.b-ai:hover            { border-color: rgba(167,139,250,0.28); box-shadow: 0 10px 40px -6px rgba(167,139,250,0.20); }

	.b-a11y .bento-glow    { background: radial-gradient(circle at 93% 7%,  rgba(52,211,153,0.18) 0%, transparent 55%); }
	.b-a11y:hover          { border-color: rgba(52,211,153,0.28);  box-shadow: 0 10px 40px -6px rgba(52,211,153,0.18); }
	.b-atomic:hover { border-color: rgba(99,102,241,0.45);  box-shadow: 0 0 48px rgba(99,102,241,0.12); }
	.b-saas:hover   { border-color: rgba(56,189,248,0.45);  box-shadow: 0 0 48px rgba(56,189,248,0.12); }
	.b-wp:hover     { border-color: rgba(59,130,246,0.45);  box-shadow: 0 0 48px rgba(59,130,246,0.12); }
	.b-motion:hover { border-color: rgba(245,158,11,0.45);  box-shadow: 0 0 48px rgba(245,158,11,0.12); }
	.b-ai:hover     { border-color: rgba(167,139,250,0.45); box-shadow: 0 0 48px rgba(167,139,250,0.12); }
	.b-a11y:hover   { border-color: rgba(52,211,153,0.45);  box-shadow: 0 0 48px rgba(52,211,153,0.12); }

	/* Icon animation timing is handled entirely by GSAP timelines in onMount */

	.concept-c-card {
		transition: box-shadow 0.35s ease, border-color 0.35s ease;
	}

	.concept-c-card .logo-badge {
		transform-style: preserve-3d;
		perspective: 600px;
	}
</style>
