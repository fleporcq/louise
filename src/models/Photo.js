export default class Photo {
  constructor (title, description, src) {
    this.title = title
    this.description = description
    this.src = src
  }

  static generateFlickrSrc (photo) {
    return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'
  }
}
