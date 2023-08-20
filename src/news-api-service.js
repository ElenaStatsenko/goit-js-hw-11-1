export default class NewsApiService {
  constructor() {
    // в конструкторе задаем значение глобальной переменной
    this.searchQuery = '';
    this.page = 1;
    this.totalHits = 0;
  }

  fetchArticles() {
    // console.log('до запроса', this);
    const url = `https://pixabay.com/api/?q=${this.searchQuery}&key=38261227-21424640981700fd9c4931e5f&per_page=40&page=${this.page}&image_type=photo&orientation=horizontal&safesearch=true`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.addTotalHits(data);
        this.incrementPage();
        return data.hits;
      });
  }
  // увеличиваем страницу на 1 при каждом успешном запросе
  incrementPage() {
    this.page += 1;
  }
  // сбрасываем страничку при новом запросе
  resetPage() {
    this.page = 1;
  }
  // добавлем геттер
  get query() {
    return this.searchQuery;
  }
  // перезаписываем значение сеттером
  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  addTotalHits(data) {
    return (this.totalHits = data.totalHits);
  }
}
