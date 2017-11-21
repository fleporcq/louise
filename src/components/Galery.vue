<template>
  <div>
    <h1>Galerie</h1>
    <ul v-for="tag in tags">

    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tags: [],
        images: []
      }
    },
    created () {
      this.fetchTags()
    },
    methods: {
      fetchTags () {

      }
    }
  }
</script>
