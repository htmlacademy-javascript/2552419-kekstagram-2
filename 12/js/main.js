import { renderThumbnails } from './picture-thumbnails.js';
import { initFormValidation } from './form-validation.js';
import { initEffects } from './effect-slider.js';
import { initScale } from './scale-control.js';
import { getData } from './api.js';
import { showDataError } from './utils.js';

// Функция для показа ошибки загрузки данных
const showDataLoadError = () => {
  showDataError('Не удалось загрузить фотографии. Попробуйте обновить страницу');
};

// Инициализация приложения
const initApp = async () => {
  try {
    // Загружаем данные с сервера
    const photos = await getData();

    // Отрисовываем миниатюры
    renderThumbnails(photos);

    // Инициализируем остальные модули
    initFormValidation();
    initEffects();
    initScale();
  } catch (error) {
    showDataLoadError();
    console.error('Ошибка загрузки данных:', error);
  }
};

// Запускаем приложение
initApp();
