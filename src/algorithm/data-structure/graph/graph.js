"use strict";
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
/**
 * 顶点
 */
var Vertex = /** @class */ (function () {
    function Vertex(data, index) {
        if (data === void 0) { data = null; }
        if (index === void 0) { index = 0; }
        this.edges = [];
        this.visited = false;
        this.data = null;
        this.index = 0;
        this.data = data;
        this.index = index;
    }
    Vertex.prototype.addEdge = function (edge) {
        this.edges.push(edge);
    };
    return Vertex;
}());
/**
 * 边
 */
var Edge = /** @class */ (function () {
    function Edge(form, to, weight) {
        this.from = form;
        this.to = to;
        this.weight = weight;
    }
    return Edge;
}());
//  ---------------------------------------------------------------------------------
// 图
// 注意： 图的表示方式有很多，这里给出来的只是一种可能的实现
// 给出一个简单图：https://upload-images.jianshu.io/upload_images/4064751-65a143e3e7d746b3.png?imageMogr2/auto-orient/strip|imageView2/2/w/274/format/webp
/**
 * 邻接列表
 */
var EdgeList = /** @class */ (function () {
    function EdgeList(vertex) {
        this.edges = [];
        this.vertex = null;
        this.vertex = vertex;
    }
    EdgeList.prototype.addEdge = function (edge) {
        this.edges.push(edge);
    };
    return EdgeList;
}());
var Graph = /** @class */ (function () {
    function Graph(vertices, adjacencyList) {
        if (vertices === void 0) { vertices = []; }
        if (adjacencyList === void 0) { adjacencyList = []; }
        this.vertices = [];
        this.adjacencyList = [];
        this.vertices = vertices;
        this.adjacencyList = adjacencyList;
    }
    /**
     * 创建顶点
     */
    Graph.prototype.createVertex = function (value) {
        var matchingVertices = this.vertices.filter(function (o) { return o.data === value; });
        if (matchingVertices.length) {
            return matchingVertices[matchingVertices.length - 1];
        }
        var vertex = new Vertex(value, this.adjacencyList.length);
        this.vertices.push(vertex);
        this.adjacencyList.push(new EdgeList(vertex));
        return vertex;
    };
    /**
     * 添加有向边
     */
    Graph.prototype.addDirectedEdge = function (fromVertex, toVertex, weightValue) {
        var edge = new Edge(fromVertex, toVertex, weightValue);
        fromVertex.addEdge(edge);
        var fromIndex = this.vertices.indexOf(fromVertex);
        this.adjacencyList[fromIndex].edges.push(edge);
    };
    /**
     * 添加无向边
     */
    Graph.prototype.addUnDirectedEdge = function (fromVertex, toVertex, weightValue) {
        this.addDirectedEdge(fromVertex, toVertex, weightValue);
        this.addDirectedEdge(toVertex, fromVertex, weightValue);
    };
    /**
     * 打印邻接列表
     */
    Graph.prototype.printAdjacencyList = function () {
        var _this = this;
        this.vertices.filter(function (o, i) { return _this.adjacencyList[i].edges.length; }).forEach(function (oo, ii) {
            console.log(_this.vertices[ii].data, '=>', _this.adjacencyList[ii].edges);
        });
    };
    return Graph;
}());
var graph = new Graph();
var v1 = graph.createVertex(1);
var v2 = graph.createVertex(2);
var v3 = graph.createVertex(3);
var v4 = graph.createVertex(4);
var v5 = graph.createVertex(5);
graph.addDirectedEdge(v1, v2, 1.0);
graph.addDirectedEdge(v2, v3, 1.0);
graph.addDirectedEdge(v3, v4, 4.5);
graph.addDirectedEdge(v4, v1, 4.5);
graph.addDirectedEdge(v2, v5, 4.5);
graph.printAdjacencyList();
console.log(graph);
