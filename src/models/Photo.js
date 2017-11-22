export default class Photo {
  constructor (id, title, description, src) {
    this.id = id
    this.title = title
    this.description = description
    this.src = src
  }

  static generateFlickrSrc (photo) {
    return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'
  }
}
