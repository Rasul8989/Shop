import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { loadFromStorage, STORAGE_KEYS } from '../../utils/storage'

interface FavoritesState {
    ids: number[]
}

const initialState: FavoritesState = {
    ids: loadFromStorage<number[]>(STORAGE_KEYS.favorites, []),
}

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite(state, action: PayloadAction<number>) {
            if (state.ids.includes(action.payload)) {
                state.ids = state.ids.filter((id) => id !== action.payload)
            } else {
                state.ids.push(action.payload)
            }
        },
    },
})

export const { toggleFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer

export const selectFavoriteIds = (state: RootState) => state.favorites.ids
export const selectFavoritesCount = (state: RootState) => state.favorites.ids.length