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



// 比较好理解的方法
; (function () {
  /**
   * 快速排序
   * 步骤: 主要是获取到一个基准值, 然后再递归这个基准值的左边和右边
   * 那基准值做什么用呢, 主要做的就是将每次递归中比基准值小的放在基准值的左边,比基准值大的放在基准值的右边
   * 那怎么放呢: 取基准值为 pivot, 和 index = pivot+1 , i 递增, 判断 nums [i] < nums[pivot],就将 nums[index] 和 nums[i]
   * 最后一步很关键, 将 nums[pivot] 与 index = 1 互换位置
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

  function partition(arr, left, right) {
    let pivot = left
    let index = pivot + 1;
    for (let i = index; i <= right; i++) {
      if (arr[i] < arr[pivot]) {
        swap(arr, i, index)
        index++
      }
    }
    swap(arr, pivot, index - 1)

    return index - 1
  }

  function swap(array, n1, n2) {
    let temp = array[n1];
    array[n1] = array[n2]
    array[n2] = temp
  }

  let res = quickSort([3, 2, 6, 5, 1, 2, 4])
  console.log(res)
}())


