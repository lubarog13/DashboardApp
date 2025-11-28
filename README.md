# Dashboard

Vue 3 приложение для управления и просмотра документов с поиском и фильтрацией.

## Страница приложения

[GitHub Pages](https://lubarog13.github.io/DashboardApp/)

## Описание

Dashboard - это веб-приложение, которое позволяет пользователям искать, просматривать, скачивать и удалять документы через удобный интерфейс.

## Функциональность

### Экран "Dashboard"

#### Поиск документов

- В поле поиска реализован запрос к API для получения документов
- Поиск выполняется в реальном времени при вводе текста
- Поддерживается фильтрация документов по поисковому запросу

#### Обработка ошибок

- При ошибке запроса (неверные параметры или ошибка сервера) отображается сообщение об ошибке пользователю
- Ошибки отображаются в интерфейсе с соответствующим стилем

#### Отображение документов

- После успешного выполнения запроса документы отображаются в списке слева
- Каждый документ показывает основную информацию

#### Просмотр документа

- При нажатии на документ в списке он открывается справа для просмотра детальной информации
- Отображается изображение документа (если есть), название и описание

#### Скачивание документа

- Кнопка "Скачать" создает `.txt` файл с содержимым текста документа
- Файл содержит название и описание документа

#### Удаление документа

- Кнопка "Удалить" активна только если у документа есть изображение
- При отсутствии изображения кнопка находится в состоянии `disabled`
- Удаление происходит на стороне клиента (документ удаляется из списка)

## API Документация

### Базовый URL

```
https://test-app-csm.up.railway.app
```

### Получение списка документов

**Endpoint:** `/user/docs`

**Method:** `GET`

**Параметры запроса:**

- `search` (опционально) - строка поиска для фильтрации документов

**Пример запроса:**

```
GET https://test-app-csm.up.railway.app/user/docs?search=Док
```

**Пример запроса без фильтра:**

```
GET https://test-app-csm.up.railway.app/user/docs
```

**Ответ:**
Массив объектов `Document`:

```typescript
interface Document {
  id: string
  name: string
  description: string | null
  image: string | null
}
```

## Технологии

- **Vue 3** - фреймворк для создания пользовательского интерфейса
- **TypeScript** - типизированный JavaScript
- **Pinia** - управление состоянием
- **Vite** - инструмент сборки
- **Axios** - HTTP клиент для запросов к API
- **Docker** - контейнеризация приложения

## Рекомендуемая настройка IDE

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (отключите Vetur).BASE_URL="/"
VITE_BACKEND_URL="https://test-app-csm.up.railway.app"

## Рекомендуемая настройка браузера

- Chromium-браузеры (Chrome, Edge, Brave и т.д.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Включите Custom Object Formatter в Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Включите Custom Object Formatter в Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Поддержка типов для `.vue` импортов в TypeScript

TypeScript не может обрабатывать информацию о типах для `.vue` импортов по умолчанию, поэтому мы заменяем CLI `tsc` на `vue-tsc` для проверки типов. В редакторах нам нужен [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar), чтобы служба языка TypeScript знала о типах `.vue`.

## Настройка проекта

Для настройки проекта необходимо установить переменные окружения в файле `.env`:

- `BASE_URL` - URL приложения
- `VITE_BACKEND_URL` - URL API

### Установка зависимостей

```sh
yarn
```

### Разработка с горячей перезагрузкой

```sh
yarn dev
```

### Проверка типов, компиляция и минификация для продакшена

```sh
yarn build
```

### Линтинг с [ESLint](https://eslint.org/)

```sh
yarn lint
```

## Настройка конфигурации

См. [Vite Configuration Reference](https://vite.dev/config/).

## Docker

### Сборка образа

```sh
docker-compose build dashboard
```

### Запуск контейнера

```sh
docker-compose up -d dashboard
```
