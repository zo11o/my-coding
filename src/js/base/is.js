// 如何判断两个值是否为同个值
// Object.is ：与 === 相同，但是对于 NaN 和 -0 和 +0 进行特殊处理， Object.is(NaN, NaN) 为 true ， Object.is(+0, -0) 为 false
// Object.is(x, y);

// Polyfill:
if (!Object.is) {
  Object.is = function (x, y) {
    // SameValue
    if (x === y) { // 标准规范Steps 1 - 5, 7 - 10
      // 规范 Step 6.b - 6.e: +0 != -0
      // +0 !== 0 -> false || 1 / +0 (Infinity) === 1 / -0 (-Infinity) -> true
      return x !== 0 || 1 / x === 1 / y
    } else {
      // step 6.a: NaN == NaN
      return x !== x && y !== y
    }
  }
}
