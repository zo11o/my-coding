/**
 * 数据结构： 堆
 */

// 定义比对函数的参数类型以及返回值类型
type ICompareFunction<T> = (a: T, b: T) => number;

// 比对函数
type IDiffFunction<T> = (a: T, b: T) => number;

// 枚举类：定义比对返回值
enum Compare {
  LESS_THAN = -1,
  BIGGER_THAN = 1,
  EQUALS = 0
}

// 默认校验函数: 判断参数a与参数b是否相等
function defaultEquals<T> (a: T, b: T): boolean {
  return a === b;
}

// 默认的字符串转换函数: 用于将其他类型的数据转换为字符串
function defaultToString (item: any): string {
  if (item === null) {
    return "null";
  } else if (item === undefined) {
    return "undefined";
  } else if (typeof item === "string" || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}

// 默认的比对函数: 比对参数a和参数b的大小返回其相应的枚举值
function defaultCompare<T> (a: T, b: T): number {
  if (a === b) {
    return Compare.EQUALS;
  } else if (a > b) {
    return Compare.BIGGER_THAN;
  } else {
    return Compare.LESS_THAN;
  }
}

// 反转比对函数: 比对参数b和参数a的大小返回其对应的枚举值
function reverseCompare<T> (compareFn: ICompareFunction<T>): ICompareFunction<T> {
  return (a, b) => compareFn(b, a);
}

// 默认比对函数
function defaultDiff<T> (a: T, b: T): number {
  return Number(a) - Number(b);
}

// 大于等于
function biggerEquals<T> (a: T, b: T, compareFn: ICompareFunction<T>): boolean {
  const comp = compareFn(a, b);
  return comp === Compare.BIGGER_THAN || comp === Compare.EQUALS;
}

// 小于等于
function lesserEquals<T> (a: T, b: T, compareFn: ICompareFunction<T>): boolean {
  const comp = compareFn(a, b);
  return comp === Compare.LESS_THAN || comp === Compare.EQUALS;
}

class MinHeap<T> {
  // 用数组来描述一个堆
  protected heap: T[];

  constructor(protected compareFn: ICompareFunction<T> = defaultCompare) {
    this.heap = []
  }

  // 获取左子节点位置
  protected getLeftIndex (index: number): number {
    return 2 * index + 1;
  }

  // 获取右子节点位置
  protected getRightIndex (index: number): number {
    return 2 * index + 2;
  }

  protected getParentIndex (index: number): number {
    // if (index == 0) {
    //   return undefined;
    // }

    return (index - 1) >> 1
  }

  /**
   * 插入函数
   * @param value
   */
  insert (value: T): boolean {
    if (value != null) {
      // 向对的叶节点添加元素，即数组尾部
      this.heap.push(value);
      // 进行上移操作，即上移节点到指定位置
      this.shiftUp(this.heap.length - 1);
      return true;
    }
    return false;
  }

  /**
   * 上浮
   * @param index
   */
  protected shiftUp (index: number): void {
    // 获取父节点位置
    let parent = this.getParentIndex(index);

    // 插入位置必须大于0， 且它的父节点大于其本身就执行循环体的操作
    while (
      index > 0 &&
      this.compareFn(this.heap[parent], this.heap[index]) === Compare.BIGGER_THAN
    ) {
      this.swap(this.heap, parent, index);
      index = parent
      parent = this.getParentIndex(index);
    }
  }

  /**
   * 换位
   * @param array
   * @param i
   * @param j
   */
  protected swap (array: T[], i: number, j: number): void {
    const temp = array[i];
    array[i] = array[j]
    array[j] = temp;
  }

  /**
   * 找出最小值
   */
  findMinimum (): T | undefined {
    //  返回数组的最小元素
    return this.isEmpty() ? undefined : this.heap[0]
  }

  /**
   * 是否为空
   */
  isEmpty (): boolean {
    return this.size() === 0
  }

  /**
   * 长度
   */
  size (): number {
    return this.heap.length;
  }

  /**
   * 移除最小节点
   */
  extract (): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    if (this.size() === 1) {
      return this.heap.shift();
    }

    const removeValue = this.heap.shift();

    // 执行下移操作
    this.shiftDown(0);
    return removeValue;
  }

  /**
   * 下层
   * @param index
   */
  shiftDown (index: number): void {
    // 保存当前插入值得位置
    let element = index;
    const left = this.getLeftIndex(index);
    const right = this.getRightIndex(index);
    const size = this.size();

    if (left < size && this.compareFn(this.heap[element], this.heap[left]) === Compare.BIGGER_THAN) {
      element = left
    }

    if (right < size && this.compareFn(this.heap[element], this.heap[right]) === Compare.BIGGER_THAN) {
      element = right
    }

    if (index !== element) {
      this.swap(this.heap, index, element);
      this.shiftDown(element)
    }
  }

  getIsArray () {
    return this.heap;
  }
}


const minHeap = new MinHeap();
minHeap.insert(13);
minHeap.insert(42);
minHeap.insert(3);
minHeap.insert(153);

console.log(minHeap.getIsArray());
console.log(minHeap.findMinimum());
