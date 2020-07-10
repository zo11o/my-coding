const controllers = require('../controllers/index')
const home = require('./home');
const ajax = require('./ajax');

module.exports = (router) => {
  home(router)
  ajax(router)
}
