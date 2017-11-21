<template>
  <div>
    <h1>Galerie</h1>
    <h2>Tags</h2>
    <ul v-for="tag in tags">
      <li>{{tag._content}}</li>
    </ul>
    <h2>Photos</h2>
    <ul v-for="photo in photos">
      <li>
        <img :src="photo.src"><br>
        <span>{{photo.title}}</span><br>
        <span>{{photo.description}}</span><br>
        {{photo}}
      </li>
    </ul>
  </div>
</template>

<script>
  import FlickrApiUrlGenerator from '../services/FlickrApiUrlGenerator'
  import Photo from '../models/Photo'

  export default {
    data () {
      return {
        tags: [],
        photos: []
      }
    },
    computed: {
      flickrUserId: () => '160317127@N06',
      flickrApiUrlGenerator: () => new FlickrApiUrlGenerator('7b0e13ba3a3a2dae0d1f59e18e4c59d4')
    },
    created () {
      this.fetchTags()
      this.fetchImages()
    },
    methods: {
      fetchTags () {
        let url = this.flickrApiUrlGenerator.getUrl('flickr.tags.getListUser', {
          user_id: this.flickrUserId
        })
        this.$http.get(url)
          .then(response => {
            this.tags = response.body.who.tags.tag
          })
      },
      fetchImages () {
        let url = this.flickrApiUrlGenerator.getUrl('flickr.photos.search', {
          user_id: this.flickrUserId,
          tags: '',
          extras: 'description'
        })
        this.$http.get(url)
          .then(response => {
            for (let photo of response.body.photos.photo) {
              this.photos.push(new Photo(
                photo.title,
                photo.description._content,
                FlickrApiUrlGenerator.computeSrc(photo)
              ))
            }
          })
      }
    }
  }
</script>
