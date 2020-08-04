module.exports = {
  indexView: async (ctx, next) => {
    let title = "Koa2";
    await ctx.render("axios", {
      title,
    });
  },
  getId: async (ctx, next) => {
    // 设置 CORS 跨域
    ctx.set({
      'Access-Control-Allow-Origin': "http://localhost:52330",
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': '*',
      'Content-Type': 'application/json; charset=utf-8'
    })


    let id = ctx.request;
    console.log(ctx);
    var data = {
      id: '3231',
      name: 'zo11o'
    }
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
  },
  postInfo: async (ctx, next) => {
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
  }
}
