<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import Chip from '$lib/components/Chip.svelte';

	let sectionEl: HTMLElement;

	const companies = ['WPMU DEV', 'Themeisle', 'Ideajam', 'Eclectic', 'Searchmetrics', 'SomeTechWork'];
	const roles     = ['Product Design', 'Template Design', 'UI/UX Design', 'Product Design', 'Brand & Motion', 'Product & Frontend'];

	const stats = [
		{ value: '6',   label: 'Production Teams' },
		{ value: '7+',  label: 'Years Embedded'   },
		{ value: '2M+', label: 'Users Impacted'   },
		{ value: '98%', label: 'Client Retention' },
	];

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const tweens: gsap.core.Tween[] = [];
		const cleanups: (() => void)[] = [];

		// ── Entrance animations ──────────────────────────────────────────────
		if (!rm) {
			gsap.set('.rosterc-chip', { opacity: 0, y: 14 });
			tweens.push(gsap.to('.rosterc-chip', {
				opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
				scrollTrigger: { trigger: sectionEl, start: 'top 88%', once: true },
			}));
			gsap.set('.rosterc-inner', { yPercent: 110 });
			tweens.push(gsap.to('.rosterc-inner', {
				yPercent: 0, duration: 0.9, stagger: 0.09, ease: 'power4.out',
				scrollTrigger: { trigger: sectionEl, start: 'top 82%', once: true },
			}));
			gsap.set('.rosterc-meta', { opacity: 0, y: 12 });
			tweens.push(gsap.to('.rosterc-meta', {
				opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
				scrollTrigger: { trigger: sectionEl, start: 'top 75%', once: true },
			}));
			gsap.set('.rosterc-track-wrap', { opacity: 0, y: 28 });
			tweens.push(gsap.to('.rosterc-track-wrap', {
				opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
				scrollTrigger: { trigger: '.rosterc-marquee-zone', start: 'top 84%', once: true },
			}));
			gsap.set('.rosterc-stat', { opacity: 0, y: 32, scale: 0.97 });
			tweens.push(gsap.to('.rosterc-stat', {
				opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1, ease: 'power3.out',
				scrollTrigger: { trigger: '.rosterc-stats', start: 'top 84%', once: true },
			}));
		}

		// ── GSAP-driven marquee — eliminates CSS reset flicker ───────────────
		// CSS flex gap creates N-1 gaps (no trailing gap after last item), so
		// translateX(-25%) never lands at exactly one set width. GSAP drives
		// the x position directly and wraps it modulo the real set pixel width,
		// guaranteeing a seamless loop on every frame.
		const leftInner  = sectionEl.querySelector<HTMLElement>('.rosterc-scroll-left');
		const rightInner = sectionEl.querySelector<HTMLElement>('.rosterc-scroll-right');

		// scrollWidth / 4 = one set's actual rendered pixel width (incl. gaps)
		const setW_L = leftInner  ? leftInner.scrollWidth  / 4 : 0;
		const setW_R = rightInner ? rightInner.scrollWidth / 4 : 0;

		// Speed: px per 60fps frame (delta-normalised below)
		const SPD_L = 1.5, SPD_R = 1.15;
		let xL = 0, xR = -setW_R;
		let paused = false;

		const tick = (_t: number, delta: number) => {
			if (paused || rm) return;
			const dt = delta / (1000 / 60); // normalise to 60 fps
			xL -= SPD_L * dt;
			xR += SPD_R * dt;
			if (xL <= -setW_L) xL += setW_L;
			if (xR >= 0)       xR -= setW_R;
			if (leftInner)  gsap.set(leftInner,  { x: xL });
			if (rightInner) gsap.set(rightInner, { x: xR });
		};
		gsap.ticker.add(tick);

		// ── Marquee hover pause ───────────────────────────────────────────────
		const zone = sectionEl.querySelector<HTMLElement>('.rosterc-marquee-zone');
		const onZoneEnter = () => { paused = true; };
		const onZoneLeave = () => { paused = false; };
		zone?.addEventListener('mouseenter', onZoneEnter);
		zone?.addEventListener('mouseleave', onZoneLeave);
		cleanups.push(() => {
			zone?.removeEventListener('mouseenter', onZoneEnter);
			zone?.removeEventListener('mouseleave', onZoneLeave);
		});

		// ── Magnetic stat cards ───────────────────────────────────────────────
		const statCards = sectionEl.querySelectorAll<HTMLElement>('.rosterc-stat');
		statCards.forEach(card => {
			const onMove = (e: MouseEvent) => {
				const r = card.getBoundingClientRect();
				const x = (e.clientX - r.left  - r.width  / 2) / r.width;
				const y = (e.clientY - r.top   - r.height / 2) / r.height;
				gsap.to(card, { x: x * 14, y: y * 8, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
			};
			const onLeave = () => {
				gsap.to(card, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)', overwrite: 'auto' });
			};
			card.addEventListener('mousemove', onMove);
			card.addEventListener('mouseleave', onLeave);
			cleanups.push(() => {
				card.removeEventListener('mousemove', onMove);
				card.removeEventListener('mouseleave', onLeave);
			});
		});

		return () => {
			gsap.ticker.remove(tick);
			tweens.forEach(t => t.kill());
			cleanups.forEach(fn => fn());
		};
	});
</script>

<!-- ─── VERSION C: Dual marquee + dark stat cards ─────────────────────────── -->
<section
	bind:this={sectionEl}
	class="py-28 sm:py-36 lg:py-48 bg-[#F4F0E8]"
>
	<!-- Outer max-width container -->
	<div class="max-w-[1320px] mx-auto px-6 lg:px-10">

		<!-- ── Header ────────────────────────────────────────────────────────── -->
		<div class="mb-24">

			<!-- Chip — above everything -->
			<div class="rosterc-chip mb-8">
				<Chip theme="light" spin="always" innerClass="px-6 py-2">
					<span class="text-[11px] font-mono tracking-widest text-neutral-500 uppercase">Client Work</span>
				</Chip>
			</div>

			<!-- Heading left + meta right — same baseline row -->
			<div class="flex items-end justify-between gap-10">
				<h2 class="leading-[1.05] tracking-[-0.03em] flex-1 min-w-0" style="font-size: clamp(2rem, 3.8vw, 3.5rem);">
					<span class="rosterc-line block overflow-hidden pb-[0.12em]">
						<span class="rosterc-inner block font-black text-black">Built with Real Teams.</span>
					</span>
					<span class="rosterc-line block overflow-hidden pb-[0.12em]">
						<span class="rosterc-inner block font-medium text-black/30">Client work that shipped.</span>
					</span>
				</h2>

				<!-- Meta — aligns to bottom of heading -->
				<p class="rosterc-meta text-sm font-mono tracking-wide text-neutral-400 leading-loose text-right shrink-0">
					6 production teams<br/>
					7+ years<br/>
					Product, Design &amp; Frontend
				</p>
			</div>
		</div>
	</div>

	<!-- ── Dual marquee — full bleed edge-to-edge ──────────────────────────── -->
	<div
		class="rosterc-marquee-zone overflow-hidden select-none"
		style="
			mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
			-webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
		"
	>
		<!-- Track 1: company names → left, bold -->
		<div class="rosterc-track-wrap border-y border-black/[0.07] py-7">
			<div class="rosterc-scroll-left flex items-center gap-12 whitespace-nowrap">
				{#each [...companies, ...companies, ...companies, ...companies] as name}
					<span
						class="font-black tracking-[-0.02em] text-black leading-none"
						style="font-size: clamp(1.4rem, 2.6vw, 2.25rem);"
					>{name}</span>
					<span class="w-[5px] h-[5px] rounded-full bg-black/20 shrink-0"></span>
				{/each}
			</div>
		</div>

		<!-- Track 2: roles → right (reverse direction), lighter weight -->
		<div class="rosterc-track-wrap border-b border-black/[0.07] py-7">
			<div class="rosterc-scroll-right flex items-center gap-12 whitespace-nowrap">
				{#each [...roles, ...roles, ...roles, ...roles] as role}
					<span
						class="font-normal tracking-tight text-black/30 leading-none"
						style="font-size: clamp(1.4rem, 2.6vw, 2.25rem);"
					>{role}</span>
					<span class="w-[5px] h-[5px] rounded-full bg-black/12 shrink-0"></span>
				{/each}
			</div>
		</div>
	</div>

	<!-- ── Stat cards — dark on light bg ───────────────────────────────────── -->
	<div class="max-w-[1320px] mx-auto px-6 lg:px-10 mt-20">
		<div class="rosterc-stats grid grid-cols-2 lg:grid-cols-4 gap-4">
			{#each stats as stat}
				<div
					class="rosterc-stat bg-[#111] rounded-2xl px-9 py-9 flex flex-col gap-5"
				>
					<span class="text-[3rem] font-black tracking-tighter text-white leading-none tabular-nums">{stat.value}</span>
					<span class="text-xs font-mono tracking-[0.16em] text-white/60 uppercase">{stat.label}</span>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	/* GSAP drives transform — only need GPU hint */
	.rosterc-scroll-left,
	.rosterc-scroll-right {
		will-change: transform;
	}
</style>
