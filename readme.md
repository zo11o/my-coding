## 前端手写代码合集

主要介绍一下前端中高级需要了解的前端手写代码合集, 并且会尽力编写测试用例，如果大家有兴趣可以一起提供测试用例和编码。让我们一同进步

### 手写代码

#### Javascript

##### 基础

1. * [x] call - [call.js](src/js/base/call.js)
2. * [x] apply - [apply.js](src/js/base/apply.js)
3. * [x] bind - [bind.js](src/js/base/bind.js)
4. * [x] new - [new.js](src/js/base/new.js)
5. * [x] debounce - [debounce.js](src/js/base/debounce.js)
6. * [x] throttle - [throttle.js](src/js/base/throttle.js)
7. * [ ] jsonp
8. * [x] Promise （符合 Promise / A+ 规范） - [myPromise.js](src/js/es6/myPromise.ts)
9. * [ ] await / async
10. * [ ] XMLHttpRequest
11. * [x] sleep - [sleep.js](src/js/es6/sleep.js)
12. * [x] aop 面向切面编程 - [aop.js](src/js/base/aop.js)
13. * [ ] bigNumber
14. * [ ] 深拷贝
15. * [ ] generator
16. * [ ] 添加遍历器
17. * [ ] 函数  currying (科里化) && unCurrying
18. * [ ] 原生 Dom 操作
19. * [ ] 手写发布订阅（EventBus）
20. * [ ] vue 双向绑定原理（高阶）

##### 项目优化

1. 大文件上传
2. 长列表优化
3. 懒加载实现

##### 源码实现

1. react createElement

#### CSS 基础

1. * [ ] 垂直居中
2. * [ ] 瀑布流
3. * [ ] 圣杯布局

#### 算法

##### 排序算法

1. * [ ] 冒泡排序
2. * [ ] 选择排序
3. * [ ] 插入排序
4. * [ ] 希尔排序
5. * [ ] 归并排序
6. * [x] 快速排序 - [quickSort.js](src/algorithm/sort/quickSort.js)
7. * [ ] 堆排序
8. * [ ] 计数排序

##### 动态规划

1. * [ ] 斐波那契
2. * [ ] 爬楼梯
3. * [ ] 01背包

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

##### BFS

广度优先算法，主要使用的构建一个 Queue 再遍历 Queue

##### DFS

深度优先算法，主要是递归

##### 数据结构

1. 栈 Stack
2. 数组 Array
3. 队列 Queue
4. 哈希表 HashMap
5. 链表 NodeList
   1. 单链表
   2. 双向链表
6. 树 Tree
   1. 二叉搜索树
      1. 二叉搜索树的插入
      2. 二叉搜索树的查找
      3. 二叉搜索树的删除
      4. 第 K 大的元素
   2. 平衡二叉树
   3. B 树 （前端不常考）
   4. B+ 树 （前端不常考）
   5. 红黑树 （前端不常考）
   6. AVL树 （前端不常考）
7. 堆（优先队列） Heap
   1. 优先队列
   2. 大顶堆、小顶堆
   3. 堆的构建
   4. 堆化
   5. 上浮
   6. 下沉
   7. 堆排序
   8. 最 K 大值的
8. 图 Graph
   1. 有向图
   2. 无向图
   3. 边
9. 并查集 Union-Find

### 项目要求

* 每个实现都需要通过测试用例

[项目链接：https://github.com/zo11o/my-coding](https://github.com/zo11o/my-coding)