// сама форма
const orderForm = document.querySelector('#orderForm');

// существует ли форма на текущей странице
if (orderForm) {
  
  const nameInput = document.querySelector('#name');
  const phoneInput = document.querySelector('#phone');
  const addressInput = document.querySelector('#address');

  // пустые блоки для вывода ошибок
  const nameError = document.querySelector('#nameError');
  const phoneError = document.querySelector('#phoneError');
  const addressError = document.querySelector('#addressError');
  const successMessage = document.querySelector('#successMessage');


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
    }
  });
}