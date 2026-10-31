# TECHSTORE

Интернет-магазин электроники: каталог товаров с поиском, фильтрами и сортировкой, страница товара, корзина и избранное.

## Стек

- React + TypeScript (strict)
- Redux Toolkit (корзина, избранное, загрузка товаров через RTK Query)
- React Router
- CSS Modules
- Vite

## Запуск

```
npm install
npm run dev
```

Приложение откроется на `http://localhost:5173`. Больше ничего запускать не нужно.

Другие команды:

- `npm run build` — сборка проекта
- `npm run lint` — проверка кода линтером

## Источник данных

Товары берутся из локального файла `public/products.json`. Он собран из открытого API [DummyJSON](https://dummyjson.com/products) (категории: smartphones, laptops, tablets, mobile-accessories) скриптом `scripts/build-db.mjs`.

Чтобы обновить данные, нужен интернет:

```
node scripts/build-db.mjs
```

Скрипт перезаписывает `public/products.json` и `db.json`. Файл `db.json` нужен только для необязательного локального API на json-server (`npm run api`, адрес `http://localhost:3001/products`). Само приложение от него не зависит.

## Страницы

| Маршрут | Страница |
|---|---|
| `/` | Каталог: поиск, фильтр по категории, сортировка, сброс фильтров |
| `/product/:id` | Карточка товара |
| `/cart` | Корзина |
| `/favorites` | Избранное |
| `*` | 404 |

На каждой странице есть состояния загрузки, ошибки и пустого списка.

## Архитектурные решения

**Что хранится в Redux, и почему.** В Redux лежат только данные, которые нужны сразу нескольким частям приложения:

- `cartSlice` — товары в корзине и их количество. Корзина нужна Header (счётчик), странице товара (кнопка «в корзину») и странице корзины.
- `favoritesSlice` — id избранных товаров. Нужны Header (счётчик), карточке товара (сердце), странице товара и странице избранного. Хранятся только id, сами товары берутся из загруженного списка.
- `productsApi` (RTK Query) — загрузка товаров и состояния запроса (загрузка, ошибка).

**Вычисляемые значения не хранятся в Redux.** Количество товаров в корзине, итоговая сумма и количество избранного считаются селекторами из `items` и `ids`, поэтому не могут рассинхронизироваться с данными.

**Фильтры хранятся локально.** Поиск, категория и сортировка лежат в `useState` внутри `CatalogPage`, потому что они нужны только каталогу. Перенос в Redux добавил бы код без пользы.

**Сохранение.** Корзина и избранное записываются в `localStorage` в одном месте: подписка `store.subscribe` в `src/app/store.ts`. При старте слайсы читают сохранённые данные обратно, поэтому после перезагрузки страницы всё восстанавливается.

## Структура проекта

```
src/
  app/          store.ts, hooks.ts (типизированные useAppDispatch и useAppSelector)
  components/   Header, ProductCard, ProductGrid, Loader, EmptyState
  features/     cart, favorites, products
  pages/        CatalogPage, ProductPage, CartPage, FavoritesPage, NotFoundPage
  types/        product.ts
  utils/        storage.ts
public/         products.json
scripts/        build-db.mjs
```



