import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { themeOptions, type SiteTheme } from './data/site';

const projectThemeValues = themeOptions.map(({ value }) => value) as [SiteTheme, ...SiteTheme[]];

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

const galleryImage = z.union([z.string(), legacyProjectImage]);

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		slug: z.string(),
		title: z.string(),
		category: z.string(),
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
		published: z.boolean().default(true),
	}),
});

export const collections = { projects };
