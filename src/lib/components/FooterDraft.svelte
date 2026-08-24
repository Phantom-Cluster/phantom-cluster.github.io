<script lang="ts">
	const year = new Date().getFullYear();

	const navLinks = [
		{ label: 'Work',      href: '/#projects' },
		{ label: 'Lab',       href: '/work/spotify-redesign' },
		{ label: 'About',     href: '/about' },
		{ label: 'WPMU DEV',  href: '/work/wpmu-dev-dashboard' },
		{ label: 'Ideajam',   href: '/work/ideajam-kanban-saas' },
		{ label: 'Themeisle', href: '/work/themeisle-starter-templates' },
	];

	const socials = [
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/phantom-cluster/',
			ionIcon: 'logo-linkedin',
		},
		{
			label: 'Behance',
			href: 'https://behance.net/phantomcluster',
			ionIcon: 'logo-behance',
		},
	];
</script>

<footer class="bg-[#F4F0E8] text-[#1B1916]" aria-label="Site footer">

	<!-- ── STATUS STRIP ───────────────────────────────────────────────────── -->
	<div class="border-b border-[#1B1916]/[0.07] px-6 lg:px-10">
		<div class="max-w-[1320px] mx-auto h-11 flex items-center">

			<!-- Availability -->
			<div class="flex items-center gap-2">
				<span class="relative flex h-1.5 w-1.5">
					<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-600 opacity-60"></span>
					<span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600"></span>
				</span>
				<span class="status-text text-emerald-700/75">Available for full-time product design</span>
			</div>

		</div>
	</div>

	<!-- ── HERO ZONE ──────────────────────────────────────────────────────── -->
	<div class="max-w-[1320px] mx-auto px-6 lg:px-10 pt-16 pb-14">

		<p class="footer-label mb-5">Let's work together</p>
		<h2 class="footer-headline font-extrabold tracking-tight leading-[1.0]">
			Got a product that<br class="hidden lg:block"/> needs great design?
		</h2>

		<div class="mt-10 mb-8 border-t border-[#1B1916]/[0.07]"></div>

		<!-- Email as hero CTA -->
		<a
			href="mailto:phantomcluster17@gmail.com"
			class="email-cta group flex items-center gap-3 w-fit"
		>
			<span class="email-cta-text">phantomcluster17@gmail.com</span>
			<span class="email-cta-arrow">↗</span>
		</a>

		<!-- Action buttons -->
		<div class="flex flex-wrap items-center gap-3 mt-8">
			<a
				href="/resume.pdf"
				target="_blank"
				rel="noopener noreferrer"
				class="action-btn-primary"
			>
				Download Resume
				<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
				</svg>
			</a>
			<a
				href="https://www.linkedin.com/in/phantom-cluster/"
				target="_blank"
				rel="noopener noreferrer"
				class="action-btn-ghost"
			>
				LinkedIn ↗
			</a>
		</div>
	</div>

	<!-- ── BOTTOM STRIP ───────────────────────────────────────────────────── -->
	<div class="border-t border-[#1B1916]/[0.07] px-6 lg:px-10">
		<div class="max-w-[1320px] mx-auto py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

			<!-- Identity -->
			<div class="flex flex-col gap-0.5">
				<span class="text-sm font-bold tracking-tight text-[#1B1916]/80">Hitanshu Sahu</span>
				<span class="text-[10.5px] font-mono tracking-[0.12em] text-[#1B1916]/30 uppercase">Product Designer</span>
				<span class="text-[10.5px] font-mono text-[#1B1916]/20 mt-2">&copy; {year}</span>
			</div>

			<!-- Nav links -->
			<div class="flex flex-wrap gap-x-5 gap-y-2">
				{#each navLinks as link}
					<a
						href={link.href}
						class="text-[12px] font-medium text-[#1B1916]/35 hover:text-[#1B1916]/80 transition-colors duration-150"
					>
						{link.label}
					</a>
				{/each}
			</div>

			<!-- Col 3: Social icon pills -->
			<div class="flex flex-wrap items-center gap-2">
				{#each socials as s}
					<a
						href={s.href}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={s.label}
						class="social-pill"
					>
						<!-- @ts-ignore -->
						<ion-icon name={s.ionIcon} class="social-icon" aria-hidden="true"></ion-icon>
						<svg class="social-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M7 17L17 7M17 7H7M17 7v10"/>
						</svg>
					</a>
				{/each}
			</div>

		</div>
	</div>

</footer>

<style>
	/* ── Status strip text ─────────────────────────────── */
	.status-text {
		font-size: 10px;
		font-family: var(--font-mono, monospace);
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	/* ── Hero headline ──────────────────────────────────── */
	.footer-label {
		font-size: 10px;
		font-family: var(--font-mono, monospace);
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: rgba(27, 25, 22, 0.28);
	}

	.footer-headline {
		font-size: clamp(2.6rem, 5vw, 5rem);
		color: #1B1916;
	}

	/* ── Email CTA ──────────────────────────────────────── */
	.email-cta { text-decoration: none; }

	.email-cta-text {
		font-size: clamp(1.25rem, 2.2vw, 2rem);
		font-weight: 700;
		letter-spacing: -0.02em;
		color: rgba(27, 25, 22, 0.55);
		border-bottom: 1px solid rgba(27, 25, 22, 0.14);
		padding-bottom: 2px;
		transition: color 0.18s ease, border-color 0.18s ease;
	}
	.email-cta:hover .email-cta-text {
		color: #1B1916;
		border-color: rgba(27, 25, 22, 0.40);
	}

	.email-cta-arrow {
		font-size: clamp(1.1rem, 1.8vw, 1.6rem);
		color: rgba(27, 25, 22, 0.22);
		transition: color 0.18s ease, transform 0.18s ease;
		display: inline-block;
	}
	.email-cta:hover .email-cta-arrow {
		color: rgba(27, 25, 22, 0.65);
		transform: translate(2px, -2px);
	}

	/* ── Action buttons ─────────────────────────────────── */
	.action-btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 10px 20px;
		background: #1B1916;
		color: #F4F0E8;
		border-radius: 999px;
		font-size: 11px;
		font-weight: 800;
		letter-spacing: 0.10em;
		text-transform: uppercase;
		text-decoration: none;
		transition: background 0.15s ease, transform 0.1s ease;
	}
	.action-btn-primary:hover  { background: #2a2620; }
	.action-btn-primary:active { transform: scale(0.97); }

	.action-btn-ghost {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 10px 20px;
		background: transparent;
		color: rgba(27, 25, 22, 0.45);
		border: 1px solid rgba(27, 25, 22, 0.13);
		border-radius: 999px;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.10em;
		text-transform: uppercase;
		text-decoration: none;
		transition: color 0.15s ease, border-color 0.15s ease;
	}
	.action-btn-ghost:hover {
		color: #1B1916;
		border-color: rgba(27, 25, 22, 0.30);
	}

	/* ── Social pills ───────────────────────────────────── */
	.social-pill {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		/* min 44×44px tap target per WCAG 2.5.5 */
		min-width: 44px;
		min-height: 44px;
		padding: 8px 14px;
		border: 1px solid rgba(27, 25, 22, 0.10);
		border-radius: 999px;
		text-decoration: none;
		transition: background 0.14s ease, border-color 0.14s ease;
	}
	.social-pill:hover {
		background: rgba(27, 25, 22, 0.06);
		border-color: rgba(27, 25, 22, 0.20);
	}

	/* Ionicons <ion-icon> web-component inside the pill */
	.social-icon {
		--ionicon-stroke-width: 32px;
		width: 16px;
		height: 16px;
		color: rgba(27, 25, 22, 0.45);
		flex-shrink: 0;
		transition: color 0.14s ease;
		display: block;
	}
	.social-pill:hover .social-icon {
		color: rgba(27, 25, 22, 0.80);
	}

	.social-arrow {
		width: 8px; height: 8px;
		color: rgba(27, 25, 22, 0.22);
		flex-shrink: 0;
		transition: color 0.14s ease, transform 0.14s ease;
	}
	.social-pill:hover .social-arrow {
		color: rgba(27, 25, 22, 0.55);
		transform: translate(1px, -1px);
	}
</style>
