const ajax = require('./ajax')
const home =  require('./home')
const jsonp =  require('./jsonp')
const axios = require('./axios')
const upload = require('./upload')

module.exports = {
  homeView: home.homeView,
  ajaxView: ajax.indexView,
  ajaxGetId: ajax.getId,
  ajaxPostInfo: ajax.postInfo,
  jsonpGetInfo: jsonp.getInfo,

  // axios 测试页面
  axiosView: axios.indexView,
  axiosGetId: axios.getId,
  axiosPostInfo: axios.postInfo,

  // 大文件上传
  uploadView: upload.indexView,
  uploadChunk: upload.chunk,
  uploadMerge: upload.merge,
}
