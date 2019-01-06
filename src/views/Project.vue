<template>
  <div class="contents">
    <Navbar></Navbar>
    <h2>This is Project page</h2>
  </div>
</template>

<script>
import Navbar from '../components/main/NavbarMain.vue'
import common from '../assets/js/common'
import api from '../assets/js/api'

export default {
  name: 'project',
  mixins: [common, api],
  components: {
    Navbar
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
  background-color: #378fe2;
  color: white;
}
</style>
