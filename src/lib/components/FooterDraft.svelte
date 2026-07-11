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
			svg: 'M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7H9.33V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z',
		},
		{
			label: 'Dribbble',
			href: 'https://dribbble.com/phantomcluster17',
			svg: 'M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.203c-.4-.108-3.54-.88-7.14-.383 1.498 4.13 2.106 7.412 2.193 7.846 2.92-1.716 4.83-4.757 4.947-7.463zm-6.386 8.358c-.136-.575-.794-3.99-2.39-8.156-4.225 1.182-8.318 1.258-8.822 1.258a9.887 9.887 0 0 0 6.16 6.945c.417-.674 2.593-5.26 5.05-7.047zm-12.016-8.9c.07-.008 4.79-.533 9.47-1.856a39.566 39.566 0 0 0-3.34-6.425 9.945 9.945 0 0 0-6.13 8.28zm8.103-8.84a37.28 37.28 0 0 1 3.2 6.143c3.553-1.332 5.02-3.218 5.163-3.414A9.92 9.92 0 0 0 11.82 4.415zm7.393 2.68c-.173.237-1.85 2.37-5.592 3.8 1.155 3.09 1.636 5.86 1.765 6.697 2.148-1.583 3.65-4.043 3.827-6.862v-3.635zM2.146 10.7c.394 0 5 .043 9.77-.96a36.438 36.438 0 0 0-2.92-5.787 9.914 9.914 0 0 0-6.85 6.747z',
		},
		{
			label: 'Behance',
			href: 'https://behance.net/phantomcluster',
			svg: 'M22 7h-7v1.5h7V7zm1.5 5.5c-.015-3.323-2.155-5.228-5.323-5.228-3.215 0-5.394 2.115-5.394 5.385s2.2 5.343 5.485 5.343c2.4 0 4.156-1.077 4.88-2.615l-2.09-.983c-.415.86-1.283 1.54-2.67 1.54-1.63 0-2.6-1-2.73-2.316h7.525c.015-.224.016-.47.016-.726zm-7.665-.77c.105-1.285.955-2.073 2.45-2.073 1.413 0 2.296.8 2.38 2.073h-4.83zm-10.155.27c1.37 0 2.36-.615 2.36-1.785 0-1.046-.86-1.584-2.18-1.584H3v3.37h.68zm-.55 4.3c1.55 0 2.65-.675 2.65-2 0-1.26-1.015-1.77-2.6-1.77H3v3.77h.78zM0 3.5h4.63c3.06 0 4.88 1.416 4.88 3.523 0 1.585-.92 2.693-2.34 3.123 1.83.4 2.88 1.63 2.88 3.554 0 2.46-1.92 4.3-5.06 4.3H0V3.5z',
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
		<div class="max-w-[1320px] mx-auto py-6 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 items-start">

			<!-- Col 1: Identity -->
			<div class="flex flex-col gap-0.5">
				<span class="text-sm font-bold tracking-tight text-[#1B1916]/80">Hitanshu Sahu</span>
				<span class="text-[10.5px] font-mono tracking-[0.12em] text-[#1B1916]/30 uppercase">Product Designer</span>
				<span class="text-[10.5px] font-mono text-[#1B1916]/20 mt-2">&copy; {year}</span>
			</div>

			<!-- Col 2: Nav links -->
			<div class="flex flex-wrap gap-x-5 gap-y-2 sm:justify-center">
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
			<div class="flex items-center gap-2 sm:justify-end">
				{#each socials as s}
					<a
						href={s.href}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={s.label}
						class="social-pill"
					>
						<svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true">
							<path d={s.svg}/>
						</svg>
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
		gap: 5px;
		padding: 7px 12px;
		border: 1px solid rgba(27, 25, 22, 0.10);
		border-radius: 999px;
		text-decoration: none;
		transition: background 0.14s ease, border-color 0.14s ease;
	}
	.social-pill:hover {
		background: rgba(27, 25, 22, 0.06);
		border-color: rgba(27, 25, 22, 0.20);
	}

	.social-icon {
		width: 14px;
		height: 14px;
		fill: rgba(27, 25, 22, 0.45);
		flex-shrink: 0;
		transition: fill 0.14s ease;
	}
	.social-pill:hover .social-icon {
		fill: rgba(27, 25, 22, 0.80);
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
