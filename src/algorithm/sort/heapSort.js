/**
 * 堆排序
 * @desc 利用堆数据结构的特性进行排序
 * @test 测试路径 test/algorithm/sort/heapSort.test.js
 */
function heapSort(nums) {
  var len

  /**
   * 堆化
   */
  const heapify = (arr) => {
    len = nums.length;
    // 从第一个非叶子节点计算起
    for (let i = Math.floor(len / 2); i >= 0; i--) {
      shiftDown(arr, i);
    }
  }

  const swap = (arr, i, j) => {
    let temp = arr;
    temp = arr[i];
    arr[i] = arr[j]
    arr[j] = temp;
  }

  /**
   * 下沉
   * @param {Array<number>} arr
   */
  const shiftDown = (arr, i) => {
    // console.log('!!!test 最重要的输出:', arr)
    // 左节点
    let left = 2 * i + 1
    // 右节点
    let right = 2 * i + 2
    // 最大节点
    let largest = i;

    if (left < len && arr[left] > arr[largest]) {
      largest = left
    }

    if (right < len && arr[right] > arr[largest]) {
      largest = right
    }

    if (largest != i) {
      swap(arr, largest, i);
      shiftDown(arr, largest)
    }
  }

  // 先堆化
  heapify(nums);

  for (var i = nums.length - 1; i > 0; i--) {
    swap(nums, 0, i);
    len--;
    shiftDown(nums, 0);
  }

  return nums
}

// 测试用例
// var arr = heapSort([6, 5, 78, 2, 5])
// console.log(arr);
/*
上例堆化过程

1. i = 2; n = 78 时:
  2 * i + 1 = 5 >= len;
[6, 5, 78, 2, 5]

2. i = 1; n = 5 时:
  2 * i + 1 = 3,
  2 * i + 2 = 4,
  i = 3; v = 2 <= 2
  i = 4; v = 5 <= 5

[6, 5, 78, 2, 5]
[6, 5, 78, 2, 5]

3. i = 0; n = 6 时:
  2*i + 1 = 1;
  i = 1; v = 5 <= 6
  i = 2; v =78 > 6 中了 所以调整位置
[78, 5, 6, 2, 5]

4. 将最大堆第一个和最后一个调整位置， 数组最后一个就是最大的数了
[5, 5, 6, 2, 78]

5. 出去已经排好序的最后一个，重复上面1 2 3 4 步；
[6, 5, 5, 2, 78]
[2, 5, 5, 6, 78]
[5, 2, 5, 6, 78]
[5, 2, 5, 6, 78]
[2, 5, 5, 6, 78]
 */

export default heapSort



; (function () {
  let len;

  function buildMaxHeap(nums) {
    len = nums.length;

    for (let i = Math.floor(len / 2); i >= 0; i--) {
      heapify(nums, i)
    }

  }

  function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  function heapify(arr, index) {
    let left = 2 * index + 1
    let right = 2 * index + 2
    let largest = index

    if (left < len && arr[left] > arr[largest]) {
      largest = left
    }

    if (right < len && arr[right] > arr[largest]) {
      largest = right
    }

    if (largest != index) {
      swap(arr, index, largest)
      heapify(arr, largest)
    }
  }

  /**
   * 堆排序
   * 1. 构建大顶堆
   */
  function heapSort(nums) {
    buildMaxHeap(nums)
    // console.log(nums)
    for (let i = nums.length -1;i > 0;i--) {
      swap(nums, 0, i)
      len --;
      heapify(nums, 0)
    }

    return nums
  }

  let res = heapSort([5, 8, 2, 9, 4, 7])
  console.log(res)





  // var len;    // 因为声明的多个函数都需要数据长度，所以把len设置成为全局变量

  // function buildMaxHeap(arr) {   // 建立大顶堆
  //   len = arr.length;
  //   for (var i = Math.floor(len / 2); i >= 0; i--) {
  //     heapify(arr, i);
  //   }
  // }

  // function heapify(arr, i) {     // 堆调整
  //   var left = 2 * i + 1,
  //     right = 2 * i + 2,
  //     largest = i;

  //   if (left < len && arr[left] > arr[largest]) {
  //     largest = left;
  //   }

  //   if (right < len && arr[right] > arr[largest]) {
  //     largest = right;
  //   }

  //   if (largest != i) {
  //     swap(arr, i, largest);
  //     heapify(arr, largest);
  //   }
  // }

  // function swap(arr, i, j) {
  //   var temp = arr[i];
  //   arr[i] = arr[j];
  //   arr[j] = temp;
  // }

  // function heapSort(arr) {
  //   buildMaxHeap(arr);

  //   for (var i = arr.length - 1; i > 0; i--) {
  //     console.log(arr)
  //     swap(arr, 0, i);
  //     len--;
  //     heapify(arr, 0);
  //   }
  //   return arr;
  // }

  // let res = heapSort([5, 8, 2, 9, 4, 7])
  // console.log(res)

}())
