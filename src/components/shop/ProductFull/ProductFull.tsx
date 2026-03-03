import React, { FC } from 'react';
import { CartButton } from '../CartButton/CartButton';
import './ProductFull.css';

interface ProductFullProps {
  price: number;
  image: string;
  category: string;
  title: string;
  description: string;
}

export const ProductFull: FC<ProductFullProps> = ({ price, image, category, title, description }) => {
  return (
    <div className="product-full">
      <img className="product-full__image" src={image} alt={title} />
      <div className="product-full__info">
        <span className="product-full__category">{category}</span>
        <h2 className="product-full__title">{title}</h2>
        <p className="product-full__description">{description}</p>
        <div className="product-full__footer">
          <span className="product-full__price">{price.toLocaleString()} ₽</span>
          <CartButton count={0} />
        </div>
      </div>
    </div>
  );
};
