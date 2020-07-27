// 本节我们手写 await 实现

// 先写测试用例
const getData = () =>
  new Promise((resolve) => setTimeout(() => resolve("data"), 1000));

// async function test() {
//   const data = await getData();
//   console.log("data", data);
//   const data2 = await getData();
//   console.log("data2: ", data2);
//   return "success";
// }

// // 注意 async 函数返回一个 Promise
// test().then((res) => {
//   console.log(res);
// });

/*
  首先明白我们要做些什么
  async/await 是 generator 的语法糖
  其实就是我们在使用 generator 里面的 yield 不会自动自行，
  需要我们 不断用 generator 实例.next() 方法去调用，
  用了 async 之后可以自动执行
  结论： 我们要写一个函数 asyncGenerator
  1. 这个函数调用 generator 内部所有 yield 直到 done:true 释放
  2. 函数参数为 generator 函数 asyncGenerator(genFn)
  3. 函数返回一个函数 asyncGenerator(genFn)(): Promise
*/
// 测试用例用 generator 函数的表述

function* testGen() {
  const data = yield getData();
  console.log("data", data);
  const data2 = yield getData();
  console.log("data2: ", data2);
  return "success";
}
/*

// 例一：使用 generator 方法
var tg = testGen();
var dataPromise = tg.next();
// console.log('====================================');
// console.log(dataPromise);  // { value: Promise, done: false }
// console.log('====================================');
dataPromise.value.then((v1) => {
  const dataPromise2 = tg.next(v1);

  dataPromise2.value.then((v2) => {
    console.log("here:", tg.next(v2));
  });
});

*/

// 生成函数

function asyncGenerator(genFn) {

  // 返回一个函数
  return function () {
    // 创建 gen 实例 如例子中的  tg = testGen()
    const gen = genFn.call(this, arguments);

    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let generatorResult
        try {
          generatorResult = gen[key](arg)
        } catch (e){
          return reject(e)
        }

        const {value, done} = generatorResult;

        if (done) {
          return resolve(value)
        } else {
          return Promise.resolve(value).then(val => step('next', val), err => step('throw', err))
        }

      }

      step("next")
    })
  }
}

// 调用方式
asyncGenerator(testGen)()


