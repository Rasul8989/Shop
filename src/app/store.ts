import { configureStore } from '@reduxjs/toolkit'
import { productsApi } from '../features/products/productsApi'
import cartReducer from '../features/cart/cartSlice'
import favoritesReducer from '../features/favorites/favoritesSlice'
import { saveToStorage, STORAGE_KEYS } from '../utils/storage'

export const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        cart: cartReducer,
        favorites: favoritesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware),
})

store.subscribe(() => {
    const state = store.getState()
    saveToStorage(STORAGE_KEYS.cart, state.cart.items)
    saveToStorage(STORAGE_KEYS.favorites, state.favorites.ids)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch