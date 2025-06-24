import './assets/scss/main.scss'
import { getIconPath } from './theme-utils.js'

document.addEventListener('DOMContentLoaded', () => {
	const days = document.querySelectorAll('.calendar__day')

	function clearIcons() {
		days.forEach((day) => {
			const span = day.querySelector('span')
			span.style.backgroundImage = ''
			span.style.backgroundSize = ''
			span.style.backgroundRepeat = ''
			span.style.backgroundPosition = ''
		})
	}

	function setRangeIcons() {
		clearIcons()
		let hasRange = false
		days.forEach((day) => {
			if (
				day.classList.contains('calendar__day--range-start') ||
				day.classList.contains('calendar__day--range-end')
			) {
				hasRange = true
			}
		})
		days.forEach((day) => {
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
	}

	function clearSelection() {
		days.forEach((day) => {
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

	// Присваиваем уникальный data-index
	days.forEach((day, index) => {
		day.dataset.index = index
	})

	let start = null
	let end = null

	days.forEach((day) => {
		day.addEventListener('click', () => {
			const dayIndex = getDayIndex(day)

			// Если нет начальной даты или обе даты выбраны — начать заново
			if (!start || (start && end)) {
				clearSelection()
				start = day
				end = null
				day.classList.add('calendar__day--selected')
				setRangeIcons()
			} else if (start && !end) {
				const startIndex = getDayIndex(start)
				if (day === start) return // клик по той же дате

				end = day
				clearSelection()
				// диапазон
				const [from, to] =
					startIndex < dayIndex
						? [startIndex, dayIndex]
						: [dayIndex, startIndex]

				days.forEach((d) => {
					const num = getDayIndex(d)
					if (num === from) d.classList.add('calendar__day--range-start')
					if (num === to) d.classList.add('calendar__day--range-end')
					if (num > from && num < to) d.classList.add('calendar__day--in-range')
				})
				setRangeIcons()
			}
		})
	})

	// Слушаем смену темы и обновляем иконки
	const observer = new MutationObserver(() => setRangeIcons())
	observer.observe(document.body, {
		attributes: true,
		attributeFilter: ['class'],
	})
})

// Весь JS теперь в src/js. Этот файл больше не используется и может быть удалён после обновления index.html и package.json (vite config).
