// 1. Находим саму форму
const orderForm = document.querySelector('#orderForm');

// Заворачиваем весь код в проверку: существует ли форма на текущей странице?
// Это спасет от ошибок в консоли, если скрипт загрузится на странице каталога, где формы нет.
if (orderForm) {
  
  // Находим поля ввода
  const nameInput = document.querySelector('#name');
  const phoneInput = document.querySelector('#phone');
  const addressInput = document.querySelector('#address');

  // Находим пустые блоки для вывода ошибок
  const nameError = document.querySelector('#nameError');
  const phoneError = document.querySelector('#phoneError');
  const addressError = document.querySelector('#addressError');
  const successMessage = document.querySelector('#successMessage');

  // 2. Вешаем "ухо" на событие ОТПРАВКИ формы ('submit')
  orderForm.addEventListener('submit', function(event) {
    
    // САМОЕ ВАЖНОЕ: Останавливаем стандартную перезагрузку страницы браузером!
    event.preventDefault();

    // 3. Очищаем все старые сообщения об ошибках перед новой проверкой
    nameError.textContent = '';
    phoneError.textContent = '';
    addressError.textContent = '';
    successMessage.textContent = '';

    // Заводим флаг (переключатель). Изначально считаем, что форма заполнена идеально.
    let isValid = true;

    // 4. ПРОВЕРКИ (ВАЛИДАЦИЯ)
    
    // Проверка имени: берем значение, отрезаем лишние пробелы. Если пусто — ошибка.
    if (nameInput.value.trim() === '') {
      nameError.textContent = 'Пожалуйста, введите имя и фамилию.'; // Безопасный вывод
      isValid = false; // Ломаем флаг, форма не прошла проверку
    }

    // Проверка телефона
    if (phoneInput.value.trim() === '') {
      phoneError.textContent = 'Контактный телефон обязателен.';
      isValid = false;
    } else if (phoneInput.value.trim().length < 11) {
      // Дополнительная проверка на минимальную длину номера
      phoneError.textContent = 'Номер телефона слишком короткий.';
      isValid = false;
    }

    // Проверка адреса
    if (addressInput.value.trim() === '') {
      addressError.textContent = 'Укажите адрес доставки.';
      isValid = false;
    }

    // 5. УСПЕШНЫЙ ФИНАЛ
    // Если флаг остался true (ни одна проверка его не сломала), значит всё верно
    if (isValid) {
      // Выводим радостное сообщение (без alert!)
      successMessage.textContent = 'Заказ успешно оформлен! Наш парфюмер скоро свяжется с вами.';
      
      // Имитация отправки: автоматически очищаем все поля ввода (доп. балл на защите)
      orderForm.reset(); 
    }
  });
}