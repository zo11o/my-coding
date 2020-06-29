// AOP 面向切面编程 接下来我们讨论 AOP 在 js 的应用
function test(a, b) {
    var params = {a,b}
    console.log(params);
}

var aopFactory = function(before, after) {

    function _fn(originFun) {
        return function() {
            var result;
            if (typeof before === 'function') {
                proxy.before(this,arguments)
            }
            result = originFun.apply(this, arguments);
            if (typeof after === 'function') {
                proxy.after(this,arguments)
            }
            return result
        }
    }

    var proxy = {

        // 第一个参数 要被代理的 方法， 第二个参数为执行上下文对象 如果不传默认为 window
        add: function(a, b) {
            var functionName = '';
            if (typeof a === 'function') {
                // 函数名 var test = function (){} test.name = "test"
                functionName = a.name;
            } else if (typeof a === 'string') {
                functionName = a
            }

            b = b || window
            if ( typeof b === 'object' && b[functionName] ) {
                b[functionName] = _fn(b[functionName])
            }
            // b[functionName]
        },

        before: function() {

        },

        after: function() {

        }
    }

    if (typeof before === "function") {
        proxy.before = before
    }

    if (typeof after === "function") {
        proxy.after = after
    }

    return proxy;
}


// 一、最基础的实现
// var test = aopFactory(test, function() {
//     console.log('test 前')
//     console.log(arguments)
// }, function () {
//     console.log('test 后')
// })

// test(1,2)

// 代理实现

// showArguments
function showArgs () {
    console.log('call before')
    var argsArr = Array.from(Array.prototype.slice.call(arguments, 1)[0]);

    for (var i = 0; i < argsArr.length; i ++) {
        console.log(argsArr[i])
    }
}

var showArgsProxy = aopFactory(showArgs, function () { console.log('call end') })
showArgsProxy.add(test)

test('c', 'd')