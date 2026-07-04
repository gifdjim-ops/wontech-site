# Размещение WONTECH на GitHub и Vercel

## Что загружать на GitHub

Загружать нужно содержимое папки `wontech-b2b-shop`, не ZIP-архив.

В корне репозитория должны лежать:

- `index.html`
- `catalog.html`
- `contacts.html`
- `logistics.html`
- `specification.html`
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

В настройках проекта Vercel открыть `Settings -> Environment Variables` и добавить:

- `TELEGRAM_BOT_TOKEN` - новый токен бота из BotFather
- `TELEGRAM_CHAT_ID` - chat_id получателя заявок

Если `TELEGRAM_CHAT_ID` не указан, backend попробует взять его через `getUpdates`, но надежнее задать явно.

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
