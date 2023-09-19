1. Написать cron-job сервис, который в фоновом режиме сохраняет в Postgres информацию о транзакциях во всех блоках начиная с 17583000 (в режиме реального времени, частота - раз в минуту).

---

крон:

1. проверить номер последнего блока в бд
2. запросить номер последнего блока в сети сейчас
3. с интервалом в 200мс (согласно рейтлимиту в 5 запросов в сек) запускать функцию запроса и записи в бд
4. выполнить запрос на инфо о блоке по таймауту

---

черновик

// решение номер 1
// вычислить разницу в количестве блоков
// const diff = lastBlockInDec - lastDbBlockInDec;
// выполнить рассчёт таймаутов между запросами согласно рейтлимиту
// выполнить запрос на инфо о блоке по таймауту
// for (let i = 0; i < diff; i++) {
// const timeoutMs = i < 5 ? 250 : 200;
// setTimeout(async () => {
// const blockNum = lastBlockInDec + i;
// const blockTrxs =
// await this.transactionService.getNewTrxsByBlockNumber(
// blockNum.toString(16),
// );
// console.log('blockTrxs = \n', blockTrxs);
// const insertedIds =
// await this.transactionService.insertTrxs(blockTrxs);
// console.log(
// 'insertedIdsCount = ',
// insertedIds.length,
// '\ninsertedIds = \n',
// insertedIds,
// );
// }, timeoutMs);
// }

// решение номер 2
// async function hui(id) {
// try{
// const res = await fetch(id);
// <!-- setTimeout(() => hui(id++), 200); -->
// } catch (err) {
// }
// }
// function chlen() {
// const arr = [1,2,3,4,5];
// const timerId = setInterval(() => {
// if(arr.length < 1) {
// clearInterval(timerId)
// } else {
// hui(arr.shift())
// }
// }, 1000)
// }

---

2. Написать API-сервис с эндпоинтом, который выдаст адрес, баланс которого изменился больше остальных (по абсолютной величине) за последние 100 блоков.

---

эндпоинт с перерассчётом адресов на последние 100 блоков:

- согласно рейтлимиту (бесплатно 5 запросов в сек) - эндпоинт по времени займёт минимум 21 сек

1. запросить инфу о последних 100 блоках
2. вычленить из них n транзакций
3. выписать из каждой из них адреса кошельков - from и to - в мапу:
   если кошелёк в from - минусовать число, если в to - плюсовать
