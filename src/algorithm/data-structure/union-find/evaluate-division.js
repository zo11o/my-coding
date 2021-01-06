/**
 * 手工封装Union-Find算法
 */
class UF {
  constructor(n) {
    this.parent = new Array(n)
    this.weights = new Array(n).fill(1);
    this.count = 0;
    this.size = new Array(n).fill(1)

    for (let i = 0; i < n; i++) {
      this.parent[i] = i
    }
  }

  /**
   * 归并
   */
  union(p, q, weight) {
    let rootP = this.find(p)
    let rootQ = this.find(q);
    if (rootP === rootQ) {
      return
    }

    this.parent[rootP] = this.parent[rootQ];
    this.size[rootQ]++
    this.weights[rootP] = this.weights[q] * weight / this.weights[p]

    this.count--
  }

  find(x) {
    if (x != this.parent[x]) {
      const origin = this.parent[x];
      this.parent[x] = this.find(this.parent[x]);
      this.weights[x] *= this.weights[origin]
    }

    return this.parent[x]
  }

  isConnected(p, q) {
    let rootP = this.find(p)
    let rootQ = this.find(q)
    if (rootP == rootQ) {
      return this.weights[p] / this.weights[q];
    } else {
      return -1;
    }
  }

  getCount() {
    return this.count
  }
}

/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function (equations, values, queries) {
  var map = new Map();
  var id = 0;
  var uf = new UF(2 * equations.length);

  equations.forEach((o, i) => {
    const [a, b] = o;

    if (!map.has(a)) {
      map.set(a, id)
      id++
    }

    if (!map.has(b)) {
      map.set(b, id)
      id++
    }
    uf.union(map.get(a), map.get(b), values[i])
  })


  let queriesSize = queries.length;
  const res = new Array(queriesSize)
  for (let i = 0; i < queriesSize; i++) {
    let [var1, var2] = queries[i];

    let id1 = map.get(var1);
    let id2 = map.get(var2);

    if (id1 == null || id2 == null) {
      res[i] = -1.0;
    } else {
      res[i] = uf.isConnected(id1, id2);
    }
  }
  console.log(res)
  return res;
};

calcEquation([["a", "b"], ["b", "c"]], [2.0, 3.0], [["a", "c"], ["b", "a"], ["a", "e"], ["a", "a"], ["x", "x"]])
