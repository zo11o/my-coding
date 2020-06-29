// 本文我们自己实现一个 call 方法

Function.prototype.myCall = function () {
    let fn = this;
    var args = Array.from(arguments);
    var context = args[0]
    var _args = args.slice(1);

    var s = Symbol('fn');
    context.s = fn
    var result = context.s(..._args);
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