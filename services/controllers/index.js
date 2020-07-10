const ajax = require('./ajax')
const home =  require('./home')

module.exports = {
  homeView: home.homeView,
  ajaxView: ajax.indexView,
  ajaxGetId: ajax.getId,
  ajaxPostInfo: ajax.postInfo
}
