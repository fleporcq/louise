<template>
  <div>
    <div class="masonry">
      <div class="masonry__item" v-for="(photo, index) in photos">
        <figure>
          <div class="photo">
              <img :src="photo.src" :key="photo.id">
              <div class="photo__overlay" @click="select(index)">
                <div class="photo__overlay__title">{{photo.title}}</div>
              </div>
          </div>
          <figcaption>{{photo.title}}</figcaption>
        </figure>
      </div>
    </div>
    <slider v-show="isSelected()" :photos="photos" :selected="selected" v-on:close="unselect()"></slider>
  </div>
</template>

<script>
  import Flickr from '../services/Flickr'
  import Photo from '../models/Photo'
  import Slider from './Slider'

  export default {
    components: { 'slider': Slider },
    data () {
      return {
        selected: null,
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
      '$route' (to) {
        this.fetchPhotos(to.params.tag)
        this.unselect()
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
      },
      select (index) {
        this.selected = index
      },
      unselect () {
        this.selected = null
      },
      isSelected () {
        return this.selected != null
      }
    }
  }
</script>
<style lang="styl" scoped>
  @import '../assets/variables.styl';
  @import '../assets/gallery.styl';
</style>
