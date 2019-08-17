<template>
  <div>
    <div class="title">
      <v-icon name="clipboard"></v-icon>
      {{ selectedProject.project.projectName }} 주간보고
    </div>
    <div class="list-area">
      <b-button v-for="item in weeklyReportList"
                :key="item.weeklyDate"
                @click="handleClickWeeklyReport"
                data-seq="test"
                variant="outline-info"
                :block="true"
                size="">{{ item.monday }} ~ {{ item.friday }}
                <v-icon name="check" v-if="item.registeredDate"></v-icon>
      </b-button>
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
        const inputDateString = this.selectedProject.inputDate
        const withdrawalDateString = this.selectedProject.withdrawalDate
        const weekDiff = this.weekDiff(inputDateString, withdrawalDateString)
        const inputDate = new Date(inputDateString)
        let tempDate = this.getMondayDateFrom(inputDate)

        const userInfo = this.$store.state.userInfo

        for (let idx = 0; idx < weekDiff; idx++) {
          const mondayDateString = tempDate.yyyymmdd('yyyy-mm-dd')
          tempDate.setDate(tempDate.getDate() + 4) // move to this friday
          const fridayDateString = tempDate.yyyymmdd('yyyy-mm-dd')

          const weeklyDate = mondayDateString.replace(/-/g, '') + fridayDateString.replace(/-/g, '')
          const weeklyReport = weeklyReportList.find(e => e.weeklyDate === weeklyDate)

          this.weeklyReportList.push({
            weeklyDate: weeklyDate,
            monday: mondayDateString,
            friday: fridayDateString,
            seq: null,
            userSeq: userInfo.userSeq,
            projectSeq: this.selectedProject.seq,
            thisWeekTask: weeklyReport ? weeklyReport.thisWeekTask : null,
            nextWeekTask: weeklyReport ? weeklyReport.nextWeekTask : null,
            issueContents: weeklyReport ? weeklyReport.issueContents : null,
            registeredDate: weeklyReport ? weeklyReport.registeredDate : null,
            modifiedDate: weeklyReport ? weeklyReport.modifiedDate : null
          })

          tempDate.setDate(tempDate.getDate() + 3) // move to next monday
        }
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

  .icon-check {
    position: absolute;
    margin-left: 10px;
    color: red;
  }
}
button:hover,
button:not(:disabled):not(.disabled):active,
button:not(:disabled):not(.disabled).active,
.show > button.dropdown-toggle {
  color: #17a2b8;
  background-color: #fff0;
}
</style>
