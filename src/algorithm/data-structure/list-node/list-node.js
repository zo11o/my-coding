"use strict";
// 链表是数据结构中较为基础，也是极为重要的一种数据结构
// 链表在插入的时候时间复杂度 是 O(1), 查找的时候时间复杂度是 O(n)
/*
本文我们用 ts 实现链表和一些链表的基础操作，其中包括
1. 实现链表节点 ListNode
2. 链表 LinkedList
3. 插入
4. 删除
5. 查找
6. 遍历
7. 末尾追加
8. 表头追加

 */
/**
 * 单链表节点
 */
var ListNode = /** @class */ (function () {
    function ListNode(val) {
        this.val = val;
        this.next = null;
    }
    return ListNode;
}());
var LinkedList = /** @class */ (function () {
    function LinkedList(val) {
        this.val = val === undefined ? 'head' : val;
        this.head = new ListNode(val);
    }
    /**
     * 在指定值后面插入节点, 如果找不到值，就最佳在后面
     * @param val
     */
    LinkedList.prototype.insert = function (newVal, val) {
        var node = this.findByVal(val);
        if (node == -1) {
            this.push(newVal);
        }
        else {
            var newNode = new ListNode(newVal);
            newNode.next = node.next;
            node.next = newNode;
            // node.val = new ListNode(newVal);
        }
    };
    /**
     * 获取通过节点值获取节点
     * @param val
     */
    LinkedList.prototype.findByVal = function (val) {
        var current = this.head;
        while (current) {
            if (current.val == val) {
                return current;
            }
            current = current.next;
        }
        return -1;
    };
    LinkedList.prototype.findPrevByVal = function (val) {
        var node = this.head;
        while (node && node.next != null) {
            if (node.next.val === val) {
                return node;
            }
            node = node.next;
        }
        return -1;
    };
    /**
     * 通过索引获取
     * @param index
     */
    LinkedList.prototype.findByIndex = function (index) {
        var pos = -1;
        var node = this.head;
        while (node != null) {
            pos++;
            if (pos === index) {
                return node;
            }
            node = node.next;
        }
        return -1;
    };
    /**
     * 删除指定节点
     * @param val
     */
    LinkedList.prototype.remove = function (val) {
        var node = this.findByVal(val);
        if (node === -1) {
            return;
        }
        else {
            var prevNode = this.findPrevByVal(val);
            if (prevNode !== -1) {
                typeof prevNode != "number" && (prevNode.next = node.next);
            }
        }
    };
    /**
     * 遍历
     */
    LinkedList.prototype.display = function () {
        var res = new Array();
        var current = this.head;
        while (current !== null) {
            res.push(current.val);
            current = current.next;
        }
        console.log('链表数组', res);
        return res;
    };
    /**
     * 在链表末尾插入一个节点
     */
    LinkedList.prototype.push = function (nodeVal) {
        var current = this.head;
        var node = new ListNode(nodeVal);
        while (current && current.next !== null) {
            current = current.next;
        }
        current && (current.next = node);
    };
    return LinkedList;
}());
