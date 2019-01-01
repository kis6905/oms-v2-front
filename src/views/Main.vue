<template>
  <div>
    <h1>this is main page</h1>
  </div>
</template>

<script>
import common from '../assets/js/common'
import api from '../assets/js/api'

export default {
  name: 'main',
  mixins: [common, api],
  data: () => {
    return {
      userId: '',
      password: ''
    }
  },
  mounted: () => {
    console.log('mounted')
  },
  methods: {
  }
}
</script>

<style lang="less">
</style>
