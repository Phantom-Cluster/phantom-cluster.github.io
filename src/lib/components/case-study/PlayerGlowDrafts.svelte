<style>
	/* ── Shared glow keyframes for glow variants ──────────────── */
	@keyframes glow-pulse {
		0%, 100% { text-shadow: none; }
		50%       { text-shadow: 0 0 20px rgba(255,68,0,0.55), 0 0 48px rgba(255,68,0,0.18); }
	}
	@keyframes accent-glow {
		0%, 100% { text-shadow: 0 0 0px  rgba(255,68,0,0); }
		40%       { text-shadow: 0 0 10px rgba(255,68,0,0.5), 0 0 28px rgba(255,68,0,0.2); }
		60%       { text-shadow: 0 0 10px rgba(255,68,0,0.5), 0 0 28px rgba(255,68,0,0.2); }
		100%      { text-shadow: 0 0 0px  rgba(255,68,0,0); }
	}
	@keyframes ink-breathe {
		0%, 100% { opacity: 1; }
		50%       { opacity: 0.62; }
	}
	@keyframes shimmer-bar {
		0%   { background-position: 200% center; }
		100% { background-position: -200% center; }
	}

	/* G1 — glow only on the orange + sign */
	.g1-plus { animation: accent-glow 4s cubic-bezier(0.45,0,0.55,1) infinite; }

	/* G2 — dark number breathes opacity */
	.g2-num { animation: ink-breathe 4s cubic-bezier(0.45,0,0.55,1) infinite; }

	/* G3 — warm shimmer on the text fill (gradient sweep) */
	.g3-num {
		background: linear-gradient(90deg, #111 30%, #FF4400 50%, #111 70%);
		background-size: 200% auto;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: shimmer-bar 5s cubic-bezier(0.45,0,0.55,1) infinite;
	}

	/* G4 — no animation — pure static weight */
</style>

<!-- ═══════════════════════════════════════════════════════════════
     DRAFTS: Player shell + Glow alternatives
     Remove this component once options are chosen.
     ═══════════════════════════════════════════════════════════════ -->
<section class="w-full bg-neutral-100 py-24 overflow-x-hidden">
	<div class="max-w-6xl mx-auto px-4 md:px-6 mb-16">
		<p class="text-[10px] font-mono tracking-[0.35em] text-neutral-400 uppercase mb-2">Draft Zone</p>
		<h2 class="text-2xl font-black text-neutral-900 tracking-tight">Player Shell &amp; Glow Variations</h2>
		<p class="text-sm text-neutral-500 mt-2">5 player wrappers · 4 glow treatments · pick one of each</p>
	</div>

	<!-- ══ SECTION A: Glow Alternatives ════════════════════════════ -->
	<div class="max-w-6xl mx-auto px-4 md:px-6 mb-24">
		<p class="text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase mb-8">A — Glow options for "200+"</p>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4">

			<!-- G1: Glow only on the orange accent (+) -->
			<div class="bg-white rounded-2xl p-8 border border-neutral-200 flex flex-col gap-3">
				<span class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">G1 — Accent only</span>
				<div class="flex items-baseline leading-none">
					<span class="text-[clamp(3rem,7vw,4.5rem)] font-black text-gray-900 tracking-tighter leading-none">200</span>
					<span class="g1-plus text-[clamp(2rem,4.5vw,3rem)] font-black text-[#FF4400] tracking-tighter leading-none">+</span>
				</div>
				<p class="text-[10px] text-neutral-400 mt-1">Glow on orange only — number is static. Color match is perfect; feels deliberate not accidental.</p>
			</div>

			<!-- G2: Dark number breathes opacity -->
			<div class="bg-white rounded-2xl p-8 border border-neutral-200 flex flex-col gap-3">
				<span class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">G2 — Ink breathe</span>
				<div class="flex items-baseline leading-none">
					<span class="g2-num text-[clamp(3rem,7vw,4.5rem)] font-black text-gray-900 tracking-tighter leading-none">200</span>
					<span class="text-[clamp(2rem,4.5vw,3rem)] font-black text-[#FF4400] tracking-tighter leading-none">+</span>
				</div>
				<p class="text-[10px] text-neutral-400 mt-1">Number pulses opacity 100→62→100%. Warm, alive without any color conflict. Like a beating stat.</p>
			</div>

			<!-- G3: Warm shimmer sweep on number fill -->
			<div class="bg-white rounded-2xl p-8 border border-neutral-200 flex flex-col gap-3">
				<span class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">G3 — Shimmer sweep</span>
				<div class="flex items-baseline leading-none">
					<span class="g3-num text-[clamp(3rem,7vw,4.5rem)] font-black tracking-tighter leading-none">200</span>
					<span class="text-[clamp(2rem,4.5vw,3rem)] font-black text-[#FF4400] tracking-tighter leading-none">+</span>
				</div>
				<p class="text-[10px] text-neutral-400 mt-1">Orange light sweeps through the dark number as a fill gradient. Premium editorial feel — like a spotlight pass.</p>
			</div>

			<!-- G4: No animation — pure static typography -->
			<div class="bg-white rounded-2xl p-8 border border-neutral-200 flex flex-col gap-3">
				<span class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">G4 — Static (no glow)</span>
				<div class="flex items-baseline leading-none">
					<span class="text-[clamp(3rem,7vw,4.5rem)] font-black text-gray-900 tracking-tighter leading-none">200</span>
					<span class="text-[clamp(2rem,4.5vw,3rem)] font-black text-[#FF4400] tracking-tighter leading-none">+</span>
				</div>
				<p class="text-[10px] text-neutral-400 mt-1">No motion. Let the weight and scale carry the impact. Often the most confident choice — nothing to prove.</p>
			</div>

		</div>
	</div>

	<!-- ══ SECTION B: Player Shell Variations ══════════════════════ -->
	<div class="max-w-[1400px] mx-auto px-4 md:px-8 space-y-10">
		<p class="text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase">B — Player wrapper options</p>

		<!-- P1: Frameless — bare video, shadow only -->
		<div>
			<p class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase mb-3">P1 — Frameless (shadow only)</p>
			<div class="rounded-2xl overflow-hidden shadow-[0_4px_48px_rgba(0,0,0,0.10),0_1px_0_rgba(0,0,0,0.04)] border border-neutral-200/60">
				<div class="relative bg-neutral-900 aspect-video flex items-center justify-center rounded-2xl overflow-hidden">
					<div class="absolute top-4 left-5 flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
						<span class="w-1.5 h-1.5 rounded-full bg-[#FF4400] animate-pulse shrink-0"></span>
						<span class="text-[9px] font-mono tracking-widest text-white/70 uppercase">SUI&nbsp;3 · Background Rules</span>
					</div>
					<p class="text-neutral-600 font-mono text-xs tracking-widest uppercase">[ video ]</p>
				</div>
			</div>
			<p class="text-[10px] text-neutral-400 mt-2">No outer chrome — video sits flush. Ultra-thin 1px border provides just enough frame. Most modern, least noise.</p>
		</div>

		<!-- P2: Paper thin border — 1px outer ring, minimal padding -->
		<div>
			<p class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase mb-3">P2 — Paper thin ring</p>
			<div class="p-1.5 bg-white border border-neutral-200 rounded-3xl shadow-[0_2px_24px_rgba(0,0,0,0.07),0_0_0_0.5px_rgba(0,0,0,0.04)]">
				<div class="relative bg-neutral-900 aspect-video flex items-center justify-center rounded-2xl overflow-hidden">
					<div class="absolute top-4 left-5 flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
						<span class="w-1.5 h-1.5 rounded-full bg-[#FF4400] animate-pulse shrink-0"></span>
						<span class="text-[9px] font-mono tracking-widest text-white/70 uppercase">SUI&nbsp;3 · Background Rules</span>
					</div>
					<p class="text-neutral-600 font-mono text-xs tracking-widest uppercase">[ video ]</p>
				</div>
			</div>
			<p class="text-[10px] text-neutral-400 mt-2">6px white gap, clean border, no bevel. Thin ring approach — looks like the video is mounted on the page. No inset shadows.</p>
		</div>

		<!-- P3: Frosted inset — very subtle inner shadow, no border -->
		<div>
			<p class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase mb-3">P3 — Frosted inset (no border)</p>
			<div class="p-2 bg-neutral-50 rounded-3xl shadow-[inset_0_1px_2px_rgba(0,0,0,0.06),0_2px_32px_rgba(0,0,0,0.08)]">
				<div class="relative bg-neutral-900 aspect-video flex items-center justify-center rounded-2xl overflow-hidden">
					<div class="absolute top-4 left-5 flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
						<span class="w-1.5 h-1.5 rounded-full bg-[#FF4400] animate-pulse shrink-0"></span>
						<span class="text-[9px] font-mono tracking-widest text-white/70 uppercase">SUI&nbsp;3 · Background Rules</span>
					</div>
					<p class="text-neutral-600 font-mono text-xs tracking-widest uppercase">[ video ]</p>
				</div>
			</div>
			<p class="text-[10px] text-neutral-400 mt-2">Light inset shadow on the outer tray (depressed feel). No border line. The video appears set into the page surface rather than sitting on top of it.</p>
		</div>

		<!-- P4: Dark float — near-black tinted tray, no bevel, clean drop shadow -->
		<div>
			<p class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase mb-3">P4 — Dark float</p>
			<div class="p-2 bg-neutral-950/[0.05] rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.12),0_1px_0_rgba(255,255,255,0.5)_inset]">
				<div class="relative bg-neutral-900 aspect-video flex items-center justify-center rounded-2xl overflow-hidden">
					<div class="absolute top-4 left-5 flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
						<span class="w-1.5 h-1.5 rounded-full bg-[#FF4400] animate-pulse shrink-0"></span>
						<span class="text-[9px] font-mono tracking-widest text-white/70 uppercase">SUI&nbsp;3 · Background Rules</span>
					</div>
					<p class="text-neutral-600 font-mono text-xs tracking-widest uppercase">[ video ]</p>
				</div>
			</div>
			<p class="text-[10px] text-neutral-400 mt-2">5% near-black tray, clean drop shadow underneath, 1px white highlight on top edge only. Flat but grounded. Feels like a physical slab.</p>
		</div>

		<!-- P5: Ghost ring — transparent, only an outline, strong drop shadow -->
		<div>
			<p class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase mb-3">P5 — Ghost ring (outline only)</p>
			<div class="p-2 bg-transparent border border-neutral-300/70 rounded-3xl shadow-[0_12px_48px_rgba(0,0,0,0.11),0_2px_8px_rgba(0,0,0,0.05)]">
				<div class="relative bg-neutral-900 aspect-video flex items-center justify-center rounded-2xl overflow-hidden">
					<div class="absolute top-4 left-5 flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
						<span class="w-1.5 h-1.5 rounded-full bg-[#FF4400] animate-pulse shrink-0"></span>
						<span class="text-[9px] font-mono tracking-widest text-white/70 uppercase">SUI&nbsp;3 · Background Rules</span>
					</div>
					<p class="text-neutral-600 font-mono text-xs tracking-widest uppercase">[ video ]</p>
				</div>
			</div>
			<p class="text-[10px] text-neutral-400 mt-2">Transparent fill — only a hairline border and soft shadow. The video appears to float inside a glass frame. Very clean, minimal material.</p>
		</div>

	</div>
</section>
