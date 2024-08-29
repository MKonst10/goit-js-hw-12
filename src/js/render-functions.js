import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const gallery = document.querySelector('.gallery');

export const createGallery = data => {
  let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  let image = data.hits
    .map(
      hit =>
        `<div class="image-card"><a href="${hit.largeImageURL}"><img class="image" src="${hit.webformatURL}" alt="${hit.tags}" /></a><div class="wrapper"><div class="wrapper-text"><h5>Likes</h5><p>${hit.likes}</p></div><div class="wrapper-text"><h5>Views</h5><p>${hit.views}</p></div><div class="wrapper-text"><h5>Comments</h5><p>${hit.comments}</p></div><div class="wrapper-text"><h5>Downloads</h5><p>${hit.downloads}</p></div></div></div>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', image);
  lightbox.refresh();
};
