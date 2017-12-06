import moment from 'moment'

export default class Photo {
  constructor (id) {
    this.id = id
    this.title = null
    this.description = null
    this.date = null
    this.year = null
    this.src = null
  }

  static generateFlickrSrc (photo, size) {
    return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg'
  }

  static createFromFlickr (photoF) {
    let photo = new Photo(photoF.id)
    photo.title = photoF.title
    photo.description = photoF.description._content
    if (photoF.datetakenunknown === '0') {
      photo.date = photoF.datetaken
      photo.year = moment(photo.date).format('YYYY')
    }
    photo.src = Photo.generateFlickrSrc(photoF)
    return photo
  }
}
