// leetCode: 389 找不同

// 题目：
// 给定两个字符串 s 和 t，它们只包含小写字母。
// 字符串 t 由字符串 s 随机重排，然后在随机位置添加一个字母。
// 请找出在 t 中被添加的字母。

// 示例 1：
// 输入：s = "abcd", t = "abcde"
// 输出："e"
// 解释：'e' 是那个被添加的字母。

// 示例 2：
// 输入：s = "", t = "y"
// 输出："y"

// ！！！重点，字符异或运算规则特点：
// 一个数和0做XOR运算等于本身：a⊕0 = a
// 一个数和其本身做XOR运算等于 0：a⊕a = 0
// XOR 运算满足交换律和结合律：a⊕b⊕a = (a⊕a)⊕b = 0⊕b = b

// 所以本文中，s 和 t 的字符不间断的做异或运算，到最后留下的就是多出来的

var findTheDifference = function(s, t) {
  var ans = t.charCodeAt([t.length - 1])

  for (let i =  0; i< s.length; i++) {
    ans ^= s.charCodeAt(i);
    ans ^= t.charCodeAt(i);
  }

  return String.fromCharCode(ans);
}

