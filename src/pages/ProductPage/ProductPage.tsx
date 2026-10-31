import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import EmptyState from '../../components/EmptyState/EmptyState'
import Loader from '../../components/Loader/Loader'
import { addToCart } from '../../features/cart/cartSlice'
import { selectFavoriteIds, toggleFavorite } from '../../features/favorites/favoritesSlice'
import { useGetProductByIdQuery } from '../../features/products/productsApi'
import styles from './ProductPage.module.css'

function ProductPage() {
    const { id } = useParams()
    const { data: product, isLoading, isError } = useGetProductByIdQuery(Number(id))
    const dispatch = useAppDispatch()
    const favoriteIds = useAppSelector(selectFavoriteIds)

    if (isLoading) return <Loader />

    if (isError || !product) {
        return <EmptyState message="Product not found" actionLabel="Back to catalog" actionTo="/" />
    }

    const isFavorite = favoriteIds.includes(product.id)

    return (
        <div className={styles.page}>
            <Link to="/" className={styles.back}>
                <span aria-hidden="true">←</span> Back to catalog
            </Link>

            <article className={styles.card}>
                <header className={styles.header}>
                    <span className={styles.category}>{product.category}</span>
                    <h1 className={styles.title}>{product.title}</h1>
                    <span className={styles.rating}>★ {product.rating}</span>
                </header>

                <div className={styles.content}>
                    <div className={styles.imageBox}>
                        <img src={product.thumbnail} alt={product.title} className={styles.image} />
                    </div>

                    <div className={styles.info}>
                        <p className={styles.description}>{product.description}</p>
                        <p className={styles.price}>${product.price}</p>

                        <div className={styles.actions}>
                            <button className={styles.primary} onClick={() => dispatch(addToCart(product))}>
                                Add to cart
                            </button>
                            <button
                                className={styles.secondary}
                                onClick={() => dispatch(toggleFavorite(product.id))}
                            >
                                {isFavorite ? '♥ In favorites' : '♡ Add to favorites'}
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default ProductPage