import React, { FC } from 'react';
import './OperationShort.css';

interface OperationShortProps {
  amount: number;
  category: string;
  title: string;
  description: string;
}

export const OperationShort: FC<OperationShortProps> = ({ amount, category, title, description }) => {
  const isExpense = amount < 0;

  return (
    <div className="operation-short">
      <div className="operation-short__main">
        <span className="operation-short__category">{category}</span>
        <span className="operation-short__title">{title}</span>
        <p className="operation-short__description">{description}</p>
      </div>
      <span className={`operation-short__amount operation-short__amount--${isExpense ? 'expense' : 'income'}`}>
        {isExpense ? '' : '+'}
        {amount.toLocaleString()} ₽
      </span>
    </div>
  );
};
