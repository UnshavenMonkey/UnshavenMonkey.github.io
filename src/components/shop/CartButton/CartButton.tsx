import React, { FC } from 'react';
import './CartButton.css';

interface CartButtonProps {
  count: number;
}

export const CartButton: FC<CartButtonProps> = ({ count }) => {
  if (count === 0) {
    return (
      <button className="cart-button" type="button">
        В корзину
      </button>
    );
  }

  return (
    <div className="cart-button-counter">
      <button className="cart-button-counter__btn" type="button">
        −
      </button>
      <span className="cart-button-counter__count">{count}</span>
      <button className="cart-button-counter__btn" type="button">
        +
      </button>
    </div>
  );
};
