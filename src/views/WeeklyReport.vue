<template>
  <div>
    주간보고
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
  data () {
    return {
      projectList: []
    }
  },
  created () {
    this.$store.state.isMain = false
    this.init()
  },
  methods: {
    async init() {
    }
  },
  computed: {
  }
}
</script>

<style lang="less" scoped>
</style>
