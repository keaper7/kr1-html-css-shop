const catalogGrid = document.querySelector('.catalog-grid');


// добавление товара в корзину
function addToCart(product) {
  // достаем текущую корзину из памяти браузера, если там ничего нет, создаем пустой массив
  const cartData = localStorage.getItem('perfumeCart');
  const cart = cartData ? JSON.parse(cartData) : [];

  // лежит ли уже такой парфюм в корзине
  const existingItem = cart.find(item => item.title === product.title);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    // если товара нет, добавляем его в массив и ставим счетчик 1
    cart.push({ ...product, quantity: 1 });
  }
  // превращаем обновленный массив обратно в текст и сохраняем в браузер
  localStorage.setItem('perfumeCart', JSON.stringify(cart));
}

// функция отрисовки карточек
function renderProducts(productsArray) {
  // очищаем сетку 
  catalogGrid.innerHTML = ''; 


  if (productsArray.length === 0) {
    // Если массив пустой, сообщение на всю ширину сетки
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'К сожалению, по вашему запросу ничего не найдено.';
    emptyMessage.style.gridColumn = '1 / -1';
    emptyMessage.style.textAlign = 'center';
    
    catalogGrid.append(emptyMessage);
    return;
  }

  productsArray.forEach(product => {
    
    const card = document.createElement('article');
    card.classList.add('product-card');

    if (product.badge) {
      const badge = document.createElement('span');
      badge.classList.add('badge');
      badge.textContent = product.badge;
      card.append(badge);
    }

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.title;
    img.classList.add('card-img');
    card.append(img); // кладу картинку внутрь карточки


    const content = document.createElement('div');
    content.classList.add('card-content');

    // название товара
    const title = document.createElement('h3');
    title.classList.add('card-title');
    title.textContent = product.title;

    // Категория
    const category = document.createElement('p');
    category.classList.add('card-category');
    category.textContent = product.category;

    // Цена
    const price = document.createElement('span');
    price.classList.add('card-price');
    price.textContent = `${product.price.toLocaleString('ru-RU')} ₽`; 

    // Кнопка корзины
    const btn = document.createElement('button');
    btn.classList.add('btn', 'btn-primary');
    btn.textContent = 'В корзину';


    btn.addEventListener('click', () => {
      // функция сохранения
      addToCart(product);
      

      const originalText = btn.textContent;
      btn.textContent = 'Добавлено ✓';
      btn.style.backgroundColor = '#28a745';
      btn.style.borderColor = '#28a745';
      btn.style.color = '#fff';
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = ''; 
        btn.style.borderColor = '';
        btn.style.color = '';
      }, 1500);
    });

    content.append(title, category, price, btn);

    card.append(content);

    catalogGrid.append(card);
  });
}

renderProducts(products);







// ПОИСК И ФИЛЬТРЫ

const sortSelect = document.querySelector('#sortSelect');

// поле поиска и все чекбоксы на странице
const searchInput = document.querySelector('#searchInput');
const checkboxes = document.querySelectorAll('.checkbox-label input');

// функция-фильтр
function updateCatalog() {
  const searchText = searchInput.value.toLowerCase();
  
  // Собираем названия выбранных категорий (где стоят галочки)
  const checkedCategories = [];
  checkboxes.forEach(box => {
    if (box.checked) {
      checkedCategories.push(box.parentElement.textContent.trim());
    }
  });

  // прогон всех карточек
  const filteredProducts = products.filter(product => {
    const matchSearch = product.title.toLowerCase().includes(searchText);


    const matchCategory = checkedCategories.length === 0 || checkedCategories.includes(product.category);

    return matchSearch && matchCategory;
  });

  // СОРТИРОВКА
  // создаем независимую копию отфильтрованного массива
  let resultProducts = [...filteredProducts];
  const sortValue = sortSelect.value;

  if (sortValue === 'cheap') {
    // от меньшего к большем
    resultProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === 'expensive') {
    // сортируем по убыванию
    resultProducts.sort((a, b) => b.price - a.price);
  }

  // рендерим и отображаем отфильтрованный список
  renderProducts(resultProducts);
}


searchInput.addEventListener('input', updateCatalog);


checkboxes.forEach(box => {
  box.addEventListener('change', updateCatalog);
});

sortSelect.addEventListener('change', updateCatalog);