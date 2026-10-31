import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import CatalogPage from './pages/CatalogPage/CatalogPage'
import ProductPage from './pages/ProductPage/ProductPage'
import CartPage from './pages/CartPage/CartPage'
import FavoritesPage from './pages/FavoritesPage/FavoritesPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<CatalogPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    )
}

export default App