<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { ArrowRight } from 'lucide-svelte';
	import cubesImg from '$lib/assets/4 Cube Abstract Glass Spectrum.png';

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		const tl = gsap.timeline({ delay: 0.2 });

		// Subtle parallax drift for the background cubes
		gsap.to('.hero-cubes-bg', {
			yPercent: 40,
			ease: 'none',
			scrollTrigger: {
				trigger: '.hero-headline-centered',
				start: 'top bottom',
				end: 'bottom top',
				scrub: true
			}
		});

		tl.from('.hero-badge-centered', {
			opacity: 0,
			y: -20,
			duration: 0.8,
			ease: 'power3.out'
		});

		tl.from('.hero-headline-centered', {
			opacity: 0,
			y: 40,
			duration: 1,
			ease: 'power3.out'
		}, "-=0.5");

		tl.from('.hero-desc-centered', {
			opacity: 0,
			y: 20,
			duration: 0.8,
			ease: 'power3.out'
		}, "-=0.7");

		tl.from('.hero-cta-centered', {
			opacity: 0,
			y: 15,
			duration: 0.6,
			ease: 'power3.out'
		}, "-=0.5");

		// --- Pills Physics ---
		const pills = document.querySelectorAll('.hero-pill');
		const cleanups: (() => void)[] = [];
		
		pills.forEach((pill) => {
			const inner = pill.querySelector('.hero-pill-inner');
			if (!inner) return;

			// Idle State: Continuous floating
			// Y-axis: ±4px with 3.5s cycle (half cycle = 1.75s)
			// X-axis: ±2px with 4.2s cycle (half cycle = 2.1s)
			const idleX = gsap.fromTo(inner, 
				{ x: -2 }, 
				{ x: 2, duration: 2.1, ease: 'sine.inOut', repeat: -1, yoyo: true }
			);
			
			const idleY = gsap.fromTo(inner, 
				{ y: -4 }, 
				{ y: 4, duration: 1.75, ease: 'sine.inOut', repeat: -1, yoyo: true }
			);

			let isHovered = false;

			const handleMouseMove = (e: MouseEvent) => {
				const rect = pill.getBoundingClientRect();
				
				// 60px expanded bounding box
				const isNear = 
					e.clientX > rect.left - 60 &&
					e.clientX < rect.right + 60 &&
					e.clientY > rect.top - 60 &&
					e.clientY < rect.bottom + 60;

				if (isNear) {
					if (!isHovered) {
						isHovered = true;
						idleX.pause();
						idleY.pause();
					}

					const pillCenterX = rect.left + rect.width / 2;
					const pillCenterY = rect.top + rect.height / 2;
					
					// Vector from cursor TO pill center (repulsion)
					const repelX = pillCenterX - e.clientX;
					const repelY = pillCenterY - e.clientY;
					
					const dist = Math.sqrt(repelX * repelX + repelY * repelY) || 1;
					
					const maxPush = 15;
					const intensity = Math.max(0, 1 - (dist / 120));
					const targetX = (repelX / dist) * maxPush * intensity;
					const targetY = (repelY / dist) * maxPush * intensity;

					// Spring easing approximation
					gsap.to(pill, {
						x: targetX,
						y: targetY,
						duration: 0.4,
						ease: "power2.out",
						overwrite: "auto"
					});

				} else {
					if (isHovered) {
						isHovered = false;
						
						// Return to idle origin
						gsap.to(pill, {
							x: 0,
							y: 0,
							duration: 0.8,
							ease: "elastic.out(1, 0.4)",
							overwrite: "auto",
							onComplete: () => {
								if (!isHovered) {
									idleX.resume();
									idleY.resume();
								}
							}
						});
					}
				}
			};

			window.addEventListener('mousemove', handleMouseMove);
			cleanups.push(() => {
				window.removeEventListener('mousemove', handleMouseMove);
				idleX.kill();
				idleY.kill();
			});
		});

		return () => {
			cleanups.forEach(fn => fn());
		};
	});
</script>

<!-- The visual Hero section styled on a light gray background exactly like the Agero template -->
<section class="w-full bg-[#f4f4f6] pt-40 pb-20 relative overflow-hidden flex flex-col items-center justify-center border-b border-neutral-200/50">
	
	<!-- Subtle ambient soft radial lighting behind the centered text layout -->
	<div class="absolute top-[10%] left-[25%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>

	<!-- TOP BADGE: Overlapping Avatars + Trusted by founders in high-contrast light theme -->
	<div class="hero-badge-centered flex items-center justify-center gap-3 bg-white border border-neutral-200 px-5 py-2.5 rounded-full mb-10 shadow-sm">
		<div class="flex -space-x-2.5 overflow-hidden">
			<img
				class="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-white object-cover"
				src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
				alt="Founder 1"
			/>
			<img
				class="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-white object-cover"
				src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
				alt="Founder 2"
			/>
			<img
				class="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-white object-cover"
				src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
				alt="Founder 3"
			/>
		</div>
		<span class="text-xs font-semibold tracking-tight text-neutral-800">Trusted by founders.</span>
	</div>

	<!-- MAIN HEADLINE: Centered, geometric Cal-Sans display typography with custom inline visual clips -->
	<h1 class="hero-headline-centered relative text-center text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-[-0.04em] leading-[1.1] text-neutral-900 max-w-[20ch] mx-auto select-none">
		<!-- Injected Abstract Glass Cubes Parallax Background -->
		<img 
			src={cubesImg} 
			alt="" 
			class="hero-cubes-bg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] md:max-w-[700px] object-contain pointer-events-none" 
			style="z-index: -1; opacity: 0.35; filter: blur(6px);" 
		/>
		Engineered 
		<!-- Inline Rounded Image Clip 1 -->
		<span class="hero-pill inline-block align-middle mx-1 md:mx-2 will-change-transform z-20 relative">
			<span class="hero-pill-inner block rounded-full border border-neutral-200 w-[2.2em] h-[1.1em] overflow-hidden bg-neutral-200 shadow-sm will-change-transform">
				<img 
					src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=250" 
					alt="Sleek interface" 
					class="w-full h-full object-cover pointer-events-none"
				/>
			</span>
		</span> 
		<span class="text-primary">Design</span> 
		<br class="hidden lg:inline" />
		for Ambitious
		<!-- Inline Rounded Image Clip 2 -->
		<span class="hero-pill inline-block align-middle mx-1 md:mx-2 will-change-transform z-20 relative">
			<span class="hero-pill-inner block rounded-full border border-neutral-200 w-[2.2em] h-[1.1em] overflow-hidden bg-neutral-200 shadow-sm will-change-transform">
				<img 
					src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=250" 
					alt="Creative work desk" 
					class="w-full h-full object-cover pointer-events-none"
				/>
			</span>
		</span> 
		Products.
	</h1>

	<!-- Tagline details matching exact Agero wording, colored in readable dark neutral -->
	<p class="hero-desc-centered text-center text-neutral-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-[55ch] mx-auto font-medium mt-8 mb-10">
		I architect clean, conversion-focused design systems that allow product teams to build, launch, and scale rapidly.
	</p>

	<!-- Centered CTA Trigger pill button, popping in vibrant brand orange with glowing shadow -->
	<div class="hero-cta-centered flex justify-center">
		<Button
			href="#projects"
			class="bg-primary hover:bg-[#d92b00] border border-primary text-white font-semibold rounded-full px-8 py-4 h-14 text-sm uppercase tracking-wider flex items-center gap-2.5 shadow-[0_10px_30px_rgba(245,53,0,0.35)] hover:shadow-[0_15px_35px_rgba(245,53,0,0.5)] transition-all duration-300 active:scale-98 group"
		>
			<span>Explore Work</span>
			<ArrowRight class="size-4 text-white transition-transform duration-300 group-hover:translate-x-1.5" />
		</Button>
	</div>
</section>
