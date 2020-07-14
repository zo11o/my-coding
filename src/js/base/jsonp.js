// 本节我们编写常用的跨域方式之一：JSONP 跨域请求

/*
JSONP 只能发起 get 请求，传输数据明文写在请求中

JSONP 跨域请求有 2 个要素
1. 请求链接
2. 回调函数
 */


// 后端 koa2 代码 详情见 /services/controllers/jsonp.js
// getInfo: async (ctx, next) => {

//   let callbackName = ctx.query.callback || 'callback'
//   let returnData = {
//     success: true,
//     data: {
//       text: 'this is a jsonp api',
//       time: new Date().getTime(),
//     }
//   }
//   // jsonp的script字符串
//   let jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`
//   // 用text/javascript，让请求支持跨域获取
//   ctx.type = 'text/javascript'
//   // 输出jsonp字符串
//   ctx.body = jsonpStr

// },

// 一、 我们实现最简单的 JSONP demo

// 前端代码

function handleResponse(data) {
  console.log(data)
  console.log('数据已经获取')
}

function jsonp() {
  var script = document.createElement('script');

  script.src = "http://localhost:3000/jsonp/getInfo/?callback=handleResponse"

  document.body.insertBefore(script, document.body.firstChild);
}

// jsonp()

//-----------------------------------------------------------------------------------


// 二、下面实现可配置的 JSON
var jsonp1 = function (url, callback, data, ) {

  if (!url) {
    throw ReferenceError('请传递 url 参数')
  }

  if (!callback) {
    throw ReferenceError('请传递 callback 参数')
  }

  url = url || ''
  url = _format(url, callback, data)

  var script = document.createElement('script');
  script.src = url;
  document.body.insertBefore(script, document.body.firstElementChild)

  function _format(url, callback, data) {
    url += '?callback=' + callback
    if (data instanceof Object && data !== null) {
      for (var o in data) {
        url += '&' + encodeURIComponent(o) + '=' + encodeURIComponent(data[o]);
      }
    }
    return url
  }
}

// jsonp1('http://localhost:3000/jsonp/getInfo', `handleResponse`,{
//   id: '123',
//   name: 'ccc'
// })

//-----------------------------------------------------------------------------------

// 三、 动态名称版
var jsonp2 = function (option) {
  var url = option.url || ''
  var data = option.data || null
  var callbackName = 'fn' + Math.random().toString().split("\.")[1];

  url = url + '?callback=' + callbackName
  if (data && data instanceof Object) {
    for (var o in data) {
      url += '&' + encodeURIComponent(o) + '=' + encodeURIComponent(data[o]);
    }
  }
  console.log(url)

  var script = document.createElement('script');
  script.src = url
  document.getElementsByTagName('head')[0].appendChild(script);

  window[callbackName] = function (data) {
    try {
      option.success(data)
      delete window[callbackName]
    } catch (error) {
      console.log(error)
    }
  }

}

jsonp2({
  url: 'http://localhost:3000/jsonp/getInfo',
  success: function (resp) {
    console.log('nihao', resp)
  },
  data: {
    id: '123',
    name: 'ccc'
  }
})
