
// ----------- 具象化 ---------------
function SetAdmin(name) {
  this.admin = name;
}

SetAdmin.prototype.getName = function ( ) {
  console.log(this.admin);
}

var SingletonSetAdmin = (function () {
  var instance = null;

  return function (name) {
    if (!instance) {
      instance = new SetAdmin(name);
    }

    return instance;
  }
})();


SingletonSetAdmin('a').getName(); // a
SingletonSetAdmin('b').getName(); // a
SingletonSetAdmin('c').getName(); // a


// --------------------------- 抽象模型化

function SetManager (name) {
  this.name = name;
}

SetManager.prototype.getName = function () {
  return console.log(this.name)
}

function getSingleton(fn) {
  var instance = null;

  return function () {
    if (!instance) {
      // this -> window
      instance = fn.apply(this, arguments);
    }

    return instance
  }
}

var managerSingleton = getSingleton(function (name) {
  var manager = new SetManager(name);

  return manager;
})

managerSingleton('a').getName(); // a
managerSingleton('b').getName(); // a
managerSingleton('c').getName(); // a
