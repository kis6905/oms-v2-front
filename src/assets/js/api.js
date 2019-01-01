const httpConfig = {
  'Content-Type': 'application/json;charset=utf-8',
  'Access-Control-Allow-Origin': '*'
}
const apiDomain = process.env.VUE_APP_API_DOMAIN

export default {
  methods: {
    login: async function (data) {
      const response = await this.$http.post(`${apiDomain}/login`, data, httpConfig)
      httpConfig['jwt-header'] = response.headers['jwt-header']
      this.$router.push('main')
      return response
    }
  }
}
