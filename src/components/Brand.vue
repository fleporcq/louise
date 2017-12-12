<template>
  <div class="brand">
    <h1 class="brand__name">{{ name }}</h1>
    <h2 class="brand__baseline">{{ baseline }}</h2>
  </div>
</template>
<script>
  import Flickr from '../services/Flickr'

  export default {
    data () {
      return {
        name: null,
        baseline: null
      }
    },
    computed: {
      flickr: () => new Flickr(process.env.FLICKR_API_KEY, process.env.FLICKR_USER_ID)
    },
    created () {
      this.getPeopleInfo()
      this.getProfile()
    },
    methods: {
      getPeopleInfo () {
        this.flickr.getPeopleInfo()
          .then(response => {
            let name = response.person.realname || response.person.username
            this.name = name._content
          })
      },
      getProfile () {
        this.flickr.getProfile()
          .then(response => {
            this.baseline = response.profile.occupation
          })
      }
    }
  }
</script>
