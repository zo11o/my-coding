const controllers = require('../controllers/index')


module.exports = (router) => {

  router.get("/axios",controllers.axiosView);

  router.get("/axios/getId", controllers.axiosGetId);

  router.post('/axios/postInfo', controllers.axiosPostInfo)
}
