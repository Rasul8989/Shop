export const STORAGE_KEYS = {
    cart: 'shop-cart',
    favorites: 'shop-favorites',
} as const

export function loadFromStorage<T>(key: string, fallback: T): T {
    try {
        const raw = localStorage.getItem(key)
        return raw ? (JSON.parse(raw) as T) : fallback
    } catch {
        return fallback
    }
}

export function saveToStorage<T>(key: string, value: T): void {
    try {
        localStorage.setItem(key, JSON.stringify(value))
    } catch {
        // storage may be full or blocked, the app keeps working without saving
    }
}