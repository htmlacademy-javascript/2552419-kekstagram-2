// photos.js
import { getRandomInteger } from './utils.js';
import { DESCRIPTIONS } from './data.js';
import { generateComments } from './comments.js';

export const generatePhotos = () => Array.from({length: 25}, (_, i) => ({
  id: i + 1,
  url: `photos/${i + 1}.jpg`,
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(15, 200),
  comments: generateComments(getRandomInteger(0, 30))
}));