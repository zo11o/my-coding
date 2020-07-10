// 本文我们手写原生 XMLHttpRequest()

// 如需测试：
// 在 /services 目录下:运行 node app.js 开启koa 本地服务；
// 打开 localhost:3000/test 可以测试
// 相对应的测试文件为 /services/views/test.ejs

// 首先介绍基础方法
function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    } else {
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}

var xhr = createXHR();

// open 方法
// 第三个参数：是否异步发送
xhr.open("get", "example.php", false);
xhr.send(null); // 要发送特定的请求，将数据写入请求主体，如果无数据，必须填 null

// 1. 同步

function SynchronizedAjax() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "/api/getId?id=5342546", false);
    xhr.send(null);

    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        console.log(xhr.status, xhr.responseText);
    } else {
        alert("Request was unsuccessfun:" + xhr.status);
    }
}

// 2. 异步
// readyState 有五个状态。 每次状态变更会触发 onreadyStatechange 事件
// 0 尚未open
// 1 已经open 尚未 send
// 2 已经 send
// 3 接收部分
// 4 全部接收完成

var ajax = function () {
    // IE 浏览器下 var xhr = new ActiveXObject("Microsoft.XMLHTTP");
    var xhr = new XMLHttpRequest();
    var getUrl = addURLParam("/api/getId", "id", "asdfli345");

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                // console.log(xhr.responseText);

                // 获取全部响应头的方法 xhr.getAllResponseHeaders();
                var responseHeader = xhr.getAllResponseHeaders();
                console.log(responseHeader);

                var data = xhr.responseText;
                data = JSON.parse(data);
                console.log(data);
            } else {
                console.log("fail:" + xhr.status);
            }
        }
    };

    //get 请求
    xhr.open("get", getUrl, true);
    xhr.setRequestHeader("MyHeader", "myValue");
    xhr.send(null);
};



function postData() {
    var xhr = new XMLHttpRequest();
    var postUrl = addURLParam("/api/postInfo");
    xhr.onreadystatechange = function () {
        if (
            (xhr.readyState >= 200 && xhr.status < 300) ||
            xhr.readyState == 304
        ) {
            console.log(xhr.responseText);
        } else {
            // 失败
        }
    };
    // onprogress 必须在open 之前调用
    xhr.onprogress = function (event) {
        var divStatus = document.getElementById("status");
        if (event.lengthComputable) {
            console.log(event);

            // chrome
            divStatus.innerHTML = event.loaded + ":" + event.total;
        }
    };

    xhr.open("post", postUrl, true);

    // 第二种方式必须写
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

    // 第一种方式：XMLHttpRequest 2级表单提交
    // var sendData = new FormData(document.getElementById('form'))

    // 第二种方式：json 提交
    var sendData = {
        name: "zo11o",
        age: 23,
    };
    sendData = qs(sendData);
    xhr.send(sendData);
}

// 这里是 XMLHttpRequest 2级
function postData2() {
    var xhr = new XMLHttpRequest();
    var postUrl = addURLParam("/api/postInfo");
    xhr.onload = function () {
        console.log(xhr.responseText);
    };
    xhr.onerror = function (error) {
        console.log(error);
    };

    // onprogress 必须在open 之前调用
    xhr.onprogress = function (event) {
        var divStatus = document.getElementById("status");
        if (event.lengthComputable) {
            console.log(event);

            // chrome
            divStatus.innerHTML = event.loaded + ":" + event.total;
        }
    };

    xhr.open("post", postUrl, true);

    // 第二种方式必须写
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

    // 第一种方式：XMLHttpRequest 2级表单提交
    // var sendData = new FormData(document.getElementById('form'))

    // 第二种方式：json 提交
    var sendData = {
        name: "zo11o",
        age: 23,
    };
    sendData = qs(sendData);
    xhr.send(sendData);
}

// 简易 包装 ajax 请求方法
function qs(json) {
    var formData = "";
    for (var o in json) {
        if (formData) {
            formData += "&";
        }
        formData += encodeURIComponent(o) + "=" + encodeURIComponent(json[o]);
    }
    return formData;
}

// post 请求
function addURLParam(url, name, value) {
    if (!name) return url;

    url += url.indexOf("?") == -1 ? "?" : "&";
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
}