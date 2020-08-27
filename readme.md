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
8. * [x] aop 面向切面编程 - [aop.js](src/js/base/aop.js)
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

##### 位运算

1. * [x] 缺失的数字 - [lru/index.js](src/algorithm/bit/missing-number.js)

##### 双指针问题

滑动窗口

1. * [ ] 字符串子串问题

链表操作

1. * [ ] 链表成环
2. * [ ] 链表倒数第 K 个

##### 查找

1. * [x] 二分法查找 - [binarySearch.js](src/algorithm/search/binarySearch.js)
2. * [x] twoSum 问题 - [twoSum.js](src/algorithm/search/twoSum.js)

##### 动态规划

1. * [ ] 斐波那契
2. * [ ] 爬楼梯
3. * [x] [leetcode 120. 三角形最小路径和](https://leetcode-cn.com/problems/triangle/) - [triangle.js](src/algorithm/dp/triangle.js)
4. * [ ] 01背包
5. * [x] [leetcode 647. 回文子串](https://leetcode-cn.com/problems/palindromic-substrings/) - [palindromic-substrings.js](src/algorithm/dp/palindromic-substrings)

##### 贪婪

1. 最长回文串

##### 回溯

回溯模板

1. 路径
2. 选择列表
3. 结束条件

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

##### BFS && DFS

BFS: 广度优先算法，主要使用的构建一个 Queue 再遍历 Queue  
DFS: 深度优先算法，主要是递归  
一般来说：能用 BFS 解决的遍历都可以用 DFS 解决

1. * [x] 电话号码的字母组合 - [letter-combinations.js](src/algorithm/bfs-dfs/letter-combinations.js)

##### 数据结构

1. 栈 Stack
2. 数组 Array
3. 队列 Queue
4. 哈希表 HashMap
5. 链表 NodeList
    1. * [x] 单链表 - [list-node.js](src/algorithm/data-structure/list-node/list-node.ts)
    2. * [ ] 双向链表
    3. * [ ] 循环链表
   （跳表）
6. 树 Tree
   1. * [x] 二叉树的序列化与反序列化 - [serialize.js](src/algorithm/data-structure/serialize.ts)
   2. * [x] 二叉搜索树 - [bst.js](src/algorithm/data-structure/bst.ts)
      1. 二叉搜索树的插入
      2. 二叉搜索树的查找
      3. 二叉搜索树的删除
      4. 第 K 大的元素
   3. 平衡二叉树
   4. B 树 （前端不常考）
   5. B+ 树 （前端不常考）
   6. 红黑树 （前端不常考）
   7. AVL树 （前端不常考）
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
9. 并查集 Union-Find

#### 设计模式

首先说起软件设计模式，就必须说到 SOLID 设计原则

SOLID 设计原则

|  头字母   | 缩写  | 中文 | 阐述 |
|  ----  | ----  | ---- | ---- |
| S  | SRP | 单一职责原则 | 让一个类只做一种类型责任，当这个类需要承当其他类型的责任的时候，就需要分解这个类 |
| O  | OCP | 开放封闭原则 | 对扩展是开放的，而对修改是封闭的 |
| L  | LSP | 里氏替换原则 | 当一个子类的实例应该能够替换任何其超类的实例时，它们之间才具有is-A关系 |
| I  | ISP | 接口分离原则 | 高层模块不应该依赖于低层模块，二者都应该依赖于抽象；抽象不应该依赖于细节，细节应该依赖于抽象 |
| D  | DIP | 依赖倒置原则 | 使用多个专门的接口比使用单一的总接口总要好 |

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

|  元字符   | 描述 |
| ---- | ---- |
| \ | 转义符 |
| ^ | 匹配开头 |
| $ | 匹配结尾 |
| * | 匹配任意次（0 个或者多个） |
| + | 匹配 1 次或者多次 |
| ? | 匹配 0 次或者多次（有或者没有） |
| . | 匹配所有除"\n" 和 "\r" 的任何单个字符 |
| {n} | 匹配限定 n 次 |
| {n,} | 匹配至少 n 次 |
| {n, m} | 匹配限定 n 到 m 次 |
| x\|y | 匹配 x 或 y |
| [xyz] | 字符集合，匹配集合中任意一个 |
| [a-z] | 字符范围 |
| [^a-z] | 取反集合 |
| \s | 匹配任何不可见字符 |
| \S | 匹配任何可见字符 |
| \d | 匹配一个数字字符 |
| \D | 匹配一个非数字字符 |
| () | 组 |
| \| | or 运算 |
| (?=pattern) | 前置匹配 |
| (?!pattern) | 前置不匹配 |
| (?<=pattern) | 后置匹配 |
| (?<!pattern) | 后置不匹配 |

### 面试题

#### 网络：HTTP & TCP & HTTPS & Websocket

1. * [ ] TCP: 拥塞窗口，流量控制，快速重传，超时重传
2. * [ ] HTTP
   1. 预请求
   2. HTTP1.1
   3. HTTP2.0

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