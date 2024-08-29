import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchPhotos } from './js/pixabay-api';
import { createGallery } from './js/render-functions';

const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('.form');
const requestInput = document.querySelector('.search-input');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');
let searchedValue = '';
let page = 1;
let totalPhotos = 0;
let cardHeight = 0;

const onFormSubmit = async event => {
  try {
    event.preventDefault();
    gallery.innerHTML = '';
    page = 1;
    totalPhotos = 0;
    loadMoreBtn.classList.add('is-hidden');
    if (requestInput.value === '') {
      iziToast.error({
        message: 'Enter your request',
        close: 'true',
        position: 'topRight',
        color: '#ef4040',
        messageColor: 'white',
      });
    } else {
      searchedValue = requestInput.value;
      loader.classList.remove('is-hidden');
      const response = await fetchPhotos(searchedValue, page);
      totalPhotos += response.hits.length;

      if (response.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          close: 'true',
          position: 'topRight',
          color: '#ef4040',
          messageColor: 'white',
        });
        loadMoreBtn.classList.add('is-hidden');
        loader.classList.add('is-hidden');
        searchForm.reset();
        return;
      } else if (totalPhotos === response.totalHits) {
        loadMoreBtn.classList.add('is-hidden');
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          close: 'true',
          position: 'topRight',
        });
      } else {
        loadMoreBtn.classList.remove('is-hidden');
      }
      createGallery(response);
      const galleryCard = gallery.querySelector('div');
      cardHeight = galleryCard.getBoundingClientRect().height;
      loader.classList.add('is-hidden');
    }
  } catch (error) {
    iziToast.error({
      message: `An error ${error} occurred`,
      close: 'true',
      position: 'topRight',
      color: '#ef4040',
      messageColor: 'white',
    });
  }
  searchForm.reset();
};

const onLoadMoreBtnClick = async () => {
  try {
    page++;
    loader.classList.remove('is-hidden');
    loadMoreBtn.classList.add('is-hidden');
    const response = await fetchPhotos(searchedValue, page);
    totalPhotos += response.hits.length;
    if (response.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        close: 'true',
        position: 'topRight',
        color: '#ef4040',
        messageColor: 'white',
      });
    }
    createGallery(response);
    scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
    loader.classList.add('is-hidden');
    loadMoreBtn.classList.remove('is-hidden');
    if (totalPhotos == response.totalHits) {
      loadMoreBtn.classList.add('is-hidden');
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        close: 'true',
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: `An error ${error} occurred`,
      close: 'true',
      position: 'topRight',
      color: '#ef4040',
      messageColor: 'white',
    });
  }
};

searchForm.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
