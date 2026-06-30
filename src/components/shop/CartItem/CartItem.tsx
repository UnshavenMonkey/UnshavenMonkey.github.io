import React, { FC } from 'react';
import './CartItem.css';

interface CartItemProps {
  id: string;
  price: number;
  image: string;
  title: string;
  count: number;
  onRemove: (productId: string) => void;
}

export const CartItem: FC<CartItemProps> = ({ id, price, image, title, count, onRemove }) => {
  return (
    <div className="cart-item">
      <img className="cart-item__image" src={image} alt={title} />
      <div className="cart-item__info">
        <h4 className="cart-item__title">{title}</h4>
        <span className="cart-item__price">{price.toLocaleString()} ₽</span>
        <span className="cart-item__count">× {count}</span>
      </div>
      <button className="cart-item__delete" type="button" aria-label="Удалить" onClick={() => onRemove(id)}>
        ×
      </button>
    </div>
  );
};
