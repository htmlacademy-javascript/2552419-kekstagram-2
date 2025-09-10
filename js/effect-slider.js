// effect-slider.js
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectRadios = document.querySelectorAll('.effects__radio');
const imagePreview = document.querySelector('.img-upload__preview img');

// Настройки эффектов
const EFFECTS = {
  none: {
    filter: 'none',
    unit: '',
    min: 0,
    max: 100,
    step: 1,
    start: 100
  },
  chrome: {
    filter: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
    start: 100
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1,
    start: 3
  },
  heat: {
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
    imagePreview.style.filter = 'none';
    effectLevelContainer.classList.add('hidden');
  } else {
    const effect = EFFECTS[currentEffect];
    const filterValue = effect.unit ? `${value}${effect.unit}` : value;
    imagePreview.style.filter = `${effect.filter}(${filterValue})`;
    effectLevelContainer.classList.remove('hidden');
  }

  // Записываем значение в скрытое поле для отправки на сервер
  effectLevelValue.value = value;
};

// Создание слайдера
const createSlider = () => {
  if (slider) {
    slider.destroy();
  }

  const effect = EFFECTS[currentEffect];

  slider = noUiSlider.create(effectLevelSlider, {
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
  effectRadios.forEach((radio) => {
    radio.addEventListener('change', (evt) => {
      currentEffect = evt.target.value;

      if (currentEffect === 'none') {
        effectLevelContainer.classList.add('hidden');
        imagePreview.style.filter = 'none';
        effectLevelValue.value = '';
      } else {
        createSlider();
        effectLevelContainer.classList.remove('hidden');
        updateEffect(EFFECTS[currentEffect].start);
      }
    });
  });
};

// Инициализация
const initEffects = () => {
  // Скрываем слайдер по умолчанию
  effectLevelContainer.classList.add('hidden');

  // Устанавливаем эффект по умолчанию
  const noneRadio = document.querySelector('#effect-none');
  if (noneRadio) {
    noneRadio.checked = true;
  }

  // Инициализируем обработчики
  initEffectHandlers();
};

export { initEffects };
