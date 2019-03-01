<template>
  <div>
    <div class="custom-navbar">
      <div class="navbar-button"
           @click="handleNavButton">
        <v-icon v-if="!this.$store.state.isMain" name="chevron-left" style="width: 30px;"></v-icon>
        <v-icon v-if="this.$store.state.isMain" name="menu" style="width: 30px;"></v-icon>
      </div>
      <img class="logo" src="/img/logo.png" />
    </div>
    <Slide width="170"
           :burgerIcon="false"
           :isOpen="isOpen"
           @closeMenu="handleCloseMenu">
      <a href="#" @click="handleProfile">
        <span class="nowrap"><v-icon name="user"></v-icon> Profile</span>
      </a>
      <a href="#" @click="handleLogout">
        <span class="nowrap"><v-icon name="log-out"></v-icon> Logout</span>
      </a>
    </Slide>
    <div v-if="isOpen" class="background-gray"></div>
  </div>
</template>

<script>
import common from '../../assets/js/common'
import api from '../../assets/js/api'
import { Slide } from 'vue-burger-menu'

export default {
  name: 'Navbar',
  mixins: [common, api],
  components: {
    Slide
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    handleNavButton (event) {
      if (this.$store.state.isMain) {
        this.isOpen = true
      } else {
        this.$router.go(-1)
      }
    },
    handleCloseMenu () {
      this.isOpen = false
    },
    handleLogout (event) {
      console.log('handleLogout')
      this.$router.push('/')
    },
    handleProfile (event) {
      // TODO: 구현
      console.log('handleProfile')
    }
  }
}
</script>

<style lang="less" scoped>
.custom-navbar {
  height: 60px;
  background: linear-gradient(135deg, #0379da, #0e4890);
  color: white;

  .navbar-button {
    float: left;
    margin: 15px 0 0 10px;
  }

  .logo {
    float: right;
    width: 150px;
    margin: 15px 15px 0 0;
  }
}
</style>

<style lang="less">
.background-gray {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: black;
  z-index: 20;
  opacity: 0.5;
}

.cross-style {
  position: absolute;
  top: 12px;
  right: 2px;
  cursor: pointer;
}
.bm-cross {
  background: #bdc3c7;
}
.bm-cross-button {
  height: 24px;
  width: 24px;
}
.bm-menu {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  background-color: #0b1a44;
  overflow-x: hidden;
  padding-top: 60px;
  transition: 0.5s;
  opacity: 0.9;
}
.bm-overlay {
  overflow-y: hidden;
}
.bm-item-list {
  color: #b8b7ad;
  margin-left: 10%;
  font-size: 17px;
}
.bm-item-list > * {
  display: flex;
  text-decoration: none;
  padding: 0.7em;
}
.bm-item-list > * > span {
  margin-left: 10px;
  font-weight: 100;
  color: white;
}
.nowrap {
  white-space: nowrap;
}
</style>
