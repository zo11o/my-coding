// 实现一个笔试题遇到的 从 0 到 100 的累加

var acc = new Array(100).fill(0).map((o, i) => i + 1).reduce((acc, cur) => acc + cur);
