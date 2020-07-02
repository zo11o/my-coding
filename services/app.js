const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const router = new Router();
const fs = require("fs");
const path = require("path");
// multipart/form-data
// const multer = require('koa-multer');
const bodyParser = require("koa-bodyparser");
const views = require("koa-views");
const files = fs.readdirSync(__dirname + "/controllers");

const utils = require('./utils')
// 过滤出.js文件:
const js_files = files.filter((file) => {
    return file.endsWith(".js");
});

// 处理每个js文件:
for (let f of js_files) {
    console.log(`process controller: ${f}...`);
    console.log(__dirname + "/controllers/" + f);
    // 导入js文件:
    let mapping = require(__dirname + "/controllers/" + f);
    console.log(mapping);
    for (var url in mapping) {
        if (url.startsWith("GET ")) {
            // 如果url类似"GET xxx":
            let path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith("POST ")) {
            // 如果url类似"POST xxx":
            let path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            // 无效的URL:
            console.log(`invalid URL: ${url}`);
        }
    }
}

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method}  ${ctx.request.url} ...`);
    await next();
});

app.use(async (ctx, next) => {
    const start = new Date().getTime(); // 当前时间
    await next(); // 调用下一个middleware
    const ms = new Date().getTime() - start; // 耗费时间
    console.log(`Time: ${ms}ms`); // 打印耗费时间
});

router.get("/", async (ctx, next) => {
    ctx.response.body = "<h1>Home page</h1>";
});

router.get("/api/getId", async (ctx, next) => {
    let id = ctx.request;
    console.log(ctx);
    if (id) {
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: "查询成功",
            data,
        };
    } else {
        ctx.response.status = 416;
        ctx.body = {
            code: 416,
            msg: "文章ID必须传",
        };
    }
});

router.post('/api/postInfo', async (ctx, next) => {
    let postParam = ctx.request.body
    console.log('postParam', postParam)

    if (postParam.name) {
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: '操作成功',
            data: postParam
        }
    } else {
        ctx.response.status = 416;
        ctx.body = {
            code: 416,
            msg: "操作有误",
        };
    }
})

router.post("/login", async (ctx, next) => {
    let name = ctx.request.body.name || "",
        password = ctx.request.body.password || "";
    console.log(`login with name: ${name}, password: ${password}`);
    if (name === "hello" && password === "123456") {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
});

app.use(
    views(path.join(__dirname, "./views"), {
        extension: "ejs",
    })
);

// 简单用法如下
app.use(async (ctx, next) => {
    if (ctx.request.path === "/test") {
        let title = "Koa2";
        await ctx.render("test", {
            title,
        });
    } else {
        await next();
    }
});

app.use(bodyParser());

app.use(router.routes());

app.listen(3000, () => {
    console.log("server is starting at port 3000");
});
