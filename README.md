<p align="center">
  Тестовое в <<ноу-нейм-компанию>>
</p>

## Задание

1. Написать cron-job сервис, который в фоновом режиме сохраняет в Postgres информацию о транзакциях во всех блоках начиная с 17583000 (в режиме реального времени, частота - раз в минуту).
2. Написать API-сервис с эндпоинтом, который выдаст адрес, баланс которого изменился больше остальных (по абсолютной величине) за последние 100 блоков.

Полное описание [в папке docs в файле description.md](https://github.com/vivishko/no-name-company-test-solution/blob/main/docs/description.md).

## Tech stack

#### Backend: Node.js + Typescript + Nest.js + TypeORM

#### Batabases and other tools: Postgres и миграции для инициализации БД

## Решение

0. Уточнить некорректности в задании: формально начальный номер блока - последний блок на начало работы сервиса

1. Создать сервис SaveBlocksService с cron (основная его логика описана в /docs/plan.md), также создать TransactionService, который будет обрабатывать транзакции

2.

## Инструкция по использованию

1. Склонировать репо

По ssh

```bash
$ git clone git@github.com:vivishko/no-name-company-test-solution.git
```

По https

```bash
$ git clone https://github.com/vivishko/no-name-company-test-solution.git
```

2. Установить зависимости

```bash
$ npm install
```

3. Настроить окружение: создать файл .env в корне проекта, скопировать туда содержание .example.env и изменить значения переменных на существующие

4. Произвести миграцию

```bash
$ npm run migration:run
```

5. Запустить проект

```bash
$ npm run start
```

Результат:

1) задание с cron - его реализация в логах
  
2) для запроса на наиболее изменившийся адрес необходимо с помощью Postman (или подобных тулзов) отправлять GET запрос на http://localhost:3000/address

## TODO
