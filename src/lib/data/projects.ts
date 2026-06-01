export type Project = {
	title: string;
	slug: string;
	description: string;
	role: string;
	problem: string;
	process: string;
	solution: string;
	outcome: string;
	metrics: string[];
	tags: string[];
	images: string[];
	thumbnail: string;
};

export const projects: Project[] = [
	{
		title: 'WPMU DEV Dashboard & Design System',
		slug: 'wpmu-dev-dashboard',
		description: 'Led the complete overhaul of the WPMU DEV dashboard and spearheaded a scalable atomic design system in Figma.',
		role: 'Product Designer',
		problem: 'The legacy dashboard and plugins (Smush, Hummingbird, Snapshot) lacked visual consistency and had usability gaps, leading to user friction and lower conversion rates.',
		process: 'Spearheaded an atomic design system with baked-in accessibility. Redesigned key flows using interactive prototypes tested via Maze, and synthesized feedback with GPT.',
		solution: 'Launched a unified dashboard, introduced a monochrome mode for white-label use, and redesigned major plugins (Smush Ultra Compression, Hummingbird onboarding, Snapshot modular restore).',
		outcome: 'Boosted Pro conversions, streamlined onboarding, and reduced restore time errors, significantly improving the overall WordPress ecosystem experience.',
		metrics: ['1M → 2M+ Smush Installs', 'Reduced Bounce Rate', 'Increased Pro Conversions'],
		tags: ['SaaS', 'Design System', 'WordPress', 'UX/UI'],
		thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
		images: [
			'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600',
			'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600'
		]
	},
	{
		title: 'Ideajam Kanban Redesign',
		slug: 'ideajam-kanban-saas',
		description: 'Led the redesign of a Kanban and task-management SaaS platform focusing on collaboration and white-labeling.',
		role: 'UI/UX Designer',
		problem: 'Users faced bottlenecks in collaboration and idea generation, and the platform lacked a flexible architecture for white-labeling by different brands.',
		process: 'Leveraged user feedback to map out friction points. Created a fresh, scalable design system from scratch to unify the platform.',
		solution: 'Designed an intuitive, visually cohesive Kanban interface that improved task flows, built specifically with white-labeling constraints in mind.',
		outcome: 'Boosted collaboration and idea generation, allowing seamless adaptation to various brand identities without sacrificing consistency.',
		metrics: ['Improved Task Flow Efficiency', 'Scalable White-label System', 'Unified Design Language'],
		tags: ['SaaS', 'Kanban', 'UI Design', 'B2B'],
		thumbnail: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=1000',
		images: [
			'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=1600',
			'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1600'
		]
	},
	{
		title: 'Eclectic App Redesign',
		slug: 'eclectic-app-design',
		description: 'Led the app redesign using a scalable Design System, integrating AI tools for accelerated workflows.',
		role: 'Product Designer',
		problem: 'The app needed a structural overhaul to support multi-region requirements and localization, alongside a need for faster creative output.',
		process: 'Created comprehensive product blueprints. Built and maintained a localized design system in Figma, and leveraged AI tools (Gemini, Loveart) for graphic generation.',
		solution: 'Delivered a flexible, localized mobile experience. Designed motion graphics and visual content to elevate the digital presence.',
		outcome: 'Accelerated graphic design workflows and successfully supported multi-region deployment with a cohesive design system.',
		metrics: ['Faster Creative Output', 'Multi-region Support', 'AI Workflow Integration'],
		tags: ['Mobile App', 'Design System', 'AI Tools', 'Motion'],
		thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1000',
		images: [
			'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1600',
			'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1600'
		]
	},
	{
		title: 'Neve Theme Starter Templates',
		slug: 'themeisle-starter-templates',
		description: 'Designed 50+ diverse, high-performance starter layouts for the Neve WordPress Theme.',
		role: 'Starter Template Designer',
		problem: 'Users needed ready-to-use, high-quality, and niche-specific website templates that didn\'t compromise the Neve theme\'s performance standards.',
		process: 'Conducted thorough research on niche industry requirements, focusing heavily on typographic hierarchy and cohesive color palettes.',
		solution: 'Designed and delivered over 50 responsive layouts optimized for the WordPress ecosystem (Gutenberg/Elementor), ensuring top-tier performance.',
		outcome: 'Empowered thousands of users to launch professional websites instantly while maintaining high Lighthouse scores.',
		metrics: ['50+ Layouts Designed', 'Optimized Performance', 'High User Adoption'],
		tags: ['WordPress', 'Web Design', 'UI', 'Templates'],
		thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000',
		images: [
			'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1600',
			'https://images.unsplash.com/photo-1481481600465-3642c6e812b1?auto=format&fit=crop&q=80&w=1600'
		]
	}
];
