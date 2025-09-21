const DATA_ERROR_DELAY = 5000;
const DEBOUNCE_DELAY = 500;

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

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
  }, DATA_ERROR_DELAY);
};

const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
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
  isEscapeKey,
  showDataError,
  debounce,
  throttle
};
