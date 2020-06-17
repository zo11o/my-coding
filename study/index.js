
function Student(name,age) {
    console.log('前-this:', this);
    this.name = name;
    console.log('后-this:', this);
    this.age = age;
}

Student.prototype.doSth = function() {
    return this.name
};

function newOperator(ctor) {
    if (typeof ctor !== 'function') {
        throw 'newOperator function the first param must be a function'
    }

    newOperator.target = ctor;

    // 1. 创建一个全新的对象
    // 2. 并且执行[[Prototype]]链接
    var newObj = Object.create(ctor.prototype);
    // 获取参数
    var argsArr = [].slice.call(arguments, 1);
    // 2. 运行（调用）方法
    var ctorReturnResult = ctor.apply(newObj, argsArr);
    var isObject = typeof ctorReturnResult === 'object' && ctorReturnResult !== null
    var isFunction = typeof ctorReturnResult === 'function'
    if (isObject || isFunction) {
        return ctorReturnResult
    }
    return newObj
}

var student1 = newOperator(Student, '轩辕', 18);
var student2 = newOperator(Student, 'Rowboat', 18);

// var student1 = new Student('轩辕');
// var student2 = new Student('Rowboat');
console.log(student1, student1.doSth()); // {name: '轩辕'} '轩辕'
console.log(student2, student2.doSth()); // {name: 'Rowboat'} 'Rowboat'

student1.__proto__ === Student.prototype; // true
student2.__proto__ === Student.prototype; // true
// __proto__ 是浏览器实现的查看原型方案。
// 用ES5 则是：
Object.getPrototypeOf(student1) === Student.prototype; // true
Object.getPrototypeOf(student2) === Student.prototype; // true

