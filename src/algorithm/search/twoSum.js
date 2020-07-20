function twoSum () {
  // 双指针法
  var n = numbers.length
  var lo = 0; hi = n - 1;
  var comp
  while (lo <= hi) {
      comp = target - (numbers[lo] + numbers[hi]);
      if (comp  == 0) {
          return[lo + 1, hi + 1];
      } else if (comp > 0) {
          lo = lo + 1;
      } else {
          hi = hi - 1
      }
  }
  return [-1, -1]
}

export default twoSum
