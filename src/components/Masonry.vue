<template>
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
</template>


<script>
  export default {
    props: {
      photos: {
        type: Array,
        required: true
      }
    },
    methods: {
      select (index) {
        this.$emit('select', index)
      }
    }
  }
</script>

<style lang="styl" scoped>
  @import '../assets/variables.styl';
  @import '../assets/masonry.styl';
</style>
