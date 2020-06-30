// 本节我们实现 debounce 防抖
function debounce(fn, wait) {
    wait = wait || 300;
    var timer
    console.log(this);
    var context

    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        // timer = setTimeout(function() {
        //     timer = null;
        //     console.log('ccc', this)
        //     fn.apply(this, arguments)
        // }, wait);
        timer = setTimeout(() => {
            timer = null;
            console.log('ccc', this)
            fn.apply(this, arguments)
        }, wait);
    }
}

// 不管三七二十 我们先写基础测试用例

var input = document.createElement('input');
input.id = 'i';
document.body.appendChild(input);

// 
function handle(e) {
    console.log(e);
}

// 未加防抖
// input.addEventListener('input', function(e) {
//     console.log(e.target.value)
// })

// 加上防抖
input.addEventListener('input', debounce(handle, 1000))