// form-validation.js
import { isEscapeKey } from './utils.js';

const form = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const submitButton = document.querySelector('#upload-submit');

// Инициализация Pristine
const pristine = new Pristine(form, {
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

  const hashtags = value.trim().split(/\s+/).filter(tag => tag !== '');

  // Проверка на максимальное количество хэштегов
  if (hashtags.length > 5) {
    return false;
  }

  // Проверка на уникальность (регистронезависимая)
  const uniqueHashtags = new Set(hashtags.map(tag => tag.toLowerCase()));
  if (uniqueHashtags.size !== hashtags.length) {
    return false;
  }

  // Проверка каждого хэштега
  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

  return hashtags.every(hashtag => {
    // Проверка на пустой хэштег (только решетка)
    if (hashtag === '#') {
      return false;
    }

    // Проверка формата хэштега
    return hashtagRegex.test(hashtag);
  });
};

// Функция валидации комментария
const validateComment = (value) => {
  return value.length <= 140;
};

// Добавление кастомных валидаторов
pristine.addValidator(
  hashtagInput,
  validateHashtags,
  'Некорректный формат хэштегов. Хэштег должен начинаться с #, содержать только буквы и цифры, быть не длиннее 20 символов, максимум 5 уникальных хэштегов'
);

pristine.addValidator(
  commentInput,
  validateComment,
  'Комментарий не может быть длиннее 140 символов'
);

// Функция для показа формы редактирования
const showEditForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

// Функция для скрытия формы редактирования
const hideEditForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  form.reset();
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
    submitButton.disabled = true;
    submitButton.textContent = 'Отправка...';

    // Здесь будет отправка формы на сервер
    setTimeout(() => {
      form.submit();
      submitButton.disabled = false;
      submitButton.textContent = 'Опубликовать';
    }, 1000);
  }
};

// Обработчик клавиши Esc
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    // Не закрываем форму, если фокус в полях ввода
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
      return;
    }

    evt.preventDefault();
    hideEditForm();
  }
}

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

// Инициализация обработчиков событий
const initFormValidation = () => {
  uploadInput.addEventListener('change', onFileInputChange);
  cancelButton.addEventListener('click', onCancelButtonClick);
  form.addEventListener('submit', onFormSubmit);
  hashtagInput.addEventListener('keydown', onHashtagInputKeydown);
  commentInput.addEventListener('keydown', onCommentInputKeydown);
};

// Функция для удаления обработчиков (на случай уничтожения)
const destroyFormValidation = () => {
  uploadInput.removeEventListener('change', onFileInputChange);
  cancelButton.removeEventListener('click', onCancelButtonClick);
  form.removeEventListener('submit', onFormSubmit);
  hashtagInput.removeEventListener('keydown', onHashtagInputKeydown);
  commentInput.removeEventListener('keydown', onCommentInputKeydown);
  document.removeEventListener('keydown', onDocumentKeydown);
};

export { initFormValidation, destroyFormValidation, showEditForm, hideEditForm, validateHashtags, validateComment };