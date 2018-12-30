export default {
  methods: {
    requestGet: function (url) {
      return this.$http.get(url)
    },
    requestPost: function (url, data, config) {
      return this.$http.post(url, data, config)
    },
    requestPostJson: function (url, data) {
      return this.$http.post(url, data, {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      })
    }
  }
}
