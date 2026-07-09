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

	let videoEl: HTMLVideoElement;
	let wrapperEl: HTMLElement;
	let isPaused = $state(true);
	let currentTime = $state(0);
	let duration = $state(0);

	function toggle() { isPaused = !isPaused; }
	function back() { currentTime = Math.max(0, currentTime - 5); }
	function fwd() { if (videoEl) currentTime = Math.min(duration, currentTime + 10); }
	function toggleFullScreen() {
		if (!document.fullscreenElement) wrapperEl.requestFullscreen().catch(console.error);
		else document.exitFullscreen();
	}

	function formatTime(s: number) {
		if (isNaN(s) || s < 0) return '00:00';
		return `${Math.floor(s / 60).toString().padStart(2, '0')}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
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

		<!-- ── Row 1: Title LEFT / Chips RIGHT ──────────────────────── -->
		<p class="sc-eyebrow text-[10px] font-mono tracking-[0.35em] text-neutral-400 uppercase mb-4">Backup & Restore</p>
		<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
			<h2 class="text-[clamp(2.4rem,6vw,4.5rem)] font-black tracking-tight text-gray-900 leading-[1.10]">
				<span class="block overflow-hidden pb-[0.08em] mb-[-0.2em]"><span class="sc-line-inner block">Backup all.</span></span>
				<span class="block overflow-hidden pb-[0.08em]"><span class="sc-line-inner block text-neutral-300">Restore one.</span></span>
			</h2>
			<div class="sc-chips flex flex-row sm:flex-col items-center sm:items-end gap-2 shrink-0 flex-wrap">
				<div class="relative">
					<span class="px-3 py-1.5 bg-gray-100 text-gray-500 text-[10px] font-mono uppercase tracking-widest rounded-full block">Selective Restore</span>
					<span class="absolute -top-2 -right-1 bg-neutral-900 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full leading-none">NEW</span>
				</div>
				<div class="relative">
					<span class="px-3 py-1.5 bg-gray-100 text-gray-500 text-[10px] font-mono uppercase tracking-widest rounded-full block">Backblaze + OneDrive</span>
					<span class="absolute -top-2 -right-1 bg-neutral-900 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full leading-none">NEW</span>
				</div>
				<span class="px-3 py-1.5 bg-gray-100 text-gray-500 text-[10px] font-mono uppercase tracking-widest rounded-full">Auto-Schedule</span>
			</div>
		</div>

		<!-- ── Row 2: Data Ledger ──────────────────────────────────── -->
		<div class="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.6fr] border-t border-b border-gray-200 mb-0">

			<!-- Col 1 — Backup success rate -->
			<div class="sc-ledger-col py-10 pr-10 md:border-r border-gray-200 border-b md:border-b-0 flex flex-col justify-between">
				<span class="text-[10px] font-mono tracking-[0.18em] text-gray-500 uppercase block mb-4">Backup Success Rate</span>
				<div>
					<div class="flex items-baseline leading-none mb-3">
						<span class="text-[clamp(4rem,10vw,6.5rem)] font-black text-neutral-900 tracking-tighter leading-none">99</span>
						<span class="text-[clamp(2.5rem,6vw,4rem)] font-black text-gray-900 tracking-tighter leading-none">%</span>
					</div>
					<p class="text-sm text-gray-600 leading-relaxed max-w-[18ch]">
						Reliable scheduled backups across all connected WordPress sites.
					</p>
				</div>
			</div>

			<!-- Col 2 — Selective restore scope -->
			<div class="sc-ledger-col py-10 md:px-10 md:border-r border-gray-200 border-b md:border-b-0 flex flex-col justify-between">
				<span class="text-[10px] font-mono tracking-[0.18em] text-gray-500 uppercase block mb-4">Restore Scope</span>
				<div class="flex flex-col gap-4">
					<div class="flex flex-wrap items-center gap-2">
						<span class="px-3 py-1.5 bg-neutral-950 text-white text-[10px] font-mono uppercase tracking-widest rounded-lg">DB</span>
						<span class="text-[#6B7280] font-black text-sm">·</span>
						<span class="px-3 py-1.5 bg-neutral-950 text-white text-[10px] font-mono uppercase tracking-widest rounded-lg">Files</span>
						<span class="text-[#6B7280] font-black text-sm">·</span>
						<span class="px-3 py-1.5 bg-neutral-950 text-white text-[10px] font-mono uppercase tracking-widest rounded-lg">Both</span>
					</div>
					<p class="text-sm text-gray-600 leading-relaxed max-w-[22ch]">
						Restore only what broke — database, files, or both. One click, no technical decisions. Critical for low-storage sites.
					</p>
				</div>
			</div>

			<!-- Col 3 — Story -->
			<div class="sc-ledger-col py-10 md:pl-10 flex flex-col justify-center">
				<p class="text-lg md:text-xl text-gray-600 leading-relaxed mb-5">
					Snapshot removed the anxiety from site maintenance. Selective restore, backup composition badges, and two new cloud destinations — Backblaze and OneDrive — gave users control they didn't have before.
				</p>
				<p class="text-base text-gray-600 leading-relaxed">
					SUI 3 email alerts and in-dashboard notifications mean you know the moment a backup succeeds or fails — not when disaster strikes.
				</p>
			</div>

		</div>

	</div>

	<!-- ── VIDEO: Snapshot 4.10.0 Beta Walkthrough ────────────────── -->
	<div class="max-w-7xl mx-auto px-4 md:px-6 mt-12">

		<div class="flex items-center gap-4 mb-10">
			<span class="text-[10px] font-mono tracking-[0.18em] text-gray-400 uppercase">Snapshot · 4.10.0 Beta Walkthrough</span>
			<div class="flex-1 h-px bg-gray-200"></div>
		</div>

		<div class="sc-video-wrap bg-transparent rounded-3xl border border-neutral-300/70
		            shadow-[0_12px_48px_rgba(0,0,0,0.11),0_2px_8px_rgba(0,0,0,0.05)]
		            p-2">
			<div class="relative overflow-hidden rounded-2xl bg-black group"
			     bind:this={wrapperEl}>

				<div class="absolute top-5 left-6 z-40 flex items-center gap-3
				            bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-4 py-2">
					<span class="w-1.5 h-1.5 rounded-full bg-portfolio-accent-vivid animate-pulse shrink-0"></span>
					<span class="text-[10px] font-mono tracking-widest text-white/70 uppercase">Snapshot · 4.10.0-beta · Selective Restore</span>
				</div>

				<!-- svelte-ignore a11y_media_has_caption -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<video
					bind:this={videoEl}
					bind:paused={isPaused}
					bind:currentTime
					bind:duration
					src="/videos/snapshot%20Version%204.10.0-beta.2.mp4"
					class="w-full h-auto object-cover aspect-video cursor-pointer transform-gpu will-change-transform"
					playsinline preload="metadata"
					muted
					onclick={toggle}
				></video>

				<div class="absolute bottom-5 inset-x-5 flex flex-col gap-3 px-5 py-4 rounded-2xl
				            bg-black/60 backdrop-blur-xl border border-white/10
				            opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0
				            transition-all duration-500 ease-out">
					<div class="flex items-center gap-4 w-full">
						<span class="text-white/70 text-[10px] font-mono w-8 text-right">{formatTime(currentTime)}</span>
						<input type="range" aria-label="Seek" min="0" max={duration || 100} step="0.01" bind:value={currentTime}
							class="flex-1 h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer transition-all" />
						<span class="text-white/70 text-[10px] font-mono w-8">{formatTime(duration)}</span>
					</div>
					<div class="flex items-center justify-between w-full">
						<div class="flex items-center gap-6">
							<button aria-label="Skip back 5 seconds" onclick={back} class="text-white/80 hover:text-white transition-colors flex items-center gap-1 group/btn">
								<svg class="w-5 h-5 group-active/btn:-rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"/></svg>
								<span class="text-[10px] font-mono tracking-widest mt-1">-5s</span>
							</button>
							<button aria-label={isPaused ? "Play" : "Pause"} onclick={toggle} class="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
								{#if isPaused}
									<svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
								{:else}
									<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
								{/if}
							</button>
							<button aria-label="Skip forward 10 seconds" onclick={fwd} class="text-white/80 hover:text-white transition-colors flex items-center gap-1 group/btn">
								<span class="text-[10px] font-mono tracking-widest mt-1">+10s</span>
								<svg class="w-5 h-5 group-active/btn:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.334-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.334-4z"/></svg>
							</button>
						</div>
						<button aria-label="Toggle fullscreen" onclick={toggleFullScreen} class="text-white/80 hover:text-white transition-colors">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
						</button>
					</div>
				</div>

			</div>
		</div>
	</div>

	<!-- ── RESEARCH CONTEXT ─────────────────────────────────────────── -->
	<div class="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
		<div class="rounded-3xl overflow-hidden shadow-[0_16px_64px_rgba(0,0,0,0.12)]">

			<!-- Core finding + quote -->
			<div class="bg-black px-8 md:px-12 py-10 border-b border-white/5">
				<div class="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10">
					<div class="flex flex-col justify-between gap-6">
						<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase">Core research finding · Snapshot</span>
						<p class="text-[clamp(1.3rem,3.2vw,2rem)] font-black text-white leading-snug">
							Backups felt like<br/>
							a <span class="shimmer-red">developer task.</span>
						</p>
						<div class="flex flex-wrap gap-2">
							<span class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-neutral-400 uppercase tracking-widest">User interviews</span>
							<span class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-neutral-400 uppercase tracking-widest">Support threads</span>
							<span class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-neutral-400 uppercase tracking-widest">Snapshot v4 audit</span>
						</div>
					</div>
					<blockquote class="bg-white/3 rounded-2xl px-6 py-6 flex flex-col justify-between gap-5">
						<span class="text-portfolio-accent-vivid text-3xl font-black leading-none">"</span>
						<p class="text-sm text-neutral-300 italic leading-relaxed -mt-2">
							Users were unsure if their backups had run, where files were stored, or how to trigger a restore. Critical status was buried behind technical jargon and nested screens.
						</p>
						<span class="text-[9px] font-mono text-neutral-500">User research · WPMU DEV user survey · pre-Snapshot 4.10</span>
					</blockquote>
				</div>
			</div>

			<!-- Severity signal cards -->
			<div class="bg-neutral-950 px-8 md:px-12 py-8 border-b border-white/5">
				<span class="text-[9px] font-mono tracking-[0.3em] text-neutral-500 uppercase block mb-5">Research signals · user interviews · support threads · v4 audit</span>
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
					{#each [
						{ severity: 'Critical', bg: 'bg-red-950/60 border-red-800/60',     pill: 'text-red-400 bg-red-950 border-red-800/70',         stat: '100%',   insight: 'of restores were all-or-nothing — no scope selector. 67% of users who needed only a DB fix restored the entire site, risking content overwrites.', tag: 'No granularity' },
						{ severity: 'Critical', bg: 'bg-red-950/60 border-red-800/60',     pill: 'text-red-400 bg-red-950 border-red-800/70',         stat: '0',      insight: 'visibility into backup composition — users could not see whether files, database, or both were captured in a given backup entry.', tag: 'Hidden composition' },
						{ severity: 'High',     bg: 'bg-amber-950/50 border-amber-800/50', pill: 'text-amber-400 bg-amber-950/80 border-amber-800/60', stat: '1',      insight: 'cloud destination supported (Amazon S3 only) — no Backblaze or OneDrive, locking out users on non-AWS stacks or with existing OneDrive licences.', tag: 'Destination lock-in' },
						{ severity: 'High',     bg: 'bg-amber-950/50 border-amber-800/50', pill: 'text-amber-400 bg-amber-950/80 border-amber-800/60', stat: 'Silent',  insight: 'backup failures — no in-app notification, no email. Users discovered failures only during a disaster restore, not when the job ran.', tag: 'Silent failures' },
						{ severity: 'Medium',   bg: 'bg-neutral-800/50 border-neutral-700',pill: 'text-neutral-400 bg-neutral-800 border-neutral-700', stat: '4 steps', insight: 'to confirm restore scope — users navigated four screens before seeing what would be restored. High abandonment before commit.', tag: 'Restore UX friction' },
						{ severity: 'Medium',   bg: 'bg-neutral-800/50 border-neutral-700',pill: 'text-neutral-400 bg-neutral-800 border-neutral-700', stat: 'Manual',  insight: 'verification required post-backup — no badge, no confirmation detail. Users had to open individual backups to confirm what was saved.', tag: 'No post-backup proof' },
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
						Status visible at a glance. Restore in one action. Selective scope (DB · Files · Both), backup composition badges, Backblaze + OneDrive destinations, and SUI 3 email alerts — no multi-step wizard, no technical decisions. Users know exactly what ran, what was saved, and where.
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
							{ n: '01', action: 'Selective restore engine',             detail: 'Full site, database only, or files only — chosen upfront before any restore is initiated. Low-storage sites can target just the DB without touching the file system.' },
							{ n: '02', action: 'Backup composition badges',            detail: 'Every backup entry shows a DB · Files · Both indicator. Know what was captured at a glance — no need to open the detail view to verify.' },
							{ n: '03', action: 'Backblaze B2 + Microsoft OneDrive',   detail: 'Two new cloud destinations alongside existing options. Backblaze for cost-efficient object storage; OneDrive for teams already in the Microsoft 365 stack.' },
							{ n: '04', action: 'SUI 3 notifications + email alerts',  detail: 'In-dashboard notification and a branded email on every backup event — success or failure. Designed with SUI 3 components for full visual consistency across WPMU DEV plugins.' },
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
							{ stat: '99%',   label: 'Backup success',      sub: 'scheduled across all sites' },
							{ stat: '−67%',  label: 'Abandoned restores',   sub: 'vs. all-or-nothing v4' },
							{ stat: '+2',    label: 'Cloud destinations',   sub: 'Backblaze + OneDrive' },
							{ stat: '3',     label: 'Restore scopes',       sub: 'DB · Files · Both' },
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
						<p class="text-xs font-semibold text-green-700 leading-snug">Hypothesis confirmed — selective restore reduced abandoned mid-restore sessions by 67%. Users on low-storage sites could target just the database, avoiding the file system entirely.</p>
					</div>
				</div>

			</div>

			<!-- Full-width note strip -->
			<div class="bg-white px-8 md:px-12 pb-10 border-t border-neutral-100 pt-5">
				<div class="flex items-start gap-3 bg-neutral-50 border border-neutral-200 rounded-xl px-5 py-4">
					<div class="w-2 h-2 rounded-full bg-neutral-300 shrink-0 mt-0.5"></div>
					<p class="text-[10px] text-neutral-500 leading-snug">Restore abandonment measured across Snapshot beta users in the 6 weeks post-4.10.0-beta rollout. Abandoned restore = user-initiated restore that exited before completion without reaching a confirmed clean state.</p>
				</div>
			</div>

		</div>
	</div>


</section>
