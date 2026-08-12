export interface PortfolioCategory {
	slug: string;
	label: string;
	description: string;
}

export interface PortfolioExpertiseItem {
	title: string;
	description: string;
}

export interface PortfolioExpertiseContent {
	eyebrow: string;
	title: string;
	introduction: string;
	items: readonly PortfolioExpertiseItem[];
}

export const portfolioCategories: PortfolioCategory[] = [
	{
		slug: 'photographie',
		label: 'Photographie',
		description: 'Séries éditoriales, portraits et récits documentaires.',
	},
	{
		slug: 'illustration',
		label: 'Illustration numérique',
		description: 'Images dessinées, systèmes graphiques et compositions narratives.',
	},
	{
		slug: 'direction-artistique',
		label: 'Direction artistique',
		description: 'Identités visuelles et campagnes pensées comme des ensembles cohérents.',
	},
];

export const portfolioContent = {
	index: {
		eyebrow: 'Portfolio',
		title: 'Galerie des projets',
		description:
			'Voici ci-dessous l’entièreté des projets finalisés, classés par catégorie. Chaque projet est accompagné d’une description détaillée de son contexte, de ses objectifs et des outils utilisés.',
	},
	expertise: {
		eyebrow: 'Compétences',
		title: 'Ce que j’apporte à vos projets',
		introduction:
			'Une pratique transversale, de la préparation d’un univers visuel à sa réalisation et à sa post-production.',
		items: [
			{
				title: 'Création de décors',
				description:
					'Conception et mise en place de décors adaptés à l’univers, aux contraintes et à l’intention visuelle de chaque projet.',
			},
			{
				title: 'Maquillage & stylisme',
				description:
					'Préparation et réalisation du maquillage, du stylisme et de la mise en scène pour chaque projet, en accord avec l’univers visuel souhaité.',
			},			
			{
				title: 'Photographie professionnelle',
				description:
					'Préparation et réalisation des prises de vue : réglages ISO, choix des angles, composition, lumière et cohérence de série.',
			},
			{
				title: 'Retouche avec Lightroom',
				description:
					'Maîtrise d’Adobe Lightroom pour le développement, la colorimétrie, les corrections locales et l’harmonisation professionnelle des images.',
			},
			{
				title: 'Culture japonaise',
				description:
					'Étude et conseil pour les projets intégrant la culture japonaise, nourris par mes études en LLCER japonais et une attention particulière au contexte culturel.',
			},
			{
				title: 'Illustration digitale',
				description:
					'Maîtrise des ombrages, des couleurs et de la composition sur tablette graphique HUION Canva Pro 2 avec Clip Studio Paint.',
			},
		],
	},
	filtersLabel: 'Explorer par catégorie',
	allProjectsLabel: 'Tous les projets',
	emptyMessage: 'Aucun projet publié dans cette catégorie.',
	project: {
		backLabel: 'Retour au portfolio',
		detailsTitle: 'À propos du projet',
		toolsTitle: 'Outils & techniques',
		galleryTitle: 'Galerie',
		navigationTitle: 'Continuer à explorer',
		previousLabel: 'Projet précédent',
		nextLabel: 'Projet suivant',
	},
} as const;
