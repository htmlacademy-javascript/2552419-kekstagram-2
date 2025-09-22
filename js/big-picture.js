import { isEscapeKey } from './utils.js';

const COMMENTS_PER_PORTION = 5;

const bigPictureElement = document.querySelector('.big-picture');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCommentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const socialCommentShownCountElement = socialCommentCountElement.querySelector('.social__comment-shown-count');
const socialCommentTotalCountElement = socialCommentCountElement.querySelector('.social__comment-total-count');

let currentComments = [];
let commentsShown = 0;

const createComment = ({ avatar, name, message }) => {
  const commentElement = document.createElement('li');
  commentElement.className = 'social__comment';

  const avatarElement = document.createElement('img');
  avatarElement.className = 'social__picture';
  avatarElement.src = avatar;
  avatarElement.alt = name;
  avatarElement.width = 35;
  avatarElement.height = 35;

  const textElement = document.createElement('p');
  textElement.className = 'social__text';
  textElement.textContent = message;

  commentElement.append(avatarElement, textElement);

  return commentElement;
};

const renderCommentsPortion = () => {
  const commentsToShow = currentComments.slice(commentsShown, commentsShown + COMMENTS_PER_PORTION);
  const commentFragment = document.createDocumentFragment();

  commentsToShow.forEach((comment) => {
    commentFragment.append(createComment(comment));
  });

  socialCommentsElement.append(commentFragment);
  commentsShown += commentsToShow.length;

  socialCommentShownCountElement.textContent = commentsShown;
  socialCommentTotalCountElement.textContent = currentComments.length;

  commentsLoaderElement.classList.toggle('hidden', commentsShown >= currentComments.length);
};

// Сначала объявляем ВСЕ вспомогательные функции
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onCloseButtonClick = () => {
  closeBigPicture();
};

const onCommentsLoaderClick = () => {
  renderCommentsPortion();
};

// Потом основную функцию, которая их использует
const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  closeButtonElement.removeEventListener('click', onCloseButtonClick);
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);

  currentComments = [];
  commentsShown = 0;
};

const openBigPicture = (photo) => {
  const imageElement = bigPictureElement.querySelector('.big-picture__img img');
  const likesCountElement = bigPictureElement.querySelector('.likes-count');
  const captionElement = bigPictureElement.querySelector('.social__caption');

  imageElement.src = photo.url;
  imageElement.alt = photo.description;
  likesCountElement.textContent = photo.likes;
  captionElement.textContent = photo.description;

  currentComments = photo.comments;
  commentsShown = 0;
  socialCommentsElement.innerHTML = '';

  socialCommentCountElement.classList.remove('hidden');
  commentsLoaderElement.classList.remove('hidden');

  renderCommentsPortion();

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  closeButtonElement.addEventListener('click', onCloseButtonClick);
  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
};

export { openBigPicture };
