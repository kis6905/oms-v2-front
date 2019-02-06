<template>
  <div>
    <Notice></Notice>
    <div class="menu-button-area">
      <b-button @click="handleMenu"
                data-path="/project"
                variant="outline-primary"
                :block="true"
                size="lg">Project</b-button>
      <b-button @click="handleMenu"
                data-path="/weekly_report"
                variant="outline-primary"
                :block="true"
                size="lg">주간보고</b-button>
      <b-button @click="handleMenu"
                data-path="/admin/user"
                variant="outline-primary"
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
  props: ['handleMenu'],
  data () {
    return {
    }
  },
  created () {
    // TODO: getMenuList
    console.log('created')
  },
  methods: {
  }
}
</script>

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
