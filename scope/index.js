// var a = true
// if (a) {
//     function foo() {
//         console.log(1)
//     }

// } else {
//     function foo() {
//         console.log(2)
//     }
// }

/**
 * var 作用域问题
 */
function foo() {
    var a = 2;
    var _this = arguments.callee.caller;
    function bar() {
        console.log(this);
        console.log(_this);
        console.log(a);
    }
    return bar;
}
var baz = foo();
baz(); // 2

for (var i = 1; i <= 5; i++) {
    (function name(i) {
        setTimeout(() => {
            console.log(i);
        }, i * 1000);
    })(i);
}

// 现代化模块机制
var MyModules = (function Manager() {
    var modules = {};

    function define(name, deps, impl) {
        for (let i = 0; i < deps.length; i++) {
            deps[i] = modules[deps[i]];
        }
        modules[name] = impl.apply(impl, deps);
    }

    function get(name) {
        return modules[name]
    }

    return {
        define: define,
        get: get
    };
})();

MyModules.define("bar", [], function (params) {
    function hello(who) {
        return `let me introduce ${who}`
    }

    return {
        hello
    }
})

MyModules.define("foo", ["bar"],  function (bar) {
    var hungry = "hippo";

    function awesome() {
        console.log(bar.hello(hungry).toUpperCase());
    }

    return {
        awesome
    }
})

var bar = MyModules.get("bar");
var foo = MyModules.get( "foo" );
console.log( bar.hello( "hippo" ) );
foo.awesome();

