/**
 * 本文讨论如果通过前端将 图片进行压缩上传和一些遇到的一些问题
 * 参考链接：https://segmentfault.com/a/1190000023486410
 */
/*
 相关对象:

  1. File
  2. Image URL
  3. Image Object
  4. DataURL
  5. Canvas
  6. Blob

  相关 API :
  1. file2Image(file, callback)
  2. url2Image(url, callback)
  3. file2DataUrl(file, callback)
  4. dataUrl2Image(dataUrl, callback)
  5. dataUrl2Blob(dataUrl, type)
  6. image2Canvas(image)
  7. canvas2Blob(canvas, callback, quality, type);
  8. blob2DataUrl(blob)
  9. canvas2DataUrl(canvas, quality, type)
  10. blob2Image(blob, callback)
*/



/*
  一、 具体介绍实现

  file2DataUrl(file, callback) API

  FileReader 对象允许 Web 应用程序异步读取存储在计算机上的文件（或原始数据缓冲区）的内容，
  使用 File 或 Blob 对象指定要读取的数据或者文件。
  File / Blob 实例方法 readAsDataURL 读取文件并转化为 base64 字符串

 */
/**
 * 将文件转化为 DataURL
 * @param {*} file
 * @param {*} callback
 */
function file2DataUrl(file, callback) {
  var reader = new FileReader();

  reader.onload = function () {
    callback(reader.result)
  };

  reader.readAsDataURL(file);
}

/**
 * 将本地上传图片文件转化为 base64 字符串作为图片或者引用 URL 对象
 */
function file2Image(file, callback) {
  var image = new Image();
  var URL = window.webkitURL || window.URL

  if (URL) {
    var url = URL.createObjectURL(file);
    image.onload = function () {
      callback(image);
      // 好释放它占用的内容
      window.revokeObjectURL(url);
    }
    image.src = url;
  } else {
    file2DataUrl(file, function (dataUrl) {
      image.onload = function () {
        callback(image)
      }
      image.src = dataUrl;
    })
  }
}

/**
 * url 链接获取为 image 对象
 * @param {*} url
 * @param {*} callback
 */
function url2Image(url, callback) {
  var image = new Image();
  image.src = url;
  image.onload = function () {
    callback(image);
  }
}

/**
 * 利用 drawImage() 方法将 Image 对象绘画在 Canvas 对象上
 * @param {*} image
 */
function image2Canvas(image) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  // 图片自身宽度
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas;
}

/**
 * 将 canvas 转化为 DataURL
 * @param {*} canvas canvas 对象
 * @param {*} quality 质量
 * @param {*} type 图片格式，默认为 image/png。
 */
function canvas2DataUrl(canvas, quality, type) {
  // HTMLCanvasElement 对象有 toDataURL(type, encoderOptions) 方法
  // encoderOptions 在指定图片格式为 image/jpeg 或 image/webp 的情况下，可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 0.92，其他参数会被忽略。
  return canvas.toDataURL(type || 'image/jpeg', quality || 0.8)
}


/**
 * 图片链接 base64 字符串
 * @param {*} dataUrl base64 字符串
 * @param {*} callback 回调函数
 */
function data2UrlImage(dataUrl, callback) {
  var image = new Image();
  image.onload = function () {
    callback(image);
  }

  image.src = dataUrl;
}

/**
 * 将 dataURL 字符串转化为 Blob 对象
 * @param {*} dataUrl
 * @param {*} type
 */
function dataUrl2Blob(dataUrl, type) {
  // 主要思路
  // 将 dataURL 数据部分提取出来
  // 用 atob 对经过 base64 编码的字符串进行解码，再转化为 Unicode 编码，存储再 Uint8Array 类型数组
  // 最后转化为 Blob 对象

  // base64组成： data:<mediatype>,<data></data>
  // 例如 base64 字符串形式：data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAgAElEQVR4XuxdB5g
  //    0: "data:image/png;base64,"
  //    1: "image/png"
  //    2: ";base64"
  //     groups: undefined
  //     index: 0
  //     input: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAgAElEQVR4XuxdB5g"
  //     length: 3

  // 在 JavaScript 中，有两个函数被分别用来处理解码和编码 base64 字符串：解码 atob() 和 编码 btoa()
  // 链接： https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/Base64_encoding_and_decoding

  var data = dataUrl.split(',')[1]
  var mimePattern = /^data:(.*?)(;base64)?,/;
  var mime = dataUrl.match(mimePattern)[1]
  var binStr = atob(data);
  var len = binStr.length;
  var arr = new Uint8Array(len);

  for (var i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i);
  }
  return new Blob([arr], {
    type: type || mime
  })
}

/**
 * canvas 转化为 blob
 * @param {*} canvas canvas 实例
 * @param {*} callback 回调函数
 * @param {*} quality 参数用于针对 image/jpeg 格式的图片进行输出图片的质量设置
 * @param {*} type 类型 mime
 */
function canvas2Blob(canvas, callback, quality, type) {

  // 兼容低版本浏览器 polyfill 方案
  if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
      value: function (callback, type, quality) {
        let dataUrl = this.toDataURL(type, quality);
        callback(dataUrl2Blob(dataUrl))
      }
    })
  }

  canvas.toBlob(function (blob) {
    callback(blob)
  }, type || 'image/jpeg', quality || 0.8)
}


/**
 * blob 转化为 dataURL
 * 由于 FileReader 的实例 readAsDataURL 方法不仅支持读取文件, 还支持读取 Blob 对象数据，
 * @param {*} blob
 * @param {*} callback
 */
function blob2DataUrl(blob, callback) {
  file2DataUrl(blob, callback);
}

/**
 * blob 转化为 image 对象
 * @param {*} blob
 * @param {*} callback
 */
function blob2Image(blob, callback) {
  file2Image(blob, callback);
}

/**
 * 上传文件： 通过 formData 格式上传
 * @param {*} url 上传链接
 * @param {*} file 上传文件
 * @param {*} callback 上传成功回调函数
 */
function uploadByFormData(url, file, callback) {
  var xhr = new XMLHttpRequest()
  var fd = new FormData();
  fd.append('file', file);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // 上传成功
      callback && callback(xhr.responseText);
    }
  } else {
    throw new Error(xhr)
  }

  xhr.open('POST', url, true)
  xhr.send(fd);
}

/**
 * 上传文件： 通过 formData 格式上传
 * @param {*} url
 * @param {*} file
 */
function uploadByBinaryString(url, file, callback) {
  var reader = new FileReader();
  var xhr = new XMLHttpRequest();

  xhr.open('POST', url, true)
  xhr.overrideMimeType('text/plain; charset=x-user-defined-binary')

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // 上传成功
      callback && callback(xhr.responseText);
    }
  } else {
    throw new Error(xhr)
  }

  reader.onload = function () {
    xhr.send(reader.result)
  }

  reader.readAsBinaryString(file);
}


// 三个问题：
// 1. 黑屏问题，文件长宽过大
// 2. 压缩比例不均衡，失真；
// 3. png 越压越大
