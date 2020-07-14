/**
 * 一 递归暴力版本
 * @param {number[][]} triangle
 * @return {number}
 */
// var minimumTotal = function (triangle) {
//   return dfs(triangle, 0, 0)
// };

// function dfs(triangle , i , j) {

//   // base case
//   if (i == triangle.length) {
//       return 0
//   }

//   // 递归求解式 （状态转移方程）
//   return Math.min(dfs(triangle, i + 1,j), dfs( triangle,i + 1, j + 1)) + triangle[i][j]
// }


// ----------------------------------------------


/**
 * 二 加记忆存储版本
 * @param {number[][]} triangle
 * @return {number}
 */

// var memo = []

// var minimumTotal = function (triangle) {
//     return dfs(triangle, 0, 0)
// };

// function dfs(triangle, i, j) {

//     // base case
//     if (i == triangle.length) {
//         return 0
//     }

//     if (memo[i] == null) {
//         memo[i] = []
//     } else if (memo[i][j] != null) {
//         return memo[i][j]
//     }

//     // 递归求解式 （状态转移方程）
//     memo[i][j] = Math.min(dfs(triangle, i + 1, j), dfs(triangle, i + 1, j + 1)) + triangle[i][j]
//     return memo[i][j]
// }

// -------------------

/**
 * 动态规划自底向上版本
 * @param {number[][]} triangle
 * @return {number}
 */
// var minimumTotal = function (triangle) {
//   var len = triangle.length;
//   var dp = buildArr(len+1, len+1)
//   for (var i = len - 1; i >= 0; i--) {
//       for (var j = 0; j <= i; j++) {
//           dp[i][j] = Math.min(dp[i + 1][j], dp[i + 1][j + 1]) + triangle[i][j];
//       }
//   }
//   return dp[0][0]
// };

// function buildArr(x, y) {
//   var arr = new Array();             //声明一维数组
//   for (var i = 0; i < x; i++) {
//       arr[i] = new Array();        //声明二维数组
//       for (var j = 0; j < y; j++) {
//           arr[i][j] = 0;          //数组初始化为0
//       }
//   }
//   return arr
// }


//-----------------

/**
 * 空间优化版本
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
  var len = triangle.length;
  var dp = createArray(len + 1)
  for (var i = len - 1; i >= 0; i--) {
      for (var j = 0; j <= i; j++) {
          dp[j] = Math.min(dp[j], dp[j + 1]) + triangle[i][j];
      }
  }
  return dp[0]
};

function createArray(x) {
  var arr = []
  for (var i = 0; i < x; i++) {
      arr[i] = 0
  }

  return arr
}

export default minimumTotal;
