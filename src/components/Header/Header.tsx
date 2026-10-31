import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectCartCount } from '../../features/cart/cartSlice'
import { selectFavoritesCount } from '../../features/favorites/favoritesSlice'
import styles from './Header.module.css'

function Header() {
    const cartCount = useAppSelector(selectCartCount)
    const favoritesCount = useAppSelector(selectFavoritesCount)

    return (
        <header className={styles.header}>
            <NavLink to="/" className={styles.logo}>
                <span className={styles.accent}>TECH</span>STORE
            </NavLink>

            <nav className={styles.nav}>
                <NavLink to="/" end className={styles.link}>
                    Catalog
                </NavLink>
                <NavLink to="/favorites" className={styles.link}>
                    Favorites ({favoritesCount})
                </NavLink>
                <NavLink to="/cart" className={styles.link}>
                    Cart ({cartCount})
                </NavLink>
            </nav>
        </header>
    )
}

export default Header