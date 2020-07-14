module.exports = {
  indexView: async (ctx, next) => {
    let title = "Koa2";
    await ctx.render("ajax", {
      title,
    });
  },
  getInfo: async (ctx, next) => {
    // let id = ctx.request;
    // ctx.set({
    //   'context-type': 'application/json'
    // })
    // var data = {
    //   id: '3231',
    //   name: 'zo11o'
    // }

    // ctx.response.status = 200;
    // ctx.body = {
    //   code: 200,
    //   msg: "查询成功",
    //   data,
    // };

    let callbackName = ctx.query.callback || 'callback'
    let returnData = {
      success: true,
      data: {
        text: 'this is a jsonp api',
        time: new Date().getTime(),
      }
    }
    // jsonp的script字符串
    let jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`
    // 用text/javascript，让请求支持跨域获取
    ctx.type = 'text/javascript'
    // 输出jsonp字符串
    ctx.body = jsonpStr

  },
}
