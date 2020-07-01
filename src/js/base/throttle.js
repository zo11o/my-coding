// 本节我们介绍一下 节流函数 throttle
// 节流就是一定时间内仅仅触发同一时间一次
function throttle(fn, wait) {

    var prev,
        timer

    return function () {
        var now = + new Date();
        var context = this;
        var args = arguments

        if (prev && now - prev < wait) {
            clearTimeout(timer)
            timer = setTimeout(function() {
                prev = now
                fn.apply(context, args);
                timer = null;
            }, wait);
        } else {
            prev = now;
            fn.apply(context, args)
        }

    }
}

// 不管三七二十一 我们先写基础测试用例
var input = document.createElement('input');
input.id = 'i';
document.body.appendChild(input);

// 处理函数
function handle(e) {
    console.log(e.target.value);
}

input.addEventListener('input', throttle(handle, 500))