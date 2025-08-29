# RSS Агрегатор
[![Actions Status](https://github.com/wispard1/frontend-project-11/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/wispard1/frontend-project-11/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=wispard1_frontend-project-11&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=wispard1_frontend-project-11)

## О проекте

**RSS Агрегатор** — веб-приложение, которое позволяет:
- Добавлять RSS-ленты по ссылке
- Просматривать список постов и фидов
- Следить за обновлениями в реальном времени
- Просматривать содержимое поста в модальном окне

🔗 **Деплой проекта:**  
[https://frontend-project-11-beryl-five.vercel.app/]

## Функциональность

- ✅ Валидация введённой ссылки
- ✅ Проверка на дублирование RSS
- ✅ Автоматическое обновление постов каждые 5 секунд
- ✅ Парсинг RSS через прокси (allorigins)
- ✅ Интернационализация (i18next) — поддержка русского языка
- ✅ Отображение ошибок и успеха действий
- ✅ Чистый UI с Bootstrap

## Установка и запуск проекта

Чтобы запустить проект локально, выполните:

```bash
git clone https://github.com/wispard1/frontend-project-11.git
cd frontend-project-11

npm install
npm start