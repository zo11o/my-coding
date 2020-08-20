let demo = new LinkedList(0)
console.log(demo);
var res = demo.display();
console.log(res);

demo.push(1);
demo.push(156);
demo.push(159);
demo.findByVal(156)

console.log(demo.findPrevByVal(156))

demo.insert(1688, 1);
console.log(demo.findByIndex(4))

demo.display();
