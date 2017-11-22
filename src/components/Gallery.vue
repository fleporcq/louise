<template>
  <div>
    <div class="flexbox-container">
      <nav class="sidebar">
        <ul class="tags">
          <li>
            #&nbsp;<router-link :to="{name: 'gallery-all'}">tous</router-link>
          </li>
          <li v-for="tag in tags">
            #&nbsp;<router-link :to="{ name: 'gallery-search', params: { tag: tag._content }}">{{tag._content}}</router-link>
          </li>
        </ul>
      </nav>
      <div class="main">
        <ul v-for="photo in photos">
          <li>
            <img class="photo" :src="photo.src" :key="photo.id"><br>
            <span>{{photo.title}}</span><br>
            <span>{{photo.description}}</span><br>
          </li>
        </ul>
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
      this.fetchPhotos(tag)
    },
    watch: {
      '$route' (to, from) {
        this.fetchPhotos(to.params.tag)
      }
    },
    methods: {
      fetchTags () {
        this.flickr.getUserTags({})
          .then(response => {
            this.tags = response.who.tags.tag
          })
      },
      fetchPhotos (tag) {
        this.flickr.searchPhotos({
          text: tag === undefined ? '' : tag,
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
  img.photo
    animation fadeIn 1s

  @keyframes fadeIn
    from {
      opacity 0
    }
    to {
      opacity 1
    }

  .flexbox-container
    display flex
    width 100%
    .sidebar
      order 1
      flex 1
      flex-basis auto
      padding .5rem
      .tags
        list-style none
        margin 0
        padding 0
        text-align right
        text-transform lowercase
        li
          margin 5px 0
          color second-color
          a
            color second-color
            text-decoration none
          a:hover
            color main-color
          a.router-link-exact-active
            color main-color
    .main
      order 1
      flex 10
      padding .5rem
</style>
