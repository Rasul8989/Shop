import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectFavoriteIds, toggleFavorite } from '../../features/favorites/favoritesSlice'
import type { Product } from '../../types/product'
import styles from './ProductCard.module.css'

interface ProductCardProps {
    product: Product
}

function ProductCard({ product }: ProductCardProps) {
    const dispatch = useAppDispatch()
    const isFavorite = useAppSelector(selectFavoriteIds).includes(product.id)

    return (
        <article className={styles.card}>
            <button
                className={isFavorite ? `${styles.favorite} ${styles.active}` : styles.favorite}
                onClick={() => dispatch(toggleFavorite(product.id))}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                aria-pressed={isFavorite}
            >
                {isFavorite ? '♥' : '♡'}
            </button>

            <Link to={`/product/${product.id}`} className={styles.link}>
                <img src={product.thumbnail} alt={product.title} className={styles.image} />
                <div className={styles.body}>
                    <span className={styles.category}>{product.category}</span>
                    <h3 className={styles.title}>{product.title}</h3>
                    <div className={styles.footer}>
                        <span className={styles.price}>${product.price}</span>
                        <span className={styles.rating}>★ {product.rating}</span>
                    </div>
                </div>
            </Link>
        </article>
    )
}

export default ProductCard