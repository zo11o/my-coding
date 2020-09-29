
interface IStack<T> {
  push(val: T): void;
  pop(): T | null;
  peek(): T | null;
  isEmpty(): boolean;
}

interface IItem<T> {
  [index: number]: T;
}

class Stack<T> implements IStack<T> {

  private items: IItem<T>;
  private length = 0;

  constructor() {
    this.items = {};
    this.length = 0;
  }

  push(node: T) {
    this.items[this.length] = node;
    this.length++;
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }
    this.length--
    let node = this.items[this.length]
    delete this.items[this.length];
    return node
  }

  isEmpty() {
    return this.length === 0;
  }

  // 获取栈顶节点
  peek() {
    if (this.isEmpty()) {
      return null
    }

    return this.items[this.length - 1];
  }

  clear() {
    this.items = {};
    this.length = 0;
  }
}
