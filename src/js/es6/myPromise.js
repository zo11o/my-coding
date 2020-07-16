"use strict";
// 实现写出符合 Promise/A+ 规范的 Promise - myPromise
/*
介绍一下规范
Promises/A+ 规范具体内容 官网链接：https://promisesaplus.com/

1. 术语
    1.1 promise” is an object or function with a then method whose behavior conforms to this specification. (promise 是一个有 then 方法的对象或者是函数，行为遵循本规范)
    1.2. “thenable” is an object or function that defines a then method. (thenable 是一个有then方法的对象或者是函数)
    1.3. “value” is any legal JavaScript value (including undefined, a thenable, or a promise). (value 是 promise 状态成功时的值，包括 undefined、thenable、promise)
    1.4. “exception” is a value that is thrown using the throw statement. (exception 是一个使用 throw 抛出的异常值)
    1.5.  “reason” is a value that indicates why a promise was rejected. (reason 是表明为什么 promise 结果是 rejected 的值)

2.1 Promise 状态
    Promise 必须处于以下三个状态之一: pending, fulfilled 或者 rejected。

    2.1.1 如果 promise 在 pending 状态
    2.1.1.1 可以变成 fulfilled 或者是 rejected

    2.1.2 如果 promise 在 fulfilled 状态
    2.1.2.1 不会变成其它状态

    2.1.2.2 必须有一个value值

    2.1.3 如果 promise 在 rejected 状态
    2.1.3.1 不会变成其它状态

    2.1.3.2 必须有一个 promise 被 reject 的 reason

*/
// 步骤：
// 1. 构造器函数立即执行，带上参数
// 定义三种状态
var PENDING = 'pending';
var FULFILLED = 'fulfilled';
var REJECTED = 'rejected';
var MyPromise = /** @class */ (function () {
    function MyPromise(executor) {
        // 保存 then 中的回调，只有当 promise 状态为 pending 时才会缓存，并且每个实例至多缓存一个
        this.resolvedCallbacks = [];
        this.rejectedCallbacks = [];
        // 当前状态
        this.currentState = PENDING;
        this.value = null;
        this.currentState = PENDING;
        this.value = null;
        var resolve = this.resolve.bind(this);
        var reject = this.reject.bind(this);
        try {
            executor(resolve, reject);
        }
        catch (err) {
            this.reject(err);
        }
    }
    MyPromise.prototype.resolve = function (value) {
        var _this = this;
        console.log(this);
        // 如果 value 是个 Promise，递归执行
        if (value instanceof MyPromise) {
            return value.then(this.resolve, this.reject);
        }
        setTimeout(function () {
            if (_this.currentState === PENDING) {
                _this.currentState = FULFILLED;
                _this.value = value;
                _this.resolvedCallbacks.forEach(function (cb) { return cb(); });
            }
        });
    };
    MyPromise.prototype.reject = function (reason) {
        var _this = this;
        setTimeout(function () {
            if (_this.currentState === PENDING) {
                _this.currentState = REJECTED;
                _this.value = reason;
                _this.rejectedCallbacks.forEach(function (cb) { return cb(); });
            }
        });
    };
    MyPromise.prototype.then = function (onResolved, onRejected) {
        var _this = this;
        // 2.2.7，then 必须返回一个新的 promise
        var promise2;
        // 2.2.7.3 If onFulfilled is not a function and promise1 is fulfilled, promise2 must be fulfilled with the same value as promise1.
        onResolved = typeof onResolved === 'function' ? onResolved : function (v) { return v; };
        // 2.2.7.4 If onRejected is not a function and promise1 is rejected, promise2 must be rejected with the same reason as promise1
        onRejected = typeof onRejected === 'function' ? onRejected : function (r) { throw r; };
        // 已经是 FULFILLED 状态 执行后续进程
        if (this.currentState === FULFILLED) {
            promise2 = new MyPromise(function (resolve, reject) {
                setTimeout(function () {
                    try {
                        var x = onResolved(_this.value);
                        _this.resolutionProcedure(promise2, x, resolve, reject);
                    }
                    catch (error) {
                        reject(error);
                    }
                });
            });
        }
        // 如果状态还是 Pending 需要
        if (this.currentState === REJECTED) {
            promise2 = new MyPromise(function (resolve, reject) {
                setTimeout(function () {
                    try {
                        var x = onRejected(_this.value);
                        _this.resolutionProcedure(promise2, x, resolve, reject);
                    }
                    catch (reason) {
                        reject(reason);
                    }
                });
            });
        }
        // 如果状态还是 Pending 需要递归等待
        if (this.currentState === PENDING) {
            promise2 = new MyPromise(function (resolve, reject) {
                _this.resolvedCallbacks.push(function () {
                    try {
                        var x = onResolved(_this.value);
                        // 递归等待
                        _this.resolutionProcedure(promise2, x, resolve, reject);
                    }
                    catch (r) {
                        reject(r);
                    }
                });
            });
            promise2 = new MyPromise(function (resolve, reject) {
                _this.rejectedCallbacks.push(function () {
                    try {
                        var x = onRejected(_this.value);
                        // 递归等待
                        _this.resolutionProcedure(promise2, x, resolve, reject);
                    }
                    catch (r) {
                        reject(r);
                    }
                });
            });
        }
        return promise2;
    };
    // 处理进程
    MyPromise.prototype.resolutionProcedure = function (promise2, x, resolve, reject) {
        var _this = this;
        if (promise2 === x) {
            return reject(new TypeError('Error'));
        }
        if (x instanceof MyPromise) {
            if (x.currentState === PENDING) {
                x.then(function (value) {
                    // 递归等待
                    _this.resolutionProcedure(promise2, x, resolve, reject);
                }, reject);
            }
            else {
                x.then(resolve, reject);
            }
            return;
        }
        // 保证 resolve 和 rejected 只能有一个被调用
        var called = false;
        if (x !== null && (typeof x == 'object' || typeof x === 'function')) {
            try {
                var then = x.then;
                if (typeof then === 'function') {
                    then.call(x, function (y) {
                        if (called)
                            return;
                        called = true;
                        _this.resolutionProcedure(promise2, y, resolve, reject);
                    }, function (e) {
                        if (called)
                            return;
                        called = true;
                        reject(e);
                    });
                }
                else {
                    resolve(x);
                }
            }
            catch (err) {
                if (called)
                    return;
                called = true;
                reject(err);
            }
        }
        else {
            resolve(x);
        }
    };
    return MyPromise;
}());
var promise = new MyPromise(function (resolve, reject) {
    setTimeout(function () {
        resolve('hhh');
    }, 3000);
});
promise.then(function (json) {
    console.log(json);
}, function (err) {
    console.log(err);
});
