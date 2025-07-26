import { generateUniqueIds, getRandomInteger } from './utils.js';
import { MESSAGES, NAMES } from './data.js';

export const generateComments = (count) => {
  const commentIds = generateUniqueIds(count);
  return Array.from({length: count}, (_, i) => ({
    id: commentIds[i],
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
    name: NAMES[getRandomInteger(0, NAMES.length - 1)]
  }));
};