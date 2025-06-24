import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
	base: '/alpaca_calendar/',
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {},
		},
	},
	server: {
		host: '0.0.0.0',
		port: 5173,
		strictPort: true,
	},
})
