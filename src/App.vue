<template>
  <div id="app">
    <flip-clock></flip-clock>
  </div>
</template>

<script>
import FlipClock from './components/FlipClock.vue'

export default {
  name: 'App',
  components: {
    FlipClock,
  },
}
</script>

<style>
/* 字體 */
@font-face {
  font-family: 'Quantico';  
  src: 
  url('../src/assets/font/Quantico-Regular.ttf') format('truetype'),
  url('../src/assets/font/Quantico-Bold.ttf') format('truetype'),
  url('../src/assets/font/Quantico-BoldItalic.ttf') format('truetype'),
  url('../src/assets/font/Quantico-Italic.ttf') format('truetype'); 
}

</style>
