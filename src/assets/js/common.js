Date.prototype.getWeek = function () {
  var onejan = new Date(this.getFullYear(), 0, 1)
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7)
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
    }
  }
}
