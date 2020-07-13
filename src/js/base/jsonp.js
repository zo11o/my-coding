// 本节我们编写常用的跨域方式之一：JSONP 跨域请求

/*
JSONP 只能发起 get 请求，传输数据明文写在请求中

JSONP 跨域请求有 2 个要素
1. 请求链接
2. 回调函数
 */

function handleResponse (data) {
  alert(data)
  console.log(data)
  console.log('数据已经获取')
}

function jsonp (url, data,) {
  var script = document.createElement('script');

  script.src = "http://localhost:3000/jsonp/getInfo/?callback=handleResponse"

  document.body.insertBefore(script, document.body.firstChild);
}



jsonp()
