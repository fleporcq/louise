<template>
  <div>
    <ul>
      <li><router-link :to="{name: 'gallery-all'}">Tous</router-link></li>
      <li v-for="tag in tags"><router-link :to="{ name: 'gallery-search', params: { tag: tag._content }}">{{tag._content}}</router-link></li>
    </ul>
    <ul v-for="photo in photos">
      <li>
        <img :src="photo.src" :key="photo.id"><br>
        <span>{{photo.title}}</span><br>
        <span>{{photo.description}}</span><br>
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
      flickr: () => new Flickr('4e5407323228a7c7851ce6d7d650a15b', '154566401@N05')
    },
    created () {
      this.fetchTags()
      let tag = this.$route.params.tag
      this.fetchPhotos(tag)
    },
    watch: {
      '$route' (to, from) {
        this.fetchPhotos(to.params.tag)
      }
    },
    methods: {
      fetchTags () {
        this.flickr.getUserTags({})
          .then(response => {
            this.tags = response.who.tags.tag
          })
      },
      fetchPhotos (tag) {
        this.flickr.searchPhotos({
          text: tag === undefined ? '' : tag,
          extras: 'description'
        }).then(response => {
          let photos = []
          for (let photo of response.photos.photo) {
            photos.push(new Photo(
              photo.id,
              photo.title,
              photo.description._content,
              Photo.generateFlickrSrc(photo)
            ))
          }
          this.photos = photos
        })
      }
    }
  }
</script>
