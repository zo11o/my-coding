# 数据结构：堆

## 堆的属性

1. 分类： 最大堆，最小堆
   1. 最大堆：父结点的键值总是大于或等于任何一个子节点的键值
   2. 最小堆：父结点的键值总是小于或等于任何一个子节点的键值。
2. 完全二叉树
3. 堆用数组实现，相当于对二叉树做层序遍历
4. 二叉树堆的底层是优先级队列，也就是说，本质是优先级队列

## 堆的操作

1. 向上移动 shiftUp
2. 向下移动 shiftDown
3. 插入 insert
4. 删除 remove
5. 堆的创建 create 从数组中创建一个 `大顶堆` 或者 `小顶堆`

## 堆的好处

1. 最大值或者最小值的搜索

## 来自数组的树

## 堆排序