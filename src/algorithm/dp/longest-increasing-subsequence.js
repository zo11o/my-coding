/**
 * 最长递增子序列
 * 标准动态规划
 * dp[i]表示 [0, i] 内的个数
 */
var lengthOfLIS = function (nums) {
  var N = nums.length;
  var dp = new Array(N).fill(1);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  console.log(dp)
  return Math.max(...dp);
}

var r = lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])
console.log(r)
