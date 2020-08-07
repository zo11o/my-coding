const controllers = require('../controllers/index')

module.exports = (router) => {

  router.get("/upload",controllers.uploadView);
  router.post("/upload/chunk", controllers.uploadChunk);
  router.post("/upload/merge", controllers.uploadMerge);
}
