/**
 * 978. 最长湍流子数组
 * @param {*} arr
 */
var maxTurbulenceSize = function (arr) {
  var n = arr.length;
  if (n == 1) return 1;
  let res = 0;
  var dp = new Array(n);
  for (let i = 0; i < n; i++) {
    if (dp[i] == null) {
      dp[i] = []
    }
    dp[i][0] = 1;
    dp[i][1] = 1;
  }

  for (let i = 1; i < n; i++) {
    if (arr[i] > arr[i - 1]) {
      dp[i][1] = dp[i - 1][0] + 1
    }
    if (arr[i] < arr[i - 1]) {
      dp[i][0] = dp[i - 1][1] + 1
    }
    res = Math.max(res, dp[i][0], dp[i][1])
  }
  console.log(dp)

  return res;
}

/**
 *
 * @param {Array<number>} A
 */
var maxTurbulenceSize_1 = function (A) {
  var inc = 1,
    dec = 1,
    res = 1;

  for (let i = 1; i < A.length; i++) {
    if (A[i] < A[i - 1]) {
      dec = inc + 1
      inc = 1
    } else if (A[i] > A[i - 1]) {
      inc = dec + 1
      dec = 1
    } else {
      inc = 1
      dec = 1
    }
    res = Math.max(res, dec, inc)
  }
  return res
}

var arr = [9, 4, 2, 10, 7, 8, 8, 1, 9]

// const res = maxTurbulenceSize(arr);
const res = maxTurbulenceSize_1(arr);
console.log(res);
