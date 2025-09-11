
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

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true; // хэштеги не обязательны
  }

  const hashtags = value.trim().split(/\s+/).filter(tag => tag !== '');

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

  const hashtags = value.trim().split(/\s+/).filter(tag => tag !== '');

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

// Добавление кастомных валидаторов
pristine.addValidator(
  hashtagInput,
  validateHashtags,
  getHashtagErrorMessage
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

export { initFormValidation };
