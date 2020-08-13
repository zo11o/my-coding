// 每种语言都会数字类型的最大安全值

var bigNum = {
  // 加法
  add: function (num1, num2) {
    // 判断是否是字符串类型
    if (this.checkNum(num1) && this.checkNum(num2)) {
      var res = '',
        loc = 0;

      var a = num1.split('');
      var b = num2.split('');

      while (a.length || b.length || loc) {
        // ~~它代表双非按位取反运算符，如果你想使用比Math.floor()更快的方法，那就是它了。
        // 需要注意，对于正数，它向下取整；
        // 对于负数，向上取整；
        // 非数字取值为0
        loc += ~~a.pop() + ~~b.pop();
        res = (loc % 10) + res;
        loc = loc > 9
      }

      return res.replace(/^0+/, '');
    } else {
      throw new Error('big number type error');
    }
  },

  // 乘法
  // leetcode: https://leetcode-cn.com/problems/multiply-strings/
  multi: function (num1, num2) {
    if (this.checkNum(num1) && this.checkNum(num2)) {
      let len1 = num1.length,
        len2 = num2.length;
      let pos = [];

      //j放外面，先固定被乘数的一位，分别去乘乘数的每一位，更符合竖式演算法
      for (let j = len2 - 1; j >= 0; j--) {
        for (let i = len1 - 1; i >= 0; i--) {
          //两个个位数相乘，最多产生两位数，index1代表十位，index2代表个位
          let index1 = i + j,
            index2 = i + j + 1;
          //两个个位数乘积加上当前位置个位已累积的数字，会产生进位，比如08 + 7 = 15，产生了进位1
          let mul = num1[i] * num2[j] + (pos[index2] || 0);
          //mul包含新计算的十位，加上原有的十位就是最新的十位
          pos[index1] = Math.floor(mul / 10) + (pos[index1] || 0);
          //mul的个位就是最新的个位
          pos[index2] = mul % 10;
        }
      }
      //去掉前置0
      let result = pos.join("").replace(/^0+/, "");

      return result || '0';

    } else {
      throw new Error('big number type error');
    }
  },

  checkNum: num => typeof num == 'string' && !isNaN(Number(num))
}


try {
  var bg = bigNum.add('3425352354', '12345678901234')
  var bgm = bigNum.multi('12', '12')
  console.log(bg)
  console.log(bgm)
} catch (e) {
  console.log(e)
}
