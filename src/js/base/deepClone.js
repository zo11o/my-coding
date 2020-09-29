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


/************************************************************/
/**
 * 手动实现一个深克隆(考虑日期/正则等特殊对象 和 解决循环引用情况)
 */
var simpleDeepClone = (function () {

  /**
   * 判断是否对象
   * @param {any} target any
   */
  const isObject = (target) => {
    return target !== null && (typeof target === "object" && typeof target === "function")
  }


  // 为什么要这样做呢？，先来看看WeakMap的作用：
  // WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。
  // 其键必须是对象，而值可以是任意的。

  // 什么是弱引用呢？
  // 在计算机程序设计中，弱引用与强引用相对，是指不能确保其引用的对象不会被垃圾回收器回收的引用。
  // 一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收。

  function deepClone(target, map = new WeakMap()) {
    // 是否被引用过 解决爆栈问题
    if (map.get(target)) {
      return target
    }

    // 获取当前值的构造函数：获取它的类型
    let constructor = target.constructor;

    // 检测当前对象target是否与 正则、日期格式对象匹配
    if (/^(RegExp|Date)$/i.test(constructor.name)) {
      return new constructor(target); // 创建一个新的特殊对象(正则类/日期类)的实例
    }

    if (isObject(target)) {
      map.set(target, true); // 为循环引用的对象做标记
      const cloneTarget = Array.isArray(target) ? [] : {};
      for (let prop in target) {
        if (target.hasOwnProperty(prop)) {
          cloneTarget[prop] = deepClone(target[prop], map);
        }
      }
      return cloneTarget;
    } else {
      return target;
    }
  }

  return deepClone

})()

var a = {
  a: a,
  b: '32',
  c: {
    a: 1,
    b: a
  }
}

var sd = simpleDeepClone([21, {
  a: a,
  b: {
    c: a
  }
}, 12321, ['33', {
  c: '23423'
}]])

console.log(sd)


/****************************************************************/

// 以下实现参考链接
// 作者：ConardLi
// 链接：https://juejin.im/post/6844903929705136141
// 来源：掘金

var cloneDeep = (function () {

  // 一个合格的深拷贝需要考虑的问题
  // 1. 循环引用（爆栈）问题
  // 2. 数组问题
  // 3. 性能问题（执行效率）问题 WeakMap. for while
  // 4. 数据类型问题
  //    可遍历：map, set, array, object
  //    不可遍历：boolean, date, error, number, regexp, string, symbol
  // 5. 克隆函数

  // 可循环类型
  const mapTag = "[object Map]"
  const setTag = "[object Set]"
  const arrayTag = "[object Array]"
  const objectTag = "[object Object]"
  const argsTag = '[object Arguments]';

  // 不可循环类型
  const booleanTag = "[object Boolean]"
  const dateTag = "[object Date]"
  const errorTag = "[object Error]"
  const numberTag = "[object Number]"
  const regexpTag = "[object RegExp]"
  const stringTag = "[object String]"
  const symbolTag = "[object Symbol]"
  const funcTag = '[object Function]';

  // 需要深度遍历的
  const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

  const isObject = (target) => {
    const type = typeof target;
    return type !== null && (type === 'object' || type === 'function');
  }

  /**
   * 合理的类型判断
   * @param {*} target
   */
  const getType = (target) => {
    return Object.prototype.toString.call(target)
  }

  const forEach = (arr, fn) => {
    let index = -1;
    const len = arr.length
    while (++index < arr.length) {
      fn(arr[index], index);
    }
    return arr;
  }

  const getInit = (target) => {
    let Ctor = target.constructor;
    return new Ctor();
  }

  const cloneRegExp = (target) => {
    //标志参数 i m g
    const reFlags = /\w*$/;
    // RegExp.prototype.source: 正则表达式的文本。
    const result = new target.constructor(target.source, reFlags.exec(target));
    // 该索引表示从哪里开始下一个匹配
    result.lastIndex = target.lastIndex;
    return result;
  }

  const cloneSymbol = (target) => {
    const symbolValueOf = Symbol.prototype.valueOf;
    return symbolValueOf ? Object(symbolValueOf.call(target)) : {};
  }

  const cloneFunction = (target) => {
    return target
  }

  const cloneOtherType = (target, type) => {
    const Ctor = target.constructor;

    switch (type) {
      case booleanTag:
      case numberTag:
      case stringTag:
      case errorTag:
      case dateTag:
        return new Ctor(target);
      case regexpTag:
        return cloneRegExp(target)
      case symbolTag:
        return cloneSymbol(target)
      case funcTag:
        return cloneFunction(target);
      default:
        return null;
    }

  }

  // new WeakMap 解决爆栈问题： 关键词： 键必须是对象 弱引用 随时被回收
  function _clone(target, map = new WeakMap()) {
    if (!isObject(target) || target == null) {
      return target;
    }

    // 防止循环
    if (map.has(target)) {
      return map.get(target);
    }

    let cloneTarget
    const type = getType(target)
    if (deepTag.includes(type)) {
      cloneTarget = getInit(target, type)
    } else {
      return cloneOtherType(target, type);
    }

    map.set(target, cloneTarget);
    // for (const key in target) {
    //   cloneTarget[key] = _clone(target[key], map);
    // }

    // clone set
    if (type === setTag) {
      target.forEach(value => {
        cloneTarget.add(_clone(value, map));
      })
      return cloneTarget
    }

    // clone map
    if (type === mapTag) {
      target.forEach((value, key) => {
        cloneTarget.set(key, _clone(value, map));
      })
      return cloneTarget
    }

    // clone arry || object
    // var keys = type === arrayTag ? null : Object.keys(target)
    // forEach(keys || target, (value, key) => {
    //   if (keys) {
    //     key = value;
    //   }
    //   cloneTarget[key] = _clone(target[key], map);
    // })

    for (const key in target) {
      cloneTarget[key] = _clone(target[key], map);
    }

    return cloneTarget;
  }

  return _clone;
})();

// 测试用例
// const target = {
//   field1: 1,
//   field2: undefined,
//   field3: {
//     child: 'child'
//   },
//   field4: [2, 4, 8],
//   f: {
//     f: {
//       f: {
//         f: {
//           f: {
//             f: {
//               f: {
//                 f: {
//                   f: {
//                     f: {
//                       f: {
//                         f: {}
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   },
// };

// target.target = target;

// console.time();
// const result = simpleDeepClone(target);
// console.timeEnd();

// console.time();
// const result2 = cloneDeep(target);
// console.log(result2)
// console.timeEnd();


// const map1 = new Map();
// map1.set('key', 'value');
// map1.set('ConardLi', 'code秘密花园');

// const set = new Set();
// set.add('ConardLi');
// set.add('code秘密花园');

// const target = {
//   field1: 1,
//   field2: undefined,
//   field3: {
//     child: 'child'
//   },
//   field4: [2, 4, 8],
//   empty: null,
//   map1,
//   set,
// };


// const result = clone(target);

// console.log(result);
// console.log(result.map === target.map);


const map1 = new Map();
map1.set('key', 'value');
map1.set('ConardLi', 'code秘密花园');

const set = new Set();
set.add('ConardLi');
set.add('code秘密花园');

const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    empty: null,
    map,
    set,
    bool: new Boolean(true),
    num: new Number(2),
    str: new String(2),
    symbol: Object(Symbol(1)),
    date: new Date(),
    reg: /\d+/,
    error: new Error(),
    func1: () => {
        console.log('code秘密花园');
    },
    func2: function (a, b) {
        return a + b;
    }
};

console.log(cloneDeep(target))
