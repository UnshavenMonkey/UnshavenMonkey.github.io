import React from 'react';
import { Link } from 'react-router-dom';
import { ProductShort } from '../../components/shop/ProductShort/ProductShort';
import { Product } from '../../shared/data/products';
import './ProductsPage.css';

interface ProductsPageProps {
  products: Product[];
}

export const ProductsPage = ({ products }: ProductsPageProps) => {
  return (
    <section className="products-page">
      <div className="products-page__heading">
        <div className="page-heading">
          <h1>Товары</h1>
          <p>Каталог товаров с быстрым переходом к созданию и редактированию карточек.</p>
        </div>
        <Link className="primary-button" to="/products/new">
          Создать товар
        </Link>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <article className="products-grid__item" key={product.id}>
            <ProductShort
              price={product.price}
              image={product.image}
              title={product.title}
              description={product.description}
            />
            <Link className="secondary-button" to={`/products/${product.id}/edit`}>
              Редактировать
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};
