import { renderThumbnails } from './picture-thumbnails.js';
import { initFormValidation } from './form-validation.js';
import { initEffects } from './effect-slider.js';
import { initScale } from './scale-control.js';
import { getData } from './api.js';
import { showDataError } from './utils.js';
import { initFilters } from './filters.js';

const showDataLoadError = () => {
  showDataError('Не удалось загрузить фотографии. Попробуйте обновить страницу');
};

const initApp = async () => {
  try {
    const photos = await getData();
    renderThumbnails(photos);
    initFilters(photos);
    initFormValidation();
    initEffects();
    initScale();
  } catch (error) {
    showDataLoadError();
    console.error('Ошибка загрузки данных:', error);
  }
};

initApp();

