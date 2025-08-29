// big-picture.js
import { isEscapeKey } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

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

// Функция для отрисовки всех комментариев
const renderComments = (comments) => {
  socialComments.innerHTML = '';
  comments.forEach(comment => {
    socialComments.appendChild(createComment(comment));
  });
};

// Функция открытия полноразмерного изображения
const openBigPicture = (photo) => {
  // Заполняем данные
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.big-picture__img img').alt = photo.description;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.social__comment-total-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  // Отрисовываем комментарии
  renderComments(photo.comments);

  // Скрываем блоки счётчика комментариев и загрузки
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  // Показываем окно
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Добавляем обработчики событий
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);
};

// Функция закрытия полноразмерного изображения
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // Удаляем обработчики событий
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
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

// Экспортируем функцию для открытия полноразмерного изображения
export { openBigPicture };