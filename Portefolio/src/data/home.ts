export const homeContent = {
	hero: {
		eyebrow: 'Qui suis-je ?',
		intro:
			"Directrice artistique à travers mes différents projets, j'explore de nouvelles idées ainsi que la création de visuels uniques.",
		primaryAction: { label: 'Découvrir mes projets', href: '/portfolio/' },
		secondaryAction: { label: 'Voir mon CV', href: '/cv/' },
		image: {
			src: 'images/profile/Image_profil.jpeg',
			alt: '',
			caption: '',
		},
	},
	about: {
		eyebrow: 'À propos',
		title: 'Projets créatifs et collaborations',
		paragraphs: [
			"Je suis à la recherche d'opportunités professionnelles dans les domaines de la photographie et de l'illustration.",
			"J'apprécie particulièrement créer des univers visuels uniques et singuliers, donnant vie à des idées.",
		],
		link: { label: 'Consulter le CV', href: '/cv/' },
	},
	featured: {
		eyebrow: 'Sélection',
		title: 'Projets mis en avant',
		description: '',
		emptyMessage: "Aucun projet n'est actuellement mis en avant.",
		link: { label: 'Voir tout le portfolio', href: '/portfolio/' },
	},
	cta: {
		eyebrow: 'Un projet en tête ?',
		title: 'Parlon-en.',
		text: "Une idée, une collaboration ou un projet créatif, tant en photographie qu'en illustration ? Contactez-moi pour échanger sur vos idées et vos besoins.",
		primaryAction: { label: 'Explorer le portfolio', href: '/portfolio/' },
		secondaryAction: { label: 'Démarrer une conversation', href: '/contact/' },
	},
} as const;
