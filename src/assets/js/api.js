const getConfig = {
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}
const postConfig = {
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}
const apiDomain = process.env.VUE_APP_API_DOMAIN

export default {
  methods: {
    async login (data) {
      const requestConfigForLogin = {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        }
      }
      const response = await this.$http.post(`${apiDomain}/login`, data, requestConfigForLogin)
      const jwtHeader = response.headers['jwt-header']
      getConfig.headers['jwt-header'] = jwtHeader
      postConfig.headers['jwt-header'] = jwtHeader
      return response
    },
    requestGet (url) {
      if (process.env.VUE_APP_MODE === 'L') {
        getConfig.headers['jwt-header'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IlJPTEVfQURNSU4sUk9MRV9BUFBST1ZBTCxST0xFX1VTRVIiLCJpc3MiOiJkZXZlbGVhZiIsImV4cCI6MTU2NjI3ODkzMCwidXNlcklkIjoiaXNrd29uIiwidXNlclNlcSI6MX0.yF5rGTSPA0v0iua4uUHa5ZOBfsOWUtaiegIq8FwpC9k'
      }
      return this.$http.get(`${apiDomain}${url}`, getConfig)
    },
    getProjectList () {
      return this.requestGet('/project/list')
    },
    getWeeklyReportList (projectSeq) {
      return this.requestGet(`/project/${projectSeq}/weeklyReport/list`)
    }
  }
}
