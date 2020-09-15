// 输入两个数字 n, k，算法输出 [1..n] 中 k 个数字的所有组合
/*
比如输入： n = 4, k = 2
输出如下结果， 顺序无所谓， 但是不能包含重复（ 按照组合的定义，[1, 2] 和[2, 1] 也算重复）：

输出：
  [
    [1, 2],
    [1, 3],
    [1, 4],
    [2, 3],
    [2, 4],
    [3, 4]
  ]
 */

function combine(n,k) {
  var res = [];
  var track = [];

  backtrack(n, k, 1, track);

  function backtrack(n, k, start, track) {
    if (k == track.length) {
      res.push(Object.assign([], track));
      return
    }
    for (let i = start; i <= n; i++) {
      track.push(i)
      backtrack(n, k, i + 1, track);
      track.pop();
    }
  }

  return res;
}

let ans = combine(4,2)
console.log(ans);
