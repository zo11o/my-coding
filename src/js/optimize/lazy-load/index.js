(function () {
  var imgs = document.getElementsByTagName("img");

  function loadLazy() {
    console.log(111);
    for (var i = 0; i < imgs.length; i++) {
      var el = imgs[i];
      var nowSrc = el.getAttribute("src");
      // el.offsetTop: 元素离上一父辈未定位的元素距离
      // document.documentElement.scrollTop 页面滚动距离
      // document.documentElement.clientHeight 页面可视高度
      var isShow =
        el.offsetTop - document.documentElement.scrollTop <
        document.documentElement.clientHeight;
      if (isShow && nowSrc == "./default.png") {
        var src = el.getAttribute("data-url");
        el.src = src;
      }

      // 如果已经全部加装。 移除事件监听
      if (i == imgs.length - 1 && el.getAttribute("src") != "./default.png") {
        console.log(334343);
        window.removeEventListener("scroll", handle);
      }
    }
  }

  /**
   * 节流
   * @param {*} fn
   * @param {*} delay
   */
  function throttle(fn, delay = 40) {
    let flag = true,
      timer = null;

    return function (...args) {
      let context = this;

      if (!flag) {
        return;
      }

      flag = false;

      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
        flag = true;
      }, delay);
    };
  }

  var handle = throttle(loadLazy, 200);

  window.addEventListener("scroll", handle);
})();
