<script lang="ts">
	import { Menu, X } from 'lucide-svelte';

	let isOpen = $state(false);

	const mainProjects = [
		{ title: 'WPMU DEV Dashboard', sub: 'Design System', slug: 'wpmu-dev-dashboard', dot: '#2244CC' },
		{ title: 'Ideajam Kanban', sub: 'SaaS Redesign', slug: 'ideajam-kanban-saas', dot: '#e0533c' },
		{ title: 'Eclectic App', sub: 'Travel & Tours', slug: 'eclectic-app-design', dot: '#14b8a6' },
		{ title: 'Neve Templates', sub: 'WordPress', slug: 'themeisle-starter-templates', dot: '#3b82f6' },
	];

	const conceptProjects = [
		{ title: 'Spotify Redesign', year: '2018', slug: 'spotify-redesign' },
		{ title: 'Effido Productivity', year: '2021', slug: 'effido-productivity-app' },
		{ title: 'WordPress Admin', year: '2020', slug: 'wordpress-redesign' },
		{ title: 'Discord Redesign', year: '2020', slug: 'discord-redesign' },
		{ title: 'Alt News Concept', year: '2020', slug: 'alt-news-concept' },
	];

	let workOpen = $state(false);
	let labOpen  = $state(false);
	const ddTimers: Record<string, ReturnType<typeof setTimeout> | undefined> = {};

	function hoverOpen(k: 'work' | 'lab') {
		if (k === 'work') { labOpen = false; clearTimeout(ddTimers.work_close); workOpen = true; }
		else              { workOpen = false; clearTimeout(ddTimers.lab_close); labOpen = true; }
	}
	function hoverClose(k: 'work' | 'lab') {
		ddTimers[`${k}_close`] = setTimeout(() => {
			if (k === 'work') workOpen = false;
			else              labOpen  = false;
		}, 160);
	}
</script>

<!-- ── DRAFT LABEL ─────────────────────────────────────────────────────────── -->
<div class="w-full flex justify-center py-2 bg-amber-400">
	<span class="text-black text-[10px] font-black tracking-[0.2em] uppercase">↑ DRAFT NAVBAR ↑</span>
</div>

<!-- ── NAVBAR: editorial split-bar ──────────────────────────────────────── -->
<div class="w-full bg-[#0E0D0C] border-b border-white/[0.06] relative z-10">

	<div class="max-w-[1320px] mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between gap-6">

		<!-- LEFT: Wordmark + status ticker -->
		<div class="flex items-center gap-5 shrink-0">
			<!-- Wordmark -->
			<a href="/" class="flex flex-col leading-none group">
				<span class="text-white font-black tracking-[-0.04em] text-[1.15rem] group-hover:opacity-80 transition-opacity">
					HITANSHU SAHU
				</span>
				<span class="text-[9px] font-mono tracking-[0.22em] text-white/30 uppercase mt-[3px]">
					Product Designer
				</span>
			</a>

			<!-- Hairline divider -->
			<span class="hidden lg:block w-px h-7 bg-white/10 shrink-0"></span>

			<!-- Availability pill -->
			<div class="hidden lg:inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1.5">
				<span class="relative flex h-1.5 w-1.5">
					<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70"></span>
					<span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
				</span>
				<span class="text-[9px] font-mono tracking-[0.18em] text-emerald-400/80 uppercase whitespace-nowrap">Open to join a team</span>
			</div>
		</div>

		<!-- CENTER: Nav links (desktop) -->
		<nav aria-label="Main navigation" class="hidden md:flex items-center gap-1">

			<!-- Work dropdown -->
			<div
				class="relative"
				role="none"
				onmouseenter={() => hoverOpen('work')}
				onmouseleave={() => hoverClose('work')}
			>
				<button
					type="button"
					onclick={() => { workOpen = !workOpen; labOpen = false; }}
					aria-expanded={workOpen}
					class="nd-link nd-link-glow {workOpen ? 'nd-link-active' : ''}"
				>
					Work
					<svg class="w-[9px] h-[9px] opacity-50 transition-transform duration-200 {workOpen ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"/>
					</svg>
				</button>

				{#if workOpen}
					<div class="nd-dropdown" role="menu">
						<p class="nd-dd-header">Case Studies · {mainProjects.length}</p>
						{#each mainProjects as p}
							<a href="/work/{p.slug}" role="menuitem" class="nd-dd-row" onclick={() => workOpen = false}>
								<span class="nd-dd-dot" style="background:{p.dot}"></span>
								<span class="nd-dd-title">{p.title}</span>
								<span class="nd-dd-sub">{p.sub}</span>
							</a>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Lab dropdown -->
			<div
				class="relative"
				role="none"
				onmouseenter={() => hoverOpen('lab')}
				onmouseleave={() => hoverClose('lab')}
			>
				<button
					type="button"
					onclick={() => { labOpen = !labOpen; workOpen = false; }}
					aria-expanded={labOpen}
					class="nd-link {labOpen ? 'nd-link-active' : ''}"
				>
					Lab
					<svg class="w-[9px] h-[9px] opacity-50 transition-transform duration-200 {labOpen ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"/>
					</svg>
				</button>

				{#if labOpen}
					<div class="nd-dropdown nd-dropdown-sm" role="menu">
						<p class="nd-dd-header">Concepts &amp; Explorations</p>
						{#each conceptProjects as p}
							<a href="/work/{p.slug}" role="menuitem" class="nd-dd-row nd-dd-row-sm" onclick={() => labOpen = false}>
								<span class="nd-dd-title flex-1">{p.title}</span>
								<span class="nd-dd-year">{p.year}</span>
							</a>
						{/each}
					</div>
				{/if}
			</div>

			<a href="/about" class="nd-link">About</a>

		</nav>

		<!-- RIGHT: Resume + CTA -->
		<div class="flex items-center gap-2 shrink-0">

			<!-- Resume ghost — desktop -->
			<a
				href="/resume.pdf"
				target="_blank"
				rel="noopener noreferrer"
				class="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider text-white/50 border border-white/10 hover:text-white hover:border-white/30 transition-all duration-150"
			>
				Resume
				<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
				</svg>
			</a>

			<!-- Hire Me CTA — accent slash button -->
			<a
				href="/#contact"
				class="hire-cta hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-wider text-black bg-white hover:bg-white/90 active:scale-95 transition-all duration-150 shadow-lg shadow-black/40"
			>
				<span class="relative flex h-1.5 w-1.5">
					<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-80"></span>
					<span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
				</span>
				Hire Me
			</a>

			<!-- Mobile hamburger -->
			<button
				onclick={() => (isOpen = !isOpen)}
				class="inline-flex md:hidden items-center gap-2 px-4 py-2.5 rounded-full text-[11px] font-black uppercase tracking-wider text-white border border-white/15 hover:bg-white/10 transition-all"
				aria-label="Toggle menu"
			>
				{#if isOpen}<X class="size-3.5"/>{:else}<Menu class="size-3.5"/>{/if}
				<span>Menu</span>
			</button>
		</div>
	</div>

</div>

<!-- Mobile drawer -->
{#if isOpen}
	<div class="fixed inset-0 z-[999] bg-[#0E0D0C] flex flex-col p-8" style="transition-timing-function: cubic-bezier(0.16,1,0.3,1);">
		<div class="flex justify-between items-center mb-12">
			<span class="text-white font-black tracking-tight text-xl">HITANSHU SAHU</span>
			<button onclick={() => (isOpen = false)} class="border border-white/10 rounded-full p-3 text-white hover:bg-white/5" aria-label="Close">
				<X class="size-4"/>
			</button>
		</div>

		<nav class="flex flex-col gap-0 flex-1">
			{#each [
				{ label: 'Work', href: '/#projects' },
				{ label: 'Lab', href: '/' },
				{ label: 'About', href: '/about' },
				{ label: 'Resume ↗', href: '/resume.pdf' },
			] as link, i}
				<a
					href={link.href}
					onclick={() => (isOpen = false)}
					class="flex items-center justify-between py-5 border-b border-white/5 group"
					target={link.label.includes('↗') ? '_blank' : undefined}
					rel={link.label.includes('↗') ? 'noopener noreferrer' : undefined}
				>
					<span class="text-3xl font-black tracking-tighter text-white/80 group-hover:text-white transition-colors">{link.label}</span>
					<span class="text-[9px] font-mono text-white/20 tracking-[0.2em]">0{i+1}</span>
				</a>
			{/each}
		</nav>

		<a
			href="/#contact"
			onclick={() => (isOpen = false)}
			class="mt-8 w-full flex items-center justify-center gap-2 bg-white text-black px-6 py-4 rounded-2xl font-black uppercase tracking-wider text-sm"
		>
			<span class="w-2 h-2 rounded-full bg-emerald-500"></span>
			Hire Me
		</a>
	</div>
{/if}

<style>
	/* Nav link pill */
	.nd-link {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 6px 12px;
		border-radius: 8px;
		font-size: 13px;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: rgba(255,255,255,0.45);
		background: transparent;
		border: none;
		cursor: pointer;
		text-decoration: none;
		transition: color 0.12s ease, background 0.12s ease, box-shadow 0.12s ease;
	}
	.nd-link:hover { color: #fff; background: rgba(255,255,255,0.07); }
	.nd-link-active { color: #fff; background: rgba(255,255,255,0.10); }

	/* Work link — infinite glow pulse */
	@keyframes work-glow {
		0%, 100% {
			color: rgba(255,255,255,0.55);
			box-shadow: 0 0 0px transparent;
			background: transparent;
		}
		50% {
			color: #fff;
			background: rgba(255,255,255,0.08);
			box-shadow: 0 0 18px rgba(255,255,255,0.12), 0 0 6px rgba(255,255,255,0.08);
		}
	}
	.nd-link-glow {
		animation: work-glow 2.8s ease-in-out infinite;
	}
	.nd-link-glow:hover,
	.nd-link-glow.nd-link-active {
		animation: none;
		color: #fff;
		background: rgba(255,255,255,0.10);
		box-shadow: none;
	}

	/* Dropdown panel */
	.nd-dropdown {
		position: absolute;
		top: calc(100% + 10px);
		left: 0;
		min-width: 260px;
		background: #111110;
		border: 1px solid rgba(255,255,255,0.09);
		border-radius: 16px;
		overflow: hidden;
		z-index: 500;
		box-shadow: 0 24px 64px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.3);
		animation: nd-pop 0.16s cubic-bezier(0.16,1,0.3,1) both;
	}
	.nd-dropdown-sm { min-width: 220px; }

	@keyframes nd-pop {
		from { opacity: 0; transform: translateY(-6px) scale(0.97); }
		to   { opacity: 1; transform: translateY(0) scale(1); }
	}

	.nd-dd-header {
		padding: 10px 14px 8px;
		font-size: 8.5px;
		font-family: var(--font-mono, monospace);
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: rgba(255,255,255,0.22);
		border-bottom: 1px solid rgba(255,255,255,0.06);
		margin: 0;
	}

	.nd-dd-row {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 14px;
		text-decoration: none;
		border-bottom: 1px solid rgba(255,255,255,0.04);
		transition: background 0.1s ease;
	}
	.nd-dd-row:last-child { border-bottom: none; }
	.nd-dd-row:hover { background: rgba(255,255,255,0.07); }
	.nd-dd-row-sm { padding: 9px 14px; }

	.nd-dd-dot   { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
	.nd-dd-title { font-size: 12.5px; font-weight: 700; color: rgba(255,255,255,0.85); letter-spacing: -0.01em; }
	.nd-dd-sub   { font-size: 9px; font-family: var(--font-mono,monospace); letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.28); margin-left: auto; }
	.nd-dd-year  { font-size: 9px; font-family: var(--font-mono,monospace); letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.25); }
</style>
