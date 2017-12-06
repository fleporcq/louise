<template>
  <div>
    <label for="menu-trigger" class="menu-trigger-label"><i class="fa fa-bars" aria-hidden="true"></i></label>
    <input type="checkbox" id="menu-trigger" class="menu-trigger" />
    <nav class="menu">
      <h3 class="menu__title">WORKS</h3>
      <tags></tags>
      <h3 class="menu__title">ABOUT</h3>
      <h3 class="menu__title">CONTACT</h3>
    </nav>
  </div>
</template>


<script>
  import Tags from './Tags'

  export default {
    components: {
      'tags': Tags
    }
  }
</script>
