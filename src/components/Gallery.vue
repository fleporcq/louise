<template>
  <div>
    <masonry v-show="!isSelected()" :photos="photos" @select="select"></masonry>
    <slider v-show="isSelected()" :photos="photos" :selected="selected" @close="unselect" @change="emitSliderChange"></slider>
  </div>
</template>

<script>
  import Flickr from '../services/Flickr'
  import Photo from '../models/Photo'
  import Slider from './Slider'
  import Masonry from './Masonry'

  export default {
    components: {
      'slider': Slider,
      'masonry': Masonry
    },
    data () {
      return {
        selected: null,
        photos: []
      }
    },
    computed: {
      flickr: () => new Flickr(process.env.FLICKR_API_KEY, process.env.FLICKR_USER_ID)
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
          extras: 'description,date_taken'
        }).then(response => {
          let photos = []
          for (let photo of response.photos.photo) {
            photos.push(Photo.createFromFlickr(photo))
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
      },
      emitSliderChange (photo) {
        this.$emit('slider-change', photo)
      }
    }
  }
</script>

