export interface Product {
  id: string;
  price: number;
  image: string;
  category: string;
  title: string;
  description: string;
}

export interface CartProduct extends Product {
  count: number;
}

export const products: Product[] = [
  {
    id: 'wireless-headphones',
    price: 1990,
    image: 'https://placehold.co/240x180/edf2ff/1f2937?text=Audio',
    category: 'Электроника',
    title: 'Беспроводные наушники',
    description: 'Легкая гарнитура с шумоподавлением и временем работы до 30 часов.',
  },
  {
    id: 'mechanical-keyboard',
    price: 4990,
    image: 'https://placehold.co/240x180/e0f2fe/1f2937?text=Keys',
    category: 'Компьютеры',
    title: 'Механическая клавиатура',
    description: 'Компактная клавиатура с RGB-подсветкой и алюминиевым корпусом.',
  },
  {
    id: 'smart-watch',
    price: 7490,
    image: 'https://placehold.co/240x180/fef3c7/1f2937?text=Watch',
    category: 'Гаджеты',
    title: 'Смарт-часы Pulse',
    description: 'Мониторинг активности, уведомления и влагозащита для ежедневного ритма.',
  },
];
