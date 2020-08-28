"use strict";
/**
 * 数据结构： 堆
 */
// 枚举类：定义比对返回值
var Compare;
(function (Compare) {
    Compare[Compare["LESS_THAN"] = -1] = "LESS_THAN";
    Compare[Compare["BIGGER_THAN"] = 1] = "BIGGER_THAN";
    Compare[Compare["EQUALS"] = 0] = "EQUALS";
})(Compare || (Compare = {}));
// 默认校验函数: 判断参数a与参数b是否相等
function defaultEquals(a, b) {
    return a === b;
}
// 默认的字符串转换函数: 用于将其他类型的数据转换为字符串
function defaultToString(item) {
    if (item === null) {
        return "null";
    }
    else if (item === undefined) {
        return "undefined";
    }
    else if (typeof item === "string" || item instanceof String) {
        return "" + item;
    }
    return item.toString();
}
// 默认的比对函数: 比对参数a和参数b的大小返回其相应的枚举值
function defaultCompare(a, b) {
    if (a === b) {
        return Compare.EQUALS;
    }
    else if (a > b) {
        return Compare.BIGGER_THAN;
    }
    else {
        return Compare.LESS_THAN;
    }
}
// 反转比对函数: 比对参数b和参数a的大小返回其对应的枚举值
function reverseCompare(compareFn) {
    return function (a, b) { return compareFn(b, a); };
}
// 默认比对函数
function defaultDiff(a, b) {
    return Number(a) - Number(b);
}
// 大于等于
function biggerEquals(a, b, compareFn) {
    var comp = compareFn(a, b);
    return comp === Compare.BIGGER_THAN || comp === Compare.EQUALS;
}
// 小于等于
function lesserEquals(a, b, compareFn) {
    var comp = compareFn(a, b);
    return comp === Compare.LESS_THAN || comp === Compare.EQUALS;
}
var MinHeap = /** @class */ (function () {
    function MinHeap(compareFn) {
        if (compareFn === void 0) { compareFn = defaultCompare; }
        this.compareFn = compareFn;
        this.heap = [];
    }
    // 获取左子节点位置
    MinHeap.prototype.getLeftIndex = function (index) {
        return 2 * index + 1;
    };
    // 获取右子节点位置
    MinHeap.prototype.getRightIndex = function (index) {
        return 2 * index + 2;
    };
    MinHeap.prototype.getParentIndex = function (index) {
        // if (index == 0) {
        //   return undefined;
        // }
        return (index - 1) >> 1;
    };
    /**
     * 插入函数
     * @param value
     */
    MinHeap.prototype.insert = function (value) {
        if (value != null) {
            // 向对的叶节点添加元素，即数组尾部
            this.heap.push(value);
            // 进行上移操作，即上移节点到指定位置
            this.shiftUp(this.heap.length - 1);
            return true;
        }
        return false;
    };
    /**
     * 上浮
     * @param index
     */
    MinHeap.prototype.shiftUp = function (index) {
        // 获取父节点位置
        var parent = this.getParentIndex(index);
        // 插入位置必须大于0， 且它的父节点大于其本身就执行循环体的操作
        while (index > 0 &&
            this.compareFn(this.heap[parent], this.heap[index]) === Compare.BIGGER_THAN) {
            this.swap(this.heap, parent, index);
            index = parent;
            parent = this.getParentIndex(index);
        }
    };
    /**
     * 换位
     * @param array
     * @param i
     * @param j
     */
    MinHeap.prototype.swap = function (array, i, j) {
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    };
    /**
     * 找出最小值
     */
    MinHeap.prototype.findMinimum = function () {
        //  返回数组的最小元素
        return this.isEmpty() ? undefined : this.heap[0];
    };
    /**
     * 是否为空
     */
    MinHeap.prototype.isEmpty = function () {
        return this.size() === 0;
    };
    /**
     * 长度
     */
    MinHeap.prototype.size = function () {
        return this.heap.length;
    };
    /**
     * 移除最小节点
     */
    MinHeap.prototype.extract = function () {
        if (this.isEmpty()) {
            return undefined;
        }
        if (this.size() === 1) {
            return this.heap.shift();
        }
        var removeValue = this.heap.shift();
        // 执行下移操作
        this.shiftDown(0);
        return removeValue;
    };
    /**
     * 下层
     * @param index
     */
    MinHeap.prototype.shiftDown = function (index) {
        // 保存当前插入值得位置
        var element = index;
        var left = this.getLeftIndex(index);
        var right = this.getRightIndex(index);
        var size = this.size();
        if (left < size && this.compareFn(this.heap[element], this.heap[left]) === Compare.BIGGER_THAN) {
            element = left;
        }
        if (right < size && this.compareFn(this.heap[element], this.heap[right]) === Compare.BIGGER_THAN) {
            element = right;
        }
        if (index !== element) {
            this.swap(this.heap, index, element);
            this.shiftDown(element);
        }
    };
    MinHeap.prototype.getIsArray = function () {
        return this.heap;
    };
    return MinHeap;
}());
var minHeap = new MinHeap();
minHeap.insert(13);
minHeap.insert(42);
minHeap.insert(3);
minHeap.insert(153);
console.log(minHeap.getIsArray());
console.log(minHeap.findMinimum());
