export const projectCategoryValues = [
	'photographie',
	'illustration',
	'direction-artistique',
] as const;

export type ProjectCategorySlug = (typeof projectCategoryValues)[number];

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
	tags: GalleryTag[];
	primaryTag?: GalleryTag;
}

export interface GalleryTag {
	key: string;
	label: string;
}

export const isProjectCategorySlug = (value: string): value is ProjectCategorySlug =>
	projectCategoryValues.includes(value as ProjectCategorySlug);

export const normalizeGalleryTagKey = (value: string): string => value
	.normalize('NFKD')
	.replace(/\p{Mark}/gu, '')
	.toLocaleLowerCase('fr')
	.replace(/[’']/g, '-')
	.replace(/[^\p{Letter}\p{Number}]+/gu, '-')
	.replace(/^-+|-+$/g, '');

const normalizeGalleryTagLabel = (value: string): string => value.trim().replace(/\s+/g, ' ');

const normalizeGalleryTags = (values: readonly string[]): GalleryTag[] => {
	const tags = new Map<string, GalleryTag>();

	values.forEach((value) => {
		const label = normalizeGalleryTagLabel(value);
		const key = normalizeGalleryTagKey(label);
		if (key && !tags.has(key)) tags.set(key, { key, label });
	});

	return [...tags.values()];
};

export const getGalleryTags = (
	images: readonly Pick<NormalizedGalleryImage, 'tags'>[],
): GalleryTag[] => {
	const tags = new Map<string, GalleryTag>();
	images.forEach((image) => {
		image.tags.forEach((tag) => {
			if (!tags.has(tag.key)) tags.set(tag.key, tag);
		});
	});
	return [...tags.values()];
};

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

	const tags = normalizeGalleryTags(image.tags ?? []);
	const primaryTagKey = image.primaryTag ? normalizeGalleryTagKey(image.primaryTag) : '';
	const primaryTag = tags.find((tag) => tag.key === primaryTagKey) ?? tags[0];

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
