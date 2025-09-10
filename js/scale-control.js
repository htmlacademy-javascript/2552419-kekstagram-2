// scale-control.js
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

let currentScale = SCALE_DEFAULT;

// Функция для обновления масштаба
const updateScale = (value) => {
  const scaleControlValue = document.querySelector('.scale__control--value');
  const imagePreview = document.querySelector('.img-upload__preview img');

  if (scaleControlValue && imagePreview) {
    currentScale = value;
    scaleControlValue.value = `${value}%`;
    imagePreview.style.transform = `scale(${value / 100})`;
  }
};

// Инициализация масштаба
const initScale = () => {
  const scaleControlSmaller = document.querySelector('.scale__control--smaller');
  const scaleControlBigger = document.querySelector('.scale__control--bigger');

  if (scaleControlSmaller && scaleControlBigger) {
    // Обработчики для кнопок изменения масштаба
    scaleControlSmaller.addEventListener('click', () => {
      const newScale = Math.max(currentScale - SCALE_STEP, SCALE_MIN);
      updateScale(newScale);
    });

    scaleControlBigger.addEventListener('click', () => {
      const newScale = Math.min(currentScale + SCALE_STEP, SCALE_MAX);
      updateScale(newScale);
    });

    // Инициализация масштаба по умолчанию
    updateScale(SCALE_DEFAULT);
  }
};

export { initScale };

