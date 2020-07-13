module.exports = {
  indexView: async (ctx, next) => {
    let title = "Koa2";
    await ctx.render("ajax", {
      title,
    });
  },
  getInfo: async (ctx, next) => {
    let id = ctx.request;
    ctx.set({
      'context-type': 'application/json'
    })
    var data = {
      id: '3231',
      name: 'zo11o'
    }

    ctx.response.status = 200;
    ctx.body = {
      code: 200,
      msg: "查询成功",
      data,
    };

  },
}
