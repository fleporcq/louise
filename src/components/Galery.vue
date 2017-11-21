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
  import Flickr from '../services/Flickr'
  import Photo from '../models/Photo'

  export default {
    data () {
      return {
        tags: [],
        photos: []
      }
    },
    computed: {
      flickr: () => new Flickr('7b0e13ba3a3a2dae0d1f59e18e4c59d4', '160317127@N06')
    },
    created () {
      this.fetchTags()
      this.fetchImages()
    },
    methods: {
      fetchTags () {
        this.flickr.getUserTags({})
          .then(response => {
            this.tags = response.who.tags.tag
          })
      },
      fetchImages () {
        this.flickr.searchPhotos({
          tags: '',
          extras: 'description'
        }).then(response => {
          for (let photo of response.photos.photo) {
            this.photos.push(new Photo(
              photo.title,
              photo.description._content,
              Photo.generateFlickrSrc(photo)
            ))
          }
        })
      }
    }
  }
</script>
