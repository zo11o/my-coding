// 这次我们来实现自己 bind
Function.prototype.myBind = function () {
    var fn = this;
    var args = Array.prototype.slice.call(arguments);
    var context = args[0]

    return function () {
        var _args = Array.prototype.slice.call(arguments)
        fn.apply(context, _args);
    }
}

// -----------------------------------------------------

// 首先我们来看看原生的 bind 方法是怎么样的
// bind 返回一个绑定执行上下文 方法

// 测试用例一：
var firstName = 'global'

var foo = {
    firstName: 'foo',
    sayName: function(lastName, job) {
        console.log(this.firstName + ' ' + lastName + ' ' + job)
    }
}

function say () {

    var sayName = foo.sayName;
    setTimeout(function() {
        // 请注意 这时的返回是 global zorro dr, 原因是此时 sayName 由于执行上下文 this 被隐式绑定为 window，
        sayName('zorro', 'dr')
    }, 1000);

    setTimeout(function() {
        // 此时 sayName 被绑定执行作用域为 foo, 即无论在哪里调用，内部 this 都指向 foo
        // sayName = foo.sayName.bind(foo);

        sayName = foo.sayName.myBind(foo);
    }, 2000);

    setTimeout(function() {
        sayName('zo11o', 'case')
    }, 3000);
}

say()

// -----------------------------------------------------

// 测试用例二
var ball = 'basketball';

var play = {
    ball: 'football',
    sayBall: function(c,d) {
        console.log(this.ball + c + d)
    }
}

sayBall = play.sayBall;
// 这里并不是 football 而是 basketball
sayBall('ww','eee');


// 使用原生
// sayBall = play.sayBall.bind(play)
// // football
// sayBall();


// 使用 myBind
sayBall = play.sayBall.myBind(play)
// football
sayBall('ccc','ddd');