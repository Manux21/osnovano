# Основано

Сайт архитектурного бюро. Nuxt 4, Vue 3, TypeScript, TSX.

```bash
npm install
npm run dev
```

Сборка: `npm run build`. Просмотр production-сборки: `npm run preview`.

## Публикация

Сайт: http://147.45.245.107. Пуш в `main` запускает workflow
`.github/workflows/deploy.yml`; его также можно запустить вручную в GitHub Actions.
Требуется Node.js 22 или новее.

GitHub Actions выполняет `npm ci` и `npm run build`, отправляет `.output` по SSH,
переключает текущую сборку и проверяет `/api/health`. Ошибка сборки не меняет сайт.
Если новая версия не запускается, деплой возвращает предыдущую. Сохраняются пять
последних сборок. Повторный запуск workflow создаёт отдельную сборку.

Настройки репозитория в GitHub:

- Actions variables: `DEPLOY_HOST` (адрес сервера), `DEPLOY_USER` (`osnovano-deploy`).
- Actions secrets: `DEPLOY_SSH_KEY` (отдельный приватный ключ деплоя),
  `DEPLOY_KNOWN_HOSTS` (проверенная запись ключа SSH сервера).

На сервере работают Nginx и systemd-служба `osnovano`. Node.js слушает только
`127.0.0.1:3000`; Nginx принимает HTTP на порту 80. Сборки находятся в
`/srv/osnovano/releases`, текущая версия — ссылка `/srv/osnovano/current`.
Пользователь `osnovano-deploy` может обновлять сборки и перезапускать только эту
службу. Само приложение работает от пользователя `osnovano` без права менять код.

Заявки формы хранятся в `/var/lib/osnovano/.data/inquiries` и не удаляются при
деплое. Этот каталог нужно включать в резервные копии. Обработчик сохраняет заявки
на диск; отправка в почту или Telegram пока не подключена.

Конфигурация сервера находится в `ops/`: `provision.sh` устанавливает пользователей
и конфигурацию (запуск от root после установки `nodejs`, `nginx`, `rsync`, `curl`,
`sudo` и размещения публичного ключа деплоя рядом как `deploy-key.pub`).
`deploy.sh` загружает сборку, а `activate.sh` устанавливается на сервер как
`/usr/local/bin/osnovano-activate`. Приватные ключи в репозиторий не добавляются.

При подключении домена нужно настроить DNS, HTTPS и `NUXT_PUBLIC_SITE_URL` в
`/etc/osnovano.env`, затем выполнить `systemctl restart osnovano` от root.

Проверка службы: `systemctl status osnovano`; журнал: `journalctl -u osnovano`.
