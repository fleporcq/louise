export default class FlickrApiUrlGenerator {
  static get BASE_URL () { return 'https://api.flickr.com/services/rest/' }

  defaultParams = {
    format: 'json',
    nojsoncallback: 1
  }

  constructor (apiKey) {
    this.apiKey = apiKey
  }

  getUrl (method, params) {
    return FlickrApiUrlGenerator.BASE_URL + '?method=' + method + '&api_key=' + this.apiKey + '&' + this._encodeParams(params) + '&' + this._encodeParams(this.defaultParams)
  }

  _encodeParams (params) {
    let encoded = []
    for (let key of Object.keys(params)) {
      encoded.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    }
    return encoded.join('&')
  }

  static computeSrc (photo) {
    return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'
  }
}
