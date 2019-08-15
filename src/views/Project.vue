<template>
  <div>
    <div>
      <div class="title">
        <v-icon name="clipboard"></v-icon>
        현재 투입된 프로젝트
      </div>
      <div class="list-container">
        <EmptyData :isShow="currentProjectList.length === 0"></EmptyData>
        <b-card-group deck class="mb-3" v-if="currentProjectList.length > 0">
          <b-card v-for="item in currentProjectList"
                  :key="item.seq"
                  border-variant="info"
                  :header="item.project.projectName"
                  header-bg-variant="info"
                  header-text-variant="white"
                  align="center"
                  @click="handleClickProject"
                  :data-project-seq="item.seq">
            <p class="card-text">발주처: {{ item.project.projectClient }}</p>
            <p class="card-text">기간: {{ projectPeriod(item) }}</p>
          </b-card>
        </b-card-group>
      </div>
    </div>
    <div>
      <div class="title">
        <v-icon name="clipboard"></v-icon>
        참여했던 프로젝트
      </div>
      <div class="list-container">
        <EmptyData :isShow="pastProjectList.length === 0"></EmptyData>
        <b-card-group deck class="mb-3" v-if="pastProjectList.length > 0">
          <b-card v-for="item in pastProjectList"
                  :key="item.seq"
                  border-variant="default"
                  :header="item.project.projectName"
                  header-bg-variant="default"
                  header-text-variant="black"
                  align="center"
                  @click="handleClickProject"
                  :data-project-seq="item.seq">
            <p class="card-text">발주처: {{ item.project.projectClient }}</p>
            <p class="card-text">기간: {{ projectPeriod(item) }}</p>
          </b-card>
        </b-card-group>
      </div>
    </div>

    <b-modal v-model="isShowDetail"
             centered
             ok-only
             header-bg-variant="primary"
             header-text-variant="light"
             header-border-variant="primary"
             footer-bg-variant="light"
             footer-text-variant="dark"
             :title="selectedProject.project ? selectedProject.project.projectName : ''">
      <p class="my-4">발주처: {{ selectedProject.project ? selectedProject.project.projectClient : '' }}</p>
      <p class="my-4">기간: {{ selectedProject.project ? projectPeriod(selectedProject) : '' }}</p>
      <p class="my-4">상태: {{ projectStatus }}</p>
      <p class="my-4">역할: {{ selectedProject.projectRoleName }}</p>
      <p class="my-4">내용: {{ selectedProject.project ? selectedProject.project.projectDescription : '' }}</p>
      <div slot="modal-footer">
         <b-btn size="sm" class="float-right" variant="primary" @click="handleClickWeeklyReport">
           주간보고
         </b-btn>
       </div>
    </b-modal>
  </div>
</template>

<script>
import EmptyData from '../components/common/EmptyData.vue'
import common from '../assets/js/common'
import api from '../assets/js/api'

export default {
  name: 'project',
  mixins: [common, api],
  components: {
    EmptyData
  },
  data () {
    return {
      projectList: [],
      currentProjectList: [],
      pastProjectList: [],
      selectedProject: {},
      isShowDetail: false
    }
  },
  created () {
    this.$store.state.isMain = false
    this.init()
  },
  methods: {
    async init () {
      const reseponse = await this.getProjectList()
      if (reseponse.status === 200) {
        this.projectList = reseponse.data
        this.currentProjectList = this.projectList.filter(item => this.isCurrentProject(item))
        this.pastProjectList = this.projectList.filter(item => !this.isCurrentProject(item))
      }
      this.currentProjectList = this.projectList.filter(item => this.isCurrentProject(item))
      this.pastProjectList = this.projectList.filter(item => !this.isCurrentProject(item))
    },
    handleClickProject (event) {
      const projectSeq = event.currentTarget.dataset.projectSeq
      this.selectedProject = this.projectList.find(item => String(item.project.seq) === projectSeq)
      this.isShowDetail = true
    },
    projectPeriod (item) {
      if (!item || !item.project) return ''
      return `${item.project.projectStartDate.substring(0, 10)} ~ ${item.project.projectEndDate.substring(0, 10)}`
    },
    isCurrentProject (item) {
      const now = new Date()
      if (!item || !item.project) return false
      return item.project.projectStatus === '0' &&
             this.dateDiff(now, item.withdrawalDate) >= 0 &&
             this.dateDiff(now, item.project.projectEndDate) >= 0
    },
    handleClickWeeklyReport () {
      this.$router.push({ name: 'weeklyReport', params: { selectedProject: this.selectedProject }})
    }
  },
  computed: {
    projectStatus () {
      if (!this.selectedProject || !this.selectedProject.project) return ''
      return this.isCurrentProject(this.selectedProject) ? '진행 중' : '종료'
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

.list-container {
  margin: 10px 20px;
}
</style>
