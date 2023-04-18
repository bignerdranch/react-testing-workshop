import Croissant from './croissant.svg';
import Coffee from './coffee.svg';
import Cookie from './cookie.svg';
import Cupcake from './cupcake.svg';
import FrenchPress from './french-press.svg';
import IcedCoffee from './iced-coffee.svg';
import Latte from './latte.svg';
import Milk from './milk.svg';
import Sandwich from './sandwich.svg';
import Tea from './tea.svg';

export const itemImages = {
  coffee: Coffee,
  cookie: Cookie,
  croissant: Croissant,
  cupcake: Cupcake,
  'french-press': FrenchPress,
  'iced-coffee': IcedCoffee,
  latte: Latte,
  milk: Milk,
  sandwich: Sandwich,
  tea: Tea,
};

export const items = [
  {
    itemId: 'coffee',
    imageId: 'coffee',
    title: 'Drip Coffee',
    price: 1,
    description: '',
    salePrice: 0,
  },
  {
    itemId: 'cookie',
    imageId: 'cookie',
    title: 'Cookie',
    price: 0.99,
    description: 'May contain nuts.',
    salePrice: 0.50,
  },
  {
    itemId: 'croissant',
    imageId: 'croissant',
    title: 'Croissant',
    price: 1.50,
  },
  {
    itemId: 'cupcake',
    imageId: 'cupcake',
    title: 'Cupcake',
    price: 2.50,
  },
  {
    itemId: 'french-press',
    imageId: 'french-press',
    title: 'French Press',
    price: 1,
  },
  {
    itemId: 'iced-coffee',
    imageId: 'iced-coffee',
    title: 'Iced Coffee',
    price: 1.25,
  },
  {
    itemId: 'latte',
    imageId: 'latte',
    title: 'Latte',
    price: 1.75,
  },
  {
    itemId: 'milk',
    imageId: 'milk',
    title: 'Chocolate Milk',
    price: 0.50,
  },
  {
    itemId: 'sandwich',
    imageId: 'sandwich',
    title: 'Sandwich',
    price: 6,
  },
  {
    itemId: 'tea',
    imageId: 'tea',
    title: 'Tea',
    price: 1,
  },
];
