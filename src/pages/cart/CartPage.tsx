import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../../components/shop/CartItem/CartItem';
import { cartActions } from '../../app/store/cartSlice';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { selectCartProducts } from '../../app/store/selectors';
import './CartPage.css';

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectCartProducts);
  const total = products.reduce((sum, product) => sum + product.price * product.count, 0);

  return (
    <section className="cart-page">
      <div className="page-heading">
        <h1>Корзина</h1>
        <p>Список выбранных товаров и итоговая стоимость заказа.</p>
      </div>

      <div className="cart-page__content">
        <div className="cart-page__list">
          {products.length === 0 && <p className="cart-page__empty">Корзина пока пуста.</p>}
          {products.map((product) => (
            <CartItem
              key={product.id}
              id={product.id}
              price={product.price}
              image={product.image}
              title={product.title}
              count={product.count}
              onRemove={(productId) => dispatch(cartActions.removeFromCart(productId))}
            />
          ))}
        </div>

        <aside className="cart-summary">
          <span className="cart-summary__label">Итого</span>
          <strong className="cart-summary__total">{total.toLocaleString()} ₽</strong>
          <Link className="primary-button" to="/products">
            Вернуться к товарам
          </Link>
        </aside>
      </div>
    </section>
  );
};
