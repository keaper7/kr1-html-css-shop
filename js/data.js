// Переменная products хранит массив (список) всех наших ароматов.
// Внутри массива лежат объекты (каждый объект в фигурных скобках {} — это один товар).

const products = [
  {
    id: 1,
    title: 'Layton Royal',
    category: 'Восточные',
    price: 24500, // Заметь, никаких кавычек и букв "₽". Это чистая математика.
    badge: 'Хит',
    image: 'images/layton-hero.webp' // Путь к картинке
  },
  {
    id: 2,
    title: 'Oud Symphony',
    category: 'Древесные',
    price: 32000,
    badge: '', // Пустая строка, если бейджа нет
    image: 'images/layton-hero.webp'
  },
  {
    id: 3,
    title: 'Velvet Cherry',
    category: 'Гурманские',
    price: 28900,
    badge: '',
    image: 'images/layton-hero.webp'
  },
  {
    id: 4,
    title: 'Santal Wood',
    category: 'Древесные',
    price: 18700,
    badge: 'Sale',
    image: 'images/layton-hero.webp'
  },
  {
    id: 5,
    title: 'Baccarat Rose',
    category: 'Цветочные',
    price: 41000,
    badge: 'Новинка',
    image: 'images/layton-hero.webp'
  },
  {
    id: 6,
    title: 'Mineral Amber',
    category: 'Свежие',
    price: 21000,
    badge: '',
    image: 'images/layton-hero.webp'
  },
  // Добавляем еще два аромата, чтобы выполнить требование "минимум 8 товаров"
  {
    id: 7,
    title: 'Vanilla Blend',
    category: 'Гурманские',
    price: 19500,
    badge: '',
    image: 'images/layton-hero.webp'
  },
  {
    id: 8,
    title: 'Vetiver Forest',
    category: 'Свежие',
    price: 22300,
    badge: '',
    image: 'images/layton-hero.webp'
  }
];