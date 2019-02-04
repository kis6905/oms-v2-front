<template>
  <div class="contents">
    <Navbar></Navbar>
    <div>
      <div class="title">
        <h4>현재 투입된 프로젝트</h4>
      </div>
      <div class="list-container">
        <b-card-group deck class="mb-3">
          <div v-for="item in projectList"
               :key="item.seq">
            <b-card v-if="isCurrentProject(item)"
                    border-variant="info"
                    :header="item.project.projectName"
                    header-bg-variant="info"
                    header-text-variant="white"
                    align="center"
                    @click="handleCurrentProject"
                    :data-project-id="item.seq">
              <p class="card-text">발주처: {{ item.project.projectClient }}</p>
              <p class="card-text">기간: {{ projectPeriod(item) }}</p>
            </b-card>
          </div>
        </b-card-group>
      </div>
    </div>
    <div>
      <div class="title">
        <h4>참여했던 프로젝트</h4>
      </div>
      <div class="list-container">
        <b-card-group deck class="mb-3">
          <div v-for="item in projectList"
               :key="item.seq">
            <b-card v-if="isPastProject(item)"
                    border-variant="default"
                    :header="item.project.projectName"
                    header-bg-variant="default"
                    header-text-variant="black"
                    align="center"
                    @click="handleCurrentProject"
                    :data-project-id="item.seq">
              <p class="card-text">발주처: {{ item.project.projectClient }}</p>
              <p class="card-text">기간: {{ projectPeriod(item) }}</p>
            </b-card>
          </div>
        </b-card-group>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/main/NavbarMain.vue'
import common from '../assets/js/common'
import api from '../assets/js/api'

export default {
  name: 'project',
  mixins: [common, api],
  components: {
    Navbar
  },
  data () {
    return {
      projectList: []
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
      }
      console.log(this.projectList)
    },
    handleCurrentProject (event) {
      console.log(event)
    },
    isCurrentProject (item) {
      const now = new Date()
      return item.project.projectStatus === '0' &&
             this.dateDiff(now, item.withdrawalDate) >= 0 &&
             this.dateDiff(now, item.project.projectEndDate) >= 0
    },
    isPastProject (item) {
      const now = new Date()
      return item.project.projectStatus !== '0' ||
             this.dateDiff(now, item.withdrawalDate) <= 0 ||
             this.dateDiff(now, item.project.projectEndDate) <= 0
    },
    projectPeriod (item) {
      return `${item.project.projectStartDate.substring(0, 10)} ~ ${item.project.projectEndDate.substring(0, 10)}`
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
    // background-color: #479de6;
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
