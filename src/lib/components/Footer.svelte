<script lang="ts">
	const year = new Date().getFullYear();
</script>

<footer class="bg-card border-t border-border mt-24">
	<div class="container mx-auto px-6 py-12">
		<div class="flex flex-col md:flex-row justify-between items-center gap-6">
			<div class="flex flex-col items-center md:items-start gap-2">
				<span class="text-lg font-bold tracking-tight">Hitanshu Sahu</span>
				<span class="text-sm text-muted-foreground">Product Designer</span>
			</div>
			
			<div class="flex items-center gap-6">
				<a href="https://www.linkedin.com/in/phantom-cluster/" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a>
				<a href="https://behance.net/phantomcluster" target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-foreground transition-colors">Behance</a>
				<a href="mailto:phantomcluster17@gmail.com" class="text-muted-foreground hover:text-foreground transition-colors">Email</a>
			</div>
		</div>
		
		<div class="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
			<p>&copy; {year} Hitanshu Sahu. All rights reserved.</p>
			<p>Designed and built with SvelteKit & TailwindCSS.</p>
		</div>
	</div>
</footer>
