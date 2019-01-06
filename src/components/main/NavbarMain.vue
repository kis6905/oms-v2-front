<template>
  <b-navbar toggleable="md" type="dark" variant="primary" :sticky="true">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <img class="logo" src="/img/logo.png" />
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-on:click="handleProfile">Profile</b-nav-item>
        <b-nav-item v-on:click="handleLogout">Logout</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import common from '../../assets/js/common'
import api from '../../assets/js/api'

export default {
  name: 'NavbarMain',
  mixins: [common, api],
  data () {
    return {
    }
  },
  methods: {
    handleLogout (event) {
      console.log('handleLogout')
      this.$router.push('/')
    },
    handleProfile (event) {
      console.log('handleProfile')
    }
  }
}
</script>

<style lang="less" scoped>
nav {
  background: linear-gradient(135deg, #0379da, #0e4890);
  color: white;

  .navbar-dark .navbar-nav .nav-link {
    color: white;
  }
  .logo {
    width: 9rem;
  }
}
</style>
