<template>
  <div>
    <div class="main-area">
      <Navbar></Navbar>
      <div class="contents">
        <Notice></Notice>
        <div class="menu-button-area">
          <b-button v-on:click="handleProejct"
                    variant="outline-primary"
                    :block="true"
                    size="lg">Project</b-button>
          <b-button v-on:click="handleProejct"
                    variant="outline-primary"
                    :block="true"
                    size="lg">지출결의(보류)</b-button>
          <b-card title="Proejct"
                  text-variant="primary"
                  class="text-center menu-item"
                  v-on:click="handleProejct">
            <p class="card-text">
              Project 조회 및 주간보고, 지출결의 작성이 가능합니다.
            </p>
          </b-card>
          <b-card title="지출결의"
                  text-variant="primary"
                  class="text-center menu-item"
                  v-on:click="handleProejct">
            <p class="card-text">
              지출결의
            </p>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/main/NavbarMain.vue'
import Notice from '../components/main/Notice.vue'
import common from '../assets/js/common'
import api from '../assets/js/api'

export default {
  name: 'main',
  mixins: [common, api],
  components: {
    Notice,
    Navbar
  },
  data () {
    return {
      userId: '',
      password: ''
    }
  },
  created () {
    // TODO: getMenuList
    console.log('created')
  },
  methods: {
    handleProejct (event) {
      console.log('handleProejct')
      this.$router.push('/project')
    }
  }
}
</script>

<style lang="less" scoped>
.main-area {
  width: 100wh;
  height: 100vh;

  .menu-button-area {
    width: 80%;
    margin-top: 1rem;
    margin-left: auto;
    margin-right: auto;

    .menu-item {
      margin-top: 1rem;
    }
  }

  button:hover,
  button:not(:disabled):not(.disabled):active,
  button:not(:disabled):not(.disabled).active,
  .show > button.dropdown-toggle {
    color: #007bff;
    background-color: #fff0;
  }
}
</style>
