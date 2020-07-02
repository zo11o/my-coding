const Koa = require('koa');
const fs = require('fs')
const app = new Koa();

function render(page) {
  return new Promise((resolve, reject) => {
    let pageUrl = `./services/pages/${page}`;
    // 生成二进制流
    fs.readFile(pageUrl, "binary", (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

// 识别url,判断所请求的页面
async function route(url) {
  let page = '404.html';
  switch (url) {
    case '/':
      page = 'index.html';
      break;
    case '/index':
      page = 'index.html';
      break;
    case '/koa':
      page = 'koa.html';
      break;
    default:
      break;
  }

  let html = await render(page);
  return html;
}

app.use(async ctx => {
  let url = ctx.request.url;
  let html = await route(url);
  ctx.type = "text/html;charset=utf-8";
  ctx.body = html;
});

app.listen(3000, () => {
  console.log(`server is starting at port 3000`)
});