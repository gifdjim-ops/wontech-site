# WONTECH B2B catalog

Многостраничный сайт-каталог бурового инструмента WONTECH.

## Структура

- `index.html` - главная страница.
- `catalog.html` - общий каталог.
- `category-*.html` - страницы категорий.
- `products/*.html` - карточки позиций.
- `articles/*.html` - большие статьи на отдельных страницах.
- `logistics.html` - Яндекс.Карта и поставки.
- `specification.html` - отправка спецификации.
- `contacts.html` - контакт для расчета.
- `gallery.html` - фотографии.

## Запуск

```powershell
cd "C:\Users\Ivego\OneDrive\Документы\New project 2\wontech-b2b-shop"
.\start-site.ps1
```

После запуска открыть:

```text
http://127.0.0.1:8787
```

## Telegram

Форма отправляет заявки через backend `/api/request`.

Токен нельзя хранить в HTML, CSS или JS. Для локальной настройки используется `telegram.local.json`.

1. Создать новый токен в BotFather.
2. Вставить его в `telegram.local.json`.
3. Написать любое сообщение боту от нужного Telegram-аккаунта.
4. Перезапустить сайт.

`telegram.local.json` не нужно публиковать и отправлять клиентам.

## Сборка

Страницы генерируются из `build-site.js`:

```powershell
node .\build-site.js
```

После изменения данных каталога или статей нужно пересобрать сайт.
