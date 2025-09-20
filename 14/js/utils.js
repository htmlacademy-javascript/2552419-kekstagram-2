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

  document.body.append(dataErrorElement);

  setTimeout(() => {
    const existingError = document.querySelector('.data-error');
    if (existingError) {
      existingError.remove();
    }
  }, 5000);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const throttle = (callback, delayBetweenFrames) => {
  let lastTime = 0;
  return (...rest) => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
};

export {
  getRandomInteger,
  generateUniqueIds,
  isEscapeKey,
  showDataError,
  debounce,
  throttle
};
