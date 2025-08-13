// picture-thumbnails.js
const renderThumbnails = (photosData) => {
  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  photosData.forEach((photo) => {
    const thumbnail = pictureTemplate.cloneNode(true);

    thumbnail.querySelector('.picture__img').src = photo.url;
    thumbnail.querySelector('.picture__img').alt = photo.description;
    thumbnail.querySelector('.picture__likes').textContent = photo.likes;
    thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;

    // Сохраняем данные фото в элементе для последующего использования
    thumbnail.dataset.photoId = photo.id;

    fragment.appendChild(thumbnail);
  });

  picturesContainer.appendChild(fragment);
};

export { renderThumbnails };