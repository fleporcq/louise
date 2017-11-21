<template>
  <div>
    <h1>Galerie</h1>
    <h2>Tags</h2>
    <ul v-for="tag in tags">
      <li>{{tag._content}}</li>
    </ul>
    <h2>Photos</h2>
    <ul v-for="photo in photos">
      <li>
        <img :src="photo.src"><br>
        {{photo}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tags: [],
        photos: []
      }
    },
    created () {
      this.fetchTags()
      this.fetchImages()
    },
    methods: {
      fetchTags () {
        this.$http.get('https://api.flickr.com/services/rest/?method=flickr.tags.getListUser&api_key=7b0e13ba3a3a2dae0d1f59e18e4c59d4&user_id=160317127%40N06&format=json&nojsoncallback=1')
          .then(response => {
            this.tags = response.body.who.tags.tag
          })
      },
      fetchImages () {
        let tags = ''
        this.$http.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=7b0e13ba3a3a2dae0d1f59e18e4c59d4&user_id=160317127%40N06&tags=' + tags + '&format=json&nojsoncallback=1')
          .then(response => {
            for (let photo of response.body.photos.photo) {
              this.photos.push({
                title: photo.title,
                src: 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'
              })
            }
          })
      }
    }
  }
</script>
