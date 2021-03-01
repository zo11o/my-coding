## 前端手写代码合集

主要介绍一下前端中高级需要了解的前端手写代码合集, 并且会尽力编写测试用例，如果大家有兴趣可以一起提供测试用例和编码。让我们一同进步

每个目录下有对应的 `index.html` 文件可用于浏览器调试

### 手写代码

#### Javascript

##### 基础

1. * [x] new - [new.js](src/js/base/new.js)
2. * [x] call - [call.js](src/js/base/call.js)
3. * [x] apply - [apply.js](src/js/base/apply.js)
4. * [x] bind - [bind.js](src/js/base/bind.js)
5. * [x] 函数  currying (科里化) && unCurrying - [curry.js](src/js/base/curry.js)
6. * [x] debounce - [debounce.js](src/js/base/debounce.js)
7. * [x] throttle - [throttle.js](src/js/base/throttle.js)
8. * [x] aop 面向切面编程 - [aop.js]( src/js/base/aop.js)
9. * [x] XMLHttpRequest - [ajax.js](src/js/base/ajax.js)
10. * [x] Jsonp 跨域请求 - [jsonp.js](src/js/base/jsonp.js)
11. * [x] cookie 读取、写入和删除 - [cookie.js](src/js/base/cookie.js)
12. * [x] sleep - [sleep.js](src/js/es6/sleep.js)
13. * [x] Dom事件、事件委托/代理 - [dom.js](src/js/base/dom.js)
14. * [x] bigNumber - [bigNum.js](src/js/es6/bigNum.js)
15. * [x] 深拷贝 - [deepClone.js](src/js/base/deepClone.js)
16. * [x] Promise(符合 Promise / A+ 规范) - [myPromise.ts](src/js/es6/myPromise.ts)
17. * [ ] generator
18. * [x] await / async - [async.ts](src/js/es6/async.js)
19. * [ ] 添加遍历器
20. * [x] 从 0 到 100 的累加 - [accumulator.js](src/js/base/accumulator.js)
21. * [x] 手写发布订阅（EventBus）- [eventBus.ts](src/js/base/eventBus.ts)
22. * [x] 获取用户代理 - [userAgent.js](src/js/base/userAgent.js)
23. * [x] 数字千位分隔符 - [separate-number/index.js](src/js/base/separate-number/index.js)
24. * [x] possMessage 通讯 - [possMessage/index.js](src/js/base/possMessage/index.js)
25. * [x] Object.is 判断两个变量相等 - [is.js](src/js/base/is.js)
26. * [x] 不产生新数组去重 - [removeDuplicates.js](src/js/base/removeDuplicates.js)

##### 项目优化

1. * [ ] 大文件上传 - [large-upload/index.js](src/js/optimize/large-upload/index.js)
2. * [ ] 长列表优化 - [long-list/index.js](src/js/optimize/long-list/index.js)
3. * [x] 图片懒加载实现 - [lazy-load/index.js](src/js/optimize/lazy-load/index.js)
4. * [x] JS 图片压缩 - [compress/index.js](src/js/optimize/compress/index.js)
5. * [ ] 楼栋导航

##### 源码实现

1. * [ ] react createElement
2. * [ ] react hooks
3. * [ ] Koa2 简易实现（进阶）
4. * [ ] vue 双向绑定原理（进阶）
5. * [x] axios 手写实现 - [lazy-load/index.js](src/js/lib/axios/index.html)

#### CSS 基础

1. * [ ] 垂直居中
2. * [ ] 瀑布流
3. * [ ] 圣杯布局 - [grail/index.html](grail/index.html)
4. * [x] 左中右三列布局，左右固定 220px， 中间自适应且先加载 - [three-cols/index.html](three-cols/index.html)

#### 算法

##### 排序算法

1. * [x] 冒泡排序 - [bubbleSort.js](src/algorithm/sort/bubbleSort.js)
2. * [x] 选择排序 - [selectSort.js](src/algorithm/sort/selectSort.js)
3. * [x] 插入排序 - [insertSort.js](src/algorithm/sort/insertSort.js)
4. * [x] 希尔排序 - [shellSort.js](src/algorithm/sort/shellSort.js)
5. * [x] 归并排序 - [mergeSort.js](src/algorithm/sort/mergeSort.js)
6. * [x] 快速排序 - [quickSort.js](src/algorithm/sort/quickSort.js)
7. * [x] 堆排序 - [heapSort.js](src/algorithm/sort/heapSort.js)
8. * [ ] 计数排序
9. * [ ] 基数排序
10. * [ ] 桶排序
11. * [ ] 拓扑排序

##### 常考

1. * [x] 计算素数 - [primes.js](src/algorithm/base/primes.js)

##### 缓存问题

LRU （Least Recently Used）

> LRU 算法就是一种缓存淘汰策略, LRU 的全称是 Least Recently Used，也就是说我们认为最近使用过的数据应该是是「有用的」，很久都没用过的数据应该是无用的，内存满了就优先删那些很久没用过的数据

1. * [x] LRU 缓存数据结构设计 - [lru/index.js](src/algorithm/lru/index.js)

LFU 缓存

> LFU

##### 买股票的最佳时机

1. * [ ] leetcode 121. 买卖股票的最佳时机

##### 位运算

**相关题目**

1. * [x] 缺失的数字 - [bit/missing-number.js](src/algorithm/bit/missing-number.js)
2. * [x] 找不同 - [find-the-difference.js](src/algorithm/bit/find-the-difference.js)

**位运算实用总结**

| 功能 | 示例  | 位运算 |
|----- | ---------- | ---- |
|去掉最后一位 |         (101101 -> 10110)          |   x >> 1 |
|在最后加一个0 |         (101101 -> 1011010)       |   x << 1 |
|在最后加一个1 |         (101101 -> 1011011)       |   x << 1 + 1 |
|把最后一位变成1 |       (101100 -> 101101)        |   x | 1 |
|把最后一位变成0 |       (101101 -> 101100)        |   x | 1 - 1 |
|最后一位取反 |          (101101 -> 101100)        |   x ^ 1 |
|把右数第k位变成1 |      (101001 -> 101101,k=3)    |   x | (1 << (k - 1)) |
|把右数第k位变成0 |      (101101 -> 101001,k=3)    |   x & ~ (1 << (k - 1)) |
|右数第k位取反 |         (101001 -> 101101,k=3)    |   x ^ (1 << (k - 1)) |
|取末三位 |              (1101101 -> 101)          |   x & 7 |
|取末k位 |               (1101101 -> 1101,k = 5)   |   x & ((1 << k)-1) |
|取右数第k位 |           (1101101 -> 1,k = 4)      |   x >> (k-1) & 1 |
|把末k位变成1 |          (101001 -> 101111,k = 4)  |   x | (1 << k-1) |
|末k位取反 |             (101001 -> 100110,k = 4)  |   x ^ (1 << k-1) |
|把右边连续的1变成0 |    (100101111 -> 100100000)  |   x & (x + 1) |
|把右起第一个0变成1 |    (100101111 -> 100111111)  |   x | (x + 1) |
|把右边连续的0变成1 |    (11011000 -> 11011111)    |   x | (x - 1) |
|取右边连续的1 |         (100101111 -> 1111)       |   (x ^ (x + 1)) >> 1 |
|去掉右起第一个1的左边 | (100101000 -> 1000)       |   x & (x ^ (x - 1)) |
|判断奇数 |              (x & 1) == 1             |                     |
|判断偶数 |              (x & 1) == 0              |                    |

##### 单调栈
1. * [ ] leetcode 84. 柱状图中最大的矩形

##### 双指针问题

滑动窗口

1. * [ ] 字符串子串问题

链表操作

1. * [ ] 链表成环
2. * [ ] 链表倒数第 K 个
3. * [ ] 链表找中点

##### 查找

1. * [x] 二分法查找 - [binarySearch.js](src/algorithm/search/binarySearch.js)
2. * [x] twoSum 问题 - [twoSum.js](src/algorithm/search/twoSum.js)

##### 动态规划

1. * [ ] 斐波那契
2. * [ ] 爬楼梯
3. * [x] [leetcode 53. 最大子序列](https://leetcode-cn.com/problems/maximum-subarray/) - [triangle.js](src/algorithm/dp/maximum-subarray.js)
4. * [x] [leetcode 120. 三角形最小路径和](https://leetcode-cn.com/problems/triangle/) - [triangle.js](src/algorithm/dp/triangle.js)
5. * [ ] 01背包
6. * [x] [leetcode 647. 回文子串](https://leetcode-cn.com/problems/palindromic-substrings/) - [palindromic-substrings.js](src/algorithm/dp/palindromic-substrings)
7. * [x] [leetcode 486. 预测赢家](https://leetcode-cn.com/problems/predict-the-winner/)
8. * [x] [leetcode 300. 最大子序列](https://leetcode-cn.com/problems/longest-increasing-subsequence/) - [longest-increasing-subsequence.js](src/algorithm/dp/longest-increasing-subsequence.js)
9. * [x] [leetcode 978. 最长湍流子数组](https://leetcode-cn.com/problems/longest-turbulent-subarray) -[longest-turbulent-subarray.js](src/algorithm/dp/longest-turbulent-subarray.js)

##### 贪心

1. 最长回文串
2. * [x] [leetcode 330. 按要求补齐数组](https://leetcode-cn.com/problems/patching-array/) -[longest-turbulent-subarray.js](src/algorithm/greedy/patching-array.js)

##### 回溯

> 回溯模板
>
> 1. 路径
> 2. 选择列表
> 3. 结束条件

```js
result = []
def backtrack(路径, 选择列表):
    if 满足结束条件:
        result.add(路径)
        return

    for 选择 in 选择列表:
        做选择
        backtrack(路径, 选择列表)
        撤销选择
```

1. * [x] 全排列问题(数字不重复) - [permute.js](src/algorithm/backtrack/permute.js)
2. * [x] 全排列问题(数字可重复) - [permuteUnique.js](src/algorithm/backtrack/permuteUnique.js)
3. * [ ] N皇后问题
4. * [x] 子集 - [subsets.js](src/algorithm/backtrack/subsets.js)
5. * [x] 组合 - [combine.js](src/algorithm/backtrack/combine.js)
6. * [x] 解数独 - [solveSudoku.js](src/algorithm/backtrack/solveSudoku.js)

##### BFS && DFS

BFS: 广度优先算法，主要使用的构建一个 Queue 再遍历 Queue
DFS: 深度优先算法，主要是递归  
一般来说：能用 BFS 解决的遍历都可以用 DFS 解决

1. * [x] [leetcode 538. 把二叉搜索树转换为累加树](https://leetcode-cn.com/problems/convert-bst-to-greater-tree/)  - [convert-bst-to-greater-tree](src/algorithm/bfs-dfs/convert-bst-to-greater-tree.js)
2. * [x] 电话号码的字母组合 - [letter-combinations.js](src/algorithm/bfs-dfs/letter-combinations.js)
3. * [x] 合并二叉树 - [mergeTrees.js](src/algorithm/bfs-dfs/mergeTrees.js)
4. * [x] 二叉树的锯齿形层序遍历 - [binary-tree-zigzag-level-order-traversal.js](src/algorithm/bfs-dfs/binary-tree-zigzag-level-order-traversal.js)

##### 数据结构

1. 栈 Stack
   1. * [x] 栈数据结构的实现 - [stack.ts](src/algorithm/data-structure/stack/stack.ts)
2. 数组 Array
   1. * [x] 由于 js 原生实现了数组，所以这里不冗余实现
3. 队列 Queue
   1. * [x] 队列数据结构的实现 - [queue.ts](src/algorithm/data-structure/queue/queue.ts)
4. 哈希表 HashMap
   1. * [x] js 中的对象和 ES6 中的新数据类型 set 都可以是 HashMap 数据结构
5. 链表 NodeList
    1. * [x] 单链表 - [list-node.js](src/algorithm/data-structure/list-node/list-node.ts)
    2. * [ ] 双向链表
    3. * [ ] 循环链表（跳表）
    4. 链表常规操作
       1. * [x] 找中点 - [middle.js](src/algorithm/data-structure/list-node/middle.js)
       2. * [x] 翻转链表 - [reverse.js](src/algorithm/data-structure/list-node/reverse.js)
       3. * [ ] 合并链表
6. 树 Tree
   1. * [x] 二叉树的序列化与反序列化 - [serialize.js](src/algorithm/data-structure/serialize.ts)
   2. * [x] 二叉树
      1. * [x] 二叉树的深度 - [maxDepth.js](src/algorithm/data-structure/binary-tree/maxDepth.js)
      2. * [x] 是否平衡二叉树 - [isBalanced.js](src/algorithm/data-structure/binary-tree/isBalanced.js)
      3. * [x] 对称的二叉树 - [isSymmetric.js](src/algorithm/data-structure/binary-tree/isSymmetric.js)
      4. * [x] 从中序遍历和后序遍历构建二叉树 - [buildTree.js](src/algorithm/data-structure/binary-tree/buildTree.js)
   3. * [x] 二叉搜索树 - [bst.js](src/algorithm/data-structure/binary-tree/bst.ts)
      1. 二叉搜索树的插入
      2. 二叉搜索树的查找
      3. 二叉搜索树的删除
      4. 第 K 大的元素
   4. 平衡二叉树
   5. B 树 （前端不常考）
   6. B+ 树 （前端不常考）
   7. 红黑树 （前端不常考）
   8. AVL树 （前端不常考）
7. * [x] 堆（优先队列） Heap - [heap.ts](src/algorithm/data-structure/heap/heap.ts)
   1. 优先队列
   2. 大顶堆、小顶堆
   3. 堆的构建
   4. 堆化
   5. 上浮
   6. 下沉
   7. 堆排序
   8. 最 K 大值的
8. * [x] 图 Graph - [graph.ts](src/algorithm/data-structure/graph/graph.ts)
   1. 有向图
   2. 无向图
   3. 顶点和边
   4. 邻接表表示 和 邻接矩阵表示
   5. 图的常见问题
      1. [x] 找到小镇的法官 - [find-the-town-judge.js](src/algorithm/data-structure/graph/find-the-town-judge.js)
9. * [x] 并查集UF Union-Find - [union-find/uf.ts](src/algorithm/data-structure/union-find/uf.ts)
    1. 实现 API
       1. `union()`  连接两个节点
       2. `connected()` 判断两个节点是否连通
       3. `count()` 返回图中有多少个连通分量
    2. 特性
       1. 自反性：节点 p 和 p 是连通的。
       2. 对称性：如果节点 p 和 q 连通，那么 q 和 p 也连通。
       3. 传递性: 如果节点 p 和 q 连通，q 和 r 连通，那么 p 和 r 也连通。
    3. 优化
       1. 平衡性优化: 加入重量 `size`
       2. 路径压缩: `find()` 加入 `parents[x] = parents[parents[x]]`
    4. 并查集的常见问题
       1. * [x] [leetcode 399. 除数求值](https://leetcode-cn.com/problems/evaluate-division/) - [evaluate-division](src/algorithm/data-structure/union-find/evaluate-division.js)

#### 设计模式

首先说起软件设计模式，就必须说到 SOLID 设计原则

SOLID 设计原则

| 头字母 | 缩写 | 中文         | 阐述                                                                                         |
| ------ | ---- | ------------ | -------------------------------------------------------------------------------------------- |
| S      | SRP  | 单一职责原则 | 让一个类只做一种类型责任，当这个类需要承当其他类型的责任的时候，就需要分解这个类             |
| O      | OCP  | 开放封闭原则 | 对扩展是开放的，而对修改是封闭的                                                             |
| L      | LSP  | 里氏替换原则 | 当一个子类的实例应该能够替换任何其超类的实例时，它们之间才具有is-A关系                       |
| I      | ISP  | 接口分离原则 | 高层模块不应该依赖于低层模块，二者都应该依赖于抽象；抽象不应该依赖于细节，细节应该依赖于抽象 |
| D      | DIP  | 依赖倒置原则 | 使用多个专门的接口比使用单一的总接口总要好                                                   |

23 种设计模式

> GoF 一共有 23 种设计模式  
> 按目的可分成三类： `创建型模式`、`结构型模式`、`行为型模式`  
> 按作用范围可分为两类： `类模式`、`对象模式`  
> 但是 Javascript 不是 Java 那种传统的面向对象语言，至少没有原生实现接口编程，所以在 Js 中用设计模式还是有一定的技巧的，甚至一些设计模式在 Js 中有更加特殊的写法。另外有些设计模式并不大适用于 Javascript

1. * [x] 单例模式 - [single/index.js](src/design-pattern/single/index.js)
2. * [ ] 工厂模式
3. * [ ] 原型模式
4. * [ ] 建造者模式（前端不常见）
5. * [ ] 适配器模式
6. * [ ] 代理模式
7. * [ ] 发布订阅模式
8. * [ ] 策略模式
9. * [ ] 职责链模式
10. * [ ] 命令行模式
11. * [ ] 状态模式

### 正则表达式

#### 元字符

| 元字符       | 描述                                  |
| ------------ | ------------------------------------- |
| \            | 转义符                                |
| ^            | 匹配开头                              |
| $            | 匹配结尾                              |
| *            | 匹配任意次（0 个或者多个）            |
| +            | 匹配 1 次或者多次                     |
| ?            | 匹配 0 次或者多次（有或者没有）       |
| .            | 匹配所有除"\n" 和 "\r" 的任何单个字符 |
| {n}          | 匹配限定 n 次                         |
| {n,}         | 匹配至少 n 次                         |
| {n, m}       | 匹配限定 n 到 m 次                    |
| x\|y         | 匹配 x 或 y                           |
| [xyz]        | 字符集合，匹配集合中任意一个          |
| [a-z]        | 字符范围                              |
| [^a-z]       | 取反集合                              |
| \s           | 匹配任何不可见字符                    |
| \S           | 匹配任何可见字符                      |
| \d           | 匹配一个数字字符                      |
| \D           | 匹配一个非数字字符                    |
| ()           | 组                                    |
| \|           | or 运算                               |
| (?=pattern)  | 前置匹配                              |
| (?!pattern)  | 前置不匹配                            |
| (?<=pattern) | 后置匹配                              |
| (?<!pattern) | 后置不匹配                            |
| \1           | 反模式（捕获组）                      |
#### 正则匹配优化

1. 我们需要尽可能的去让我们的正则表达式准确化，越准确的正则表达式匹配时，他的回溯情况就越少，所以它的性能就越高。
2. 在正则表达式已经没有办法再进行优化的情况下，我们可以先选取一些没有回复情况的特征值进行先置条件判断，这样的话，我们能够尽量多的去避免一些无意义的好事匹配，优化我们的性能。
3. 借助其他线程(`Web Socket`)或者服务来进行正则处理，避免用户卡顿。

### 软件开发架构方式

#### 一、插件化架构

最重要的是要解决三个问题（参考 BetterScroll）：

1. 插件管理：每个插件必须遵守并实现一些规范
2. 插件连接：通常的办法是 **注册表机制**
3. 插件通信：可以使用发布订阅方式

### 面试题

#### 网络：HTTP & TCP & HTTPS & Websocket

1. * [ ] TCP: 拥塞窗口，流量控制，快速重传，超时重传
2. * [ ] HTTP
   1. 预请求
   2. HTTP1.1
   3. HTTP2.0

#### 工程化

##### webpack

1. [webpack 自己总结笔记](note/webpack.md)
2. [你的 import 被 webpack 编译成什么了 - 李永宁](https://juejin.cn/post/6859569958742196237)
3. [深入Webpack-编写Loader - 浩麟](https://juejin.cn/post/6844903545242648589)
4. Webpack - Loader

### 项目要求


* 每个实现都需要通过测试用例
* git commit 已经使用 commitizen 包管理，我们用 git cz 提交符合 Angular 风格的校验规则 [参考](https://juejin.im/post/6844903831893966856)

### 项目使用

#### 服务端

项目有一些章节需要用到网络请求，如手写`原生 Ajax`， `跨域请求`等

本项目已经搭建了 `koa2` 服务器，可以用于网络请求
`Koa2` 服务的目录为 `/services`

本地开发开启 `Koa2` 服务:
根目录下运行:

```shell
node run nodemon
```

如果需要添加路由:

1. `/services/routes/index.js` 添加路由文件
2. `/services/controllers` 编写路由控制器

#### 运行测试用例

```shell
// 根目录下
npm run test
```

[项目链接：https://github.com/zo11o/my-coding](https://github.com/zo11o/my-coding)