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

	// Dark mode: vivid electric indigo and blue-violet neons read well against near-black canvas
	const darkPalettes = [
		{ tubes: ['#2244FF', '#7B8CFF', '#A5B4FC'], lights: ['#2244FF', '#3D52FF', '#818CF8', '#6366F1'] },
		{ tubes: ['#4F5EFF', '#7C3AED', '#6366F1'], lights: ['#4F5EFF', '#7C3AED', '#A78BFA', '#818CF8'] },
		{ tubes: ['#3730A3', '#2244FF', '#6366F1'], lights: ['#312E81', '#2244FF', '#818CF8', '#2244FF'] },
	];

	// Light mode: deeper, richer indigo shades
	const lightPalettes = [
		{ tubes: ['#3730A3', '#4338CA', '#2244FF'], lights: ['#3730A3', '#2244FF', '#4338CA', '#6366F1'] },
		{ tubes: ['#312E81', '#4F46E5', '#3730A3'], lights: ['#1E1B4B', '#2244FF', '#312E81', '#2244FF'] },
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
