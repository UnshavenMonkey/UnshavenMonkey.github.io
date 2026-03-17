import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { ProductShort } from '../ProductShort/ProductShort';
import { Product, generateProducts } from '../../../utils/generateProduct';
import './ProductList.css';

const INITIAL_COUNT = 6;
const LOAD_MORE_COUNT = 3;

export const ProductList: FC = () => {
  const [products, setProducts] = useState<Product[]>(() => generateProducts(INITIAL_COUNT));
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts((prev) => [...prev, ...generateProducts(LOAD_MORE_COUNT)]);
      setLoading(false);
    }, 400);
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="product-list">
      <div className="product-list__grid">
        {products.map((product) => (
          <ProductShort
            key={product.id}
            price={product.price}
            image={product.image}
            title={product.title}
            description={product.description}
          />
        ))}
      </div>
      <div ref={sentinelRef} className="product-list__sentinel">
        {loading && <span className="product-list__loading">Загрузка...</span>}
      </div>
    </div>
  );
};
