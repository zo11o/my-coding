// 本文我们手写原生 XMLHttpRequest()
function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    } else {
        return new ActiveXObject();
    }
}

var xhr = createXHR();

// open 方法
// 第三个参数：是否异步发送
xhr.open('get', 'example.php', false)
xhr.send(null) // 要发送特定的请求，将数据写入请求主体，如果无数据，必须填 null