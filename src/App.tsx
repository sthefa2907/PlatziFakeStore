import { BrowserRouter, Routes, Route } from "react-router-dom"
import AllProductsPage from "./app/products/all"
import ProductDetails from "./app/products/details"
import AllCategoriesPage from "./app/categories/all"
import CategoryProductsPage from "./app/categories/productsByCategory/ProductsByCategory"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AllProductsPage />} />

        <Route
          path='/products/:id'
          element={<ProductDetails />}
        />

        <Route
          path='/categories'
          element={<AllCategoriesPage />}
        />

        <Route
          path='/categories/:id'
          element={<CategoryProductsPage />}
        />
         <Route
          path='*'
          element={<div>404 Not Found</div>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
