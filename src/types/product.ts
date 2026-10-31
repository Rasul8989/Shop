export interface Product {
    id: number
    title: string
    description: string
    price: number
    category: string
    rating: number
    thumbnail: string
}

export type SortOrder = 'default' | 'price-asc' | 'price-desc' | 'rating-desc'

export interface CartItem {
    product: Product
    quantity: number
}