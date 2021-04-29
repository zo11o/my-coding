// 本文介绍函数 《Javascript高级编程》第 22 章 - 高级技巧中的
// 函数科里化: 是把接受多个参数的函数变为接收单个参数的函数，并且返回接收余下的参数且返回运行结果的新函数的技术
// 作用：提高适用性，降低通用性
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

// 二、提供适用性的通用实现
function curry(fn) {
    // 获取外部参数 例子中为 5
    var args = Array.prototype.slice.call(arguments, 1);

    // 返回一个方法
    return function () {
        // 这里的 arguments 为内部参数 例子中为 3
        var innerArgs = Array.prototype.slice.call(arguments),
            finalArgs = args.concat(innerArgs);
        return fn.apply(null, finalArgs);
    };
}

// 测试用例
var curriedAdd = curry(add, 5);
console.log(curriedAdd(3)); //8


// 三：延迟执行

var add = function() {
  // var _this = this, args = arguments

  return function () {
    if (!arguments.length) {
      var sum = 0;
      for (var i = 0, c; c = _args[i]; i++) {
        sum += c
        return sum
      }
    } else {
      Array.prototype.push.apply(_args, arguments)
      // 返回函数自身
      return arguments.callee
    }
  }
}

// 四： 延迟执行通用方法
function add (n1, n2) {
  return n1+n2
}

var curry = function(fn) {
  var _args = []
  return function cb() {
      if (arguments.length == 0) {
          // 使用保留函数参数调用
          return fn.apply(this, _args)
      }
      // 保留函数参数
      Array.prototype.push.apply(_args, arguments);
      return cb;
  }
}

var cAdd = curry(add)(1)(2)()
console.log(cAdd)
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
