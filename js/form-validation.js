import { resetEffects } from './effect-slider.js';
import { resetScale } from './scale-control.js';
import { isEscapeKey, debounce } from './utils.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const VALID_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const formElement = document.querySelector('.img-upload__form');
const uploadInputElement = document.querySelector('#upload-file');
const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const cancelButtonElement = document.querySelector('#upload-cancel');
const hashtagInputElement = document.querySelector('.text__hashtags');
const commentInputElement = document.querySelector('.text__description');
const submitButtonElement = document.querySelector('#upload-submit');
const imagePreviewElement = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

const getHashtagsArray = (value) => value.trim().split(/\s+/).filter((tag) => tag !== '');

const validateHashtagFormat = (hashtag) => {
  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;
  return hashtagRegex.test(hashtag);
};

const validateHashtagCount = (hashtags) => hashtags.length <= MAX_HASHTAG_COUNT;

const validateHashtagUniqueness = (hashtags) => {
  const uniqueHashtags = new Set(hashtags.map((tag) => tag.toLowerCase()));
  return uniqueHashtags.size === hashtags.length;
};

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = getHashtagsArray(value);

  if (!validateHashtagCount(hashtags)) {
    return false;
  }

  if (!validateHashtagUniqueness(hashtags)) {
    return false;
  }

  return hashtags.every((hashtag) => {
    if (hashtag === '#') {
      return false;
    }
    return validateHashtagFormat(hashtag);
  });
};

const getHashtagErrorMessage = (value) => {
  if (!value.trim()) {
    return '';
  }

  const hashtags = getHashtagsArray(value);

  if (!validateHashtagCount(hashtags)) {
    return 'Нельзя указать больше пяти хэштегов';
  }

  if (!validateHashtagUniqueness(hashtags)) {
    return 'Один и тот же хэштег не может быть использован дважды';
  }

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

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

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

const loadUserImage = (file) => {
  const reader = new FileReader();

  const onLoad = () => {
    const result = reader.result;
    imagePreviewElement.src = result;
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${result})`;
    });
  };

  reader.addEventListener('load', onLoad);
  reader.readAsDataURL(file);
};

const isValidFileType = (file) => VALID_FILE_TYPES.includes(file.type);

// Сначала объявляем onDocumentKeydown
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

// Затем объявляем hideEditForm
const hideEditForm = () => {
  uploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  formElement.reset();
  pristine.reset();
  resetEffects();
  resetScale();
  imagePreviewElement.src = '';
  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = '';
  });
  uploadInputElement.value = '';
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

const onFileInputChange = (evt) => {
  const file = evt.target.files[0];

  if (!file) {
    return;
  }

  if (!isValidFileType(file)) {
    showErrorMessage('Пожалуйста, выберите файл изображения (JPEG, PNG, WebP или GIF)');
    uploadInputElement.value = '';
    return;
  }

  loadUserImage(file);
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

