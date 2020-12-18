// leetcode 121. 买卖股票的最佳时机 https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/
/*
给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

如果你最多只允许完成一笔交易（即买入和卖出一支股票一次），设计一个算法来计算你所能获取的最大利润。

注意：你不能在买入股票前卖出股票。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * 暴力法
 * @test 1. [7,6,4,3,1] 2. [7,1,5,3,6,4]
 */
var maxProfit = function (prices) {
  let len = prices.length;
  var res = 0;
  for (let i = 0; i < len; i++) {
    let start = prices[i],
      max = prices[i]
    for (let j = i + 1; j < len; j++) {
      if (max < prices[j]) {
        max = prices[j]
      }
    }
    if (max > start && (max - start > res)) {
      res = max - start
    }
  }
  return res
  // 执行用时：
  // 296 ms, 在所有 JavaScript 提交中击败了 25.80 % 的用户
  // 内存消耗：
  // 39.3 MB, 在所有 JavaScript 提交中击败了 57.75 % 的用户
}

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  //1. 最大差值法
  var min = Number.MAX_VALUE;
  var res = 0;
  prices.forEach((o, i) => {
      min = Math.min(min, o);
      res = Math.max(res, o - min);
  })
  return res
};

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  //3. 动态规划
  // 明确 dp[i] 表示什么： dp[i] 表示前 i 天的最大利润
  // 特征方程： dp[i] = Max(dp[i - 1], price - minPirce);
  var n = prices.length;
  if (!n) return 0
  var minPirce = prices[0];
  var dp = new Array(n).fill(0)
  for (var i = 1; i < n; i++) {
      var o = prices[i]
      minPirce = Math.min(minPirce, o)
      dp[i] = Math.max(dp[i - 1], (o - minPirce))
  }
  return dp[n - 1]
};
