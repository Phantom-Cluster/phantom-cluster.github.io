<script lang="ts">
	import { cn } from '$lib/utils';

	let { 
		children, 
		class: className,
		active = false,
		...props 
	} = $props<{
		children: import('svelte').Snippet;
		class?: string;
		active?: boolean;
		[key: string]: any;
	}>();
</script>

<div
	class={cn(
		"inline-flex items-center justify-center transition-all duration-300 cursor-default select-none",
		"px-6 py-2.5 rounded-full text-[15px] font-medium tracking-tight",
		"bg-background border border-[#e0e0e0] text-[#1d1d1f] dark:text-white dark:border-white/10",
		"hover:bg-primary/5 hover:text-primary hover:border-primary/30",
		"active:scale-[0.96] active:bg-primary/10",
		active && "bg-primary/10 text-primary border-primary/30",
		className
	)}
	{...props}
>
	{@render children()}
</div>
