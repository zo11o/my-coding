/*
  图 Graph 数据结构设计
  图的组成： 顶点(V) 和 边(E)
  图主要分为： 有向图 和 无向图
  代码表示方式为： 邻接表 和 邻接矩阵

  存储空间复杂度:   O(V+E)    O(V^2)
  添加顶点:        O(1)      O(V^2)
  添加边:          O(1)      O(1)
  检查相邻边:      O(V)       O(1)

  宽松表：用邻接表
  紧凑表用邻接矩阵
*/

//  ---------------------------------------------------------------------------------

/**
 * 接口：顶点
 */
interface VertexInterface<T> {
  edges: Array<Edge<T>>
  visited: boolean
  addEdge (edge: Edge<T>): void
}

/**
 * 顶点
 */
class Vertex<T> implements VertexInterface<T> {
  public edges: Array<Edge<T>> = [];
  public visited = false;
  public data: T | null = null;
  public index: number = 0;

  constructor(data: T | null = null, index: number = 0) {
    this.data = data
    this.index = index
  }

  addEdge (edge: Edge<T>) {
    this.edges.push(edge)
  }
}

//  ---------------------------------------------------------------------------------

/**
 * 接口：边
 */
interface EdgeInterface<T> {
  from: Vertex<T>
  to: Vertex<T>
  weight?: Number
}

/**
 * 边
 */
class Edge<T> implements EdgeInterface<T> {
  public from: Vertex<T>
  public to: Vertex<T>
  public weight?: number

  constructor(form: Vertex<T>, to: Vertex<T>, weight?: number) {
    this.from = form;
    this.to = to;
    this.weight = weight;
  }
}

//  ---------------------------------------------------------------------------------

// 图
// 注意： 图的表示方式有很多，这里给出来的只是一种可能的实现
// 给出一个简单图：https://upload-images.jianshu.io/upload_images/4064751-65a143e3e7d746b3.png?imageMogr2/auto-orient/strip|imageView2/2/w/274/format/webp

/**
 * 邻接列表
 */
class EdgeList<T> {
  public edges: Array<Edge<T>> = [];
  public vertex: Vertex<T> | null = null

  constructor(vertex: Vertex<T>) {
    this.vertex = vertex;
  }

  addEdge (edge: Edge<T>) {
    this.edges.push(edge);
  }
}

class Graph<T> {
  private vertices: Array<Vertex<T>> = []
  private adjacencyList: Array<EdgeList<T>> = [];

  constructor(vertices: Array<Vertex<T>> = [], adjacencyList: Array<EdgeList<T>> = []) {
    this.vertices = vertices
    this.adjacencyList = adjacencyList
  }

  /**
   * 创建顶点
   */
  createVertex (value: T): Vertex<T> {
    let matchingVertices = this.vertices.filter(o => o.data === value);

    if (matchingVertices.length) {
      return matchingVertices[matchingVertices.length - 1];
    }

    let vertex = new Vertex(value, this.adjacencyList.length);
    this.vertices.push(vertex);
    this.adjacencyList.push(new EdgeList(vertex))
    return vertex
  }

  /**
   * 添加有向边
   */
  addDirectedEdge (fromVertex: Vertex<T>, toVertex: Vertex<T>, weightValue: number) {
    let edge = new Edge(fromVertex, toVertex, weightValue)
    fromVertex.addEdge(edge);
    var fromIndex = this.vertices.indexOf(fromVertex);

    this.adjacencyList[fromIndex].edges.push(edge)
  }

  /**
   * 添加无向边
   */
  addUnDirectedEdge (fromVertex: Vertex<T>, toVertex: Vertex<T>, weightValue: number) {
    this.addDirectedEdge(fromVertex, toVertex, weightValue)
    this.addDirectedEdge(toVertex, fromVertex, weightValue)
  }

  /**
   * 打印邻接列表
   */
  printAdjacencyList () {
    this.vertices.filter((o, i) => this.adjacencyList[i].edges.length).forEach((oo, ii) => {
      console.log(this.vertices[ii].data, '=>', this.adjacencyList[ii].edges)
    })
  }
}

var graph = new Graph()
var v1 = graph.createVertex(1)
var v2 = graph.createVertex(2)
var v3 = graph.createVertex(3)
var v4 = graph.createVertex(4)
var v5 = graph.createVertex(5)

graph.addDirectedEdge(v1, v2, 1.0)
graph.addDirectedEdge(v2, v3, 1.0)
graph.addDirectedEdge(v3, v4, 4.5)
graph.addDirectedEdge(v4, v1, 4.5)
graph.addDirectedEdge(v2, v5, 4.5)
graph.printAdjacencyList()

console.log(graph)
