<template>
  <div>
    <div class="main-area">
      <Navbar></Navbar>
      <div class="contents">
        <Notice></Notice>
        <div class="menu-button-area">
          <b-button v-on:click="handleMenu"
                    data-path="/project"
                    variant="outline-primary"
                    :block="true"
                    size="lg">Project</b-button>
          <b-button v-on:click="handleMenu"
                    data-path="/weekly_report"
                    variant="outline-primary"
                    :block="true"
                    size="lg">주간보고</b-button>
          <b-button v-on:click="handleMenu"
                    data-path="/admin/user"
                    variant="outline-primary"
                    :block="true"
                    size="lg">직원관리</b-button>
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
    handleMenu (event) {
      this.$router.push(event.target.dataset.path)
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
