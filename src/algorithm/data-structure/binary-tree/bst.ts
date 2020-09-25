// 本节我们用 ts 实现 《算法4》 第三章 二叉搜索树 算法 3.3
// 这里用 ts 完全是为了学习一下 ts

declare interface BSTNode<K, V> {
  key: K;
  val: V;
  left: BSTNode<K, V> | null;
  right: BSTNode<K, V> | null;
  N: number
}

class BSTNode<K, V> implements BSTNode<K, V>  {
  key: K;
  val: V;
  left: BSTNode<K, V> | null;
  right: BSTNode<K, V> | null;
  N: number

  constructor(key: K, val: V, N: number) {
    this.key = key
    this.val = val
    this.N = N
    this.left = null
    this.right = null
  }
}

class BST<K extends number, V> {
  private root: BSTNode<K, V>;

  constructor(root: BSTNode<K, V>) {
    this.root = root
  }

  public size (): number {
    return this._size(this.root);
  }

  private _size (x: BSTNode<K, V> | null): number {
    if (x == null) {
      return 0
    } else {
      return x.N
    }
  }

  public get (key: K): V | null {
    return this._get(this.root, key)
  }

  /**
   * _get
   */
  public _get (x: BSTNode<K, V> | null, key: K): V | null {
    if (x == null) return null

    let cmp = key - x.key

    if (cmp < 0) {
      return this._get(x.left, key);
    } else if (cmp > 0) {
      return this._get(x.right, key);
    } else {
      return x.val
    }
  }

  /**
   * put
   */
  public put (key: K, val: V): void {
    this.root = this._put(this.root, key, val)
  }

  private _put (x: BSTNode<K, V> | null, key: K, val: V): BSTNode<K, V> {
    if (x == null) {
      return new BSTNode(key, val, 1)
    }
    let cmp = key - x.key
    if (cmp < 0) {
      x.left = this._put(x.left, key, val)
    } else if (cmp > 0) {
      x.right = this._put(x.right, key, val)
    } else {
      x.val = val
    }

    x.N = this._size(x.left) + this._size(x.right) + 1
    return x
  }
}
