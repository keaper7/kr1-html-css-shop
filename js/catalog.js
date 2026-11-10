// 1. Находим в HTML контейнер, куда будем складывать карточки
const catalogGrid = document.querySelector('.catalog-grid');

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

    // Кнопка
    const btn = document.createElement('a');
    btn.href = 'product.html';
    btn.classList.add('btn', 'btn-outline');
    btn.textContent = 'Детали';

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


    // если галочки не стоят (длина массива 0), показываем всё (true) 
    // иначе проверяем, есть ли категория товара в нашем списке нажатых галочек
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