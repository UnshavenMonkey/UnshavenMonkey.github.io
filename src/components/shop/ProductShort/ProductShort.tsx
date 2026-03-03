import React, { FC } from 'react';
import { CartButton } from '../CartButton/CartButton';
import './ProductShort.css';

interface ProductShortProps {
  price: number;
  image: string;
  title: string;
  description: string;
}

export const ProductShort: FC<ProductShortProps> = ({ price, image, title, description }) => {
  return (
    <div className="product-short">
      <img className="product-short__image" src={image} alt={title} />
      <div className="product-short__info">
        <span className="product-short__price">{price.toLocaleString()} ₽</span>
        <h3 className="product-short__title">{title}</h3>
        <p className="product-short__description">{description}</p>
        <CartButton count={0} />
      </div>
    </div>
  );
};
