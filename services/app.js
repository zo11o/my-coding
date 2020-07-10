const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const router = new Router();
const path = require("path");
const json = require('koa-json')
const onerror = require('koa-onerror')
const routes = require('./routes')
const views = require("koa-views");
const bodyParser = require("koa-bodyparser");
const logger = require('koa-logger')
const config = require('./config')
// multipart/form-data
// const multer = require('koa-multer');
const utils = require('./utils')

const port = process.env.PORT || config.port

onerror(app);

app.use(bodyParser())
  .use(json())
  .use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  .use(views(path.join(__dirname, '/views'), {
    options: {settings: {views: path.join(__dirname, 'views')}},
    map: {'ejs': 'ejs'},
    extension: 'ejs'
  }))
  .use(router.routes())
  .use(router.allowedMethods())

app.use(async (ctx, next) => {
  const start = new Date().getTime(); // 当前时间
  await next(); // 调用下一个middleware
  const ms = new Date().getTime() - start; // 耗费时间
  console.log(`Time: ${ms}ms`); // 打印耗费时间
});

// 路由数据
routes(router);

module.exports = app.listen(port, () => {
  console.log(`server is starting at port ${port}`);
});
