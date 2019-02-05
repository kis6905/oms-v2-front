const postConfig = {
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  }
}
const getConfig = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'jwt-header': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IlJPTEVfQURNSU4sUk9MRV9BUFBST1ZBTCxST0xFX1VTRVIiLCJpc3MiOiIxbGVhZiIsImV4cCI6MTU0OTUwOTEzNSwidXNlcklkIjoiaXNrd29uIiwidXNlclNlcSI6MX0.VSQd169Gln4h5wqjqA82YWWuUnbOqGxG_0VDZSAGkSM'
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
      return this.$http.get(`${apiDomain}/project/list`, getConfig)
    }
  }
}
