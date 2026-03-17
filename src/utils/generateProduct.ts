export interface Product {
  id: number;
  price: number;
  image: string;
  category: string;
  title: string;
  description: string;
}

const categories = ['Электроника', 'Одежда', 'Книги', 'Спорт', 'Дом и сад', 'Игрушки'];

const titles = [
  'Беспроводные наушники',
  'Смартфон',
  'Ноутбук',
  'Кофеварка',
  'Велосипед',
  'Книга по программированию',
  'Кроссовки',
  'Рюкзак',
  'Умные часы',
  'Планшет',
];

const descriptions = [
  'Отличный товар для повседневного использования',
  'Высокое качество по разумной цене',
  'Популярный выбор среди покупателей',
  'Современный дизайн и надёжность',
  'Идеальный подарок для близких',
];

let idCounter = 1;

export function generateProduct(): Product {
  const id = idCounter++;
  return {
    id,
    price: Math.floor(Math.random() * 50000) + 500,
    image: `https://placehold.co/240x180?text=Product+${id}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    title: titles[Math.floor(Math.random() * titles.length)],
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
  };
}

export function generateProducts(count: number): Product[] {
  return Array.from({ length: count }, () => generateProduct());
}
