import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			srcDir: './src',
			mode: 'production',
			strategies: 'injectManifest',
			filename: 'prompt-sw.ts',
			scope: '/',
			base: '/',
			manifest: {
				short_name: 'Carigro',
				name: 'Carigro',
				start_url: '/',
				scope: '/',
				display: 'standalone',
				theme_color: '#869e0e',
				background_color: '#ffffff',
				icons: [
					{
						src: '/pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: '/pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			},
			injectManifest: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
			},
			devOptions: {
				enabled: true,
				type: 'module',
				navigateFallback: '/'
			},
			// if you have shared info in svelte config file put in a separate module and use it also here
			kit: {}
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
};

export default config;
