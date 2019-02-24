const postConfig = {
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  }
}
const getConfig = {
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}
const apiDomain = process.env.VUE_APP_API_DOMAIN

export default {
  methods: {
    async login (data) {
      const response = await this.$http.post(`${apiDomain}/login`, data, postConfig)
      const jwtHeader = response.headers['jwt-header']
      postConfig.headers['jwt-header'] = jwtHeader
      getConfig.headers['jwt-header'] = jwtHeader
      return response
    },
    getProjectList () {
      return this.requestGet('/project/list')
    }
  }
}
