<template>
  <div class="main-area">
    <Navbar></Navbar>
    <div class="contents">
      <transition-page>
        <router-view :handle-menu="handleMenu"/>
      </transition-page>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/common/Navbar.vue'
import TransitionPage from '../transitions/TransitionPage.vue'
import common from '../assets/js/common'
import api from '../assets/js/api'

export default {
  name: 'service',
  mixins: [common, api],
  components: {
    Navbar,
    TransitionPage
  },
  data () {
    return {
    }
  },
  created () {
    this.$store.state.isMain = true
  },
  methods: {
    handleMenu (event) {
      this.$router.push('/service' + event.target.dataset.path)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
