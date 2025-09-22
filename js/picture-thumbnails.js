import { openBigPicture } from './big-picture.js';

const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const clearThumbnails = () => {
  const existingPictures = picturesContainerElement.querySelectorAll('.picture');
  existingPictures.forEach((picture) => picture.remove());
};

const renderThumbnails = (photosData) => {
  clearThumbnails();

  const fragment = document.createDocumentFragment();

  photosData.forEach((photo) => {
    const thumbnail = pictureTemplateElement.cloneNode(true);
    const imageElement = thumbnail.querySelector('.picture__img');
    const likesElement = thumbnail.querySelector('.picture__likes');
    const commentsElement = thumbnail.querySelector('.picture__comments');

    imageElement.src = photo.url;
    imageElement.alt = photo.description;
    likesElement.textContent = photo.likes;
    commentsElement.textContent = photo.comments.length;

    const onThumbnailClick = (evt) => {
      evt.preventDefault();
      openBigPicture(photo);
    };

    thumbnail.addEventListener('click', onThumbnailClick);
    fragment.append(thumbnail);
  });

  picturesContainerElement.append(fragment);
};

export { renderThumbnails };
