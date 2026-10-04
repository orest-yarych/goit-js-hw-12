import axios from 'axios';

const API_KEY = '16575326-2aaf0836bf0e7c9f61deb233c';
export const PAGE_SIZE = 15;

export async function getImagesByQuery(query, page = 1) {
  const response = await axios('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: query,
      page,
      per_page: PAGE_SIZE,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
  console.log(response.data);
  return response.data;
}
