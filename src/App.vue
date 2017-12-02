<template>
  <div class="o-grid o-grid--no-gutter o-grid--xsmall-full o-grid--small-full o-grid--medium-full o-grid--large-full">
    <div class="o-grid__cell o-grid__cell--width-fixed main-cell">
      <div class="position-fixed">
        <div class="brand">
          <h1 class="brand__name">{{profile.first_name}}</h1>
          <h2 class="brand__baseline">{{profile.occupation}}</h2>
        </div>
        <label for="menu-trigger" class="menu-trigger-label"><i class="fa fa-bars" aria-hidden="true"></i></label>
        <input type="checkbox" id="menu-trigger" class="menu-trigger" />
        <nav class="menu">
          <h3 class="menu__title">WORKS</h3>
          <ul class="menu__tags">
            <li>
              #&nbsp;<router-link :to="{name: 'gallery-all'}">all</router-link>
            </li>
            <li v-for="tag in tags">
              #&nbsp;<router-link :to="{ name: 'gallery-search', params: { tag: tag._content }}">{{tag._content}}</router-link>
            </li>
          </ul>
          <h3 class="menu__title">ABOUT</h3>
          <h3 class="menu__title">CONTACT</h3>
        </nav>
      </div>
    </div>
    <div class="o-grid__cell">
      <router-view/>
    </div>
  </div>
</template>
<script>
  import Flickr from './services/Flickr'

  export default {
    data () {
      return {
        profile: {},
        tags: []
      }
    },
    computed: {
      flickr: () => new Flickr('4e5407323228a7c7851ce6d7d650a15b', '154566401@N05')
    },
    created () {
      this.fetchTags()
      this.getProfile()
    },
    methods: {
      getProfile () {
        this.flickr.getProfile()
          .then(response => {
            this.profile = response.profile
          })
      },
      fetchTags () {
        this.flickr.getUserTags()
          .then(response => {
            this.tags = response.who.tags.tag
          })
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
