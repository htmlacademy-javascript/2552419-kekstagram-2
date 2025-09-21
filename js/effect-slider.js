const effectLevelContainerElement = document.querySelector('.img-upload__effect-level');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const effectRadiosElements = document.querySelectorAll('.effects__radio');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

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
    imagePreviewElement.style.filter = 'none';
    effectLevelContainerElement.classList.add('hidden');
    effectLevelValueElement.value = '';
  } else {
    const effect = EffectConfig[currentEffect];
    const filterValue = effect.unit ? `${value}${effect.unit}` : value;
    imagePreviewElement.style.filter = `${effect.filter}(${filterValue})`;
    effectLevelContainerElement.classList.remove('hidden');
    effectLevelValueElement.value = value;
  }
};

const createSlider = () => {
  if (slider) {
    slider.destroy();
  }

  const effect = EffectConfig[currentEffect];

  slider = noUiSlider.create(effectLevelSliderElement, {
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

const initEffectHandlers = () => {
  effectRadiosElements.forEach((radio) => {
    radio.addEventListener('change', (evt) => {
      currentEffect = evt.target.value;

      if (currentEffect === Effect.NONE) {
        effectLevelContainerElement.classList.add('hidden');
        imagePreviewElement.style.filter = 'none';
        effectLevelValueElement.value = '';
        if (slider) {
          slider.destroy();
          slider = null;
        }
      } else {
        createSlider();
        effectLevelContainerElement.classList.remove('hidden');
        updateEffect(EffectConfig[currentEffect].start);
      }
    });
  });
};

const resetEffects = () => {
  currentEffect = Effect.NONE;
  imagePreviewElement.style.filter = 'none';
  effectLevelContainerElement.classList.add('hidden');
  effectLevelValueElement.value = '';

  const noneRadioElement = document.querySelector('#effect-none');
  noneRadioElement.checked = true;

  if (slider) {
    slider.destroy();
    slider = null;
  }
};

const initEffects = () => {
  effectLevelContainerElement.classList.add('hidden');
  resetEffects();
  initEffectHandlers();
};

export { initEffects, resetEffects };
