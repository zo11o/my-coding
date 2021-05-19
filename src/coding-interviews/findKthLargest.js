
/**
 * 数组中的第K个最大元素
 * @link https://leetcode-cn.com/problems/kth-largest-element-in-an-array/
 */
var findKthLargest = function (arr, k) {
  // 使用快排减而治之的方式
  let len = arr.length;
  let l = 0, r = len - 1;

  // 通过 第 K 大计算第 K 大的数字在部分倒序排列的数组中应该排第几个
  let target = len - k

  while (true) {
    let pivot = partition(arr, l, r)

    if (pivot === target) {
      return arr[pivot]
    } else if (pivot < target) {
      l = pivot + 1
    } else {
      r = pivot - 1
    }
  }


  function partition(arr, left, right) {
    let pivot = left
    let index = left + 1

    for (let i = index; i <= right; i++) {
      if (arr[i] < arr[pivot]) {
        swap(arr, i, index);
        index++
      }

    }
    swap(arr, pivot, index - 1);

    return index - 1
  }

  function swap(numbs, i, j) {
    let temp = numbs[i]
    numbs[i] = numbs[j]
    numbs[j] = temp
  }
}
