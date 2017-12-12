<template>
  <masonry class="masonry" :cols="{default: 3, 1248: 2, 1024: 1}" :gutter="25"  v-infinite-scroll="loadMore" infinite-scroll-disabled="disabled" infinite-scroll-distance="200">
      <figure class="masonry__item" v-for="(photo, index) in photos">
        <div class="photo">
          <img style="" :src="photo.src" :key="photo.id">
          <div class="photo__overlay" @click="select(index)">
            <div class="photo__overlay__title">{{photo.title}}</div>
          </div>
        </div>
        <figcaption>{{photo.title}}</figcaption>
      </figure>
  </masonry>
</template>

<script>
  import infiniteScroll from 'vue-infinite-scroll'

  export default {

    directives: {infiniteScroll},
    props: {
      disabled: {
        type: Boolean,
        required: true
      },
      photos: {
        type: Array,
        required: true
      },
      total: {
        type: Number,
        required: false
      }
    },
    methods: {
      select (index) {
        this.$emit('select', index)
      },
      loadMore () {
        if (this.photos.length < this.total) {
          this.$emit('loadMore')
        }
      }
    }
  }
</script>

<style lang="styl" scoped>
  @import '../assets/variables.styl';
  @import '../assets/masonry.styl';
</style>
