<script lang="ts">
	import smushIconSvg from '$lib/assets/smush-icon.svg?raw';
	import wpmuLogoSvg from '$lib/assets/wpmu-logo-icon.svg?raw';
</script>

<style>
	.full-bleed {
		width: 100vw;
		position: relative;
		left: 50%;
		right: 50%;
		margin-left: -50vw;
		margin-right: -50vw;
	}

	/* S3: rescan icon — slow full rotation, 7s */
	@keyframes icon-spin {
		from { transform: rotate(0deg); }
		to   { transform: rotate(-360deg); }
	}

	/* S3: text glow bloom — pulses on the stat number, 3s */
	@keyframes text-glow {
		0%, 100% {
			text-shadow: 0 0 0px  rgba(255,68,0,0),
			             0 0 0px  rgba(255,68,0,0);
		}
		50% {
			text-shadow: 0 0 14px rgba(255,68,0,0.45),
			             0 0 32px rgba(255,68,0,0.15);
		}
	}

	.icon-spin { animation: icon-spin 7s linear      infinite; }
	.text-glow { animation: text-glow 3s ease-in-out infinite; }
</style>

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- DRAFT SECTION HEADER                                        -->
<!-- ═══════════════════════════════════════════════════════════ -->
<div class="max-w-6xl mx-auto px-4 md:px-6 pt-28 pb-12 mt-16 border-t-2 border-dashed border-amber-300/60">
	<div class="flex flex-wrap items-center gap-3 mb-4">
		<span class="px-3 py-1.5 bg-amber-100 border border-amber-300 text-amber-800 text-[10px] font-mono uppercase tracking-widest rounded-full">
			⚠ Draft Mode
		</span>
		<span class="text-[10px] font-mono tracking-[0.22em] text-neutral-400 uppercase">
			Plugin Transition — 3 Design Options
		</span>
	</div>
	<p class="text-sm text-neutral-400 max-w-lg">
		Each option uses identical data: 01 → 02, Atomic Library → Smush. Pick one and we'll implement it across all 3 transitions.
	</p>
</div>


<!-- ═══════════════════════════════════════════════════════════ -->
<!-- OPTION A: Dark Runway Strip                                  -->
<!-- Focus: Compact. Information-dense. Ghost number as texture. -->
<!-- ═══════════════════════════════════════════════════════════ -->

<div class="max-w-6xl mx-auto px-4 md:px-6 mb-6">
	<div class="flex items-center gap-3">
		<span class="w-6 h-6 rounded-full bg-neutral-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0">A</span>
		<span class="text-xs font-mono tracking-[0.22em] text-neutral-500 uppercase">Dark Runway Strip — Compact, directional, ghost numeral as texture</span>
	</div>
</div>

<div class="full-bleed bg-neutral-950">
	<div class="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20 relative overflow-hidden">

		<!-- Ghost chapter number — pure texture, right-anchored -->
		<span
			class="absolute right-0 top-1/2 -translate-y-1/2 text-[clamp(12rem,35vw,28rem)] font-black text-white/3 leading-none select-none pointer-events-none translate-x-6"
			aria-hidden="true">02</span>

		<!-- Progress strip -->
		<div class="flex items-center gap-3 mb-14">
			<div class="flex items-center gap-2.5 opacity-35 shrink-0">
				<div class="w-4 h-4 shrink-0 [&>svg]:w-full [&>svg]:h-full">{@html wpmuLogoSvg}</div>
				<span class="text-[9px] font-mono tracking-[0.28em] text-neutral-400 uppercase hidden sm:block">01 — Atomic Library</span>
				<svg class="w-2.5 h-2.5 text-neutral-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
				</svg>
			</div>
			<div class="flex-1 h-px bg-white/10" aria-hidden="true"></div>
			<div class="flex items-center gap-2 shrink-0">
				<span class="w-1 h-1 rounded-full bg-[#FF4400] animate-pulse" aria-hidden="true"></span>
				<span class="text-[9px] font-mono tracking-[0.28em] text-[#FF4400] uppercase">02 — Smush</span>
			</div>
		</div>

		<!-- Identity row — icon tiny, name in mono caps, no big heading -->
		<div class="flex items-center gap-3 mb-5">
			<div
				class="w-5 h-5 shrink-0 [&>svg]:w-full [&>svg]:h-full"
				style="filter: drop-shadow(0 4px 12px rgba(0,215,255,0.45));"
				aria-hidden="true">{@html smushIconSvg}</div>
			<span class="text-[10px] font-mono tracking-[0.45em] text-neutral-400 uppercase">Image Optimization</span>
		</div>

		<p class="text-base md:text-lg text-neutral-400 leading-relaxed max-w-lg">
			Ultra, Lossy, and Lossless compression at scale.
			Auto-rescan on every library update — no manual work.
		</p>

	</div>
</div>


<!-- ═══════════════════════════════════════════════════════════ -->
<!-- OPTION B: Typographic Chapter Gate                          -->
<!-- Focus: Chapter number IS the design. Massive ghost type.   -->
<!-- ═══════════════════════════════════════════════════════════ -->

<div class="max-w-6xl mx-auto px-4 md:px-6 mt-20 mb-6">
	<div class="flex items-center gap-3">
		<span class="w-6 h-6 rounded-full bg-neutral-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0">B</span>
		<span class="text-xs font-mono tracking-[0.22em] text-neutral-500 uppercase">Typographic Chapter Gate — Number as art, label as information</span>
	</div>
</div>

<div class="full-bleed bg-neutral-950">
	<div class="max-w-6xl mx-auto px-4 md:px-6 pt-12 pb-16 md:pb-20 relative overflow-hidden">

		<!-- Progress strip — same across all -->
		<div class="flex items-center gap-3 mb-10">
			<div class="flex items-center gap-2.5 opacity-35 shrink-0">
				<div class="w-4 h-4 shrink-0 [&>svg]:w-full [&>svg]:h-full">{@html wpmuLogoSvg}</div>
				<span class="text-[9px] font-mono tracking-[0.28em] text-neutral-400 uppercase hidden sm:block">01 — Atomic Library</span>
				<svg class="w-2.5 h-2.5 text-neutral-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
				</svg>
			</div>
			<div class="flex-1 h-px bg-white/10" aria-hidden="true"></div>
			<div class="flex items-center gap-2 shrink-0">
				<span class="w-1 h-1 rounded-full bg-[#FF4400] animate-pulse" aria-hidden="true"></span>
				<span class="text-[9px] font-mono tracking-[0.28em] text-[#FF4400] uppercase">02 — Smush</span>
			</div>
		</div>

		<!-- Ghost number + overlay content -->
		<div class="relative">
			<!-- Massive ghost numeral — the visual anchor -->
			<span
				class="block text-[clamp(9rem,30vw,24rem)] font-black text-white/5 leading-[0.85] select-none pointer-events-none -ml-2 tracking-tighter"
				aria-hidden="true">02</span>

			<!-- Overlay: icon + name + descriptor — centered in the numeral's height -->
			<div class="absolute inset-0 flex flex-col justify-center pl-3 md:pl-5">
				<div class="flex items-center gap-2.5 mb-4">
					<div
						class="w-6 h-6 shrink-0 [&>svg]:w-full [&>svg]:h-full"
						style="filter: drop-shadow(0 6px 16px rgba(0,215,255,0.5));"
						aria-hidden="true">{@html smushIconSvg}</div>
					<span class="text-[10px] font-mono tracking-[0.45em] text-[#FF4400] uppercase">Smush</span>
				</div>
				<p class="text-sm md:text-base text-neutral-400 leading-relaxed max-w-xs">
					Ultra, Lossy, and Lossless compression at scale.
				</p>
			</div>
		</div>

	</div>
</div>


<!-- ═══════════════════════════════════════════════════════════ -->
<!-- OPTION C: Split Band                                        -->
<!-- Focus: Color block contrast. Dark = done, Orange = next.   -->
<!-- ═══════════════════════════════════════════════════════════ -->

<div class="max-w-6xl mx-auto px-4 md:px-6 mt-20 mb-6">
	<div class="flex items-center gap-3">
		<span class="w-6 h-6 rounded-full bg-neutral-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0">C</span>
		<span class="text-xs font-mono tracking-[0.22em] text-neutral-500 uppercase">Split Band — Color-block contrast, icon at the boundary</span>
	</div>
</div>

<div class="full-bleed overflow-hidden">
	<div class="flex flex-col md:flex-row">

		<!-- Left: dark — completed -->
		<div class="flex-2 bg-neutral-950 px-8 md:px-14 py-14 md:py-16 flex flex-col justify-between relative overflow-hidden">
			<!-- Ghost number -->
			<span
				class="absolute bottom-0 left-4 text-[clamp(7rem,18vw,16rem)] font-black text-white/5 leading-none select-none pointer-events-none"
				aria-hidden="true">01</span>

			<div class="flex items-center gap-2.5 opacity-50 relative z-10">
				<div class="w-4 h-4 shrink-0 [&>svg]:w-full [&>svg]:h-full">{@html wpmuLogoSvg}</div>
				<span class="text-[9px] font-mono tracking-[0.28em] text-neutral-400 uppercase hidden sm:block">01 — Atomic Library</span>
				<svg class="w-2.5 h-2.5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
				</svg>
			</div>

			<p class="text-sm text-neutral-500 leading-relaxed relative z-10 mt-6 md:mt-0 max-w-[22ch]">
				Design system foundation. 200+ components. SUI 3 Atomic.
			</p>
		</div>

		<!-- Center divider: icon floating on the seam — desktop only -->
		<div class="hidden md:flex items-center justify-center relative z-20 -mx-5">
			<div
				class="w-10 h-10 rounded-full [&>svg]:w-full [&>svg]:h-full ring-4 ring-neutral-950 shrink-0"
				style="filter: drop-shadow(0 8px 28px rgba(0,215,255,0.55));"
				aria-hidden="true">{@html smushIconSvg}</div>
		</div>

		<!-- Right: orange — incoming -->
		<div class="flex-3 bg-[#FF4400] px-8 md:px-14 py-14 md:py-16 flex flex-col justify-between relative overflow-hidden">
			<!-- Ghost number -->
			<span
				class="absolute bottom-0 right-4 text-[clamp(7rem,18vw,16rem)] font-black text-black/[0.07] leading-none select-none pointer-events-none"
				aria-hidden="true">02</span>

			<div class="flex items-center gap-2 relative z-10">
				<span class="w-1.5 h-1.5 rounded-full bg-black/40 animate-pulse"></span>
				<span class="text-[9px] font-mono tracking-[0.28em] text-black/50 uppercase">Next Chapter</span>
			</div>

			<div class="relative z-10 mt-6 md:mt-0">
				<p class="text-xl md:text-2xl font-black text-black leading-tight mb-1">
					Smush
				</p>
				<p class="text-sm text-black/60 leading-relaxed max-w-[28ch]">
					Image optimization — Ultra, Lossy, and Lossless compression at scale.
				</p>
			</div>
		</div>

	</div>
</div>


<!-- ═══════════════════════════════════════════════════════════ -->
<!-- OPTION B VARIATIONS — Typographic Gate refined              -->
<!-- ═══════════════════════════════════════════════════════════ -->

<div class="max-w-6xl mx-auto px-4 md:px-6 py-16 border-t-2 border-dashed border-sky-300/50 mt-16">
	<div class="flex flex-wrap items-center gap-3 mb-4">
		<span class="px-3 py-1.5 bg-sky-100 border border-sky-300 text-sky-800 text-[10px] font-mono uppercase tracking-widest rounded-full">
			B — Variations
		</span>
		<span class="text-[10px] font-mono tracking-[0.22em] text-neutral-400 uppercase">
			Larger icon + name · right-side chapter stats · 3 layouts
		</span>
	</div>
	<p class="text-sm text-neutral-400 max-w-lg">
		All three use the same ghost-numeral foundation as Option B, with a bigger plugin identity and stats from the Smush chapter on the right.
	</p>
</div>


<!-- ─────────────────────────────────────────────────────────── -->
<!-- B1: Split grid — big identity left, stat cards right       -->
<!-- Feeling: Editorial meets dashboard                         -->
<!-- ─────────────────────────────────────────────────────────── -->

<div class="max-w-6xl mx-auto px-4 md:px-6 mb-6">
	<div class="flex items-center gap-3">
		<span class="w-6 h-6 rounded-full bg-sky-700 text-white text-[10px] font-bold flex items-center justify-center shrink-0">B1</span>
		<span class="text-xs font-mono tracking-[0.22em] text-neutral-500 uppercase">Split grid — bold identity left, stat panel right</span>
	</div>
</div>

<div class="full-bleed bg-neutral-950">
	<div class="max-w-6xl mx-auto px-4 md:px-6 pt-12 pb-16 md:pb-20 relative overflow-hidden">

		<!-- Ghost numeral — anchored left, behind identity -->
		<span
			class="absolute -left-8 top-1/2 -translate-y-1/2 text-[clamp(14rem,40vw,36rem)] font-black text-white/4 leading-none select-none pointer-events-none tracking-tighter"
			aria-hidden="true">02</span>

		<!-- Progress strip -->
		<div class="flex items-center gap-3 mb-14 relative">
			<div class="flex items-center gap-2.5 opacity-35 shrink-0">
				<div class="w-4 h-4 shrink-0 [&>svg]:w-full [&>svg]:h-full">{@html wpmuLogoSvg}</div>
				<span class="text-[9px] font-mono tracking-[0.28em] text-neutral-400 uppercase hidden sm:block">01 — Atomic Library</span>
				<svg class="w-2.5 h-2.5 text-neutral-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
				</svg>
			</div>
			<div class="flex-1 h-px bg-white/10" aria-hidden="true"></div>
			<div class="flex items-center gap-2 shrink-0">
				<span class="w-1 h-1 rounded-full bg-[#FF4400] animate-pulse" aria-hidden="true"></span>
				<span class="text-[9px] font-mono tracking-[0.28em] text-[#FF4400] uppercase">02 — Smush</span>
			</div>
		</div>

		<!-- Two-column content -->
		<div class="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-10 md:gap-16 relative">

			<!-- Left: plugin identity — bigger icon, bigger name -->
			<div class="flex flex-col justify-center gap-6">
				<div class="flex items-center gap-5">
					<div
						class="w-14 h-14 shrink-0 [&>svg]:w-full [&>svg]:h-full"
						style="filter: drop-shadow(0 8px 28px rgba(0,215,255,0.55));"
						aria-hidden="true">{@html smushIconSvg}</div>
					<div>
						<p class="text-[10px] font-mono tracking-[0.4em] text-neutral-500 uppercase mb-1">Next Chapter</p>
						<h3 class="text-[clamp(2rem,5vw,3.5rem)] font-black text-white tracking-tight leading-none">Smush</h3>
					</div>
				</div>
				<p class="text-base text-neutral-400 leading-relaxed max-w-sm">
					Image optimization rebuilt for scale — Ultra compression, auto-rescan, and a free tier that never gets cut.
				</p>
			</div>

			<!-- Right: 3 stats from the chapter -->
			<div class="flex flex-col gap-px">
				<div class="flex items-center justify-between py-5 border-b border-white/6">
					<span class="text-[10px] font-mono tracking-[0.22em] text-neutral-500 uppercase">Active Installs</span>
					<span class="text-2xl font-black text-white tracking-tight">1M <span class="text-[#FF4400]">→</span> 2M+</span>
				</div>
				<div class="flex items-center justify-between py-5 border-b border-white/6">
					<span class="text-[10px] font-mono tracking-[0.22em] text-neutral-500 uppercase">Bounce Rate</span>
					<span class="text-2xl font-black text-[#FF4400] tracking-tight">−37%</span>
				</div>
				<div class="flex items-center justify-between py-5">
					<span class="text-[10px] font-mono tracking-[0.22em] text-neutral-500 uppercase">Ultra Compression</span>
					<span class="text-2xl font-black text-white tracking-tight">5<span class="text-neutral-500 text-lg font-semibold">×</span></span>
				</div>
			</div>

		</div>
	</div>
</div>


<!-- ─────────────────────────────────────────────────────────── -->
<!-- B2: Oversized identity center + bottom stat strip          -->
<!-- Feeling: Cinematic chapter card                            -->
<!-- ─────────────────────────────────────────────────────────── -->

<div class="max-w-6xl mx-auto px-4 md:px-6 mt-20 mb-6">
	<div class="flex items-center gap-3">
		<span class="w-6 h-6 rounded-full bg-sky-700 text-white text-[10px] font-bold flex items-center justify-center shrink-0">B2</span>
		<span class="text-xs font-mono tracking-[0.22em] text-neutral-500 uppercase">Oversized identity + bottom stat strip — cinematic, full bleed</span>
	</div>
</div>

<div class="full-bleed bg-neutral-950">
	<div class="relative overflow-hidden">

		<!-- Ghost numeral — full viewport, textural only -->
		<span
			class="absolute inset-y-0 left-1/2 -translate-x-1/3 flex items-center text-[clamp(18rem,55vw,52rem)] font-black text-white/[0.035] leading-none select-none pointer-events-none tracking-tighter"
			aria-hidden="true">02</span>

		<div class="max-w-6xl mx-auto px-4 md:px-6 pt-12 pb-0 relative">

			<!-- Progress strip -->
			<div class="flex items-center gap-3 mb-16">
				<div class="flex items-center gap-2.5 opacity-35 shrink-0">
					<div class="w-4 h-4 shrink-0 [&>svg]:w-full [&>svg]:h-full">{@html wpmuLogoSvg}</div>
					<span class="text-[9px] font-mono tracking-[0.28em] text-neutral-400 uppercase hidden sm:block">01 — Atomic Library</span>
					<svg class="w-2.5 h-2.5 text-neutral-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
					</svg>
				</div>
				<div class="flex-1 h-px bg-white/10" aria-hidden="true"></div>
				<div class="flex items-center gap-2 shrink-0">
					<span class="w-1 h-1 rounded-full bg-[#FF4400] animate-pulse" aria-hidden="true"></span>
					<span class="text-[9px] font-mono tracking-[0.28em] text-[#FF4400] uppercase">02 — Smush</span>
				</div>
			</div>

			<!-- Identity: icon large, name very bold -->
			<div class="flex items-end gap-6 pb-14">
				<div
					class="w-16 h-16 md:w-20 md:h-20 shrink-0 [&>svg]:w-full [&>svg]:h-full"
					style="filter: drop-shadow(0 12px 36px rgba(0,215,255,0.6));"
					aria-hidden="true">{@html smushIconSvg}</div>
				<div>
					<p class="text-[9px] font-mono tracking-[0.45em] text-neutral-500 uppercase mb-2">Next Chapter</p>
					<h3 class="text-[clamp(3rem,8vw,6rem)] font-black text-white tracking-tight leading-none">Smush</h3>
				</div>
				<p class="hidden md:block text-base text-neutral-500 leading-relaxed max-w-[28ch] pb-2 ml-auto text-right">
					Ultra, Lossy, Lossless — rebuilt for<br/>performance at scale.
				</p>
			</div>

		</div>

		<!-- Full-width stat strip — sits at the bottom edge -->
		<div class="border-t border-white/[0.07] grid grid-cols-3">
			<div class="px-8 md:px-12 py-8 border-r border-white/[0.07] flex flex-col gap-1.5">
				<span class="text-[9px] font-mono tracking-[0.28em] text-neutral-500 uppercase">Active Installs</span>
				<span class="text-xl md:text-2xl font-black text-white leading-none">1M <span class="text-[#FF4400]">→</span> 2M+</span>
			</div>
			<div class="px-8 md:px-12 py-8 border-r border-white/[0.07] flex flex-col gap-1.5">
				<span class="text-[9px] font-mono tracking-[0.28em] text-neutral-500 uppercase">Bounce Rate</span>
				<span class="text-xl md:text-2xl font-black text-[#FF4400] leading-none">−37%</span>
			</div>
			<div class="px-8 md:px-12 py-8 flex flex-col gap-1.5">
				<span class="text-[9px] font-mono tracking-[0.28em] text-neutral-500 uppercase">Ultra vs Lossy</span>
				<span class="text-xl md:text-2xl font-black text-white leading-none">5<span class="text-neutral-500 font-semibold text-base">× better</span></span>
			</div>
		</div>

	</div>
</div>


<!-- ─────────────────────────────────────────────────────────── -->
<!-- B3: Ghost numeral full-span + icon floats in the zero      -->
<!-- Feeling: Architectural, typographic sculpture              -->
<!-- ─────────────────────────────────────────────────────────── -->

<div class="max-w-6xl mx-auto px-4 md:px-6 mt-20 mb-6">
	<div class="flex items-center gap-3">
		<span class="w-6 h-6 rounded-full bg-sky-700 text-white text-[10px] font-bold flex items-center justify-center shrink-0">B3</span>
		<span class="text-xs font-mono tracking-[0.22em] text-neutral-500 uppercase">Architectural — icon floats inside the ghost "0", stats on right edge</span>
	</div>
</div>

<div class="full-bleed bg-neutral-950">
	<div class="max-w-6xl mx-auto px-4 md:px-6 pt-12 pb-16 md:pb-20 relative overflow-hidden">

		<!-- Progress strip -->
		<div class="flex items-center gap-3 mb-12 relative z-10">
			<div class="flex items-center gap-2.5 opacity-35 shrink-0">
				<div class="w-4 h-4 shrink-0 [&>svg]:w-full [&>svg]:h-full">{@html wpmuLogoSvg}</div>
				<span class="text-[9px] font-mono tracking-[0.28em] text-neutral-400 uppercase hidden sm:block">01 — Atomic Library</span>
				<svg class="w-2.5 h-2.5 text-neutral-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
				</svg>
			</div>
			<div class="flex-1 h-px bg-white/10" aria-hidden="true"></div>
			<div class="flex items-center gap-2 shrink-0">
				<span class="w-1 h-1 rounded-full bg-[#FF4400] animate-pulse" aria-hidden="true"></span>
				<span class="text-[9px] font-mono tracking-[0.28em] text-[#FF4400] uppercase">02 — Smush</span>
			</div>
		</div>

		<!-- Main layout: ghost number + right column -->
		<div class="flex flex-col md:flex-row items-start gap-8 md:gap-0 relative">

			<!-- Left: ghost numeral with icon centered inside the "0" -->
			<div class="relative flex-1 shrink-0">
				<span
					class="block text-[clamp(10rem,32vw,26rem)] font-black text-white/5.5 leading-none select-none pointer-events-none tracking-tighter -ml-3"
					aria-hidden="true">02</span>

				<!-- Icon centered vertically in the "0" bowl — left ~10% of width -->
				<div
					class="absolute top-1/2 left-[12%] -translate-y-1/2 -translate-x-1/2
					       w-16 h-16 md:w-20 md:h-20 [&>svg]:w-full [&>svg]:h-full"
					style="filter: drop-shadow(0 10px 32px rgba(0,215,255,0.65));"
					aria-hidden="true">{@html smushIconSvg}</div>

				<!-- Plugin name — sits below the number, large and white -->
				<div class="absolute bottom-0 left-0 pb-2">
					<p class="text-[9px] font-mono tracking-[0.45em] text-neutral-600 uppercase mb-1.5">Next Chapter</p>
					<h3 class="text-[clamp(1.8rem,4.5vw,3rem)] font-black text-white tracking-tight leading-none">Smush</h3>
				</div>
			</div>

			<!-- Right: editorial stats — vertical stack -->
			<div class="md:w-72 flex flex-col gap-0 self-center md:self-auto md:pt-10 shrink-0">
				<p class="text-sm text-neutral-400 leading-relaxed mb-8 max-w-[28ch]">
					Image optimization for every WordPress site — from free to enterprise scale.
				</p>

				<div class="flex flex-col gap-px border-t border-white/[0.07]">
					<div class="flex items-baseline justify-between py-4 border-b border-white/[0.07]">
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-600 uppercase">Installs</span>
						<span class="text-lg font-black text-white">2M+</span>
					</div>
					<div class="flex items-baseline justify-between py-4 border-b border-white/[0.07]">
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-600 uppercase">Bounce ↓</span>
						<span class="text-lg font-black text-[#FF4400]">37%</span>
					</div>
					<div class="flex items-baseline justify-between py-4">
						<span class="text-[9px] font-mono tracking-[0.25em] text-neutral-600 uppercase">Ultra vs Lossy</span>
						<span class="text-lg font-black text-white">5×</span>
					</div>
				</div>
			</div>

		</div>
	</div>
</div>


<!-- ═══════════════════════════════════════════════════════════ -->
<!-- SMUSH CHAPTER HEADING — REVISION DRAFTS                     -->
<!-- B1 already shows 1M→2M+, −37%, 5× in the transition.       -->
<!-- These drafts pivot the chapter opening to the feature story. -->
<!-- ═══════════════════════════════════════════════════════════ -->

<div class="max-w-6xl mx-auto px-4 md:px-6 py-16 border-t-2 border-dashed border-emerald-300/50 mt-16">
	<div class="flex flex-wrap items-center gap-3 mb-4">
		<span class="px-3 py-1.5 bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10px] font-mono uppercase tracking-widest rounded-full">
			Smush Chapter — Heading Revision
		</span>
	</div>
	<p class="text-sm text-neutral-400 max-w-xl">
		Since B1 already surfaces the achievement numbers (1M→2M+, −37%, 5×), the chapter heading should stop repeating them and tell the <em>feature story</em> instead. Two variants below — same chip row and data ledger area, different headline + ledger pivot.
	</p>
</div>


<!-- ─────────────────────────────────────────────────────────── -->
<!-- S1: Headline = feature enumeration                          -->
<!-- "Ultra. Lossy. Lossless." — names the tiers as the hook.   -->
<!-- Ledger: 5× hero stat + auto-rescan + prose                  -->
<!-- ─────────────────────────────────────────────────────────── -->

<div class="max-w-6xl mx-auto px-4 md:px-6 mb-6">
	<div class="flex items-center gap-3">
		<span class="w-7 h-7 rounded-full bg-emerald-700 text-white text-[10px] font-bold flex items-center justify-center shrink-0">S1</span>
		<span class="text-xs font-mono tracking-[0.22em] text-neutral-500 uppercase">Feature headline — tier names as the story hook</span>
	</div>
</div>

<section class="w-full bg-white pt-24 pb-20 overflow-x-hidden">
	<div class="max-w-6xl mx-auto px-4 md:px-6">

		<!-- Row 1: Title + chips -->
		<div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-12">
			<h2 class="text-[clamp(2.8rem,7vw,5.5rem)] font-black tracking-tight text-gray-900 leading-none">
				Ultra.<br/>
				<span class="text-neutral-300">Lossy.</span><br/>
				Lossless.
			</h2>
			<div class="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:pt-2 shrink-0 flex-wrap">
				<div class="relative">
					<span class="px-3 py-1.5 bg-gray-100 text-gray-500 text-[10px] font-mono uppercase tracking-widest rounded-full block">Ultra · 5×</span>
					<span class="absolute -top-2 -right-1 bg-[#FF4400] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full leading-none">NEW</span>
				</div>
				<span class="px-3 py-1.5 bg-gray-100 text-gray-500 text-[10px] font-mono uppercase tracking-widest rounded-full">Lossy</span>
				<span class="px-3 py-1.5 bg-gray-100 text-gray-500 text-[10px] font-mono uppercase tracking-widest rounded-full">Lossless</span>
			</div>
		</div>

		<!-- Row 2: Data ledger — pivoted to feature story, not install numbers -->
		<div class="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.6fr] border-t border-b border-gray-200">

			<!-- Col 1 — Hero stat: Ultra vs Lossy -->
			<div class="py-10 pr-10 md:border-r border-gray-200 border-b md:border-b-0 flex flex-col justify-between">
				<span class="text-[10px] font-mono tracking-[0.18em] text-gray-400 uppercase block mb-4">Ultra vs Lossy</span>
				<div>
					<div class="flex items-baseline leading-none mb-1">
						<span class="text-[clamp(4rem,10vw,6.5rem)] font-black text-[#FF4400] tracking-tighter leading-none">5</span>
						<span class="text-[clamp(2rem,5vw,3.5rem)] font-black text-gray-900 tracking-tighter leading-none">×</span>
					</div>
					<p class="text-sm font-semibold text-gray-500 mb-3">better compression</p>
					<p class="text-sm text-gray-400 leading-relaxed max-w-[20ch]">
						Pro-exclusive Ultra tier. Free users always keep Lossy and Lossless.
					</p>
				</div>
			</div>

			<!-- Col 2 — Auto-rescan -->
			<div class="py-10 md:px-10 md:border-r border-gray-200 border-b md:border-b-0 flex flex-col justify-between">
				<span class="text-[10px] font-mono tracking-[0.18em] text-gray-400 uppercase block mb-4">Auto-Rescan</span>
				<div>
					<div class="flex items-center gap-3 leading-none mb-3">
						<svg class="w-10 h-10 text-[#FF4400] shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
						</svg>
						<span class="text-[clamp(1.6rem,4vw,2.5rem)] font-black text-gray-900 tracking-tight leading-none">Every<br/>update</span>
					</div>
					<p class="text-sm text-gray-400 leading-relaxed max-w-[20ch]">
						Already-optimized images get revisited automatically — no manual trigger needed.
					</p>
				</div>
			</div>

			<!-- Col 3 — Editorial prose: the tier design story -->
			<div class="py-10 md:pl-10 flex flex-col justify-center">
				<p class="text-lg md:text-xl text-gray-600 leading-relaxed mb-5">
					Three tiers, one decision. Ultra pushes further than Lossy ever could — while Lossy and Lossless stay free, no subscription required.
				</p>
				<p class="text-base text-gray-400 leading-relaxed">
					The library auto-rescans on every plugin update. If a better algorithm exists, Smush finds it and applies it — even to images it already processed.
				</p>
			</div>

		</div>

	</div>
</section>


<!-- ─────────────────────────────────────────────────────────── -->
<!-- S2: Headline = outcome/benefit, dialled back               -->
<!-- "Smarter. Every time." — quieter, lets the data speak.     -->
<!-- Ledger: same 5× hero + rescan, but stat scale reduced       -->
<!-- ─────────────────────────────────────────────────────────── -->

<div class="max-w-6xl mx-auto px-4 md:px-6 mt-20 mb-6">
	<div class="flex items-center gap-3">
		<span class="w-7 h-7 rounded-full bg-emerald-700 text-white text-[10px] font-bold flex items-center justify-center shrink-0">S2</span>
		<span class="text-xs font-mono tracking-[0.22em] text-neutral-500 uppercase">Dialled-back — benefit headline, quieter ledger, the content breathes</span>
	</div>
</div>

<section class="w-full bg-white pt-24 pb-20 overflow-x-hidden">
	<div class="max-w-6xl mx-auto px-4 md:px-6">

		<!-- Row 1: Title + chips — quieter heading, smaller scale -->
		<div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-12">
			<div>
				<p class="text-[10px] font-mono tracking-[0.35em] text-neutral-400 uppercase mb-4">Image Optimization</p>
				<h2 class="text-[clamp(2.4rem,6vw,4.5rem)] font-black tracking-tight text-gray-900 leading-none">
					Smarter.<br/>
					<span class="text-neutral-300">Every time.</span>
				</h2>
			</div>
			<div class="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:pt-8 shrink-0 flex-wrap">
				<div class="relative">
					<span class="px-3 py-1.5 bg-gray-100 text-gray-500 text-[10px] font-mono uppercase tracking-widest rounded-full block">Ultra · 5×</span>
					<span class="absolute -top-2 -right-1 bg-[#FF4400] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full leading-none">NEW</span>
				</div>
				<span class="px-3 py-1.5 bg-gray-100 text-gray-500 text-[10px] font-mono uppercase tracking-widest rounded-full">Lossy</span>
				<span class="px-3 py-1.5 bg-gray-100 text-gray-500 text-[10px] font-mono uppercase tracking-widest rounded-full">Lossless</span>
			</div>
		</div>

		<!-- Row 2: Ledger — same pivot, stat numbers smaller/supporting -->
		<div class="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.6fr] border-t border-b border-gray-200">

			<!-- Col 1 — Ultra vs Lossy — same stat, smaller typescale -->
			<div class="py-10 pr-10 md:border-r border-gray-200 border-b md:border-b-0 flex flex-col justify-between">
				<span class="text-[10px] font-mono tracking-[0.18em] text-gray-400 uppercase block mb-4">Ultra vs Lossy</span>
				<div>
					<div class="flex items-baseline gap-1 leading-none mb-2">
						<span class="text-[clamp(2.8rem,7vw,5rem)] font-black text-[#FF4400] tracking-tighter leading-none">5×</span>
						<span class="text-base font-semibold text-gray-500 leading-none pb-1 ml-1">better</span>
					</div>
					<p class="text-sm text-gray-400 leading-relaxed max-w-[20ch]">
						Pro-exclusive. Lossy and Lossless remain free — always.
					</p>
				</div>
			</div>

			<!-- Col 2 — Auto-rescan — text only, no icon -->
			<div class="py-10 md:px-10 md:border-r border-gray-200 border-b md:border-b-0 flex flex-col justify-between">
				<span class="text-[10px] font-mono tracking-[0.18em] text-gray-400 uppercase block mb-4">Re-Scan Logic</span>
				<div>
					<p class="text-base font-semibold text-gray-700 leading-snug mb-3 max-w-[22ch]">
						Already-optimized images get a second look on every update.
					</p>
					<p class="text-sm text-gray-400 leading-relaxed max-w-[22ch]">
						If a better algorithm exists, Smush finds it — automatically, no manual trigger.
					</p>
				</div>
			</div>

			<!-- Col 3 — Prose: tier design rationale -->
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
</section>


<!-- ─────────────────────────────────────────────────────────── -->
<!-- S3: S2 base + animated rotation icon with glow bloom       -->
<!-- ─────────────────────────────────────────────────────────── -->

<div class="max-w-6xl mx-auto px-4 md:px-6 mt-20 mb-6">
	<div class="flex items-center gap-3">
		<span class="w-7 h-7 rounded-full bg-emerald-700 text-white text-[10px] font-bold flex items-center justify-center shrink-0">S3</span>
		<span class="text-xs font-mono tracking-[0.22em] text-neutral-500 uppercase">S2 + animated rescan icon — slow spin, 3s glow bloom, subtle</span>
	</div>
</div>

<section class="w-full bg-white pt-24 pb-20 overflow-x-hidden">
	<div class="max-w-6xl mx-auto px-4 md:px-6">

		<!-- Row 1: Title + chips — same as S2 -->
		<div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-12">
			<div>
				<p class="text-[10px] font-mono tracking-[0.35em] text-neutral-400 uppercase mb-4">Image Optimization</p>
				<h2 class="text-[clamp(2.4rem,6vw,4.5rem)] font-black tracking-tight text-gray-900 leading-none">
					Smarter.<br/>
					<span class="text-neutral-300">Every time.</span>
				</h2>
			</div>
			<div class="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:pt-8 shrink-0 flex-wrap">
				<div class="relative">
					<span class="px-3 py-1.5 bg-gray-100 text-gray-500 text-[10px] font-mono uppercase tracking-widest rounded-full block">Ultra · 5×</span>
					<span class="absolute -top-2 -right-1 bg-[#FF4400] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full leading-none">NEW</span>
				</div>
				<span class="px-3 py-1.5 bg-gray-100 text-gray-500 text-[10px] font-mono uppercase tracking-widest rounded-full">Lossy</span>
				<span class="px-3 py-1.5 bg-gray-100 text-gray-500 text-[10px] font-mono uppercase tracking-widest rounded-full">Lossless</span>
			</div>
		</div>

		<!-- Row 2: Ledger -->
		<div class="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.6fr] border-t border-b border-gray-200">

			<!-- Col 1 — 5× stat with text glow -->
			<div class="py-10 pr-10 md:border-r border-gray-200 border-b md:border-b-0 flex flex-col justify-between">
				<span class="text-[10px] font-mono tracking-[0.18em] text-gray-400 uppercase block mb-4">Ultra vs Lossy</span>
				<div>
					<div class="flex items-baseline gap-1 leading-none mb-2">
						<span class="text-glow text-[clamp(2.8rem,7vw,5rem)] font-black text-[#FF4400] tracking-tighter leading-none">5×</span>
						<span class="text-base font-semibold text-gray-500 leading-none pb-1 ml-1">better</span>
					</div>
					<p class="text-sm text-gray-400 leading-relaxed max-w-[20ch]">
						Pro-exclusive. Lossy and Lossless remain free — always.
					</p>
				</div>
			</div>

			<!-- Col 2 — Rescan icon: spin only, no halo, smaller -->
			<div class="py-10 md:px-10 md:border-r border-gray-200 border-b md:border-b-0 flex flex-col justify-between">
				<span class="text-[10px] font-mono tracking-[0.18em] text-gray-400 uppercase block mb-4">Re-Scan Logic</span>
				<div class="flex flex-col gap-4">

					<!-- Icon: small, rotation only -->
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

			<!-- Col 3 — Prose -->
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
</section>


<!-- ═══════════════════════════════════════════════════════════ -->
<!-- DRAFT FOOTER                                                -->
<!-- ═══════════════════════════════════════════════════════════ -->
<div class="max-w-6xl mx-auto px-4 md:px-6 py-16 border-t-2 border-dashed border-amber-300/60 mt-16">
	<p class="text-[10px] font-mono tracking-[0.22em] text-neutral-300 uppercase">
		End of drafts — confirm options to implement
	</p>
</div>
