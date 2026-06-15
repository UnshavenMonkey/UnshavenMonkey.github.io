import React, { useMemo, useState } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../components/common/Layout/Layout';
import { CartPage } from '../pages/cart/CartPage';
import { ProductModalPage } from '../pages/products/ProductModalPage';
import { ProductsPage } from '../pages/products/ProductsPage';
import { ProfilePage, ProfileFormValues } from '../pages/profile/ProfilePage';
import { CartProduct, Product, products as initialProducts } from '../shared/data/products';
import './App.css';

function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [profile, setProfile] = useState<ProfileFormValues>({
    name: 'Алексей Иванов',
    email: 'alexey@example.com',
    phone: '+7 999 123-45-67',
    address: 'Москва, ул. Лесная, 12',
  });

  const cartProducts = useMemo<CartProduct[]>(
    () => products.slice(0, 2).map((product, index) => ({ ...product, count: index === 0 ? 2 : 1 })),
    [products]
  );

  const upsertProduct = (product: Product) => {
    setProducts((currentProducts) => {
      const productExists = currentProducts.some((currentProduct) => currentProduct.id === product.id);

      if (!productExists) {
        return [product, ...currentProducts];
      }

      return currentProducts.map((currentProduct) => (currentProduct.id === product.id ? product : currentProduct));
    });
  };

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/profile" element={<ProfilePage values={profile} onSubmit={setProfile} />} />
          <Route path="/products" element={<ProductsPage products={products} />} />
          <Route
            path="/products/new"
            element={<ProductModalPage products={products} onSave={upsertProduct} mode="create" />}
          />
          <Route
            path="/products/:productId/edit"
            element={<ProductModalPage products={products} onSave={upsertProduct} mode="edit" />}
          />
          <Route path="/cart" element={<CartPage products={cartProducts} />} />
          <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
