<template>
  <div id="app">
    <transition-page>
      <router-view/>
    </transition-page>
  </div>
</template>

<script>
import TransitionPage from './transitions/TransitionPage.vue'

export default {
  name: 'app',
  components: {
    TransitionPage
  }
}
</script>

<style lang="less" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
}
</style>
