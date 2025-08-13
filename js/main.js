// main.js
import { generatePhotos } from './photos.js';
import { renderThumbnails } from './picture-thumbnails.js';


const photos = generatePhotos();
console.log(photos);

renderThumbnails(photos);
