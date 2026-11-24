
import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import EmptyState from '../../components/EmptyState/EmptyState'
import {
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
    selectCartCount,
    selectCartItems,
    selectCartTotal,
} from '../../features/cart/cartSlice'
import { useGetProductsQuery } from '../../features/products/productsApi'
import styles from './CartPage.module.css'

function CartPage() {
    const dispatch = useAppDispatch()
    const items = useAppSelector(selectCartItems)
    const count = useAppSelector(selectCartCount)
    const total = useAppSelector(selectCartTotal)

    const [orderSubmitted, setOrderSubmitted] = useState(false)

    const { data: products } = useGetProductsQuery()

    useEffect(() => {
        if (!products) return

        const availableIds = new Set(products.map((product) => product.id))

        items.forEach(({ product }) => {
            if (!availableIds.has(product.id)) {
                dispatch(removeFromCart(product.id))
            }
        })
    }, [products, items, dispatch])

    function handleOrderSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setOrderSubmitted(true)
    }

    if (items.length === 0) {
        return (
            <EmptyState
                message="Your cart is empty"
                actionLabel="Go to catalog"
                actionTo="/"
            />
        )
    }

    return (
        <div className={styles.page}>
            <h1>Cart</h1>

            <ul className={styles.list}>
                {items.map(({ product, quantity }) => (
                    <li key={product.id} className={styles.item}>
                        <Link to={`/product/${product.id}`} className={styles.imageBox}>
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className={styles.image}
                            />
                        </Link>

                        <div className={styles.details}>
                            <span className={styles.category}>{product.category}</span>

                            <Link to={`/product/${product.id}`} className={styles.title}>
                                {product.title}
                            </Link>

                            <div className={styles.meta}>
                                <span className={styles.price}>
                                    ${product.price.toFixed(2)}
                                </span>
                                <span className={styles.rating}>★ {product.rating}</span>
                            </div>
                        </div>

                        <div className={styles.controls}>
                            <div className={styles.quantity}>
                                <button
                                    className={styles.button}
                                    onClick={() => dispatch(decreaseQuantity(product.id))}
                                    disabled={quantity === 1}
                                    aria-label="Decrease quantity"
                                >
                                    −
                                </button>

                                <span>{quantity}</span>

                                <button
                                    className={styles.button}
                                    onClick={() => dispatch(increaseQuantity(product.id))}
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>

                            <span className={styles.subtotal}>
                                ${(product.price * quantity).toFixed(2)}
                            </span>

                            <button
                                className={styles.remove}
                                onClick={() => dispatch(removeFromCart(product.id))}
                                aria-label="Remove from cart"
                            >
                                ✕
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className={styles.summary}>
                <span>Items: {count}</span>
                <strong className={styles.total}>
                    Total: ${total.toFixed(2)}
                </strong>
            </div>

            {orderSubmitted ? (
                <div className={styles.success}>
                    <h2>Order placed!</h2>
                    <p>Thank you for your purchase.</p>
                </div>
            ) : (
                <form className={styles.orderForm} onSubmit={handleOrderSubmit}>
                    <h2>Checkout</h2>

                    <label className={styles.field}>
                        Your name
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            required
                        />
                    </label>

                    <label className={styles.field}>
                        Phone number
                        <input
                            type="tel"
                            name="phone"
                            placeholder="+996 555 123 456"
                            required
                        />
                    </label>

                    <label className={styles.field}>
                        Delivery address
                        <input
                            type="text"
                            name="address"
                            placeholder="Enter your address"
                            required
                        />
                    </label>

                    <label className={styles.field}>
                        Comment
                        <textarea
                            name="comment"
                            placeholder="Additional information"
                            rows={3}
                        />
                    </label>

                    <button type="submit" className={styles.submit}>
                        Place order
                    </button>
                </form>
            )}
        </div>
    )
}

export default CartPage
