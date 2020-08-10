// 来源：https://mp.weixin.qq.com/s/hRRfMVq_LNvYRDLz0_lEig

// 本文自是在此文章的介绍下实现一遍

/*
大文件上传原理
核心：利用 Blob.prototype.slice 方法 返回原文件的某个切片

客户端：
1. 预设一个最大数量将文件切分为一个个切片，借助 http 的并发，同时上传多个切片；大大减少上传时间
2. 由于传输到服务器的顺序有可能发生改变，所以需要给切片记录顺序

服务器端：
1. 需要接收切片，所有切片接收完成后合并切片
  * 考虑何时合并？ * 考虑如何合并？

  第一个问题需要前端配合，在每个切片都携带切片最大数量的信息，当服务器接收到这个数量的切片时自动合并

  第二个问题使用 NodeJS 的 API fs.appendFileSync 可以同步的将数据追加到指定文件，所以创建一个空文件，将所有切片逐步合并到文件中
 */


/**
 * 工具方法
 */
function request({
  url,
  method = "post",
  data,
  headers = {},
  requestList
}) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url)
    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key])
    })

    xhr.send(data);

    xhr.onload = e => {
      resolve({
        data: e.target.response
      })
    }
  })
}



(function () {
  var $btn = document.querySelector('#submit_btn')
  $btn.addEventListener('click', handleUpload)

  var $file = document.querySelector('#file')
  $file.addEventListener('change', handleFileChange)

  // -------------------------------------------

  const LENGTH = 1; // 切片数量

  var postData = []

  var container = {
    file: null,
    data: []
  }

  // var postData

  /**
   * 处理点击上传
   */
  function handleUpload() {
    console.log($file);
  }

  /**
   * 改变上传文件触发事件
   * @param {*} e
   */
  function handleFileChange(e) {
    // e 是一个类数组对象 FileList {0: File, length: 1}
    // File:
    // {
    //   lastModified: 1593664068786,
    //   lastModifiedDate: Thu Jul 02 2020 12:27:48 GMT+0800 (中国标准时间),
    //   name: "0702-2177.pdf",
    //   size: 36222,
    //   type: "application/pdf",
    //   webkitRelativePath: ""
    // }
    const [file] = e.target.files;
    console.log(file);
    if (!file) return;

    container.file = file;
  }

  /**
   *  创建上传切片数组
   * @param {*} file 上传的文件
   * @param {*} length 最大并行 chunk 个数
   */
  function createFileChunk(file, length = LENGTH) {
    const fileChinkList = []
    // 计算每个文件大小，向上取整 防止数据丢失
    const chunkSize = Math.ceil(file.size / length);

    let cur = 0;
    while (cur < file.size) {
      fileChinkList.push({
        file: file.slice(cur, cur + chunkSize)
      });
      cur += chunkSize;
    }

    return fileChinkList;
  }

  /**
   * 上传切片
   */
  async function uploadChunks() {
    const requestList = postData.map(({
      chunk,
      hash
    }) => {
      console.log("chunk", chunk)
      const formData = new FormData();
      formData.append("chunk", chunk);
      formData.append("hash", hash);
      formData.append("filename", container.file.name);
      return {
        formData
      }
    })
    .map(async ({ formData }) => {
      request({
        // url: "http://localhost:3000/upload/chunk",
        url: "http://localhost:3000/",
        data: formData
      })
    })
    // console.log(requestList)
    await Promise.all(requestList).then((values) => {
      console.log(values);
    }); // 并发切片

    await mergeRequest();
  }

  /**
   * 处理上传
   */
  async function handleUpload() {
    if (!container.file) return;
    const fileChunkList = createFileChunk(container.file);
    // fileChunkList: <Blob fils{size: 3626, type: ""}>[]
    console.log(fileChunkList);
    postData = fileChunkList.map(({
      file
    }, index) => ({
      chunk: file,
      hash: container.file.name + '-' + index // 文件名加下标
    }))

    console.log('postData', postData)

    await uploadChunks()
  }

  async function mergeRequest() {
    await request({
      // url: "http://localhost:3000/upload/merge",
      url: "http://localhost:3000/merge",
      headers: {
        "Content-Type": 'application/json;'
      },
      data: JSON.stringify({
        filename: container.file.name
      })
    })
  }

})()
