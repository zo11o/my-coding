module.exports = {
  indexView: async (ctx, next) => {
    let title = "Koa2";
    await ctx.render("ajax", {
      title,
    });
  },
  getId: async (ctx, next) => {
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
