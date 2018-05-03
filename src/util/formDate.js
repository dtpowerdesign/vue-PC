export default {
  formatDate(date) {
    var datee = new Date(date)
    var year = datee.getFullYear()
    var month = datee.getMonth() + 1
    var day = datee.getDate()
    if (isNaN(year))
      return '1970-00-00';
    else {
      return year + '-' + this.formatTen(month) + '-' + this.formatTen(day)
    }
  },
  formatTen(num) {
    return num > 9 ? (num + '') : ('0' + num)
  },
  formatFromObjDate(obj) {
    return [].concat(this.formatTen(obj.time.year + 1900), this.formatTen(obj.time.month + 1), this.formatTen(obj.time.seconds)).join('/')
  },
  formatFromObjHour(obj) {
    return [].concat(this.formatTen(obj.time.hours), this.formatTen(obj.time.minutes), this.formatTen(obj.time.seconds)).join(':')
  }
}
