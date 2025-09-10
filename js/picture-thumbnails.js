// picture-thumbnails.js
import { openBigPicture } from './big-picture.js';

const renderThumbnails = (photosData) => {
  const picturesContainerElement = document.querySelector('.pictures');
  const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  photosData.forEach((photo) => {
    const thumbnail = pictureTemplateElement.cloneNode(true);

    thumbnail.querySelector('.picture__img').src = photo.url;
    thumbnail.querySelector('.picture__img').alt = photo.description;
    thumbnail.querySelector('.picture__likes').textContent = photo.likes;
    thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;

    // Добавляем обработчик клика для открытия полноразмерного изображения
    const onThumbnailClick = (evt) => {
      evt.preventDefault();
      openBigPicture(photo);
    };

    thumbnail.addEventListener('click', onThumbnailClick);

    fragment.appendChild(thumbnail);
  });

  picturesContainerElement.appendChild(fragment);
};

export { renderThumbnails };
