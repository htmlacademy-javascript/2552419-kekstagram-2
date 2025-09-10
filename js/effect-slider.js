// effect-slider.js
const effectLevelContainerElement = document.querySelector('.img-upload__effect-level');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const effectRadiosElements = document.querySelectorAll('.effects__radio');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

// Настройки эффектов
const Effects = {
  NONE: {
    filter: 'none',
    unit: '',
    min: 0,
    max: 100,
    step: 1,
    start: 100
  },
  CHROME: {
    filter: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1
  },
  SEPIA: {
    filter: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1
  },
  MARVIN: {
    filter: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
    start: 100
  },
  PHOBOS: {
    filter: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1,
    start: 3
  },
  HEAT: {
    filter: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1,
    start: 3
  }
};

let currentEffect = 'none';
let slider = null;

// Функция для обновления эффекта
const updateEffect = (value) => {
  if (currentEffect === 'none') {
    imagePreviewElement.style.filter = 'none';
    effectLevelContainerElement.classList.add('hidden');
  } else {
    const effect = Effects[currentEffect.toUpperCase()];
    const filterValue = effect.unit ? `${value}${effect.unit}` : value;
    imagePreviewElement.style.filter = `${effect.filter}(${filterValue})`;
    effectLevelContainerElement.classList.remove('hidden');
  }

  // Записываем значение в скрытое поле для отправки на сервер
  effectLevelValueElement.value = value;
};

// Создание слайдера
const createSlider = () => {
  if (slider) {
    slider.destroy();
  }

  const effect = Effects[currentEffect.toUpperCase()];

  slider = noUiSlider.create(effectLevelSliderElement, {
    range: {
      min: effect.min,
      max: effect.max
    },
    start: effect.start,
    step: effect.step,
    connect: 'lower'
  });

  // Обработчик изменения слайдера
  slider.on('update', () => {
    const value = slider.get();
    updateEffect(value);
  });
};

// Обработчики для переключения эффектов
const initEffectHandlers = () => {
  effectRadiosElements.forEach((radio) => {
    radio.addEventListener('change', (evt) => {
      currentEffect = evt.target.value;

      if (currentEffect === 'none') {
        effectLevelContainerElement.classList.add('hidden');
        imagePreviewElement.style.filter = 'none';
        effectLevelValueElement.value = '';
      } else {
        createSlider();
        effectLevelContainerElement.classList.remove('hidden');
        updateEffect(Effects[currentEffect.toUpperCase()].start);
      }
    });
  });
};

// Инициализация
const initEffects = () => {
  // Скрываем слайдер по умолчанию
  effectLevelContainerElement.classList.add('hidden');

  // Устанавливаем эффект по умолчанию
  const noneRadioElement = document.querySelector('#effect-none');
  if (noneRadioElement) {
    noneRadioElement.checked = true;
  }

  // Инициализируем обработчики
  initEffectHandlers();
};

export { initEffects };
