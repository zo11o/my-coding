// 手写实现 apply
Function.prototype.myApply = function () { 
    // this -> foo.sayName 这个sayName 方法本身
    var fn = this;
    var args = Array.from(arguments);
    var context = args[0];
    var _args = args[1];
    context.fn = fn

    var result = void 0;
    if (_args) {
        result = context.fn(..._args)
    } else {
        result = context.fn()
    }

    delete context.fn
    return result
}

// 测试用例
var foo = {
    firstName: 'chou',
    sayName: function(lastName, job) {
        console.log(this.firstName + ' ' + (lastName || '') + ' ' + job)
        return 'hhh'
    }
}

var bar = {
    firstName: 'kobe',
}

// 原生 apply
// foo.sayName.apply(bar, ['james', 'designer'])

var a = foo.sayName.myApply(bar, ['james', 'designer'])
console.log(a);

