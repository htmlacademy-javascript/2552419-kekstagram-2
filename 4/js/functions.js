/* eslint-disable no-console */
// 1. Функция проверки длины строки
function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}
console.log(checkStringLength('проверяемая строка', 20)); // true
console.log(checkStringLength('проверяемая строка', 18)); // true
console.log(checkStringLength('проверяемая строка', 10)); // false

// 2. Функция проверки на палиндром (с учётом пробелов)
function isPalindrome(string) {
  // Нормализация строки: удаление пробелов и приведение к нижнему регистру
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  // Сравнение строки с её обратной версией
  return normalizedString === normalizedString.split('').reverse().join('');
}
console.log(isPalindrome('топот')); // true
console.log(isPalindrome('ДовОд')); // true
console.log(isPalindrome('Кекс')); // false
console.log(isPalindrome('Лёша на полке клопа нашёл ')); // true


// 3. Функция извлечения чисел из строки/числа
function extractNumber(input) {
  // Преобразование входных данных в строку (для работы с числами)
  const str = String(input);
  let result = '';

  // Перебор всех символов строки
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    // Проверка, является ли символ цифрой (игнорируем минусы и точки)
    if (char >= '0' && char <= '9') {
      result += char;
    }
  }

  // Возвращаем число или NaN, если цифр не найдено
  return result ? parseInt(result, 10) : NaN;
}
console.log(extractNumber('2023 год')); // 2023
console.log(extractNumber('ECMAScript 2022')); // 2022
console.log(extractNumber('1 кефир, 0.5 батона')); // 105
console.log(extractNumber('агент 007')); // 7
console.log(extractNumber('а я томат')); // NaN
console.log(extractNumber(2023)); // 2023
console.log(extractNumber(-1)); // 1
console.log(extractNumber(1.5)); // 15