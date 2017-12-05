<template>
  <div class="o-grid o-grid--no-gutter o-grid--xsmall-full o-grid--small-full o-grid--medium-full o-grid--large-full">
    <div class="o-grid__cell o-grid__cell--width-fixed main-cell">
      <div class="position-fixed">
        <brand></brand>
        <label for="menu-trigger" class="menu-trigger-label"><i class="fa fa-bars" aria-hidden="true"></i></label>
        <input type="checkbox" id="menu-trigger" class="menu-trigger" />
        <nav class="menu">
          <h3 class="menu__title">WORKS</h3>
          <tags></tags>
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
  import Brand from './components/Brand'
  import Tags from './components/Tags'

  export default {
    components: {
      'brand': Brand,
      'tags': Tags
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
