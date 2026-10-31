import { useMemo, useState } from 'react'
import { useGetProductsQuery } from '../../features/products/productsApi'
import EmptyState from '../../components/EmptyState/EmptyState'
import Loader from '../../components/Loader/Loader'
import ProductGrid from '../../components/ProductGrid/ProductGrid'
import type { SortOrder } from '../../types/product'
import styles from './CatalogPage.module.css'

function CatalogPage() {
    const { data, isLoading, isError } = useGetProductsQuery()

    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('all')
    const [sort, setSort] = useState<SortOrder>('default')

    const categories = useMemo(() => {
        if (!data) return []
        return Array.from(new Set(data.map((product) => product.category)))
    }, [data])

    const visibleProducts = useMemo(() => {
        if (!data) return []

        const result = data.filter(
            (product) =>
                product.title.toLowerCase().includes(search.toLowerCase()) &&
                (category === 'all' || product.category === category),
        )

        if (sort === 'price-asc') result.sort((a, b) => a.price - b.price)
        if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
        if (sort === 'rating-desc') result.sort((a, b) => b.rating - a.rating)

        return result
    }, [data, search, category, sort])

    function handleReset() {
        setSearch('')
        setCategory('all')
        setSort('default')
    }

    if (isLoading) return <Loader />
    if (isError) return <EmptyState message="Failed to load products" />
    if (!data || data.length === 0) return <EmptyState message="No products found" />

    return (
        <div className={styles.page}>
            <div className={styles.filters}>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by title..."
                    className={styles.control}
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={styles.control}
                >
                    <option value="all">All categories</option>
                    {categories.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortOrder)}
                    className={styles.control}
                >
                    <option value="default">Default order</option>
                    <option value="price-asc">Price: low to high</option>
                    <option value="price-desc">Price: high to low</option>
                    <option value="rating-desc">Rating: high to low</option>
                </select>

                <button onClick={handleReset} className={styles.control}>
                    Reset filters
                </button>
            </div>

            {visibleProducts.length === 0 ? (
                <div className={styles.message}>
                    <p>Nothing matches your filters</p>
                    <button onClick={handleReset} className={styles.control}>
                        Reset filters
                    </button>
                </div>
            ) : (
                <ProductGrid products={visibleProducts} />
            )}
        </div>
    )
}

export default CatalogPage