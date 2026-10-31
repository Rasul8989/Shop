import type { Product } from '../../types/product'
import ProductCard from '../ProductCard/ProductCard'
import styles from './ProductGrid.module.css'

interface ProductGridProps {
    products: Product[]
}

function ProductGrid({ products }: ProductGridProps) {
    return (
        <div className={styles.grid}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}

export default ProductGrid