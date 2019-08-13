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
      // if (process.env.VUE_APP_MODE === 'L') {
      //   getConfig.headers['jwt-header'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IlJPTEVfQURNSU4sUk9MRV9BUFBST1ZBTCxST0xFX1VTRVIiLCJpc3MiOiIxbGVhZiIsImV4cCI6MTU1NTEyNDMyOSwidXNlcklkIjoiaXNrd29uIiwidXNlclNlcSI6MX0.k-SLA6KCv1gHn9b-fFgzVS2AWiUzIFE0ZUlMOP7oO4M'
      // }
      return this.$http.get(`${apiDomain}${url}`, getConfig)
    },
    getProjectList () {
      return this.requestGet('/project/list')
    }
  }
}
