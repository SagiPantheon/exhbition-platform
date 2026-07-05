# PROJECT PROTOCOL — IAI Exhibition Platform
> ЧИТАЙ ЭТОТ ФАЙЛ ПЕРВЫМ, ПЕРЕД ЛЮБОЙ РАБОТОЙ. Он описывает проект и железные правила работы.

## 1. О проекте
Внутренний инструмент Israel Aerospace Industries (IAI) для управления выставками: каталог ~49 макетов-экспонатов по 4 дивизиям, инвентарь, 3D-конфигуратор палаток, центр выставок, дневник завершения выставки.
Автор: Sagi Amiel (не программист — копирует готовые проверенные команды в обычный терминал Mac).

## 2. Как общаться с Sagi
- Язык общения: русский. Обращение: "брат", тёплый тон.
- Sagi копирует готовые команды — давай их проверенными, по одному шагу.
- Обсуждаем и документируем ДО кода.

## 3. Стек и репозиторий
- Next.js 16.1.6, TypeScript, Tailwind CSS
- GitHub: https://github.com/SagiPantheon/exhbition-platform, ветка space-safe-edit-flow
- Локальная папка: ~/Desktop/exhbition-platform2 (Mac, iMac-Sagi)
- Деплой: Vercel, адрес exhbition-platform.vercel.app (аккаунт sagipantheon)

## 4. ЖЕЛЕЗНЫЕ ПРАВИЛА (нарушение = поломка)
1. Установка ТОЛЬКО: npm install --legacy-peer-deps (конфликт 3D peer-deps).
2. НИКОГДА: npm audit fix --force (ломает 3D).
3. Правки через Python-heredoc (python3 << 'PYEOF'). Иврит кодировать через \uXXXX. НЕ использовать r''' с ивритом.
4. next-env.d.ts НИКОГДА не коммитить (git restore --staged next-env.d.ts).
5. Бэкап перед каждой правкой в _backups/.
6. Всегда npm run build перед push (должно быть 149/149 страниц, растёт при добавлении экспонатов).
7. UI: иврит + английский. Код: английский. Общение: русский.

## 5. Рабочий цикл
git pull -> [правка + бэкап] -> npm run build -> git add -A -> git restore --staged next-env.d.ts -> git commit -> git push
Если git pull ругается "bad object ... space-safe-edit-flow 2": rm ".git/refs/remotes/origin/space-safe-edit-flow 2"

## 6. Дивизии (4 бизнес-дивизии)
Данные в src/data/masterExhibits.ts содержат сырые коды division, маппятся на 4 дивизии (DIVISION_MAP в src/app/exhibitions/israel/page.tsx):
- matah (מטח): mtach, tilim, halal, malam, hagana
- elta (אלתא): elta, mkam, tamam, soi, robotika
- kataz (כטצ): kataz
- teufa (תעופה): teufa
Инвентарь: division "inventory" — исключается из каталога экспонатов.

## 7. Ключевые файлы
- src/data/masterExhibits.ts — ИСТОЧНИК ПРАВДЫ по экспонатам и инвентарю
- src/app/tents-layout/page.tsx — 3D-конфигуратор палаток (монолит ~3700 строк). Типы: 25x15 / 30x20 / open / hangar
- src/app/exhibitions/israel/page.tsx — центр выставок (каталог авто, фильтр по дивизиям, дневник, кнопка בוצע)
- src/components/common/AssetDetailClient.tsx — единый эталон детальных страниц
- src/components/exhibitions/ExecutionReportModal.tsx — дневник завершения выставки
- src/data/executionReport.ts — данные дневника (localStorage)
- public/models/air/ — 3D-модели (.glb), public/images/air/ — фото (.png)
- public/scenes/preset-tentScene_*.json — замороженные сцены палаток

## 8. Соглашения об именах
- Модель: /models/air/{slug}-showcase-3d.glb
- Фото: /images/air/{slug}-showcase.png (БЕЗ -3d)
- Детальная страница любого экспоната: /air/{slug}

## 9. 3D-модели: сжатие (обязательно для новых, часто 50-75МБ)
npx @gltf-transform/cli optimize [in].glb /tmp/[name]-test.glb --compress draco
(npx, НЕ -g из-за EACCES на Mac). Проверять на gltf-viewer.donmccurdy.com, потом cp поверх оригинала.

## 10. Данные и хранение
- Палатки, дневник, статусы выставок — в localStorage браузера (НЕ синхронизируется, НЕ уходит в git).
- Чтобы данные были везде — заморозить в файл (как preset-tentScene_*.json).
- Vercel serverless — файлы писать НЕЛЬЗЯ.

## 11. Vercel / безопасность
- Deployment Protection: оборонный инструмент, публично только после уточнения у IT/безопасности IAI.
- Install Command на Vercel: npm install --legacy-peer-deps.

## 12. Открытые задачи (TODO)
- Прикрепление файлов к выставкам (нужно внешнее хранилище).
- Сжатие новых 3D-моделей по мере добавления.
- /he/ двуязычный mirror — поддерживать, НЕ удалять.
