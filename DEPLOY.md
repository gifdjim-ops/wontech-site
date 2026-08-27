# Размещение Бето Инкам на GitHub и Vercel

## Что загружать на GitHub

Загружать нужно содержимое папки `wontech-site-github-ready`, не ZIP-архив.

В корне репозитория должны лежать:

- `index.html`
- `catalog.html`
- `availability.html`
- `contacts.html`
- `logistics.html`
- `specification.html`
- `documents.html`
- `articles/`
- `products/`
- `assets/`
- `api/`
- `lib/`

Файл `telegram.local.json` загружать нельзя.

## Настройка Vercel

Для проекта на Vercel:

- Framework Preset: `Other`
- Root Directory: оставить пустым, если `index.html` лежит в корне репозитория
- Build Command: пусто
- Output Directory: пусто

## Переменные окружения Vercel

В настройках проекта Vercel нужны:

- `TELEGRAM_BOT_TOKEN` - токен бота из BotFather
- `TELEGRAM_CHAT_IDS` - chat_id получателей заявок через запятую или пробел

Если `TELEGRAM_CHAT_IDS` не указан, серверный обработчик попробует взять получателей через `getUpdates`, но надежнее задать явно.

После изменения переменных окружения нужно сделать redeploy.

## Проверка после деплоя

Открыть:

```text
https://ваш-домен.vercel.app/api/status
```

Если все настроено, должно быть:

```json
{"telegramConfigured":true,"telegramReady":true}
```

Потом отправить тестовую заявку через форму сайта.
