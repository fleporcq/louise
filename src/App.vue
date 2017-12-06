<template>
  <div class="o-grid o-grid--no-gutter o-grid--xsmall-full o-grid--small-full o-grid--medium-full o-grid--large-full">
    <div class="o-grid__cell o-grid__cell--width-fixed main-cell">
      <div class="position-fixed">
        <brand></brand>
        <navigation v-show="!photo"></navigation>
        <photo-infos v-show="photo" :photo=photo></photo-infos>
      </div>
    </div>
    <div class="o-grid__cell">
      <router-view @slider-change="setPhoto" />
    </div>
  </div>
</template>
<script>
  import Brand from './components/Brand'
  import Navigation from './components/Navigation.vue'
  import PhotoInfos from './components/PhotoInfos.vue'

  export default {
    components: {
      'brand': Brand,
      'navigation': Navigation,
      'photo-infos': PhotoInfos
    },
    data () {
      return {
        photo: null
      }
    },
    methods: {
      setPhoto (photo) {
        this.photo = photo
      }
    }
  }
</script>
<style>
  @import '../node_modules/blaze/dist/blaze.min.css';
  @import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
  @import url('https://fonts.googleapis.com/css?family=Lato');
</style>
<style lang="styl">
  @import './assets/variables.styl';
  @import './assets/app.styl';
</style>
