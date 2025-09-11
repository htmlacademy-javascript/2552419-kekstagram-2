import { generatePhotos } from './photos.js';
import { renderThumbnails } from './picture-thumbnails.js';
import { initFormValidation } from './form-validation.js';

const photos = generatePhotos();
renderThumbnails(photos);

initFormValidation();
