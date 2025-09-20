import { debounce } from './utils.js';
import { renderThumbnails } from './picture-thumbnails.js';

const RANDOM_PHOTOS_COUNT = 10;
const FILTER_DEBOUNCE_DELAY = 500;

const filtersContainer = document.querySelector('.img-filters');
const filterButtons = filtersContainer.querySelectorAll('.img-filters__button');
let currentPhotos = [];

const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const showFilters = () => {
  filtersContainer.classList.remove('img-filters--inactive');
};

const getRandomPhotos = (photos) => {
  const shuffled = photos.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, RANDOM_PHOTOS_COUNT);
};

const getDiscussedPhotos = (photos) => {
  return photos.slice().sort((a, b) => b.comments.length - a.comments.length);
};

const applyFilter = (filterType) => {
  let filteredPhotos = [];

  switch (filterType) {
    case FilterType.RANDOM:
      filteredPhotos = getRandomPhotos(currentPhotos);
      break;
    case FilterType.DISCUSSED:
      filteredPhotos = getDiscussedPhotos(currentPhotos);
      break;
    case FilterType.DEFAULT:
    default:
      filteredPhotos = currentPhotos;
  }

  renderThumbnails(filteredPhotos);
};

const debouncedApplyFilter = debounce(applyFilter, FILTER_DEBOUNCE_DELAY);

const onFilterButtonClick = (evt) => {
  const target = evt.target;

  if (!target.matches('.img-filters__button')) {
    return;
  }

  const activeButton = filtersContainer.querySelector('.img-filters__button--active');
  if (activeButton) {
    activeButton.classList.remove('img-filters__button--active');
  }

  target.classList.add('img-filters__button--active');
  debouncedApplyFilter(target.id);
};

const initFilters = (photos) => {
  currentPhotos = photos;
  showFilters();

  filtersContainer.addEventListener('click', onFilterButtonClick);
};

export { initFilters };
