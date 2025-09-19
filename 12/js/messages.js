import { isEscapeKey } from './utils.js';

// Функция для показа сообщения об успехе
const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success');
  const successElement = successTemplate.content.cloneNode(true);
  const successModal = successElement.querySelector('.success');
  const successButton = successElement.querySelector('.success__button');

  document.body.appendChild(successElement);

  const closeSuccessModal = () => {
    successModal.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  };

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeSuccessModal();
    }
  };

  const onDocumentClick = (evt) => {
    if (!evt.target.closest('.success__inner')) {
      closeSuccessModal();
    }
  };

  successButton.addEventListener('click', closeSuccessModal);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

// Функция для показа сообщения об ошибке
const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error');
  const errorElement = errorTemplate.content.cloneNode(true);
  const errorModal = errorElement.querySelector('.error');
  const errorButton = errorElement.querySelector('.error__button');

  document.body.appendChild(errorElement);

  const closeErrorModal = () => {
    errorModal.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  };

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeErrorModal();
    }
  };

  const onDocumentClick = (evt) => {
    if (!evt.target.closest('.error__inner')) {
      closeErrorModal();
    }
  };

  errorButton.addEventListener('click', closeErrorModal);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

export { showSuccessMessage, showErrorMessage };
