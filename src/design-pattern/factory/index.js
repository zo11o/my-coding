
function CreatePerson(name, age, sex) {
  var obj = new Object();
  obj.name = name;
  obj.age = age;
  obj.set = sex;
  obj.sayName = function () {
    return this.name;
  }
  return obj;
}


var p1 = new CreatePerson("longen",'28','男');
var p2 = new CreatePerson("tugenhua",'27','女');
