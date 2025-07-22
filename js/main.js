// Функция для генерации случайного числа в диапазоне
const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Функция для создания массива уникальных ID
const generateUniqueIds = (count) => {
  const ids = new Set();
  while (ids.size < count) {
    ids.add(getRandomInteger(1, 1000));
  }
  return [...ids];
};

// Данные для генерации
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = ['Артём', 'Мария', 'Дмитрий', 'Анна', 'Сергей', 'Елена', 'Иван', 'Ольга', 'Алексей', 'Татьяна'];

const DESCRIPTIONS = [
  'Отличный момент!',
  'Закат на море',
  'Мой любимый питомец',
  'Семейное фото',
  'Путешествие по горам',
  'Городские огни',
  'Природа в её лучшем проявлении',
  'Архитектурный шедевр',
  'Уличное искусство',
  'Фото на память'
];

// Функция для генерации комментариев
const generateComments = (count) => {
  const commentIds = generateUniqueIds(count);
  return Array.from({length: count}, (_, i) => ({
    id: commentIds[i],
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
    name: NAMES[getRandomInteger(0, NAMES.length - 1)]
  }));
};

const generatePhotos = () => Array.from({length: 25}, (_, i) => ({
  id: i + 1,
  url: `photos/${i + 1}.jpg`,
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(15, 200),
  comments: generateComments(getRandomInteger(0, 30))
}));

// Генерация массива фотографий
const photos = generatePhotos();

// eslint-disable-next-line no-console
console.log(photos);
