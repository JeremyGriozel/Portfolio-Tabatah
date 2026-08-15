import siteContent from './site-content.json';

export type SiteTheme =
	| 'default'
	| 'dark-academia'
	| 'light-academia'
	| 'downtown-girl'
	| 'old-money'
	| 'vintage'
	| 'cottage-core'
	| 'y2k'
	| 'gothic'
	| 'soft-girl'
	| 'ethereal'
	| 'cyberpunk';

export const themeOptions: ReadonlyArray<{ value: SiteTheme; label: string }> = [
	{ value: 'default', label: 'Default' },
	{ value: 'dark-academia', label: 'Dark Academia' },
	{ value: 'light-academia', label: 'Light Academia' },
	{ value: 'downtown-girl', label: 'Downtown Girl' },
	{ value: 'old-money', label: 'Old Money' },
	{ value: 'vintage', label: 'Vintage' },
	{ value: 'cottage-core', label: 'Cottage Core' },
	{ value: 'y2k', label: 'Y2K' },
	{ value: 'gothic', label: 'Gothic' },
	{ value: 'soft-girl', label: 'Soft Girl' },
	{ value: 'ethereal', label: 'Ethereal' },
	{ value: 'cyberpunk', label: 'Cyberpunk' },
];

export interface SiteConfig {
	theme: SiteTheme;
	name: string;
	metadata: {
		defaultTitle: string;
		defaultDescription: string;
	};
	footer: {
		message: string;
		contactLabel: string;
		navigationLabel: string;
		socialsLabel: string;
		legal: string;
		decorativeImage: string;
	};
	pages: {
		cv: {
			title: string;
			intro: string;
			openLabel: string;
			downloadLabel: string;
			fallbackText: string;
			mobileText: string;
			portfolioLink: { label: string; href: string };
			contactLink: { label: string; href: string };
		};
	};
}

export const siteConfig = {
	theme: 'dark-academia',
	name: siteContent.home.hero.title,
	metadata: {
		defaultTitle: 'Tabatah Lux — Portfolio',
		defaultDescription:
			'Direction artistique, photographie et illustration : une sélection de projets créatifs.',
	},
	footer: {
		message: 'Disponible pour des collaborations choisies.',
		contactLabel: 'Contact',
		navigationLabel: 'Navigation',
		socialsLabel: 'Réseaux',
		legal: 'Tous droits réservés.',
		decorativeImage: siteContent.footer.decorativeImage,
	},
	pages: {
		cv: {
			title: 'Curriculum vitæ',
			intro:
				'CV téléchargeable et consultable en ligne, présentant mon parcours professionnel et mes compétences.',
			openLabel: 'Ouvrir le CV',
			downloadLabel: 'Télécharger le CV',
			fallbackText:
				"Votre navigateur ne permet pas l’affichage intégré du CV. Ouvrez-le dans un nouvel onglet ou téléchargez-le.",
			mobileText:
				"Sur mobile, le CV reste disponible dans une vue dédiée ou en téléchargement.",
			portfolioLink: { label: 'Voir le portfolio', href: '/portfolio/' },
			contactLink: { label: 'Me contacter', href: '/contact/' },
		},
	},
} satisfies SiteConfig;
