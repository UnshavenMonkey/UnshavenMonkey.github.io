import React, { FC, ReactNode, useEffect } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../components/common/Layout/Layout';
import { CartPage } from '../pages/cart/CartPage';
import { ProductModalPage } from '../pages/products/ProductModalPage';
import { ProductsPage } from '../pages/products/ProductsPage';
import { ProfilePage } from '../pages/profile/ProfilePage';
import { SignUpPage } from '../pages/signup/SignUpPage';
import { authActions } from './store/authSlice';
import { TOKEN_STORAGE_KEY } from './store/authSaga';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { selectIsAdmin, selectIsAuthorized, selectIsInitialized } from './store/selectors';
import './App.css';

interface ProtectedRouteProps {
  allowed: boolean;
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ allowed, children }) => {
  if (!allowed) {
    return <Navigate to="/products" replace />;
  }

  return <>{children}</>;
};

function App() {
  const dispatch = useAppDispatch();
  const initialized = useAppSelector(selectIsInitialized);
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const isAdmin = useAppSelector(selectIsAdmin);

  useEffect(() => {
    dispatch(authActions.appStarted());
  }, [dispatch]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === TOKEN_STORAGE_KEY) {
        dispatch(authActions.tokenChangedFromStorage(event.newValue));
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [dispatch]);

  if (!initialized) {
    return <div className="app-loading">Loading...</div>;
  }

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowed={isAuthorized}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/products/new"
            element={
              <ProtectedRoute allowed={isAdmin}>
                <ProductModalPage mode="create" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:productId/edit"
            element={
              <ProtectedRoute allowed={isAdmin}>
                <ProductModalPage mode="edit" />
              </ProtectedRoute>
            }
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
