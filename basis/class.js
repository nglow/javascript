/*
* Class
* */

class Person {
  // 생성자는 접근한정자를 사용할 수 없음 -> 처음부터 하나만 만들게 되어있음 -> 여러개가 필요할땐?
  // constructor() {}

  constructor(name, age, city) {
    console.log('Constructor');
    this._name = name; // private
    this._age = age; // private
    this._city = city; // private
    this.number = '010-0000-0000'; // public
  }

  get name() {
    return this._name;
  }

  get age() {
    return this._age;
  }

  get city() {
    return this._city;
  }
}

// let kim = new Person(); // Error

console.log(kim);
console.log(kim.__proto__);
console.log(kim.__proto__.__proto__);
console.log(kim.__proto__.__proto__.__proto__);

let nam = new Person('name', 32, 'Seoul');
console.log(nam);
console.log(nam.name);
console.log(nam.age);
console.log(nam.city);
console.log(nam.number);
