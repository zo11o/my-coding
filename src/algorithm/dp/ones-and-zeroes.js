var findMaxForm = function (strs, m, n) {
  // 转化为 0/1 背包问题
  // 题目问啥 就把啥当成状态 dp[i][j][k] 表示再 [0, i] 区间内可以装下 j 个 0 和 k 个 1的最大子集
  var N = strs.length;
  var dp = new Array(N + 1).fill(
    ((new Array(m + 1)).fill(
      (new Array(n + 1)).fill(0)
    ))
  )

  for (let i = 1; i <= N; i++) {
    const cnt = countZeroAndOne(strs[i - 1]);

    for (let j = 0; j <= m; j++) {
      for (let k = 0; k <= n; k++) {
        dp[i][j][k] = dp[i - 1][j][k]
        let zero = cnt[0],
          one = cnt[1];
        if (j >= zero && k >= one) {
          dp[i][j][k] = Math.max(dp[i - 1][j][k], dp[i - 1][j - zero][k - one] + 1)
        }
      }
    }
  }
  console.log(dp);
  return dp[N][m][n]

  // 计算每个元素 1 的个数 和 0 的个数
  function countZeroAndOne(str) {
    const arr = str.split('');
    var cnt = [0, 0];
    arr.forEach(o => {
      cnt[String(Number(o) - 0)]++
    })
    return cnt;
  }

};

console.log(findMaxForm(["10", "0001", "111001", "1", "0"], 5, 3))
