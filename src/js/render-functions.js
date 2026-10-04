import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

export const refs = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.form'),
  loader: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};

export function clearGallery() {
  refs.gallery.innerHTML = '';
}

export function createGallery(images) {
  const markup = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
            <a class="gallery-item-link" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}"></a>
            <ul class="gallery-img-info">
              <li class="gallery-info-item">Likes <span>${likes}</span></li>
              <li class="gallery-info-item">Views <span>${views}</span></li>
              <li class="gallery-info-item">Comments <span>${comments}</span></li>
              <li class="gallery-info-item">Downloads <span>${downloads}</span></li>
            </ul>
      </li>`
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function showLoader() {
  refs.loader.classList.add('show');
}

export function hideLoader() {
  refs.loader.classList.remove('show');
}

export function showLoadMoreButton() {
  refs.loadMoreBtn.classList.add('show');
}

export function hideLoadMoreButton() {
  refs.loadMoreBtn.classList.remove('show');
}
