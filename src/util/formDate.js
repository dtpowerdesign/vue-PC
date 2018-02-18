export default {
  formatDate(date) {
    var datee = new Date(date)
    var year = datee.getFullYear()
    var month = datee.getMonth() + 1
    var day = datee.getDate()
    if (isNaN(year))
      return '未填';
    else {
      return year + '-' + this.formatTen(month) + '-' + this.formatTen(day)
    }
  },
  formatTen(num) {
    return num > 9 ? (num + '') : ('0' + num)
  }
}
