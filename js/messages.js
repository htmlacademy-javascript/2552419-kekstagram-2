import { isEscapeKey } from './utils.js';

const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success');
  const successElement = successTemplate.content.cloneNode(true);
  const successModal = successElement.querySelector('.success');
  const successButton = successElement.querySelector('.success__button');

  document.body.append(successElement);

  const onSuccessModalClose = () => {
    successModal.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  };

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onSuccessModalClose();
    }
  };

  const onDocumentClick = (evt) => {
    if (!evt.target.closest('.success__inner')) {
      onSuccessModalClose();
    }
  };

  successButton.addEventListener('click', onSuccessModalClose);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

const showErrorMessage = (customMessage = null) => {
  const errorTemplate = document.querySelector('#error');
  const errorElement = errorTemplate.content.cloneNode(true);
  const errorModal = errorElement.querySelector('.error');
  const errorButton = errorElement.querySelector('.error__button');
  const errorTitle = errorElement.querySelector('.error__title');

  if (customMessage && errorTitle) {
    errorTitle.textContent = customMessage;
  }

  document.body.append(errorElement);

  const onErrorModalClose = () => {
    errorModal.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  };

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onErrorModalClose();
    }
  };

  const onDocumentClick = (evt) => {
    if (!evt.target.closest('.error__inner')) {
      onErrorModalClose();
    }
  };

  errorButton.addEventListener('click', onErrorModalClose);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

export { showSuccessMessage, showErrorMessage };
