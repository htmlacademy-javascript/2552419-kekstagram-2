// photos.js
import { PHOTOS_COUNT, DESCRIPTIONS, MIN_LIKES, MAX_LIKES, MIN_COMMENTS, MAX_COMMENTS } from './constants.js';
import { getRandomInteger } from './utils.js';
import { generateComments } from './comments.js';

 const generatePhotos = () => Array.from({length: PHOTOS_COUNT}, (_, i) => ({
  id: i + 1,
  url: `photos/${i + 1}.jpg`,
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: generateComments(getRandomInteger(MIN_COMMENTS, MAX_COMMENTS))
}));

export {generatePhotos};