const controllers = require('../controllers/index')


module.exports = (router) => {
  router.get("/", controllers.homeView);
}
