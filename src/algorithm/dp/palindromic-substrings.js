// 给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。
// 具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。

// 1.
// 输入："abc"
// 输出：3
// 解释：三个回文子串: "a", "b", "c"

// 2
// 输入："aaa"
// 输出：6
// 解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"

const countSubstrings = (s) => {
  let count = 0
  var n = s.length;

  var dp = new Array(n);
  for (let i = 0; i < n; i++) {
    dp[i] = new Array(n).fill(false);
  }

  for (let j = 0; j < n; j ++) {
    for (let i = 0; i <= j; i++) {
      if (i == j) {
        dp[i][j] = true;
        count ++
      } else if (j - i == 1 && s[i] == s[j]) {
        dp[i][j] = true;
        count ++
      } else if (j - i > 1 && s[i] == s[j] && dp[i+1][j-1]) {
        dp[i][j] =true
        count ++
      }
    }
  }
  return count
}
