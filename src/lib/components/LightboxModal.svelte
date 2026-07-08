<script lang="ts">
	let { modalImg = $bindable(null) }: { modalImg: { src: string; alt: string } | null } = $props();

	let zoomLevel = $state(1);
	let panX = $state(0);
	let panY = $state(0);
	let isDragging = $state(false);
	let dragLastX = 0;
	let dragLastY = 0;

	function closeModal() { modalImg = null; zoomLevel = 1; panX = 0; panY = 0; }
	function zoomIn() { zoomLevel = Math.min(3, +(zoomLevel + 0.25).toFixed(2)); }
	function zoomOut() { zoomLevel = Math.max(0.25, +(zoomLevel - 0.25).toFixed(2)); if (zoomLevel <= 1) { panX = 0; panY = 0; } }
	function zoomReset() { zoomLevel = 1; panX = 0; panY = 0; }
	function startDrag(clientX: number, clientY: number) { if (zoomLevel <= 1) return; isDragging = true; dragLastX = clientX; dragLastY = clientY; }
	function handleDrag(clientX: number, clientY: number) { if (!isDragging) return; panX += clientX - dragLastX; panY += clientY - dragLastY; dragLastX = clientX; dragLastY = clientY; }
	function stopDrag() { isDragging = false; }

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') closeModal();
		if (e.key === '+' || e.key === '=') zoomIn();
		if (e.key === '-') zoomOut();
		if (e.key === '0') zoomReset();
	}

	$effect(() => {
		if (modalImg) {
			zoomLevel = 1; panX = 0; panY = 0; isDragging = false;
			window.addEventListener('keydown', handleKeydown);
			return () => window.removeEventListener('keydown', handleKeydown);
		}
	});
</script>

{#if modalImg}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="lbx-backdrop" onclick={closeModal}>
		<div
			class="lbx-shell"
			onclick={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
		>
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="lbx-viewport"
				style="cursor: {isDragging ? 'grabbing' : zoomLevel > 1 ? 'grab' : 'default'}"
				onmousedown={(e) => startDrag(e.clientX, e.clientY)}
				onmousemove={(e) => handleDrag(e.clientX, e.clientY)}
				onmouseup={stopDrag}
				onmouseleave={stopDrag}
				ontouchstart={(e) => { e.preventDefault(); startDrag(e.touches[0].clientX, e.touches[0].clientY); }}
				ontouchmove={(e) => { e.preventDefault(); handleDrag(e.touches[0].clientX, e.touches[0].clientY); }}
				ontouchend={stopDrag}
			>
				<img
					src={modalImg.src}
					alt={modalImg.alt}
					class="lbx-img"
					draggable="false"
					style="transform: translate({panX}px, {panY}px) scale({zoomLevel}); transform-origin: center center; transition: {isDragging ? 'none' : 'transform 0.2s ease'};"
				/>
			</div>
			<div class="lbx-controls">
				<div class="lbx-zoom">
					<button type="button" onclick={zoomOut} aria-label="Zoom out" class="lbx-btn" title="Zoom out ( − )">
						<svg class="lbx-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg>
					</button>
					<button type="button" onclick={zoomReset} class="lbx-zoom-pct" title="Reset zoom ( 0 )">{Math.round(zoomLevel * 100)}%</button>
					<button type="button" onclick={zoomIn} aria-label="Zoom in" class="lbx-btn" title="Zoom in ( + )">
						<svg class="lbx-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
					</button>
				</div>
				<span class="lbx-label">{modalImg.alt}</span>
				<button type="button" onclick={closeModal} aria-label="Close" class="lbx-btn" title="Close ( Esc )">
					<svg class="lbx-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.lbx-backdrop {
		position: fixed; inset: 0; z-index: 9999;
		background: rgba(0, 0, 0, 0.9); backdrop-filter: blur(16px);
		display: flex; align-items: center; justify-content: center;
		animation: lbx-fade 0.18s ease;
	}
	.lbx-shell {
		display: flex; flex-direction: column;
		width: 92vw; height: 92vh; max-width: 1400px;
		animation: lbx-scale 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	.lbx-viewport {
		flex: 1; overflow: hidden;
		display: flex; align-items: center; justify-content: center;
		border-radius: 16px 16px 0 0;
		background: rgba(255, 255, 255, 0.03);
		user-select: none;
	}
	.lbx-img {
		max-width: 100%; max-height: 100%;
		object-fit: contain; display: block;
		border-radius: 12px; pointer-events: none;
	}
	.lbx-controls {
		flex-shrink: 0;
		display: flex; align-items: center; justify-content: space-between; gap: 8px;
		padding: 10px 12px;
		background: rgba(20, 20, 20, 0.95); backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 0 0 16px 16px;
	}
	.lbx-zoom { display: flex; align-items: center; gap: 2px; }
	.lbx-btn {
		width: 32px; height: 32px; border-radius: 8px;
		background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
		display: flex; align-items: center; justify-content: center;
		color: rgba(255,255,255,0.7); cursor: pointer;
		transition: background 0.15s, color 0.15s;
	}
	.lbx-btn:hover { background: rgba(255,255,255,0.14); color: #fff; }
	.lbx-icon { width: 16px; height: 16px; }
	.lbx-zoom-pct {
		min-width: 48px; height: 32px; border-radius: 8px;
		background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
		color: rgba(255,255,255,0.6); font-family: monospace;
		font-size: 11px; letter-spacing: 0.05em;
		cursor: pointer; padding: 0 8px;
		transition: background 0.15s;
	}
	.lbx-zoom-pct:hover { background: rgba(255,255,255,0.12); }
	.lbx-label {
		font-size: 9px; font-family: monospace; letter-spacing: 0.1em;
		color: rgba(255,255,255,0.25); text-transform: uppercase;
		display: none;
	}
	@media (min-width: 640px) { .lbx-label { display: block; } }
	@keyframes lbx-fade { from { opacity: 0; } to { opacity: 1; } }
	@keyframes lbx-scale { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
</style>
