// 本节我们讨论深拷贝

// 首先我们了解一下引用类型值拷贝

// 区别于值类型的复制（值复制一份），在 js 中，如果对引用类型值进行复制，拷贝的是类型值的地址，最终指向的是同一份数据
// 无论改变被拷贝或者拷贝的引用类型，都会修改数据：

// 复制引用类型值
var a = {
  name: 'james',
  age: 30
}
var b = a;
b.name = 'kobe'
a.name; // 'kobe'

// 一、浅拷贝

var c = {
  name: 'foo',
  age: 12,
  tool: {
    t: a,
    e: b
  }
}

// 1. Object.assign()
var d = Object.assign({}, c)
d.name
d.name = 'bar'
c.name
c.tool.t = 'ccc'
d.tool.t == 'ccc' // true


// 2. 手动实现clone 方法
var clone = function (obj) {
  var target = {}
  for (var o in obj) {
    if (obj.hasOwnProperty(o)) {
      target[o] = obj[o]
    }
  }

  return target
}

var e = Object.assign({}, c)
console.log(e)
e.tool.t = 'eee'
console.log(c.tool.t);


// ----------------------------

// 二、 深拷贝
// 所谓深拷贝 就是循环深层嵌套的浅拷贝，保证嵌套内部属性改变也不会修改原变量的属性修改

// 字节掩码 是否深拷贝
const CLONE_DEEP_FLAG = 1
// 字节掩码 是否拷贝Symbol
const CLONE_SYMBOLS_FLAG = 4

// 函数反柯里化
const toString = Object.prototype.toString

// 获取值类型标记
function getTag(value) {
  if (value == null) {
    return value === null ? '[Object Null]' : '[Object Undefined]'
  }

  return toString.call(value)
}

function isType(value, type) {
  return getTag(value) === '[Object ' + type + ']'
}

function isObject(value) {
  const type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

const symbolValueOf = Symbol.prototype.valueOf;

function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};

}

function eq(value, other) {
  return value === other || (value !== value && other !== other)
}

function baseAssignValue(object, key, value) {
  if (key == '__proto__') {
    Object.defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    })
  } else {
    object[key] = value
  }
}


function assignValue(object, key, value) {
  const objValue = object[key]

  if (!(hasOwnProperty.call(object, key) && eq(objValue, value))) {
    if (value !== 0 || (1 / value) === (1 / objValue)) {
      baseAssignValue(object, key, value)
    }
  } else if (value === undefined && !(key in object)) {
    baseAssignValue(object, key, value)
  }
}

//正确辨别元素类型
const argsTag = '[object Arguments]'
const arrayTag = '[object Array]'
const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const mapTag = '[object Map]'
const numberTag = '[object Number]'
const objectTag = '[object Object]'
const regexpTag = '[object RegExp]'
const setTag = '[object Set]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const weakMapTag = '[object WeakMap]'

const hasOwnProperty = Object.prototype.hasOwnProperty;

function initCloneByTag(object, tag) {
  const Ctor = object.constructor;

  switch (tag) {
    case mapTag:
      return new Ctor;
      break;
    case stringTag:
      return new Ctor(object);
      break;
    case setTag:
      return new Ctor;
    case symbolTag:
      return cloneSymbol(object);
    default:
      break;
  }
}


function initCloneArray(array) {
  // 获取数组长度
  const {
    length
  } = array;

  // 构造相同长度的数组
  const result = new array.constructor(length);

  // const matches = /(hello \S+)/.exec('hello world, javascript');
  // console.log(matches);
  // [
  //     0: "hello world,"
  //     1: "hello world,"
  //     index: 0
  //     input: "hello world, javascript"
  //     groups: undefined
  //     length: 2
  // ]

  // 判断长度存在并且保证数组的第一个值为字符串并且判断在数组非原型链上是否有index属性。
  // 这里是
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    //复制index、input属性
    result.index = array.index;
    result.input = array.input;
  }

  return result;
}

function copyArray(source, array) {
  let index = -1;
  const length = source.length;
  array || (array = new Array(length))

  while (++index < length) {
    array[index] = source[index]
  }
  return array;
}

function initCloneObject(object) {

  // 这里指的是 对象不是原型对象(即不是下文中的 school)
  // 比如:
  /*
    function School (name) {
      this.name = name
      this.statue = 'open'
    }

    School.prototype.open = function () {
      console.log('This time to go to school')
    }

    function Person (name) {
      School.call(this)
      this.job = ''
    }
    Person.prototype = new School();
    Person.prototype.constructor = Person;
    Person.prototype.sayName = function () {
      console.log(this.name)
    }
  */

  return (typeof object.constructor == 'function' && !isPrototype(object)) ? Object.create(Object.getPrototypeOf(object)) : {}


  // 判断对象是否原型 即上面的 Person.prototype
  function isPrototype(value) {
    const Ctor = value && value.constructor

    const proto = (typeof Ctor == 'function' ? Ctor.prototype : '') || Object.prototype;
    return value === proto;
  }
}

function arrayEach(array, iteratee) {
  let index = -1
  const length = array.length

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break
    }
  }
  return array
}

// 实际运行的 clone 方法
function baseClone(value) {

  // 返回结果
  let result

  // 判断要克隆的值是否是对象，不是的话就直接返回要克隆的值
  if (!isObject(value)) {
    return value;
  }

  const isArr = Array.isArray(value)
  const tag = getTag(value)

  if (isArr) {
    result = initCloneArray(value);
  } else {
    const isFunc = typeof value == 'function';

    // 如果是方法或者是参数
    if (tag == objectTag || tag == argsTag || (isFunc)) {
      result = isFunc ? {} : initCloneObject(value)
    } else {
      result = initCloneByTag(value, tag)
    }
  }

  // 复制map
  if (tag == mapTag) {
    value.forEach((subValue, key) => {
      result.set(key, baseClone(subValue))
    })
    return result
  }

  // 判断值是对象还是数组
  const props = isArr ? undefined : Object.keys(value)
  arrayEach(props || value, (subValue, key) => {
    if (props) {
      key = subValue
      subValue = value[key]
    }
    assignValue(result, key, baseClone(subValue))
  })

  return result
}

// 调用包装函数
function deepClone(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

// 注意： 以上还是没有解决循环引用爆栈问题
// lodash 源码中是自定义 stack 数据结构利用缓存来解决, 等待之后跟进

// 以下我们测试用例
let map = new Map()
map.set('k', ' v')
let symbol = Symbol('hhh')

console.log(map);
let obj = {
  a: 1,
  b: {
    c: 2,
    d: 3,
    e: 'ee'
  },
  m: map,
  s: symbol,
  y: ['y', 3, {
    arr: ['ccc', 44]
  }],
  f: () => {
    console.log('hello work')
  }
}
// obj.c = obj.b
// obj.e = obj.a
// obj.b.c = obj.c
// obj.b.d = obj.b
// obj.b.e = obj.b.c
console.log(obj);

var cloneObj = deepClone(obj);
cloneObj.b.e = 'dd'
console.log(cloneObj)

console.log(obj.b.e)

// 本文参考:
// lodash 源码 https://github.com/lodash/lodash
