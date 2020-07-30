// 冒泡排序
// 循环两次 每次 判断当前数字 和 下一个数字的大小， 如 当先比下个大 调换位置

function bubbleSort(arr) {
  var len = arr.length;
  var temp
  for (var i = 0; i <= len - 1; i++) {
    var flag = true;
    for (var j = 0; j <= len - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1]
        arr[j + 1] = temp;
        flag = false;
      }
    }
    if (flag) {
      break;
    }
  }
  console.log(arr);

  return arr;
}

export default bubbleSort

// bubbleSort([34253, 543, 33, 12, 5, 6543, 1234, 33, 211, 4, 66, 1])
