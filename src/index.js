import axios from 'axios';
import NewsApiService from './news-api-service';

const refs = {
    searchForm: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
}
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

let searchQuery = '';

function onSearch (e) {
    e.preventDefault();
    const searchQuery = e.currentTarget.elements.searchQuery.value;
    
    const url =`https://pixabay.com/api/?q=${searchQuery}&key=38261227-21424640981700fd9c4931e5f&image_type=photo&orientation=horizontal&safesearch=true`;
    
    fetch(url)
    .then(response =>response.json())
    .then(console.log);
}

function onLoadMore(e) {
   
}
