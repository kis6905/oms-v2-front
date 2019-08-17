Date.prototype.getWeek = function () {
  const onejan = new Date(this.getFullYear(), 0, 1)
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7)
}
Date.prototype.yyyymmdd = function(format) {
  var mm = this.getMonth() + 1
  var dd = this.getDate()
  const dateString = [this.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('-')
  if (format === 'yyyy-mm-dd') {
    return dateString
  } else {
    return dateString.replace(/-/g, '')
  }
}

export default {
  methods: {
    dateDiff (date1, date2) {
      let diffDate1 = date1 instanceof Date ? date1 : new Date(date1)
      let diffDate2 = date2 instanceof Date ? date2 : new Date(date2)
      diffDate1 = new Date(diffDate1.getFullYear(), diffDate1.getMonth(), diffDate1.getDate())
      diffDate2 = new Date(diffDate2.getFullYear(), diffDate2.getMonth(), diffDate2.getDate())
      let diff = diffDate2.getTime() - diffDate1.getTime()
      diff = Math.ceil(diff / (1000 * 3600 * 24))
      return diff
    },
    weekDiff (date1, date2) {
      let diffDate1 = date1 instanceof Date ? date1 : new Date(date1)
      let diffDate2 = date2 instanceof Date ? date2 : new Date(date2)
      const date1FullYear = diffDate1.getFullYear()
      const date2FullYear = diffDate2.getFullYear()
      const date1Week = diffDate1.getWeek()
      const date2Week = diffDate2.getWeek()
      if (date1FullYear < date2FullYear) {
        const lastDate1 = new Date(date1FullYear, 11, 31)
        const lastWeekOfDate1 = lastDate1.getWeek()
        return (lastWeekOfDate1 - date1Week) + date2Week
      } else {
        return date2Week - date1Week + 1
      }
    },
    getMondayDateFrom (date) {
      const day = date.getDay()
      let addDay = 0
      if (day === 6 || day === 0) {
        addDay = day === 6 ? 2 : 1
      } else {
        addDay = -(day - 1)
      }
      date.setDate(date.getDate() + addDay)
      return date
    },
    parseJwt (token) {
      var base64Url = token.split('.')[1]
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(''))
      return JSON.parse(jsonPayload);
    }
  }
}
