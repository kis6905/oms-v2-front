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
                :data-weekly-date="item.weeklyDate"
                variant="outline-info"
                :block="true"
                size="">{{ item.monday }} ~ {{ item.friday }}
                <v-icon name="check" v-if="item.registeredDate"></v-icon>
      </b-button>
    </div>
    <b-modal v-model="isShowDetail"
             centered
             ok-only
             header-bg-variant="primary"
             header-text-variant="light"
             header-border-variant="primary"
             footer-bg-variant="light"
             footer-text-variant="dark"
             :title="this.selectedWeeklyReportTitle">
      <p class="task-title">금주 진행 업무
        <span data-task-id="thisWeekTask" @click="handleTaskCopy"><v-icon name="copy"></v-icon></span>
      </p>
      <b-form-textarea id="thisWeekTask"
                       v-model="thisWeekTask"
                       placeholder="내용을 입력하세요"
                       rows="3"
                       max-rows="3">
      </b-form-textarea>
      <p class="task-title">차주 예정 업무
        <span data-task-id="nextWeekTask" @click="handleTaskCopy"><v-icon name="copy"></v-icon></span>
      </p>
      <b-form-textarea id="nextWeekTask"
                       v-model="nextWeekTask"
                       placeholder="내용을 입력하세요"
                       rows="3"
                       max-rows="3">
      </b-form-textarea>
      <p class="task-title">이슈 사항
        <span data-task-id="issueContents" @click="handleTaskCopy"><v-icon name="copy"></v-icon></span>
      </p>
      <b-form-textarea id="issueContents"
                       v-model="issueContents"
                       placeholder="내용을 입력하세요"
                       rows="3"
                       max-rows="3">
      </b-form-textarea>
      <div slot="modal-footer">
         <b-btn size="sm" class="float-right" variant="primary" @click="handleSave">
           저장
         </b-btn>
       </div>
    </b-modal>
  </div>
</template>

<script>
import common from '../assets/js/common'
import api from '../assets/js/api'

export default {
  name: 'weeklyReport',
  mixins: [common, api],
  components: {},
  props: ['selectedProject'],
  data () {
    return {
      weeklyReportList: [],
      isShowDetail: false,
      selectedWeeklyReport: null,
      thisWeekTask: null,
      nextWeekTask: null,
      issueContents: null
    }
  },
  created () {
    this.$store.state.isMain = false
    this.init()
  },
  methods: {
    async init () {
      const response = await this.getWeeklyReportList(this.selectedProject.seq)
      if (response.status === 200) {
        const weeklyReportList = response.data
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
            seq: weeklyReport ? weeklyReport.seq : null,
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
    handleClickWeeklyReport (event) {
      this.isShowDetail = true
      this.selectedWeeklyReport = { ...this.weeklyReportList.find((weeklyReport) => weeklyReport.weeklyDate === event.currentTarget.dataset.weeklyDate) }
      if (this.selectedWeeklyReport) {
        this.thisWeekTask = this.selectedWeeklyReport.thisWeekTask
        this.nextWeekTask = this.selectedWeeklyReport.nextWeekTask
        this.issueContents = this.selectedWeeklyReport.issueContents
      }
    },
    async handleSave () {
      this.selectedWeeklyReport.thisWeekTask = this.thisWeekTask
      this.selectedWeeklyReport.nextWeekTask = this.nextWeekTask
      this.selectedWeeklyReport.issueContents = this.issueContents

      const param = { ...this.selectedWeeklyReport }

      const response = await this.saveWeeklyReport(param)
      if (response.status === 200) {
        const responseData = response.data
        console.log(responseData)
        responseData.monday = this.selectedWeeklyReport.monday
        responseData.friday = this.selectedWeeklyReport.friday
        for (let idx = 0; idx < this.weeklyReportList.length; idx++) {
          let weeklyReport = this.weeklyReportList[idx]
          if (weeklyReport.weeklyDate === this.selectedWeeklyReport.weeklyDate) {
            this.weeklyReportList[idx] = responseData
          }
        }
        this.isShowDetail = false
      }
    },
    handleTaskCopy (event) {
      const element = document.getElementById(event.currentTarget.dataset.taskId)
      element.select()
      document.execCommand('copy')
      element.blur()
      alert('클립보드에 복사 되었습니다.')
    }
  },
  computed: {
    selectedWeeklyReportTitle () {
      if (!this.selectedWeeklyReport) return ''
      return `${this.selectedWeeklyReport.monday} ~ ${this.selectedWeeklyReport.friday}`
    }
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
.task-title{
  margin-top: 15px;
  margin-bottom: 5px;
}
</style>
