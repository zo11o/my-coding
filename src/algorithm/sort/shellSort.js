// 希尔排序
// 本文讨论希尔排序
// 希尔排序其实是插入排序的优化
// 从整体的每次都去对比已经排好序的项调整为先对一定区间内的项去对比。
// 先对一定区间的 item 排好序， 再不断缩小 gap 的间距， 达到有序

// 测试路径 test/algorithm/sort/selectSort.test.js

function shellSort(nums) {
  var gap = 1
  var len = nums.length;

  // 计算出合理的增量
  while (gap < len) {
    gap = gap * 3 + 1
  }

  while (gap > 0) {
    for (var i = gap; i < len; i++) {
      var temp = nums[i]

      var j = i - gap;
      while (j >=0 && nums[j] > temp) {
        nums[j + gap] = nums[j];
        j -= gap;
      }

      nums[j + gap] = temp;
    }
    gap = Math.floor(gap / 3);
  }

  return nums
}

var a = shellSort([34253, 543, 33, 12, 5, 6543, 1234, 33, 211, 4, 66, 1])
export default shellSort
