export default class NewsApiService{
    constructor(){}
    fetchArticles(){
        const url =`https://pixabay.com/api/?q=${searchQuery}&key=38261227-21424640981700fd9c4931e5f&image_type=photo&orientation=horizontal&safesearch=true`;

        fetch(url)
        .then(response =>response.json())
        .then(console.log);
        }
}