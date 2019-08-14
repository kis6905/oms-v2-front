<template>
  <div>
    <div class="title">
      <v-icon name="clipboard"></v-icon>
      {{ selectedProject.project.projectName }} 주간보고
    </div>
    <div class="list-area">
      <b-button @click="todo"
                data-seq="test"
                variant="outline-info"
                :block="true"
                size="lg">직원관리</b-button>
    </div>
  </div>
</template>

<script>
import EmptyData from '../components/common/EmptyData.vue'
import common from '../assets/js/common'
import api from '../assets/js/api'

export default {
  name: 'weeklyReport',
  mixins: [common, api],
  components: {
    EmptyData
  },
  props: ['selectedProject'],
  data () {
    return {
    }
  },
  created () {
    this.$store.state.isMain = false
    this.init()
    console.log(this.selectedProject)
  },
  methods: {
    async init () {
      // TODO: 프로젝트의 주간 목록 가져오기
    }
  },
  computed: {
  }
}
</script>

<style lang="less" scoped>
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
.list-area {
  padding: 15px 15px 15px 15px;
}
</style>
