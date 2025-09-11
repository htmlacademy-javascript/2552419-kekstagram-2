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

// Функции для получения хэштегов из значения
const getHashtagsArray = (value) => {
  return value.trim().split(/\s+/).filter((tag) => tag !== '');
};

// Валидаторы для разных типов ошибок хэштегов
const validateHashtagsEmpty = (value) => {
  if (!value.trim()) {
    return true; // хэштеги не обязательны
  }
  return getHashtagsArray(value).length > 0;
};

const validateHashtagsCount = (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = getHashtagsArray(value);
  return hashtags.length <= 5;
};

const validateHashtagsFormat = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = getHashtagsArray(value);
  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

  for (const hashtag of hashtags) {
    // Проверка на пустой хэштег (только решетка)
    if (hashtag === '#') {
      return false;
    }

    // Проверка формата хэштега
    if (!hashtagRegex.test(hashtag)) {
      return false;
    }
  }

  return true;
};

const validateHashtagsLength = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = getHashtagsArray(value);

  for (const hashtag of hashtags) {
    if (hashtag.length > 20) {
      return false;
    }
  }

  return true;
};

const validateHashtagsUniqueness = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = getHashtagsArray(value);
  const uniqueHashtags = new Set(hashtags.map((tag) => tag.toLowerCase()));
  return uniqueHashtags.size === hashtags.length;
};

// Функция валидации комментария
const validateCommentLength = (value) => value.length <= 140;

// Добавление кастомных валидаторов с разными сообщениями
pristine.addValidator(
  hashtagInputElement,
  validateHashtagsEmpty,
  'Хэштег не может состоять только из одной решётки',
  1,
  false
);

pristine.addValidator(
  hashtagInputElement,
  validateHashtagsCount,
  'Нельзя указать больше пяти хэштегов',
  2,
  false
);

pristine.addValidator(
  hashtagInputElement,
  validateHashtagsFormat,
  'Хэштег должен начинаться с # и содержать только буквы и цифры без пробелов и спецсимволов',
  3,
  false
);

pristine.addValidator(
  hashtagInputElement,
  validateHashtagsLength,
  'Максимальная длина одного хэштега - 20 символов, включая решётку',
  4,
  false
);

pristine.addValidator(
  hashtagInputElement,
  validateHashtagsUniqueness,
  'Один и тот же хэштег не может быть использован дважды (регистр не учитывается)',
  5,
  false
);

pristine.addValidator(
  commentInputElement,
  validateCommentLength,
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
      // В реальном коде здесь будет fetch запрос
      console.log('Форма отправлена');
      hideEditForm();
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

export { initFormValidation, destroyFormValidation };
