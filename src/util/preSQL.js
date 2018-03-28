export default {
  pre(str) {
    var val1 = '\''
    var val2 = '"'
    var val3 = '%'
    if ((str.search(val1) === -1) && (str.search(val2) === -1) && (str.search(val3) === -1))
      return true
    else return false
  }
}
