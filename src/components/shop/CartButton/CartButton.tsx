import React, { FC } from 'react';
import './CartButton.css';

interface CartButtonProps {
  count: number;
  onAdd?: () => void;
}

export const CartButton: FC<CartButtonProps> = ({ count, onAdd = () => undefined }) => {
  if (count === 0) {
    return (
      <button className="cart-button" type="button" onClick={onAdd}>
        В корзину
      </button>
    );
  }

  return (
    <button className="cart-button" type="button" onClick={onAdd}>
      В корзине: {count}
    </button>
  );
};
