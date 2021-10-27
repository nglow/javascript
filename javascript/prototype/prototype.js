/*
* Prototype
* JavaScript는 Class라는 개념이 없음
* 기존의 객체를 복사하여(Cloning) 새로운 객체를 생성하는 프로토타입 기반의 언어임
* 프로토 타입 기반의 언어는 객체 원형은 프로토타입을 이용하여 새로운 객체를 만들어냄
* */
let log = console.log;

let myObj = {};
log(myObj.constructor); // [Function: Object]
log(myObj.__proto__); // [Object: null prototype] {}
log(myObj.constructor.prototype); // [Object: null prototype] {}
log(myObj.__proto__ === myObj.constructor.prototype); // true
log(myObj.__proto__ === Object.prototype); // true

log('=================');

function Cat() {
  // Constructor for kitty
}
let kitty = new Cat();
log(Cat.prototype); // {}
log(kitty.__proto__ === Cat.prototype); // true
log(kitty.__proto__.__proto__ === Object.prototype); // true
log(Object.prototype.__proto__); // null

log('=================');

function Animal() {}
Object.setPrototypeOf(Cat.prototype, Animal.prototype);

log(Cat.prototype); // Animal {}
log(Animal.prototype); // {}
log(Object.prototype); //[Object: null prototype] {}
log(Object.prototype.__proto__); // null

log(kitty.__proto__); // Animal {}
log(kitty.__proto__.__proto__); // {}
log(kitty.__proto__.__proto__.__proto__); // [Object: null prototype] {}
log(kitty.__proto__.__proto__.__proto__.__proto__); // null
