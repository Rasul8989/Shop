import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import type { CartItem, Product } from '../../types/product'
import { loadFromStorage, STORAGE_KEYS } from '../../utils/storage'

interface CartState {
    items: CartItem[]
}

const initialState: CartState = {
    items: loadFromStorage<CartItem[]>(STORAGE_KEYS.cart, []),
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Product>) {
            const existing = state.items.find((item) => item.product.id === action.payload.id)
            if (existing) {
                existing.quantity += 1
            } else {
                state.items.push({ product: action.payload, quantity: 1 })
            }
        },
        increaseQuantity(state, action: PayloadAction<number>) {
            const item = state.items.find((i) => i.product.id === action.payload)
            if (item) item.quantity += 1
        },
        decreaseQuantity(state, action: PayloadAction<number>) {
            const item = state.items.find((i) => i.product.id === action.payload)
            if (item && item.quantity > 1) item.quantity -= 1
        },
        removeFromCart(state, action: PayloadAction<number>) {
            state.items = state.items.filter((i) => i.product.id !== action.payload)
        },
    },
})

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } = cartSlice.actions
export default cartSlice.reducer

export const selectCartItems = (state: RootState) => state.cart.items

export const selectCartCount = (state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)

export const selectCartTotal = (state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)