# Основано

Статический сайт архитектурного бюро. Nuxt 4, Vue 3, TypeScript, TSX.
Требуется Node.js 22 или новее.

```bash
npm ci
npm run dev
```

## Публикация

Сайт: https://manux21.github.io/osnovano/.

Пуш в `main` запускает `.github/workflows/deploy.yml`: GitHub Actions собирает
статические страницы командой `npm run generate` и публикует `.output/public`
на GitHub Pages. Workflow также можно запустить вручную в разделе Actions.

В настройках репозитория **Settings → Pages → Build and deployment → Source**
нужно выбрать **GitHub Actions**. Отдельный сервер и SSH-ключи не требуются.

Workflow задаёт `NUXT_APP_BASE_URL=/osnovano/`, чтобы ссылки, картинки, видео
и иконки работали в подкаталоге репозитория. `NUXT_PUBLIC_SITE_URL` задаёт
полный адрес сайта для canonical и Open Graph.

Локальная сборка с такими же параметрами:

```bash
NUXT_APP_BASE_URL=/osnovano/ NUXT_PUBLIC_SITE_URL=https://manux21.github.io/osnovano npm run generate
```

Готовый сайт находится в `.output/public`. Все страницы проектов создаются
во время сборки и открываются напрямую без серверного приложения.

Форма сохранена для демонстрации верстки и проверки полей. Данные никуда
не отправляются; после заполнения показывается сообщение об этом.

Каталог `ops/` содержит прежние настройки серверного деплоя и не используется
при публикации на GitHub Pages.
