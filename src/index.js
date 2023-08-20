import axios from 'axios';
import Notiflix from 'notiflix';
import NewsApiService from './news-api-service';

const refs = {
  searchForm: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
  divGallery: document.querySelector('.gallery'),
};
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.loadMoreBtn.style.display = 'none';

function onSearch(e) {
  e.preventDefault();
  newsApiService.query = e.currentTarget.elements.searchQuery.value;
  if (newsApiService.query === '') {
    return onErorr();
  }
  newsApiService.resetPage();

  // первый запрос на сервер
  newsApiService
    .fetchArticles()
    .then(data => renderArticles(data))
    .then(data => {
      // console.log(data.length);
      // console.log(newsApiService.totalHits);

      // if (data.length === newsApiService.totalHits) {
      //   // refs.loadMoreBtn.style.display = 'none';
      //   Notiflix.Notify.info(
      //     `We're sorry, but you've reached the end of search results.`
      //   );
      // }

      Notiflix.Notify.info(
        `Hooray! We found ${newsApiService.totalHits} images.`
      );
      articlesContainer();
      appendArticklesMarkup(data);
      refs.loadMoreBtn.style.display = 'block';
    });
}

// Повторный запрос на сервер на кнопке
function onLoadMore(e) {
  newsApiService
    .fetchArticles()
    .then(data => {
      console.log(data.length);
      console.log(newsApiService.totalHits);

      if (data.length === newsApiService.totalHits) {
        // refs.loadMoreBtn.style.display = 'none';
        Notiflix.Notify.info(
          `We're sorry, but you've reached the end of search results.`
        );
      }

      return renderArticles(data);
    })
    .then(data => appendArticklesMarkup(data));
}

// прописываем шаблон для разметки
function renderArticles(hits) {
  const imageHit = hits.map(
    hit =>
      `
     
     <div class="photo-card">
    <img src="${hit.largeImageURL}" alt="${hit.tags}" width=400px loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>likes:${hit.likes}</b>
      </p>
      <p class="info-item">
        <b>Views:${hit.views}</b>
      </p>
      <p class="info-item">
        <b>Comments: ${hit.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads:${hit.downloads}</b>
      </p>
    </div>
  </div> 
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
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

// сравниваем кол-во загруженых картинок с  тоталхитс
function loadQuantity() {
 
}
