import { MIN_ID, MAX_ID } from './constants.js';

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateUniqueIds = (count) => {
  const ids = new Set();
  while (ids.size < count) {
    ids.add(getRandomInteger(MIN_ID, MAX_ID));
  }
  return [...ids];
};

const isEscapeKey = (evt) => evt.key === 'Escape';

// Функция для показа ошибки загрузки данных
const showDataError = (message) => {
  const dataErrorTemplate = document.querySelector('#data-error');
  const dataErrorElement = dataErrorTemplate.content.cloneNode(true);
  const dataError = dataErrorElement.querySelector('.data-error');

  if (message) {
    const titleElement = dataError.querySelector('.data-error__title');
    if (titleElement) {
      titleElement.textContent = message;
    }
  }

  document.body.appendChild(dataErrorElement);

  // Удаляем сообщение через 5 секунд
  setTimeout(() => {
    const existingError = document.querySelector('.data-error');
    if (existingError) {
      existingError.remove();
    }
  }, 5000);
};

export { getRandomInteger, generateUniqueIds, isEscapeKey, showDataError };
