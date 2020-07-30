// 选择排序

// 测试路径 test\algorithm\sort\selectSort.test.js
// 每次保留一个最小的 把最小的放到为排序的第一个
export default function selectSort(nums) {

  var minIndex, temp
  for (var i = 0; i <= nums.length; i++) {
    minIndex = i;
    for (var j = i; j <= nums.length; j++) {
      if (nums[j] < nums[minIndex]) {
        minIndex = j
      }
    }

    if (minIndex != i) {
      temp = nums[i];
      nums[i] = nums[minIndex]
      nums[minIndex] = temp
    }
  }
  return nums;
}

// selectSort([34253, 543, 33, 12, 5, 6543, 1234, 33, 211, 4, 66, 1])
