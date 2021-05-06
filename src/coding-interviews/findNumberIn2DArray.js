// 题目：
// 在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的
// 一个二维数组和一个整数，判断数组中是否含有该整数

// 思路：
// 1、暴力循环:第一种方式是使用两层循环依次遍历，判断是否含有该整数。这一种方式最坏情况下的时间复杂度为 O(n^2)。
// 2. 第二种方式是利用递增序列的特点，我们可以从二维数组的右上角开始遍历。如果当前数值比所求的数要小，则将位置向下移动 ，再进行判断。如果当前数值比所求的数要大，则将位置向左移动，再进行判断。这一种方式最坏情况下的时间复杂度为 O(n)。

/**
 * 方案一：暴力法
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
// var findNumberIn2DArray = function(matrix, target) {
//   let res = false
//   for (let i = 0; i < matrix.length;i++) {
//       for (let j = 0; j < matrix[i].length; j++) {
//           if (matrix[i][j] === target) return true
//       }
//   }
//   return res
// };

/**
 * 方案二：右上角优先
 * @param {*} matrix
 * @param {*} target
 */
var findNumberIn2DArray = function(matrix, target) {
  if (!matrix.length) {
    return false
  }

  for(let i = 0; i < matrix.length; i++) {
    for (let j = matrix[i].length - 1; j >= 0; j--) {
      let v = matrix[i][j]
      if (target > v) {
        break;
      }
      if (target == v) {
        return true
      }
    }
  }

  return false
};
