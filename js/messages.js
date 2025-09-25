import { isEscapeKey } from './utils.js';

function showSuccessMessage() {
  const successTemplate = document.querySelector('#success');
  const successElement = successTemplate.content.cloneNode(true);
  const successModal = successElement.querySelector('.success');
  const successButton = successElement.querySelector('.success__button');

  document.body.append(successElement);

  function onDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onSuccessModalClose();
    }
  }

  function onDocumentClick(evt) {
    if (!evt.target.closest('.success__inner')) {
      onSuccessModalClose();
    }
  }

  function onSuccessModalClose() {
    successModal.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  }

  successButton.addEventListener('click', onSuccessModalClose);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
}

function showErrorMessage(customMessage = null) {
  const errorTemplate = document.querySelector('#error');
  const errorElement = errorTemplate.content.cloneNode(true);
  const errorModal = errorElement.querySelector('.error');
  const errorButton = errorElement.querySelector('.error__button');
  const errorTitle = errorElement.querySelector('.error__title');

  if (customMessage && errorTitle) {
    errorTitle.textContent = customMessage;
  }

  document.body.append(errorElement);

  function onDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onErrorModalClose();
    }
  }

  function onDocumentClick(evt) {
    if (!evt.target.closest('.error__inner')) {
      onErrorModalClose();
    }
  }

  function onErrorModalClose() {
    errorModal.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  }

  errorButton.addEventListener('click', onErrorModalClose);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
}

export { showSuccessMessage, showErrorMessage };

