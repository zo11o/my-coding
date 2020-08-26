// 快速排序

// 测试路径：/my-coding/test/algorithm/sort/mergeSort.test.js

// var quickSort = function(nums) {
//     return nums.sort((a, b)=> a- b);
// }

// var quickSort = function(nums) {
//     // 快速排序
//     var len = nums.length;
//     if (len <2) {
//         return nums;
//     }
//     return _quickSort(nums, 0, len - 1);
// };

// var _quickSort = function(arr, left, right) {
//     // 确定基准
//     if (left < right) {
//         var partitionIndex = partition(arr, left, right);
//         quickSort(arr, left, partitionIndex - 1);
//         quickSort(arr, partitionIndex + 1, right);
//     }

//     return arr;
// }

// function partition (arr, left, right) {
//     var pivoet = left;
//     var index = pivoet + 1;

//     for (var i = index; i <= right; i ++) {
//         if (arr[i] < arr[pivoet]) {
//             exch(arr, i, index);
//             index ++;
//         }
//     }
//     exch(arr, index - 1, pivoet);
//     return index - 1;
// }

// function exch(arr, i, j) {
//     let temp = arr[i];
//     arr[i] = arr[j];
//     arr[j] = temp;
// }


// 方法一： 填坑法
function quickSort(nums) {
  _quickSort(nums, 0, nums.length - 1);
  return nums;
}

function _quickSort(nums, startIndex, endIndex) {

  // 判断递归结束条件
  if (startIndex >= endIndex) {
    return
  }

  // 得到基准元素位置
  var pivotIndex = partition(nums, startIndex, endIndex);

  // 分治法递归数列的两部分
  _quickSort(nums, startIndex, pivotIndex - 1);
  _quickSort(nums, pivotIndex + 1, endIndex);

}

// function partition(nums, startIndex, endIndex) {
//   // 取数组第一个为基准值
//   var pivot = nums[startIndex];

//   var left = startIndex, right = endIndex;

//   // 坑的位置
//   var index = startIndex;

//   while(right >= left) {

//     while(right >= left) {
//       if (nums[right] < pivot) {
//         nums[left] = nums[right]
//         index = right;
//         left ++
//         break;
//       }
//       right --
//     }

//     while(right >= left) {
//       if (nums[left] > pivot) {
//         nums[right] = nums[left];
//         index = left;
//         right --
//         break;
//       }
//       left ++
//     }

//     nums[index] = pivot;
//     return index;
//   }
// }

// ---------------  ----------
// 方法二：指针互换法
function partition(nums, startIndex, endIndex) {
  // 取数组第一个为基准值
  var pivot = nums[startIndex];

  var left = startIndex,
    right = endIndex;

  // 坑的位置
  var index = startIndex;

  while (left != right) {
    while (left < right && nums[right] > pivot) {
      right--
    }

    while (left < right && nums[left] <= pivot) {
      left++
    }

    if (left < right) {
      var p = nums[left];
      nums[left] = nums[right]
      nums[right] = p
    }
  }

  var p = nums[left]
  nums[left] = nums[startIndex]
  nums[startIndex] = p;

  return left
}


var a = quickSort([5, 1, 4, 2, 2, 1, 5, 3, 23])
export default quickSort;
