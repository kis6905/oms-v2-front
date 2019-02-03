<template>
  <div class="contents">
    <Navbar></Navbar>
    <div>
      <CurrentProject></CurrentProject>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/main/NavbarMain.vue'
import CurrentProject from '../components/project/CurrentProject.vue'
import common from '../assets/js/common'
import api from '../assets/js/api'

export default {
  name: 'project',
  mixins: [common, api],
  components: {
    Navbar,
    CurrentProject
  },
  data () {
    return {
    }
  },
  mounted () {
    console.log('mounted')
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.contents {
  width: 100wh;
  height: 100vh;
}
</style>
