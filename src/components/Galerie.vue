<template>
  <div>
    <h1>Galerie</h1>
    <ul v-for="tag in tags">
      <li>{{tag.label}}</li>
    </ul>
  </div>
</template>

<script>
import {db} from '../firebase'

export default {
  name: 'Galerie',
  firebase: {
    tags: db.ref('tags')
  }
}
</script>
