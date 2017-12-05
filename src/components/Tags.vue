<template>
  <ul class="tags">
    <li>
      #&nbsp;<router-link :to="{name: 'gallery-all'}">all</router-link>
    </li>
    <li v-for="tag in tags">
      #&nbsp;<router-link :to="{ name: 'gallery-search', params: { tag: tag._content }}">{{tag._content}}</router-link>
    </li>
  </ul>
</template>
<script>
  import Flickr from '../services/Flickr'

  export default {
    data () {
      return {
        tags: []
      }
    },
    computed: {
      flickr: () => new Flickr('4e5407323228a7c7851ce6d7d650a15b', '154566401@N05')
    },
    created () {
      this.fetchTags()
    },
    methods: {
      fetchTags () {
        this.flickr.getUserTags()
          .then(response => {
            this.tags = response.who.tags.tag
          })
      }
    }
  }
</script>
<style lang="styl" scoped>
  @import '../assets/variables.styl';
  @import '../assets/tags.styl';
</style>
