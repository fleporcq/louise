<template>
    <div class="masonry">
      <div class="masonry__item" v-for="(photo, index) in list">
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
      <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
        <span slot="no-results"></span>
      </infinite-loading>
    </div>
</template>


<script>
  import InfiniteLoading from 'vue-infinite-loading'

  export default {
    components: {
      'infinite-loading': InfiniteLoading
    },
    data () {
      return {
        list: []
      }
    },
    props: {
      photos: {
        type: Array,
        required: true
      }
    },
    watch: {
      'photos' () {
        this.list = []
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      }
    },
    methods: {
      select (index) {
        this.$emit('select', index)
      },
      infiniteHandler ($state) {
        setTimeout(() => {
          const temp = []
          let i = 0
          for (i = this.list.length; i <= this.list.length + 10 - 1 && i <= this.photos.length - 1; i++) {
            temp.push(this.photos[i])
          }
          this.list = this.list.concat(temp)
          console.log(i)
          if (i === this.photos.length) {
            $state.complete()
          } else {
            $state.loaded()
          }
        }, 500)
      }
    }
  }
</script>

<style lang="styl" scoped>
  @import '../assets/variables.styl';
  @import '../assets/masonry.styl';
</style>
