// 归并排序
// 分治思想的经典体现

// 测试路径：/my-coding/test/algorithm/sort/mergeSort.test.js

function mergeSort(nums) {
  if (nums.length < 2) {
    return nums;
  }

  var mid = Math.floor(nums.length / 2)

  var left = nums.slice(0, mid);
  var right = nums.slice(mid)

  return merge(mergeSort(left), mergeSort(right));

}

function merge(left, right) {
  var result = []
  while (left.length && right.length) {
    if (right[0] >= left[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  while (left.length) {
    result.push(left.shift())
  }

  while (right.length) {
    result.push(right.shift())
  }

  return result

}


var a = mergeSort([34253, 543, 33, 12, 5, 6543, 1234, 33, 211, 4, 66, 1])

export default mergeSort
