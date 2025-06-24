// index.js — точка входа для календаря и темы
import '../assets/scss/main.scss'
import { initThemeToggle } from './calendar/calendar-theme.js'
import { initCalendar } from './calendar/calendar.js'

document.addEventListener('DOMContentLoaded', () => {
	initThemeToggle()
	initCalendar()
})
