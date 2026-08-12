// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
	adapter: cloudflare({ imageService: 'compile' }),
	integrations: [react(), keystatic()],
});
