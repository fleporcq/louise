<template>
  <div>
    <masonry :photos="photos" @select="select"></masonry>
    <slider v-show="isSelected()" :photos="photos" :selected="selected" @close="unselect"></slider>
  </div>
</template>

<script>
  import Flickr from '../services/Flickr'
  import Photo from '../models/Photo'
  import Slider from './Slider'
  import Masonry from './Masonry'

  export default {
    components: { 'slider': Slider, 'masonry': Masonry },
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

