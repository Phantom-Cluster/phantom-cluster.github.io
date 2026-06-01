<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Lenis from 'lenis';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	let { children } = $props();

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// Initialize Lenis
		const lenis = new Lenis({
			autoRaf: false,
		});

		// Sync Lenis with GSAP ScrollTrigger
		lenis.on('scroll', ScrollTrigger.update);

		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});

		gsap.ticker.lagSmoothing(0);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Hitanshu Sahu | Product Designer</title>
</svelte:head>

<div class="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
	<Navbar />
	
	<main class="flex-grow {$page.url.pathname === '/' ? '' : 'pt-20'}">
		{#key $page.url.pathname}
			<div in:fade={{ duration: 300, delay: 300 }} out:fade={{ duration: 300 }}>
				{@render children()}
			</div>
		{/key}
	</main>

	<Footer />
</div>
