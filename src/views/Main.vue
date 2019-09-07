<template>
  <div>
    <Notice></Notice>
    <div class="menu-button-area">
      <b-button @click="handleClickMenu"
                data-path="/project"
                variant="outline-primary"
                :block="true"
                size="lg">Project</b-button>
      <b-button @click="handleClickMenu"
                data-path="/admin/user"
                variant="outline-danger"
                :block="true"
                size="lg">직원관리</b-button>
    </div>
  </div>
</template>

<script>
import Notice from '../components/main/Notice.vue'
import common from '../assets/js/common'
import api from '../assets/js/api'

export default {
  name: 'main',
  mixins: [common, api],
  components: {
    Notice
  },
  props: ['handleClickMenu'],
  data () {
    return {
    }
  },
  created () {
    // TODO: getMenuList
    this.$store.state.isMain = true
  },
  methods: {
  }
}
</script>

<style lang="less">
.title {
  width: 100%;
  color: white;
  background: linear-gradient(-45deg, #863fe6, #1a94ce);
  margin-top: 1px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  padding: 5px 0 5px 0;
}
</style>

<style lang="less" scoped>
.menu-button-area {
  width: 80%;
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 20px;

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
</style>
