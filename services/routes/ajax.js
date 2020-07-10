const controllers = require('../controllers/index')


module.exports = (router) => {

  router.get("/ajax",controllers.ajaxView);

  router.get("/api/getId", controllers.ajaxGetId);

  router.post('/api/postInfo', controllers.ajaxPostInfo)
}
