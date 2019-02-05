<template>
  <div class="contents">
    <Navbar></Navbar>
    <div>
      <div class="title">
        <h4>현재 투입된 프로젝트</h4>
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
                  @click="handleCurrentProject"
                  :data-project-seq="item.seq">
            <p class="card-text">발주처: {{ item.project.projectClient }}</p>
            <p class="card-text">기간: {{ projectPeriod(item) }}</p>
          </b-card>
        </b-card-group>
      </div>
    </div>
    <div>
      <div class="title">
        <h4>참여했던 프로젝트</h4>
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
                  @click="handleCurrentProject"
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
             footer-bg-variant="light"
             footer-text-variant="dark"
             :title="selectedProject.project ? selectedProject.project.projectName : ''">
      <p class="my-4">발주처: {{ selectedProject.project ? selectedProject.project.projectClient : '' }}</p>
      <p class="my-4">기간: {{ selectedProject.project ? projectPeriod(selectedProject) : '' }}</p>
      <p class="my-4">상태: {{ projectStatus }}</p>
      <p class="my-4">내용: {{ selectedProject.project ? selectedProject.project.projectDescription : '' }}</p>
      
      <div slot="modal-footer">
         <b-btn size="sm" class="float-right" variant="primary" @click="isShowDetail=false">
           확인
         </b-btn>
       </div>
    </b-modal>
  </div>
</template>

<script>
import Navbar from '../components/main/NavbarMain.vue'
import EmptyData from '../components/common/EmptyData.vue'
import common from '../assets/js/common'
import api from '../assets/js/api'

export default {
  name: 'project',
  mixins: [common, api],
  components: {
    Navbar,
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
    this.init()
  },
  methods: {
    async init () {
      const reseponse = await this.getProjectList()
      if (reseponse.status === 200) {
        this.projectList = reseponse.data
        this.currentProjectList = this.projectList
                                    .filter(item => this.isCurrentProject(item))
        this.pastProjectList = this.projectList
                                 .filter(item => !this.isCurrentProject(item))
      }
    },
    handleCurrentProject (event) {
      const projectSeq = event.currentTarget.dataset.projectSeq
      this.selectedProject = this.projectList.find(item => item.project.seq == projectSeq)
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
    }
  },
  computed: {
    projectStatus () {
      const now = new Date()
      if (!this.selectedProject || !this.selectedProject.project) return ''
      return this.isCurrentProject(this.selectedProject) ? '진행 중' : '종료'
    }
  }
}
</script>

<style lang="less" scoped>
.contents {
  width: 100wh;
  height: 100vh;

  .title {
    width: 100%;
    color: white;
    background: linear-gradient(-45deg, #863fe6, #1a94ce);
    margin-top: 1px;
    text-align: center;
    padding: 10px 0 2px 0;
  }

  .list-container {
    margin: 10px 20px;
  }
}
</style>
