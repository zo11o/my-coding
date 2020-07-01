// 本节我们实现 debounce 防抖
// 函数去抖，也就是说当调用动作n毫秒后，才会执行该动作，若在这n毫秒内又调用此动作则将重新计算执行时间。

var FUNC_ERROR_TEXT = 'Expected a function';

// 1. 初级版本
/**
 * 防抖 初级版本
 * @param {*} fn 需要去抖的函数.
 * @param {*} wait 延迟执行的时间.
 */
function debounce(fn, wait) {

    if (typeof fn !== 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
    }

    if (wait !== undefined && typeof wait !== 'number') {
        throw new ReferenceError(`the second argument of debounce should be a number`)
    }

    var timer

    return function () {
        if (timer) {
            clearTimeout(timer);
        }

        // 特别注意 这里是箭头函数
        timer = setTimeout(() => {
            timer = undefined;
            fn.apply(this, arguments)
        }, wait || 0);
    }
}

// 2. 进阶版本
// 支持 第一次触发立即执行的功能
function debouncePro(fn, wait, immediate) {

    if (typeof fn != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
    }

    if (wait !== undefined && typeof wait !== 'number') {
        throw new ReferenceError(`the second argument of debounce should be a number`)
    }

    var timer

    return function () {
        if (timer) {
            clearTimeout(timer);
        }

        if (immediate && !timer) {
            fn.apply(this, arguments)
        }

        // 特别注意 这里是箭头函数
        timer = setTimeout(() => {
            timer = undefined;
            fn.apply(this, arguments)
        }, wait || 0);
    }
}

//******************************************** */

// 不管三七二十 我们先写基础测试用例
var input = document.createElement('input');
input.id = 'i';
document.body.appendChild(input);

// 处理函数
function handle(e) {
    console.log(e);
}

// 未加防抖
// input.addEventListener('input', function(e) {
//     console.log(e.target.value)
// })

// 加上防抖
// 测试用例一
// input.addEventListener('input', debounce(handle, 1000))

// 测试用例二
input.addEventListener('input', debouncePro(handle, 1000, true))







// jest 测试导出模块
// export default sum;