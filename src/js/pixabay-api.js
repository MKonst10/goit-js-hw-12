import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

export const fetchPhotos = async (searchedValue, page) => {
  const fetchParams = new URLSearchParams({
    q: searchedValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
    key: '45532957-9c3fb9f5acbf0ac0bdba7e21a',
  });

  const photos = await axios.get(`https://pixabay.com/api/?${fetchParams}`);
  return photos.data;
};
