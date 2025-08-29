// big-picture.js
import { isEscapeKey } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialCommentShownCount = socialCommentCount.querySelector('.social__comment-shown-count');
const socialCommentTotalCount = socialCommentCount.querySelector('.social__comment-total-count');

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

  commentsToShow.forEach(comment => {
    socialComments.appendChild(createComment(comment));
  });

  commentsShown += commentsToShow.length;
  socialCommentShownCount.textContent = commentsShown;
  socialCommentTotalCount.textContent = currentComments.length;

  // Скрываем кнопку, если все комментарии показаны
  if (commentsShown >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

// Обработчик клика по кнопке "Загрузить ещё"
const onCommentsLoaderClick = () => {
  renderCommentsPortion();
};

// Функция открытия полноразмерного изображения
const openBigPicture = (photo) => {
  // Сбрасываем состояние
  commentsShown = 0;
  currentComments = photo.comments;
  socialComments.innerHTML = '';

  // Заполняем данные
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.big-picture__img img').alt = photo.description;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  // Показываем блоки счётчика комментариев и загрузки
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  // Отрисовываем первую порцию комментариев
  renderCommentsPortion();

  // Показываем окно
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Добавляем обработчики событий
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

// Функция закрытия полноразмерного изображения
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // Удаляем обработчики событий
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
};

// Обработчик клавиши Esc
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

// Обработчик клика по кнопке закрытия
function onCloseButtonClick() {
  closeBigPicture();
}

export { openBigPicture };