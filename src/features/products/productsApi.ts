import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Product } from '../../types/product'

const PRODUCTS_URL = '/products.json'

async function loadProducts(): Promise<Product[]> {
    const response = await fetch(PRODUCTS_URL)
    if (!response.ok) {
        throw new Error(`Request to ${PRODUCTS_URL} failed with status ${response.status}`)
    }
    return (await response.json()) as Product[]
}

function getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : 'Unknown error'
}

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fakeBaseQuery<string>(),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            async queryFn() {
                try {
                    return { data: await loadProducts() }
                } catch (error) {
                    return { error: getErrorMessage(error) }
                }
            },
        }),
        getProductById: builder.query<Product, number>({
            async queryFn(id) {
                try {
                    const products = await loadProducts()
                    const product = products.find((item) => item.id === id)
                    if (!product) return { error: 'Product not found' }
                    return { data: product }
                } catch (error) {
                    return { error: getErrorMessage(error) }
                }
            },
        }),
    }),
})

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi