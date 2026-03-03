import React, { FC } from 'react';
import './OperationFull.css';

interface OperationFullProps {
  amount: number;
  category: string;
  title: string;
  description: string;
  date: string;
}

export const OperationFull: FC<OperationFullProps> = ({ amount, category, title, description, date }) => {
  const isExpense = amount < 0;

  return (
    <div className="operation-full">
      <div className="operation-full__header">
        <span className={`operation-full__amount operation-full__amount--${isExpense ? 'expense' : 'income'}`}>
          {isExpense ? '' : '+'}
          {amount.toLocaleString()} ₽
        </span>
        <button className="operation-full__edit" type="button">
          Редактировать
        </button>
      </div>
      <div className="operation-full__body">
        <span className="operation-full__category">{category}</span>
        <h3 className="operation-full__title">{title}</h3>
        <p className="operation-full__description">{description}</p>
        <time className="operation-full__date">{date}</time>
      </div>
    </div>
  );
};
