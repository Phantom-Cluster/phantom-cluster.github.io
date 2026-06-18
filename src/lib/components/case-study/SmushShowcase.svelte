<script lang="ts">
	let videoEl: HTMLVideoElement;
	let wrapperEl: HTMLElement;
	let isPaused = $state(true);
	let currentTime = $state(0);
	let duration = $state(0);

	let video2El: HTMLVideoElement;
	let wrapper2El: HTMLElement;
	let isPaused2 = $state(true);
	let currentTime2 = $state(0);
	let duration2 = $state(0);

	let video3El: HTMLVideoElement;
	let wrapper3El: HTMLElement;
	let isPaused3 = $state(true);
	let currentTime3 = $state(0);
	let duration3 = $state(0);

	function toggle() { isPaused = !isPaused; }
	function back() { currentTime = Math.max(0, currentTime - 5); }
	function fwd() { if (videoEl) currentTime = Math.min(duration, currentTime + 10); }
	function toggleFullScreen() {
		if (!document.fullscreenElement) wrapperEl.requestFullscreen().catch(console.error);
		else document.exitFullscreen();
	}

	function toggle2() { isPaused2 = !isPaused2; }
	function back2() { currentTime2 = Math.max(0, currentTime2 - 5); }
	function fwd2() { if (video2El) currentTime2 = Math.min(duration2, currentTime2 + 10); }
	function toggleFullScreen2() {
		if (!document.fullscreenElement) wrapper2El.requestFullscreen().catch(console.error);
		else document.exitFullscreen();
	}

	function toggle3() { isPaused3 = !isPaused3; }
	function back3() { currentTime3 = Math.max(0, currentTime3 - 5); }
	function fwd3() { if (video3El) currentTime3 = Math.min(duration3, currentTime3 + 10); }
	function toggleFullScreen3() {
		if (!document.fullscreenElement) wrapper3El.requestFullscreen().catch(console.error);
		else document.exitFullscreen();
	}

	function formatTime(s: number) {
		if (isNaN(s) || s < 0) return '00:00';
		return `${Math.floor(s / 60).toString().padStart(2, '0')}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
	}
</script>

<style>
	input[type='range'] { accent-color: #FF4400; }
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
		0%   { text-shadow: 0 0 0px  rgba(255,68,0,0),    0 0 0px  rgba(255,68,0,0); }
		35%  { text-shadow: 0 0 8px  rgba(255,68,0,0.28), 0 0 18px rgba(255,68,0,0.10); }
		50%  { text-shadow: 0 0 16px rgba(255,68,0,0.48), 0 0 36px rgba(255,68,0,0.16), 0 0 60px rgba(255,68,0,0.06); }
		65%  { text-shadow: 0 0 8px  rgba(255,68,0,0.28), 0 0 18px rgba(255,68,0,0.10); }
		100% { text-shadow: 0 0 0px  rgba(255,68,0,0),    0 0 0px  rgba(255,68,0,0); }
	}
	@keyframes icon-spin {
		from { transform: rotate(0deg); }
		to   { transform: rotate(-360deg); }
	}
	.text-glow { animation: text-glow 4s cubic-bezier(0.45,0,0.55,1) infinite; }
	.icon-spin { animation: icon-spin 8s cubic-bezier(0.4,0,0.6,1) infinite; }
</style>

<section class="w-full bg-white pt-24 pb-20 overflow-x-hidden">
	<div class="max-w-6xl mx-auto px-4 md:px-6">

		<!-- ── Row 1: Title LEFT / Feature Chips RIGHT ─────────────── -->
		<p class="text-[10px] font-mono tracking-[0.35em] text-neutral-400 uppercase mb-4">Image Optimization</p>
		<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
			<h2 class="text-[clamp(2.4rem,6vw,4.5rem)] font-black tracking-tight text-gray-900 leading-none">
				Smarter.<br/>
				<span class="text-neutral-300">Every time.</span>
			</h2>
			<div class="flex flex-row sm:flex-col items-center sm:items-end gap-2 shrink-0 flex-wrap">
				<div class="relative">
					<span class="px-3 py-1.5 bg-gray-100 text-gray-500 text-[10px] font-mono uppercase tracking-widest rounded-full block">Ultra · 5×</span>
					<span class="absolute -top-2 -right-1 bg-[#FF4400] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full leading-none">NEW</span>
				</div>
				<span class="px-3 py-1.5 bg-gray-100 text-gray-500 text-[10px] font-mono uppercase tracking-widest rounded-full">Lossy</span>
				<span class="px-3 py-1.5 bg-gray-100 text-gray-500 text-[10px] font-mono uppercase tracking-widest rounded-full">Lossless</span>
			</div>
		</div>

		<!-- ── Row 2: Data Ledger ──────────────────────────────────── -->
		<div class="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.6fr] border-t border-b border-gray-200 mb-0">

			<!-- Col 1 — Ultra vs Lossy with text-glow -->
			<div class="py-10 pr-10 md:border-r border-gray-200 border-b md:border-b-0 flex flex-col justify-between">
				<span class="text-[10px] font-mono tracking-[0.18em] text-gray-400 uppercase block mb-4">Ultra vs Lossy</span>
				<div>
					<div class="flex items-baseline gap-1 leading-none mb-2">
						<span class="text-glow text-[clamp(2.8rem,7vw,5rem)] font-black text-[#FF4400] tracking-tighter leading-none">5×</span>
						<span class="text-base font-semibold text-gray-500 leading-none pb-1 ml-1">better</span>
					</div>
					<p class="text-sm text-gray-400 leading-relaxed max-w-[20ch]">
						Pro-exclusive Ultra tier. Lossy and Lossless stay free — always.
					</p>
				</div>
			</div>

			<!-- Col 2 — Auto-rescan with counter-clockwise spin icon -->
			<div class="py-10 md:px-10 md:border-r border-gray-200 border-b md:border-b-0 flex flex-col justify-between">
				<span class="text-[10px] font-mono tracking-[0.18em] text-gray-400 uppercase block mb-4">Re-Scan Logic</span>
				<div class="flex flex-col gap-4">
					<svg
						class="icon-spin w-7 h-7 text-[#FF4400]"
						fill="none" stroke="currentColor" stroke-width="1.75"
						viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round"
							d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
					</svg>
					<div>
						<p class="text-base font-semibold text-gray-700 leading-snug mb-2 max-w-[22ch]">
							Already-optimized images get a second look on every update.
						</p>
						<p class="text-sm text-gray-400 leading-relaxed max-w-[22ch]">
							If a better algorithm exists, Smush finds it automatically.
						</p>
					</div>
				</div>
			</div>

			<!-- Col 3 — Ultra story -->
			<div class="py-10 md:pl-10 flex flex-col justify-center">
				<p class="text-lg md:text-xl text-gray-600 leading-relaxed mb-5">
					Ultra delivers 5× the file reduction of Lossy — for sites where every kilobyte matters. Lossy and Lossless remain free because not every site needs the maximum.
				</p>
				<p class="text-base text-gray-400 leading-relaxed">
					The library rescans on every plugin update. Better algorithms get applied retroactively — without any user action required.
				</p>
			</div>

		</div>

	</div>

	<!-- ── VIDEOS: Before / After side-by-side ──────────────────── -->
	<div class="max-w-6xl mx-auto px-4 md:px-6 mt-12">

		<!-- Section label -->
		<div class="flex items-center gap-4 mb-10">
			<span class="text-[10px] font-mono tracking-[0.18em] text-gray-400 uppercase">Before → After · SUI 3</span>
			<div class="flex-1 h-px bg-gray-200"></div>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">

			<!-- Left — Original Smush flow -->
			<div>
				<p class="text-xs font-mono tracking-widest text-gray-500 mb-4">01 // Smush · Original Userflow</p>
				<div class="bg-transparent rounded-3xl border border-neutral-300/70
				            shadow-[0_12px_48px_rgba(0,0,0,0.11),0_2px_8px_rgba(0,0,0,0.05)]
				            p-2">
					<div class="relative overflow-hidden rounded-2xl bg-black group"
					     bind:this={wrapperEl}>

						<div class="absolute top-4 left-5 z-40 flex items-center gap-3
						            bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
							<span class="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0"></span>
							<span class="text-[10px] font-mono tracking-widest text-white/70 uppercase">Before · Smush v2</span>
						</div>

						<!-- svelte-ignore a11y_media_has_caption -->
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
						<video
							bind:this={videoEl}
							bind:paused={isPaused}
							bind:currentTime
							bind:duration
							src="/videos/Smush%20with%20Userflow.mp4"
							class="w-full h-auto object-cover aspect-video cursor-pointer transform-gpu will-change-transform"
							playsinline preload="metadata" decoding="async"
							muted
							onclick={toggle}
						></video>

						<div class="absolute bottom-4 inset-x-4 flex flex-col gap-3 px-4 py-3.5 rounded-2xl
						            bg-black/60 backdrop-blur-xl border border-white/10
						            opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0
						            transition-all duration-500 ease-out">
							<div class="flex items-center gap-3 w-full">
								<span class="text-white/70 text-[10px] font-mono w-8 text-right">{formatTime(currentTime)}</span>
								<input type="range" min="0" max={duration || 100} step="0.01" bind:value={currentTime}
									class="flex-1 h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer" />
								<span class="text-white/70 text-[10px] font-mono w-8">{formatTime(duration)}</span>
							</div>
							<div class="flex items-center justify-between w-full">
								<div class="flex items-center gap-5">
									<button onclick={back} class="text-white/80 hover:text-white transition-colors flex items-center gap-1 group/btn">
										<svg class="w-4 h-4 group-active/btn:-rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"/></svg>
										<span class="text-[10px] font-mono tracking-widest mt-1">-5s</span>
									</button>
									<button onclick={toggle} class="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
										{#if isPaused}
											<svg class="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
										{:else}
											<svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
										{/if}
									</button>
									<button onclick={fwd} class="text-white/80 hover:text-white transition-colors flex items-center gap-1 group/btn">
										<span class="text-[10px] font-mono tracking-widest mt-1">+10s</span>
										<svg class="w-4 h-4 group-active/btn:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.334-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.334-4z"/></svg>
									</button>
								</div>
								<button onclick={toggleFullScreen} class="text-white/80 hover:text-white transition-colors">
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
								</button>
							</div>
						</div>

					</div>
				</div>
			</div>

			<!-- Right — Smush SUI 3 redesign -->
			<div>
				<p class="text-xs font-mono tracking-widest text-gray-500 mb-4">02 // Smush · SUI&nbsp;3 Redesign</p>
				<div class="bg-transparent rounded-3xl border border-neutral-300/70
				            shadow-[0_12px_48px_rgba(0,0,0,0.11),0_2px_8px_rgba(0,0,0,0.05)]
				            p-2">
					<div class="relative overflow-hidden rounded-2xl bg-black group"
					     bind:this={wrapper2El}>

						<div class="absolute top-4 left-5 z-40 flex items-center gap-3
						            bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
							<span class="w-1.5 h-1.5 rounded-full bg-[#FF4400] animate-pulse shrink-0"></span>
							<span class="text-[10px] font-mono tracking-widest text-white/70 uppercase">After · Smush SUI 3</span>
						</div>

						<!-- svelte-ignore a11y_media_has_caption -->
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
						<video
							bind:this={video2El}
							bind:paused={isPaused2}
							bind:currentTime={currentTime2}
							bind:duration={duration2}
							src="/videos/Background%20rules%20in%20Smush.mp4"
							class="w-full h-auto object-cover aspect-video cursor-pointer transform-gpu will-change-transform"
							playsinline preload="metadata" decoding="async"
							muted
							onclick={toggle2}
						></video>

						<div class="absolute bottom-4 inset-x-4 flex flex-col gap-3 px-4 py-3.5 rounded-2xl
						            bg-black/60 backdrop-blur-xl border border-white/10
						            opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0
						            transition-all duration-500 ease-out">
							<div class="flex items-center gap-3 w-full">
								<span class="text-white/70 text-[10px] font-mono w-8 text-right">{formatTime(currentTime2)}</span>
								<input type="range" min="0" max={duration2 || 100} step="0.01" bind:value={currentTime2}
									class="flex-1 h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer" />
								<span class="text-white/70 text-[10px] font-mono w-8">{formatTime(duration2)}</span>
							</div>
							<div class="flex items-center justify-between w-full">
								<div class="flex items-center gap-5">
									<button onclick={back2} class="text-white/80 hover:text-white transition-colors flex items-center gap-1 group/btn">
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
									<button onclick={fwd2} class="text-white/80 hover:text-white transition-colors flex items-center gap-1 group/btn">
										<span class="text-[10px] font-mono tracking-widest mt-1">+10s</span>
										<svg class="w-4 h-4 group-active/btn:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.334-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.334-4z"/></svg>
									</button>
								</div>
								<button onclick={toggleFullScreen2} class="text-white/80 hover:text-white transition-colors">
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
								</button>
							</div>
						</div>

					</div>
				</div>
			</div>

		</div>
	</div>

	<!-- ── VIDEO 3: Figma Prototype ─────────────────────────────────── -->
	<div class="max-w-6xl mx-auto px-4 md:px-6 mt-12">

		<div class="flex items-center gap-4 mb-10">
			<span class="text-[10px] font-mono tracking-[0.18em] text-gray-400 uppercase">Figma Prototype · Smush v3</span>
			<div class="flex-1 h-px bg-gray-200"></div>
		</div>

		<div class="bg-transparent rounded-3xl border border-neutral-300/70
		            shadow-[0_12px_48px_rgba(0,0,0,0.11),0_2px_8px_rgba(0,0,0,0.05)]
		            p-2">
			<div class="relative overflow-hidden rounded-2xl bg-black group"
			     bind:this={wrapper3El}>

				<div class="absolute top-5 left-6 z-40 flex items-center gap-3
				            bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-4 py-2">
					<span class="w-1.5 h-1.5 rounded-full bg-[#FF4400] animate-pulse shrink-0"></span>
					<span class="text-[10px] font-mono tracking-widest text-white/70 uppercase">Smush · Prototype Validation</span>
				</div>

				<!-- svelte-ignore a11y_media_has_caption -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<video
					bind:this={video3El}
					bind:paused={isPaused3}
					bind:currentTime={currentTime3}
					bind:duration={duration3}
					src="/videos/SmushTest_Prototype.mp4"
					class="w-full h-auto object-cover aspect-video cursor-pointer transform-gpu will-change-transform"
					playsinline preload="metadata" decoding="async"
					muted
					onclick={toggle3}
				></video>

				<div class="absolute bottom-5 inset-x-5 flex flex-col gap-3 px-5 py-4 rounded-2xl
				            bg-black/60 backdrop-blur-xl border border-white/10
				            opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0
				            transition-all duration-500 ease-out">
					<div class="flex items-center gap-4 w-full">
						<span class="text-white/70 text-[10px] font-mono w-8 text-right">{formatTime(currentTime3)}</span>
						<input type="range" min="0" max={duration3 || 100} step="0.01" bind:value={currentTime3}
							class="flex-1 h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer transition-all" />
						<span class="text-white/70 text-[10px] font-mono w-8">{formatTime(duration3)}</span>
					</div>
					<div class="flex items-center justify-between w-full">
						<div class="flex items-center gap-6">
							<button onclick={back3} class="text-white/80 hover:text-white transition-colors flex items-center gap-1 group/btn">
								<svg class="w-5 h-5 group-active/btn:-rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"/></svg>
								<span class="text-[10px] font-mono tracking-widest mt-1">-5s</span>
							</button>
							<button onclick={toggle3} class="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
								{#if isPaused3}
									<svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
								{:else}
									<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
								{/if}
							</button>
							<button onclick={fwd3} class="text-white/80 hover:text-white transition-colors flex items-center gap-1 group/btn">
								<span class="text-[10px] font-mono tracking-widest mt-1">+10s</span>
								<svg class="w-5 h-5 group-active/btn:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.334-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.334-4z"/></svg>
							</button>
						</div>
						<button onclick={toggleFullScreen3} class="text-white/80 hover:text-white transition-colors">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
						</button>
					</div>
				</div>

			</div>
		</div>
	</div>

	<!-- ── RESEARCH CONTEXT ─────────────────────────────────────────── -->
	<div class="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
		<div class="rounded-3xl overflow-hidden shadow-[0_16px_64px_rgba(0,0,0,0.12)]">

			<!-- Core finding + quote -->
			<div class="bg-black px-8 md:px-12 py-10 border-b border-white/5">
				<div class="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10">
					<div class="flex flex-col justify-between gap-6">
						<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase">Core research finding · Smush</span>
						<p class="text-[clamp(1.3rem,3.2vw,2rem)] font-black text-white leading-snug">
							Images were compressed.<br/>
							Just not compressed <span class="text-[#FF4400]">enough.</span>
						</p>
						<div class="flex flex-wrap gap-2">
							<span class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-neutral-400 uppercase tracking-widest">500+ reviews audited</span>
							<span class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-neutral-400 uppercase tracking-widest">6 support threads</span>
							<span class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-neutral-400 uppercase tracking-widest">Smush v3 audit</span>
						</div>
					</div>
					<blockquote class="bg-white/3 rounded-2xl px-6 py-6 flex flex-col justify-between gap-5">
						<span class="text-[#FF4400] text-3xl font-black leading-none">"</span>
						<p class="text-sm text-neutral-300 italic leading-relaxed -mt-2">
							It said everything was optimized. I tried rescan on a whim and it found 200+ images with another 38% to save. I had no idea.
						</p>
						<span class="text-[9px] font-mono text-neutral-500">Community thread · WordPress.org · Smush reviews</span>
					</blockquote>
				</div>
			</div>

			<!-- Severity signal cards -->
			<div class="bg-neutral-950 px-8 md:px-12 py-8 border-b border-white/5">
				<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase block mb-5">Research signals · 500+ reviews · 6 support threads · v3 audit</span>
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
					{#each [
						{ severity: 'Critical', bg: 'bg-red-950/60 border-red-800/60',     pill: 'text-red-400 bg-red-950 border-red-800/70',         stat: '4–5%',   insight: 'avg file reduction with Lossy on large images — industry benchmark is 60–80%', tag: 'Compression ceiling' },
						{ severity: 'Critical', bg: 'bg-red-950/60 border-red-800/60',     pill: 'text-red-400 bg-red-950 border-red-800/70',         stat: '#1',     insight: 'support pattern: "Smush ran but my images are still large"', tag: 'Trust gap' },
						{ severity: 'High',     bg: 'bg-amber-950/50 border-amber-800/50', pill: 'text-amber-400 bg-amber-950/80 border-amber-800/60', stat: 'Never',  insight: 'previously optimized images re-checked after algorithm updates — stale library by default', tag: 'Stale library' },
						{ severity: 'High',     bg: 'bg-amber-950/50 border-amber-800/50', pill: 'text-amber-400 bg-amber-950/80 border-amber-800/60', stat: '0',      insight: 'guidance on which tier to pick — users chose Lossy by default unaware Ultra could save 5× more', tag: 'No guidance' },
						{ severity: 'Medium',   bg: 'bg-neutral-800/50 border-neutral-700',pill: 'text-neutral-400 bg-neutral-800 border-neutral-700', stat: 'Missing', insight: 'email digest, background toggle, and onboarding guide were absent in v2', tag: 'Feature gap' },
						{ severity: 'Medium',   bg: 'bg-neutral-800/50 border-neutral-700',pill: 'text-neutral-400 bg-neutral-800 border-neutral-700', stat: 'Manual',  insight: 'every re-optimisation required user-initiated action — no set-and-forget capability', tag: 'Manual overhead' },
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
						<div class="w-1.5 h-1.5 rounded-full bg-[#FF4400] animate-pulse shrink-0"></div>
						<span class="text-[9px] font-bold font-mono tracking-[0.3em] text-[#FF4400] uppercase">Hypothesis</span>
					</div>
					<div class="hidden md:block w-px h-10 bg-white/10 shrink-0"></div>
					<p class="text-base font-semibold text-white leading-relaxed">
						Introducing Ultra (5× compression), auto-rescan, an onboarding tier guide, and email reports would break through the 4–5% ceiling — and give users confidence the library was always at its best without manual effort.
					</p>
				</div>
			</div>

			<!-- Orange divider -->
			<div class="h-[3px] bg-[#FF4400] w-full"></div>

			<!-- White bottom: What we changed + Proof -->
			<div class="bg-white px-8 md:px-12 pt-10 pb-6 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10">

				<div class="flex flex-col gap-5">
					<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-400 uppercase">What we changed</span>
					<div class="space-y-5">
						{#each [
							{ n: '01', action: 'Ultra tier · New, Pro-exclusive',     detail: '5× better reduction than Lossy. Tested on 10–20 MB images across all color profiles and image types. Lossy and Lossless remain free.' },
							{ n: '02', action: 'Auto-rescan library',                 detail: 'Re-checks every image after algorithm updates. Better compression applied retroactively — no user action needed.' },
							{ n: '03', action: 'Compression tier guide',              detail: 'Inline comparison of Ultra, Lossy, and Lossless with plain-language guidance. Pick once, Smush handles the rest.' },
							{ n: '04', action: 'Email reports + background toggle',   detail: 'Compression digest sent to admin after each run. Toggle to control when background jobs run — set it and forget it.' },
						] as step}
							<div class="flex gap-4">
								<span class="text-[#FF4400] text-[11px] font-black font-mono shrink-0 mt-0.5">{step.n}</span>
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
							{ stat: '5×',   label: 'Ultra vs Lossy',   sub: 'large image dataset' },
							{ stat: '2×',   label: 'Lossy / Lossless', sub: 'algorithm improvement' },
							{ stat: '2M+',  label: 'Active installs',  sub: 'up from 1M' },
							{ stat: '−37%', label: 'Bounce rate',      sub: 'post-launch' },
						] as m}
							<div class="bg-neutral-950 rounded-xl px-4 py-4 border border-neutral-800">
								<span class="text-[clamp(1.4rem,3vw,2rem)] font-black text-[#FF4400] tracking-tight leading-none block">{m.stat}</span>
								<span class="text-xs font-semibold text-white block mt-1">{m.label}</span>
								<span class="text-[10px] text-neutral-500">{m.sub}</span>
							</div>
						{/each}
					</div>
					<div class="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
						<div class="dot-ripple w-2 h-2 bg-green-500 shrink-0 mt-0.5"></div>
						<p class="text-xs font-semibold text-green-700 leading-snug">Hypothesis confirmed — Ultra adoption hit 34% of Pro users in the first month. "Still large" support tickets dropped significantly after rescan shipped.</p>
					</div>
				</div>

			</div>

			<!-- Full-width note strip -->
			<div class="bg-white px-8 md:px-12 pb-10 border-t border-neutral-100 pt-5">
				<div class="flex items-start gap-3 bg-neutral-50 border border-neutral-200 rounded-xl px-5 py-4">
					<div class="w-2 h-2 rounded-full bg-neutral-300 shrink-0 mt-0.5"></div>
					<p class="text-[10px] text-neutral-500 leading-snug">Ultra tested on a large dataset of 10–20 MB images with full color profile variation across all supported image types.</p>
				</div>
			</div>

		</div>
	</div>

</section>
