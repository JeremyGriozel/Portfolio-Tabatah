import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { themeOptions, type SiteTheme } from './data/site';
import {
	galleryTagOptions,
	projectCategoryValues,
	type GalleryTagSlug,
	type ProjectCategorySlug,
} from './lib/project-taxonomy';

const projectThemeValues = themeOptions.map(({ value }) => value) as [SiteTheme, ...SiteTheme[]];
const projectCategorySchemaValues = projectCategoryValues as [ProjectCategorySlug, ...ProjectCategorySlug[]];
const galleryTagSchemaValues = galleryTagOptions.map(({ value }) => value) as [GalleryTagSlug, ...GalleryTagSlug[]];

const legacyProjectImage = z.object({
	src: z.string(),
	alt: z.string().optional(),
	caption: z.string().optional(),
	aspect: z.enum(['auto', 'portrait', 'landscape', 'square', 'wide']).optional(),
	width: z.number().int().positive().optional(),
	height: z.number().int().positive().optional(),
});

const projectCover = legacyProjectImage.extend({
	alt: z.string().min(1),
});

const taggedGalleryImage = legacyProjectImage.extend({
	tags: z.array(z.enum(galleryTagSchemaValues)).default([]),
	primaryTag: z.union([z.enum(galleryTagSchemaValues), z.literal('')]).optional(),
});

const projectCategoryOrder = z.object({
	category: z.enum(projectCategorySchemaValues),
	order: z.number().int().nonnegative(),
});

const galleryImage = z.union([z.string(), taggedGalleryImage]);

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		slug: z.string(),
		title: z.string(),
		categories: z.array(z.enum(projectCategorySchemaValues)).default([]),
		categoryOrders: z.array(projectCategoryOrder).default([]),
		date: z.coerce.date(),
		defaultTheme: z.enum(projectThemeValues).optional(),
		shortDescription: z.string(),
		detailedDescription: z.string().optional(),
		cover: projectCover,
		gallery: z.array(galleryImage).default([]),
		tools: z.array(z.string()).default([]),
		tags: z.array(z.string()).default([]),
		featured: z.boolean().default(false),
		order: z.number().int().default(0),
		displayOrder: z.number().int().nonnegative().nullable().optional(),
		published: z.boolean().default(true),
	}),
});

export const collections = { projects };
