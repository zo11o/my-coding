const upload = require('./upload');
const multer = require('koa-multer');
const path = require('path')
const UPLOAD_DIR = path.resolve(__dirname, "../../", "upload");

const storage = multer.diskStorage({
  // 文件保存路径，注意 window 和 linux 系统存储路径写法区别
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR)
  },
  // 修改文件名称
  filename: function (req, file, cb) {
    // const fileFormat = (file.originalname).split('.');

  }
})

module.exports = {
  indexView: async (ctx, next) => {
    let title = "Koa2";
    await ctx.render("upload", {
      title,
    });
  },
  chunk: async (ctx, nex) => {
    console.log(ctx.req)
    // await upload(ctx)
  },

  merge: async (ctx, next) => {
    console.log(2122)
    // const data = await resolvePost(ctx.req);
    // console.log('data', data)
    // const {
    //   filename
    // } = data;
    // const filePath = `${UPLOAD_DIR}\\${filename}`;
    // await mergeFileChunk(filePath, filename)

    // ctx.body = {
    //   code: 0,
    //   msg: "file merged success"
    // }
  }
}
