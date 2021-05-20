// 节流
function throttle(fn, wait) {

  // 增强版本
  // var prev, timer
  // return function () {
  //   var now = + new Date();
  //   var context = this;
  //   var args = arguments

  //   if (prev && now - prev < wait) {
  //     clearTimeout(timer)
  //     timer = setTimeout(function () {
  //       prev = now
  //       fn.apply(context, args);
  //       console.log('结束了')
  //       timer = null;
  //     }, wait);
  //   } else {
  //     // 第一次一定会进入这里
  //     prev = now;
  //     fn.apply(context, args)
  //     console.log('结束前一次')
  //   }
  // }


  // 时间戳版本
  // 上一次执行 fn 的时间
  let previous = 0
  // 将 throttle 处理结果当作函数返回
  return function(...args) {
    // 获取当前时间，转换成时间戳，单位毫秒
    let now = +new Date()
    // 将当前时间和上一次执行函数的时间进行对比
    // 大于等待时间就把 previous 设置为当前时间并执行函数 fn
    if (now - previous > wait) {
      previous = now
      fn.apply(this, args)
    }
  }
}


(function () {

  // 两个图片之间间隔的大小
  let GAP_WIDTH = 8

  function bindEvent() {
    let handleFn = throttle(function () {
      // console.log('触发了')
      waterfall()
    }, 1000)

    window.addEventListener('resize', handleFn)
  }

  function init() {
    waterfall()
  }

  function waterfall() {
    // 1. 计算每行多少列
    // 2. 创建数组保留每行的高度
    // 3. 循环遍历 img 节点， 设置节点样式

    let screenWith = window.innerWidth;
    let img = document.querySelector('.box img')
    let imgWidth = img.width
    let cols = parseInt(screenWith / (imgWidth + GAP_WIDTH))

    let heightArray = []

    let imgs = document.getElementsByTagName('img')
    Array.from(imgs).forEach((o, i) => {
      if (i < cols) {
        heightArray.push(o.height + GAP_WIDTH)
        o.style.left = i * (imgWidth + GAP_WIDTH) + 'px'
        o.style.top = 0
      } else {
        let minHeight = Math.min(...heightArray)
        let minHeightIndex = heightArray.indexOf(minHeight)

        let objHeight = o.height
        o.style.left = minHeightIndex * (imgWidth + GAP_WIDTH) + 'px'
        o.style.top = minHeight + 'px'
        // minHeight
        heightArray[minHeightIndex] = Number(minHeight + GAP_WIDTH) + Number(objHeight)
      }
    })

    document.querySelector('.box').style.height = Math.max(...heightArray) + 'px'
  }

  init()
  bindEvent();
})()
