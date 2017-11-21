import FlickrApiUrlGenerator from '../services/FlickrApiUrlGenerator'
import Vue from 'vue'

export default class Flickr {
  constructor (apiKey, userId) {
    this.urlGenerator = new FlickrApiUrlGenerator(apiKey)
    this.userId = userId
  }
  searchPhotos (params) {
    let defaultParams = {
      user_id: this.userId,
      tags: '',
      extras: 'description'
    }
    let url = this.urlGenerator.getUrl('flickr.photos.search', Object.assign(defaultParams, params))
    return Vue.http.get(url)
  }
  getUserTags (params) {
    let defaultParams = {
      user_id: this.userId
    }
    let url = this.urlGenerator.getUrl('flickr.tags.getListUser', Object.assign(defaultParams, params))
    return Vue.http.get(url)
  }
}
