import { isEscapeKey } from './utils.js';

const bigPictureElement = document.querySelector('.big-picture');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCommentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const socialCommentShownCountElement = socialCommentCountElement.querySelector('.social__comment-shown-count');
const socialCommentTotalCountElement = socialCommentCountElement.querySelector('.social__comment-total-count');

let currentComments = [];
let commentsShown = 0;
const COMMENTS_PER_PORTION = 5;

// Функция для создания одного комментария
const createComment = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.className = 'social__comment';

  const avatar = document.createElement('img');
  avatar.className = 'social__picture';
  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  avatar.width = 35;
  avatar.height = 35;

  const text = document.createElement('p');
  text.className = 'social__text';
  text.textContent = comment.message;

  commentElement.appendChild(avatar);
  commentElement.appendChild(text);

  return commentElement;
};

// Функция для отрисовки порции комментариев
const renderCommentsPortion = () => {
  const commentsToShow = currentComments.slice(commentsShown, commentsShown + COMMENTS_PER_PORTION);

  commentsToShow.forEach((comment) => {
    socialCommentsElement.appendChild(createComment(comment));
  });

  commentsShown += commentsToShow.length;
  socialCommentShownCountElement.textContent = commentsShown;
  socialCommentTotalCountElement.textContent = currentComments.length;

  // Скрываем кнопку, если все комментарии показаны
  if (commentsShown >= currentComments.length) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
};

// Обработчик клика по кнопке "Загрузить ещё"
const onCommentsLoaderClick = () => {
  renderCommentsPortion();
};

// Обработчик клавиши Esc
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Обработчик клика по кнопке закрытия
const onCloseButtonClick = () => {
  closeBigPicture();
};

// Функция закрытия полноразмерного изображения
const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // Удаляем обработчики событий
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButtonElement.removeEventListener('click', onCloseButtonClick);
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
};

// Функция открытия полноразмерного изображения
const openBigPicture = (photo) => {
  // Сбрасываем состояние
  commentsShown = 0;
  currentComments = photo.comments;
  socialCommentsElement.innerHTML = '';

  // Заполняем данные
  bigPictureElement.querySelector('.big-picture__img img').src = photo.url;
  bigPictureElement.querySelector('.big-picture__img img').alt = photo.description;
  bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
  bigPictureElement.querySelector('.social__caption').textContent = photo.description;

  // Показываем блоки счётчика комментариев и загрузки
  socialCommentCountElement.classList.remove('hidden');
  commentsLoaderElement.classList.remove('hidden');

  // Отрисовываем первую порцию комментариев
  renderCommentsPortion();

  // Показываем окно
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Добавляем обработчики событий
  document.addEventListener('keydown', onDocumentKeydown);
  closeButtonElement.addEventListener('click', onCloseButtonClick);
  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
};

export { openBigPicture };
