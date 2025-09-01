import { generateUniqueIds } from './utils.js';
import { MESSAGES, NAMES, MIN_AVATAR_NUM, MAX_AVATAR_NUM } from './constants.js';
import { getRandomInteger } from './utils.js';

const generateComments = (count) => {
  const commentIds = generateUniqueIds(count);
  return Array.from({length: count}, (_, i) => ({
    id: commentIds[i],
    avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_NUM, MAX_AVATAR_NUM)}.svg`,
    message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
    name: NAMES[getRandomInteger(0, NAMES.length - 1)]
  }));
};

export {generateComments};