

/**
 * 连续子数组的最大和
 * 方案一: 动态规划
 * @link https://leetcode-cn.com/problems/lian-xu-zi-shu-zu-de-zui-da-he-lcof/
 * @param {*} nums
 */
var maxSubArray = function (nums) {
  // 1. 递推公式
  // dp[i] 表示索引为 i 的最大和
  // dp[i] = Math.max(dp[i - 1] + nums[i], num[i])

  let dp = []
  dp[0] = nums[0]
  let res = dp[0]

  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])
    res = Math.max(res, dp[i])
  }

  return res
}
