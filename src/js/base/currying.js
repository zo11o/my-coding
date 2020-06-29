// 本文介绍函数 currying 函数 科里化
// function currying(fn) {
//     console.log(fn)
//     var lastArgs = []

//     var handle =  {
//         apply: function (target, thisBinding, args) {
//             // console.log(args);
//             lastArgs = Array.from(args);
//         }
//     }

//     // 需要监听 fn 的调用
//     var proxy  = new Proxy(fn, handle)

//     // return function () {
//     //     fn.apply()
//     // }
//     return function() {
//         proxy(...lastArgs)
//         test()
//     }
// }


// function test(a, b) {
//     var params = {a,b}
//     console.log(params);
// }

// test.before

// // curring test
// var curryingTest = currying(test);

// // 调用 test 之后在 curryingTest 保留 test 的参数
// test(1, 2);

// // 等于直接执行 test(1, 2)
// curryingTest();



// AOP
