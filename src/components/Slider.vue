<template>
  <div>
    <button @click="previous">Previous</button>
    <img v-if="current != null" :src="photos[current].src">
    <button @click="next">Next</button>
    <button @click="close">Close</button>
  </div>
</template>

<script>
  export default {
    props: {
      photos: {
        type: Array,
        required: true
      },
      selected: {
        type: Number,
        required: false
      }
    },
    data () {
      return {
        current: null
      }
    },
    watch: {
      'selected' () {
        this.current = this.selected
      }
    },
    methods: {
      previous () {
        if (this.current > 0) {
          this.current--
        }
      },
      next () {
        if (this.current < this.photos.length - 1) {
          this.current++
        }
      },
      close () {
        this.$emit('close')
      }
    }
  }
</script>
<style lang="styl" scoped>
  @import '../assets/slider.styl';
</style>
