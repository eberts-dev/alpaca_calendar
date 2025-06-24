// логика темы и иконок
export function getTheme() {
	return document.body.classList.contains('dark') ? 'dark' : 'light'
}

export function getIconPath(type) {
	const theme = getTheme()
	const themeFolder = theme === 'light' ? 'ligth' : 'dark'
	if (type === 'start') return `ui/${themeFolder}/num_active-start.svg`
	if (type === 'end') return `ui/${themeFolder}/num_active-end.svg`
	return `ui/${themeFolder}/num_active.svg`
}

export function setTheme(theme) {
	document.body.classList.remove('light', 'dark')
	document.body.classList.add(theme)
	localStorage.setItem('theme', theme)

	const icon = document.getElementById('theme-icon')
	if (!icon) return
	if (theme === 'light') {
		icon.innerHTML = `
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 3v1m0 16v1m-8-9H3m3.314-5.686L5.5 5.5m12.186.814L18.5 5.5M6.314 17.69l-.814.81m12.186-.81.814.81M21 12h-1m-4 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
				/>
			</svg>
		`
	} else {
		icon.innerHTML = `
			<path d="M21 12.79A9 9 0 0 1 11.21 3a7 7 0 1 0 9.79 9.79z" fill="currentColor"/>>
		`
	}
}

export function initThemeToggle() {
	const themeToggle = document.getElementById('theme-toggle')
	if (!themeToggle) return
	const savedTheme = localStorage.getItem('theme') || 'dark'
	setTheme(savedTheme)

	themeToggle.addEventListener('click', () => {
		const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark'
		setTheme(newTheme)
	})
}
