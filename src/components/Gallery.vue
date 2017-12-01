<template>
    <div class="masonry">
      <div class="masonry__item" v-for="photo in photos">
        <div class="photo">
          <img :src="photo.src" :key="photo.id">
          <div class="photo__overlay">
            <div class="photo__overlay__title">{{photo.title}}</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import Flickr from '../services/Flickr'
  import Photo from '../models/Photo'

  export default {
    data () {
      return {
        photos: []
      }
    },
    computed: {
      flickr: () => new Flickr('4e5407323228a7c7851ce6d7d650a15b', '154566401@N05')
    },
    created () {
      this.fetchPhotos(this.$route.params.tag)
    },
    watch: {
      '$route' (to, from) {
        this.fetchPhotos(to.params.tag)
      }
    },
    methods: {
      fetchPhotos (tag) {
        this.flickr.searchPhotos({
          tags: tag === undefined ? '' : tag,
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
<style lang="styl" scoped>
  @import '../assets/variables.styl';
  @import '../assets/gallery.styl';
</style>
