<template>
  <div class="contents">
    <Navbar></Navbar>
    <div>
      <div class="title">
        <h4>현재 투입된 프로젝트</h4>
      </div>
      <div class="list-container">
        <b-card-group deck class="mb-3">
            <b-card v-for="item in projectList"
                    :key="item.seq"
                    border-variant="info"
                    :header="item.project.projectName"
                    header-bg-variant="info"
                    header-text-variant="white"
                    align="center"
                    @click="handleCurrentProject"
                    :data-project-id="item.seq">
              <p class="card-text">발주처: {{ item.project.projectClient }}</p>
              <p class="card-text">기간: {{ item.project.projectStartDate.substring(0, 10) }} ~ {{ item.project.projectEndDate.substring(0, 10) }}</p>
            </b-card>
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
    background-color: rgb(78, 119, 180);
    margin-top: 1px;
    text-align: center;
    font-size: 15px;
    padding: 10px 0 2px 0;
  }

  .list-container {
    margin: 10px 20px;
  }
}
</style>
