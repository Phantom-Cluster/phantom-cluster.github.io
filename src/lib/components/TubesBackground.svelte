<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		enableClickInteraction?: boolean;
		class?: string;
		children?: import('svelte').Snippet;
		forceDark?: boolean;
	}

	let { enableClickInteraction = true, class: className = '', children, forceDark = false }: Props = $props();

	let canvasEl: HTMLCanvasElement;
	let tubesApp: any = null;
	let isDark = $state(true); // default dark until DOM confirms

	// Dark mode: warm sienna-amber filament — reads as confident, editorial against near-black
	const darkPalettes = [
		{ tubes: ['#C8502A', '#E07840', '#F4A055'], lights: ['#C8502A', '#D4622C', '#E07840', '#E88040'] },
		{ tubes: ['#A84020', '#C8502A', '#E05E32'], lights: ['#9E3D1E', '#C8502A', '#D4622C', '#E07840'] },
		{ tubes: ['#9E3D1E', '#B84828', '#C8502A'], lights: ['#8B3318', '#A84020', '#C8502A', '#D4622C'] },
	];

	// Light mode: deeper sienna for contrast on warm parchment
	const lightPalettes = [
		{ tubes: ['#8B3318', '#A84020', '#C8502A'], lights: ['#7A2C12', '#9E3D1E', '#A84020', '#C8502A'] },
		{ tubes: ['#7A2C12', '#9E3D1E', '#A84020'], lights: ['#6B2510', '#8B3318', '#9E3D1E', '#A84020'] },
	];

	let paletteIdx = 0;

	function getPalettes() {
		return isDark ? darkPalettes : lightPalettes;
	}

	function cyclePalette() {
		if (!enableClickInteraction || !tubesApp?.tubes) return;
		paletteIdx = (paletteIdx + 1) % darkPalettes.length;
		const p = getPalettes()[paletteIdx];
		tubesApp.tubes.setColors(p.tubes);
		tubesApp.tubes.setLightsColors(p.lights);
	}

	// Update palette colours when theme switches (canvas bg doesn't change,
	// we handle that via CSS mix-blend-mode instead)
	function applyCurrentPalette() {
		if (!tubesApp?.tubes) return;
		const p = getPalettes()[paletteIdx];
		tubesApp.tubes.setColors(p.tubes);
		tubesApp.tubes.setLightsColors(p.lights);
	}

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		isDark = forceDark ? true : document.documentElement.classList.contains('dark');
		let mounted = true;

		let observer: MutationObserver;
		let io: IntersectionObserver;

		(async () => {
			try {
				const mod = await import('$lib/vendor/tubes1.min.js');
				if (!mounted) return;
				const TubesCursor = mod.default;

				const initial = getPalettes()[0];
				
				// Cap pixel ratio to 1.5 on high-DPI screens to save GPU/CPU
				const maxPixelRatio = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.5) : 1;

				tubesApp = TubesCursor(canvasEl, {
					pixelRatio: maxPixelRatio, // Attempt to cap resolution
					tubes: {
						colors: initial.tubes,
						lights: {
							intensity: 200,
							colors: initial.lights,
						},
					},
				});

				// Performance: Pause WebGL animation when out of view
				io = new IntersectionObserver((entries) => {
					if (!tubesApp) return;
					for (const entry of entries) {
						if (entry.isIntersecting) {
							// Try common resume methods
							tubesApp.play?.();
							tubesApp.wake?.();
							tubesApp.resume?.();
						} else {
							// Try common pause methods
							tubesApp.pause?.();
							tubesApp.sleep?.();
							tubesApp.stop?.();
						}
					}
				}, { threshold: 0 });
				
				if (canvasEl.parentElement) {
					io.observe(canvasEl.parentElement);
				}

			} catch (err) {
				console.warn('[TubesBackground] Failed to load TubesCursor:', err);
			}
		})();

		// Watch theme changes
		observer = new MutationObserver(() => {
			if (!mounted) return;
			if (forceDark) {
				isDark = true;
				return;
			}
			const nowDark = document.documentElement.classList.contains('dark');
			if (nowDark !== isDark) {
				isDark = nowDark;
				applyCurrentPalette();
			}
		});
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class'],
		});

		return () => {
			mounted = false;
			if (observer) observer.disconnect();
			if (io) io.disconnect();
			if (tubesApp) {
				tubesApp.destroy?.();
				tubesApp = null;
			}
		};
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	class="relative w-full overflow-hidden {className}"
	onclick={cyclePalette}
	role="button"
	aria-label="Click to change tube colours"
	tabindex="0"
	onkeydown={(e) => e.key === 'Enter' && cyclePalette()}
>
	<!--
		Canvas filter strategy:
		• Dark mode  → no filter, natural black bg + neon colours
		• Light mode → invert(1) flips black→white; hue-rotate(180deg) cancels
		              the colour inversion for all saturated hues so blue stays
		              blue, cyan stays cyan, purple stays purple — no warm tones.
	-->
	<canvas
		bind:this={canvasEl}
		class="absolute inset-0 w-full h-full block transition-[filter] duration-500"
		style="touch-action: none; will-change: transform; transform: translateZ(0); {isDark ? '' : 'filter: invert(1) hue-rotate(180deg);'}"
	></canvas>



	<!--
		Liquid Glass overlay layer:
		• Sits above the canvas, below the text
		• backdrop-filter: blur(6px) blurs the tubes canvas just behind this
		  panel — text content is rendered in z-[3] ABOVE this layer so it
		  stays completely sharp
		• The specular top rim (inset box-shadow) makes the panel feel like
		  physical glass reacting to the ambient light of the hero
	-->
	<div
		class="hero-glass absolute inset-0 pointer-events-none z-[1]"
		aria-hidden="true"
	></div>

	<!-- Slot: text + CTAs sit above the glass — no blur applied to them -->
	<div class="relative z-[3] w-full h-full pointer-events-none">
		{@render children?.()}
	</div>
</div>
