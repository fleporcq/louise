<template>
  <div class="slider" ref="slider" tabindex="0" @keyup.27="close" @keyup.37="previous" @keyup.39="next">
    <div class="slider__current" v-if="current != null"
         v-bind:style="{ 'background-image': 'url(' + photos[current].src + ')' }">
      <div class="slider__previous" @click="previous"></div>
      <div class="slider__close" @click="emitClose"></div>
      <div class="slider__next" @click="next"></div>
    </div>
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
        this.$refs.slider.focus()
        this.emitChange()
      }
    },
    methods: {
      previous () {
        if (this.current > 0) {
          this.current--
        } else {
          this.current = this.photos.length - 1
        }
        this.emitChange()
      },
      next () {
        if (this.current < this.photos.length - 1) {
          this.current++
        } else {
          this.current = 0
        }
        this.emitChange()
      },
      emitChange () {
        this.$emit('change', this.photos[this.current])
      },
      emitClose () {
        this.$emit('close')
        this.$emit('change', null)
      }
    }
  }
</script>
<style lang="styl" scoped>
  @import '../assets/variables.styl';
  @import '../assets/slider.styl';
</style>
