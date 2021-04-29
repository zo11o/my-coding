;(function() {
  /**
   * 快速排序
   * @param {*} nums
   */
  function quickSort(nums, left, right) {
    let len = nums.length;
    let partitionIndex;
    left = typeof left != "number" ? 0 : left
    right = typeof right != "number" ? len - 1 : right

    if (left < right) {
      partitionIndex = partition(nums, left, right)
      quickSort(nums, left, partitionIndex),
      quickSort(nums, partitionIndex + 1, right);
    }
    return nums;
  }

  function partition (arr, left, right) {
    let p = left
    let index = p + 1;
    for (let i = index; i <= right; i++) {
      if (arr[i] < arr[p]) {
        swap(arr, i, index)
        index++
      }
    }
    swap(arr, p, index - 1)
    console.log(arr)

    return index - 1
  }

  function swap(array, n1, n2) {
    let temp = array[n1];
    array[n1] = array[n2]
    array[n2] = temp
  }

  let res = quickSort([3, 2, 6, 5, 1, 4, 3, 2, 6, 5, 1, 4])
  console.log(res)
}())
