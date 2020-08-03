// 插入排序
// 测试路径 test\algorithm\sort\insertSort.test.js
export default function insertSort(nums) {
  var len = nums.length;
  for (var i = 0; i <= len - 1; i++) {
    var temp = nums[i]
    var j = i;
    while (j > 0 && temp < nums[j - 1]) {
      nums[j] = nums[j - 1];
      j--;
    }

    if (j != i) {
      nums[j] = temp
    }
  }
  return nums
}
insertSort([34253, 543, 33, 12, 5, 6543, 1234, 33, 211, 4, 66, 1])
