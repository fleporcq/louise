<template>
  <div class="brand">
    <h1 class="brand__name">{{profile.first_name}}</h1>
    <h2 class="brand__baseline">{{profile.occupation}}</h2>
  </div>
</template>
<script>
  import Flickr from '../services/Flickr'

  export default {
    data () {
      return {
        profile: {}
      }
    },
    computed: {
      flickr: () => new Flickr(process.env.FLICKR_API_KEY, process.env.FLICKR_USER_ID)
    },
    created () {
      this.getProfile()
    },
    methods: {
      getProfile () {
        this.flickr.getProfile()
          .then(response => {
            this.profile = response.profile
          })
      }
    }
  }
</script>
