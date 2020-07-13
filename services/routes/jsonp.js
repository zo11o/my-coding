const controllers = require('../controllers/index')


module.exports = (router) => {

  router.get("/jsonp/getInfo", controllers.jsonpGetInfo);

}
