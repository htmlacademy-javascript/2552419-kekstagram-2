import { resetEffects } from './effect-slider.js';
import { resetScale } from './scale-control.js';
import { isEscapeKey, debounce } from './utils.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

const formElement = document.querySelector('.img-upload__form');
const uploadInputElement = document.querySelector('#upload-file');
const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const cancelButtonElement = document.querySelector('#upload-cancel');
const hashtagInputElement = document.querySelector('.text__hashtags');
const commentInputElement = document.querySelector('.text__description');
const submitButtonElement = document.querySelector('#upload-submit');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

const getHashtagsArray = (value) => {
  return value.trim().split(/\s+/).filter((tag) => tag !== '');
};

const validateHashtagsEmpty = (value) => {
  if (!value.trim()) {
    return true;
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
    if (hashtag === '#') {
      return false;
    }

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

const validateCommentLength = (value) => value.length <= 140;

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

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    const errorModal = document.querySelector('.error');
    if (errorModal) {
      evt.stopPropagation();
      return;
    }

    if (document.activeElement === hashtagInputElement || document.activeElement === commentInputElement) {
      evt.stopPropagation();
      return;
    }

    evt.preventDefault();
    hideEditForm();
  }
};

const onHashtagInputKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    const errorModal = document.querySelector('.error');
    if (errorModal) {
      evt.stopPropagation();
    }
  }
};

const onCommentInputKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    const errorModal = document.querySelector('.error');
    if (errorModal) {
      evt.stopPropagation();
    }
  }
};

const showEditForm = () => {
  uploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideEditForm = () => {
  uploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  formElement.reset();
  pristine.reset();
  resetEffects();
  resetScale();
};

const onFileInputChange = () => {
  showEditForm();
};

const onCancelButtonClick = () => {
  hideEditForm();
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    submitButtonElement.disabled = true;
    submitButtonElement.textContent = 'Отправка...';

    try {
      const formData = new FormData(formElement);
      await sendData(formData);
      showSuccessMessage();
      hideEditForm();
    } catch (error) {
      showErrorMessage();
      console.error('Ошибка отправки формы:', error);
    } finally {
      submitButtonElement.disabled = false;
      submitButtonElement.textContent = 'Опубликовать';
    }
  }
};

const validateHashtagsDebounced = debounce(() => {
  pristine.validate(hashtagInputElement);
}, 300);

const initFormValidation = () => {
  uploadInputElement.addEventListener('change', onFileInputChange);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  formElement.addEventListener('submit', onFormSubmit);
  hashtagInputElement.addEventListener('keydown', onHashtagInputKeydown);
  commentInputElement.addEventListener('keydown', onCommentInputKeydown);
  hashtagInputElement.addEventListener('input', validateHashtagsDebounced);
};

const destroyFormValidation = () => {
  uploadInputElement.removeEventListener('change', onFileInputChange);
  cancelButtonElement.removeEventListener('click', onCancelButtonClick);
  formElement.removeEventListener('submit', onFormSubmit);
  hashtagInputElement.removeEventListener('keydown', onHashtagInputKeydown);
  commentInputElement.removeEventListener('keydown', onCommentInputKeydown);
  hashtagInputElement.removeEventListener('input', validateHashtagsDebounced);
  document.removeEventListener('keydown', onDocumentKeydown);
};

export { initFormValidation, destroyFormValidation };

