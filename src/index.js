import axios from 'axios';
import NewsApiService from './news-api-service';

const refs = {
    searchForm: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    divGallery: document.querySelector('.gallery'),
}
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

let searchQuery = '';

function onSearch (e) {
    e.preventDefault();
    newsApiService.query = e.currentTarget.elements.searchQuery.value;
    newsApiService.resetPage();

    newsApiService.fetchArticles()
    .then(data => renderArticles(data))
    .then(appendArticklesMarkup);
}

function onLoadMore(e) {
    newsApiService.fetchArticles()
    .then(data => renderArticles(data))
    .then(appendArticklesMarkup);  
}


// / webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// tags - строка с описанием изображения. Подойдет для атрибута alt.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
// downloads - количество загрузок.
let imageHit = '';
function renderArticles(hits) {

    const imageHit = hits.map(hit => `
     
    /* <div class="photo-card">
    <img src="${hit.largeImageURL}" alt="${hit.tags}" width=400px loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>${hit.likes}</b>
      </p>
      <p class="info-item">
        <b>${hit.views}</b>
      </p>
      <p class="info-item">
        <b>${hit.comments}</b>
      </p>
      <p class="info-item">
        <b>${hit.downloads}</b>
      </p>
    </div>
  </div> */
     `
      );

      return imageHit;
}

function appendArticklesMarkup(text) {
    refs.divGallery.innerHTML = text;
    
}
// function appendArticlesLoadMore(text) {
//     refs.divGallery.insertAdjacentHTML('beforeend', )
// }