<p align="center">
  Тестовое в <<ноу-нейм-компанию>>
</p>

## Задание

1. Написать cron-job сервис, который в фоновом режиме сохраняет в Postgres информацию о транзакциях во всех блоках начиная с 17583000 (в режиме реального времени, частота - раз в минуту).
2. Написать API-сервис с эндпоинтом, который выдаст адрес, баланс которого изменился больше остальных (по абсолютной величине) за последние 100 блоков.

## Tech stack

#### Backend: Node.js + Typescript + Nest.js + TypeORM

#### Batabases and other tools: Postgres и миграции для инициализации БД

## Решение

```bash
$ npm install
```

## Инструкция по использованию

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
