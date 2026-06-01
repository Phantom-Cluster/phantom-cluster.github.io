<script lang="ts">
	import { spring } from 'svelte/motion';
	import type { Snippet } from 'svelte';

	let { children, class: className = '' }: { children: Snippet, class?: string } = $props();

	// High-end spring physics mimicking "taste-skill" magnetic pull
	const x = spring(0, { stiffness: 0.1, damping: 0.15 });
	const y = spring(0, { stiffness: 0.1, damping: 0.15 });

	function handleMousemove(e: MouseEvent) {
		const node = e.currentTarget as HTMLElement;
		const rect = node.getBoundingClientRect();
		const hx = rect.left + rect.width / 2;
		const hy = rect.top + rect.height / 2;
		
		// Move the element towards the cursor
		x.set((e.clientX - hx) * 0.3);
		y.set((e.clientY - hy) * 0.3);
	}

	function handleMouseleave() {
		// Snap back to center
		x.set(0);
		y.set(0);
	}
</script>

<div
	role="presentation"
	onmousemove={handleMousemove}
	onmouseleave={handleMouseleave}
	class="inline-block relative {className} transition-transform duration-75 active:scale-[0.96]"
	style="transform: translate({$x}px, {$y}px);"
>
	{@render children()}
</div>
