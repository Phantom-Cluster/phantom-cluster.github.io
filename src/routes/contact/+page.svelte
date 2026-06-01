<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { Button } from '$lib/components/ui/button';
	import MagneticButton from '$lib/components/MagneticButton.svelte';

	onMount(() => {
		gsap.from('.contact-element', {
			y: 40,
			opacity: 0,
			duration: 1,
			stagger: 0.15,
			ease: 'power3.out'
		});
	});
</script>

<svelte:head>
	<title>Contact | Hitanshu Sahu</title>
</svelte:head>

<div class="container mx-auto px-6 py-20 max-w-3xl min-h-[70vh] flex flex-col justify-center">
	<h1 class="text-[56px] md:text-7xl font-semibold tracking-[-0.04em] mb-8 text-foreground contact-element">Let's connect.</h1>
	
	<p class="text-[28px] text-muted-foreground leading-[1.14] font-medium tracking-[0.01em] mb-16 contact-element">
		I'm currently accepting new projects and consulting opportunities. Whether you have a project in mind or just want to say hi, my inbox is always open. Based in Kanpur, India.
	</p>

	<div class="flex flex-col sm:flex-row gap-6 contact-element items-start sm:items-center">
		<MagneticButton>
			{#snippet children()}
			<Button size="lg" href="mailto:phantomcluster17@gmail.com" class="text-[17px] h-14 px-8 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
				phantomcluster17@gmail.com
			</Button>
			{/snippet}
		</MagneticButton>
		
		<div class="flex items-center gap-6 px-4 pt-4 sm:pt-0">
			<a href="https://behance.net/phantomcluster" target="_blank" rel="noopener noreferrer" class="font-medium text-[17px] hover:text-primary transition-colors">Behance</a>
			<a href="https://www.linkedin.com/in/phantom-cluster/" target="_blank" rel="noopener noreferrer" class="font-medium text-[17px] hover:text-primary transition-colors">LinkedIn</a>
		</div>
	</div>
</div>
