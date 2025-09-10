import { generatePhotos } from './photos.js';
import { renderThumbnails } from './picture-thumbnails.js';
import { initFormValidation } from './form-validation.js';
import { initEffects } from './effect-slider.js';
import { initScale } from './scale-control.js';

const photos = generatePhotos();
renderThumbnails(photos);
initFormValidation();
initEffects();
initScale();

