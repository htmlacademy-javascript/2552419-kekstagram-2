const EFFECT_LEVEL_CONTAINER_ELEMENT = document.querySelector('.img-upload__effect-level');
const EFFECT_LEVEL_SLIDER_ELEMENT = document.querySelector('.effect-level__slider');
const EFFECT_LEVEL_VALUE_ELEMENT = document.querySelector('.effect-level__value');
const EFFECT_RADIOS_ELEMENTS = document.querySelectorAll('.effects__radio');
const IMAGE_PREVIEW_ELEMENT = document.querySelector('.img-upload__preview img');

const Effect = {
  NONE: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

const EffectConfig = {
  [Effect.NONE]: {
    filter: 'none',
    unit: '',
    min: 0,
    max: 100,
    step: 1,
    start: 100
  },
  [Effect.CHROME]: {
    filter: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1
  },
  [Effect.SEPIA]: {
    filter: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1
  },
  [Effect.MARVIN]: {
    filter: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
    start: 100
  },
  [Effect.PHOBOS]: {
    filter: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1,
    start: 3
  },
  [Effect.HEAT]: {
    filter: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1,
    start: 3
  }
};

let currentEffect = Effect.NONE;
let slider = null;

const updateEffect = (value) => {
  if (currentEffect === Effect.NONE) {
    IMAGE_PREVIEW_ELEMENT.style.filter = 'none';
    EFFECT_LEVEL_CONTAINER_ELEMENT.classList.add('hidden');
    EFFECT_LEVEL_VALUE_ELEMENT.value = '';
  } else {
    const effect = EffectConfig[currentEffect];
    const filterValue = effect.unit ? `${value}${effect.unit}` : value;
    IMAGE_PREVIEW_ELEMENT.style.filter = `${effect.filter}(${filterValue})`;
    EFFECT_LEVEL_CONTAINER_ELEMENT.classList.remove('hidden');
    EFFECT_LEVEL_VALUE_ELEMENT.value = value;
  }
};

const createSlider = () => {
  if (slider) {
    slider.destroy();
  }

  const effect = EffectConfig[currentEffect];

  slider = noUiSlider.create(EFFECT_LEVEL_SLIDER_ELEMENT, {
    range: {
      min: effect.min,
      max: effect.max
    },
    start: effect.start,
    step: effect.step,
    connect: 'lower'
  });

  slider.on('update', () => {
    const value = slider.get();
    updateEffect(value);
  });
};

const onEffectRadioChange = (evt) => {
  currentEffect = evt.target.value;

  if (currentEffect === Effect.NONE) {
    EFFECT_LEVEL_CONTAINER_ELEMENT.classList.add('hidden');
    IMAGE_PREVIEW_ELEMENT.style.filter = 'none';
    EFFECT_LEVEL_VALUE_ELEMENT.value = '';
    if (slider) {
      slider.destroy();
      slider = null;
    }
  } else {
    createSlider();
    EFFECT_LEVEL_CONTAINER_ELEMENT.classList.remove('hidden');
    updateEffect(EffectConfig[currentEffect].start);
  }
};

const initEffectHandlers = () => {
  EFFECT_RADIOS_ELEMENTS.forEach((radio) => {
    radio.addEventListener('change', onEffectRadioChange);
  });
};

const resetEffects = () => {
  currentEffect = Effect.NONE;
  IMAGE_PREVIEW_ELEMENT.style.filter = 'none';
  EFFECT_LEVEL_CONTAINER_ELEMENT.classList.add('hidden');
  EFFECT_LEVEL_VALUE_ELEMENT.value = '';

  const noneRadioElement = document.querySelector('#effect-none');
  noneRadioElement.checked = true;

  if (slider) {
    slider.destroy();
    slider = null;
  }
};

const initEffects = () => {
  EFFECT_LEVEL_CONTAINER_ELEMENT.classList.add('hidden');
  resetEffects();
  initEffectHandlers();
};

export { initEffects, resetEffects };

