// сама форма
const orderForm = document.querySelector('#orderForm');

// существует ли форма на текущей странице
if (orderForm) {
  
  const nameInput = document.querySelector('#name');
  const phoneInput = document.querySelector('#phone');
  const addressInput = document.querySelector('#address');

  // маска для телефона
  phoneInput.addEventListener('input', function(event) {
    
    let numbers = phoneInput.value.replace(/\D/g, '');
    
    // если пользователь стер всё до конца - просто очищаем поле и выходим
    if (!numbers) {
      phoneInput.value = '';
      return;
    }

    // ограничиваем длину 
    numbers = numbers.substring(0, 11);

    let formatted = '+7 ';
    
    // если есть цифры после первой 
    if (numbers.length > 1) formatted += '(' + numbers.substring(1, 4);
    
    // первая часть номера
    if (numbers.length > 4) formatted += ') ' + numbers.substring(4, 7);
    
    // вторая часть номера
    if (numbers.length > 7) formatted += '-' + numbers.substring(7, 9);
    
    // последние 2 цифры
    if (numbers.length > 9) formatted += '-' + numbers.substring(9, 11);


    phoneInput.value = formatted;
  });

  // пустые блоки для вывода ошибок
  const nameError = document.querySelector('#nameError');
  const phoneError = document.querySelector('#phoneError');
  const addressError = document.querySelector('#addressError');
  const successMessage = document.querySelector('#successMessage');

  // КОРЗИНА
  const cartItemsList = document.querySelector('#cartItemsList');
  const cartTotalSum = document.querySelector('#cartTotalSum');

  // Функция для отрисовки корзины
  function renderCart() {
    // данные из памяти
    const cartData = localStorage.getItem('perfumeCart');
    const cart = cartData ? JSON.parse(cartData) : [];


    if (cart.length === 0) {
      cartItemsList.textContent = 'Ваша корзина пуста.';
      cartTotalSum.textContent = 'Итого: 0 ₽';
      return;
    }

    // если товары есть, очищаем контейнер и считаем сумму
    cartItemsList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
      // отдельная строчка для каждого товара
      const itemLine = document.createElement('p');
      itemLine.style.marginBottom = '10px';
      itemLine.style.fontWeight = 'bold';
      
      itemLine.textContent = `${item.title} — ${item.quantity} шт. x ${item.price.toLocaleString('ru-RU')} ₽`;
      
      cartItemsList.append(itemLine);

      // итоговая цена
      total += item.price * item.quantity;
    });

    cartTotalSum.textContent = `Итого: ${total.toLocaleString('ru-RU')} ₽`;
  }

  renderCart();


  orderForm.addEventListener('submit', function(event) {
    
    // остановка стандартной перезагрузки страницы
    event.preventDefault();

    // очистка все старые сообщения об ошибках перед новой проверкой
    nameError.textContent = '';
    phoneError.textContent = '';
    addressError.textContent = '';
    successMessage.textContent = '';

    let isValid = true;

    
    if (nameInput.value.trim() === '') {
      nameError.textContent = 'Пожалуйста, введите имя и фамилию.';
      isValid = false;
    }

    if (phoneInput.value.trim() === '') {
      phoneError.textContent = 'Контактный телефон обязателен.';
      isValid = false;
    } else if (phoneInput.value.trim().length < 11) {
      phoneError.textContent = 'Номер телефона слишком короткий.';
      isValid = false;
    }

    if (addressInput.value.trim() === '') {
      addressError.textContent = 'Укажите адрес доставки.';
      isValid = false;
    }

    if (isValid) {
      successMessage.textContent = 'Заказ успешно оформлен! Наш парфюмер скоро свяжется с вами.';
      // автоматически очищаем все поля ввода 
      orderForm.reset();
      
      // очищаем корзину в памяти и перерисовываем сайдбар
      localStorage.removeItem('perfumeCart');
      renderCart();
    }
  });
}

