<template>
  <div class="photo-infos" v-if="photo != null">
    <h3 class="photo-infos__title">{{photo.title}}</h3>
    <span class="photo-infos__year">{{photo.year}}</span>
    <p class="photo-infos__desciption">{{photo.description}}</p>
  </div>
</template>
<script>
  export default {
    props: {
      photo: {
        type: Object,
        required: false
      }
    }
  }
</script>

<style lang="styl" scoped>
  @import '../assets/photo-infos.styl';
</style>
