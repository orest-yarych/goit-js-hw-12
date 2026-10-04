import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery, PAGE_SIZE } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  hideLoadMoreButton,
  refs,
  showLoader,
  showLoadMoreButton,
} from './js/render-functions';

let currentPage = 1;
let query = '';
let totalPages = 0;

refs.form.addEventListener('submit', onFormSubmit);

async function onFormSubmit(event) {
  event.preventDefault();
  query = event.currentTarget.elements['search-text'].value.trim();
  if (!query) {
    return;
  }
  currentPage = 1;
  totalPages = 0;
  clearGallery();
  hideLoadMoreButton();
  showLoader();
  try {
    let { hits: images, totalHits } = await getImagesByQuery(
      query,
      currentPage
    );

    if (totalHits > 0) {
      totalPages = Math.ceil(totalHits / PAGE_SIZE);
      createGallery(images);
      checkLoadMoreBtnStatus();
    } else {
      showError(
        `Sorry, there are no images matching your ${query}. Please try again!`
      );
    }
  } catch (error) {
    showError(error);
  }
  hideLoader();
}

refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

async function onLoadMoreBtnClick() {
  currentPage++;
  hideLoadMoreButton();
  showLoader();
  try {
    let { hits: images } = await getImagesByQuery(query, currentPage);
    createGallery(images);
    scrollCards();
  } catch (error) {
    showError(error);
  }
  hideLoader();
  checkLoadMoreBtnStatus();
}

function showError(message) {
  iziToast.error({
    position: 'topRight',
    message,
  });
}

function showInfo(message) {
  iziToast.info({
    position: 'topRight',
    message,
  });
}

function checkLoadMoreBtnStatus() {
  if (currentPage >= totalPages) {
    hideLoadMoreButton();
    showInfo("We're sorry, but you've reached the end of search results.");
  } else {
    showLoadMoreButton();
  }
}

function scrollCards() {
  const card = document.querySelector('.gallery-item');
  const { height } = card.getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
