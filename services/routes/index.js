const controllers = require('../controllers/index')
const home = require('./home');
const ajax = require('./ajax');
const jsonp = require('./jsonp')
const axios = require('./axios');
const upload = require('./upload');

module.exports = (router) => {
  home(router)
  ajax(router)
  jsonp(router)
  axios(router)
  upload(router)
}
