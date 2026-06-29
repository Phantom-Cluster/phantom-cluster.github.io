<script lang="ts">
	let videoElement: HTMLVideoElement;
	let playerWrapper: HTMLElement;

	let isPaused = $state(true);
	let currentTime = $state(0);
	let duration = $state(0);

	function togglePlay() { isPaused = !isPaused; }
	function skipBackward() { currentTime = Math.max(0, currentTime - 5); }
	function skipForward() { if (videoElement) currentTime = Math.min(duration, currentTime + 10); }

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
	@keyframes shimmer-bar {
		0%   { background-position: 200% center; }
		100% { background-position: -200% center; }
	}
	.shimmer-num {
		background: linear-gradient(90deg, #1a1a1a 25%, #4a4a4a 50%, #1a1a1a 75%);
		background-size: 200% auto;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: shimmer-bar 5s cubic-bezier(0.45,0,0.55,1) infinite;
	}
	.shimmer-red {
		background: linear-gradient(90deg, #7a1010 20%, #EF4444 50%, #7a1010 80%);
		background-size: 200% auto;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: shimmer-bar 4s cubic-bezier(0.45,0,0.55,1) infinite;
	}
</style>

<section class="w-full bg-white pt-24 pb-20 overflow-x-hidden">
	<div class="max-w-7xl mx-auto px-4 md:px-6">

		<!-- ── Row 1: Title LEFT / Chips RIGHT ───────────────────── -->
		<p class="text-[10px] font-mono tracking-[0.35em] text-neutral-400 uppercase mb-4">Design System</p>
		<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
			<h2 class="text-[clamp(2.8rem,7vw,5.5rem)] font-black tracking-tight text-gray-900 leading-none">
				Re&#8209;Engineering<br/>the Core.
			</h2>
			<div class="flex flex-row sm:flex-col items-center sm:items-end gap-2 shrink-0 flex-wrap">
				<span class="px-3 py-1.5 bg-gray-100 text-gray-500 text-[10px] font-mono uppercase tracking-widest rounded-full">Architecture</span>
				<span class="px-3 py-1.5 bg-gray-100 text-gray-500 text-[10px] font-mono uppercase tracking-widest rounded-full">Figma Variables</span>
				<span class="px-3 py-1.5 bg-gray-100 text-gray-500 text-[10px] font-mono uppercase tracking-widest rounded-full">SUI 3 Atomic</span>
			</div>
		</div>

		<!-- ── Row 2: Data Ledger ─────────────────────────────────── -->
		<div class="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.6fr] border-t border-b border-gray-200 mb-0">

			<!-- Col 1 — Components Audited -->
			<div class="py-10 pr-10 md:border-r border-gray-200 border-b md:border-b-0 flex flex-col justify-between">
				<span class="text-[10px] font-mono tracking-[0.18em] text-gray-500 uppercase block mb-4">Components Audited</span>
				<div>
					<div class="flex items-baseline leading-none mb-3">
						<span class="shimmer-num text-[clamp(4rem,10vw,6.5rem)] font-black tracking-tighter leading-none">200</span>
						<span class="text-[clamp(2.5rem,6vw,4rem)] font-black text-neutral-400 tracking-tighter leading-none">+</span>
					</div>
					<p class="text-sm text-gray-600 leading-relaxed max-w-[18ch]">
						Existing UI patterns mapped before a single new component was built.
					</p>
				</div>
			</div>

			<!-- Col 2 — Design Tokens -->
			<div class="py-10 md:px-10 md:border-r border-gray-200 border-b md:border-b-0 flex flex-col justify-between">
				<span class="text-[10px] font-mono tracking-[0.18em] text-gray-500 uppercase block mb-4">Design Tokens</span>
				<div>
					<div class="flex items-baseline leading-none mb-3">
						<span class="text-[clamp(4rem,10vw,6.5rem)] font-black text-neutral-900 tracking-tighter leading-none">80</span>
						<span class="text-[clamp(2.5rem,6vw,4rem)] font-black text-gray-900 tracking-tighter leading-none">+</span>
					</div>
					<p class="text-sm text-gray-600 leading-relaxed max-w-[18ch]">
						Figma Variables covering colour, spacing, radius, and type across all plugins.
					</p>
				</div>
			</div>

			<!-- Col 3 — Body copy -->
			<div class="py-10 md:pl-10 flex flex-col justify-center">
				<p class="text-lg md:text-xl text-gray-600 leading-relaxed mb-5">
					The technical debt was manifesting as high cognitive load — users couldn't find what mattered. We stripped the UI to its atomic elements to build a system that scales across all Smush and Hummingbird deployments.
				</p>
				<p class="text-base text-gray-600 leading-relaxed">
					Before redesigning any screen, we mapped every component into a unified token system: <span class="text-gray-600 font-medium">SUI 3 Atomic Design</span>. Only then did we refactor the flows.
				</p>
			</div>

		</div>

	</div>

	<!-- ── VIDEO 1 ──────────────────────────────────────────── -->
	<div class="max-w-7xl mx-auto px-4 md:px-6 mt-12">
		<div class="bg-transparent rounded-3xl border border-neutral-300/70
		            shadow-[0_12px_48px_rgba(0,0,0,0.11),0_2px_8px_rgba(0,0,0,0.05)]
		            p-2">
			<div class="relative overflow-hidden rounded-2xl bg-black group"
			     bind:this={playerWrapper}>

				<div class="absolute top-5 left-6 z-40 flex items-center gap-3
				            bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-4 py-2">
					<span class="w-1.5 h-1.5 rounded-full bg-portfolio-accent-vivid animate-pulse shrink-0"></span>
					<span class="text-[10px] font-mono tracking-widest text-white/70 uppercase">SUI&nbsp;3 · Background Rules</span>
				</div>

				<!-- svelte-ignore a11y_media_has_caption -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<video
					bind:this={videoElement}
					bind:paused={isPaused}
					bind:currentTime={currentTime}
					bind:duration={duration}
					src="/videos/SUI%203%20Navigation%20(New%20Style).mp4"
					class="w-full h-auto object-cover aspect-video cursor-pointer transform-gpu will-change-transform"
					playsinline
					preload="metadata"
					decoding="async"
					muted
					onclick={togglePlay}
				></video>

				<div class="absolute bottom-5 inset-x-5 flex flex-col gap-3 px-5 py-4 rounded-2xl
				            bg-black/60 backdrop-blur-xl border border-white/10
				            opacity-0 group-hover:opacity-100 transition-opacity duration-500">
					<div class="flex items-center gap-4 w-full">
						<span class="text-white/70 text-[10px] font-mono w-8 text-right">{formatTime(currentTime)}</span>
						<input type="range" min="0" max={duration || 100} step="0.01" bind:value={currentTime}
							aria-label="Seek" aria-valuetext="{formatTime(currentTime)} of {formatTime(duration)}"
							class="flex-1 h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer transition-all" />
						<span class="text-white/70 text-[10px] font-mono w-8">{formatTime(duration)}</span>
					</div>
					<div class="flex items-center justify-between w-full">
						<div class="flex items-center gap-6">
							<button aria-label="Skip back 5 seconds" onclick={skipBackward} class="text-white/80 hover:text-white transition-colors flex items-center gap-1 group/btn">
								<svg class="w-5 h-5 group-active/btn:-rotate-45 transition-transform" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"/></svg>
								<span class="text-[10px] font-mono tracking-widest mt-1" aria-hidden="true">-5s</span>
							</button>
							<button aria-label={isPaused ? 'Play' : 'Pause'} onclick={togglePlay} class="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
								{#if isPaused}
									<svg class="w-4 h-4 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
								{:else}
									<svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
								{/if}
							</button>
							<button aria-label="Skip forward 10 seconds" onclick={skipForward} class="text-white/80 hover:text-white transition-colors flex items-center gap-1 group/btn">
								<span class="text-[10px] font-mono tracking-widest mt-1" aria-hidden="true">+10s</span>
								<svg class="w-5 h-5 group-active/btn:rotate-45 transition-transform" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.334-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.334-4z"/></svg>
							</button>
						</div>
						<button aria-label="Toggle fullscreen" onclick={() => toggleFullScreen(playerWrapper)} class="text-white/80 hover:text-white transition-colors">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
						</button>
					</div>
				</div>

			</div>
		</div>
	</div>

	<!-- ── RESEARCH CONTEXT ─────────────────────────────────── -->
	<div class="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
		<div class="rounded-3xl overflow-hidden shadow-[0_16px_64px_rgba(0,0,0,0.12)]">

			<!-- Core finding + quote -->
			<div class="bg-black px-8 md:px-12 py-10 border-b border-white/5">
				<div class="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10">
					<div class="flex flex-col justify-between gap-6">
						<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase">Core research finding · SUI 3 Atomic</span>
						<p class="text-[clamp(1.3rem,3.2vw,2rem)] font-black text-white leading-snug">
							The inconsistency wasn't in the features.<br/>
							It was in the <span class="shimmer-red">design language.</span>
						</p>
						<div class="flex flex-wrap gap-2">
							<span class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-neutral-400 uppercase tracking-widest">200+ components audited</span>
							<span class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-neutral-400 uppercase tracking-widest">6 plugins</span>
							<span class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-neutral-400 uppercase tracking-widest">SUI 3 audit</span>
						</div>
					</div>
					<blockquote class="bg-white/3 border border-white/10 rounded-2xl px-7 pt-8 pb-7 relative overflow-hidden flex flex-col justify-between gap-8 min-h-[180px]">
						<span class="absolute -top-4 -left-2 text-[8rem] font-black leading-none select-none pointer-events-none" style="color: rgba(255,255,255,0.05);">"</span>
						<p class="text-sm text-neutral-300 italic leading-relaxed relative z-10">
							I spend more time figuring out where to click than actually using the plugin. Everything looks different.
						</p>
						<span class="self-start px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-neutral-500 relative z-10">User research · pre-SUI 3</span>
					</blockquote>
				</div>
			</div>

			<!-- Severity signal cards -->
			<div class="bg-neutral-950 px-8 md:px-12 py-8 border-b border-white/5">
				<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase block mb-5">Research signals · 200+ component audit · 6 plugin analysis</span>
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
					{#each [
						{ severity: 'Critical', bg: 'bg-red-950/60 border-red-800/60',     pill: 'text-red-400 bg-red-950 border-red-800/70',         stat: '6×',     insight: 'plugins each with siloed UI patterns — different buttons, spacing, and feedback states', tag: 'Pattern silos' },
						{ severity: 'Critical', bg: 'bg-red-950/60 border-red-800/60',     pill: 'text-red-400 bg-red-950 border-red-800/70',         stat: '43%',    insight: 'drop-off rate in the first 3 settings screens before the redesign shipped', tag: 'Onboarding drop-off' },
						{ severity: 'High',     bg: 'bg-amber-950/50 border-amber-800/50', pill: 'text-amber-400 bg-amber-950/80 border-amber-800/60', stat: '200+',   insight: 'existing components with no shared token mapping before the audit began', tag: 'Component debt' },
						{ severity: 'High',     bg: 'bg-amber-950/50 border-amber-800/50', pill: 'text-amber-400 bg-amber-950/80 border-amber-800/60', stat: '3×',     insight: 'longer to complete identical tasks across different plugins due to inconsistent affordances', tag: 'Cognitive load' },
						{ severity: 'Medium',   bg: 'bg-neutral-800/50 border-neutral-700',pill: 'text-neutral-400 bg-neutral-800 border-neutral-700', stat: '0',      insight: 'shared Figma libraries before the SUI 3 audit — each plugin had its own isolated file', tag: 'No source of truth' },
						{ severity: 'Medium',   bg: 'bg-neutral-800/50 border-neutral-700',pill: 'text-neutral-400 bg-neutral-800 border-neutral-700', stat: 'Manual', insight: 'every plugin used hand-coded spacing, color values, and radii — no token pipeline', tag: 'Token gap' },
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
						Building SUI 3 Atomic — a single token system, shared component library, and unified Figma Variables — before redesigning any plugin screen would eliminate UI inconsistency and cut onboarding drop-off across all six plugins.
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
							{ n: '01', action: 'Token architecture',           detail: '80+ Figma Variables covering color, spacing, radius, and type — a single source of truth propagated across all six plugins simultaneously.' },
							{ n: '02', action: 'Atomic component library',     detail: 'Base atoms → molecules → organisms, all connected to tokens. Every component variant tested at all breakpoints before plugin redesigns began.' },
							{ n: '03', action: 'Unified Figma Variables',      detail: 'Single library file. One variable change cascades to every plugin frame — no more per-plugin manual updates or style drift.' },
							{ n: '04', action: 'Design-to-code handoff system',detail: 'Token names matched 1:1 to SvelteKit CSS custom properties. Zero translation layer between design and production implementation.' },
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
							{ stat: '200+', label: 'Components audited', sub: 'pre-SUI 3' },
							{ stat: '80+',  label: 'Design tokens',      sub: 'Figma Variables' },
							{ stat: '6',    label: 'Plugins unified',    sub: 'one system' },
							{ stat: '−43%', label: 'Onboarding drop-off',sub: 'post-launch' },
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
						<p class="text-xs font-semibold text-green-700 leading-snug">Hypothesis confirmed — onboarding drop-off fell 43% and support tickets citing UI confusion dropped within 4 weeks of the SUI 3 rollout.</p>
					</div>
				</div>

			</div>

			<!-- Full-width note strip -->
			<div class="bg-white px-8 md:px-12 pb-10 border-t border-neutral-100 pt-5">
				<div class="flex items-start gap-3 bg-neutral-50 border border-neutral-200 rounded-xl px-5 py-4">
					<div class="w-2 h-2 rounded-full bg-neutral-300 shrink-0 mt-0.5"></div>
					<p class="text-[10px] text-neutral-500 leading-snug">Onboarding drop-off measured across new free-tier installs in the 8 weeks post-SUI 3 rollout compared to the same period prior year.</p>
				</div>
			</div>

		</div>
	</div>


</section>
