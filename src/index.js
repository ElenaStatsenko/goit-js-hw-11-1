
// key - твой уникальный ключ доступа к API.
// q - термин для поиска. То, что будет вводить пользователь.
// image_type - тип изображения. Мы хотим только фотографии, поэтому задай значение photo.
// orientation - ориентация фотографии. Задай значение horizontal.
// safesearch - фильтр по возрасту. Задай значение true.

fetch('https://pixabay.com/api/?key=38261227-21424640981700fd9c4931e5f&image_type=photo&orientation=horizontal&safesearch=true')
.then(response =>response.json())
.then(console.log);