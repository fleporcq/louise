<template>
  <div class="o-grid o-grid--no-gutter o-grid--xsmall-full o-grid--small-full o-grid--medium-full o-grid--large-full">
      <div class="o-grid__cell o-grid__cell--width-fixed main-cell">
        <div class="position-fixed">
          <div class="brand">
            <h1 class="brand__name">{{profile.first_name}}</h1>
            <h2 class="brand__baseline">{{profile.occupation}}</h2>
          </div>
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
          <div class="masonry">
            <div class="masonry__item" v-for="photo in photos">
              <div class="photo">
                <img :src="photo.src" :key="photo.id">
                <div class="photo__overlay">
                  <div class="photo__overlay__title">{{photo.title}}</div>
                </div>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
  import Flickr from '../services/Flickr'
  import Photo from '../models/Photo'

  export default {
    data () {
      return {
        profile: null,
        tags: [],
        photos: []
      }
    },
    computed: {
      flickr: () => new Flickr('4e5407323228a7c7851ce6d7d650a15b', '154566401@N05')
    },
    created () {
      this.fetchTags()
      let tag = this.$route.params.tag
      this.getProfile()
      this.fetchPhotos(tag)
    },
    watch: {
      '$route' (to, from) {
        this.fetchPhotos(to.params.tag)
      }
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
      },
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
      }
    }
  }
</script>
<style lang="styl" scoped>
  @import '../assets/variables.styl';
  @import '../assets/masonry.styl';
  @import '../assets/gallery.styl';
</style>
