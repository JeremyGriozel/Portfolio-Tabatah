export interface NavigationItem {
	label: string;
	href: string;
	children?: NavigationItem[];
}

export const navigationItems: NavigationItem[] = [
	{ label: 'Qui suis-je ?', href: '/' },
	{ label: 'CV', href: '/cv/' },
	{
		label: 'Portfolio',
		href: '/portfolio/',
		children: [
			{ label: 'Photographie', href: '/portfolio/photographie/' },
			{ label: 'Illustration numérique', href: '/portfolio/illustration/' },
			{ label: 'Direction artistique', href: '/portfolio/direction-artistique/' },
		],
	},
	{ label: 'Contact', href: '/contact/' },
];
