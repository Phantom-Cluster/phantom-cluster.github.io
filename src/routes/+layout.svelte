<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';
	// import NavbarDraft from '$lib/components/NavbarDraft.svelte'; // archived — static editorial bar draft
	// import Footer from '$lib/components/Footer.svelte'; // archived — original minimal footer
	import FooterDraft from '$lib/components/FooterDraft.svelte';
	import UpdateNoticeBar from '$lib/components/UpdateNoticeBar.svelte';
	import { page } from '$app/state';
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
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/favicon.svg" />
	<link rel="apple-touch-icon-precomposed" href="/favicon.svg" />
	<title>Hitanshu Sahu — Product Designer & UX Strategist</title>
</svelte:head>

<UpdateNoticeBar />
<Navbar />
<div class="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
	<main class="grow {['/', '/work/wpmu-dev-dashboard', '/work/ideajam-kanban-saas', '/work/eclectic-app-design', '/work/themeisle-starter-templates', '/work/wordpress-redesign', '/work/effido-productivity-app', '/work/alt-news-concept', '/work/discord-redesign'].includes(page.url.pathname) ? '' : 'pt-20'}">
		{#key page.url.pathname}
			<div in:fade={{ duration: 300, delay: 300 }} out:fade={{ duration: 300 }}>
				{@render children()}
			</div>
		{/key}
	</main>

	<FooterDraft />
</div>
