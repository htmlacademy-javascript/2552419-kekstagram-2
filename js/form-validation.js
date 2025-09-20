import { resetEffects } from './effect-slider.js';
import { resetScale } from './scale-control.js';
import { isEscapeKey } from './utils.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

const formElement = document.querySelector('.img-upload__form');
const uploadInputElement = document.querySelector('#upload-file');
const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const cancelButtonElement = document.querySelector('#upload-cancel');
const hashtagInputElement = document.querySelector('.text__hashtags');
const commentInputElement = document.querySelector('.text__description');
const submitButtonElement = document.querySelector('#upload-submit');

// Инициализация Pristine
const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

// Функции для получения хэштегов из значения
const getHashtagsArray = (value) => {
  return value.trim().split(/\s+/).filter((tag) => tag !== '');
};

// Валидаторы для хэштегов
const validateHashtagFormat = (hashtag) => {
  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;
  return hashtagRegex.test(hashtag);
};

const validateHashtagCount = (hashtags) => {
  return hashtags.length <= 5;
};

const validateHashtagUniqueness = (hashtags) => {
  const uniqueHashtags = new Set(hashtags.map(tag => tag.toLowerCase()));
  return uniqueHashtags.size === hashtags.length;
};

// Основная функция валидации хэштегов
const validateHashtags = (value) => {
  if (!value.trim()) {
    return true; // хэштеги не обязательны
  }

  const hashtags = getHashtagsArray(value);

  // Проверка на максимальное количество хэштегов
  if (!validateHashtagCount(hashtags)) {
    return false;
  }

  // Проверка на уникальность
  if (!validateHashtagUniqueness(hashtags)) {
    return false;
  }

  // Проверка каждого хэштега
  return hashtags.every(hashtag => {
    // Проверка на пустой хэштег (только решетка)
    if (hashtag === '#') {
      return false;
    }

    // Проверка формата хэштега
    return validateHashtagFormat(hashtag);
  });
};

// Функция для получения конкретной ошибки хэштегов
const getHashtagErrorMessage = (value) => {
  if (!value.trim()) {
    return '';
  }

  const hashtags = getHashtagsArray(value);

  // Проверка количества хэштегов
  if (!validateHashtagCount(hashtags)) {
    return 'Нельзя указать больше пяти хэштегов';
  }

  // Проверка уникальности
  if (!validateHashtagUniqueness(hashtags)) {
    return 'Один и тот же хэштег не может быть использован дважды';
  }

  // Проверка каждого хэштега
  for (const hashtag of hashtags) {
    if (hashtag === '#') {
      return 'Хэштег не может состоять только из решётки';
    }

    if (!validateHashtagFormat(hashtag)) {
      return 'Хэштег должен начинаться с # и содержать только буквы и цифры (макс. 20 символов)';
    }
  }

  return '';
};

// Функция валидации комментария
const validateComment = (value) => {
  return value.length <= 140;
};

// Добавление валидаторов
pristine.addValidator(
  hashtagInputElement,
  validateHashtags,
  getHashtagErrorMessage
);

pristine.addValidator(
  commentInputElement,
  validateComment,
  'Комментарий не может быть длиннее 140 символов'
);

// Обработчик клавиши Esc
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    // Не закрываем форму, если открыто сообщение об ошибке
    const errorModal = document.querySelector('.error');
    if (errorModal) {
      evt.stopPropagation();
      return;
    }

    // Не закрываем форму, если фокус в полях ввода
    if (document.activeElement === hashtagInputElement || document.activeElement === commentInputElement) {
      evt.stopPropagation();
      return;
    }

    evt.preventDefault();
    hideEditForm();
  }
};

// Обработчики для отмены propagation при фокусе
const onHashtagInputKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    // Не даем Esc закрыть сообщение об ошибке, если оно открыто
    const errorModal = document.querySelector('.error');
    if (errorModal) {
      evt.stopPropagation();
    }
  }
};

const onCommentInputKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    // Не даем Esc закрыть сообщение об ошибке, если оно открыто
    const errorModal = document.querySelector('.error');
    if (errorModal) {
      evt.stopPropagation();
    }
  }
};

// Функция для показа формы редактирования
const showEditForm = () => {
  uploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

// Функция для скрытия формы редактирования
const hideEditForm = () => {
  uploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  formElement.reset();
  pristine.reset();

  // Сброс эффектов и масштаба
  resetEffects();
  resetScale();
};

// Обработчик изменения файла
const onFileInputChange = () => {
  showEditForm();
};

// Обработчик закрытия формы
const onCancelButtonClick = () => {
  hideEditForm();
};

// Обработчик отправки формы
const onFormSubmit = async (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    // Блокируем кнопку отправки
    submitButtonElement.disabled = true;
    submitButtonElement.textContent = 'Отправка...';

    try {
      // Создаем FormData из формы
      const formData = new FormData(formElement);

      // Отправляем данные на сервер
      await sendData(formData);

      // Показываем сообщение об успехе
      showSuccessMessage();

      // Закрываем форму и сбрасываем состояние
      hideEditForm();
    } catch (error) {
      // Показываем сообщение об ошибке, но НЕ закрываем форму
      showErrorMessage();
      console.error('Ошибка отправки формы:', error);
    } finally {
      // Разблокируем кнопку
      submitButtonElement.disabled = false;
      submitButtonElement.textContent = 'Опубликовать';
    }
  }
};

// Инициализация обработчиков событий
const initFormValidation = () => {
  uploadInputElement.addEventListener('change', onFileInputChange);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  formElement.addEventListener('submit', onFormSubmit);
  hashtagInputElement.addEventListener('keydown', onHashtagInputKeydown);
  commentInputElement.addEventListener('keydown', onCommentInputKeydown);
};

// Функция для удаления обработчиков (на случай уничтожения)
const destroyFormValidation = () => {
  uploadInputElement.removeEventListener('change', onFileInputChange);
  cancelButtonElement.removeEventListener('click', onCancelButtonClick);
  formElement.removeEventListener('submit', onFormSubmit);
  hashtagInputElement.removeEventListener('keydown', onHashtagInputKeydown);
  commentInputElement.removeEventListener('keydown', onCommentInputKeydown);
  document.removeEventListener('keydown', onDocumentKeydown);
};

export { initFormValidation, destroyFormValidation };
