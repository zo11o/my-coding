// axios
// 手写 axios 核心原理
// 来源： https://juejin.im/post/6856706569263677447

/* 一、 axios 是做什么
Axios 是基于 promise 的 HTTP 库， 可以在浏览器和 node.js 中使用

二、 axios 有什么特性
从浏览器中创建 XMLHttpRequest
从 node.js 中创建 http 请求
支持 Promise API
拦截请求和响应
转换请求数据和响应数据
取消请求
自动转换 JSON 数据
客户端支持防御 XSRF

三、 基本使用方式
1. axios(config)
2. axios.method(url, data, config)

四、 实现 axios 和 axios.method

 */


// 工具方法
const utils = {
  // 混入
  extend(a, b, context) {
    for (let key in b) {
      if (b.hasOwnProperty(key)) {
        if (typeof b[key] === 'function') {
          a[key] = b[key].bind(context);
        } else {
          a[key] = b[key]
        }
      }
    }
  },
}

class InterceptorsMange {
  constructor() {
    this.handlers = [];
  }

  use(fullField, rejected) {
    this.handlers.push({
      fullField,
      rejected
    })
  }
}

// 可请求方法
const methodsArr = ['get', 'post', 'delete', 'head', 'options', 'put', 'patch'];

class Axios {
  constructor() {
    this.interceptors = {
      request: new InterceptorsMange,
      response: new InterceptorsMange,
    }
  }

  sendAjax(config) {
    return new Promise((resolve, reject) => {
      const {
        url = '', method = 'get', data = {}
      } = config;
      // 发送 ajax 请求
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.onload = function () {
        console.log(xhr.responseText)
        resolve(xhr.responseText)
      }
      xhr.send()
    })
  }

  request(config) {

    let chain = [this.sendAjax.bind(this), undefined];

    // 请求拦截
    this.interceptors.request.handlers.forEach(interceptor => {
      chain.unshift(interceptor.fullField, interceptor.rejected);
    })

    // 响应拦截
    this.interceptors.response.handlers.forEach(interceptor => {
      chain.push(interceptor.fullField, interceptor.rejected)
    })

    // 执行队列， 每次执行一对，并给 promise 赋值
    let promise = Promise.resolve(config);
    while(chain.length > 0) {
      promise = promise.then(chain.shift(), chain.shift())
    }

    return promise
    // this.sendAjax(config);
  }
}

methodsArr.forEach(met => {
  Axios.prototype[met] = function () {
    console.log(`执行 ${met} 方法`);

    if (['get', 'delete', 'head', 'options'].includes(met)) {
      return this.request({
        method: met,
        url: arguments[0],
        ...arguments[1] || {}
      })
    } else {
      // 3 个参数 ( url[,data[,config]] )
      return this.request({
        method: met,
        url: arguments[0],
        data: arguments[1] || {},
        ...arguments[2] || {}
      })
    }
  }
})

function CreateAxiosFn() {
  let axios = new Axios();
  let req = axios.request.bind(axios);

  // 把 Axios.prototype 的方法填完往 req
  utils.extend(req, Axios.prototype, axios)
  // 把Axios上的方法和属性搬到request过去，也就是遍历Axios实例上的方法，得以将interceptors对象挂载到request上
  utils.extend(req, axios)

  return req;
}


let axios = CreateAxiosFn();
