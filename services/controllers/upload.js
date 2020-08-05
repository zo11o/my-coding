const fse = require("fs-extra");
const path = require('path');
const multiparty = require("multiparty");
const UPLOAD_DIR = path.resolve(__dirname, "../", "upload");

module.exports = {
  indexView: async (ctx, next) => {
    let title = "Koa2";
    await ctx.render("upload", {
      title,
    });
  },
  chunk: async (ctx, next) => {
    // 设置 CORS 跨域
    ctx.set({
      'Access-Control-Allow-Origin': "http://localhost:52330",
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': '*',
      'Content-Type': 'application/json; charset=utf-8'
    })

    if (ctx.request.method === "OPTIONS") {
      ctx.response.status = 200;
      ctx.body = {}
      return
    }

    const multipart = new multiparty.Form();
    console.log('ctx.req',ctx.req)
    multipart.parse(ctx.req, async (err, fields, files) =>{
      if (err) {
        console.log('err======', err)
        return
      }

      const [chunk] = files.chunk;
      const [hash] = fields.hash;
      const [filename] = fields.filename;
      const chunkDir = `${UPLOAD_DIR}/${filename}`

      // 切片目录不存在，创建目录
      if (!fse.existsSync(chunkDir)) {
        await fse.mkdirs(chunkDir);
      }
      console.log(chunk.path)

      // 如果文件已经存在， 删除源文件
      // if (fse.existsSync(`${chunkDir}/${hash}`)) {
      //   await fse.unlinkSync(`${chunkDir}/${hash}`)
      // }
      try {
       await fse.move(chunk.path, `${chunkDir}/${hash}`);
      } catch (error) {
        console.log(error);
        ctx.body = {
          status: "500",
          message: '操作失败'
        }
      }
      console.log("--------------------跑到这里啦")
      ctx.res = "车工啦"
    })


    let postParam = ctx.request.body
    console.log('postParam', postParam)

    // if (postParam.name) {
    //   ctx.response.status = 200;
    //   ctx.body = {
    //     code: 200,
    //     msg: '操作成功',
    //     data: postParam
    //   }
    // } else {
    //   ctx.response.status = 416;
    //   ctx.body = {
    //     code: 416,
    //     msg: "操作有误",
    //   };
    // }
    ctx.body = {
      code: 200,
      msg: "访问成功"
    }
  }
}
