<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	let sectionEl: HTMLElement;
	let ctx: gsap.Context;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (rm) return;

		ctx = gsap.context(() => {
			gsap.set('.sc-line-inner', { yPercent: 110 });
			gsap.set('.sc-eyebrow', { opacity: 0, y: 14 });
			gsap.set('.sc-chips', { opacity: 0, y: 12 });
			gsap.set('.sc-ledger-col', { opacity: 0, y: 24 });

			gsap.timeline({ scrollTrigger: { trigger: sectionEl, start: 'top 78%', once: true } })
				.to('.sc-eyebrow', { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' })
				.to('.sc-line-inner', { yPercent: 0, duration: 0.9, stagger: 0.09, ease: 'power4.out' }, '-=0.25')
				.to('.sc-chips', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.5')
				.to('.sc-ledger-col', { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power3.out' }, '-=0.35');

			const videoWraps = Array.from(sectionEl.querySelectorAll<HTMLElement>('.sc-video-wrap'));
			gsap.set(videoWraps, { opacity: 0, y: 28, scale: 0.97 });
			videoWraps.forEach((wrap, i) => {
				gsap.to(wrap, {
					opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power3.out',
					delay: i * 0.08,
					scrollTrigger: { trigger: wrap, start: 'top 88%', once: true },
				});
			});
		}, sectionEl);

		return () => ctx?.revert();
	});

	// ── 3 × fully independent video state ────────────────────────────────────
	let video1El: HTMLVideoElement;
	let video2El: HTMLVideoElement;
	let video3El: HTMLVideoElement;
	let wrapper1El: HTMLElement;
	let wrapper2El: HTMLElement;
	let wrapper3El: HTMLElement;

	let isPaused1 = $state(true);
	let currentTime1 = $state(0);
	let duration1 = $state(0);

	let isPaused2 = $state(true);
	let currentTime2 = $state(0);
	let duration2 = $state(0);

	let isPaused3 = $state(true);
	let currentTime3 = $state(0);
	let duration3 = $state(0);

	function toggle1() { isPaused1 = !isPaused1; }
	function back1() { currentTime1 = Math.max(0, currentTime1 - 5); }
	function fwd1() { if (video1El) currentTime1 = Math.min(duration1, currentTime1 + 10); }

	function toggle2() { isPaused2 = !isPaused2; }
	function back2() { currentTime2 = Math.max(0, currentTime2 - 5); }
	function fwd2() { if (video2El) currentTime2 = Math.min(duration2, currentTime2 + 10); }

	function toggle3() { isPaused3 = !isPaused3; }
	function back3() { currentTime3 = Math.max(0, currentTime3 - 5); }
	function fwd3() { if (video3El) currentTime3 = Math.min(duration3, currentTime3 + 10); }

	function toggleFullScreen(wrapper: HTMLElement) {
		if (!document.fullscreenElement) {
			wrapper.requestFullscreen().catch(err => console.error(err));
		} else {
			document.exitFullscreen();
		}
	}

	function formatTime(seconds: number) {
		if (isNaN(seconds) || seconds < 0) return '00:00';
		const m = Math.floor(seconds / 60).toString().padStart(2, '0');
		const s = Math.floor(seconds % 60).toString().padStart(2, '0');
		return `${m}:${s}`;
	}
</script>

<style>
	input[type='range'] { accent-color: #2244CC; }
	input[type='range']:hover { accent-color: #ffffff; }
	@keyframes ripple {
		0%   { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.5); }
		70%  { box-shadow: 0 0 0 7px rgba(74, 222, 128, 0); }
		100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
	}
	.dot-ripple { animation: ripple 2.5s ease-out infinite; border-radius: 9999px; }
	.full-bleed {
		width: 100vw;
		position: relative;
		left: 50%;
		right: 50%;
		margin-left: -50vw;
		margin-right: -50vw;
	}
	@keyframes text-glow {
		0%   { text-shadow: 0 0 0px  rgba(61,204,17,0),    0 0 0px  rgba(61,204,17,0); }
		35%  { text-shadow: 0 0 8px  rgba(61,204,17,0.28), 0 0 18px rgba(61,204,17,0.10); }
		50%  { text-shadow: 0 0 16px rgba(61,204,17,0.48), 0 0 36px rgba(61,204,17,0.16), 0 0 60px rgba(61,204,17,0.06); }
		65%  { text-shadow: 0 0 8px  rgba(61,204,17,0.28), 0 0 18px rgba(61,204,17,0.10); }
		100% { text-shadow: 0 0 0px  rgba(61,204,17,0),    0 0 0px  rgba(61,204,17,0); }
	}
	.text-glow { animation: text-glow 4s cubic-bezier(0.45,0,0.55,1) infinite; }
</style>

<section bind:this={sectionEl} class="w-full bg-white pt-24 pb-20 overflow-x-hidden">
	<div class="max-w-7xl mx-auto px-4 md:px-6">

		<!-- ── Row 1: Title LEFT / Chips RIGHT ───────────────────────────── -->
		<p class="sc-eyebrow text-[10px] font-mono tracking-[0.35em] text-neutral-400 uppercase mb-4">Performance Optimization</p>
		<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
			<h2 class="text-[clamp(2.4rem,6vw,4.5rem)] font-black tracking-tight text-gray-900 leading-[1.10]">
				<span class="block overflow-hidden pb-[0.08em] mb-[-0.2em]"><span class="sc-line-inner block">Critical.</span></span>
				<span class="block overflow-hidden pb-[0.08em] mb-[-0.2em]"><span class="sc-line-inner block text-neutral-300">Fast.</span></span>
				<span class="block overflow-hidden pb-[0.08em]"><span class="sc-line-inner block">Clean.</span></span>
			</h2>
			<div class="sc-chips flex flex-row sm:flex-col items-center sm:items-end gap-2 shrink-0 flex-wrap">
				<div class="relative">
					<span class="px-3 py-1.5 bg-gray-100 text-gray-500 text-[10px] font-mono uppercase tracking-widest rounded-full block">Critical CSS</span>
					<span class="absolute -top-2 -right-1 bg-neutral-900 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full leading-none">NEW</span>
				</div>
				<div class="relative">
					<span class="px-3 py-1.5 bg-gray-100 text-gray-500 text-[10px] font-mono uppercase tracking-widest rounded-full block">Defer JS</span>
					<span class="absolute -top-2 -right-1 bg-neutral-900 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full leading-none">NEW</span>
				</div>
				<span class="px-3 py-1.5 bg-gray-100 text-gray-500 text-[10px] font-mono uppercase tracking-widest rounded-full">Asset Optimization</span>
			</div>
		</div>

		<!-- ── Row 2: Data Ledger ─────────────────────────────────────────── -->
		<div class="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.6fr] border-t border-b border-gray-200 mb-0">

			<!-- Col 1 — Page Load Speed -->
			<div class="sc-ledger-col py-10 md:pr-10 md:border-r border-gray-200 border-b md:border-b-0 flex flex-col justify-between">
				<span class="text-[10px] font-mono tracking-[0.18em] text-gray-500 uppercase block mb-4">Page Load Speed</span>
				<div>
					<div class="flex items-baseline leading-none mb-3">
						<span class="text-[clamp(2.5rem,7vw,4.5rem)] font-black text-neutral-300 tracking-tighter leading-none line-through decoration-portfolio-error">5–6s</span>
						<span class="text-[#6B7280] font-black text-[clamp(1.8rem,5vw,3rem)] mx-2 leading-none">→</span>
						<span class="text-[clamp(2.5rem,7vw,4.5rem)] font-black text-neutral-900 tracking-tighter leading-none">&lt;1s</span>
					</div>
					<p class="text-sm text-gray-600 leading-relaxed max-w-[18ch]">
						Measured across 20+ live WordPress deployments with varied plugin stacks.
					</p>
				</div>
			</div>

			<!-- Col 2 — Performance Gain -->
			<div class="sc-ledger-col py-10 md:px-10 md:border-r border-gray-200 border-b md:border-b-0 flex flex-col justify-between">
				<span class="text-[10px] font-mono tracking-[0.18em] text-gray-500 uppercase block mb-4">Performance Gain</span>
				<div>
					<div class="flex items-baseline leading-none mb-3">
						<span class="text-[clamp(4rem,10vw,6.5rem)] font-black text-neutral-900 tracking-tighter leading-none">75</span>
						<span class="text-[clamp(2.5rem,6vw,4rem)] font-black text-gray-900 tracking-tighter leading-none">%</span>
					</div>
					<p class="text-sm text-gray-600 leading-relaxed max-w-[18ch]">
						Faster page renders via Critical CSS generation and JS Defer automation.
					</p>
				</div>
			</div>

			<!-- Col 3 — Body copy -->
			<div class="sc-ledger-col py-10 md:pl-10 flex flex-col justify-center">
				<p class="text-lg md:text-xl text-gray-600 leading-relaxed mb-5">
					Users were confused about which optimizations were active. We redesigned Hummingbird to show live status inline with every feature — Critical CSS, Delay JS, Asset Optimization — so the interface answers the question before anyone thinks to ask it.
				</p>
				<p class="text-base text-gray-600 leading-relaxed">
					Progressive disclosure kept power features accessible without overwhelming beginners. The new <span class="text-gray-600 font-medium">SUI 3 Atomic components</span> unified every setting panel with a consistent visual language.
				</p>
			</div>

		</div>

	</div>

	<!-- ── VIDEO 1: Hummingbird SUI 3 ───────────────────────────── -->
	<div class="max-w-7xl mx-auto px-4 md:px-6 mt-12">
		<div class="sc-video-wrap bg-transparent rounded-3xl border border-neutral-300/70
		            shadow-[0_12px_48px_rgba(0,0,0,0.11),0_2px_8px_rgba(0,0,0,0.05)]
		            p-2">
			<div class="relative overflow-hidden rounded-2xl bg-black group"
			     bind:this={wrapper1El}>

				<div class="absolute top-5 left-6 z-40 flex items-center gap-3
				            bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-4 py-2">
					<span class="w-1.5 h-1.5 rounded-full bg-portfolio-accent-vivid animate-pulse shrink-0"></span>
					<span class="text-[10px] font-mono tracking-widest text-white/70 uppercase">Redesigned UI · Hummingbird SUI&nbsp;3</span>
				</div>

				<!-- svelte-ignore a11y_media_has_caption -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<video
					bind:this={video1El}
					bind:paused={isPaused1}
					bind:currentTime={currentTime1}
					bind:duration={duration1}
					src="/videos/HB.mp4"
					class="w-full h-auto object-cover aspect-video cursor-pointer transform-gpu will-change-transform"
					playsinline
					preload="metadata"
					muted
					onclick={toggle1}
				></video>

				<div class="absolute bottom-5 inset-x-5 flex flex-col gap-3 px-5 py-4 rounded-2xl
				            bg-black/60 backdrop-blur-xl border border-white/10
				            opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0
				            transition-all duration-500 ease-out">
					<div class="flex items-center gap-4 w-full">
						<span class="text-white/70 text-[10px] font-mono w-8 text-right">{formatTime(currentTime1)}</span>
						<input type="range" aria-label="Seek" min="0" max={duration1 || 100} step="0.01" bind:value={currentTime1}
							class="flex-1 h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer transition-all" />
						<span class="text-white/70 text-[10px] font-mono w-8">{formatTime(duration1)}</span>
					</div>
					<div class="flex items-center justify-between w-full">
						<div class="flex items-center gap-6">
							<button aria-label="Skip back 5 seconds" onclick={back1} class="text-white/80 hover:text-white transition-colors flex items-center gap-1 group/btn">
								<svg class="w-5 h-5 group-active/btn:-rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"/></svg>
								<span class="text-[10px] font-mono tracking-widest mt-1">-5s</span>
							</button>
							<button aria-label={isPaused1 ? "Play" : "Pause"} onclick={toggle1} class="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
								{#if isPaused1}
									<svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
								{:else}
									<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
								{/if}
							</button>
							<button aria-label="Skip forward 10 seconds" onclick={fwd1} class="text-white/80 hover:text-white transition-colors flex items-center gap-1 group/btn">
								<span class="text-[10px] font-mono tracking-widest mt-1">+10s</span>
								<svg class="w-5 h-5 group-active/btn:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.334-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.334-4z"/></svg>
							</button>
						</div>
						<button aria-label="Toggle fullscreen" onclick={() => toggleFullScreen(wrapper1El)} class="text-white/80 hover:text-white transition-colors">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
						</button>
					</div>
				</div>

			</div>
		</div>
	</div>

	<!-- ── RESEARCH CONTEXT ─────────────────────────────────────────────── -->
	<div class="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
		<div class="rounded-3xl overflow-hidden shadow-[0_16px_64px_rgba(0,0,0,0.12)]">

			<!-- Core finding + quote -->
			<div class="bg-black px-8 md:px-12 py-10 border-b border-white/5">
				<div class="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10">
					<div class="flex flex-col justify-between gap-6">
						<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase">Core research finding · Hummingbird</span>
						<p class="text-[clamp(1.3rem,3.2vw,2rem)] font-black text-white leading-snug">
							Users weren't failing at optimization.<br/>
							They were failing at <span class="shimmer-red">trust.</span>
						</p>
						<div class="flex flex-wrap gap-2">
							<span class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-neutral-400 uppercase tracking-widest">214 surveys</span>
							<span class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-neutral-400 uppercase tracking-widest">8 sessions</span>
							<span class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-neutral-400 uppercase tracking-widest">Hummingbird beta</span>
						</div>
					</div>
					<blockquote class="bg-white/3 rounded-2xl px-6 py-6 flex flex-col justify-between gap-5">
						<span class="text-portfolio-accent-vivid text-3xl font-black leading-none">"</span>
						<p class="text-sm text-neutral-300 italic leading-relaxed -mt-2">
							I set it up, it said done, but pages were still slow. I turned everything off thinking it wasn't working.
						</p>
						<span class="text-[9px] font-mono text-neutral-500">User 4 · Session recording · Hummingbird beta</span>
					</blockquote>
				</div>
			</div>

			<!-- Severity signal cards -->
			<div class="bg-neutral-950 px-8 md:px-12 py-8 border-b border-white/5">
				<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase block mb-5">Research signals · 214 surveys + 8 usability sessions</span>
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
					{#each [
						{ severity: 'Critical', bg: 'bg-red-950/60 border-red-800/60',     pill: 'text-red-400 bg-red-950 border-red-800/70',         stat: '67%',    insight: 'couldn\'t confirm optimization was active post-setup',         tag: 'Visibility gap' },
						{ severity: 'Critical', bg: 'bg-red-950/60 border-red-800/60',     pill: 'text-red-400 bg-red-950 border-red-800/70',         stat: '#1',     insight: 'support category: "is this even working?" before inline status', tag: 'Trust failure' },
						{ severity: 'High',     bg: 'bg-amber-950/50 border-amber-800/50', pill: 'text-amber-400 bg-amber-950/80 border-amber-800/60', stat: '3 of 8', insight: 'session users disabled features they thought were broken',       tag: 'False negative' },
						{ severity: 'High',     bg: 'bg-amber-950/50 border-amber-800/50', pill: 'text-amber-400 bg-amber-950/80 border-amber-800/60', stat: '4.2m',   insight: 'avg time wasted re-checking already-configured settings',       tag: 'Wasted effort' },
						{ severity: 'Medium',   bg: 'bg-neutral-800/50 border-neutral-700',pill: 'text-neutral-400 bg-neutral-800 border-neutral-700', stat: 'v2',    insight: 'only had CSS Minify + basic JS toggle — no Critical CSS, no JS Defer', tag: 'Capability gap' },
						{ severity: 'Medium',   bg: 'bg-neutral-800/50 border-neutral-700',pill: 'text-neutral-400 bg-neutral-800 border-neutral-700', stat: '0',     insight: 'visual difference between "optimizing" and "idle" states in v2', tag: 'State clarity' },
					] as card}
						<div class="rounded-2xl border {card.bg} px-5 py-5 flex flex-col gap-3">
							<div class="flex items-center justify-between">
								<span class="text-[8px] font-mono tracking-widest text-neutral-500 uppercase">Finding</span>
								<span class="px-2.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest border {card.pill}">{card.severity}</span>
							</div>
							<span class="text-2xl font-black text-white tracking-tight leading-none">{card.stat}</span>
							<p class="text-xs text-neutral-400 leading-relaxed flex-1">{card.insight}</p>
							<span class="text-[8px] font-mono tracking-widest text-neutral-500 uppercase border-t border-white/5 pt-2.5 mt-auto">{card.tag}</span>
						</div>
					{/each}
				</div>
			</div>

			<!-- Hypothesis strip -->
			<div class="bg-neutral-900 px-8 md:px-12 py-7 border-b border-white/5">
				<div class="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
					<div class="shrink-0 flex items-center gap-2 md:pt-0.5">
						<div class="w-1.5 h-1.5 rounded-full bg-portfolio-accent-vivid animate-pulse shrink-0"></div>
						<span class="text-[9px] font-bold font-mono tracking-[0.3em] text-portfolio-accent-vivid uppercase">Hypothesis</span>
					</div>
					<div class="hidden md:block w-px h-10 bg-white/10 shrink-0"></div>
					<p class="text-base font-semibold text-white leading-relaxed">
						Making status visible inline — and shipping Critical CSS + JS Defer as default-on replacements for CSS Minify and the basic JS toggle — would eliminate the trust gap and reduce the support burden.
					</p>
				</div>
			</div>

			<!-- Orange divider -->
			<div class="h-[3px] bg-portfolio-accent w-full"></div>

			<!-- White bottom: What we changed + Proof -->
			<div class="bg-white px-8 md:px-12 pt-10 pb-6 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10">

				<div class="flex flex-col gap-5">
					<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-400 uppercase">What we changed</span>
					<div class="space-y-5">
						{#each [
							{ n: '01', action: 'Inline status on every control',  detail: 'Critical CSS generation state, JS Defer exclusion counts, compression ratios — surfaced next to each control, always visible.' },
							{ n: '02', action: 'Critical CSS · New, default on',  detail: 'Replaced CSS Minify. Auto-generates above-the-fold styles. Enabled by default for all new installs.' },
							{ n: '03', action: 'JS Defer · New, default on',       detail: 'Replaced basic JS optimization. Safe script deferral with built-in exclusion logic from day one.' },
							{ n: '04', action: 'Progressive disclosure',           detail: 'Clean surface for beginners. Full control accessible one level deeper for power users.' },
						] as step}
							<div class="flex gap-4">
								<span class="text-[#6B7280] text-[11px] font-black font-mono shrink-0 mt-0.5">{step.n}</span>
								<div>
									<p class="text-sm font-bold text-neutral-900 leading-snug mb-1">{step.action}</p>
									<p class="text-xs text-neutral-500 leading-relaxed">{step.detail}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<div class="flex flex-col gap-5">
					<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-400 uppercase">Post-launch proof</span>
					<div class="grid grid-cols-2 gap-3">
						{#each [
							{ stat: '<1s',  label: 'Page load',       sub: 'from 5–6s' },
							{ stat: '+75%', label: 'Performance',     sub: '20+ deployments' },
							{ stat: '−42%', label: 'Support tickets', sub: '"not working"' },
							{ stat: '−37%', label: 'Bounce rate',     sub: 'post-launch' },
						] as m}
							<div class="bg-neutral-950 rounded-xl px-4 py-4 border border-neutral-800">
								<span class="text-[clamp(1.4rem,3vw,2rem)] font-black text-portfolio-success tracking-tight leading-none block">{m.stat}</span>
								<span class="text-xs font-semibold text-white block mt-1">{m.label}</span>
								<span class="text-[10px] text-neutral-500">{m.sub}</span>
							</div>
						{/each}
					</div>
					<div class="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
						<div class="dot-ripple w-2 h-2 bg-green-500 shrink-0 mt-0.5"></div>
						<p class="text-xs font-semibold text-green-700 leading-snug">Hypothesis confirmed — "not working" tickets dropped 42%. Users stopped disabling active features within 2 weeks of launch.</p>
					</div>
				</div>

			</div>

			<!-- Full-width note strip -->
			<div class="bg-white px-8 md:px-12 pb-10 border-t border-neutral-100 pt-5">
				<div class="flex items-start gap-3 bg-neutral-50 border border-neutral-200 rounded-xl px-5 py-4">
					<div class="w-2 h-2 rounded-full bg-neutral-300 shrink-0 mt-0.5"></div>
					<p class="text-[10px] text-neutral-500 leading-snug">Measured across 20+ live WordPress deployments with varied plugin stacks.</p>
				</div>
			</div>

		</div>
	</div>

	<!-- ── VIDEOS 2 & 3: Figma vs Live — 50/50 comparison ───────────────── -->
	<div class="max-w-7xl mx-auto px-4 md:px-6">

		<!-- Section label -->
		<div class="flex items-center gap-4 mb-10">
			<span class="text-[10px] font-mono tracking-[0.18em] text-gray-400 uppercase">Design → Production</span>
			<div class="flex-1 h-px bg-gray-200"></div>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">

			<!-- Left — Video 2: Figma Prototype -->
			<div>
				<p class="text-xs font-mono tracking-widest text-gray-500 mb-4">01 // Figma Design · CSS Info &amp; Tags</p>
				<div class="sc-video-wrap bg-transparent rounded-3xl border border-neutral-300/70
				            shadow-[0_12px_48px_rgba(0,0,0,0.11),0_2px_8px_rgba(0,0,0,0.05)]
				            p-2">
					<div class="relative overflow-hidden rounded-2xl bg-black group"
					     bind:this={wrapper2El}>

						<div class="absolute top-4 left-5 z-40 flex items-center gap-3
						            bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
							<span class="w-1.5 h-1.5 rounded-full bg-portfolio-accent-vivid animate-pulse shrink-0"></span>
							<span class="text-[10px] font-mono tracking-widest text-white/70 uppercase">CSS Info Icons · Figma</span>
						</div>

						<!-- svelte-ignore a11y_media_has_caption -->
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
						<video
							bind:this={video2El}
							bind:paused={isPaused2}
							bind:currentTime={currentTime2}
							bind:duration={duration2}
							src="/videos/HB%20CSS%20_Info%20icons%20with%20Tags_%20SUI%202.mp4"
							class="w-full h-auto object-cover aspect-video cursor-pointer transform-gpu will-change-transform"
							playsinline
							preload="metadata"
							muted
							onclick={toggle2}
						></video>

						<div class="absolute bottom-4 inset-x-4 flex flex-col gap-3 px-4 py-3.5 rounded-2xl
						            bg-black/60 backdrop-blur-xl border border-white/10
						            opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0
						            transition-all duration-500 ease-out">
							<div class="flex items-center gap-3 w-full">
								<span class="text-white/70 text-[10px] font-mono w-8 text-right">{formatTime(currentTime2)}</span>
								<input type="range" aria-label="Seek" min="0" max={duration2 || 100} step="0.01" bind:value={currentTime2}
									class="flex-1 h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer" />
								<span class="text-white/70 text-[10px] font-mono w-8">{formatTime(duration2)}</span>
							</div>
							<div class="flex items-center justify-between w-full">
								<div class="flex items-center gap-5">
									<button aria-label="Skip back 5 seconds" onclick={back2} class="text-white/80 hover:text-white transition-colors flex items-center gap-1 group/btn">
										<svg class="w-4 h-4 group-active/btn:-rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"/></svg>
										<span class="text-[10px] font-mono tracking-widest mt-1">-5s</span>
									</button>
									<button onclick={toggle2} class="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
										{#if isPaused2}
											<svg class="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
										{:else}
											<svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
										{/if}
									</button>
									<button aria-label="Skip forward 10 seconds" onclick={fwd2} class="text-white/80 hover:text-white transition-colors flex items-center gap-1 group/btn">
										<span class="text-[10px] font-mono tracking-widest mt-1">+10s</span>
										<svg class="w-4 h-4 group-active/btn:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.334-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.334-4z"/></svg>
									</button>
								</div>
								<button aria-label="Toggle fullscreen" onclick={() => toggleFullScreen(wrapper2El)} class="text-white/80 hover:text-white transition-colors">
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
								</button>
							</div>
						</div>

					</div>
				</div>
			</div>

			<!-- Right — Video 3: Live SUI 2 Beta -->
			<div>
				<p class="text-xs font-mono tracking-widest text-gray-500 mb-4">02 // Live Beta · Critical CSS SUI&nbsp;2</p>
				<div class="sc-video-wrap bg-transparent rounded-3xl border border-neutral-300/70
				            shadow-[0_12px_48px_rgba(0,0,0,0.11),0_2px_8px_rgba(0,0,0,0.05)]
				            p-2">
					<div class="relative overflow-hidden rounded-2xl bg-black group"
					     bind:this={wrapper3El}>

						<div class="absolute top-4 left-5 z-40 flex items-center gap-3
						            bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
							<span class="w-1.5 h-1.5 rounded-full bg-portfolio-accent-vivid animate-pulse shrink-0"></span>
							<span class="text-[10px] font-mono tracking-widest text-white/70 uppercase">Critical CSS · Live Beta</span>
						</div>

						<!-- svelte-ignore a11y_media_has_caption -->
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
						<video
							bind:this={video3El}
							bind:paused={isPaused3}
							bind:currentTime={currentTime3}
							bind:duration={duration3}
							src="/videos/HB%20Critical%20CSS%20New%20beta.mp4"
							class="w-full h-auto object-cover aspect-video cursor-pointer transform-gpu will-change-transform"
							playsinline
							preload="metadata"
							muted
							onclick={toggle3}
						></video>

						<div class="absolute bottom-4 inset-x-4 flex flex-col gap-3 px-4 py-3.5 rounded-2xl
						            bg-black/60 backdrop-blur-xl border border-white/10
						            opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0
						            transition-all duration-500 ease-out">
							<div class="flex items-center gap-3 w-full">
								<span class="text-white/70 text-[10px] font-mono w-8 text-right">{formatTime(currentTime3)}</span>
								<input type="range" aria-label="Seek" min="0" max={duration3 || 100} step="0.01" bind:value={currentTime3}
									class="flex-1 h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer" />
								<span class="text-white/70 text-[10px] font-mono w-8">{formatTime(duration3)}</span>
							</div>
							<div class="flex items-center justify-between w-full">
								<div class="flex items-center gap-5">
									<button aria-label="Skip back 5 seconds" onclick={back3} class="text-white/80 hover:text-white transition-colors flex items-center gap-1 group/btn">
										<svg class="w-4 h-4 group-active/btn:-rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"/></svg>
										<span class="text-[10px] font-mono tracking-widest mt-1">-5s</span>
									</button>
									<button onclick={toggle3} class="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
										{#if isPaused3}
											<svg class="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
										{:else}
											<svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
										{/if}
									</button>
									<button aria-label="Skip forward 10 seconds" onclick={fwd3} class="text-white/80 hover:text-white transition-colors flex items-center gap-1 group/btn">
										<span class="text-[10px] font-mono tracking-widest mt-1">+10s</span>
										<svg class="w-4 h-4 group-active/btn:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.334-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.334-4z"/></svg>
									</button>
								</div>
								<button aria-label="Toggle fullscreen" onclick={() => toggleFullScreen(wrapper3El)} class="text-white/80 hover:text-white transition-colors">
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
								</button>
							</div>
						</div>

					</div>
				</div>
			</div>

		</div>
	</div>

</section>
