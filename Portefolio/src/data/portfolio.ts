import siteContent from './site-content.json';

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
		...siteContent.portfolio.categories.photography,
	},
	{
		slug: 'illustration',
		...siteContent.portfolio.categories.illustration,
	},
	{
		slug: 'direction-artistique',
		...siteContent.portfolio.categories.artDirection,
	},
];

export const portfolioContent = {
	...siteContent.portfolio,
} as const;
