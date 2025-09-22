import { isEscapeKey } from './utils.js';

const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success');
  const successElement = successTemplate.content.cloneNode(true);
  const successModal = successElement.querySelector('.success');
  const successButton = successElement.querySelector('.success__button');

  document.body.append(successElement);

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onCloseSuccessModal();
    }
  };

  const onDocumentClick = (evt) => {
    if (!evt.target.closest('.success__inner')) {
      onCloseSuccessModal();
    }
  };

  const onCloseSuccessModal = () => {
    successModal.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  };

  const onSuccessButtonClick = () => {
    onCloseSuccessModal();
  };

  successButton.addEventListener('click', onSuccessButtonClick);
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

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onCloseErrorModal();
    }
  };

  const onDocumentClick = (evt) => {
    if (!evt.target.closest('.error__inner')) {
      onCloseErrorModal();
    }
  };

  const onCloseErrorModal = () => {
    errorModal.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  };

  const onErrorButtonClick = () => {
    onCloseErrorModal();
  };

  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

export { showSuccessMessage, showErrorMessage };
