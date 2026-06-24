import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../../components/shop/CartItem/CartItem';
import { cartActions } from '../../app/store/cartSlice';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { selectCartProducts, selectOrderError, selectOrderLoading, selectOrderSuccess } from '../../app/store/selectors';
import './CartPage.css';

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectCartProducts);
  const orderLoading = useAppSelector(selectOrderLoading);
  const orderError = useAppSelector(selectOrderError);
  const orderSuccess = useAppSelector(selectOrderSuccess);
  const total = products.reduce((sum, product) => sum + product.price * product.count, 0);

  return (
    <section className="cart-page">
      <div className="page-heading">
        <h1>Корзина</h1>
        <p>Список выбранных товаров. Заказ отправляется на REST API текущего пользователя.</p>
      </div>

      <div className="cart-page__content">
        <div className="cart-page__list">
          {products.length === 0 && <p className="cart-page__empty">Корзина пока пустая.</p>}
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
          {orderError && <p className="cart-summary__error">{orderError}</p>}
          {orderSuccess && <p className="cart-summary__success">Заказ создан.</p>}
          <button
            className="primary-button"
            disabled={orderLoading || products.length === 0}
            type="button"
            onClick={() => dispatch(cartActions.orderCreateRequested())}
          >
            {orderLoading ? 'Создаем...' : 'Создать заказ'}
          </button>
          <Link className="secondary-button" to="/products">
            Вернуться к товарам
          </Link>
        </aside>
      </div>
    </section>
  );
};
