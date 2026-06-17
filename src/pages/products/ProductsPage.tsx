import React from 'react';
import { Link } from 'react-router-dom';
import { ProductShort } from '../../components/shop/ProductShort/ProductShort';
import { cartActions } from '../../app/store/cartSlice';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { selectIsAdmin, selectProducts } from '../../app/store/selectors';
import './ProductsPage.css';

export const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const isAdmin = useAppSelector(selectIsAdmin);
  const cartItems = useAppSelector((state) => state.cart.items);
  const getCartCount = (productId: string) => cartItems.find((item) => item.productId === productId)?.count ?? 0;

  return (
    <section className="products-page">
      <div className="products-page__heading">
        <div className="page-heading">
          <h1>Товары</h1>
          <p>Каталог товаров с добавлением в корзину и управлением карточками для администратора.</p>
        </div>
        {isAdmin && (
          <Link className="primary-button" to="/products/new">
            Создать товар
          </Link>
        )}
      </div>

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
    </section>
  );
};
