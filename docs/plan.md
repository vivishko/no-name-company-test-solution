1. Написать cron-job сервис, который в фоновом режиме сохраняет в Postgres информацию о транзакциях во всех блоках начиная с 17583000 (в режиме реального времени, частота - раз в минуту).
---

крон дёргает эндпоинт
эндпоинт:
1) запрашивает eth_getBlockByNumber
2) 

---
2. Написать API-сервис с эндпоинтом, который выдаст адрес, баланс которого изменился больше остальных (по абсолютной величине) за последние 100 блоков.
---

эндпоинт с перерассчётом адресов на последние 100 блоков:
1) берёт n транзакций за последние 100 блоков
2) выписывает из каждой из них адреса кошельков - from и to - в мапу
3) проходиться снова по транзакциям, записывая сопоставление + и - к каждому кошельку