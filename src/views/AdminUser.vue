<template>
  <div>
    <div class="title">
      <v-icon name="clipboard"></v-icon>
      직원 관리
    </div>
    <div class="list-container">
      <EmptyData :isShow="filteredUserList.length === 0"></EmptyData>
      <div class="user-area" v-if="filteredUserList.length > 0">
      <b-button v-for="user in filteredUserList"
                :key="user.seq"
                @click="handleClickUser"
                variant="outline-primary"
                :block="true">{{ user.name }} {{ user.rank }}</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import EmptyData from '../components/common/EmptyData.vue'
import common from '../assets/js/common'
import api from '../assets/js/api'

export default {
  name: 'adminUser',
  mixins: [common, api],
  components: {
    EmptyData
  },
  props: [],
  data () {
    return {
      userList: [],
      filteredUserList: []
    }
  },
  created () {
    this.$store.state.isMain = false
    this.init()
  },
  methods: {
    async init () {
      const response = await this.getUserList()
      if (response.status === 200) {
        this.userList = response.data
        this.filteredUserList = response.data
      }
      console.log(this.userList)
    },
    handleClickUser () {
      console.log('handleClickUser')
    }
  },
  computed: {
  }
}
</script>

<style lang="less" scoped>
.list-container {
  margin: 10px 10px 10px 10px;

  button:hover,
  button:not(:disabled):not(.disabled):active,
  button:not(:disabled):not(.disabled).active,
  .show > button.dropdown-toggle {
    color: #007bff;
    background-color: #fff0;
  }
}
</style>
