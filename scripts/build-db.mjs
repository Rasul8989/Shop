import { writeFileSync } from 'node:fs'

const categories = ['smartphones', 'laptops', 'tablets', 'mobile-accessories']

const lists = await Promise.all(
    categories.map(async (category) => {
        const response = await fetch(
            `https://dummyjson.com/products/category/${category}?limit=0&select=id,title,description,price,category,rating,thumbnail`,
        )
        const data = await response.json()
        return data.products
    }),
)

const products = lists.flat()

writeFileSync('db.json', JSON.stringify({ products }, null, 2))
writeFileSync('public/products.json', JSON.stringify(products, null, 2))

console.log(`Saved ${products.length} products`)