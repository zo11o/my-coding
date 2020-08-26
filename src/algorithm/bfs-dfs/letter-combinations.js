// 17. 电话号码的字母组合
// leetcode: https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/
/*
题目要求
给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
*/
// 测试用例
// 输入：'23'
// 输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]

// 输入：'4524'
// 输入：["gjag","gjah","gjai","gjbg","gjbh","gjbi","gjcg","gjch","gjci","gkag","gkah","gkai","gkbg","gkbh","gkbi","gkcg","gkch","gkci","glag","glah","glai","glbg","glbh","glbi","glcg","glch","glci","hjag","hjah","hjai","hjbg","hjbh","hjbi","hjcg","hjch","hjci","hkag","hkah","hkai","hkbg","hkbh","hkbi","hkcg","hkch","hkci","hlag","hlah","hlai","hlbg","hlbh","hlbi","hlcg","hlch","hlci","ijag","ijah","ijai","ijbg","ijbh","ijbi","ijcg","ijch","ijci","ikag","ikah","ikai","ikbg","ikbh","ikbi","ikcg","ikch","ikci","ilag","ilah","ilai","ilbg","ilbh","ilbi","ilcg","ilch","ilci"]
/**
 *
 * @param {*} curStr 当前字符串
 * @param {*} i digits 的字符串索引
 */
// function generate(curStr, i) {
//   // base case
//   if (i > digits.length - 1) {
//     res.push(curStr);
//     return
//   }

//   var letters = map[digits[i]];

//   for (var l of letters) {
//     generate(curStr + l, i + 1)
//   }

// }

// /**
//  * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合
//  * @param {Array<number>} digits
//  */
// function letterCombinations(digits) {
//   if (digits.length == 0) return [];
//   var res = [];
//   var map = {
//     '2': 'abc',
//     '3': 'def',
//     '4': 'ghi',
//     '5': 'jkl',
//     '6': 'mno',
//     '7': 'pqrs',
//     '8': 'tuv',
//     '9': 'wxyz'
//   };

//   generate('', 0);
//   return res;
// }

// export default letterCombinations

// var result = letterCombinations('4524')
// console.log(result);



const letterCombinations = (digits) => {
  if (digits.length == 0) return [];
  const res = [];
  const map = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz'
  };

  const generate = (curStr, i) =>{
    // base case
    if (i > digits.length - 1) {
      res.push(curStr);
      return
    }

    let letters = map[digits[i]];

    for (var l of letters) {
      generate(curStr + l, i + 1)
    }
  }

  generate('', 0);

  return res;
}

export default letterCombinations
