// 浏览器用户代理
// 《Javascript 高级程序设计第二版》9.3.2 用户代理字符串检测技术


// function ua(params) {
//   let ua = window.navigator.userAgent;
//   let uaArr = ua.split(' ');
//   console.log(uaArr);
// }

// ua();

/*
 1. 要正确地识别呈现引擎，关键是检测顺序要正确。
    第一步检测 opera，因为 Opera 是（任何情况下）起用户代理字符串（都）不会讲自己标识为 Opera
    Opera 必须检测 window.opera 对象，
 */
var client = function () {
  var engine = {
    // 呈现引擎
    ie: 0,
    gecko: 0,
    webkit: 0,
    khtml: 0,
    opera: 0,

    // 具体版本号
    ver: null
  }

  var browser = {
    // 浏览器
    ie: 0,
    firefox: 0,
    safari: 0,
    konq: 0,
    opera: 0,
    chrome: 0,

    // 具体版本号
    ver: null
  }

  var system = {
    win: false,
    mac: false,
    xll: false,

    // 移动设备
    iphone: false,
    ipod: false,
    ipad: false,
    ios: false,
    android: false
  }

  // 在此做检测 平台 和 设备
  var ua = navigator.userAgent;

  // 1. 要正确地识别呈现引擎，关键是检测顺序要正确。
  // 第一步检测 opera，因为 Opera 是（任何情况下）起用户代理字符串（都）不会讲自己标识为 Opera
  // Opera 必须检测 window.opera 对象，

  // Opera 最新版Blink userAgent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36 OPR/70.0.3728.95
  if (window.opera) {
    engine.ver = browser.ver = window.opera.version();
    engine.opera = browser.opera = parseFloat(engin.ver);
  }

  // 2. 第二位检测的是 Webkit, 因为 Webkit 的用户代理字符串中包含了 "Gecko" 和 "KHTML" 这两个子字符串，所以如果优先检测他们，会得出错误结论，
  //    不过 Webkit 的 AppleWebKit 是独一无二的。检测 AppleWebKit 字符串最合适

  // Chrome userAgent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36
  else if (/AppleWebKit\/(\S+)/.test(ua)) {
    engine.ver = RegExp["$1"];
    engine.webkit = parseFloat(engine.ver);

    // 确定是 Chrome 还是 Safari
    if (/Chrome\/(\S+)/.test(ua)) {
      browser.ver = RegExp.$1;
      browser.chrome = parseFloat(browser.ver);
    } else if (/Version\/(\S+)/.test(ua)) {
      browser.ver = RegExp.$1;
      browser.safari = parseFloat(browser.ver);
    } else {
      // 近似确定版本号
      // TODO:

    }
  }

  // 接下来演检测的呈现引擎是 KHTML ，主要是检测 KHTML 字符串或者 Konqueror 的版本来替代
  else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
    engine.ver = browser.ver = RegExp["$1"]
    engine.khtml = browser.konq = parseFloat(engine.ver);
  }

  // 接下来检测 Firefox Gecko
  // Firefox 最新版 userAgent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:78.0) Gecko/20100101 Firefox/78.0
  // ([^\)]+) 不是 ) 的所有字符串一个或多个
  else if(/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
    engine.ver = RegExp["$1"];
    engine.gecko = parseFloat(engine.ver)

    // 确定是不是 Firefox
    if (/Firefox\/(\s+)/.test(ua)) {
      browser.ver = RegExp.$1;
      browser.firefox = parseFloat(browser.ver)
    }
  }

  // 最后是 ie, IE 的版本号 位于字符串 MSIE 的后面、一个分号的前面
  // Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko
  else if (/MISE ([^;]+)/.test(ua)) {
    engine.ver = browser.ver = RegExp["$1"];
    engine.ie = browser.ie = parseFloat(engine.ver)
  }

  browser.ie = engine.ie;
  browser.opera = engine.opera

  // 检测平台
  var p = navigator.platform;
  system.win = p.indexOf('Win') == 0;
  system.mac = p.indexOf('Mac') == 0;
  system.xll = (p == "Xll") || (p.indexOf('Linux') == 0)

  // ios 版本 Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1
  if (system.mac && ua.indexOf('Mobile') > -1) {
    if (/CPU (?:iPhone)? OS (\d+_\d+)/.test(ua)) {
      system.ios = parseFloat(RegExp.$1.replace("_", "."))
    } else {
      system.ios = 2
    }
  }

  // 检测安卓版本 Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Mobile Safari/537.36
  if (/Android (\d+\.\d+)/.test(ua)) {
    system.android = parseFloat(RegExp.$1)
  }

  return {
    engine: engine,
    browser: browser,
    system: system
  }

}()

console.log(client)
console.log(JSON.stringify(client, null, 2))
// Chrome 下运行结果
// {
//   "engine": {
//     "ie": 0,
//     "gecko": 0,
//     "webkit": 537.36,
//     "khtml": 0,
//     "opera": 0,
//     "ver": "537.36"
//   },
//   "browser": {
//     "ie": 0,
//     "firefox": 0,
//     "safari": 0,
//     "konq": 0,
//     "opera": 0,
//     "chrome": 84,
//     "ver": "84.0.4147.105"
//   },
//   "system": {
//     "win": true,
//     "mac": false,
//     "xll": false,
//     "iphone": false,
//     "ipod": false,
//     "ipad": false,
//     "ios": false,
//     "android": false
//   }
// }

// 食用方式
if (client.engine.webkit) {
  if (client.system.ios) {
    // ios 手机内容
  } else if (client.system.android) {
    // android 内容
  }
}
