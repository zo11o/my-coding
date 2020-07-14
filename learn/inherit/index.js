// 原型继承
function Foo(name) {
    this.name = name;
}

Foo.prototype = {
    sayName: function () {
        console.log(this.name);
    }
}

// 手动赋值
Object.defineProperty(Foo.prototype, "constructor", {
    writable:true,
    configurable: true,
    enumerable:true,
    value: Foo
})

function Bar(name, label) {
    Foo.call(this, name);
    this.label = label
}

Bar.prototype = Object.create(Foo.prototype);

Bar.prototype.sayLabel = function () {
    console.log(this.label)
}

// 手动赋值
Object.defineProperty(Bar.prototype, "constructor", {
    writable:true,
    configurable: true,
    enumerable:true,
    value: Bar
})

var foo = new Foo('f');
foo.sayName();


var bar = new Bar('b', 'l');
bar.sayName()
bar.sayLabel()

console.log(Foo.prototype.constructor)
console.log(foo.__proto__.constructor)
console.log(bar.__proto__.constructor)


// 类关联 Object.create()
var anotherObject = {
    a: 1
}

var myObject = Object.create(anotherObject, {
    b: {
        enumerable: true,
        writable: true,
        configurable: true,
        value: 3,
    },
    c: {
        enumerable: true,
        writable: true,
        configurable: true,
        value: 4,
    },
})

console.log(myObject.hasOwnProperty("b"));

console.log(myObject.b);


function Bar () {

}

var bar = new Bar();
// console.log(bar instanceof Bar);
console.log(Object.getPrototypeOf(bar))