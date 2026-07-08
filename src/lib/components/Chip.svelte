<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		theme = 'light',
		spin = 'always',
		padding = '1.5px',
		innerClass = '',
		class: className = '',
		...props
	} = $props<{
		children: Snippet;
		/** 'light' = black arc (use on white/gray backgrounds)
		 *  'dark'  = white arc (use on black/dark backgrounds) */
		theme?: 'light' | 'dark';
		/** 'always' = arc always spinning (badge / label)
		 *  'hover'  = arc appears on hover (interactive chip)
		 *  'glow'   = no arc, glow only on hover */
		spin?: 'always' | 'hover' | 'glow';
		/** Border gap thickness — match the wrapper padding */
		padding?: string;
		/** Classes for the inner pill (sizing / text) */
		innerClass?: string;
		class?: string;
		[key: string]: any;
	}>();

	const arc     = $derived(theme === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.75)');
	const innerBg = $derived(theme === 'dark' ? '#09090b' : '#ffffff');
	const restBg  = $derived(theme === 'dark' ? 'rgba(255,255,255,0.10)' : '#e0e0e0');
	const glowColor = $derived(theme === 'dark' ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.10)');

	let arcEl: HTMLElement | undefined = $state();

	function restartArc() {
		if (!arcEl) return;
		arcEl.style.animationName = 'none';
		requestAnimationFrame(() => {
			if (arcEl) arcEl.style.animationName = '';
		});
	}
</script>

{#if spin === 'glow'}
	<!-- Glow-only variant: static border at rest, glow on hover, no arc -->
	<div
		class="chip-glow group relative inline-flex items-center justify-center rounded-full transition-[filter] duration-300 {className}"
		style="padding: {padding}; background: {restBg}; --chip-glow: {glowColor};"
		{...props}
	>
		<div
			class="relative z-10 flex items-center justify-center rounded-full w-full h-full {innerClass}"
			style="background: {innerBg};"
		>
			{@render children()}
		</div>
	</div>
{:else if spin === 'hover'}
	<!-- Hover variant: outer bg = gray at rest, clears on hover to expose arc + glow -->
	<div
		class="chip-glow group relative inline-flex items-center justify-center rounded-full overflow-hidden group-hover:bg-transparent transition-[background-color,filter] duration-300 {className}"
		style="padding: {padding}; background: {restBg}; --chip-glow: {glowColor};"
		onmouseenter={restartArc}
		{...props}
	>
		<div
			bind:this={arcEl}
			class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-75"
			style="background: conic-gradient(transparent 270deg, {arc} 360deg);"
		></div>
		<div
			class="relative z-10 flex items-center justify-center rounded-full w-full h-full {innerClass}"
			style="background: {innerBg};"
		>
			{@render children()}
		</div>
	</div>
{:else}
	<!-- Always-on variant: arc spins continuously, glow on hover -->
	<div
		class="chip-glow group relative inline-flex items-center justify-center rounded-full overflow-hidden transition-[filter] duration-300 {className}"
		style="padding: {padding}; --chip-glow: {glowColor};"
		{...props}
	>
		<div
			class="absolute inset-[-1000%] animate-[spin_3s_linear_infinite]"
			style="background: conic-gradient(transparent 270deg, {arc} 360deg);"
		></div>
		<div
			class="relative z-10 flex items-center justify-center rounded-full w-full h-full {innerClass}"
			style="background: {innerBg};"
		>
			{@render children()}
		</div>
	</div>
{/if}

<style>
	.chip-glow:hover {
		filter: drop-shadow(0 0 10px var(--chip-glow)) drop-shadow(0 0 24px var(--chip-glow));
	}
</style>
