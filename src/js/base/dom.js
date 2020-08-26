// 事件代理和一些原生 Dom 操作
(function () {

  // 一 HTML5 事件
  // 1. contextmenu 事件: 鼠标右击
  window.addEventListener('contextmenu', function (e) {
    console.log(e)
  })

  // 2. beforeunload 事件
  window.addEventListener('beforeunload', function (e) {
    console.log('beforeunload:', e)
  })

  // 3. 形成完整 Dom 树之后就会触发
  window.addEventListener('DOMContentLoaded', function (e) {
    console.log('DOMContextLoaded:', e)
    console.log(e.timeStamp)
  })

  // 4. readystatechange 事件
  document.addEventListener('readystatechange', function (e) {
    console.log(document.readyState)
    console.log('readystatechange:', e)
  })

  // 5. pageshow 和 pagehide 事件
  window.addEventListener('pageshow', function (e) {
    console.log('pageshow:', e)
  })

  window.addEventListener('pagehide', function (e) {
    console.log('pagehide:', e)
  })

  // 6. hashchange 事件
  window.addEventListener('hashchange', function (e) {
    console.log(location.hash)
  })

  // 二 设备事件
  // 1. orientationchange 事件
  window.addEventListener('orientationchange',function (e) {
    console.log(window.orientation)
  })


  /**
   * 事件代理
   */
  // 创建 root 节点
  var root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);

  var ul = document.createElement('ul');
  for (var i = 0; i <= 100; i++) {
    let li = document.createElement('li');
    li.innerHTML = `我是 ${i}`;
    ul.appendChild(li)
  }

  root.appendChild(ul)

  function handleClick(e) {
    var target = e.target
    if (target.nodeName == 'LI') {
      target.style.backgroundColor = "red";
      console.log(target.innerHTML)
    }
  }

  ul.addEventListener('click', handleClick)

  window.addEventListener('unload', function () {
    console.log(2)
  })

  window.addEventListener('click', function (e) {
    console.log('pageX:', e.pageX)
    console.log('pageY:', e.pageY)
    console.log('clientX:', e.clientX)
    console.log('clientY:', e.clientY)
    console.log('screenX:', e.screenX)
    console.log('screenY:', e.screenY)
  })



})()
