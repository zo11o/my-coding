var $start = document.querySelector('#start');
var $end = document.querySelector('#end');
var $countBefore = document.querySelector('#count_before');
var $count = document.querySelector('#count');
$start.addEventListener('input', function (e) {
  var startValue = $start.value || 0
  var endValue = $end.value || 0
  var count = parseFloat(startValue * endValue).toFixed(2);
  $countBefore.innerHTML = count
  var formatCount =  formatNumber(count)
  $count.innerHTML = formatCount
})

$end.addEventListener('input', function (e) {
  var startValue = $start.value || 0
  var endValue = $end.value || 0
  var count = parseFloat(startValue * endValue).toFixed(2);
  $countBefore.innerHTML = count
  var formatCount =  formatNumber(count)
  $count.innerHTML = formatCount
})


function formatNumber (num) {
  var regex = /(^-?)(\d+)(\.\d{1,2})?$/
  var matches = regex.exec(num)
  // console.log(matches)
  if (matches == null) {
    return '数据格式错误';
  }

  // 整数部分
  var matches_int = matches[2];

  var resultArr = []
  if (matches_int.length) {
    var n = matches_int.length - 1;
    var c = 0;
    while (n >= 0) {
      if (c == 3) {
        resultArr.unshift(',')
        c = 0;
      }
      resultArr.unshift(matches_int[n])
      c ++
      n --
    }
  }
  var formatCount = resultArr.join('')
  if (matches[1]) {
    formatCount = matches[1] + formatCount
  }

  if (matches[3]) {
    formatCount =  formatCount + matches[3]
  }

  return formatCount
}
