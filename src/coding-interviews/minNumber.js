/**
 * 把数组排成最小的数
 * @link https://leetcode-cn.com/problems/ba-shu-zu-pai-cheng-zui-xiao-de-shu-lcof/
 */
/**
 * 思路就是快排，修改排序条件
 * @param {*} nums
 * @returns
 */
var minNumber = function (nums) {
  // 本质上是排序，
  // x + y > y + x ，那么 x 就应该放在 y 后面 这个就是排序的判断条件
  quickSort(nums);
  function quickSort(arr, left, right) {
    left = typeof left === 'undefined' ? 0 : left
    right = typeof right === 'undefined' ? arr.length - 1 : right
    if (left < right) {
      let p = partition(arr, left, right)
      quickSort(arr, left, p - 1)
      quickSort(arr, p + 1, right)
    }

    return arr
  }

  return nums.join('')

  function partition(arr, left, right) {
    let pviot = left
    let index = left + 1
    for (let i = index; i <= right; i++) {
      // 这里是原先的快排
      // if (arr[i] < arr[left]) {
      //     swap(arr, index, i);
      //     index ++
      // }

      // 这里就是判断条件
      // x + y > y + x ，那么 x 就应该放在 y 后面 这个就是排序的判断条件
      let x = arr[i], y = arr[left]
      if (String(x) + String(y) < String(y) + String(x)) {
        swap(arr, index, i)
        index++
      }
    }

    swap(arr, pviot, index - 1)
    return index - 1
  }

  function swap(arr, i, j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
}
