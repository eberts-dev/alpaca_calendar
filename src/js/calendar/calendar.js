// выбор дат, диапазон, иконки
import { getIconPath } from '../calendar/calendar-theme.js'

export function initCalendar() {
	const days = document.querySelectorAll('.calendar__day')
	const daysArr = Array.from(days)
	const daysContainer = document.querySelector('.calendar__days')

	function clearIcons() {
		daysArr.forEach((day) => {
			const span = day.querySelector('span')
			span.style.backgroundImage = ''
		})
	}

	function setRangeIcons() {
		clearIcons()
		let hasRange = false
		daysArr.some((day) => {
			if (
				day.classList.contains('calendar__day--range-start') ||
				day.classList.contains('calendar__day--range-end')
			) {
				hasRange = true
				return true
			}
			return false
		})
		daysArr.forEach((day) => {
			const span = day.querySelector('span')
			if (hasRange) {
				if (day.classList.contains('calendar__day--range-start')) {
					span.style.backgroundImage = `url('${getIconPath('start')}')`
				} else if (day.classList.contains('calendar__day--range-end')) {
					span.style.backgroundImage = `url('${getIconPath('end')}')`
				}
			} else if (day.classList.contains('calendar__day--selected')) {
				span.style.backgroundImage = `url('${getIconPath('single')}')`
			}
		})
		// SVG-заливка диапазона
		daysArr.forEach((day) => {
			const span = day.querySelector('span')
			if (
				day.classList.contains('calendar__day--in-range') &&
				!day.classList.contains('calendar__day--range-start') &&
				!day.classList.contains('calendar__day--range-end')
			) {
				const theme = document.body.classList.contains('dark')
					? 'dark'
					: 'ligth'
				span.classList.add('calendar__range-svg')
			} else {
				span.style.removeProperty('--range-svg')
				span.classList.remove('calendar__range-svg')
			}
		})
	}

	function clearSelection() {
		daysArr.forEach((day) => {
			day.classList.remove(
				'calendar__day--selected',
				'calendar__day--in-range',
				'calendar__day--range-start',
				'calendar__day--range-end'
			)
		})
	}

	function getDayIndex(dayElem) {
		return parseInt(dayElem.dataset.index, 10)
	}

	daysArr.forEach((day, index) => {
		day.dataset.index = index
	})

	let start = null
	let end = null

	// Делегирование событий для кликов по дням
	daysContainer.addEventListener('click', (e) => {
		const day = e.target.closest('.calendar__day')
		if (!day) return
		const dayIndex = getDayIndex(day)

		if (!start || (start && end)) {
			clearSelection()
			start = day
			end = null
			day.classList.add('calendar__day--selected')
			setRangeIcons()
		} else if (start && !end) {
			const startIndex = getDayIndex(start)
			if (day === start) return

			end = day
			clearSelection()
			const [from, to] =
				startIndex < dayIndex ? [startIndex, dayIndex] : [dayIndex, startIndex]

			daysArr.forEach((d) => {
				const num = getDayIndex(d)
				if (num === from) d.classList.add('calendar__day--range-start')
				if (num === to) d.classList.add('calendar__day--range-end')
				if (num > from && num < to) d.classList.add('calendar__day--in-range')
			})
			setRangeIcons()
		}
	})

	const observer = new MutationObserver(() => setRangeIcons())
	observer.observe(document.body, {
		attributes: true,
		attributeFilter: ['class'],
	})
}
