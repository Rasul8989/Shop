import { useAppSelector } from '../../app/hooks'
import EmptyState from '../../components/EmptyState/EmptyState'
import Loader from '../../components/Loader/Loader'
import ProductGrid from '../../components/ProductGrid/ProductGrid'
import { selectFavoriteIds } from '../../features/favorites/favoritesSlice'
import { useGetProductsQuery } from '../../features/products/productsApi'
import styles from './FavoritesPage.module.css'

function FavoritesPage() {
    const { data, isLoading, isError } = useGetProductsQuery()
    const favoriteIds = useAppSelector(selectFavoriteIds)

    if (isLoading) return <Loader />
    if (isError) return <EmptyState message="Failed to load products" />

    const favorites = (data ?? []).filter((product) => favoriteIds.includes(product.id))

    if (favorites.length === 0) {
        return <EmptyState message="No favorites yet" actionLabel="Go to catalog" actionTo="/" />
    }

    return (
        <div className={styles.page}>
            <h1>Favorites</h1>
            <ProductGrid products={favorites} />
        </div>
    )
}

export default FavoritesPage