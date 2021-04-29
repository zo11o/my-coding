// 本文我们自己实现一个 call 方法

Function.prototype.myCall = function () {
    let fn = this;
    // 参数转化为数组
    var args = Array.from(arguments);
    // 获取执行作用域
    var context = args[0]
    // 截取了第一个参数 获取后面的参数
    var _args = args.slice(1);
    var s = Symbol('fn');
    // 访问 Symbol 属性只能用 [] 运算符
    var result = context[s](..._args);
    delete context.s
    return result;
}


// 培养先写测试用例的习惯
var foo = {
    firstName: 'chou',
    sayName: function(lastName, work) {
        console.log(this.firstName + ' ' + (lastName || '') + ' ' +work)
    }
}

var bar = {
    firstName: 'kobe',
}

// foo.sayName.call(bar, 'james')


foo.sayName.myCall(bar, 'james', 'lll');
console.log(bar)
