const controllers = require('../controllers/index')
const home = require('./home');
const ajax = require('./ajax');
const jsonp = require('./jsonp')

module.exports = (router) => {
  home(router)
  ajax(router)
  jsonp(router)
}
