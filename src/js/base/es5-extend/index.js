//1. 原型链继承
// 通过修改 子类的prototype 实现继承

(function () {

  function Super(name) {
    this.name = name;
    this.property = 12
  }

  Super.prototype.getSuperProperty = function () {
    return this.property
  }

  function Sub(name) {
    this.name = name;
    this.subProperty = 13
  }

  Sub.prototype = new Super();

  Sub.prototype.getSubProperty = function () {
    return this.subProperty;
  }

  let instance = new Sub('zorro')

  console.log(instance.getSuperProperty())
}())


  /**
   * 缺点
   * 1. 应用属性被共享
   * 2. 不能向父类传递参数
   */

  /**************************************************************** */

  // 2. 借用构造函数继承

  ; (function () {

    /**
     * 缺点
     * 1. 无论何时都会调用两次父类构造函数
     */

    function Super(name, age) {
      this.name = name
      this.age = age
      this.friends = ['z', 'r']
    }

    Super.prototype.sayName = function () {
      return this.name
    }

    function Sub(name, age) {
      Super.call(this, name, age)
      this.school = 'sz'
      // this.friends = ['a', 'q']
    }

    Sub.prototype = new Super();
    Sub.prototype.constructor = Sub;
    Sub.prototype.sayName = function () {
      return this.name
    }
    Sub.prototype.saySchool = function () {
      return this.school
    }

    let child1 = new Sub('zorro', 23)
    child1.friends.push('y')

    let child2 = new Sub('yuan', 21)
    child2.friends.push('o')

    console.log(child1.friends, child2.friends)


  }())



  // 3. 原型式继承

  ; (function () {

    /**
     * 用处:创建两个相识的对象,但是包含引用类型的值的属性会共享
     */
    function object(o) {
      function F() { }
      F.prototype = o
      return new F()
    }
  }())

  // 4. 继承式继承
  ; (function () {
    // 工厂方法

    /**
     * 做不到函数服用
     * @param {*} org
     * @returns
     */
    function createAnother(org) {
      var clone = Object.create(org)
      clone.sayHi = function () {
        alert('hi')
      }
      return clone
    }


  }())

  // 5. 寄生组合式继承
  ; (function () {

    // function inheritPrototype(Parent, Child) {
    //   // let prototype = new Object.create(Parent)
    //   function F () {}
    //   F.prototype = Parent;
    //   let prototype = new F()
    //   console.log(prototype)
    //   prototype.constructor = Child
    //   Child.prototype = prototype
    // }

    // function Super(name) {
    //   this.name = name
    // }

    // Super.prototype.sayName = function() {
    //   return this.name
    // }

    // function Sub(name,age) {
    //   Super.call(this, name)
    //   console.log(this)
    //   this.age = age
    // }

    // inheritPrototype(Super, Sub)

    // let instance = new Sub('zorro', 123)
    // console.log(instance.name)

    // function inheritPrototype(Subtype, Supertype) {
    //   var prototype = Object.create(Supertype);
    //   prototype.constructor = Subtype;
    //   Subtype.prototype = prototype;
    // }

    // function Supertype(name) {
    //   this.myName = name;
    //   this.colors = ["red", "green", "blue"]
    // }

    // Supertype.prototype.sayName = function () {
    //   console.log(this.name);
    // };

    // function Subtype(name, age) {
    //   Supertype.call(this, name);
    //   this.age = age;
    // }

    // inheritPrototype(Subtype, Supertype);

    // Subtype.prototype.sayAge = function () {
    //   console.log(this.age);
    // };

    // let instance = new Subtype('zorro', 123)
    // console.log(instance)
  }())


//  ES6
