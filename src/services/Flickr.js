import FlickrApiUrlGenerator from '../services/FlickrApiUrlGenerator'
import http from 'request-promise'

export default class Flickr {
  constructor (apiKey, userId) {
    this.urlGenerator = new FlickrApiUrlGenerator(apiKey)
    this.userId = userId
  }
  getPeopleInfo (params) {
    let defaultParams = {
      user_id: this.userId
    }
    return http({
      uri: this.urlGenerator.getUrl('flickr.people.getInfo', Object.assign(defaultParams, params)),
      json: true
    })
  }
  getProfile (params) {
    let defaultParams = {
      user_id: this.userId
    }
    return http({
      uri: this.urlGenerator.getUrl('flickr.profile.getProfile', Object.assign(defaultParams, params)),
      json: true
    })
  }
  searchPhotos (params) {
    let defaultParams = {
      user_id: this.userId,
      tags: '',
      media: 'photos'
    }
    return http({
      uri: this.urlGenerator.getUrl('flickr.photos.search', Object.assign(defaultParams, params)),
      json: true
    })
  }
  getUserTags (params) {
    let defaultParams = {
      user_id: this.userId
    }
    return http({
      uri: this.urlGenerator.getUrl('flickr.tags.getListUser', Object.assign(defaultParams, params)),
      json: true
    })
  }
}
