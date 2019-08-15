<template>
  <div>
    <div class="title">
      <v-icon name="clipboard"></v-icon>
      {{ selectedProject.project.projectName }} 주간보고
    </div>
    <div class="list-area">
      <b-button @click="handleClickWeeklyReport"
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
      weeklyReportList: []
    }
  },
  created () {
    this.$store.state.isMain = false
    this.init()
  },
  methods: {
    async init () {
      const reseponse = await this.getWeeklyReportList(this.selectedProject.seq)
      if (reseponse.status === 200) {
        const weeklyReportList = reseponse.data
        const inputDate = this.selectedProject.inputDate
        const withdrawalDate = this.selectedProject.withdrawalDate
        const weekDiff = this.weekDiff(inputDate, withdrawalDate)
        /*
         * TODO: 1. inputDate 부터 시작해서 loop 돌리며 월, 금요일의 일 수를 구해야 함. 토, 일요일은 다음 월요일이 시작
         *       2. week 수를 가지고 loop 돌려 list 만들기 / 서버에서 받은 weeklyReportList로 사이사이 껴넣기
         */
      }
    },
    handleClickWeeklyReport () {

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
