const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

let currentScale = SCALE_DEFAULT;

const scaleControlValueElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');
const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');

const updateScale = (value) => {
  currentScale = value;
  scaleControlValueElement.value = `${value}%`;
  imagePreviewElement.style.transform = `scale(${value / 100})`;
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
  scaleControlSmallerElement.addEventListener('click', onScaleControlSmallerClick);
  scaleControlBiggerElement.addEventListener('click', onScaleControlBiggerClick);
  resetScale();
};

export { initScale, resetScale };

