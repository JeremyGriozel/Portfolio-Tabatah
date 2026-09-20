export const projectCategoryValues = [
	'photographie',
	'illustration',
	'direction-artistique',
] as const;

export type ProjectCategorySlug = (typeof projectCategoryValues)[number];

export const galleryTagOptions = [
	{ value: 'personnages', label: 'Personnages' },
	{ value: 'cg', label: 'CG' },
	{ value: 'backgrounds', label: 'Backgrounds' },
	{ value: 'details', label: 'Détails' },
	{ value: 'logos', label: 'Logos' },
	{ value: 'illustrations-supplementaires', label: 'Illustrations supplémentaires' },
	{ value: 'mc', label: 'MC' },
] as const;

export type GalleryTagSlug = (typeof galleryTagOptions)[number]['value'];

interface ProjectCategoryData {
	categories?: readonly string[];
	categoryOrders?: readonly {
		category?: string | null;
		order?: number | null;
	}[];
}

interface GalleryImageData {
	src: string;
	alt?: string;
	tags?: readonly string[];
	primaryTag?: string | null;
}

export interface NormalizedGalleryImage {
	src: string;
	alt: string;
	tags: GalleryTagSlug[];
	primaryTag?: GalleryTagSlug;
}

export const isProjectCategorySlug = (value: string): value is ProjectCategorySlug =>
	projectCategoryValues.includes(value as ProjectCategorySlug);

export const isGalleryTagSlug = (value: string): value is GalleryTagSlug =>
	galleryTagOptions.some((tag) => tag.value === value);

export const getProjectCategorySlugs = (data: ProjectCategoryData): ProjectCategorySlug[] => {
	const categories = (data.categories ?? []).filter(isProjectCategorySlug);
	return [...new Set(categories)];
};

export const getProjectCategoryOrder = (
	data: ProjectCategoryData,
	category: ProjectCategorySlug,
): number | undefined => {
	if (!getProjectCategorySlugs(data).includes(category)) return undefined;

	const matchingOrder = data.categoryOrders?.find((entry) => entry.category === category)?.order;
	return typeof matchingOrder === 'number' && Number.isInteger(matchingOrder) && matchingOrder >= 0
		? matchingOrder
		: undefined;
};

export const normalizeGalleryImage = (
	image: string | GalleryImageData,
	projectTitle: string,
	index: number,
): NormalizedGalleryImage => {
	if (typeof image === 'string') {
		return {
			src: image,
			alt: `${projectTitle} — image ${index + 1}`,
			tags: [],
		};
	}

	const tags = [...new Set((image.tags ?? []).filter(isGalleryTagSlug))];
	const primaryTag = image.primaryTag && tags.includes(image.primaryTag as GalleryTagSlug)
		? image.primaryTag as GalleryTagSlug
		: tags[0];

	return {
		src: image.src,
		alt: image.alt?.trim() || `${projectTitle} — image ${index + 1}`,
		tags,
		primaryTag,
	};
};

interface DisplayOrderedProject {
	data: {
		displayOrder?: number | null;
		order?: number | null;
		title: string;
		slug: string;
		categories?: readonly string[];
		categoryOrders?: ProjectCategoryData['categoryOrders'];
	};
}

const compareProjectsByTitleAndSlug = (
	first: DisplayOrderedProject,
	second: DisplayOrderedProject,
) => first.data.title.localeCompare(second.data.title, 'fr', { sensitivity: 'base' })
	|| first.data.slug.localeCompare(second.data.slug, 'fr', { sensitivity: 'base' });

export const compareProjectsByDisplayOrder = (
	first: DisplayOrderedProject,
	second: DisplayOrderedProject,
) => {
	const firstOrder = first.data.displayOrder ?? Number.MAX_SAFE_INTEGER;
	const secondOrder = second.data.displayOrder ?? Number.MAX_SAFE_INTEGER;
	return firstOrder - secondOrder
		|| compareProjectsByTitleAndSlug(first, second);
};

export const compareProjectsByCategoryOrder = (
	first: DisplayOrderedProject,
	second: DisplayOrderedProject,
	category: ProjectCategorySlug,
) => {
	const firstCategoryOrder = getProjectCategoryOrder(first.data, category);
	const secondCategoryOrder = getProjectCategoryOrder(second.data, category);

	if (firstCategoryOrder !== undefined && secondCategoryOrder !== undefined) {
		return firstCategoryOrder - secondCategoryOrder
			|| compareProjectsByTitleAndSlug(first, second);
	}
	if (firstCategoryOrder !== undefined) return -1;
	if (secondCategoryOrder !== undefined) return 1;

	return (first.data.order ?? Number.MAX_SAFE_INTEGER) - (second.data.order ?? Number.MAX_SAFE_INTEGER)
		|| compareProjectsByTitleAndSlug(first, second);
};
