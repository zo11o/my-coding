module.exports = {
  homeView: async (ctx, next) => {
    let title = "欢迎来到我们的测试服务";
    await ctx.render("home", {
      title,
    });
  }
}
