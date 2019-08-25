const getConfig = {
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}
const postConfig = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'multipart/form-data'
  }
}
const apiDomain = process.env.VUE_APP_API_DOMAIN
const jwtForLocal = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IlJPTEVfQURNSU4sUk9MRV9BUFBST1ZBTCxST0xFX1VTRVIiLCJpc3MiOiJkZXZlbGVhZiIsIm5hbWUiOiLqtozsnbzsiJgiLCJyYW5rIjoi64yA66asIiwiZXhwIjoxNTY2ODg0NzgwLCJ1c2VySWQiOiJpc2t3b24iLCJ1c2VyU2VxIjoxfQ.hNNFHiRbRCzItg9-ecG7K0Kv_cmaXssWC5F3eMf0l34'

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
        getConfig.headers['jwt-header'] = jwtForLocal
      }
      return this.$http.get(`${apiDomain}${url}`, getConfig)
    },
    requestPost (url, data) {
      if (process.env.VUE_APP_MODE === 'L') {
        postConfig.headers['jwt-header'] = jwtForLocal
      }
      let form = new FormData()
      for (let paramName in data) {
        const value = data[paramName]
        if (value) {
          form.append(paramName, data[paramName])
        }
      }
      return this.$http.post(`${apiDomain}${url}`, form, postConfig)
    },
    getProjectList () {
      return this.requestGet('/project/list')
    },
    getWeeklyReportList (projectSeq) {
      return this.requestGet(`/project/${projectSeq}/weeklyReport/list`)
    },
    saveWeeklyReport (data) {
      return this.requestPost(`/project/${data.projectSeq}/weeklyReport`, data)
    }
  }
}
