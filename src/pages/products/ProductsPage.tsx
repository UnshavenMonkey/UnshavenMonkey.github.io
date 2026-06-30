import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ProductShort } from '../../components/shop/ProductShort/ProductShort';
import { cartActions } from '../../app/store/cartSlice';
import { productsActions } from '../../app/store/productsSlice';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import {
  selectIsAdmin,
  selectProducts,
  selectProductsError,
  selectProductsHasMore,
  selectProductsLoading,
  selectProductsLoadingMore,
} from '../../app/store/selectors';
import './ProductsPage.css';

export const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectProductsLoading);
  const loadingMore = useAppSelector(selectProductsLoadingMore);
  const error = useAppSelector(selectProductsError);
  const hasMore = useAppSelector(selectProductsHasMore);
  const isAdmin = useAppSelector(selectIsAdmin);
  const cartItems = useAppSelector((state) => state.cart.items);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const getCartCount = (productId: string) => cartItems.find((item) => item.productId === productId)?.count ?? 0;

  useEffect(() => {
    dispatch(productsActions.productsLoadRequested());
  }, [dispatch]);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading && !loadingMore) {
          dispatch(productsActions.productsNextPageRequested());
        }
      },
      { rootMargin: '160px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [dispatch, hasMore, loading, loadingMore]);

  return (
    <section className="products-page">
      <div className="products-page__heading">
        <div className="page-heading">
          <h1>Товары</h1>
          <p>Каталог загружается с REST API постранично. Новые страницы подгружаются при прокрутке.</p>
        </div>
        {isAdmin && (
          <Link className="primary-button" to="/products/new">
            Создать товар
          </Link>
        )}
      </div>

      {error && <p className="products-page__error">{error}</p>}
      {loading && products.length === 0 && <p className="products-page__status">Загружаем товары...</p>}

      <div className="products-grid">
        {products.map((product) => (
          <article className="products-grid__item" key={product.id}>
            <ProductShort
              id={product.id}
              price={product.price}
              image={product.image}
              title={product.title}
              description={product.description}
              count={getCartCount(product.id)}
              onAddToCart={(productId) => dispatch(cartActions.addToCart(productId))}
            />
            {isAdmin && (
              <Link className="secondary-button" to={`/products/${product.id}/edit`}>
                Редактировать
              </Link>
            )}
          </article>
        ))}
      </div>

      <div className="products-page__sentinel" ref={sentinelRef}>
        {loadingMore && 'Загружаем еще...'}
        {!hasMore && products.length > 0 && 'Все товары загружены'}
      </div>
    </section>
  );
};
