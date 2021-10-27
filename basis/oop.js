const f = function () {
  console.log(1 + 1);
  console.log(1 + 2);
}
console.log(f);
console.log(f.prototype);
f();

const o = {
  func: f,
}
o.func();


class A {
  constructor() {
    this._me = 'nglow';
  }

  get me() {
    return this._me;
  }

  set me(value) {
    this._me = value;
  }
}

const a = new A;
console.log(a.me);
a.me = 'nglow90';
console.log(a.me);
