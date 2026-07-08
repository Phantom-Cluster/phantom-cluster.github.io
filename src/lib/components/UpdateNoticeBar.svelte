<script lang="ts">
	// ─── TOGGLE ─────────────────────────────────────────────────────────────
	// Set to false to disable the notice bar entirely across the site
	const ENABLED = true;
	// ────────────────────────────────────────────────────────────────────────

	import { onMount } from 'svelte';

	const STORAGE_KEY = 'ag-notice-dismissed';
	const DISMISS_MS  = 365 * 24 * 60 * 60 * 1000; // 1 year

	let visible   = $state(false);
	let animating = $state(false);

	onMount(() => {
		if (!ENABLED) return;
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw || Date.now() - parseInt(raw) > DISMISS_MS) {
			setTimeout(() => { visible = true; }, 600);
		}
	});

	function dismiss() {
		animating = true;
		setTimeout(() => {
			visible = false;
			animating = false;
			localStorage.setItem(STORAGE_KEY, Date.now().toString());
		}, 320);
	}
</script>

{#if visible}
<div
	class="notice-cookie {animating ? 'hiding' : 'showing'}"
	role="status"
	aria-live="polite"
	aria-label="Site notice"
>
	<div class="notice-inner">

		<!-- Left: icon + copy -->
		<div class="notice-body">
			<span class="dot-wrap" aria-hidden="true">
				<span class="dot-ping"></span>
				<span class="dot-core"></span>
			</span>

			<div class="notice-text">
				<p class="notice-headline">Everything's right here</p>
				<p class="notice-sub">
					All case studies, concepts, and live projects are collected in this portfolio — nothing's missing from
					<a
						href="https://www.behance.net/phantom-cluster"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-link"
					>Behance ↗</a>.
					Connect or explore below.
				</p>
			</div>
		</div>

		<!-- Right: actions -->
		<div class="notice-actions">
			<a
				href="https://www.behance.net/phantom-cluster"
				target="_blank"
				rel="noopener noreferrer"
				class="btn-secondary"
				aria-label="View on Behance"
			>
				Behance
				<svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
					<path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</a>
			<a
				href="https://www.linkedin.com/in/phantom-cluster/"
				target="_blank"
				rel="noopener noreferrer"
				class="btn-linkedin"
				aria-label="Connect on LinkedIn"
			>
				LinkedIn
				<svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
					<path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</a>
			<button onclick={dismiss} class="btn-ok" aria-label="Dismiss notice">
				Got it
			</button>
		</div>
	</div>
</div>
{/if}

<style>
	.notice-cookie {
		position: fixed;
		bottom: 24px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 9999;
		width: calc(100% - 48px);
		max-width: 900px;
		pointer-events: none;
		will-change: transform, opacity;
	}

	.notice-cookie.showing {
		animation: slideUp 0.38s cubic-bezier(0.16, 1, 0.3, 1) forwards;
		pointer-events: auto;
	}

	.notice-cookie.hiding {
		animation: slideDown 0.32s cubic-bezier(0.4, 0, 1, 1) forwards;
		pointer-events: none;
	}

	.notice-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		padding: 14px 16px 14px 20px;
		border-radius: 16px;
		background: rgba(6, 6, 10, 0.93);
		backdrop-filter: blur(40px) brightness(0.18) saturate(0.6);
		-webkit-backdrop-filter: blur(40px) brightness(0.18) saturate(0.6);
		border: 1px solid rgba(255, 255, 255, 0.08);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
	}

	.notice-body {
		display: flex;
		align-items: flex-start;
		gap: 14px;
		flex: 1;
		min-width: 0;
	}

	.dot-wrap {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 10px;
		height: 10px;
		flex-shrink: 0;
		margin-top: 3px;
	}
	.dot-ping {
		position: absolute;
		inset: 0;
		border-radius: 9999px;
		background: rgb(34, 197, 94);
		opacity: 0.7;
		animation: ping 1.4s cubic-bezier(0, 0, 0.2, 1) infinite;
		will-change: transform, opacity;
	}
	.dot-core {
		position: relative;
		width: 6px;
		height: 6px;
		border-radius: 9999px;
		background: rgb(34, 197, 94);
	}

	.notice-text {
		display: flex;
		flex-direction: column;
		gap: 3px;
		min-width: 0;
	}
	.notice-headline {
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.01em;
		color: rgba(255, 255, 255, 0.92);
		line-height: 1.3;
	}
	.notice-sub {
		font-size: 11px;
		color: rgba(255, 255, 255, 0.45);
		line-height: 1.5;
	}
	.inline-link {
		color: rgba(255, 255, 255, 0.75);
		text-decoration: none;
		border-bottom: 1px solid rgba(255, 255, 255, 0.25);
		transition: color 0.15s, border-color 0.15s;
	}
	.inline-link:hover {
		color: #ffffff;
		border-color: rgba(255, 255, 255, 0.6);
	}

	.notice-actions {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-shrink: 0;
	}

	.btn-secondary {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 6px 12px;
		border-radius: 8px;
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.02em;
		color: rgba(255, 255, 255, 0.65);
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.12);
		text-decoration: none;
		transition: background 0.15s, border-color 0.15s, color 0.15s;
		white-space: nowrap;
	}
	.btn-secondary:hover {
		color: #ffffff;
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.25);
	}

	.btn-linkedin {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 6px 14px;
		border-radius: 8px;
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.02em;
		color: #fff;
		background: #0A66C2;
		border: none;
		text-decoration: none;
		transition: background 0.15s, transform 0.1s;
		white-space: nowrap;
	}
	.btn-linkedin:hover {
		background: #0958a8;
	}
	.btn-linkedin:active {
		transform: scale(0.97);
	}

	.btn-ok {
		display: inline-flex;
		align-items: center;
		padding: 6px 18px;
		border-radius: 8px;
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.04em;
		color: #0a0a0e;
		background: rgba(255, 255, 255, 0.92);
		border: none;
		cursor: pointer;
		transition: background 0.15s, transform 0.1s;
		white-space: nowrap;
	}
	.btn-ok:hover { background: #ffffff; }
	.btn-ok:active { transform: scale(0.97); }

	@keyframes slideUp {
		from { opacity: 0; transform: translate(-50%, 20px); }
		to   { opacity: 1; transform: translate(-50%, 0);    }
	}
	@keyframes slideDown {
		from { opacity: 1; transform: translate(-50%, 0);    }
		to   { opacity: 0; transform: translate(-50%, 16px); }
	}
	@keyframes ping {
		75%, 100% { transform: scale(2); opacity: 0; }
	}

	@media (max-width: 640px) {
		.notice-cookie {
			bottom: 16px;
			width: calc(100% - 32px);
		}
		.notice-inner {
			flex-direction: column;
			align-items: flex-start;
			gap: 12px;
			padding: 14px 16px;
		}
		.notice-actions {
			width: 100%;
			justify-content: flex-end;
		}
	}
</style>
