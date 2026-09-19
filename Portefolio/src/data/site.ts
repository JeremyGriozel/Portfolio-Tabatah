import siteContent from './site-content.json';

export const themeOptions = [
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
	{ value: 'weirdcore', label: 'Weirdcore' },
	{ value: 'backrooms', label: 'Backrooms' },
	{ value: 'autumn-nostalgia', label: 'Autumn Nostalgia' },
	{ value: 'nostalgic-2000s', label: 'Nostalgic 2000s' },
	{ value: 'found-footage-crypticcore', label: 'Found Footage — Crypticcore' },
	{ value: 'retro-analog-horror', label: 'Retro Analog Horror' },
	{ value: 'pacific-northwest-35mm', label: 'Pacific Northwest — 35mm' },
	{ value: 'oceancore-washed-out', label: 'Oceancore' },
	{ value: '90s-indie-tumblr', label: '90s Indie Tumblr' },
	{ value: 'cybercore-neofuturism', label: 'Cybercore Neofuturism' },
	{ value: 'nautical-gothic', label: 'Nautical Gothic' },
] as const satisfies ReadonlyArray<{ value: string; label: string }>;

export type SiteTheme = (typeof themeOptions)[number]['value'];

export interface SiteConfig {
	theme: SiteTheme;
	name: string;
	metadata: {
		defaultTitle: string;
		defaultDescription: string;
		defaultImage: string;
		defaultImageAlt: string;
	};
	footer: {
		message: string;
		contactLabel: string;
		navigationLabel: string;
		socialsLabel: string;
		legal: string;
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
		defaultTitle: 'Tabatah Lux — Photographe indépendante',
		defaultDescription:
			'Portfolio de Tabatah Lux, photographe indépendante. Découvrez ses projets photographiques, son univers artistique et ses créations.',
		defaultImage: siteContent.home.carousel.images[0]?.src ?? siteContent.profileImage,
		defaultImageAlt: 'Portfolio photographique de Tabatah Lux',
	},
	footer: {
		message: 'Disponible pour des collaborations choisies.',
		contactLabel: 'Contact',
		navigationLabel: 'Navigation',
		socialsLabel: 'Réseaux',
		legal: 'Tous droits réservés.',
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
