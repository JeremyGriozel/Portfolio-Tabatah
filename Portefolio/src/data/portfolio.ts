import siteContent from './site-content.json';
import {
	galleryTagOptions,
	projectCategoryValues,
	type ProjectCategorySlug,
} from '../lib/project-taxonomy';

export interface PortfolioCategory {
	slug: ProjectCategorySlug;
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

const categoryContent = {
	photographie: siteContent.portfolio.categories.photography,
	illustration: siteContent.portfolio.categories.illustration,
	'direction-artistique': siteContent.portfolio.categories.artDirection,
} satisfies Record<ProjectCategorySlug, { label: string; description: string }>;

export const portfolioCategories: PortfolioCategory[] = projectCategoryValues.map((slug) => ({
	slug,
	...categoryContent[slug],
}));

export const portfolioCategoryOptions = portfolioCategories.map(({ slug, label }) => ({
	value: slug,
	label,
}));

export { galleryTagOptions };

export const illustrationGalleryContent = {
	eyebrow: 'Illustrations',
	title: 'Explorer les illustrations',
	description: 'Découvrez les créations indépendamment de leurs projets et filtrez-les par type.',
	filtersLabel: 'Filtrer les illustrations',
	allLabel: 'Tous',
	emptyMessage: 'Aucune illustration ne correspond à ce filtre.',
} as const;

export type IllustrationGalleryContent = typeof illustrationGalleryContent;

export const portfolioContent = {
	...siteContent.portfolio,
} as const;
