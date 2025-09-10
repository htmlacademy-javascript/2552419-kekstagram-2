// utils.js
import { MIN_ID, MAX_ID } from './constants.js';

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateUniqueIds = (count) => {
  const ids = new Set();
  while (ids.size < count) {
    ids.add(getRandomInteger(MIN_ID, MAX_ID));
  }
  return [...ids];
};

// Функция проверки нажатия клавиши Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandomInteger, generateUniqueIds, isEscapeKey };
