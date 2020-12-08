// 数组去重的方式有很多
// 我们可以使用 Set 去重、filter 过滤, reducer 等
// 但是都产生了新数组
// 下面研究一种没有产生新数组的写法

let arr = [1, 3, 55, 5, 6, 7, 4, 3, 56, 54, 2, 77, 2, 4, 644, 72, 1, 2, 55, 23]

/**
 * 数组去重
 * @param {*} arr
 */
const removeDuplicates_1 = function (nums) {
  return [...new Set(nums)];
}

console.log(removeDuplicates_1(arr))


function unique(arr) {
  return arr.filter((element, index, array) => array.indexOf(element) === index)
}

// 测试
var arr_1 = [1, 2, 2, 3]
unique(arr_1); // [1, 2, 3]

/**
 * 原数组去重
 * @param {*} arr
 * @description 从末尾开始，找到 indexOf 不为本身的数字，替换为上一个不重叠的数据，裁剪数组（个数为重叠个数）
 */
const removeDuplicates = (arr) => {
  var len = arr.length - 1;
  for (let i = len; i >= 0; i--) {
    if (arr.indexOf(arr[i]) != i) {
      arr[i] = arr[len--]
    }
  }
  arr.splice(len + 1)
  console.log(arr)
  return arr;
}


// let arr = [1, 2, 3, 1, 3]
removeDuplicates(arr)
