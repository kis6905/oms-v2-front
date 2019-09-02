<template>
  <div>
    Admin - User 관리
  </div>
</template>

<script>
import common from '../assets/js/common'
import api from '../assets/js/api'

export default {
  name: 'adminUser',
  mixins: [common, api],
  components: {},
  props: [],
  data () {
    return {
    }
  },
  created () {
    this.$store.state.isMain = false
    this.init()
  },
  methods: {
    async init () {
      console.log('init')
    },
  },
  computed: {
  }
}
</script>

<style lang="less" scoped>
</style>
