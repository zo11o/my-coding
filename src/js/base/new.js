/*
    本文我们学习 原生 js 中 new 操作符
    相信大家都看过 js 红宝书《JavaScript高级编程》这本书了，
    在 第六章 面向对象设计中
    6.2 节 创建对象 构造函数模式中明确写道
    要使用 new 操作符创建对象会经历以下 4 小步
    1. 创建一个对象
    2. 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）
    3. 执行构造函数中的代码（为这个新对象添加属性）
    4. 返回新对象
*/

// 安装上面的四个步骤 我们来实现一个方法 做和new 一样的事

var myNew = function () {
    //1. 创建一个新对象
    var obj = {};

    // 将 参数装换为 数组
    var args = Array.prototype.slice.call(arguments);

    // 获取构造器 测试用例为 Person
    var constructor = args.shift();

    // 2. 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）
    // 即 新建对象的原型 指向 构造函数的原型
    Object.setPrototypeOf(obj, constructor.prototype);

    // 3. 执行构造函数中的方法
    var result = constructor.apply(obj, args)

    // 如果构造函数返回是对象或者函数 即返回该结果 否则返回创建的对象
    var isObject = typeof result === 'object' && result !== null
    var isFunction = typeof result === 'function'
    if (isObject || isFunction) {
        return result
    }

    // 4. 返回新对象
    return obj
}


// 先写测试用例
function Person(name, age) {
    this.name = name
    this.age = age;
}

Person.prototype.sayName = function () {
    console.log(this.name);
}

var p = new Person('zo11o', 21)
console.log(p.name);

// 实现
var z = myNew(Person, 'zo11o', 21);
console.log(z.name);
console.log(z.age)
z.sayName()
