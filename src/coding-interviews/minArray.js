/**
 * 旋转数组的最小数字
 * 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一个旋转，该数组的最小值为1。  
 */

// 思路一：Api 方法 Math.min(...numbers)
// 思路二：
// 思路三：二分法

(function () {
  /**
   * 思路一
   * @param {*} numbers
   */
  var minArray = function (numbers) {
    return Math.min(...numbers)
  }
}())


(function () {
  /**
   * 思路二
   * 如果发现前一个大于后一个 就是后面那个值
   * @param {*} numbers
   */
  var minArray = function (numbers) {
    let res = 0
    for (let i = 0; i < numbers.length; i++) {
      const n = numbers[i];
      if (i - 1 >= 0) {
        if (numbers[i] < numbers[i - 1]) {
          res = n
          break
        }
      } else {
        res = n
      }
    }
    return res
  }
}())


