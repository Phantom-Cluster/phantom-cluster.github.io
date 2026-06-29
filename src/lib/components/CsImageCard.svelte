<script lang="ts">
	interface Props {
		src: string;
		label: string;
		caption: string;
		/** Tailwind aspect class, e.g. 'aspect-9/16', 'aspect-4/3', 'aspect-video' */
		aspect?: string;
		/** Surface color context — affects label/border defaults */
		theme?: 'dark' | 'light';
		/** Tailwind border-radius class */
		rounded?: string;
		/** Label colour override for semantic Before/After cards */
		labelVariant?: 'default' | 'error' | 'success';
		/** Optional right-side subtitle in the header strip */
		subtitle?: string;
		/** Optional text block rendered below the image */
		footer?: string;
		onOpen?: (src: string, alt: string) => void;
	}

	let {
		src,
		label,
		caption,
		aspect    = 'aspect-9/16',
		theme     = 'dark',
		rounded   = 'rounded-3xl',
		labelVariant = 'default',
		subtitle,
		footer,
		onOpen
	}: Props = $props();
</script>

<style>
	/* ── Wrapper ──────────────────────────────────────────────────────── */
	.cic-wrap { display: flex; flex-direction: column; overflow: hidden; }

	/* ── Header strip ─────────────────────────────────────────────────── */
	.cic-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.65rem 1.25rem;
		transition: background 0.35s ease;
	}
	.dark  .cic-header { border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
	.light .cic-header { border-bottom: 1px solid rgba(0, 0, 0, 0.07); background: rgba(249, 249, 249, 0.8); }
	.dark:hover  .cic-header { background: rgba(255, 255, 255, 0.05); }
	.light:hover .cic-header { background: rgba(255, 255, 255, 0.98); }

	/* ── Label ────────────────────────────────────────────────────────── */
	.cic-label {
		font-size: 0.625rem;
		font-family: var(--font-mono);
		letter-spacing: 0.2em;
		text-transform: uppercase;
		transition: color 0.25s ease, text-shadow 0.3s ease;
	}

	/* default: dim → white glow on dark */
	.dark .cic-label.variant-default  { color: rgba(255, 255, 255, 0.28); }
	.dark:hover .cic-label.variant-default {
		color: rgba(255, 255, 255, 0.95);
		text-shadow: 0 0 6px rgba(255, 255, 255, 0.55), 0 0 18px rgba(255, 255, 255, 0.2);
	}
	/* light default */
	.light .cic-label.variant-default  { color: rgba(0, 0, 0, 0.35); }
	.light:hover .cic-label.variant-default { color: rgba(0, 0, 0, 0.82); }

	/* error (Before) */
	.cic-label.variant-error { color: #EF4444; }
	.dark:hover  .cic-label.variant-error { text-shadow: 0 0 6px rgba(239, 68, 68, 0.5), 0 0 16px rgba(239, 68, 68, 0.2); }
	.light:hover .cic-label.variant-error { text-shadow: 0 0 4px rgba(196, 14, 11, 0.35); }

	/* success (After) */
	.cic-label.variant-success { color: #3DCC11; }
	.dark:hover  .cic-label.variant-success { text-shadow: 0 0 6px rgba(61, 204, 17, 0.5), 0 0 16px rgba(61, 204, 17, 0.2); }
	.light:hover .cic-label.variant-success { text-shadow: 0 0 4px rgba(61, 204, 17, 0.35); }

	/* ── Subtitle (right side of header) ─────────────────────────────── */
	.cic-subtitle {
		font-size: 0.625rem;
		font-family: var(--font-mono);
		transition: color 0.25s ease;
	}
	.dark  .cic-subtitle { color: rgba(255, 255, 255, 0.18); }
	.dark:hover  .cic-subtitle { color: rgba(255, 255, 255, 0.45); }
	.light .cic-subtitle { color: rgba(0, 0, 0, 0.28); }
	.light:hover .cic-subtitle { color: rgba(0, 0, 0, 0.55); }

	/* ── Image trigger ────────────────────────────────────────────────── */
	.cic-trigger {
		display: block;
		width: 100%;
		position: relative;
		cursor: zoom-in;
		border: none;
		padding: 0;
		background: none;
		text-align: left;
	}

	/* ── Zoom overlay ─────────────────────────────────────────────────── */
	.cic-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0);
		transition: background 0.2s ease;
		pointer-events: none;
	}
	.cic-trigger:hover .cic-overlay { background: rgba(0, 0, 0, 0.38); }

	.cic-expand {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transform: scale(0.85);
		transition: opacity 0.2s ease, transform 0.2s ease;
	}
	.cic-trigger:hover .cic-expand { opacity: 1; transform: scale(1); }

	/* ── "View full" fade-out badge ───────────────────────────────────── */
	.cic-badge {
		position: absolute;
		bottom: 10px;
		right: 10px;
		display: flex;
		align-items: center;
		gap: 5px;
		background: rgba(0, 0, 0, 0.55);
		backdrop-filter: blur(8px);
		border-radius: 99px;
		padding: 4px 10px 4px 6px;
		transition: opacity 0.2s ease;
		pointer-events: none;
	}
	.cic-trigger:hover .cic-badge { opacity: 0; }

	/* ── Image ────────────────────────────────────────────────────────── */
	.cic-img { width: 100%; height: 100%; object-fit: cover; object-position: top; }

	/* ── Optional footer text ─────────────────────────────────────────── */
	.cic-footer {
		padding: 1rem 1.25rem;
		font-size: 0.875rem;
		line-height: 1.6;
	}
	.dark  .cic-footer { border-top: 1px solid rgba(255, 255, 255, 0.05); color: rgba(255, 255, 255, 0.35); }
	.light .cic-footer { border-top: 1px solid rgba(0, 0, 0, 0.06);       color: rgba(0, 0, 0, 0.45); }
</style>

<figure
	class="cic-wrap {theme} {rounded} overflow-hidden
		{theme === 'dark' ? 'bg-neutral-950 border border-white/5' : 'bg-white border border-neutral-200/60'}"
	role="group"
>
	<div class="cic-header">
		<span class="cic-label variant-{labelVariant}">{label}</span>
		{#if subtitle}
			<span class="cic-subtitle">{subtitle}</span>
		{/if}
	</div>

	<button
		type="button"
		class="cic-trigger flex-1"
		onclick={() => onOpen?.(src, caption)}
		aria-label="Preview: {caption}"
	>
		<div class="overflow-hidden {aspect}">
			<!-- cs-img class keeps GSAP scale animation working -->
			<img src={src} alt={caption} class="cic-img cs-img" />
		</div>

		<div class="cic-overlay">
			<div class="cic-expand">
				<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75"
						d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
				</svg>
			</div>
		</div>

		<div class="cic-badge">
			<svg class="w-2.5 h-2.5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
			</svg>
			<span class="text-[9px] text-white/60 font-mono tracking-wider">View full</span>
		</div>
	</button>

	{#if footer}
		<p class="cic-footer">{footer}</p>
	{/if}
</figure>
