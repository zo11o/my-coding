// 本节我们编写原生浏览器 cookie 的读写删
//  参考：《Javascript 高级编程》 第二十三章

// 要点
// 1. 在考虑浏览器兼容的情况下，每个cookie 最高不超过 4095B 的数据；单个浏览器 cookie 个数也不要超过20个
// 2. cookie 六大要素
//    2.1 名称
//    2.2 值
//    2.3 域
//    2.4 路径
//    2.5 失效时间 GMT
//    2.6 安全标志
// 3. cookie 必须经过 encodeURIComponent()

// 一、正常的 Set-Cookie 头中使用的 Cookie 格式
// name=value; expires=expires_time; path=document_path; domain= domain_name; secure

// 设置 Cookie
// domain.cookie = 'name=value' ; 除非已经 name 存在，否则不会覆盖
var CookieUtil = {
  get: function (name) {
    var cookieName = encodeURIComponent(name) + '=',
      cookieStart = document.cookie.indexOf(cookieName),
      cookieValue = null;

    if (cookieStart > -1) {

      // indexOf 第二个参数：stringObject.indexOf(searchValue,fromIndex)
      var cookieEnd = document.cookie.indexOf(';', cookieStart);
      if (cookieEnd == -1) {
        cookieEnd = document.cookie.length;
      }
      cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
    }

    return cookieValue
  },
  set: function (name, value, expires, path, domain, secure) {
    var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    if (expires instanceof Date) {
      cookieText += '; expires=' + expires.toGMTString();
    }

    if (path) {
      cookieText += '; path=' + path;
    }

    if (domain) {
      cookieText += '; domain=' + domain;
    }

    if (secure) {
      cookieText += '; secure'
    }

    document.cookie = cookieText;
  },
  unset: function (name, path, domain, secure) {
    this.set(name, '', new Date(0), path, domain, secure)
  }
}

/*
// 测试用例
// 1. 设置 cookie
CookieUtil.set('name', 'zo11o', new Date(1594610369100), '/', 'localhost');

// 2. 获取 cookie
var cookie = CookieUtil.get('name');
console.log(cookie);

// 删除 cookie
CookieUtil.unset('name', '/', 'localhost');
 */

// --------------------------

// 二、子 cookie： 为了突破浏览器限制采用的方法
// 格式如下： 'data=name1=value1&name2=value2&name3=value3';
// 思路： 将每个 name 作为一个对象放回，里面存放 subName
var SubCookieUtil = {
  get: function (name, subName) {
    var subCookies = this.getAll(name);
    if (subCookies) {
      return subCookies[subName]
    } else {
      return null
    }
  },
  getAll: function (name) {
    var cookieName = encodeURIComponent(name) + '=',
      cookieStart = document.cookie.indexOf(cookieName),
      cookieValue = null,
      cookieEnd,
      subCookies,
      i,
      len,
      parts,
      result = {};

    if (cookieStart > -1) {
      cookieEnd = document.cookie.indexOf(";", cookieStart);
      if (cookieEnd == -1) {
        cookieEnd = document.cookie.length
      }

      cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd);

      if (cookieValue.length > 0) {
        subCookies = cookieValue.split("&");

        for (i = 0, len = subCookies.length; i < len; i++) {
          parts = subCookies[i].split("=");
          result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
        }
      }
      return result;
    }
    return null;
  },
  set: function (name, subName, value, expires, path, domain, secure) {
    var subCookies = this.getAll(name) || {};
    subCookies[subName] = value;
    this.setAll(name, subCookies, expires, path, domain, secure);
  },
  setAll: function (name, subCookies, expires, path, domain, secure) {
    var cookieText = encodeURIComponent(name) + '=',
      subCookieParts = new Array(),
      subName;

    for (subName in subCookies) {
      if (subName.length > 0 && subCookies.hasOwnProperty(subName)) {
        subCookieParts.push(encodeURIComponent(subName) + "=" + encodeURIComponent(subCookies[subName]));
      }
    }

    if (subCookieParts.length > 0) {
      cookieText += subCookieParts.join("&");

      if (expires instanceof Date) {
        cookieText += '; expires=' + expires.toGMTString();
      }

      if (path) {
        cookieText += '; path=' + path;
      }

      if (domain) {
        cookieText += '; domain=' + domain;
      }

      if (secure) {
        cookieText += '; secure'
      }
    } else {
      cookieText +="; expires=" + (new Date(0)).toGMTString()
    }

    document.cookie = cookieText;
  },
  unset: function (name, subName, path, domain, secure) {
    var subCookies = this.getAll(name);

    if (subCookies) {
      delete subCookies[subName];
      this.setAll(name, subCookies, null, path, domain, secure)
    }
  },
  unsetAll: function (name, path, domain, secure) {
    this.setAll(name, null, new Date(0), path, domain, secure)
  }
}


// document.cookie="data=age=25=school=qh"
SubCookieUtil.set("data", "single", "online");
SubCookieUtil.set("data", "age", "25");

// 这是全部 cookies 会覆盖上面的 cookie
SubCookieUtil.setAll("data", {"like": "football", "job": "developer"})

var subCookie = SubCookieUtil.getAll("data")
console.log(subCookie);

// SubCookieUtil.unsetAll("data")
