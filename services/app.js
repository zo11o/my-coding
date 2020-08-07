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
const cors = require('koa2-cors')
const koaBody = require('koa-body')
// multipart/form-data
// const multer = require('koa-multer');
const utils = require('./utils')

const port = process.env.PORT || config.port

onerror(app);

app.use(cors({
  origin: function (ctx) {
    return '*'
  },
  maxAge: 5, // 指定本次预检请求的有效期， 单位为秒
  credentials: true, //  是否允许发送 Cookie
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'Content-Length', 'X-Requested-With'], //设置服务器支持的所有头信息字段
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
}))

// 处理 OPTIONS 预请求 还有跨域请求 CORS
// app.use(async (ctx, next)=> {
//   ctx.set('Access-Control-Allow-Origin', '*');
//   ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//   ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//   if (ctx.method == 'OPTIONS') {
//     ctx.body = 200;
//   } else {
//     await next();
//   }
// });

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
