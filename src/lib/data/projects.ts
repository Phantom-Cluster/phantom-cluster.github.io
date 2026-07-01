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
		description: 'Redesigned the core WPMU DEV plugin suite and shipped a scalable atomic design system — growing Smush to 2M+ installs and lifting Pro conversions by 47%.',
		role: 'Product Designer',
		problem: 'Plugin inconsistency was fragmenting the WPMU DEV user base — high drop-off in Smush\'s compression flow, poor onboarding completion for Hummingbird Pro, and a Snapshot restore UX generating disproportionate support volume. The business needed a unified design system to consolidate the ecosystem and drive Pro tier upgrades.',
		process: 'Built an atomic design system with accessibility baked in from the token level. Redesigned key plugin flows using Figma prototypes tested via Maze, then synthesized usability findings to prioritize which friction points were costing the most conversions.',
		solution: 'Launched a unified dashboard with a monochrome mode for white-label use. Reduced Smush\'s compression flow from 7 steps to 4, restructured Hummingbird\'s onboarding to surface the performance win earlier, and redesigned Snapshot\'s restore UX with scoped selection (DB · Files · Both) to eliminate the top support ticket category.',
		outcome: 'Smush grew from 1M to 2M+ active installs. Pro conversion rate increased +47%. Bounce rate across key plugin pages dropped 37%. Snapshot\'s selective restore redesign eliminated the most common restore-error support ticket category within the first quarter post-launch.',
		metrics: ['1M → 2M+ Active Installs', 'Bounce Rate −37%', 'Pro Conversions +47%'],
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
		description: 'Redesigned a Kanban SaaS platform to remove collaboration bottlenecks and build a white-label system adopted by enterprise clients without modification.',
		role: 'UI/UX Designer',
		problem: 'The existing Kanban interface had no clear visual hierarchy between idea stages, causing users to lose track of card status and rely on external documentation. The product also lacked a white-label foundation, blocking enterprise clients who required brand-neutral deployments.',
		process: 'Mapped user-reported friction points against session recordings to identify where cards stalled in the workflow. Designed a structured 4-stage visual flow and built a white-label design system from scratch, separating brand tokens from structural components so enterprise clients could apply their own identity without engineering rework.',
		solution: 'Delivered a restructured Kanban interface with explicit stage progression, visual status indicators, and a white-label component system built on separated brand tokens. Enterprise clients received a single Figma handoff they could deploy without modification.',
		outcome: 'Reduced the steps required to progress an idea from submission to review by 40%. The white-label design system was adopted by enterprise clients without any custom implementation requests to the engineering team post-launch.',
		metrics: ['Idea Progression −40% Steps', 'Enterprise White-label: 0 Custom Requests', 'Design System Built from Scratch'],
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
		description: 'Full redesign of a travel tours app — rebuilt to drive purchase conversion, then deliver an experience compelling enough to bring users back.',
		role: 'Product Designer',
		problem: 'The app was doing everything possible to lose a buyer before they converted. Onboarding dropped users into the product with no context or value signal. The tour player had no seek controls — if you missed a moment in the audio, you were stuck. Preview states treated purchased and un-purchased content identically, so there was nothing to unlock. The profile was effectively empty: no purchase history, no tour progress, no reviews. And there was no map — for a product built around physical guided tours.',
		process: 'Traced every drop-off back through the purchase funnel: what makes someone decide to buy, and what makes them open the app again the next day. Rebuilt onboarding to surface the value proposition before asking for anything. Redesigned preview states to create a clear bought vs. un-bought distinction. Added −10s / +15s seek controls to the player after identifying that users were repeatedly scrubbing back. Designed transcript as a new feature — a second mode of engaging with tour content. Rebuilt the profile section around real engagement data: tours completed, purchase history, dropped reviews. Designed an interactive 3D map with live position tracking. Added language switching for multi-region deployment.',
		solution: 'New onboarding that converts. Transcript as a native feature. A player with actual seek controls. Preview states that communicate what a purchase unlocks. Profile with real engagement history — tours done, purchases made, reviews left. Interactive 3D map with live tour position. Language switching built into the system. A product redesigned to earn the buy, then justify every re-open.',
		outcome: 'Every surface in the app was rebuilt around the core conversion goal — get users to buy, then give them a reason to stay. The transcript and interactive 3D map launched as net-new features. Profile redesign made engagement history visible for the first time. Onboarding was rebuilt from scratch. Seek controls were added to the player. Language support was integrated for multi-region launch.',
		metrics: ['Transcript — Net-new Feature', 'Interactive 3D Map Added', 'Onboarding Rebuilt from Scratch'],
		tags: ['Mobile App', 'Consumer Product', 'UI/UX Design', 'Multi-region'],
		thumbnail: '/videos/Eclectic/New UI .png',
		images: [
			'/videos/Eclectic/New UI .png',
			'/videos/Eclectic/New UI second screenshot.png',
			'/videos/Eclectic/New Walkthrough.png',
			'/videos/Eclectic/old UI.png',
		]
	},
	{
		title: 'WordPress Admin Redesign',
		slug: 'wordpress-redesign',
		description: 'Concept redesign of the WordPress admin experience — modernising the block editor toolbar, navigation hierarchy, and plugin management flows.',
		role: 'Concept Designer',
		problem: 'WordPress\'s admin UI had accumulated years of legacy patterns — the toolbar hierarchy was inconsistent across Gutenberg blocks, the main navigation didn\'t scale for plugin-heavy installations, and the visual language predated modern SaaS design standards.',
		process: 'Audited the existing admin flow across 6 major task types: post editing, plugin management, settings, user management, media library, and theme customisation. Mapped friction points, then designed a restructured navigation hierarchy and updated block editor toolbar system.',
		solution: 'Designed a modernised WordPress admin with a collapsible sidebar, unified block toolbar, and a redesigned plugin management view that grouped plugins by category rather than flat alphabetical listing — reducing the cognitive load of managing large plugin libraries.',
		outcome: 'This concept, alongside the Effido productivity app, were the portfolio pieces that led directly to the WPMU DEV product design role. The WordPress depth signalled domain knowledge; Effido showed product thinking. Together they opened the door.',
		metrics: ['6 Admin Task Flows Redesigned', 'Unified Block Toolbar System', 'Led to WPMU DEV Role'],
		tags: ['WordPress', 'Concept', 'UI Design', 'Admin UX'],
		thumbnail: '/images/projects/wordpress/dashboard.webp',
		images: [
			'/images/projects/wordpress/hero.webp',
			'/images/projects/wordpress/dashboard.webp',
			'/images/projects/wordpress/search-bar.webp',
			'/images/projects/wordpress/page-post.webp',
		]
	},
	{
		title: 'Effido Productivity App',
		slug: 'effido-productivity-app',
		description: 'Concept design for a cross-device productivity app that unifies task management, calendar, and Pomodoro timer in one surface — synced across Desktop, iPad, and SmartWatch.',
		role: 'UI/UX Designer',
		problem: 'Productivity tools are scattered. Calendar in one tab. Pomodoro timer in another. Task list somewhere else. Every context switch adds friction — and the apps built to reduce cognitive load end up multiplying it. Effido started from a personal frustration: having to jump between a calendar and a Pomodoro timer every single work session.',
		process: 'Mapped the full productivity workflow from planning (Upcoming) to execution (Pomodoro + Today) to review (Dashboard), then designed each screen to feed into the next. Labels became the central organisation system — every task gets a label, every view filters by it, every insight reports by it. Designed with full light and dark mode parity using Inter and Poppins, with a blue-primary palette and label-specific accent colours.',
		solution: 'A five-screen productivity app — Dashboard, Today, Upcoming, Pomodoro Timer, and Task List — all sharing the same underlying data, synced across Desktop, iPad, and SmartWatch. Labels categorise every task and double as an accessibility aid. Today\'s timeline lets you hover a task to read full details and add new tasks without leaving the view. Upcoming supports custom date ranges alongside Day, Week, and Month. Pomodoro pins your most important project and shows live work efficiency. Task cards show collaborator avatars so you can see who is currently connected to a project.',
		outcome: 'This concept, alongside the WordPress admin redesign, were the two pieces that led directly to the WPMU DEV product design role. Effido demonstrated product thinking under real constraints — identifying a genuine friction point and designing a cohesive multi-screen, multi-device solution from scratch.',
		metrics: ['Desktop · iPad · SmartWatch — one synced data layer', 'Labels as the core org system — categories + accessibility', 'Led directly to WPMU DEV product design role'],
		tags: ['Multi-platform', 'Productivity', 'UI Design', 'Concept'],
		thumbnail: '/images/projects/effido/Main Dashboard.png',
		images: [
			'/images/projects/effido/Hero cover of presentation. .png',
			'/images/projects/effido/Main Dashboard.png',
			'/images/projects/effido/Dashboard - Dark mode.png',
			'/images/projects/effido/Today task.png',
			'/images/projects/effido/Today task - Dark mode.png',
			'/images/projects/effido/Upcoming task.png',
			'/images/projects/effido/Upcoming task dark mode.png',
			'/images/projects/effido/Pomodoro timer.png',
			'/images/projects/effido/Pomodoro timer dark mode.png',
			'/images/projects/effido/Task list - currently working, in progress not working in present time , already done .png',
			'/images/projects/effido/Task list dark mode .png',
		]
	},
	{
		title: 'Island Resort Design',
		slug: 'resort-island-design',
		description: 'Concept design for a tropical island resort digital experience — covering the booking interface, in-resort companion app, and brand identity system.',
		role: 'Visual Designer',
		problem: 'Luxury resort digital experiences typically fail to translate the sensory quality of the physical space into their booking interface — high-contrast, feature-heavy flows undercut the aspirational brand positioning before a guest even arrives.',
		process: 'Defined a visual language grounded in the resort\'s natural environment — warm palettes, organic shapes, and typographic stillness. Designed the booking flow to reduce decision points and emphasise atmosphere over specification lists.',
		solution: 'Delivered a concept experience covering the resort website\'s hero and booking flow, an in-resort companion app for room service and activity scheduling, and a brand identity system using a warm sand + deep teal palette.',
		outcome: 'Concept exploration demonstrating a hospitality-first digital experience with a cohesive brand-to-product visual language — showing how premium resort positioning can be maintained through the digital interface.',
		metrics: ['End-to-End Brand System', 'Booking Flow + In-Resort App', 'Concept Exploration'],
		tags: ['Web Design', 'Hospitality', 'Brand Identity', 'Concept'],
		thumbnail: '/images/projects/resort/homepage.webp',
		images: [
			'/images/projects/resort/hero.webp',
			'/images/projects/resort/homepage.webp',
			'/images/projects/resort/about.webp',
			'/images/projects/resort/location.webp',
			'/images/projects/resort/room-details.webp',
		]
	},
	{
		title: 'Alt News Concept',
		slug: 'alt-news-concept',
		description: 'Concept redesign of a fact-checking news platform — restructuring how verified content is surfaced and how readers navigate credibility signals inline.',
		role: 'Concept Designer',
		problem: 'Fact-checking platforms present verification data in a secondary position — the headline leads, the fact-check follows. This hierarchy reinforces the misinformation problem: unverified claims get read first, corrections get missed entirely.',
		process: 'Researched how readers scan news interfaces and where credibility signals needed to be positioned to change reading behaviour. Mapped a content hierarchy that foregrounds verification status without sacrificing readability or editorial voice.',
		solution: 'Designed a credibility-first news interface where verification status appears as a visual layer over the headline — colour-coded by status (verified / in-review / disputed) — with an expandable fact panel that surfaces source links without leaving the article view.',
		outcome: 'Concept exploration proposing a credibility-first reading interface for fact-checking journalism, demonstrating that trust signals and readability are not in opposition.',
		metrics: ['Credibility-First Content Hierarchy', 'Inline Verification Layer System', 'Concept Exploration'],
		tags: ['Web Design', 'News Platform', 'UI Design', 'Concept'],
		thumbnail: '/images/projects/alt-news/trending.webp',
		images: [
			'/images/projects/alt-news/hero.webp',
			'/images/projects/alt-news/trending.webp',
			'/images/projects/alt-news/videos.webp',
			'/images/projects/alt-news/newsletter.webp',
		]
	},
	{
		title: 'Spotify Redesign Concept',
		slug: 'spotify-redesign',
		description: 'Redesigned Spotify\'s core listening interface — the first design project that opened the door to Themeisle and a career in product design.',
		role: 'Concept Designer',
		problem: 'Spotify\'s core listening experience felt static next to how people actually used it — juggling playlists, queues, and sessions without a clear hierarchy. The now-playing view buried context, queue management was an afterthought, and the relationship between what you\'re hearing and what\'s coming next was unclear.',
		process: 'My first interactive prototype built in InVision Studio. Focused entirely on the listening session — the now-playing hierarchy, how the queue surfaces relative to the current track, and how playlist browsing could stay contextual without pulling you out of the music. Adobe Photoshop for visual refinement.',
		solution: 'A reimagined Spotify Premium interface with reorganised now-playing hierarchy, cleaner queue management surfaced as a native layer, and playlist browsing that kept the current listening session as the anchor rather than dropping the user into a flat browse view.',
		outcome: 'Themeisle discovered this project on Behance and reached out. It was the piece that started everything — the first role, the first professional team, the first shipped product work. Built in 2019 as a personal exploration; it ended up being the most consequential project in the portfolio.',
		metrics: ['First InVision Studio Prototype', '351 Behance Views · 8 Appreciations', 'Led to Themeisle Role'],
		tags: ['Concept', 'Music App', 'UI Design', 'Interaction Design'],
		thumbnail: '/images/projects/spotify/home.webp',
		images: [
			'/images/projects/spotify/home.webp',
			'/images/projects/spotify/browse.webp',
			'/images/projects/spotify/artist.webp',
			'/images/projects/spotify/profile.webp',
		]
	},
	{
		title: 'Discord Redesign',
		slug: 'discord-redesign',
		description: 'Concept redesign of Discord introducing cross-server activity feeds, interest-based Stage discovery, and a notification triage interface for heavy users.',
		role: 'Concept Designer',
		problem: 'Discord\'s server navigation didn\'t scale for users active in 10+ servers — finding relevant conversations required individual server visits with no unified activity surface. Stage discovery also relied on manual search rather than interest-based recommendations.',
		process: 'Mapped the content consumption patterns of heavy Discord users who wanted cross-server activity feeds and a smarter notification model that filtered by conversation relevance rather than recency alone.',
		solution: 'Designed a unified activity feed across servers, an interest-based Stage event discovery surface, and a notification triage panel that grouped alerts by server and priority — replacing the single chronological notification stack.',
		outcome: 'Concept exploration proposing a cross-server navigation layer and smarter notification model for power users, demonstrating how Discord can scale its UX for community-heavy use cases.',
		metrics: ['Cross-Server Activity Feed', 'Interest-Based Stage Discovery', 'Concept Exploration'],
		tags: ['Product Design', 'Social Platform', 'UI Design', 'Concept'],
		thumbnail: '/images/projects/discord/main-screen.webp',
		images: [
			'/images/projects/discord/intro.webp',
			'/images/projects/discord/main-screen.webp',
			'/images/projects/discord/server-screen.webp',
			'/images/projects/discord/live-screen.webp',
		]
	},
	{
		title: 'Neve Theme Starter Templates',
		slug: 'themeisle-starter-templates',
		description: 'Designed 50+ niche-specific starter templates for Neve WordPress Theme, contributing to the plugin crossing 300,000 active installations.',
		role: 'Starter Template Designer',
		problem: 'Neve\'s non-developer users were abandoning the theme in the early activation period — launching from a blank canvas without design expertise created high churn before the first page was published. The theme needed a library of niche-specific starter templates to lower the activation barrier and extend its reach beyond developers.',
		process: 'Conducted niche research across 20+ industry verticals to identify the visual patterns users in each category expected, then designed templates that met those expectations while staying within Neve\'s performance constraints. Each template was tested against Lighthouse benchmarks before delivery.',
		solution: 'Delivered 50+ responsive starter templates spanning niches from medical to restaurant to creative portfolio, each optimized for Lighthouse performance and built on Neve\'s Gutenberg and Elementor component system. Templates gave non-developer users a complete starting point they could launch the same day.',
		outcome: 'Themeisle found the Spotify redesign concept on Behance — that piece opened the initial conversation, and this role followed. The starter template library became a primary activation tool for non-developer users. Neve crossed 300,000 active installations during the period, with templates cited as a key driver of user retention past the initial activation threshold.',
		metrics: ['50+ Templates Across 20+ Niches', 'Lighthouse Score 90+', 'Contributed to 300K+ Installs'],
		tags: ['WordPress', 'Web Design', 'UI', 'Templates'],
		thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000',
		images: [
			'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1600',
			'https://images.unsplash.com/photo-1481481600465-3642c6e812b1?auto=format&fit=crop&q=80&w=1600'
		]
	}
];
