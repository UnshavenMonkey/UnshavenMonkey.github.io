import React, { FC } from 'react';
import { CartButton } from '../CartButton/CartButton';
import './ProductShort.css';

interface ProductShortProps {
  id: string;
  price: number;
  image: string;
  title: string;
  description: string;
  count: number;
  onAddToCart: (productId: string) => void;
}

export const ProductShort: FC<ProductShortProps> = ({ id, price, image, title, description, count, onAddToCart }) => {
  return (
    <div className="product-short">
      <img className="product-short__image" src={image} alt={title} />
      <div className="product-short__info">
        <span className="product-short__price">{price.toLocaleString()} ₽</span>
        <h3 className="product-short__title">{title}</h3>
        <p className="product-short__description">{description}</p>
        <CartButton count={count} onAdd={() => onAddToCart(id)} />
      </div>
    </div>
  );
};
