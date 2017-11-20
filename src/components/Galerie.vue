<template>
  <div>
    <h1>Galerie</h1>
    <ul v-for="tag in tags">
      <li>{{tag.label}}</li>
    </ul>
    <img :src="imageUrl" width="500"/>
  </div>
</template>

<script>
import {database, storage} from '../firebase'
export default {
  name: 'Galerie',
  firebase: {
    tags: database.ref('tags')
  },
  data () {
    return {
      imageUrl: null
    }
  },
  created () {
    this.fetchImage()
  },
  methods: {
    fetchImage () {
      let self = this
      storage.ref('tableaux/3D-Nature-Wallpaper-4.jpg').getDownloadURL().then(function (url) {
        self.imageUrl = url
      })
    }
  }
}
</script>
