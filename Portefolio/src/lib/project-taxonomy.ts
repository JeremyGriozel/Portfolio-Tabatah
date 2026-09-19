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
] as const;

export type GalleryTagSlug = (typeof galleryTagOptions)[number]['value'];

interface ProjectCategoryData {
	categories?: readonly string[];
	category?: string | null;
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
	if (categories.length === 0 && data.category && isProjectCategorySlug(data.category)) {
		categories.push(data.category);
	}

	return [...new Set(categories)];
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
		title: string;
		slug: string;
	};
}

export const compareProjectsByDisplayOrder = (
	first: DisplayOrderedProject,
	second: DisplayOrderedProject,
) => {
	const firstOrder = first.data.displayOrder ?? Number.MAX_SAFE_INTEGER;
	const secondOrder = second.data.displayOrder ?? Number.MAX_SAFE_INTEGER;
	return firstOrder - secondOrder
		|| first.data.title.localeCompare(second.data.title, 'fr', { sensitivity: 'base' })
		|| first.data.slug.localeCompare(second.data.slug, 'fr', { sensitivity: 'base' });
};
