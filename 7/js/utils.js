import { MIN_ID, MAX_ID } from './constants.js';

export function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateUniqueIds = (count) => {
  const ids = new Set();
  while (ids.size < count) {
    ids.add(getRandomInteger(MIN_ID, MAX_ID));
  }
  return [...ids];
};