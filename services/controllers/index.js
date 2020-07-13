const ajax = require('./ajax')
const home =  require('./home')
const jsonp =  require('./jsonp')

module.exports = {
  homeView: home.homeView,
  ajaxView: ajax.indexView,
  ajaxGetId: ajax.getId,
  ajaxPostInfo: ajax.postInfo,
  jsonpGetInfo: jsonp.getInfo
}
