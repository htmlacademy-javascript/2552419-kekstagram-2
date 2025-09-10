// form-validation.js
import { isEscapeKey } from './utils.js';

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
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

// Функция валидации хэштегов
const validateHashtags = (value) => {
  if (!value.trim()) {
    return true; // хэштеги не обязательны
  }

  const hashtags = value.trim().split(/\s+/).filter((tag) => tag !== '');

  // Проверка на максимальное количество хэштегов
  if (hashtags.length > 5) {
    return false;
  }

  // Проверка на уникальность (регистронезависимая)
  const uniqueHashtags = new Set(hashtags.map((tag) => tag.toLowerCase()));
  if (uniqueHashtags.size !== hashtags.length) {
    return false;
  }

  // Проверка каждого хэштега
  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

  return hashtags.every((hashtag) => {
    // Проверка на пустой хэштег (только решетка)
    if (hashtag === '#') {
      return false;
    }

    // Проверка формата хэштега
    return hashtagRegex.test(hashtag);
  });
};

// Функция валидации комментария
const validateComment = (value) => value.length <= 140;

// Добавление кастомных валидаторов
pristine.addValidator(
  hashtagInputElement,
  validateHashtags,
  'Некорректный формат хэштегов. Хэштег должен начинаться с #, содержать только буквы и цифры, быть не длиннее 20 символов, максимум 5 уникальных хэштегов'
);

pristine.addValidator(
  commentInputElement,
  validateComment,
  'Комментарий не может быть длиннее 140 символов'
);

// Обработчик клавиши Esc
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
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
    evt.stopPropagation();
  }
};

const onCommentInputKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
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
const onFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    // Блокируем кнопку отправки
    submitButtonElement.disabled = true;
    submitButtonElement.textContent = 'Отправка...';

    // Здесь будет отправка формы на сервер
    setTimeout(() => {
      formElement.submit();
      submitButtonElement.disabled = false;
      submitButtonElement.textContent = 'Опубликовать';
    }, 1000);
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

export { initFormValidation, destroyFormValidation, showEditForm, hideEditForm, validateHashtags, validateComment };

