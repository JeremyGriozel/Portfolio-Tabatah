// @ts-check
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';

const cvConfig = JSON.parse(readFileSync(new URL('./src/data/cv.json', import.meta.url), 'utf8'));
const cvFileUrl = new URL(cvConfig.cv.replace(/^\//, ''), new URL('./public/', import.meta.url));
const cvRevision = createHash('sha256').update(readFileSync(cvFileUrl)).digest('hex').slice(0, 12);

// https://astro.build/config
export default defineConfig({
	site: 'https://tabatah-lux.fr',
	adapter: cloudflare({ imageService: 'compile' }),
	integrations: [
		react(),
		keystatic(),
		sitemap({
			filter: (page) => {
				const pathname = new URL(page).pathname;
				return !pathname.startsWith('/keystatic') && !pathname.startsWith('/api/');
			},
		}),
	],
	vite: {
		define: {
			__CV_REVISION__: JSON.stringify(cvRevision),
		},
	},
});
