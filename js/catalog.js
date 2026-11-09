// 1. Находим в HTML контейнер, куда будем складывать карточки
const catalogGrid = document.querySelector('.catalog-grid');

// 2. Создаем функцию, которая умеет рисовать карточки. 
// Мы передаем в неё массив (productsArray), который нужно отрисовать.
function renderProducts(productsArray) {
  // Перед отрисовкой очищаем сетку (это пригодится нам позже для фильтров, 
  // чтобы старые товары исчезали, когда мы ищем новые)
  catalogGrid.innerHTML = ''; 


  // ПРОВЕРКА НА ПУСТОТУ
  if (productsArray.length === 0) {
    // Если массив пустой, выводим сообщение на всю ширину сетки
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'К сожалению, по вашему запросу ничего не найдено.';
    emptyMessage.style.gridColumn = '1 / -1'; // Растягиваем на все колонки
    emptyMessage.style.textAlign = 'center';
    
    catalogGrid.append(emptyMessage);
    return; // Экстренно прерываем функцию! Дальше рисовать карточки нет смысла.
  }

  // Метод forEach перебирает наш массив. Для КАЖДОГО товара (product) он выполнит этот код:
  productsArray.forEach(product => {
    
    // --- Собираем обертку карточки ---
    // Создаем тег <article> и даем ему класс 'product-card'
    const card = document.createElement('article');
    card.classList.add('product-card');

    // --- Собираем бейдж (Хит, Новинка) ---
    // Если у товара в базе заполнено поле badge, то создаем его
    if (product.badge) {
      const badge = document.createElement('span');
      badge.classList.add('badge');
      badge.textContent = product.badge; // БЕЗОПАСНЫЙ вывод текста!
      card.append(badge); // Кладем бейдж внутрь карточки
    }

    // --- Собираем картинку ---
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.title;
    img.classList.add('card-img');
    card.append(img); // Кладем картинку внутрь карточки

    // --- Собираем блок с текстом ---
    // Создаем <div class="card-content">
    const content = document.createElement('div');
    content.classList.add('card-content');

    // Название товара
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
    // toLocaleString('ru-RU') красиво отформатирует число (24500 -> 24 500)
    price.textContent = `${product.price.toLocaleString('ru-RU')} ₽`; 

    // Кнопка
    const btn = document.createElement('a');
    btn.href = 'product.html';
    btn.classList.add('btn', 'btn-outline');
    btn.textContent = 'Детали';

    // Теперь кладем название, категорию, цену и кнопку ВНУТРЬ блока content
    content.append(title, category, price, btn);

    // А сам текстовый блок кладем ВНУТРЬ карточки
    card.append(content);

    // --- ФИНАЛ ---
    // Полностью собранную карточку добавляем в сетку на странице
    catalogGrid.append(card);
  });
}

// 3. Вызываем нашу функцию и передаем ей массив products из файла data.js
// Это заставит скрипт отрисовать все товары сразу при открытии страницы
renderProducts(products);







// --- ИНТЕРАКТИВ: ПОИСК И ФИЛЬТРЫ ---

const sortSelect = document.querySelector('#sortSelect');

// 1. Находим поле поиска и все чекбоксы на странице
const searchInput = document.querySelector('#searchInput');
const checkboxes = document.querySelectorAll('.checkbox-label input');

// 2. Создаем главную функцию-фильтр
function updateCatalog() {
  // Получаем текст из поиска и переводим в нижний регистр 
  // (чтобы поиск "layton" и "Layton" работал одинаково)
  const searchText = searchInput.value.toLowerCase();
  
  // Собираем названия выбранных категорий (где стоят галочки)
  const checkedCategories = [];
  checkboxes.forEach(box => {
    if (box.checked) {
      // Берем текст рядом с галочкой и убираем лишние пробелы по краям (trim)
      checkedCategories.push(box.parentElement.textContent.trim());
    }
  });

  // 3. Пропускаем базу данных через "сито"
  const filteredProducts = products.filter(product => {
    // Проверка 1: Есть ли введенный текст в названии духов?
    const matchSearch = product.title.toLowerCase().includes(searchText);

    // Проверка 2: Подходит ли категория?
    // Если галочки не стоят (длина массива 0) — показываем всё (true). 
    // Иначе проверяем, есть ли категория товара в нашем списке нажатых галочек.
    const matchCategory = checkedCategories.length === 0 || checkedCategories.includes(product.category);

    // Товар проходит сито, только если совпал и поиск, и категория
    return matchSearch && matchCategory;
  });

  // --- СОРТИРОВКА ---
  // Создаем независимую КОПИЮ отфильтрованного массива (требование методички!)
  let resultProducts = [...filteredProducts];
  const sortValue = sortSelect.value;

  if (sortValue === 'cheap') {
    // Сортируем по возрастанию (от меньшего к большему)
    resultProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === 'expensive') {
    // Сортируем по убыванию
    resultProducts.sort((a, b) => b.price - a.price);
  }

  // 4. Отдаем отфильтрованный список нашей функции отрисовки
  renderProducts(resultProducts);
}

// 5. ПОДКЛЮЧАЕМ СОБЫТИЯ ("УШИ")
// Слушаем событие 'input' — оно срабатывает моментально на каждую введенную букву
searchInput.addEventListener('input', updateCatalog);

// Слушаем событие 'change' — оно срабатывает каждый раз, когда кликают по чекбоксу
checkboxes.forEach(box => {
  box.addEventListener('change', updateCatalog);
});
// Добавили ухо для сортировки
sortSelect.addEventListener('change', updateCatalog);