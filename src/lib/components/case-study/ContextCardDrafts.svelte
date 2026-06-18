<!-- ═══════════════════════════════════════════════════════════
     DRAFTS: Context Card — 3 best variations
     Hummingbird data. Generalise once one is chosen.
     Remove this file once option is confirmed.
     ═══════════════════════════════════════════════════════════ -->
<section class="w-full bg-neutral-100 py-28 overflow-x-hidden">
	<div class="max-w-6xl mx-auto px-4 md:px-6 mb-16">
		<p class="text-[10px] font-mono tracking-[0.35em] text-neutral-400 uppercase mb-2">Draft Zone</p>
		<h2 class="text-2xl font-black text-neutral-900 tracking-tight">Context Card — 3 Best Variations</h2>
		<p class="text-sm text-neutral-500 mt-2">All three use the same data. Pick one to roll out across all 4 chapters.</p>
	</div>

	<div class="max-w-6xl mx-auto px-4 md:px-6 space-y-24">

		<!-- ══════════════════════════════════════════════════════════
		     OPTION A — "The Brief" (Research · Hypothesis · Shipped)
		     Two-column: evidence left, decisions + proof right.
		     ══════════════════════════════════════════════════════════ -->
		<div>
			<div class="flex items-center gap-4 mb-5">
				<span class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">Option A — The Brief</span>
				<span class="text-[9px] font-mono tracking-widest text-[#FF4400] uppercase">Best for: evidence-first narrative</span>
			</div>
			<div class="rounded-3xl overflow-hidden border border-neutral-200 shadow-[0_8px_40px_rgba(0,0,0,0.07)]">

				<!-- Doc header -->
				<div class="bg-neutral-950 px-8 md:px-10 py-5 flex items-center justify-between border-b border-white/5">
					<div class="flex items-center gap-4">
						<div class="w-1.5 h-1.5 rounded-full bg-[#FF4400] animate-pulse shrink-0"></div>
						<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-400 uppercase">Hummingbird 3.0 · Design Brief</span>
					</div>
					<span class="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[9px] font-mono tracking-widest uppercase">✓ Shipped · Hypothesis Confirmed</span>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-[1fr_1.1fr]">

					<!-- LEFT: Research + Hypothesis -->
					<div class="bg-neutral-950 px-8 md:px-10 py-10 flex flex-col gap-8 border-r border-white/5">

						<!-- Research signals -->
						<div class="flex flex-col gap-5">
							<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase">Research signals · 214 surveys + 8 sessions</span>
							<div class="space-y-4">
								{#each [
									{ n: '67%',   finding: 'couldn\'t confirm if optimization was active after setup' },
									{ n: '4.2m',  finding: 'avg time wasted re-checking already-configured settings' },
									{ n: '3 of 8',finding: 'session users disabled features assuming they were broken' },
									{ n: '#1',    finding: 'support ticket type: "is this even working?"' },
								] as s}
									<div class="flex items-start gap-4">
										<span class="text-[#FF4400] font-black text-sm w-12 shrink-0 mt-0.5">{s.n}</span>
										<span class="text-xs text-neutral-400 leading-relaxed">{s.finding}</span>
									</div>
								{/each}
							</div>
						</div>

						<!-- Hypothesis -->
						<div class="border-t border-white/6 pt-7 flex flex-col gap-3">
							<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase">Hypothesis</span>
							<p class="text-sm text-neutral-300 leading-relaxed">
								If optimization status is visible <em class="not-italic text-white font-semibold">inline — next to the control that owns it</em> — users will trust the system and stop second-guessing their setup.
							</p>
							<p class="text-xs text-neutral-500 leading-relaxed">
								Critical CSS and JS Defer didn't exist in v2 — users had only CSS Minify and a basic JS optimization toggle. Introducing them as <span class="text-neutral-400">default-on</span> features was the core capability bet.
							</p>
						</div>

					</div>

					<!-- RIGHT: What we changed + Proof -->
					<div class="bg-white px-8 md:px-10 py-10 flex flex-col gap-8">

						<!-- What we changed -->
						<div class="flex flex-col gap-5">
							<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-400 uppercase">What we changed</span>
							<div class="space-y-5">
								{#each [
									{
										n: '01',
										action: 'Inline optimization status',
										detail: 'Critical CSS generation state, JS Defer exclusion counts, compression ratios — surfaced next to each control, always visible.',
									},
									{
										n: '02',
										action: 'Critical CSS + JS Defer — new, default on',
										detail: 'Replaced basic CSS Minify + JS optimization. Shipped as default-enabled so every new user got full optimization without manual setup.',
									},
									{
										n: '03',
										action: 'Progressive disclosure',
										detail: 'Advanced controls available one level deeper. Power users get full control; new users see a clean, confident interface.',
									},
									{
										n: '04',
										action: 'Live status badges on dashboard',
										detail: 'Active optimization state visible before opening any settings panel. Zero ambiguity about what\'s running.',
									},
								] as step}
									<div class="flex gap-4">
										<span class="text-[#FF4400] text-[10px] font-black font-mono shrink-0 mt-1">{step.n}</span>
										<div>
											<p class="text-sm font-bold text-neutral-900 leading-snug mb-1">{step.action}</p>
											<p class="text-xs text-neutral-500 leading-relaxed">{step.detail}</p>
										</div>
									</div>
								{/each}
							</div>
						</div>

						<!-- Proof + confirmation -->
						<div class="border-t border-neutral-100 pt-7">
							<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-400 uppercase block mb-5">Measured post-launch</span>
							<div class="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
								{#each [
									{ stat: '<1s',  label: 'Page load',        sub: 'down from 5–6s' },
									{ stat: '+75%', label: 'Performance gain',  sub: 'across 20+ deployments' },
									{ stat: '−42%', label: 'Support tickets',   sub: '"not working" category' },
									{ stat: '−37%', label: 'Bounce rate',       sub: 'post-launch average' },
								] as m}
									<div>
										<span class="text-[clamp(1.3rem,2.5vw,1.7rem)] font-black text-[#FF4400] tracking-tight leading-none block">{m.stat}</span>
										<span class="text-xs font-semibold text-neutral-700 block mt-0.5">{m.label}</span>
										<span class="text-[10px] text-neutral-400">{m.sub}</span>
									</div>
								{/each}
							</div>
							<div class="flex items-center gap-2.5 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
								<div class="w-2 h-2 rounded-full bg-green-400 shrink-0"></div>
								<span class="text-xs font-semibold text-green-700">Hypothesis confirmed in production — users stopped disabling active features within 2 weeks of launch.</span>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>

		<!-- ══════════════════════════════════════════════════════════
		     OPTION B — "Research Wall" (Insight cards + voice + proof)
		     CC9 depth + CC7 numbered decisions + confirmation.
		     ══════════════════════════════════════════════════════════ -->
		<div>
			<div class="flex items-center gap-4 mb-5">
				<span class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">Option B — Research Wall</span>
				<span class="text-[9px] font-mono tracking-widest text-[#FF4400] uppercase">Best for: showing process depth</span>
			</div>
			<div class="rounded-3xl overflow-hidden border border-neutral-200 shadow-[0_8px_40px_rgba(0,0,0,0.07)]">

				<!-- Core finding -->
				<div class="bg-neutral-950 px-8 md:px-12 py-10 border-b border-white/5">
					<div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
						<div>
							<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase block mb-5">Core research finding · Hummingbird</span>
							<p class="text-[clamp(1.1rem,3vw,1.7rem)] font-black text-white leading-snug max-w-2xl">
								Users weren't failing at optimization — they were failing at <span class="text-[#FF4400]">trust.</span><br/>
								The system worked. The interface didn't show it.
							</p>
						</div>
						<blockquote class="shrink-0 max-w-xs">
							<p class="text-sm text-neutral-400 italic leading-relaxed border-l-2 border-[#FF4400]/40 pl-4">
								"I set it up, it said done, but pages were still slow. I turned everything off thinking it wasn't working."
							</p>
							<span class="text-[9px] font-mono text-neutral-600 mt-2 block pl-4">User 4 · Session recording · Hummingbird beta</span>
						</blockquote>
					</div>
				</div>

				<!-- Research insight cards -->
				<div class="bg-neutral-50 px-8 md:px-12 py-8 border-b border-neutral-200">
					<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-400 uppercase block mb-5">Research signals · 214 surveys + 8 usability sessions</span>
					<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
						{#each [
							{ severity: 'Critical', bg: 'bg-red-50 border-red-200', label: 'text-red-600', stat: '67%',   insight: 'couldn\'t confirm optimization was active post-setup', tag: 'Visibility gap' },
							{ severity: 'Critical', bg: 'bg-red-50 border-red-200', label: 'text-red-600', stat: '#1',    insight: 'support category: "is this even working?" — before inline status', tag: 'Trust failure' },
							{ severity: 'High',     bg: 'bg-amber-50 border-amber-200', label: 'text-amber-700', stat: '3/8', insight: 'session users disabled features they thought were broken', tag: 'False negative' },
							{ severity: 'High',     bg: 'bg-amber-50 border-amber-200', label: 'text-amber-700', stat: '4.2m',insight: 'avg wasted re-checking already-configured settings', tag: 'Wasted effort' },
							{ severity: 'Medium',   bg: 'bg-neutral-100 border-neutral-300', label: 'text-neutral-600', stat: 'v2',  insight: 'only had CSS Minify + basic JS toggle — no Critical CSS, no JS Defer', tag: 'Capability gap' },
							{ severity: 'Medium',   bg: 'bg-neutral-100 border-neutral-300', label: 'text-neutral-600', stat: '0',   insight: 'visual difference between "optimizing" and "idle" states in v2', tag: 'State clarity' },
						] as card}
							<div class="bg-white rounded-2xl border border-neutral-200 p-5 flex flex-col gap-3">
								<div class="flex items-center justify-between">
									<span class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">Finding</span>
									<span class="px-2 py-0.5 rounded-full text-[8px] font-mono uppercase tracking-widest border {card.bg} {card.label}">{card.severity}</span>
								</div>
								<div class="flex items-baseline gap-2">
									<span class="text-xl font-black text-neutral-900 tracking-tight leading-none">{card.stat}</span>
								</div>
								<p class="text-xs text-neutral-600 leading-relaxed flex-1">{card.insight}</p>
								<span class="text-[8px] font-mono tracking-widest text-neutral-400 uppercase border-t border-neutral-100 pt-2">{card.tag}</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- Hypothesis bar -->
				<div class="bg-white px-8 md:px-12 py-6 border-b border-neutral-200">
					<div class="flex flex-col md:flex-row md:items-center gap-4">
						<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-400 uppercase shrink-0">Hypothesis</span>
						<div class="w-px h-5 bg-neutral-200 shrink-0 hidden md:block"></div>
						<p class="text-sm text-neutral-700 leading-relaxed">
							Making status visible inline — and shipping Critical CSS + JS Defer as default-on replacements for the old CSS Minify / JS toggle — would eliminate the trust gap and reduce the support burden.
						</p>
					</div>
				</div>

				<!-- What we changed + proof -->
				<div class="bg-white px-8 md:px-12 py-8 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8">
					<!-- Numbered changes -->
					<div class="flex flex-col gap-5">
						<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-400 uppercase">What we changed</span>
						<div class="space-y-4">
							{#each [
								{ n: '01', action: 'Inline status on every control', detail: 'Critical CSS generation state, JS Defer exclusion counts, compression ratios — always in view.' },
								{ n: '02', action: 'Critical CSS · New, default on', detail: 'Replaced CSS Minify. Generates above-the-fold styles automatically. Ships enabled for all new installs.' },
								{ n: '03', action: 'JS Defer · New, default on', detail: 'Replaced basic JS optimization. Defers non-critical scripts with safe exclusion logic built in.' },
								{ n: '04', action: 'Progressive disclosure', detail: 'Advanced controls one level deeper — clean for beginners, full access for power users.' },
							] as step}
								<div class="flex gap-4">
									<span class="text-[#FF4400] text-[10px] font-black font-mono shrink-0 mt-0.5">{step.n}</span>
									<div>
										<p class="text-sm font-bold text-neutral-900 leading-snug mb-0.5">{step.action}</p>
										<p class="text-xs text-neutral-500 leading-relaxed">{step.detail}</p>
									</div>
								</div>
							{/each}
						</div>
					</div>
					<!-- Proof + confirmation -->
					<div class="flex flex-col justify-between gap-6">
						<div>
							<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-400 uppercase block mb-4">Post-launch proof</span>
							<div class="grid grid-cols-2 gap-4">
								{#each [
									{ stat: '<1s',  label: 'Page load' },
									{ stat: '+75%', label: 'Performance' },
									{ stat: '−42%', label: 'Support tickets' },
									{ stat: '−37%', label: 'Bounce rate' },
								] as m}
									<div class="bg-neutral-50 rounded-xl px-4 py-3 border border-neutral-100">
										<span class="text-[clamp(1.2rem,2.5vw,1.6rem)] font-black text-[#FF4400] tracking-tight leading-none block">{m.stat}</span>
										<span class="text-[10px] text-neutral-500 mt-0.5 block">{m.label}</span>
									</div>
								{/each}
							</div>
						</div>
						<div class="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
							<div class="w-2 h-2 rounded-full bg-green-400 shrink-0 mt-1"></div>
							<p class="text-xs font-semibold text-green-700 leading-snug">Hypothesis confirmed — "is this working?" tickets dropped 42%. Users stopped disabling active features within 2 weeks of launch.</p>
						</div>
					</div>
				</div>

			</div>
		</div>

		<!-- ══════════════════════════════════════════════════════════
		     OPTION C — "Signal · Fix · Proof" (3-column, most compact)
		     CC10 structure + hypothesis + CC7 numbered list + confirm.
		     ══════════════════════════════════════════════════════════ -->
		<div>
			<div class="flex items-center gap-4 mb-5">
				<span class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">Option C — Signal · Fix · Proof</span>
				<span class="text-[9px] font-mono tracking-widest text-[#FF4400] uppercase">Best for: fast scan, high visual impact</span>
			</div>
			<div class="rounded-3xl overflow-hidden border border-neutral-200 shadow-[0_8px_40px_rgba(0,0,0,0.07)]">
				<div class="grid grid-cols-1 md:grid-cols-3">

					<!-- Col 1: Research signal -->
					<div class="bg-neutral-950 px-8 py-10 flex flex-col justify-between gap-8">
						<div>
							<div class="flex items-center gap-2 mb-6">
								<div class="w-1.5 h-1.5 rounded-full bg-[#FF4400] animate-pulse shrink-0"></div>
								<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase">Research signal</span>
							</div>
							<div class="space-y-6">
								<div>
									<span class="text-[clamp(3rem,7vw,5rem)] font-black text-white tracking-tighter leading-none block">67<span class="text-[#FF4400]">%</span></span>
									<p class="text-xs text-neutral-400 mt-2 leading-snug">couldn't confirm optimization was active after full setup</p>
								</div>
								<div class="grid grid-cols-2 gap-4">
									<div>
										<span class="text-xl font-black text-neutral-400 tracking-tight">#1</span>
										<p class="text-[10px] text-neutral-600 mt-0.5">support ticket: "is it working?"</p>
									</div>
									<div>
										<span class="text-xl font-black text-neutral-400 tracking-tight">3/8</span>
										<p class="text-[10px] text-neutral-600 mt-0.5">users disabled running features</p>
									</div>
								</div>
							</div>
						</div>
						<!-- User quote -->
						<blockquote class="border-l-2 border-[#FF4400]/40 pl-4">
							<p class="text-xs text-neutral-500 italic leading-relaxed">"Pages were still slow after setup. I turned everything off."</p>
							<span class="text-[9px] font-mono text-neutral-700 mt-1.5 block">User 4 · Session recording</span>
						</blockquote>
						<!-- Hypothesis -->
						<div class="border-t border-white/6 pt-6">
							<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-600 uppercase block mb-2">Hypothesis</span>
							<p class="text-xs text-neutral-500 leading-relaxed">Surface status inline. Ship Critical CSS + JS Defer as defaults. Eliminate the trust gap.</p>
						</div>
					</div>

					<!-- Col 2: What we changed (numbered, orange) -->
					<div class="bg-[#FF4400] px-8 py-10 flex flex-col gap-6 relative overflow-hidden">
						<div class="absolute top-0 right-0 w-56 h-56 rounded-full opacity-[0.1]" style="background: radial-gradient(circle, white 0%, transparent 70%); transform: translate(30%, -30%)"></div>
						<span class="text-[9px] font-mono tracking-[0.3em] text-white/60 uppercase relative z-10">What we changed</span>
						<div class="space-y-5 flex-1 relative z-10">
							{#each [
								{ n: '01', action: 'Inline status per control', detail: 'Critical CSS state, JS Defer counts, compression ratios — always visible.' },
								{ n: '02', action: 'Critical CSS · New default', detail: 'Replaced CSS Minify. Auto-generates above-the-fold styles, enabled by default.' },
								{ n: '03', action: 'JS Defer · New default', detail: 'Replaced JS optimization toggle. Defers non-critical scripts safely from day one.' },
								{ n: '04', action: 'Progressive disclosure', detail: 'Clean for beginners, full control one tap deeper for power users.' },
							] as step}
								<div class="flex gap-3">
									<span class="text-white/50 text-[10px] font-mono font-black shrink-0 mt-0.5">{step.n}</span>
									<div>
										<p class="text-sm font-bold text-white leading-snug">{step.action}</p>
										<p class="text-xs text-white/70 leading-relaxed mt-0.5">{step.detail}</p>
									</div>
								</div>
							{/each}
						</div>
						<div class="relative z-10 border-t border-white/20 pt-5">
							<span class="text-[9px] font-mono text-white/50 uppercase tracking-widest block mb-1">Design principle</span>
							<span class="text-sm font-bold text-white">Show the system's work.</span>
						</div>
					</div>

					<!-- Col 3: Proof + confirmation -->
					<div class="bg-white px-8 py-10 flex flex-col justify-between gap-8 border-l border-neutral-100">
						<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-400 uppercase">Post-launch proof</span>
						<div class="grid grid-cols-2 gap-5">
							{#each [
								{ stat: '<1s',  label: 'Page load',       sub: 'from 5–6s' },
								{ stat: '+75%', label: 'Performance',      sub: '20+ deployments' },
								{ stat: '−42%', label: 'Support tickets',  sub: '"not working"' },
								{ stat: '−37%', label: 'Bounce rate',      sub: 'post-launch' },
							] as m}
								<div class="flex flex-col gap-1">
									<span class="text-[clamp(1.4rem,3vw,2rem)] font-black text-[#FF4400] tracking-tight leading-none">{m.stat}</span>
									<span class="text-xs font-semibold text-neutral-700">{m.label}</span>
									<span class="text-[10px] text-neutral-400">{m.sub}</span>
								</div>
							{/each}
						</div>
						<div class="flex flex-col gap-3">
							<div class="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
								<div class="w-2 h-2 rounded-full bg-green-400 shrink-0 mt-0.5"></div>
								<p class="text-xs font-semibold text-green-700 leading-snug">Hypothesis confirmed — "not working" tickets dropped 42% within 6 weeks.</p>
							</div>
							<div class="flex items-start gap-3 bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3">
								<div class="w-2 h-2 rounded-full bg-neutral-400 shrink-0 mt-0.5"></div>
								<p class="text-xs text-neutral-500 leading-snug">Measured across 20+ live WordPress deployments with varied plugin stacks.</p>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>

		<!-- ══════════════════════════════════════════════════════════
		     OPTION B1 — Research Wall · High Contrast
		     Stronger severity fills, bolder proof numbers,
		     orange accent line on core finding, darker card bg.
		     ══════════════════════════════════════════════════════════ -->
		<div>
			<div class="flex items-center gap-4 mb-5">
				<span class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">Option B1 — Research Wall · High Contrast</span>
				<span class="text-[9px] font-mono tracking-widest text-[#FF4400] uppercase">More contrast, bolder severity</span>
			</div>
			<div class="rounded-3xl overflow-hidden border border-neutral-800 shadow-[0_12px_56px_rgba(0,0,0,0.18)]">

				<!-- Core finding — full black + orange left rule -->
				<div class="bg-black px-8 md:px-12 py-12 border-b border-white/5 relative overflow-hidden">
					<div class="absolute left-0 top-0 bottom-0 w-1 bg-[#FF4400]"></div>
					<div class="absolute top-0 right-0 w-96 h-96 opacity-[0.04] pointer-events-none" style="background: radial-gradient(circle, #FF4400 0%, transparent 70%); transform: translate(30%, -30%)"></div>
					<div class="flex flex-col md:flex-row md:items-end md:justify-between gap-8 relative z-10">
						<div>
							<span class="text-[9px] font-mono tracking-[0.3em] text-[#FF4400]/70 uppercase block mb-5">Core research finding · Hummingbird</span>
							<p class="text-[clamp(1.2rem,3.2vw,1.9rem)] font-black text-white leading-snug max-w-2xl">
								Users weren't failing at optimization — they were failing at <span class="text-[#FF4400]">trust.</span><br/>
								The system worked. The interface didn't show it.
							</p>
						</div>
						<blockquote class="shrink-0 max-w-xs bg-white/4 border border-white/10 rounded-2xl px-5 py-4">
							<p class="text-sm text-neutral-300 italic leading-relaxed">
								"I set it up, it said done, but pages were still slow. I turned everything off thinking it wasn't working."
							</p>
							<span class="text-[9px] font-mono text-neutral-600 mt-2 block">User 4 · Session recording · Hummingbird beta</span>
						</blockquote>
					</div>
				</div>

				<!-- Research insight cards — stronger fills -->
				<div class="bg-neutral-950 px-8 md:px-12 py-8 border-b border-white/5">
					<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase block mb-5">Research signals · 214 surveys + 8 usability sessions</span>
					<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
						{#each [
							{ severity: 'Critical', bg: 'bg-red-950/60 border-red-700/50', labelCls: 'text-red-400 bg-red-900/60 border-red-700/50', stat: '67%',   insight: 'couldn\'t confirm optimization was active post-setup', tag: 'Visibility gap' },
							{ severity: 'Critical', bg: 'bg-red-950/60 border-red-700/50', labelCls: 'text-red-400 bg-red-900/60 border-red-700/50', stat: '#1',    insight: 'support category: "is this even working?" — before inline status', tag: 'Trust failure' },
							{ severity: 'High',     bg: 'bg-amber-950/50 border-amber-700/40', labelCls: 'text-amber-400 bg-amber-900/40 border-amber-700/40', stat: '3/8',  insight: 'session users disabled features they thought were broken', tag: 'False negative' },
							{ severity: 'High',     bg: 'bg-amber-950/50 border-amber-700/40', labelCls: 'text-amber-400 bg-amber-900/40 border-amber-700/40', stat: '4.2m', insight: 'avg wasted re-checking already-configured settings', tag: 'Wasted effort' },
							{ severity: 'Medium',   bg: 'bg-neutral-800/60 border-neutral-700', labelCls: 'text-neutral-400 bg-neutral-800 border-neutral-700', stat: 'v2',   insight: 'only had CSS Minify + basic JS toggle — no Critical CSS, no JS Defer', tag: 'Capability gap' },
							{ severity: 'Medium',   bg: 'bg-neutral-800/60 border-neutral-700', labelCls: 'text-neutral-400 bg-neutral-800 border-neutral-700', stat: '0',    insight: 'visual difference between "optimizing" and "idle" states in v2', tag: 'State clarity' },
						] as card}
							<div class="rounded-2xl border {card.bg} p-5 flex flex-col gap-3">
								<div class="flex items-center justify-between">
									<span class="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">Finding</span>
									<span class="px-2 py-0.5 rounded-full text-[8px] font-mono uppercase tracking-widest border {card.labelCls}">{card.severity}</span>
								</div>
								<div>
									<span class="text-2xl font-black text-white tracking-tight leading-none">{card.stat}</span>
								</div>
								<p class="text-xs text-neutral-400 leading-relaxed flex-1">{card.insight}</p>
								<span class="text-[8px] font-mono tracking-widest text-neutral-600 uppercase border-t border-white/[0.06] pt-2">{card.tag}</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- Hypothesis bar — orange tint -->
				<div class="bg-[#FF4400]/[0.07] border-b border-[#FF4400]/20 px-8 md:px-12 py-6">
					<div class="flex flex-col md:flex-row md:items-center gap-4">
						<span class="text-[9px] font-mono tracking-[0.3em] text-[#FF4400] uppercase shrink-0">Hypothesis</span>
						<div class="w-px h-5 bg-[#FF4400]/30 shrink-0 hidden md:block"></div>
						<p class="text-sm text-neutral-200 leading-relaxed">
							Making status visible inline — and shipping Critical CSS + JS Defer as default-on replacements — would eliminate the trust gap and reduce the support burden.
						</p>
					</div>
				</div>

				<!-- What we changed + proof — dark bg throughout -->
				<div class="bg-neutral-900 px-8 md:px-12 py-8 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8">
					<div class="flex flex-col gap-5">
						<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase">What we changed</span>
						<div class="space-y-5">
							{#each [
								{ n: '01', action: 'Inline status on every control', detail: 'Critical CSS generation state, JS Defer exclusion counts, compression ratios — always in view.' },
								{ n: '02', action: 'Critical CSS · New, default on', detail: 'Replaced CSS Minify. Auto-generates above-the-fold styles for every install.' },
								{ n: '03', action: 'JS Defer · New, default on', detail: 'Replaced basic JS optimization. Safe script deferral with built-in exclusion logic.' },
								{ n: '04', action: 'Progressive disclosure', detail: 'Clean for beginners, full control one tap deeper for power users.' },
							] as step}
								<div class="flex gap-4">
									<span class="text-[#FF4400] text-[10px] font-black font-mono shrink-0 mt-0.5">{step.n}</span>
									<div>
										<p class="text-sm font-bold text-white leading-snug mb-0.5">{step.action}</p>
										<p class="text-xs text-neutral-500 leading-relaxed">{step.detail}</p>
									</div>
								</div>
							{/each}
						</div>
					</div>
					<div class="flex flex-col justify-between gap-6">
						<div>
							<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase block mb-4">Post-launch proof</span>
							<div class="grid grid-cols-2 gap-3">
								{#each [
									{ stat: '<1s',  label: 'Page load',      sub: 'from 5–6s' },
									{ stat: '+75%', label: 'Performance',    sub: '20+ deployments' },
									{ stat: '−42%', label: 'Support tickets',sub: '"not working"' },
									{ stat: '−37%', label: 'Bounce rate',    sub: 'post-launch' },
								] as m}
									<div class="bg-white/4 border border-white/[0.07] rounded-xl px-4 py-3">
										<span class="text-[clamp(1.3rem,2.5vw,1.8rem)] font-black text-[#FF4400] tracking-tight leading-none block">{m.stat}</span>
										<span class="text-[10px] font-semibold text-neutral-300 block mt-0.5">{m.label}</span>
										<span class="text-[9px] text-neutral-600">{m.sub}</span>
									</div>
								{/each}
							</div>
						</div>
						<div class="flex items-start gap-3 bg-green-950/60 border border-green-700/50 rounded-xl px-4 py-3">
							<div class="w-2 h-2 rounded-full bg-green-400 shrink-0 mt-0.5"></div>
							<p class="text-xs font-semibold text-green-300 leading-snug">Hypothesis confirmed — "not working" tickets dropped 42%. Users stopped disabling active features within 2 weeks.</p>
						</div>
					</div>
				</div>

			</div>
		</div>

		<!-- ══════════════════════════════════════════════════════════
		     OPTION B2 — Research Wall · Divided (dark top / light bottom)
		     Dark research half, crisp white decisions half, orange
		     severity pills, proof numbers as big display type.
		     ══════════════════════════════════════════════════════════ -->
		<div>
			<div class="flex items-center gap-4 mb-5">
				<span class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">Option B2 — Research Wall · Divided</span>
				<span class="text-[9px] font-mono tracking-widest text-[#FF4400] uppercase">Dark research / light decisions — clearest split</span>
			</div>
			<div class="rounded-3xl overflow-hidden border border-neutral-200 shadow-[0_12px_56px_rgba(0,0,0,0.10)]">

				<!-- TOP HALF: all dark ─────────────────────────────── -->
				<div class="bg-neutral-950">

					<!-- Core finding + quote side by side -->
					<div class="px-8 md:px-12 py-10 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-8 border-b border-white/5">
						<div class="flex flex-col justify-between gap-6">
							<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase">Core research finding · Hummingbird</span>
							<p class="text-[clamp(1.15rem,3vw,1.75rem)] font-black text-white leading-snug">
								Users weren't failing at optimization.<br/>
								They were failing at <span class="text-[#FF4400]">trust.</span>
							</p>
							<div class="flex flex-wrap gap-3">
								<span class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-neutral-400 uppercase tracking-widest">214 surveys</span>
								<span class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-neutral-400 uppercase tracking-widest">8 sessions</span>
								<span class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-neutral-400 uppercase tracking-widest">Hummingbird beta</span>
							</div>
						</div>
						<blockquote class="bg-white/[0.03] border border-white/8 rounded-2xl px-6 py-6 flex flex-col justify-between gap-4">
							<span class="text-[#FF4400] text-3xl font-black leading-none">"</span>
							<p class="text-sm text-neutral-300 italic leading-relaxed -mt-2">
								I set it up, it said done, but pages were still slow. I turned everything off thinking it wasn't working.
							</p>
							<span class="text-[9px] font-mono text-neutral-600">User 4 · Session recording</span>
						</blockquote>
					</div>

					<!-- Research signals as a horizontal strip of stats -->
					<div class="px-8 md:px-12 py-8 grid grid-cols-2 md:grid-cols-3 gap-4 border-b border-white/5">
						{#each [
							{ severity: 'Critical', color: 'text-red-400',    bg: 'bg-red-900/30 border-red-700/40',    stat: '67%',   insight: 'couldn\'t confirm optimization was active' },
							{ severity: 'Critical', color: 'text-red-400',    bg: 'bg-red-900/30 border-red-700/40',    stat: '#1',    insight: 'support ticket: "is this even working?"' },
							{ severity: 'High',     color: 'text-amber-400',  bg: 'bg-amber-900/25 border-amber-700/35',stat: '3 of 8',insight: 'session users disabled active features' },
							{ severity: 'High',     color: 'text-amber-400',  bg: 'bg-amber-900/25 border-amber-700/35',stat: '4.2m',  insight: 'avg wasted re-checking set options' },
							{ severity: 'Medium',   color: 'text-neutral-400',bg: 'bg-neutral-800/60 border-neutral-700',stat: 'v2',   insight: 'had only CSS Minify + basic JS toggle' },
							{ severity: 'Medium',   color: 'text-neutral-400',bg: 'bg-neutral-800/60 border-neutral-700',stat: '0',    insight: 'visual diff between optimizing / idle states' },
						] as card}
							<div class="rounded-2xl border {card.bg} px-5 py-4 flex flex-col gap-2">
								<div class="flex items-center justify-between mb-1">
									<span class="text-[8px] font-mono tracking-widest {card.color} uppercase">{card.severity}</span>
								</div>
								<span class="text-xl font-black text-white tracking-tight leading-none">{card.stat}</span>
								<p class="text-[10px] text-neutral-400 leading-snug">{card.insight}</p>
							</div>
						{/each}
					</div>

					<!-- Hypothesis — full-width band inside dark half -->
					<div class="px-8 md:px-12 py-5 flex flex-col md:flex-row md:items-center gap-3">
						<span class="text-[9px] font-mono tracking-[0.3em] text-[#FF4400] uppercase shrink-0">Hypothesis</span>
						<div class="hidden md:block w-px h-4 bg-[#FF4400]/30 shrink-0"></div>
						<p class="text-sm text-neutral-400 leading-relaxed">
							Surface status inline. Ship Critical CSS + JS Defer as defaults. The trust gap closes when the interface shows its own work.
						</p>
					</div>
				</div>

				<!-- DIVIDER: orange rule -->
				<div class="h-1 bg-[#FF4400] w-full"></div>

				<!-- BOTTOM HALF: crisp white ────────────────────────── -->
				<div class="bg-white">

					<!-- What we changed — large numbered list -->
					<div class="px-8 md:px-12 py-10 border-b border-neutral-100">
						<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-400 uppercase block mb-7">What we changed</span>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
							{#each [
								{ n: '01', action: 'Inline status on every control', detail: 'Critical CSS generation state, JS Defer exclusion counts, compression ratios — next to the control that owns it.' },
								{ n: '02', action: 'Critical CSS · New, default on', detail: 'Replaced CSS Minify. Auto-generates above-the-fold styles. Enabled by default for all new installs.' },
								{ n: '03', action: 'JS Defer · New, default on', detail: 'Replaced basic JS optimization. Defers non-critical scripts with safe exclusion logic built in from day one.' },
								{ n: '04', action: 'Progressive disclosure', detail: 'Clean surface for beginners. Full control accessible one level deeper for power users.' },
							] as step}
								<div class="flex gap-4">
									<span class="text-[#FF4400] text-sm font-black font-mono shrink-0 mt-0.5">{step.n}</span>
									<div>
										<p class="text-sm font-bold text-neutral-900 leading-snug mb-1">{step.action}</p>
										<p class="text-xs text-neutral-500 leading-relaxed">{step.detail}</p>
									</div>
								</div>
							{/each}
						</div>
					</div>

					<!-- Proof — big display numbers + confirmation -->
					<div class="px-8 md:px-12 py-8 flex flex-col md:flex-row md:items-end gap-8">
						<div class="flex-1">
							<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-400 uppercase block mb-6">Post-launch proof</span>
							<div class="grid grid-cols-2 md:grid-cols-4 gap-6">
								{#each [
									{ stat: '<1s',  label: 'Page load',      sub: 'from 5–6s' },
									{ stat: '+75%', label: 'Performance',    sub: '20+ deployments' },
									{ stat: '−42%', label: 'Support tickets',sub: '"not working"' },
									{ stat: '−37%', label: 'Bounce rate',    sub: 'post-launch' },
								] as m}
									<div>
										<span class="text-[clamp(1.8rem,4vw,3rem)] font-black text-[#FF4400] tracking-tighter leading-none block">{m.stat}</span>
										<span class="text-xs font-semibold text-neutral-700 block mt-1">{m.label}</span>
										<span class="text-[10px] text-neutral-400">{m.sub}</span>
									</div>
								{/each}
							</div>
						</div>
						<div class="shrink-0 flex flex-col gap-2 max-w-xs">
							<div class="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
								<div class="w-2 h-2 rounded-full bg-green-500 shrink-0 mt-0.5"></div>
								<p class="text-xs font-semibold text-green-700 leading-snug">Hypothesis confirmed — "not working" tickets dropped 42%. Users stopped disabling active features within 2 weeks.</p>
							</div>
							<div class="flex items-start gap-3 bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3">
								<div class="w-2 h-2 rounded-full bg-neutral-300 shrink-0 mt-0.5"></div>
								<p class="text-[10px] text-neutral-500 leading-snug">Measured across 20+ live WordPress deployments with varied plugin stacks.</p>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>

		<!-- ══════════════════════════════════════════════════════════
		     OPTION B3 — Research Wall · Merged (B2 top + B1 bottom)
		     Dark research upper half, white decisions lower half.
		     Readable hypothesis, severity cards, numbered list + tiles.
		     ══════════════════════════════════════════════════════════ -->
		<div>
			<div class="flex items-center gap-4 mb-5">
				<span class="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">Option B3 — Research Wall · Merged</span>
				<span class="text-[9px] font-mono tracking-widest text-[#FF4400] uppercase">B2 top · B1 bottom · readable hypothesis</span>
			</div>
			<div class="rounded-3xl overflow-hidden shadow-[0_16px_64px_rgba(0,0,0,0.18)]">

				<!-- ─── DARK TOP: Core finding + quote ─────────────────── -->
				<div class="bg-black px-8 md:px-12 py-10 border-b border-white/5">
					<div class="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10">
						<div class="flex flex-col justify-between gap-6">
							<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase">Core research finding · Hummingbird</span>
							<p class="text-[clamp(1.3rem,3.2vw,2rem)] font-black text-white leading-snug">
								Users weren't failing at optimization.<br/>
								They were failing at <span class="text-[#FF4400]">trust.</span>
							</p>
							<div class="flex flex-wrap gap-2">
								<span class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-neutral-400 uppercase tracking-widest">214 surveys</span>
								<span class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-neutral-400 uppercase tracking-widest">8 sessions</span>
								<span class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-neutral-400 uppercase tracking-widest">Hummingbird beta</span>
							</div>
						</div>
						<blockquote class="bg-white/3 rounded-2xl px-6 py-6 flex flex-col justify-between gap-5">
							<span class="text-[#FF4400] text-3xl font-black leading-none">"</span>
							<p class="text-sm text-neutral-300 italic leading-relaxed -mt-2">
								I set it up, it said done, but pages were still slow. I turned everything off thinking it wasn't working.
							</p>
							<span class="text-[9px] font-mono text-neutral-500">User 4 · Session recording · Hummingbird beta</span>
						</blockquote>
					</div>
				</div>

				<!-- ─── DARK: Severity signal cards ───────────────────── -->
				<div class="bg-neutral-950 px-8 md:px-12 py-8 border-b border-white/5">
					<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase block mb-5">Research signals · 214 surveys + 8 usability sessions</span>
					<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
						{#each [
							{ severity: 'Critical', bg: 'bg-red-950/60 border-red-800/60',    pill: 'text-red-400 bg-red-950 border-red-800/70',    stat: '67%',    insight: 'couldn\'t confirm optimization was active post-setup',         tag: 'Visibility gap' },
							{ severity: 'Critical', bg: 'bg-red-950/60 border-red-800/60',    pill: 'text-red-400 bg-red-950 border-red-800/70',    stat: '#1',     insight: 'support category: "is this even working?" before inline status', tag: 'Trust failure' },
							{ severity: 'High',     bg: 'bg-amber-950/50 border-amber-800/50',pill: 'text-amber-400 bg-amber-950/80 border-amber-800/60', stat: '3 of 8', insight: 'session users disabled features they thought were broken',      tag: 'False negative' },
							{ severity: 'High',     bg: 'bg-amber-950/50 border-amber-800/50',pill: 'text-amber-400 bg-amber-950/80 border-amber-800/60', stat: '4.2m',   insight: 'avg time wasted re-checking already-configured settings',      tag: 'Wasted effort' },
							{ severity: 'Medium',   bg: 'bg-neutral-800/50 border-neutral-700',pill: 'text-neutral-400 bg-neutral-800 border-neutral-700', stat: 'v2',    insight: 'only had CSS Minify + basic JS toggle — no Critical CSS, no JS Defer', tag: 'Capability gap' },
							{ severity: 'Medium',   bg: 'bg-neutral-800/50 border-neutral-700',pill: 'text-neutral-400 bg-neutral-800 border-neutral-700', stat: '0',     insight: 'visual difference between "optimizing" and "idle" states',    tag: 'State clarity' },
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

				<!-- ─── HYPOTHESIS: dedicated high-contrast strip ──────── -->
				<div class="bg-neutral-900 px-8 md:px-12 py-7 border-b border-white/5">
					<div class="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
						<div class="shrink-0 flex items-center gap-2 md:pt-0.5">
							<div class="w-1.5 h-1.5 rounded-full bg-[#FF4400] animate-pulse shrink-0"></div>
							<span class="text-[9px] font-bold font-mono tracking-[0.3em] text-[#FF4400] uppercase">Hypothesis</span>
						</div>
						<div class="hidden md:block w-px h-10 bg-white/10 shrink-0"></div>
						<p class="text-base font-semibold text-white leading-relaxed">
							Making status visible inline — and shipping Critical CSS + JS Defer as default-on replacements for CSS Minify and the basic JS toggle — would eliminate the trust gap and reduce the support burden.
						</p>
					</div>
				</div>

				<!-- ─── ORANGE DIVIDER ─────────────────────────────────── -->
				<div class="h-[3px] bg-[#FF4400] w-full"></div>

				<!-- ─── WHITE BOTTOM: What we changed + Proof ─────────── -->
				<div class="bg-white px-8 md:px-12 py-10 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10">

					<!-- Numbered decisions -->
					<div class="flex flex-col gap-5">
						<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-400 uppercase">What we changed</span>
						<div class="space-y-5">
							{#each [
								{ n: '01', action: 'Inline status on every control',   detail: 'Critical CSS generation state, JS Defer exclusion counts, compression ratios — surfaced next to each control, always visible.' },
								{ n: '02', action: 'Critical CSS · New, default on',   detail: 'Replaced CSS Minify. Auto-generates above-the-fold styles. Enabled by default for all new installs.' },
								{ n: '03', action: 'JS Defer · New, default on',        detail: 'Replaced basic JS optimization. Safe script deferral with built-in exclusion logic from day one.' },
								{ n: '04', action: 'Progressive disclosure',            detail: 'Clean surface for beginners. Full control accessible one level deeper for power users.' },
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

					<!-- Proof tiles + confirmation -->
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
									<span class="text-[clamp(1.4rem,3vw,2rem)] font-black text-[#FF4400] tracking-tight leading-none block">{m.stat}</span>
									<span class="text-xs font-semibold text-white block mt-1">{m.label}</span>
									<span class="text-[10px] text-neutral-500">{m.sub}</span>
								</div>
							{/each}
						</div>
						<div class="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3 mt-1">
							<div class="w-2 h-2 rounded-full bg-green-500 shrink-0 mt-0.5"></div>
							<p class="text-xs font-semibold text-green-700 leading-snug">Hypothesis confirmed — "not working" tickets dropped 42%. Users stopped disabling active features within 2 weeks of launch.</p>
						</div>
						<div class="flex items-start gap-3 bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3">
							<div class="w-2 h-2 rounded-full bg-neutral-300 shrink-0 mt-0.5"></div>
							<p class="text-[10px] text-neutral-500 leading-snug">Measured across 20+ live WordPress deployments with varied plugin stacks.</p>
						</div>
					</div>

				</div>

			</div>
		</div>

	</div>
</section>
