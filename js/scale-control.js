const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const SCALE_CONTROL_VALUE_ELEMENT = document.querySelector('.scale__control--value');
const IMAGE_PREVIEW_ELEMENT = document.querySelector('.img-upload__preview img');
const SCALE_CONTROL_SMALLER_ELEMENT = document.querySelector('.scale__control--smaller');
const SCALE_CONTROL_BIGGER_ELEMENT = document.querySelector('.scale__control--bigger');

let currentScale = SCALE_DEFAULT;

const updateScale = (value) => {
  currentScale = value;
  SCALE_CONTROL_VALUE_ELEMENT.value = `${value}%`;
  IMAGE_PREVIEW_ELEMENT.style.transform = `scale(${value / 100})`;
};

const onScaleControlSmallerClick = () => {
  const newScale = Math.max(currentScale - SCALE_STEP, SCALE_MIN);
  updateScale(newScale);
};

const onScaleControlBiggerClick = () => {
  const newScale = Math.min(currentScale + SCALE_STEP, SCALE_MAX);
  updateScale(newScale);
};

const resetScale = () => {
  updateScale(SCALE_DEFAULT);
};

const initScale = () => {
  SCALE_CONTROL_SMALLER_ELEMENT.addEventListener('click', onScaleControlSmallerClick);
  SCALE_CONTROL_BIGGER_ELEMENT.addEventListener('click', onScaleControlBiggerClick);
  resetScale();
};

export { initScale, resetScale };
