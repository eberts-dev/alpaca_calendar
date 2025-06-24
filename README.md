# alpaca_calendar

Адаптивный календарь с диапазоном выбора дат, поддержкой светлой/тёмной темы и pixel-perfect сеткой

## Структура проекта

```
├── public/                # иконки, изображения
├── src/
│   ├── assets/
│   │   ├── scss/          # SCSS-стили
│   │   └── icons/         # SVG-иконки
│   └── js/
│       ├── calendar/      # Логика календаря и темной темы
│       │   ├── calendar.js
│       │   └── calendar-theme.js
│       └── index.js       # Точка входа
├── index.html             # Главная страница
├── vite.config.js         # конфиг
└── package.json           # зависимости
```

## Возможности

- Выбор одной даты или диапазона
- Цветовая заливка диапазона, SVG-иконки для крайних точек
- Поддержка светлой/тёмной темы (автоматическое обновление иконок)
- Pixel-perfect сетка, aspect-ratio 1/1, адаптивность 240–560px
- Hover-эффекты только на десктопах

## Деплой

1. Установить зависимости: `npm install`
2. Собрать проект: `npm run build`
3. Задеплоить: `npm run deploy`

GitHub Pages: https://eberts-dev.github.io/alpaca_calendar/
