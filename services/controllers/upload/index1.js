const fs = require('fs')
const fse = require("fs-extra");

const path = require('path');
const multiparty = require("multiparty");
const UPLOAD_DIR = path.resolve(__dirname, "../../", "upload");

/**
 *  合并 chunk 数据
 * @param {*} req
 */
const resolvePost = req => {
  return new Promise(resolve => {
    let chunk = "";
    req.on("data", data => {
      chunk += data;
    })

    req.on("end", () => {
      resolve(JSON.parse(chunk))
    })
  })
}

/**
 * 合并切片
 * @param {*} filePath
 * @param {*} filename
 */
const mergeFileChunk = async (filePath, filename) => {
  const chunkDir = `${UPLOAD_DIR}/${filename}`;
  const chunkPaths = await fse.readdir(chunkDir);
  console.log(1)
  console.log(chunkPaths)
  // 创建空文件
  // fs.writeFileSync(filePath, "");
  // console.log(2)

  // chunkPaths.forEach(chunkPath => {
  //   console.log(3)

  //   fse.appendFileSync(filePath, fse.readFileSync(`${chunkDir}/${chunkPath}`));
  //   console.log(4)

  //   fse.unlinkSync(`${chunkDir}/${chunkPath}`);
  // })
  // fse.rmdirSync(chunkDir); // 合并后删除保存切片的目录
}

const handleParse = () => {
  return new Promise((resolve, reject) => {


  })
}

const handleUpload = async (ctx) => {
  return new Promise((resolve, reject) => {
    console.log(1)
    const multipart = new multiparty.Form();
    multipart.parse(ctx.req, async (err, fields, files) => {
      if (err) {
        reject(err)
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
      if (fse.existsSync(`${chunkDir}/${hash}`)) {
        await fse.unlinkSync(`${chunkDir}/${hash}`)
      }
      try {
        await fse.move(chunk.path, `${chunkDir}/${hash}`);
      } catch (error) {
        reject(error)
      }
      console.log("--------------------跑到这里啦")

      resolve({
        code: 200,
        msg: "!!!!"
      });

    })
  })
}

module.exports = {
  indexView: async (ctx, next) => {
    let title = "Koa2";
    await ctx.render("upload", {
      title,
    });
  },
  chunk: async (ctx, next) => {
    // 设置 CORS 跨域 使用了 koa2-cors 之后跨域注释
    // ctx.set({
    //   'Access-Control-Allow-Origin': "http://localhost:52330",
    //   'Access-Control-Allow-Headers': 'Content-Type',
    //   'Access-Control-Allow-Methods': '*',
    //   'Content-Type': 'application/json; charset=utf-8'
    // })

    var data = await handleUpload(ctx)
    console.log(2)
    console.log('222---', data)
    ctx.body = data;
    // ctx.body = {
    //   code: 200,
    //   msg: "!!!!"
    // }
    // next();
    // let postParam = ctx.request.body
    // console.log('postParam', postParam)
    // ctx.body = {
    //   code: 200,
    //   msg: "访问成功"
    // }
  },

  merge: async (ctx, next) => {
    const data = await resolvePost(ctx.req);
    console.log('data', data)
    const {
      filename
    } = data;
    const filePath = `${UPLOAD_DIR}\\${filename}`;
    await mergeFileChunk(filePath, filename)

    ctx.body = {
      code: 0,
      msg: "file merged success"
    }
  }
}
