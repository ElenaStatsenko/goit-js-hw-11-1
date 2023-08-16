import axios from 'axios';
import Notiflix from 'notiflix';
import NewsApiService from './news-api-service';

const refs = {
    searchForm: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    divGallery: document.querySelector('.gallery'),
}
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch (e) {
    e.preventDefault();
   
    newsApiService.query = e.currentTarget.elements.searchQuery.value;
    if(newsApiService.query==='') {
      return onErorr()
    } else {
      Notiflix.Notify.info(`Hooray! We found ${newsApiService.hits} images.`);
    }
    newsApiService.resetPage();

    newsApiService.fetchArticles()
    .then(data => renderArticles(data))
    .then(data => {
       articlesContainer();
      appendArticklesMarkup(data)});
}

function onLoadMore(e) {
    newsApiService.fetchArticles()
    .then(data => renderArticles(data))
    .then(appendArticklesMarkup);  
}

let imageHit = '';
// прописіваем шаблон для разметки
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
// рендер разметки
function appendArticklesMarkup(text) {
    refs.divGallery.innerHTML = text;
    
}
// очищаем контейнер с картинками при новом запросе
function articlesContainer() {
  refs.divGallery.innerHTML = '';
}
function onErorr() {
  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}