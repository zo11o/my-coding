// leetcode 997. 找到小镇的法官 https://leetcode-cn.com/problems/find-the-town-judge/
// 在一个小镇里，按从 1 到 N 标记了 N 个人。传言称，这些人中有一个是小镇上的秘密法官。

// 如果小镇的法官真的存在，那么：
// 小镇的法官不相信任何人。
// 每个人（除了小镇法官外）都信任小镇的法官。
// 只有一个人同时满足属性 1 和属性 2 。
// 给定数组 trust，该数组由信任对 trust[i] = [a, b] 组成，表示标记为 a 的人信任标记为 b 的人。
// 如果小镇存在秘密法官并且可以确定他的身份，请返回该法官的标记。否则，返回 -1。

// 示例 1：
// 输入：N = 2, trust = [[1,2]]
// 输出：2

// 示例 2：
// 输入：N = 3, trust = [[1,3],[2,3]]
// 输出：3

// 示例 3：
// 输入：N = 3, trust = [[1,3],[2,3],[3,1]]
// 输出：-1

// 示例 4：
// 输入：N = 3, trust = [[1,2],[2,3]]
// 输出：-1

// 示例 5：
// 输入：N = 4, trust = [[1,3],[1,4],[2,3],[2,4],[4,3]]
// 输出：3

/**
 * 找到小镇的法官
 * @param {number} N
 * @param {number[][]} trust
 * @return {number}
 */
let findJudge = function (N, trust) {
  // 入门图解法：
  // 两个概念：
  // 入度： 以节点 a 为终点的边的个数称为 a 的入度；
  // 出度： 以节点 a 为起点的边的个数称为 a 的出度；

  // 构建图：
  // 入度
  var inDegree = new Array(N + 1).fill(0)
  // 出度
  var outDegree = new Array(N + 1).fill(0);

  for (let i = 0; i < trust.length; i++) {
    inDegree[trust[i][1]]++
    outDegree[trust[i][0]]++
  }

  for (let i = 1; i <= N; i++) {
    if (inDegree[i] == N-1 && outDegree[i] == 0) {
      return i
    }
  }

  return -1
};
