const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

let currentScale = SCALE_DEFAULT;

// Функция для обновления масштаба
const updateScale = (value) => {
  const scaleControlValueElement = document.querySelector('.scale__control--value');
  const imagePreviewElement = document.querySelector('.img-upload__preview img');

  if (scaleControlValueElement && imagePreviewElement) {
    currentScale = value;
    scaleControlValueElement.value = `${value}%`;
    imagePreviewElement.style.transform = `scale(${value / 100})`;
  }
};

// Обработчик уменьшения масштаба
const onScaleControlSmallerClick = () => {
  const newScale = Math.max(currentScale - SCALE_STEP, SCALE_MIN);
  updateScale(newScale);
};

// Обработчик увеличения масштаба
const onScaleControlBiggerClick = () => {
  const newScale = Math.min(currentScale + SCALE_STEP, SCALE_MAX);
  updateScale(newScale);
};

// Инициализация масштаба
const initScale = () => {
  const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
  const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');

  if (scaleControlSmallerElement && scaleControlBiggerElement) {
    // Обработчики для кнопок изменения масштаба
    scaleControlSmallerElement.addEventListener('click', onScaleControlSmallerClick);
    scaleControlBiggerElement.addEventListener('click', onScaleControlBiggerClick);

    // Инициализация масштаба по умолчанию
    updateScale(SCALE_DEFAULT);
  }
};

export { initScale };
