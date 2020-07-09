// 本文介绍函数 《Javascript高级编程》第 22 章 - 高级技巧中的
// 函数科里化
// 函数科里化：用于创建已经设置好了一个或多个参数的函数。
// 实现：使用一个闭包返回一个函数。

// 一、举个例子
function add(num1, num2) {
    return num1 + num2;
}

function curriedAdd(num2) {
    return add(5, num2);
}

console.log(add(2, 3)); // 5
console.log(curriedAdd(3)); // 8

// 二、通用实现
function curry(fn) {
    var args = Array.prototype.slice.call(arguments, 1);

    return function () {
        var innerArgs = Array.prototype.slice.call(arguments),
            finalArgs = args.concat(innerArgs);
        return fn.apply(null, finalArgs);
    };
}

// 测试用例
var curriedAdd = curry(add, 5);
console.log(curriedAdd(3)); //8

//-----------------------------

// 反科里化
// 反柯里化的作用在与扩大函数的适用性，使本来作为特定对象所拥有的功能的函数可以被任意对象所用
var uncurrying = function (fn) {
    return function () {
        var args = [].slice.call(arguments, 1);
        return fn.apply(arguments[0], args);
    };
};

// 高级实现
var uncurrying = Function.prototype.bind.bind(Function.prototype.call);
// 1. Function.prototype.bind.apply(Function.prototype.call)
// 2. Function.prototype.call.bind(fn)

var test = "a,b,c";
console.log(test.split(","));

var split = uncurrying(String.prototype.split); //[ 'a', 'b', 'c' ]
console.log(split(test, ","));
